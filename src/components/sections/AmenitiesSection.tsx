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
    title: "Tiện Ích Bản Địa và Tĩnh Tại",
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

  return (
    <section className="py-24 lg:py-32 bg-[#F7F9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Editorial Philosophy */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs font-sans text-[#876D4B]">
              <span className="tracking-wide font-medium">Chu Đáo &amp; Thuần Khiết</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#18281E] font-normal leading-tight text-balance">
              {data.title}
            </h2>
            <p className="text-sm sm:text-base font-sans text-[#4A584D] leading-relaxed font-light">
              {data.subtitle}
            </p>

            {/* Atmospheric photo insert */}
            <div className="pt-4">
              <div className="relative aspect-[4/3] overflow-hidden border border-[#DCE4DD] bg-[#FAFBF9] shadow-sm group">
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80"
                  alt="Không gian thư giãn mộc mạc"
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 text-xs text-[#FAFBF9] font-sans">
                  <span>Hiên thưởng trà chiều bên rặng thông</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Clean List with Hairline Dividers */}
          <div className="lg:col-span-7 divide-y divide-[#DCE4DD] border-y border-[#DCE4DD]">
            {data.items.map((item) => {
              const IconComponent = ICON_MAP[item.iconName] || Sun;
              return (
                <div
                  key={item.id}
                  className="py-7 flex items-start gap-5 sm:gap-6 group transition-colors"
                >
                  <div className="p-2.5 bg-[#FAFBF9] border border-[#DCE4DD] text-[#876D4B] shrink-0 group-hover:border-[#876D4B] transition-colors mt-0.5">
                    <IconComponent className="w-5 h-5 text-[#876D4B]" />
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <h3 className="text-xl font-serif text-[#18281E] font-normal group-hover:text-[#876D4B] transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-[11px] font-sans text-[#876D4B] uppercase tracking-wider">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-sm font-sans text-[#4A584D] leading-relaxed font-light max-w-xl">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
