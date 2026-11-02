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

export const ExperiencesSection: React.FC<{ hideHeader?: boolean }> = ({ hideHeader }) => {
  const [data, setData] = useState({
    title: "Nhịp Điệu Kỳ Nghỉ",
    subtitle: "Những khoảnh khắc dung dị giúp bạn tìm lại sự cân bằng trong tâm hồn",
    experiences: [
      {
        id: "exp-morning",
        title: "05:30 · Đón Sương Sớm & Ngắm Mây",
        timeSlot: "Sáng sớm tinh mơ",
        description: "Bước ra ban công khi thung lũng còn ngái ngủ trong làn mây bồng bềnh, thưởng thức tách trà atiso ấm nóng.",
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=85",
        badge: "Thiên nhiên",
      },
      {
        id: "exp-afternoon",
        title: "15:00 · Trà Chiều & Đọc Sách Bên Hiên",
        timeSlot: "Chiều nắng nhẹ",
        description: "Chọn một cuốn tản văn yêu thích trên kệ gỗ, vuốt ve chú cún nhỏ ngoan ngoãn dưới chân hiên rợp bóng thông.",
        image: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&w=1000&q=85",
        badge: "Tĩnh lặng",
      },
      {
        id: "exp-night",
        title: "19:00 · Đốt Lửa Trại & Khoai Nướng",
        timeSlot: "Đêm se lạnh",
        description: "Quây quần bên đốm lửa bập bùng, nghe khúc nhạc mộc mạc acoustic và chia sẻ câu chuyện cùng những người bạn mới.",
        image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1000&q=85",
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
              image: getImageUrl(item.image) || "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=85",
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

  const romanNumerals = ["I", "II", "III", "IV"];

  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-[#F7F9F6] border-t border-[#DCE4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        {!hideHeader && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 sm:mb-16 pb-8 border-b border-[#DCE4DD]">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-sans text-[#876D4B]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#876D4B]" />
                <span className="tracking-widest uppercase font-medium">Hơi Thở Cao Nguyên</span>
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
        )}

        {/* Editorial Dayflow Itinerary Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {data.experiences.map((exp, index) => {
            return (
              <article
                key={exp.id}
                className="bg-[#FAFBF9] border border-[#DCE4DD] p-5 sm:p-6 flex flex-col justify-between space-y-5 shadow-xs group"
              >
                <div className="space-y-4">
                  {/* Step Index & Category Badge */}
                  <div className="flex items-center justify-between text-xs font-sans border-b border-[#DCE4DD]/80 pb-3">
                    <span className="font-serif italic text-sm text-[#876D4B] font-medium">
                      Khoảnh khắc {romanNumerals[index] || index + 1}
                    </span>
                    <span className="px-2 py-0.5 bg-[#F0F4F1] text-[11px] text-[#4A584D] border border-[#DCE4DD]">
                      {exp.badge}
                    </span>
                  </div>

                  {/* Visual */}
                  <div className="relative aspect-[4/3] overflow-hidden border border-[#DCE4DD] bg-[#F0F4F1]">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 text-[11px] font-sans text-[#FAFBF9] bg-[#18281E]/75 backdrop-blur-xs px-2.5 py-1 border border-white/10">
                      <Clock className="w-3 h-3 text-[#876D4B]" />
                      <span>{exp.timeSlot}</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-1">
                    <h3 className="text-lg sm:text-xl font-serif text-[#18281E] font-normal leading-snug group-hover:text-[#876D4B] transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-sans text-[#4A584D] leading-relaxed font-light">
                      {exp.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#DCE4DD]/60 flex items-center justify-between text-[11px] font-sans text-[#718073]">
                  <span>Vườn Thông Homestay</span>
                  <span className="italic font-serif text-[#876D4B]">Đà Lạt 1.520m</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
