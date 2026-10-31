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
}

export const GallerySection: React.FC<IGallerySectionProps> = ({ forcedVariant }) => {
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const [data, setData] = useState({
    variant: "masonry",
    title: "Góc Nhìn Thung Lũng",
    subtitle: "Những khung hình lưu lại nét đẹp bình dị qua bốn mùa thông reo.",
    items: [
      {
        id: "g-1",
        title: "Hiên gỗ nhìn ra biển mây",
        category: "Cảnh quan",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=85",
        aspectRatio: "wide",
      },
      {
        id: "g-2",
        title: "Phòng ngủ ấm áp ánh đèn vàng",
        category: "Phòng nghỉ",
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85",
        aspectRatio: "portrait",
      },
      {
        id: "g-3",
        title: "Bếp củi đêm lạnh",
        category: "Khoảnh khắc",
        image: "https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=1200&q=85",
        aspectRatio: "square",
      },
      {
        id: "g-4",
        title: "Bình minh len qua rặng thông",
        category: "Cảnh quan",
        image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=85",
        aspectRatio: "portrait",
      },
      {
        id: "g-5",
        title: "Vườn hoa cẩm tú cầu nở rộ",
        category: "Thiên nhiên",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85",
        aspectRatio: "wide",
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
              image: getImageUrl(item.image) || "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=85",
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
    <section className="py-24 lg:py-32 bg-[#FAFBF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title and Category Filter */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-sans font-medium text-[#876D4B]">
              Bộ Sưu Tập Hình Ảnh
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#18281E] font-normal leading-tight">
              {data.title}
            </h2>
            <p className="text-sm sm:text-base font-sans text-[#4A584D] leading-relaxed">
              {data.subtitle}
            </p>
          </div>

          {/* Category Filter - Refined Editorial Minimalist Tabs */}
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

        {/* 1. MASONRY LAYOUT */}
        {activeVariant === "masonry" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, idx) => {
              const isLarge = idx === 0 || idx === 3;
              return (
                <div
                  key={item.id}
                  onClick={() => openLightbox(idx)}
                  className={`overflow-hidden border border-[#DCE4DD] bg-[#F0F4F1] group relative cursor-pointer ${
                    isLarge ? "sm:col-span-2 aspect-[16/9]" : "aspect-[4/3]"
                  }`}
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
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  {/* Subtle Dark Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6">
                    <div className="text-white space-y-1">
                      <span className="text-xs font-sans text-[#DCE4DD]">
                        {item.category}
                      </span>
                      <p className="font-serif text-lg leading-snug">{item.title}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 2. GRID LAYOUT */}
        {activeVariant === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => openLightbox(idx)}
                className="aspect-[4/3] overflow-hidden border border-[#DCE4DD] bg-[#F0F4F1] group relative cursor-pointer"
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
                />
                <div className="p-3 bg-[#FAFBF9] border-t border-[#DCE4DD] flex items-center justify-between">
                  <div>
                    <p className="text-xs font-sans text-[#876D4B]">{item.category}</p>
                    <p className="text-sm font-serif text-[#18281E]">{item.title}</p>
                  </div>
                  <Maximize2 className="w-3.5 h-3.5 text-[#718073]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. ASYMMETRIC LAYOUT */}
        {activeVariant === "asymmetric" && (
          <div className="grid grid-cols-12 gap-6">
            {filteredItems.map((item, idx) => {
              const colSpan = idx % 2 === 0 ? "col-span-12 lg:col-span-7" : "col-span-12 lg:col-span-5";
              return (
                <div
                  key={item.id}
                  onClick={() => openLightbox(idx)}
                  className={`${colSpan} aspect-[16/10] overflow-hidden border border-[#DCE4DD] relative group cursor-pointer`}
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
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-[#FAFBF9] px-4 py-2 border border-[#DCE4DD] flex items-center justify-between">
                    <span className="text-xs font-serif text-[#18281E] font-medium">{item.title}</span>
                    <span className="text-[11px] font-sans text-[#718073]">{item.category}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Xem ảnh phóng to"
          className="fixed inset-0 z-50 bg-black/90 flex flex-col justify-between p-4 sm:p-6"
          onClick={closeLightbox}
        >
          {/* Top Bar with counter & close button */}
          <div
            className="flex items-center justify-between text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-xs font-sans text-white/80">
              <span>{filteredItems[lightboxIndex].category}</span>
              <span className="mx-2">—</span>
              <span>
                Ảnh {lightboxIndex + 1} / {filteredItems.length}
              </span>
            </div>

            <button
              onClick={closeLightbox}
              className="p-2 text-white/80 hover:text-white transition-colors"
              aria-label="Đóng ảnh"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Photo Center Container */}
          <div
            className="relative flex-1 flex items-center justify-center my-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredItems[lightboxIndex].image}
              alt={filteredItems[lightboxIndex].title}
              className="max-h-[80vh] max-w-[90vw] object-contain border border-white/10 shadow-2xl"
            />

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-2 sm:left-6 p-3 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
              aria-label="Ảnh trước đó"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-2 sm:right-6 p-3 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
              aria-label="Ảnh tiếp theo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Caption */}
          <div
            className="text-center text-white pb-2"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-serif text-lg text-white/95">
              {filteredItems[lightboxIndex].title}
            </p>
            <p className="text-xs font-sans text-white/60 mt-0.5">
              Sử dụng phím mũi tên trái/phải để chuyển ảnh, phím Esc để đóng
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
