// TypeScript Types for NEW_PROJECT_MASTER_GUIDE.md Specification

export type ValueType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 9;

export interface IStringField {
  key: string;
  valueType: 0;
  stringData: string;
}

export interface INumberField {
  key: string;
  valueType: 1;
  numberData: number;
}

export interface IBooleanField {
  key: string;
  valueType: 2;
  booleanData: boolean;
}

export interface IUrlField {
  key: string;
  valueType: 3;
  urlData: string;
}

export interface IResourceField {
  key: string;
  valueType: 4;
  resourceData: string;
}

export interface IObjectField {
  key: string;
  valueType: 5;
  objectData: Record<string, any>;
}

export interface IDateField {
  key: string;
  valueType: 6;
  objectDate: {
    iso: string;
    display?: string;
    timezone?: string;
  };
}

export interface IArrayStringField {
  key: string;
  valueType: 7;
  arrayString: string[];
}

export interface IArrayObjectField {
  key: string;
  valueType: 9;
  arrayObject: Array<Record<string, any>>;
}

export type IDataField =
  | IStringField
  | INumberField
  | IBooleanField
  | IUrlField
  | IResourceField
  | IObjectField
  | IDateField
  | IArrayStringField
  | IArrayObjectField;

export interface ILayoutConfig {
  layout_name: string;
  data_fields: IDataField[];
}

export interface IPageConfig {
  page_name: string;
  path: string;
  layouts: ILayoutConfig[];
}

export interface ITemplateSchema {
  template_id?: string;
  theme_id?: string;
  pages: IPageConfig[];
}

// Global window extension
declare global {
  interface Window {
    TEMPLATE_ID?: string;
    CLIENT_ID?: string;
    PUBLIC_KEY?: string;
    DATA?: Array<{
      key: string;
      valueType: ValueType;
      stringData?: string;
      numberData?: number;
      booleanData?: boolean;
      urlData?: string;
      resourceData?: string;
      objectData?: any;
      objectDate?: any;
      arrayString?: string[];
      arrayObject?: any[];
      layoutId?: string;
      layoutName?: string;
      usingOnPages?: string[];
    }> | null;
  }
}
