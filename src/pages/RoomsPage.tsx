import React, { useState, useEffect } from "react";
import { RoomsSection } from "../components/sections/RoomsSection";
import { BookingCTASection } from "../components/sections/BookingCTASection";
import { getClientDataValues } from "../utils/clientData";

export const RoomsPage: React.FC = () => {
  const [selectedVariant, setSelectedVariant] = useState<"editorial" | "grid" | "horizontal">("editorial");
  const [heroData, setHeroData] = useState({
    title: "Hạng Phòng Nghỉ Dưỡng",
    description:
      "Mỗi căn phòng tại VUONTHONG đều được bài trí với sự trân trọng tối đa dành cho không gian tĩnh lặng và thiên nhiên thung lũng.",
  });

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const [title, desc] = await getClientDataValues(
          ["page_title", "page_description"],
          { pageName: "Rooms", layoutName: "RoomsHero" }
        );
        if (active) {
          setHeroData((prev) => ({
            title: typeof title === "string" && title.trim() ? title : prev.title,
            description: typeof desc === "string" && desc.trim() ? desc : prev.description,
          }));
        }
      } catch (err) {
        console.error("Lỗi tải RoomsHero:", err);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="border-b border-[#DCE4DD] pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-sans text-[#876D4B]">
              <span className="tracking-wide font-medium">Danh Mục Lưu Trú</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#18281E] font-normal leading-tight text-balance">
              {heroData.title}
            </h1>
            <p className="text-sm sm:text-base font-sans text-[#4A584D] leading-relaxed font-light">
              {heroData.description}
            </p>
          </div>

          {/* Layout variant switcher for rooms page */}
          <div className="flex items-center gap-1.5 p-1 bg-[#F0F4F1] border border-[#DCE4DD] text-xs font-sans">
            <span className="px-2 text-[#718073]">Hiển thị:</span>
            <button
              onClick={() => setSelectedVariant("editorial")}
              className={`px-3 py-1 transition-colors ${
                selectedVariant === "editorial"
                  ? "bg-[#18281E] text-white font-medium"
                  : "text-[#4A584D] hover:text-[#18281E]"
              }`}
            >
              Editorial
            </button>
            <button
              onClick={() => setSelectedVariant("grid")}
              className={`px-3 py-1 transition-colors ${
                selectedVariant === "grid"
                  ? "bg-[#18281E] text-white font-medium"
                  : "text-[#4A584D] hover:text-[#18281E]"
              }`}
            >
              Lưới 3 Cột
            </button>
            <button
              onClick={() => setSelectedVariant("horizontal")}
              className={`px-3 py-1 transition-colors ${
                selectedVariant === "horizontal"
                  ? "bg-[#18281E] text-white font-medium"
                  : "text-[#4A584D] hover:text-[#18281E]"
              }`}
            >
              Trượt Ngang
            </button>
          </div>
        </div>
      </div>

      <RoomsSection forcedVariant={selectedVariant} hideHeader={true} />
      <BookingCTASection />
    </main>
  );
};
