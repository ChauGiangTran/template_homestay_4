import React, { useEffect, useState } from "react";
import { Coffee, Flame, Heart, Compass, Wifi, Sun, LucideIcon } from "lucide-react";
import { getClientDataValues } from "../../utils/clientData";

const ICON_MAP: Record<string, LucideIcon> = {
  Coffee,
  Flame,
  Heart,
  Compass,
  Wifi,
  Sun,
};

interface IAmenityItem {
  id: string;
  name: string;
  iconName: string;
  description: string;
  category: string;
}

export const AmenitiesSection: React.FC = () => {
  const [data, setData] = useState({
    title: "Tiện Ích Bản Địa & Tĩnh Tại",
    subtitle: "Chúng tôi giản lược những tiện nghi công nghiệp để bạn có thể tận hưởng trọn vẹn hương vị mộc mạc và sự an yên của núi đồi.",
    items: [
      {
        id: "amenity-1",
        name: "Bữa Sáng Nông Trại Hữu Cơ",
        iconName: "Coffee",
        description: "Bánh mì giòn nóng, mứt dâu tây Đà Lạt tự làm và cà phê mộc pha phin mỗi sớm mai giữa sương mù.",
        category: "Ẩm thực",
      },
      {
        id: "amenity-2",
        name: "Bếp Củi & Lò Sưởi Ngoài Trời",
        iconName: "Flame",
        description: "Khu vực đốt lửa sưởi ấm, nướng ngô khoai và quây quần trò chuyện dưới bầu trời sao đêm cao nguyên.",
        category: "Trải nghiệm",
      },
      {
        id: "amenity-3",
        name: "Cún Cưng Bản Địa Thân Thiện",
        iconName: "Heart",
        description: "Những chú cún nhỏ hiền lành, ngoan ngoãn luôn sẵn sàng bầu bạn và cùng bạn thảnh thơi dạo bước quanh vườn thông.",
        category: "Không gian",
      },
      {
        id: "amenity-4",
        name: "Trợ Lý Du Khách Chu Đáo 24/7",
        iconName: "Compass",
        description: "Hỗ trợ thuê xe máy gầm cao, xe đưa đón sân bay Liên Khương và chia sẻ những tọa độ ngắm hoàng hôn ít người biết.",
        category: "Dịch vụ",
      },
    ] as IAmenityItem[],
  });

  useEffect(() => {
    let active = true;

    async function loadAmenities() {
      try {
        const [title, subtitle, rawItems] = await getClientDataValues(
          ["amenities_title", "amenities_subtitle", "amenities_items"],
          { pageName: "Home", layoutName: "Amenities" }
        );

        if (!active) return;

        setData((prev) => {
          let list = prev.items;
          if (Array.isArray(rawItems) && rawItems.length > 0) {
            list = rawItems.map((item: any) => ({
              id: item.id || "amenity",
              name: item.name || "Tiện ích",
              iconName: item.icon_name || "Sun",
              description: item.description || "",
              category: item.category || "Tiện ích",
            }));
          }

          return {
            title: typeof title === "string" && title.trim() ? title : prev.title,
            subtitle: typeof subtitle === "string" && subtitle.trim() ? subtitle : prev.subtitle,
            items: list,
          };
        });
      } catch (err) {
        console.error("Lỗi khi tải Amenities:", err);
      }
    }

    loadAmenities();
    return () => {
      active = false;
    };
  }, []);

  const romanNumerals = ["01", "02", "03", "04", "05", "06"];

  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-[#FAFBF9] border-t border-[#DCE4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3.5">
          <div className="inline-flex items-center gap-2 text-xs font-sans text-[#876D4B]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#876D4B]" />
            <span className="tracking-widest uppercase font-medium">Chu Đáo &amp; Thuần Khiết</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#18281E] font-normal leading-tight text-balance">
            {data.title}
          </h2>
          <p className="text-sm sm:text-base font-sans text-[#4A584D] leading-relaxed font-light">
            {data.subtitle}
          </p>
        </div>

        {/* Boutique Provisions 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {data.items.map((item, index) => {
            const IconComponent = ICON_MAP[item.iconName] || Sun;
            return (
              <div
                key={item.id}
                className="bg-[#F7F9F6] border border-[#DCE4DD] p-7 flex flex-col justify-between space-y-6 shadow-xs group hover:border-[#876D4B]/50 transition-colors"
              >
                <div className="space-y-4">
                  {/* Item index & category */}
                  <div className="flex items-center justify-between text-xs font-sans border-b border-[#DCE4DD] pb-3">
                    <span className="font-serif italic text-sm text-[#876D4B] font-medium">
                      {romanNumerals[index] || `0${index + 1}`}
                    </span>
                    <span className="text-[11px] font-sans text-[#718073] tracking-wide uppercase">
                      {item.category}
                    </span>
                  </div>

                  <div className="w-10 h-10 flex items-center justify-center bg-[#FAFBF9] border border-[#DCE4DD] text-[#876D4B] group-hover:border-[#876D4B] transition-colors">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-serif text-[#18281E] font-normal leading-snug group-hover:text-[#876D4B] transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-sans text-[#4A584D] leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-2 text-[11px] font-sans text-[#876D4B] flex items-center gap-1 opacity-80">
                  <span>Trải nghiệm bản địa</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
