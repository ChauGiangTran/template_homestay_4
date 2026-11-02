import React, { useState, useEffect } from "react";
import { GallerySection } from "../components/sections/GallerySection";
import { BookingCTASection } from "../components/sections/BookingCTASection";
import { getClientDataValues } from "../utils/clientData";

export const GalleryPage: React.FC = () => {
  const [selectedVariant, setSelectedVariant] = useState<"masonry" | "grid" | "asymmetric">("masonry");
  const [heroData, setHeroData] = useState({
    title: "Khung Hình Thơ Mộng",
    description: "Những góc nhỏ bình yên, giọt sương mai trên cành thông và nụ cười ấm áp của khách lưu trú.",
  });

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const [title, desc] = await getClientDataValues(
          ["page_title", "page_description"],
          { pageName: "Gallery", layoutName: "GalleryHero" }
        );
        if (active) {
          setHeroData((prev) => ({
            title: typeof title === "string" && title.trim() ? title : prev.title,
            description: typeof desc === "string" && desc.trim() ? desc : prev.description,
          }));
        }
      } catch (err) {
        console.error("Lỗi tải GalleryHero:", err);
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
        <div className="border-b border-[#DCE4DD] pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-sans text-[#876D4B]">
              <span className="tracking-wide font-medium">Thư Viện Ảnh</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#18281E] font-normal leading-tight text-balance">
              {heroData.title}
            </h1>
            <p className="text-base text-[#4A584D] font-sans leading-relaxed font-light">
              {heroData.description}
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-[#F0F4F1] border border-[#DCE4DD] text-xs font-sans">
            <span className="px-2 text-[#718073]">Hiển thị:</span>
            <button
              onClick={() => setSelectedVariant("masonry")}
              className={`px-3 py-1 transition-colors ${
                selectedVariant === "masonry" ? "bg-[#18281E] text-white font-medium" : "text-[#4A584D] hover:text-[#18281E]"
              }`}
            >
              Masonry
            </button>
            <button
              onClick={() => setSelectedVariant("grid")}
              className={`px-3 py-1 transition-colors ${
                selectedVariant === "grid" ? "bg-[#18281E] text-white font-medium" : "text-[#4A584D] hover:text-[#18281E]"
              }`}
            >
              Lưới Đều
            </button>
            <button
              onClick={() => setSelectedVariant("asymmetric")}
              className={`px-3 py-1 transition-colors ${
                selectedVariant === "asymmetric" ? "bg-[#18281E] text-white font-medium" : "text-[#4A584D] hover:text-[#18281E]"
              }`}
            >
              Asymmetric
            </button>
          </div>
        </div>
      </div>

      <GallerySection forcedVariant={selectedVariant} hideHeader={true} />
      <BookingCTASection />
    </main>
  );
};
