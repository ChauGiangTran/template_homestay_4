import React, { useEffect, useState } from "react";
import { getClientDataValues, getImageUrl } from "../../utils/clientData";

export const AboutStorySection: React.FC = () => {
  const [data, setData] = useState({
    tagline: "Triết lý lưu trú",
    title: "VUONTHONG không chỉ là chốn nghỉ, đó là nhịp điệu của sự tĩnh lặng",
    quote:
      "“Mỗi tiếng thông reo trong gió sớm như lời nhắc nhở nhẹ nhàng: hãy buông bỏ lo toan phố thị để thật sự hiện diện nơi đây.”",
    p1: "Được xây dựng từ lòng trân quý đối với địa hình tự nhiên của Đà Lạt, chúng tôi giữ trọn vẹn từng gốc thông cổ thụ, uốn lượn các nếp nhà theo triền dốc tự nhiên để mỗi căn phòng đều sở hữu tầm nhìn không góc chết ra thung lũng.",
    p2: "Không có tivi ồn ào hay thiết bị công nghiệp xô bồ. Tại đây chỉ có tiếng lá thông reo, hương thơm nồng của gỗ thông mộc, kệ sách nhỏ bên khung cửa và tách cà phê Arabica Cầu Đất vừa mới rang xay.",
    elevation: "1.500m",
    roomsCount: "12 Căn Mộc",
    forestArea: "3.200m²",
    mainImage: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=85",
    secondaryImage: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=85",
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
    <section className="py-24 lg:py-32 bg-[#F7F9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="text-xs font-sans text-[#876D4B]">
            <span className="tracking-wide font-medium">{data.tagline}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#18281E] font-normal leading-[1.18] text-balance">
            {data.title}
          </h2>
        </div>

        {/* Story Grid with Staggered Visuals */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Visual Showcase (Images) */}
          <div className="lg:col-span-6 relative pb-12 sm:pb-16">
            <div className="relative aspect-[4/5] overflow-hidden border border-[#DCE4DD] bg-[#FAFBF9] shadow-md group">
              <img
                src={data.mainImage}
                alt="Thung lũng thông reo"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute bottom-3 left-3 bg-[#FAFBF9] px-3 py-1 border border-[#DCE4DD] text-[11px] font-sans text-[#718073]">
                Địa hình tự nhiên · 1.500m
              </div>
            </div>

            {/* Overlapping secondary photo */}
            <div className="absolute bottom-0 right-0 sm:-right-4 w-7/12 aspect-[4/3] overflow-hidden border-4 border-[#FAFBF9] shadow-xl bg-[#FAFBF9] group">
              <img
                src={data.secondaryImage}
                alt="Khoảnh khắc tĩnh lặng"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#18281E]/10 pointer-events-none" />
            </div>
          </div>

          {/* Narrative & Stats */}
          <div className="lg:col-span-6 space-y-8 lg:pl-6">
            <div className="relative pl-6 sm:pl-8 border-l-2 border-[#876D4B]">
              <span className="absolute -top-6 -left-2 text-5xl font-serif text-[#876D4B]/20 select-none pointer-events-none">
                “
              </span>
              <p className="text-lg sm:text-xl font-serif italic text-[#18281E] leading-relaxed">
                {data.quote.replace(/^[“"]|[”"]$/g, "")}
              </p>
            </div>

            <div className="space-y-4 text-sm sm:text-base font-sans text-[#4A584D] leading-relaxed font-light">
              <p className="first-letter:text-3xl first-letter:font-serif first-letter:text-[#18281E] first-letter:mr-1 first-letter:font-normal">
                {data.p1}
              </p>
              <p>{data.p2}</p>
            </div>

            {/* Retreat Stats Matrix with delicate dividing lines */}
            <div className="pt-8 border-t border-[#DCE4DD] grid grid-cols-3 divide-x divide-[#DCE4DD]">
              <div className="pr-4">
                <span className="block text-2xl sm:text-3xl font-serif text-[#18281E] font-normal">
                  {data.elevation}
                </span>
                <span className="block text-xs font-sans text-[#718073] mt-1 tracking-wide">
                  Độ cao đồi
                </span>
              </div>
              <div className="px-4">
                <span className="block text-2xl sm:text-3xl font-serif text-[#18281E] font-normal">
                  {data.roomsCount}
                </span>
                <span className="block text-xs font-sans text-[#718073] mt-1 tracking-wide">
                  Không gian riêng
                </span>
              </div>
              <div className="pl-4">
                <span className="block text-2xl sm:text-3xl font-serif text-[#18281E] font-normal">
                  {data.forestArea}
                </span>
                <span className="block text-xs font-sans text-[#718073] mt-1 tracking-wide">
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
