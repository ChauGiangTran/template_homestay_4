import React, { useEffect, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { getClientDataValues, getImageUrl } from "../../utils/clientData";

export interface IGalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  aspectRatio: string;
}

interface IGallerySectionProps {
  forcedVariant?: "masonry" | "grid" | "asymmetric";
  hideHeader?: boolean;
}

export const GallerySection: React.FC<IGallerySectionProps> = ({ forcedVariant, hideHeader }) => {
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const [data, setData] = useState({
    variant: "masonry",
    title: "Góc Nhìn Thung Lũng",
    subtitle: "Những khung hình lưu lại nét đẹp bình dị qua bốn mùa thông reo Đà Lạt.",
    items: [
      {
        id: "g-1",
        title: "Thung lũng thông reo đón biển mây sớm mai",
        category: "Cảnh quan",
        image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=85",
        aspectRatio: "wide",
      },
      {
        id: "g-2",
        title: "Không gian phòng Mây Ngàn ấm cúng",
        category: "Phòng nghỉ",
        image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=85",
        aspectRatio: "portrait",
      },
      {
        id: "g-3",
        title: "Bếp lửa bập bùng sưởi ấm đêm lạnh",
        category: "Khoảnh khắc",
        image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=85",
        aspectRatio: "square",
      },
      {
        id: "g-4",
        title: "Ánh nắng vàng xuyên qua triền đồi thông",
        category: "Thiên nhiên",
        image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=85",
        aspectRatio: "portrait",
      },
      {
        id: "g-5",
        title: "Tách trà atiso ấm nóng bên hiên gỗ",
        category: "Khoảnh khắc",
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=85",
        aspectRatio: "wide",
      },
      {
        id: "g-6",
        title: "Tán thông cổ thụ chạm vào bầu trời sương",
        category: "Thiên nhiên",
        image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=85",
        aspectRatio: "square",
      },
    ] as IGalleryItem[],
  });

  useEffect(() => {
    let active = true;

    async function loadGallery() {
      try {
        const [variant, title, subtitle, rawItems] = await getClientDataValues(
          ["gallery_variant", "gallery_title", "gallery_subtitle", "gallery_items"],
          { pageName: "Home", layoutName: "Gallery" }
        );

        if (!active) return;

        setData((prev) => {
          let list = prev.items;
          if (Array.isArray(rawItems) && rawItems.length > 0) {
            list = rawItems.map((item: any) => ({
              id: item.id || "gallery",
              title: item.title || "",
              category: item.category || "Cảnh quan",
              image: getImageUrl(item.image) || "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=85",
              aspectRatio: item.aspect_ratio || "wide",
            }));
          }

          return {
            variant: forcedVariant || (typeof variant === "string" && variant.trim() ? variant : prev.variant),
            title: typeof title === "string" && title.trim() ? title : prev.title,
            subtitle: typeof subtitle === "string" && subtitle.trim() ? subtitle : prev.subtitle,
            items: list,
          };
        });
      } catch (err) {
        console.error("Lỗi khi tải Gallery:", err);
      }
    }

    loadGallery();
    return () => {
      active = false;
    };
  }, [forcedVariant]);

  const activeVariant = forcedVariant || data.variant;

  const categories = ["Tất cả", ...Array.from(new Set(data.items.map((i) => i.category)))];

  const filteredItems =
    activeCategory === "Tất cả"
      ? data.items
      : data.items.filter((i) => i.category === activeCategory);

  // Lightbox handlers
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }, []);

  const nextImage = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  }, [lightboxIndex, filteredItems.length]);

  const prevImage = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  }, [lightboxIndex, filteredItems.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, closeLightbox, nextImage, prevImage]);

  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-[#FAFBF9] border-t border-[#DCE4DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title and Category Filter */}
        {!hideHeader ? (
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 sm:mb-14 pb-8 border-b border-[#DCE4DD]">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-sans text-[#876D4B]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#876D4B]" />
                <span className="tracking-widest uppercase font-medium">Bộ Sưu Tập Hình Ảnh</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#18281E] font-normal leading-tight">
                {data.title}
              </h2>
              <p className="text-sm sm:text-base font-sans text-[#4A584D] leading-relaxed font-light">
                {data.subtitle}
              </p>
            </div>

            {/* Category Filter - Refined Editorial Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-sans tracking-wide transition-all ${
                    activeCategory === cat
                      ? "bg-[#18281E] text-[#FAFBF9] font-medium shadow-xs"
                      : "bg-[#F0F4F1] text-[#4A584D] hover:text-[#18281E] hover:bg-[#E5ECE7]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-end mb-8">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-sans tracking-wide transition-all ${
                    activeCategory === cat
                      ? "bg-[#18281E] text-[#FAFBF9] font-medium shadow-xs"
                      : "bg-[#F0F4F1] text-[#4A584D] hover:text-[#18281E] hover:bg-[#E5ECE7]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 1. ASYMMETRIC MASTERPIECE WALL (Default Editorial & Masonry) */}
        {(activeVariant === "masonry" || activeVariant === "asymmetric") && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
            {filteredItems.map((item, idx) => {
              // Create dynamic editorial spans based on index
              let colSpan = "md:col-span-6 lg:col-span-4 aspect-[4/3]";
              if (idx === 0) {
                // Dominant Hero Image
                colSpan = "md:col-span-12 lg:col-span-8 aspect-[16/10]";
              } else if (idx === 1) {
                colSpan = "md:col-span-6 lg:col-span-4 aspect-[4/3] lg:aspect-auto";
              } else if (idx === 4) {
                colSpan = "md:col-span-12 lg:col-span-8 aspect-[16/10]";
              }

              return (
                <div
                  key={item.id}
                  onClick={() => openLightbox(idx)}
                  className={`${colSpan} overflow-hidden border border-[#DCE4DD] bg-[#F0F4F1] group relative cursor-pointer shadow-xs`}
                  role="button"
                  tabIndex={0}
                  aria-label={`Xem ảnh lớn: ${item.title}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openLightbox(idx);
                    }
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  {/* Subtle Dark Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121E16]/80 via-[#121E16]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-5 sm:p-6">
                    <div className="text-white space-y-1">
                      <span className="text-[11px] font-sans text-[#DCE4DD] tracking-wider uppercase">
                        {item.category}
                      </span>
                      <p className="font-serif text-base sm:text-lg leading-snug">{item.title}</p>
                    </div>
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shrink-0 ml-3">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 2. BALANCED GRID VARIANT */}
        {activeVariant === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => openLightbox(idx)}
                className="aspect-[4/3] overflow-hidden border border-[#DCE4DD] bg-[#F0F4F1] group relative cursor-pointer shadow-xs"
                role="button"
                tabIndex={0}
                aria-label={`Xem ảnh lớn: ${item.title}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openLightbox(idx);
                  }
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="p-3.5 bg-[#FAFBF9] border-t border-[#DCE4DD] flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-sans text-[#876D4B] uppercase tracking-wider">{item.category}</p>
                    <p className="text-sm font-serif text-[#18281E] truncate max-w-[220px]">{item.title}</p>
                  </div>
                  <Maximize2 className="w-3.5 h-3.5 text-[#718073]" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Xem ảnh phóng to"
          className="fixed inset-0 z-50 bg-[#121E16]/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
          onClick={closeLightbox}
        >
          {/* Top Bar with counter & close button */}
          <div
            className="flex items-center justify-between text-white border-b border-white/10 pb-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-xs font-sans text-white/80 flex items-center gap-2">
              <span className="text-[#876D4B] font-medium">{filteredItems[lightboxIndex].category}</span>
              <span className="text-white/40">—</span>
              <span>
                {lightboxIndex + 1} / {filteredItems.length}
              </span>
            </div>

            <button
              onClick={closeLightbox}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Đóng ảnh"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Photo Centerpiece with navigation buttons */}
          <div
            className="relative flex-1 flex items-center justify-center py-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={prevImage}
              className="absolute left-2 sm:left-4 p-2.5 bg-black/40 hover:bg-black/70 text-white transition-colors z-10 border border-white/10"
              aria-label="Ảnh trước"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <img
              src={filteredItems[lightboxIndex].image}
              alt={filteredItems[lightboxIndex].title}
              className="max-h-[75vh] max-w-[90vw] object-contain shadow-2xl"
            />

            <button
              onClick={nextImage}
              className="absolute right-2 sm:right-4 p-2.5 bg-black/40 hover:bg-black/70 text-white transition-colors z-10 border border-white/10"
              aria-label="Ảnh kế tiếp"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Caption Bar */}
          <div
            className="text-center text-white border-t border-white/10 pt-3 max-w-2xl mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-serif text-base sm:text-lg">
              {filteredItems[lightboxIndex].title}
            </p>
            <span className="text-xs font-sans text-white/60 mt-1 block">
              Vườn Thông Homestay Đà Lạt · Bộ sưu tập khoảnh khắc
            </span>
          </div>
        </div>
      )}
    </section>
  );
};
