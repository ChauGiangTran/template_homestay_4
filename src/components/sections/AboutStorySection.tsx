import React, { useEffect, useState } from "react";
import { getClientDataValues, getImageUrl } from "../../utils/clientData";

export const AboutStorySection: React.FC<{ hideHeader?: boolean }> = ({ hideHeader }) => {
  const [data, setData] = useState({
    tagline: "Triết lý lưu trú",
    title: "VUONTHONG không chỉ là chốn nghỉ, đó là nhịp điệu của sự tĩnh lặng",
    quote:
      "Mỗi tiếng thông reo trong gió sớm như lời nhắc nhở nhẹ nhàng: hãy buông bỏ lo toan phố thị để thật sự hiện diện nơi đây.",
    p1: "Được xây dựng từ lòng trân quý đối với địa hình tự nhiên của Đà Lạt, chúng tôi giữ trọn vẹn từng gốc thông cổ thụ, uốn lượn các nếp nhà theo triền dốc tự nhiên để mỗi căn phòng đều sở hữu tầm nhìn không góc chết ra thung lũng.",
    p2: "Không có tivi ồn ào hay thiết bị công nghiệp xô bồ. Tại đây chỉ có tiếng lá thông reo, hương thơm nồng của gỗ thông mộc, kệ sách nhỏ bên khung cửa và tách cà phê Arabica Cầu Đất vừa mới rang xay.",
    elevation: "1.520m",
    roomsCount: "12 Căn Mộc",
    forestArea: "3.200m²",
    mainImage: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=900&q=85",
  });

  useEffect(() => {
    let active = true;

    async function loadData() {
      try {
        const [
          tagline,
          title,
          quote,
          p1,
          p2,
          elev,
          rooms,
          forest,
          imgMain,
          imgSec,
        ] = await getClientDataValues(
          [
            "about_tagline",
            "about_title",
            "about_quote",
            "about_story_p1",
            "about_story_p2",
            "about_stat_elevation",
            "about_stat_rooms",
            "about_stat_forest_area",
            "about_main_image",
            "about_secondary_image",
          ],
          { pageName: "Home", layoutName: "AboutStory" }
        );

        if (!active) return;

        setData((prev) => ({
          ...prev,
          tagline: typeof tagline === "string" && tagline.trim() ? tagline : prev.tagline,
          title: typeof title === "string" && title.trim() ? title : prev.title,
          quote: typeof quote === "string" && quote.trim() ? quote : prev.quote,
          p1: typeof p1 === "string" && p1.trim() ? p1 : prev.p1,
          p2: typeof p2 === "string" && p2.trim() ? p2 : prev.p2,
          elevation: typeof elev === "string" && elev.trim() ? elev : prev.elevation,
          roomsCount: typeof rooms === "string" && rooms.trim() ? rooms : prev.roomsCount,
          forestArea: typeof forest === "string" && forest.trim() ? forest : prev.forestArea,
          mainImage: getImageUrl(imgMain) || prev.mainImage,
          secondaryImage: getImageUrl(imgSec) || prev.secondaryImage,
        }));
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu AboutStory:", err);
      }
    }

    loadData();
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-[#F7F9F6] border-t border-[#DCE4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Refined Editorial Hierarchy */}
        {!hideHeader && (
          <div className="max-w-3xl mb-14 sm:mb-16 space-y-3.5">
            <div className="inline-flex items-center gap-2 text-xs font-sans text-[#876D4B]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#876D4B]" />
              <span className="tracking-widest uppercase font-medium">{data.tagline}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#18281E] font-normal leading-[1.16] text-balance">
              {data.title}
            </h2>
          </div>
        )}

        {/* Editorial Magazine Spread Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Visual Showcase (Refined Diptych Composition) */}
          <div className="lg:col-span-6 grid grid-cols-12 gap-4 sm:gap-6 items-end">
            {/* Primary Tall Architectural Photo */}
            <div className="col-span-7 relative aspect-[4/5] overflow-hidden border border-[#DCE4DD] bg-[#FAFBF9] shadow-sm group">
              <img
                src={data.mainImage}
                alt="Địa hình tự nhiên và rừng thông Đà Lạt"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute bottom-3 left-3 bg-[#18281E]/80 backdrop-blur-sm px-2.5 py-1 text-[11px] font-sans text-[#FAFBF9] border border-white/10">
                Nắng sớm triền đồi
              </div>
            </div>

            {/* Secondary Companion Photo */}
            <div className="col-span-5 relative aspect-[3/4] overflow-hidden border border-[#DCE4DD] bg-[#FAFBF9] shadow-sm group">
              <img
                src={data.secondaryImage}
                alt="Nhánh thông và sương sớm"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#18281E]/10 pointer-events-none" />
              <div className="absolute bottom-3 left-3 bg-[#18281E]/80 backdrop-blur-sm px-2 py-0.5 text-[10px] font-sans text-[#FAFBF9] border border-white/10">
                Tán thông ngàn
              </div>
            </div>
          </div>

          {/* Narrative & Retreat Matrix */}
          <div className="lg:col-span-6 space-y-8 lg:pl-4">
            {/* Contemplative Pullquote */}
            <blockquote className="relative pl-6 sm:pl-7 border-l-2 border-[#876D4B] space-y-2">
              <p className="text-lg sm:text-xl font-serif italic text-[#18281E] leading-relaxed">
                “{data.quote.replace(/^[“"]|[”"]$/g, "")}”
              </p>
              <cite className="block text-xs font-sans text-[#876D4B] not-italic tracking-wider uppercase font-medium">
                — Ghi chép từ quản gia Vườn Thông
              </cite>
            </blockquote>

            {/* Narrative Body Copy (Clean typography without buggy dropcap) */}
            <div className="space-y-4 text-sm sm:text-base font-sans text-[#4A584D] leading-relaxed font-light">
              <p className="text-[#18281E] font-serif text-base sm:text-lg leading-relaxed italic">
                {data.p1}
              </p>
              <p>{data.p2}</p>
            </div>

            {/* Retreat Stats Matrix with Delicate Editorial Dividers */}
            <div className="pt-6 border-t border-[#DCE4DD] grid grid-cols-3 gap-2 sm:gap-4 divide-x divide-[#DCE4DD]">
              <div className="pr-2 sm:pr-6">
                <span className="block text-xl sm:text-2xl lg:text-3xl font-serif text-[#18281E] font-normal">
                  {data.elevation}
                </span>
                <span className="block text-[11px] sm:text-xs font-sans text-[#718073] mt-1 tracking-wide">
                  Độ cao đồi
                </span>
              </div>
              <div className="px-2 sm:px-6">
                <span className="block text-xl sm:text-2xl lg:text-3xl font-serif text-[#18281E] font-normal">
                  {data.roomsCount}
                </span>
                <span className="block text-[11px] sm:text-xs font-sans text-[#718073] mt-1 tracking-wide">
                  Không gian riêng
                </span>
              </div>
              <div className="pl-2 sm:pl-6">
                <span className="block text-xl sm:text-2xl lg:text-3xl font-serif text-[#18281E] font-normal">
                  {data.forestArea}
                </span>
                <span className="block text-[11px] sm:text-xs font-sans text-[#718073] mt-1 tracking-wide">
                  Đồi thông xanh
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
