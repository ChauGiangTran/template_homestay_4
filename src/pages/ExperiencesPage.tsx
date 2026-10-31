import React, { useState, useEffect } from "react";
import { ExperiencesSection } from "../components/sections/ExperiencesSection";
import { AmenitiesSection } from "../components/sections/AmenitiesSection";
import { BookingCTASection } from "../components/sections/BookingCTASection";
import { getClientDataValues } from "../utils/clientData";

export const ExperiencesPage: React.FC = () => {
  const [heroData, setHeroData] = useState({
    title: "Một Ngày Thảnh Thơi Nơi Thung Lũng Sương",
    description: "Mỗi khoảnh khắc tại VUONTHONG đều mang đến cho bạn cơ hội kết nối lại với chính mình và thiên nhiên thuần khiết.",
  });

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const [title, desc] = await getClientDataValues(
          ["page_title", "page_description"],
          { pageName: "Experiences", layoutName: "ExperiencesHero" }
        );
        if (active) {
          setHeroData((prev) => ({
            title: typeof title === "string" && title.trim() ? title : prev.title,
            description: typeof desc === "string" && desc.trim() ? desc : prev.description,
          }));
        }
      } catch (err) {
        console.error("Lỗi tải ExperiencesHero:", err);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-sans text-[#876D4B]">
            <span className="tracking-wide font-medium">Trải Nghiệm &amp; Hoạt Động</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#18281E] font-normal leading-tight text-balance">
            {heroData.title}
          </h1>
          <p className="text-base text-[#4A584D] font-sans leading-relaxed font-light">
            {heroData.description}
          </p>
        </div>
      </div>

      <ExperiencesSection />
      <AmenitiesSection />
      <BookingCTASection />
    </main>
  );
};
