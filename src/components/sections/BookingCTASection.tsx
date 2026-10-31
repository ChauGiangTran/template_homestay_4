import React, { useEffect, useState } from "react";
import { Phone, Calendar } from "lucide-react";
import { getClientDataValues, getImageUrl } from "../../utils/clientData";
import { useBookingModal } from "../../context/BookingModalContext";

export const BookingCTASection: React.FC = () => {
  const { openBookingModal } = useBookingModal();

  const [data, setData] = useState({
    title: "Bạn Đã Sẵn Sàng Trở Về Với Sự Bình Yên?",
    subtitle: "Hãy để tiếng thông reo và biển mây sớm mai vỗ về tâm hồn bạn. Đặt phòng trực tiếp để nhận ưu đãi trà chiều miễn phí.",
    buttonLabel: "Gửi Yêu Cầu Đặt Phòng Ngay",
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1400&q=85",
    hotline: "0900 000 000 (Demo)",
  });

  useEffect(() => {
    let active = true;

    async function loadCTA() {
      try {
        const [title, subtitle, btnLabel, img, hotline] = await getClientDataValues(
          ["cta_title", "cta_subtitle", "cta_button_label", "cta_image", "cta_hotline"],
          { pageName: "Home", layoutName: "BookingCTA" }
        );

        if (!active) return;

        setData((prev) => ({
          ...prev,
          title: typeof title === "string" && title.trim() ? title : prev.title,
          subtitle: typeof subtitle === "string" && subtitle.trim() ? subtitle : prev.subtitle,
          buttonLabel: typeof btnLabel === "string" && btnLabel.trim() ? btnLabel : prev.buttonLabel,
          image: getImageUrl(img) || prev.image,
          hotline: typeof hotline === "string" && hotline.trim() ? hotline : prev.hotline,
        }));
      } catch (err) {
        console.error("Lỗi khi tải BookingCTA:", err);
      }
    }

    loadCTA();
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="relative py-28 lg:py-36 overflow-hidden">
      {/* Background image with cinematic rich forest overlay */}
      <img
        src={data.image}
        alt="Kỳ nghỉ thung lũng"
        className="absolute inset-0 w-full h-full object-cover scale-105"
      />
      <div className="absolute inset-0 bg-[#121E16]/85" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-[#FAFBF9] space-y-7">
        <div className="inline-block text-xs font-sans text-[#DCE4DD]/90">
          <span className="tracking-widest uppercase font-medium">Trạm Dừng Chân An Lành</span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal leading-[1.14] text-balance">
          {data.title}
        </h2>

        <p className="text-base sm:text-lg text-[#DCE4DD]/90 font-sans max-w-2xl mx-auto leading-relaxed font-light">
          {data.subtitle}
        </p>

        {/* Boutique hospitality perks */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-sans text-[#DCE4DD]/80">
          <span className="inline-flex items-center gap-1.5">
            <span className="text-[#876D4B]">·</span> Trà atiso &amp; cà phê mộc miễn phí
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="text-[#876D4B]">·</span> Không gian tĩnh lặng sau 22:00
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="text-[#876D4B]">·</span> Hỗ trợ quản gia bản địa chu đáo
          </span>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => openBookingModal()}
            className="w-full sm:w-auto px-8 py-4 bg-[#FAFBF9] text-[#18281E] hover:bg-[#F0F4F1] active:scale-[0.98] text-xs font-sans font-medium tracking-wide transition-all flex items-center justify-center gap-2.5 shadow-lg group"
          >
            <Calendar className="w-4 h-4 text-[#876D4B] transition-transform group-hover:scale-110" />
            <span>{data.buttonLabel}</span>
          </button>

          <a
            href={`tel:${data.hotline.replace(/\s+/g, "")}`}
            className="w-full sm:w-auto px-7 py-4 bg-transparent border border-[#FAFBF9]/40 text-[#FAFBF9] hover:bg-white/10 active:scale-[0.98] text-xs font-sans font-medium tracking-wide transition-all flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-[#DCE4DD]" />
            <span>Hotline: {data.hotline}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
