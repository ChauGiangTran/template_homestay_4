import axios from "axios";
import templateDefaultJson from "../assets/template.json";
import type { IDataField, ITemplateSchema, ValueType } from "../types/template";

export const FALLBACK_TEMPLATE_ID = "template_homstay4";
export const API_BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL) ||
  "https://api.pdteam.vn";
export const API_RESOURCE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_RESOURCE_URL) ||
  "https://api.pdteam.vn";

// Memory cache for parsed default template
let cachedTemplate: ITemplateSchema | null = null;

function getLocalTemplate(): ITemplateSchema {
  if (!cachedTemplate) {
    cachedTemplate = templateDefaultJson as unknown as ITemplateSchema;
  }
  return cachedTemplate;
}

/**
 * Unwrap typed object field: converts { key: { valueType: 0, stringData: "val" } }
 * into { key: "val" }
 */
export function unwrapTypedItem(item: any): any {
  if (!item || typeof item !== "object") return item;

  // If item itself is a typed field
  if ("valueType" in item) {
    return normalizeValue(item as IDataField);
  }

  const result: Record<string, any> = {};
  for (const [propKey, propVal] of Object.entries(item)) {
    if (propVal && typeof propVal === "object" && "valueType" in propVal) {
      result[propKey] = normalizeValue(propVal as IDataField);
    } else {
      result[propKey] = propVal;
    }
  }
  return result;
}

/**
 * Normalize raw typed field to JavaScript primitive / object
 */
export function normalizeValue(field: IDataField | any): any {
  if (!field) return "";
  const vt: ValueType = field.valueType;

  switch (vt) {
    case 0: // stringData
      return typeof field.stringData === "string" ? field.stringData : "";

    case 1: // numberData
      return typeof field.numberData === "number"
        ? field.numberData
        : Number(field.numberData) || 0;

    case 2: // booleanData
      if (typeof field.booleanData === "boolean") return field.booleanData;
      if (field.booleanData === "true") return true;
      if (field.booleanData === "false") return false;
      return Boolean(field.booleanData);

    case 3: // urlData
      return typeof field.urlData === "string" ? field.urlData : "";

    case 4: // resourceData
      return typeof field.resourceData === "string" ? field.resourceData : "";

    case 5: { // objectData
      let data = field.objectData;
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {
          data = {};
        }
      }
      return unwrapTypedItem(data);
    }

    case 6: { // objectDate
      let dateData = field.objectDate;
      if (typeof dateData === "string") {
        try {
          dateData = JSON.parse(dateData);
        } catch {
          dateData = { iso: dateData };
        }
      }
      return dateData;
    }

    case 7: { // arrayString
      let arr = field.arrayString;
      if (typeof arr === "string") {
        try {
          arr = JSON.parse(arr);
        } catch {
          arr = [];
        }
      }
      return Array.isArray(arr) ? arr : [];
    }

    case 9: { // arrayObject
      let arrObj = field.arrayObject;
      if (typeof arrObj === "string") {
        try {
          arrObj = JSON.parse(arrObj);
        } catch {
          arrObj = [];
        }
      }
      if (!Array.isArray(arrObj)) return [];
      return arrObj.map((item) => unwrapTypedItem(item));
    }

    default:
      return field.stringData ?? "";
  }
}

/**
 * Find default field from template.json by pageName and layoutName
 */
function findDefaultField(
  key: string,
  pageName?: string,
  layoutName?: string
): IDataField | null {
  const template = getLocalTemplate();
  if (!template?.pages) return null;

  for (const page of template.pages) {
    if (pageName && page.page_name !== pageName) continue;

    for (const layout of page.layouts) {
      if (layoutName && layout.layout_name !== layoutName) continue;

      const matched = layout.data_fields.find((f) => f.key === key);
      if (matched) return matched;
    }
  }

  // Fallback: search key without strict scope if not found
  if (pageName || layoutName) {
    for (const page of template.pages) {
      for (const layout of page.layouts) {
        const matched = layout.data_fields.find((f) => f.key === key);
        if (matched) return matched;
      }
    }
  }

  return null;
}

export interface IClientDataScope {
  pageName?: string;
  layoutName?: string;
  pageId?: string;
  layoutId?: string;
}

/**
 * Batch retrieve multiple data fields in current layout scope
 * Returns array of values in the exact order of requested keys
 */
export async function getClientDataValues(
  keys: string[],
  scope: IClientDataScope = {},
  returnFull: boolean = false
): Promise<any[]> {
  const windowData = typeof window !== "undefined" ? window.DATA : null;

  return keys.map((key) => {
    // 1. Try window.DATA if injected by backend
    if (Array.isArray(windowData) && windowData.length > 0) {
      const foundInWindow = windowData.find((item) => {
        if (item.key !== key) return false;
        if (scope.layoutName && item.layoutName && item.layoutName !== scope.layoutName) {
          return false;
        }
        return true;
      });

      if (foundInWindow) {
        return returnFull ? foundInWindow : normalizeValue(foundInWindow);
      }
    }

    // 2. Fallback to default template.json
    const defaultField = findDefaultField(key, scope.pageName, scope.layoutName);
    if (defaultField) {
      return returnFull ? defaultField : normalizeValue(defaultField);
    }

    // 3. Fallback when key does not exist
    return returnFull ? null : "";
  });
}

/**
 * Single key client data retrieval
 */
export async function getClientData(
  key: string,
  returnFull: boolean = false,
  scope: IClientDataScope = {}
): Promise<any> {
  const [val] = await getClientDataValues([key], scope, returnFull);
  return val;
}

/**
 * Format image and resource URL
 * - Handles http/https absolute URLs
 * - Resolves uploaded assets to API_RESOURCE_URL
 * - Resolves local paths safely
 */
export function getImageUrl(value: any): string {
  if (!value) return "";
  let pathStr = "";

  if (typeof value === "string") {
    pathStr = value.trim();
  } else if (typeof value === "object" && value.resourceData) {
    pathStr = String(value.resourceData).trim();
  } else {
    return "";
  }

  if (!pathStr) return "";

  // Absolute external URLs
  if (/^(https?:)?\/\//i.test(pathStr) || pathStr.startsWith("data:")) {
    return pathStr;
  }

  // Uploaded backend paths
  if (pathStr.startsWith("uploads/") || pathStr.startsWith("/uploads/")) {
    const clean = pathStr.replace(/^\/+/, "");
    return `${API_RESOURCE_URL.replace(/\/+$/, "")}/${clean}`;
  }

  // Local static asset path
  return pathStr;
}

export interface IContactPayload {
  fullName: string;
  phone: string;
  email?: string;
  checkIn?: string;
  checkOut?: string;
  roomType?: string;
  guestCount?: string | number;
  note?: string;
  subject?: string;
  [key: string]: any;
}

/**
 * Standard Contact / Booking Request submission endpoint
 * Compliant with NEW_PROJECT_MASTER_GUIDE.md Section 10
 */
export async function sendContactRequest(payload: IContactPayload): Promise<{ success: boolean; data?: any; message?: string }> {
  const publicKey = typeof window !== "undefined" ? window.PUBLIC_KEY : undefined;

  if (!publicKey) {
    throw new Error("Chưa có cấu hình gửi liên hệ (Thiếu PUBLIC_KEY). Vui lòng thử lại sau.");
  }

  try {
    const endpoint = `${API_BASE_URL.replace(/\/+$/, "")}/moduleapi/contactme/send_contact_request`;
    const response = await axios.post(
      endpoint,
      {
        subject: payload.subject || "Yêu cầu đặt phòng Homestay",
        ...payload,
      },
      {
        headers: {
          publickey: publicKey,
          "Content-Type": "application/json",
        },
        timeout: 10000,
      }
    );

    return {
      success: true,
      data: response.data,
      message: "Gửi yêu cầu đặt phòng thành công! Chúng tôi sẽ liên hệ trong ít phút.",
    };
  } catch (error: any) {
    console.error("Lỗi khi gửi yêu cầu liên hệ:", error);
    const serverMessage = error.response?.data?.message;
    throw new Error(serverMessage || "Không thể kết nối đến máy chủ. Vui lòng liên hệ hotline.");
  }
}
