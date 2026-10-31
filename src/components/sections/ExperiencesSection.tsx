import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { getClientDataValues, getImageUrl } from "../../utils/clientData";

export interface IExperienceItem {
  id: string;
  title: string;
  timeSlot: string;
  description: string;
  image: string;
  badge: string;
}

export const ExperiencesSection: React.FC = () => {
  const [data, setData] = useState({
    title: "Nhịp Điệu Kỳ Nghỉ",
    subtitle: "Những khoảnh khắc dung dị giúp bạn tìm lại sự cân bằng trong tâm hồn",
    experiences: [
      {
        id: "exp-morning",
        title: "05:30, Đón Sương Sớm và Ngắm Mây",
        timeSlot: "Sáng sớm tinh mơ",
        description: "Bước ra ban công khi thung lũng còn ngái ngủ trong làn mây bồng bềnh, thưởng thức tách trà atiso ấm nóng.",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        badge: "Thiên nhiên",
      },
      {
        id: "exp-afternoon",
        title: "15:00, Trà Chiều và Đọc Sách Bên Hiên",
        timeSlot: "Chiều nắng nhẹ",
        description: "Chọn một cuốn tản văn yêu thích trên kệ gỗ, vuốt ve chú cún nhỏ ngoan ngoãn dưới chân hiên rợp bóng thông.",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
        badge: "Tĩnh lặng",
      },
      {
        id: "exp-night",
        title: "19:00, Đốt Lửa Trại và Khoai Nướng",
        timeSlot: "Đêm se lạnh",
        description: "Quây quần bên đốm lửa bập bùng, nghe khúc nhạc mộc mạc acoustic và chia sẻ câu chuyện cùng những người bạn mới.",
        image: "https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=800&q=80",
        badge: "Ấm cúng",
      },
    ] as IExperienceItem[],
  });

  useEffect(() => {
    let active = true;

    async function loadExperiences() {
      try {
        const [title, subtitle, rawList] = await getClientDataValues(
          ["experiences_title", "experiences_subtitle", "experiences_list"],
          { pageName: "Home", layoutName: "Experiences" }
        );

        if (!active) return;

        setData((prev) => {
          let list = prev.experiences;
          if (Array.isArray(rawList) && rawList.length > 0) {
            list = rawList.map((item: any) => ({
              id: item.id || "exp",
              title: item.title || "Trải nghiệm",
              timeSlot: item.time_slot || "",
              description: item.description || "",
              image: getImageUrl(item.image) || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
              badge: item.badge || "Retreat",
            }));
          }

          return {
            title: typeof title === "string" && title.trim() ? title : prev.title,
            subtitle: typeof subtitle === "string" && subtitle.trim() ? subtitle : prev.subtitle,
            experiences: list,
          };
        });
      } catch (err) {
        console.error("Lỗi khi tải Experiences:", err);
      }
    }

    loadExperiences();
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="py-24 lg:py-32 bg-[#FAFBF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-[#DCE4DD]">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-sans text-[#876D4B]">
              <span className="tracking-wide font-medium">Hơi Thở Cao Nguyên</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#18281E] font-normal leading-tight text-balance">
              {data.title}
            </h2>
            <p className="text-sm sm:text-base font-sans text-[#4A584D] leading-relaxed font-light">
              {data.subtitle}
            </p>
          </div>
          <div className="text-xs font-sans text-[#718073]">
            <span>3 Khoảnh khắc thường nhật</span>
          </div>
        </div>

        {/* Editorial Timeline Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {data.experiences.map((exp, index) => {
            const isFirst = index === 0;
            return (
              <div
                key={exp.id}
                className={`${
                  isFirst ? "lg:col-span-6" : "lg:col-span-3"
                } flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#DCE4DD] pb-8 lg:pb-0 lg:pr-8 last:border-none last:pb-0 last:pr-0 group`}
              >
                <div className="space-y-5">
                  <div
                    className={`overflow-hidden border border-[#DCE4DD] bg-[#F0F4F1] relative ${
                      isFirst ? "aspect-[16/10]" : "aspect-[4/3]"
                    }`}
                  >
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-[#FAFBF9] px-2.5 py-1 border border-[#DCE4DD] text-[11px] font-sans text-[#18281E]">
                      {exp.badge}
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-sans text-[#876D4B]">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span className="tracking-wide uppercase font-medium">{exp.timeSlot}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-serif text-[#18281E] font-normal leading-snug">
                      {exp.title}
                    </h3>

                    <p className="text-sm font-sans text-[#4A584D] leading-relaxed font-light">
                      {exp.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-[#DCE4DD]/60 flex items-center justify-between text-xs font-sans text-[#718073]">
                  <span>Vườn Thông Homestay</span>
                  <span className="italic font-serif text-[#876D4B]">Đà Lạt</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
