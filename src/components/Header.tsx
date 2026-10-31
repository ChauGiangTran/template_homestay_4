import React, { useEffect, useState } from "react";
import { Menu, X, Phone, Calendar } from "lucide-react";
import { getClientDataValues, getImageUrl } from "../utils/clientData";
import { useBookingModal } from "../context/BookingModalContext";

interface IHeaderProps {
  currentPath: string;
  currentPage: string;
}

interface INavItem {
  label: string;
  url: string;
}

export const Header: React.FC<IHeaderProps> = ({ currentPath, currentPage }) => {
  const { openBookingModal } = useBookingModal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [headerData, setHeaderData] = useState({
    brandName: "VUONTHONG",
    brandLogo: "/static/vuonthong-logo.svg",
    brandTagline: "Chạm vào bình yên, giữa miền xanh bất tận",
    hotline: "0900 000 000 (Demo)",
    bookingBtnLabel: "Đặt Kỳ Nghỉ",
    navMenu: [
      { label: "Trang Chủ", url: "/" },
      { label: "Hạng Phòng", url: "/rooms" },
      { label: "Câu Chuyện", url: "/about" },
      { label: "Trải Nghiệm", url: "/experiences" },
      { label: "Thư Viện Ảnh", url: "/gallery" },
      { label: "Liên Hệ", url: "/contact" },
    ] as INavItem[],
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let active = true;

    async function loadHeader() {
      try {
        const [brandName, brandLogo, brandTagline, hotline, btnLabel, navMenu] =
          await getClientDataValues(
            [
              "brand_name",
              "brand_logo",
              "brand_tagline",
              "hotline_phone",
              "booking_btn_label",
              "nav_menu",
            ],
            { pageName: currentPage, layoutName: "Header" }
          );

        if (!active) return;

        setHeaderData((prev) => ({
          ...prev,
          brandName:
            typeof brandName === "string" && brandName.trim() ? brandName : prev.brandName,
          brandLogo: getImageUrl(brandLogo) || prev.brandLogo,
          brandTagline:
            typeof brandTagline === "string" && brandTagline.trim() ? brandTagline : prev.brandTagline,
          hotline: typeof hotline === "string" && hotline.trim() ? hotline : prev.hotline,
          bookingBtnLabel:
            typeof btnLabel === "string" && btnLabel.trim() ? btnLabel : prev.bookingBtnLabel,
          navMenu: Array.isArray(navMenu) && navMenu.length > 0 ? navMenu : prev.navMenu,
        }));
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu Header:", err);
      }
    }

    loadHeader();
    return () => {
      active = false;
    };
  }, [currentPage]);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FAFBF9] border-b border-[#DCE4DD] shadow-[0_4px_20px_-6px_rgba(24,40,30,0.06)]"
          : "bg-[#FAFBF9] border-b border-[#DCE4DD]/80"
      }`}
    >
      {/* Top ambient notification bar */}
      <div
        className={`hidden lg:flex items-center justify-between px-8 text-xs font-sans text-[#718073] border-b border-[#DCE4DD]/60 transition-all duration-300 ${
          isScrolled ? "py-1 opacity-80" : "py-1.5 opacity-100"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="tracking-wide">Đà Lạt, độ cao 1.520m</span>
          <span className="w-1 h-1 rounded-full bg-[#876D4B]/50" />
          <span>Sương sớm 16°C, rừng thông đại ngàn</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="italic font-serif text-[#4A584D]">{headerData.brandTagline}</span>
          <span className="w-1 h-1 rounded-full bg-[#876D4B]/50" />
          <a
            href={`tel:${headerData.hotline.replace(/\s+/g, "")}`}
            className="hover:text-[#18281E] text-[#876D4B] transition-colors flex items-center gap-1.5 font-medium"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Hotline: {headerData.hotline}</span>
          </a>
        </div>
      </div>

      {/* Main navigation container */}
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300 ${
          isScrolled ? "h-16" : "h-20"
        }`}
      >
        {/* Brand identity */}
        <a href="/" className="flex items-center gap-3.5 group">
          <div className="relative w-10 h-10 shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-[0.98]">
            <img
              src={headerData.brandLogo}
              alt={headerData.brandName}
              className="w-10 h-10 object-contain shadow-sm rounded-[4px]"
              loading="eager"
            />
          </div>
          <div>
            <span className="block font-serif text-2xl tracking-tight text-[#18281E] font-medium leading-none group-hover:text-[#876D4B] transition-colors">
              {headerData.brandName}
            </span>
            <span className="block text-[11px] font-sans text-[#718073] tracking-wide mt-1">
              Vườn Thông Homestay Đà Lạt
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
          {headerData.navMenu.map((item, index) => {
            const isActive = currentPath === item.url;
            return (
              <a
                key={index}
                href={item.url}
                className={`text-xs font-sans tracking-wide py-2 transition-all relative group/link ${
                  isActive
                    ? "text-[#18281E] font-semibold"
                    : "text-[#4A584D] hover:text-[#18281E]"
                }`}
              >
                <span>{item.label}</span>
                <span
                  className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#18281E] transition-transform duration-300 origin-left ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover/link:scale-x-100 opacity-60"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-3.5">
          <button
            onClick={() => openBookingModal()}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] text-xs font-medium font-sans tracking-wide bg-[#18281E] text-[#FAFBF9] hover:bg-[#23392B] active:scale-[0.98] transition-all shadow-sm group/btn"
          >
            <Calendar className="w-3.5 h-3.5 text-[#DCE4DD] transition-transform group-hover/btn:scale-110" />
            <span>{headerData.bookingBtnLabel}</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 min-w-[44px] min-h-[44px] text-[#18281E] hover:bg-[#F0F4F1] transition-colors flex items-center justify-center border border-[#DCE4DD]"
            aria-label="Mở danh mục điều hướng"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#DCE4DD] bg-[#FAFBF9] px-6 py-6 space-y-6 shadow-xl animate-in fade-in-50 slide-in-from-top-2 duration-200">
          <div className="pb-3 border-b border-[#DCE4DD]/60 flex items-center justify-between text-xs font-sans text-[#718073]">
            <span>Đà Lạt, 1.520m</span>
            <span className="text-[#876D4B]">16°C Sương Mù</span>
          </div>

          <nav className="flex flex-col space-y-1">
            {headerData.navMenu.map((item, index) => (
              <a
                key={index}
                href={item.url}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-sans py-3.5 border-b border-[#DCE4DD]/40 flex items-center justify-between min-h-[44px] transition-colors ${
                  currentPath === item.url
                    ? "text-[#18281E] font-semibold pl-2 border-l-2 border-l-[#18281E]"
                    : "text-[#4A584D] hover:text-[#18281E]"
                }`}
              >
                <span>{item.label}</span>
                {currentPath === item.url && <span className="text-[#876D4B] text-xs">●</span>}
              </a>
            ))}
          </nav>

          <div className="pt-2 space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openBookingModal();
              }}
              className="w-full py-3.5 bg-[#18281E] text-[#FAFBF9] text-xs font-sans font-medium flex items-center justify-center gap-2 min-h-[44px] active:scale-[0.99] shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>{headerData.bookingBtnLabel}</span>
            </button>
            <div className="text-center">
              <a
                href={`tel:${headerData.hotline.replace(/\s+/g, "")}`}
                className="text-xs font-sans text-[#876D4B] hover:text-[#18281E] inline-flex items-center gap-1.5 py-1"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{headerData.hotline}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
