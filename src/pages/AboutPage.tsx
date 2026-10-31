import React, { useState, useEffect } from "react";
import { AboutStorySection } from "../components/sections/AboutStorySection";
import { BookingCTASection } from "../components/sections/BookingCTASection";
import { getClientDataValues } from "../utils/clientData";

export const AboutPage: React.FC = () => {
  const [heroData, setHeroData] = useState({
    title: "Hành Trình Khởi Tạo Trạm Dừng Chân Giữa Đồi Thông",
    description: "Nơi kết nối con người với thiên nhiên thuần khiết và sự an yên sâu thẳm giữa miền thông reo đại ngàn.",
  });

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const [title, desc] = await getClientDataValues(
          ["page_title", "page_description"],
          { pageName: "About", layoutName: "AboutHero" }
        );
        if (active) {
          setHeroData((prev) => ({
            title: typeof title === "string" && title.trim() ? title : prev.title,
            description: typeof desc === "string" && desc.trim() ? desc : prev.description,
          }));
        }
      } catch (err) {
        console.error("Lỗi tải AboutHero:", err);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-sans font-medium text-[#876D4B]">
            Về VUONTHONG Homestay
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#18281E]">
            {heroData.title}
          </h1>
          <p className="text-base sm:text-lg text-[#4A584D] font-sans leading-relaxed">
            {heroData.description}
          </p>
        </div>
      </div>

      <AboutStorySection />

      {/* Sustainable & Mindful Living Details */}
      <section className="py-24 bg-[#FAFBF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#DCE4DD]">
            <div className="space-y-3 pb-8 md:pb-0 md:pr-10">
              <span className="text-xs font-sans font-medium text-[#876D4B] tracking-wide">
                Bảo Tồn Địa Hình
              </span>
              <h2 className="font-serif text-2xl text-[#18281E] font-normal">Không San Bạt Đồi</h2>
              <p className="text-sm text-[#4A584D] leading-relaxed font-light">
                Các khối nhà gỗ được thiết kế sàn nâng nhẹ nhàng theo dốc tự nhiên, giữ trọn vẹn rễ của từng cây thông già hơn 30 năm tuổi.
              </p>
            </div>

            <div className="space-y-3 py-8 md:py-0 md:px-10">
              <span className="text-xs font-sans font-medium text-[#876D4B] tracking-wide">
                Nông Sản Bản Địa
              </span>
              <h2 className="font-serif text-2xl text-[#18281E] font-normal">Mùa Nào Thức Nấy</h2>
              <p className="text-sm text-[#4A584D] leading-relaxed font-light">
                Tất cả nguyên liệu bữa sáng, trà atiso và rau củ BBQ đều được thu hái trực tiếp từ các nông trại hữu cơ lân cận tại Đơn Dương và Cầu Đất.
              </p>
            </div>

            <div className="space-y-3 pt-8 md:pt-0 md:pl-10">
              <span className="text-xs font-sans font-medium text-[#876D4B] tracking-wide">
                Tĩnh Lặng Về Đêm
              </span>
              <h2 className="font-serif text-2xl text-[#18281E] font-normal">Không Rác Thải Âm Thanh</h2>
              <p className="text-sm text-[#4A584D] leading-relaxed font-light">
                Sau 22:00, toàn bộ khu nghỉ trở về với sự yên lặng tuyệt đối để bạn có một giấc ngủ say trọn vẹn trong hơi thở sương đêm.
              </p>
            </div>
          </div>
        </div>
      </section>

      <BookingCTASection />
    </main>
  );
};
