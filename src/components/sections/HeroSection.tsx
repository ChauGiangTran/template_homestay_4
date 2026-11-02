import React, { useEffect, useState } from "react";
import { CloudSun, Calendar, ArrowUpRight, Compass } from "lucide-react";
import { getClientDataValues, getImageUrl } from "../../utils/clientData";
import { useBookingModal } from "../../context/BookingModalContext";

interface IHeroProps {
  forcedVariant?: "split" | "fullscreen" | "editorial" | "minimal";
}

export const HeroSection: React.FC<IHeroProps> = ({ forcedVariant }) => {
  const { openBookingModal } = useBookingModal();

  const [heroData, setHeroData] = useState({
    variant: "split",
    badge: "Trở về với sự thảnh thơi",
    title: "Chạm vào bình yên, giữa miền xanh bất tận",
    description:
      "Một trạm dừng mộc mạc nép mình bên triền rừng thông bạt ngàn Đà Lạt. Nơi bạn thức giấc cùng biển mây tràn qua ô cửa kính, nhấp ngụm trà nóng bên hiên gỗ và quây quần bên bếp lửa hồng mỗi hoàng hôn buông.",
    ctaPrimary: "Khám Phá Không Gian",
    ctaPrimaryUrl: "#rooms",
    ctaSecondary: "Gửi Yêu Cầu Đặt Phòng",
    ctaSecondaryUrl: "/contact",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=85",
    altitudeSpec: "1.520m so với mực nước biển",
    temperatureSpec: "16°C, sương sớm trong lành",
  });

  useEffect(() => {
    let active = true;

    async function loadHero() {
      try {
        const [
          variant,
          badge,
          title,
          desc,
          cta1,
          cta1Url,
          cta2,
          cta2Url,
          image,
          altSpec,
          tempSpec,
        ] = await getClientDataValues(
          [
            "hero_variant",
            "hero_badge",
            "hero_title",
            "hero_description",
            "hero_cta_primary",
            "hero_cta_primary_url",
            "hero_cta_secondary",
            "hero_cta_secondary_url",
            "hero_image",
            "hero_altitude_spec",
            "hero_temperature_spec",
          ],
          { pageName: "Home", layoutName: "Hero" }
        );

        if (!active) return;

        setHeroData((prev) => ({
          ...prev,
          variant: forcedVariant || (typeof variant === "string" && variant.trim() ? variant : prev.variant),
          badge: typeof badge === "string" && badge.trim() ? badge : prev.badge,
          title: typeof title === "string" && title.trim() ? title : prev.title,
          description: typeof desc === "string" && desc.trim() ? desc : prev.description,
          ctaPrimary: typeof cta1 === "string" && cta1.trim() ? cta1 : prev.ctaPrimary,
          ctaPrimaryUrl: typeof cta1Url === "string" && cta1Url.trim() ? cta1Url : prev.ctaPrimaryUrl,
          ctaSecondary: typeof cta2 === "string" && cta2.trim() ? cta2 : prev.ctaSecondary,
          ctaSecondaryUrl: typeof cta2Url === "string" && cta2Url.trim() ? cta2Url : prev.ctaSecondaryUrl,
          image: getImageUrl(image) || prev.image,
          altitudeSpec: typeof altSpec === "string" && altSpec.trim() ? altSpec : prev.altitudeSpec,
          temperatureSpec: typeof tempSpec === "string" && tempSpec.trim() ? tempSpec : prev.temperatureSpec,
        }));
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu Hero:", err);
      }
    }

    loadHero();
    return () => {
      active = false;
    };
  }, [forcedVariant]);

  const activeVariant = forcedVariant || heroData.variant;

  // Split title intelligently for editorial cadence
  const renderEditorialTitle = (rawTitle: string) => {
    if (rawTitle.includes(",")) {
      const parts = rawTitle.split(",");
      return (
        <>
          <span className="block">{parts[0].trim()},</span>
          <span className="block font-serif italic text-[#876D4B] font-light mt-1 sm:mt-2">
            {parts.slice(1).join(",").trim()}
          </span>
        </>
      );
    }
    return rawTitle;
  };

  // 1. SPLIT HERO (Elevated Nature Editorial)
  if (activeVariant === "split") {
    return (
      <section className="relative overflow-hidden pt-10 pb-16 sm:pt-14 sm:pb-24 lg:pt-16 lg:pb-28 bg-[#FAFBF9]">
        {/* Subtle atmospheric ambient glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F0F4F1]/70 rounded-full blur-3xl pointer-events-none -mr-28 -mt-28" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-7">
              {/* Editorial Badge & Coordinates */}
              <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-[#F0F4F1] border border-[#DCE4DD] text-xs font-sans text-[#718073]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#876D4B]" />
                <span className="tracking-wider uppercase font-medium text-[#18281E]">
                  {heroData.badge}
                </span>
                <span className="text-[#DCE4DD]">/</span>
                <span className="text-[#876D4B]">Đà Lạt · 1.520m</span>
              </div>

              {/* Master Display Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-serif text-[#18281E] font-normal leading-[1.1] tracking-tight text-balance">
                {renderEditorialTitle(heroData.title)}
              </h1>

              {/* Atmospheric Narrative */}
              <p className="text-base sm:text-lg text-[#4A584D] font-sans leading-relaxed max-w-2xl text-pretty font-light">
                {heroData.description}
              </p>

              {/* Action Buttons - Refined Visual Hierarchy */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
                <button
                  onClick={() => openBookingModal()}
                  className="w-full sm:w-auto px-8 py-3.5 min-h-[46px] bg-[#18281E] text-[#FAFBF9] hover:bg-[#23392B] active:scale-[0.98] text-xs font-medium font-sans tracking-wide transition-all flex items-center justify-center gap-2.5 shadow-sm group"
                >
                  <Calendar className="w-4 h-4 text-[#876D4B] transition-transform group-hover:scale-110" />
                  <span>{heroData.ctaSecondary}</span>
                </button>

                <a
                  href={heroData.ctaPrimaryUrl}
                  className="w-full sm:w-auto px-7 py-3.5 min-h-[46px] bg-transparent border border-[#18281E]/30 text-[#18281E] hover:border-[#18281E] hover:bg-[#F0F4F1] active:scale-[0.98] text-xs font-medium font-sans tracking-wide transition-all flex items-center justify-center gap-1.5 group"
                >
                  <span>{heroData.ctaPrimary}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#876D4B] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>

              {/* Meteorological & Altitude Specs Bar */}
              <div className="pt-5 border-t border-[#DCE4DD] flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-sans text-[#718073]">
                <div className="flex items-center gap-2">
                  <CloudSun className="w-4 h-4 text-[#876D4B]" />
                  <span>{heroData.temperatureSpec}</span>
                </div>
                <span className="hidden sm:inline text-[#DCE4DD]">•</span>
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#876D4B]" />
                  <span>Rừng thông Hoàng Hoa Thám</span>
                </div>
                <span className="hidden sm:inline text-[#DCE4DD]">•</span>
                <div>
                  <span className="text-[#18281E] font-medium">{heroData.altitudeSpec}</span>
                </div>
              </div>
            </div>

            {/* Right Visual Image with Editorial Framing */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] overflow-hidden border border-[#DCE4DD] bg-[#F0F4F1] shadow-[0_16px_40px_-12px_rgba(24,40,30,0.14)] group">
                <img
                  src={heroData.image}
                  alt={heroData.title}
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />

                {/* Editorial Photo Location Annotation */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#FAFBF9] font-sans tracking-wide bg-[#18281E]/80 backdrop-blur-sm px-4 py-2.5 border border-white/15">
                  <span className="font-serif italic text-sm">Thung Lũng Thông Sớm Mai</span>
                  <span className="text-[11px] text-[#DCE4DD]/85">Đà Lạt · Biển mây 1.520m</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // 2. FULLSCREEN HERO VARIANT
  if (activeVariant === "fullscreen") {
    return (
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <img
          src={heroData.image}
          alt={heroData.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#121E16]/55" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-[#FAFBF9] space-y-6">
          <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-sans tracking-widest uppercase">
            {heroData.badge}
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal leading-[1.12]">
            {heroData.title}
          </h1>
          <p className="text-base sm:text-lg text-[#FAFBF9]/90 font-sans max-w-2xl mx-auto leading-relaxed font-light">
            {heroData.description}
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <button
              onClick={() => openBookingModal()}
              className="px-8 py-3.5 bg-[#FAFBF9] text-[#18281E] hover:bg-[#F0F4F1] text-xs font-medium font-sans tracking-wide transition-all shadow-md"
            >
              {heroData.ctaSecondary}
            </button>
          </div>
        </div>
      </section>
    );
  }

  // 3. EDITORIAL HERO VARIANT (Magazine style)
  if (activeVariant === "editorial") {
    return (
      <section className="py-16 md:py-24 bg-[#FAFBF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#DCE4DD] pb-8">
            <div className="max-w-3xl space-y-2">
              <span className="text-xs font-sans font-medium text-[#876D4B] tracking-wider uppercase">
                {heroData.badge}
              </span>
              <h1 className="text-4xl sm:text-6xl font-serif leading-[1.12] text-[#18281E]">
                {renderEditorialTitle(heroData.title)}
              </h1>
            </div>
            <div className="text-right shrink-0">
              <span className="text-xs font-sans text-[#718073] block">{heroData.altitudeSpec}</span>
              <button
                onClick={() => openBookingModal()}
                className="mt-3 px-6 py-2.5 bg-[#18281E] hover:bg-[#23392B] text-white text-xs font-sans font-medium tracking-wide transition-colors"
              >
                {heroData.ctaSecondary}
              </button>
            </div>
          </div>
          <div className="aspect-[21/9] overflow-hidden border border-[#DCE4DD] relative">
            <img src={heroData.image} alt={heroData.title} className="w-full h-full object-cover" />
            <div className="absolute bottom-4 left-4 bg-[#18281E]/80 backdrop-blur-sm px-4 py-2 text-xs font-sans text-white border border-white/10">
              Đà Lạt · Độ cao 1.520m
            </div>
          </div>
        </div>
      </section>
    );
  }

  // 4. MINIMAL HERO
  return (
    <section className="py-20 text-center bg-[#FAFBF9]">
      <div className="max-w-3xl mx-auto px-4 space-y-6">
        <span className="text-xs font-sans font-medium text-[#876D4B] tracking-wider uppercase">
          {heroData.badge}
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif text-[#18281E] leading-tight">
          {renderEditorialTitle(heroData.title)}
        </h1>
        <p className="text-base text-[#4A584D] leading-relaxed font-light">{heroData.description}</p>
        <button
          onClick={() => openBookingModal()}
          className="px-8 py-3 bg-[#18281E] hover:bg-[#23392B] text-white text-xs font-sans font-medium tracking-wide transition-colors"
        >
          {heroData.ctaSecondary}
        </button>
      </div>
    </section>
  );
};
