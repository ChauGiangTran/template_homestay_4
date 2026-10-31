import React, { useEffect, useState } from "react";
import { CloudSun, Calendar } from "lucide-react";
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
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=85",
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

  // 1. SPLIT HERO (Default Nature Editorial)
  if (activeVariant === "split") {
    return (
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28 lg:pt-20 lg:pb-32 bg-[#FAFBF9]">
        {/* Subtle atmospheric ambient glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F0F4F1]/60 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              <div className="inline-flex items-center gap-2.5 text-xs font-sans text-[#876D4B]">
                <span className="tracking-wide font-medium">{heroData.badge}</span>
                <span className="text-[#DCE4DD]">/</span>
                <span className="text-[#718073]">Đà Lạt, 1.520m</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif text-[#18281E] font-normal leading-[1.12] tracking-tight text-balance">
                {heroData.title}
              </h1>

              <p className="text-base sm:text-lg text-[#4A584D] font-sans leading-relaxed max-w-2xl text-pretty font-light">
                {heroData.description}
              </p>

              {/* Action Buttons - responsive thumb-friendly full-width on mobile */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <button
                  onClick={() => openBookingModal()}
                  className="w-full sm:w-auto px-8 py-3.5 min-h-[44px] bg-[#18281E] text-[#FAFBF9] hover:bg-[#23392B] active:scale-[0.98] text-xs font-medium font-sans tracking-wide transition-all flex items-center justify-center gap-2.5 shadow-sm group"
                >
                  <Calendar className="w-4 h-4 text-[#DCE4DD] transition-transform group-hover:scale-110" />
                  <span>{heroData.ctaSecondary}</span>
                </button>

                <a
                  href={heroData.ctaPrimaryUrl}
                  className="w-full sm:w-auto px-7 py-3.5 min-h-[44px] bg-transparent border border-[#18281E]/30 text-[#18281E] hover:border-[#18281E] hover:bg-[#F0F4F1] active:scale-[0.98] text-xs font-medium font-sans tracking-wide transition-all flex items-center justify-center text-center"
                >
                  {heroData.ctaPrimary}
                </a>
              </div>

              {/* Meteorological & Altitude Specs */}
              <div className="pt-6 border-t border-[#DCE4DD]/80 flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-sans text-[#718073]">
                <div className="flex items-center gap-2">
                  <CloudSun className="w-4 h-4 text-[#876D4B]" />
                  <span>{heroData.temperatureSpec}</span>
                </div>
                <span className="hidden sm:inline text-[#DCE4DD]">—</span>
                <div>
                  <span>Rừng thông Đà Lạt (Dữ liệu demo)</span>
                </div>
                <span className="hidden sm:inline text-[#DCE4DD]">—</span>
                <div>
                  <span className="text-[#18281E] font-medium">{heroData.altitudeSpec}</span>
                </div>
              </div>
            </div>

            {/* Right Visual Image with Editorial Framing */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] overflow-hidden border border-[#DCE4DD] bg-[#F0F4F1] shadow-[0_12px_36px_-10px_rgba(24,40,30,0.12)] group">
                <img
                  src={heroData.image}
                  alt={heroData.title}
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                {/* Editorial Photo Annotation */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-xs text-[#FAFBF9] font-sans tracking-wide bg-[#18281E]/80 px-4 py-2.5 border border-white/15">
                  <span className="font-serif italic text-sm">Vườn Thông Sớm Mai</span>
                  <span className="text-[11px] text-[#DCE4DD]/80">06:15 AM, biển mây đồi thông</span>
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
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-[#FAFBF9] space-y-6">
          <p className="text-xs font-medium font-sans text-[#FAFBF9]/90">
            {heroData.badge}
          </p>
          <h1 className="text-4xl sm:text-6xl font-serif font-normal leading-tight">
            {heroData.title}
          </h1>
          <p className="text-base sm:text-lg text-[#FAFBF9]/85 font-sans max-w-2xl mx-auto leading-relaxed">
            {heroData.description}
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <button
              onClick={() => openBookingModal()}
              className="px-8 py-3.5 bg-[#FAFBF9] text-[#18281E] hover:bg-[#F0F4F1] text-xs font-medium font-sans"
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
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#DCE4DD] pb-8">
            <div className="max-w-3xl">
              <span className="text-xs font-sans font-medium text-[#876D4B]">
                {heroData.badge}
              </span>
              <h1 className="text-4xl sm:text-6xl font-serif mt-2 leading-tight">
                {heroData.title}
              </h1>
            </div>
            <div className="text-right shrink-0">
              <span className="text-sm font-sans text-[#718073] block">{heroData.altitudeSpec}</span>
              <button
                onClick={() => openBookingModal()}
                className="mt-3 px-6 py-2.5 bg-[#18281E] text-white text-xs font-sans font-medium"
              >
                {heroData.ctaSecondary}
              </button>
            </div>
          </div>
          <div className="aspect-[21/9] overflow-hidden border border-[#DCE4DD]">
            <img src={heroData.image} alt={heroData.title} className="w-full h-full object-cover" />
          </div>
        </div>
      </section>
    );
  }

  // 4. MINIMAL HERO
  return (
    <section className="py-20 text-center">
      <div className="max-w-3xl mx-auto px-4 space-y-6">
        <span className="text-xs font-sans font-medium text-[#876D4B]">
          {heroData.badge}
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif text-[#18281E]">{heroData.title}</h1>
        <p className="text-base text-[#4A584D] leading-relaxed">{heroData.description}</p>
        <button
          onClick={() => openBookingModal()}
          className="px-8 py-3 bg-[#18281E] text-white text-xs font-sans font-medium"
        >
          {heroData.ctaSecondary}
        </button>
      </div>
    </section>
  );
};
