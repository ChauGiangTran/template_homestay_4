import React, { useEffect, useState } from "react";
import { Phone, Mail, MapPin, ChevronUp } from "lucide-react";
import { getClientDataValues } from "../utils/clientData";

interface IFooterProps {
  currentPage: string;
}

export const Footer: React.FC<IFooterProps> = ({ currentPage }) => {
  const [footerData, setFooterData] = useState({
    brandName: "VUONTHONG",
    footerLogo: "/static/vuonthong-logo-light.svg",
    description: "Không gian homestay nghỉ dưỡng giữa miền thông reo đại ngàn Đà Lạt. Nơi bạn tìm lại sự thư thái, kết nối cùng thiên nhiên và những khoảnh khắc sống chậm.",
    address: "Đồi Thông Hoàng Hoa Thám, Phường 10, TP. Đà Lạt, Lâm Đồng (Dữ liệu demo)",
    hotline: "0900 000 000 (Dữ liệu demo)",
    email: "contact@vuonthong.demo",
    copyright: "© 2026 VUONTHONG Homestay. Website Template by PDTeam.",
  });

  useEffect(() => {
    let active = true;

    async function loadFooter() {
      try {
        const [brandName, desc, address, hotline, email, copyright, footerLogo] =
          await getClientDataValues(
            [
              "footer_brand_name",
              "footer_description",
              "footer_address",
              "footer_hotline",
              "footer_email",
              "footer_copyright",
              "footer_logo",
            ],
            { pageName: currentPage, layoutName: "Footer" }
          );

        if (!active) return;

        setFooterData((prev) => ({
          ...prev,
          brandName: typeof brandName === "string" && brandName.trim() ? brandName : prev.brandName,
          footerLogo: typeof footerLogo === "string" && footerLogo.trim() ? footerLogo : prev.footerLogo,
          description: typeof desc === "string" && desc.trim() ? desc : prev.description,
          address: typeof address === "string" && address.trim() ? address : prev.address,
          hotline: typeof hotline === "string" && hotline.trim() ? hotline : prev.hotline,
          email: typeof email === "string" && email.trim() ? email : prev.email,
          copyright: typeof copyright === "string" && copyright.trim() ? copyright : prev.copyright,
        }));
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu Footer:", err);
      }
    }

    loadFooter();
    return () => {
      active = false;
    };
  }, [currentPage]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#121E16] text-[#FAFBF9] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand & Narrative */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-3.5">
              <div className="relative w-9 h-9 shrink-0 flex items-center justify-center">
                <img
                  src={footerData.footerLogo}
                  alt={footerData.brandName}
                  className="w-9 h-9 object-contain shadow-sm rounded-[4px]"
                  loading="lazy"
                />
              </div>
              <span className="font-serif text-2xl tracking-tight text-[#FAFBF9]">
                {footerData.brandName}
              </span>
            </div>
            <p className="text-sm font-sans text-[#DCE4DD]/80 leading-relaxed max-w-sm font-light">
              {footerData.description}
            </p>
            <div className="pt-2 text-xs font-sans text-[#DCE4DD]/60 flex items-center gap-2.5">
              <span>Đà Lạt · Lâm Đồng</span>
              <span className="text-[#876D4B]">—</span>
              <span>Độ cao 1.520m</span>
              <span className="text-[#876D4B]">—</span>
              <span>Sương Mù Quanh Năm</span>
            </div>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-xs font-medium font-sans text-[#876D4B] uppercase tracking-wider">
              Thông Tin Liên Hệ
            </h3>
            <div className="flex items-start gap-3 text-sm text-[#DCE4DD]/85 font-light">
              <MapPin className="w-4 h-4 text-[#876D4B] shrink-0 mt-1" />
              <span>{footerData.address}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-[#DCE4DD]/85 font-light">
              <Phone className="w-4 h-4 text-[#876D4B] shrink-0" />
              <a href={`tel:${footerData.hotline.split("/")[0].replace(/\s+/g, "")}`} className="hover:text-white transition-colors">
                {footerData.hotline}
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm text-[#DCE4DD]/85 font-light">
              <Mail className="w-4 h-4 text-[#876D4B] shrink-0" />
              <a href={`mailto:${footerData.email}`} className="hover:text-white transition-colors">
                {footerData.email}
              </a>
            </div>
          </div>

          {/* Quick Links & Back to top */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-xs font-medium font-sans text-[#876D4B] uppercase tracking-wider">
              Khám Phá
            </h3>
            <ul className="space-y-2.5 text-xs font-sans text-[#DCE4DD]/75 font-light">
              <li>
                <a href="/rooms" className="hover:text-white transition-colors">Hạng phòng lưu trú</a>
              </li>
              <li>
                <a href="/about" className="hover:text-white transition-colors">Triết lý và câu chuyện</a>
              </li>
              <li>
                <a href="/experiences" className="hover:text-white transition-colors">Trải nghiệm thung lũng</a>
              </li>
              <li>
                <a href="/gallery" className="hover:text-white transition-colors">Thư viện khoảnh khắc</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition-colors">Liên hệ đặt phòng</a>
              </li>
            </ul>
            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 text-xs font-sans text-[#876D4B] hover:text-[#FAFBF9] transition-colors group"
              >
                <span>Về đầu trang</span>
                <ChevronUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-16 pt-8 border-t border-[#3E4D40]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#DCE4DD]/60">
          <p>{footerData.copyright}</p>
          <div className="flex items-center gap-4">
            <span>Tiêu chuẩn NEW_PROJECT_MASTER_GUIDE.md</span>
            <span>—</span>
            <span className="text-[#876D4B]">VUONTHONG Homestay Template</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
