import React, { useEffect, useState } from "react";
import { getClientDataValues, getImageUrl } from "../../utils/clientData";

export interface ITestimonialItem {
  id: string;
  guestName: string;
  stayDate: string;
  roomName: string;
  quote: string;
  rating: number;
  avatar: string;
}

export const TestimonialsSection: React.FC = () => {
  const [data, setData] = useState({
    title: "Cảm Nhận Từ Khách Lưu Trú",
    subtitle: "Những dòng cảm xúc mẫu minh họa cho không gian tĩnh tại tại Vườn Thông (Dữ liệu trải nghiệm demo).",
    testimonials: [
      {
        id: "review-1",
        guestName: "Hà Linh & Tuấn Anh (Demo)",
        stayDate: "Tháng 10, 2026",
        roomName: "Phòng Mây Ngàn",
        quote: "Sáng mở mắt thấy mây tràn vào sát cửa kính. Tách trà nóng, tiếng thông reo xào xạc trong gió mát, không gian tĩnh lặng tuyệt đối. Đây là kỳ nghỉ chữa lành đáng nhớ nhất của hai đứa mình.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      },
      {
        id: "review-2",
        guestName: "Minh Trí & Gia đình (Demo)",
        stayDate: "Tháng 09, 2026",
        roomName: "Bungalow Vườn Hoa",
        quote: "Gia đình mình có 2 bé nhỏ, các bạn nhân viên cực kỳ chu đáo chuẩn bị thêm đệm ấm và than nướng BBQ. Không khí trong lành, các bé mê mẩn chơi cùng chú cún ở sân vườn thông.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      },
    ] as ITestimonialItem[],
  });

  useEffect(() => {
    let active = true;

    async function loadReviews() {
      try {
        const [title, subtitle, rawItems] = await getClientDataValues(
          ["testimonials_title", "testimonials_subtitle", "testimonials_items"],
          { pageName: "Home", layoutName: "Testimonials" }
        );

        if (!active) return;

        setData((prev) => {
          let list = prev.testimonials;
          if (Array.isArray(rawItems) && rawItems.length > 0) {
            list = rawItems.map((item: any) => ({
              id: item.id || "review",
              guestName: item.guest_name || "Khách lưu trú",
              stayDate: item.stay_date || "",
              roomName: item.room_name || "Phòng Vườn Thông (Demo)",
              quote: item.quote || "",
              rating: typeof item.rating === "number" ? item.rating : 5,
              avatar: getImageUrl(item.guest_avatar) || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
            }));
          }

          return {
            title: typeof title === "string" && title.trim() ? title : prev.title,
            subtitle: typeof subtitle === "string" && subtitle.trim() ? subtitle : prev.subtitle,
            testimonials: list,
          };
        });
      } catch (err) {
        console.error("Lỗi khi tải Testimonials:", err);
      }
    }

    loadReviews();
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="py-24 lg:py-32 bg-[#F7F9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 pb-8 border-b border-[#DCE4DD]">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-sans text-[#876D4B]">
              <span className="tracking-wide font-medium">Sổ Lưu Bút Thung Lũng</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#18281E] font-normal leading-tight text-balance">
              {data.title}
            </h2>
            <p className="text-sm sm:text-base font-sans text-[#4A584D] leading-relaxed font-light">
              {data.subtitle}
            </p>
          </div>

          {/* Transparent demo data badge */}
          <div className="text-right">
            <span className="inline-block px-3 py-1 bg-[#FAFBF9] border border-[#DCE4DD] text-[11px] font-sans text-[#718073]">
              Dữ liệu cảm nhận mẫu từ khách trải nghiệm
            </span>
          </div>
        </div>

        {/* Editorial Guestbook Diptych Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {data.testimonials.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between space-y-8 p-8 sm:p-10 bg-[#FAFBF9] border border-[#DCE4DD] shadow-sm relative group"
            >
              <div className="space-y-4">
                <span className="text-4xl sm:text-5xl font-serif text-[#876D4B]/25 leading-none block select-none">
                  “
                </span>
                <p className="text-base sm:text-lg font-serif italic text-[#18281E] leading-relaxed font-normal">
                  {item.quote.replace(/^[“"]|[”"]$/g, "")}
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-[#DCE4DD]/70">
                <img
                  src={item.avatar}
                  alt={item.guestName}
                  className="w-11 h-11 rounded-full object-cover border border-[#DCE4DD] filter grayscale-[20%]"
                />
                <div>
                  <h3 className="font-serif font-medium text-base text-[#18281E]">
                    {item.guestName}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-sans text-[#718073] mt-0.5">
                    <span className="text-[#876D4B] font-medium">{item.roomName}</span>
                    <span>—</span>
                    <span>{item.stayDate}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
