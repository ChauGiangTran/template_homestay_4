import React, { useEffect, useState } from "react";
import { Users, Maximize, Bed, X } from "lucide-react";
import { getClientDataValues, getImageUrl } from "../../utils/clientData";
import { useBookingModal } from "../../context/BookingModalContext";

export interface IRoomItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  pricePerNight: number;
  capacity: string;
  areaSqm: number;
  bedType: string;
  image: string;
  amenities: string[];
  badge: string;
  isFeatured: boolean;
}

interface IRoomsSectionProps {
  forcedVariant?: "editorial" | "grid" | "horizontal";
}

export const RoomsSection: React.FC<IRoomsSectionProps> = ({ forcedVariant }) => {
  const { openBookingModal } = useBookingModal();
  const [activeDetailRoom, setActiveDetailRoom] = useState<IRoomItem | null>(null);

  const [sectionData, setSectionData] = useState({
    variant: "editorial",
    title: "Không Gian Chữa Lành",
    subtitle: "Tất cả các phòng đều được chăm chút tỉ mỉ với vật liệu gỗ ấm áp, chăn nệm cao cấp và view trọn thung lũng.",
    rooms: [
      {
        id: "phong-view-thung-lung",
        slug: "phong-view-thung-lung",
        title: "Phòng Mây Ngàn, View Thung Lũng",
        tagline: "Tầng cao nhất đón biển mây sáng sớm",
        description: "Cửa kính panorama chạm sàn 180 độ hướng thẳng thung lũng thông xanh. Có ban công riêng đón gió mát và bồn tắm gỗ ngâm thảo mộc thiên nhiên.",
        pricePerNight: 1350000,
        capacity: "2 Người lớn",
        areaSqm: 36,
        bedType: "1 Giường King 1m8",
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85",
        amenities: ["Ban công ngắm mây", "Bồn tắm thảo mộc", "Máy sưởi ấm mùa đông", "Bữa sáng đặc sản", "Kệ sách chọn lọc"],
        badge: "Được yêu thích nhất",
        isFeatured: true,
      },
      {
        id: "phong-ap-mai-am-cung",
        slug: "phong-ap-mai-am-cung",
        title: "Phòng Áp Mái, Hơi Thở Gỗ Mộc",
        tagline: "Không gian kín đáo, ấm cúng dành cho cặp đôi",
        description: "Mái dốc ốp gỗ thông tự nhiên tỏa hương thơm nhẹ nhàng. Cửa sổ trần đón ánh trăng và nắng sớm le lói bên rặng cây.",
        pricePerNight: 1050000,
        capacity: "2 Người lớn",
        areaSqm: 28,
        bedType: "1 Giường Queen 1m6",
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=85",
        amenities: ["Cửa sổ trần ngắm sao", "Máy sấy tóc và trà thơm", "Đệm lông vũ êm ái", "Bữa sáng tại phòng"],
        badge: "Lãng mạn",
        isFeatured: false,
      },
      {
        id: "bungalow-gia-dinh",
        slug: "bungalow-gia-dinh",
        title: "Bungalow Vườn Hoa, Nhóm và Gia Đình",
        tagline: "Hiên nhà rộng rãi quây quần bên luống hoa cẩm tú cầu",
        description: "Bungalow biệt lập giữa vườn hoa, phòng khách sinh hoạt chung ấm cúng cùng 2 phòng ngủ riêng biệt đầy đủ tiện nghi.",
        pricePerNight: 2450000,
        capacity: "4 - 6 Khách",
        areaSqm: 65,
        bedType: "2 Giường King + Sofa bed",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85",
        amenities: ["Hiên thưởng trà riêng", "Khu BBQ sân vườn", "Bếp mini và trà gừng", "Tủ lạnh và lò vi sóng"],
        badge: "Không gian rộng",
        isFeatured: true,
      },
    ] as IRoomItem[],
  });

  useEffect(() => {
    let active = true;

    async function loadRooms() {
      try {
        const [variant, title, subtitle, rawRooms] = await getClientDataValues(
          ["rooms_variant", "rooms_title", "rooms_subtitle", "rooms_list"],
          { pageName: "Home", layoutName: "Rooms" }
        );

        if (!active) return;

        setSectionData((prev) => {
          let formattedRooms = prev.rooms;
          if (Array.isArray(rawRooms) && rawRooms.length > 0) {
            formattedRooms = rawRooms.map((r: any) => ({
              id: r.id || r.slug || "room",
              slug: r.slug || r.id || "room",
              title: r.title || "Phòng nghỉ",
              tagline: r.tagline || "",
              description: r.description || "",
              pricePerNight: typeof r.price_per_night === "number" ? r.price_per_night : 0,
              capacity: r.capacity || "2 Khách",
              areaSqm: typeof r.area_sqm === "number" ? r.area_sqm : 30,
              bedType: r.bed_type || "1 Giường đôi",
              image: getImageUrl(r.image) || "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85",
              amenities: Array.isArray(r.amenities) ? r.amenities : [],
              badge: r.badge || "",
              isFeatured: Boolean(r.is_featured),
            }));
          }

          return {
            ...prev,
            variant: forcedVariant || (typeof variant === "string" && variant.trim() ? variant : prev.variant),
            title: typeof title === "string" && title.trim() ? title : prev.title,
            subtitle: typeof subtitle === "string" && subtitle.trim() ? subtitle : prev.subtitle,
            rooms: formattedRooms,
          };
        });
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu Rooms:", err);
      }
    }

    loadRooms();
    return () => {
      active = false;
    };
  }, [forcedVariant]);

  const activeVariant = forcedVariant || sectionData.variant;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
  };

  return (
    <section id="rooms" className="py-24 lg:py-32 bg-[#FAFBF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 pb-8 border-b border-[#DCE4DD]">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-sans font-medium text-[#876D4B]">
              Lưu Trú Thung Lũng
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#18281E] font-normal">
              {sectionData.title}
            </h2>
            <p className="text-sm sm:text-base font-sans text-[#4A584D] leading-relaxed">
              {sectionData.subtitle}
            </p>
          </div>
          <div className="text-right">
            <a
              href="/rooms"
              className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-[#18281E] hover:text-[#876D4B] transition-colors py-2"
            >
              <span>Xem tất cả hạng phòng</span>
            </a>
          </div>
        </div>

        {/* 1. EDITORIAL LONG-CARD LAYOUT (Default Nature Editorial) */}
        {activeVariant === "editorial" && (
          <div className="space-y-20 lg:space-y-24">
            {sectionData.rooms.map((room, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <article
                  key={room.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center pb-16 border-b border-[#DCE4DD] last:border-b-0 last:pb-0"
                >
                  {/* Image Column with Architectural Framing */}
                  <div
                    className={`lg:col-span-7 relative ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden border border-[#DCE4DD] bg-[#F0F4F1] shadow-[0_8px_30px_-10px_rgba(24,40,30,0.08)] group">
                      <img
                        src={room.image}
                        alt={room.title}
                        className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none opacity-60 group-hover:opacity-40 transition-opacity" />

                      {room.badge && (
                        <div className="absolute top-4 left-4 px-3 py-1 bg-[#FAFBF9] border border-[#DCE4DD] text-[11px] font-sans font-medium text-[#18281E] shadow-sm">
                          {room.badge}
                        </div>
                      )}

                      <button
                        onClick={() => setActiveDetailRoom(room)}
                        className="absolute bottom-4 right-4 px-3 py-1.5 bg-[#18281E]/85 text-[#FAFBF9] text-xs font-sans hover:bg-[#18281E] transition-colors flex items-center gap-1.5 border border-white/20"
                        aria-label={`Xem ảnh lớn và tiện nghi ${room.title}`}
                      >
                        <Maximize className="w-3.5 h-3.5" />
                        <span>Xem chi tiết</span>
                      </button>
                    </div>
                  </div>

                  {/* Room Details Column */}
                  <div
                    className={`lg:col-span-5 space-y-5 ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div className="space-y-1.5">
                      <p className="text-xs font-sans uppercase tracking-wider text-[#876D4B] font-medium">
                        {room.tagline}
                      </p>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#18281E] font-normal leading-tight">
                        {room.title}
                      </h3>
                    </div>

                    <p className="text-sm font-sans text-[#4A584D] leading-relaxed font-light">
                      {room.description}
                    </p>

                    {/* Room Specifications Matrix */}
                    <div className="grid grid-cols-3 gap-2 py-3.5 border-y border-[#DCE4DD] text-xs font-sans text-[#718073]">
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-[#876D4B] shrink-0" />
                        <span className="truncate">{room.capacity}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Maximize className="w-3.5 h-3.5 text-[#876D4B] shrink-0" />
                        <span>{room.areaSqm} m²</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Bed className="w-3.5 h-3.5 text-[#876D4B] shrink-0" />
                        <span className="truncate">{room.bedType}</span>
                      </div>
                    </div>

                    {/* Amenities list */}
                    <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs font-sans text-[#4A584D]">
                      {room.amenities.map((item, i) => (
                        <span key={i} className="inline-flex items-center gap-1.5">
                          <span className="text-[#876D4B] text-base leading-none">·</span>
                          <span>{item}</span>
                        </span>
                      ))}
                    </div>

                    {/* Price & Action Strip */}
                    <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#DCE4DD]/60">
                      <div>
                        <span className="block text-[11px] font-sans text-[#718073] uppercase tracking-wide">
                          Giá lưu trú
                        </span>
                        <div className="flex items-baseline gap-1.5 mt-0.5">
                          <span className="text-2xl font-serif text-[#18281E] font-medium">
                            {formatPrice(room.pricePerNight)}
                          </span>
                          <span className="text-xs font-sans text-[#718073]">/ đêm</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <button
                          onClick={() => setActiveDetailRoom(room)}
                          className="px-4 py-3 border border-[#18281E]/20 hover:border-[#18281E] bg-transparent text-[#18281E] text-xs font-sans font-medium transition-colors"
                          aria-label={`Xem thông số ${room.title}`}
                        >
                          Thông số
                        </button>

                        <button
                          onClick={() => openBookingModal(room.title)}
                          className="px-6 py-3 bg-[#18281E] text-[#FAFBF9] hover:bg-[#23392B] active:scale-[0.98] text-xs font-medium font-sans tracking-wide transition-all shadow-sm"
                        >
                          Đặt Hạng Phòng
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* 2. ARCHITECTURAL GRID VARIANT */}
        {activeVariant === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sectionData.rooms.map((room) => (
              <div
                key={room.id}
                className="bg-[#FAFBF9] border border-[#DCE4DD] flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img src={room.image} alt={room.title} className="w-full h-full object-cover" />
                    {room.badge && (
                      <span className="absolute top-3 left-3 px-2 py-0.5 bg-[#18281E] text-white text-[11px] font-sans">
                        {room.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-serif text-[#18281E]">{room.title}</h3>
                    <p className="text-xs text-[#4A584D] leading-relaxed line-clamp-2">
                      {room.description}
                    </p>
                    <div className="flex gap-4 text-xs font-sans text-[#718073] pt-2 border-t border-[#DCE4DD]">
                      <span>{room.capacity}</span>
                      <span>—</span>
                      <span>{room.areaSqm}m²</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 pt-0 flex items-center justify-between border-t border-[#DCE4DD]/60">
                  <div>
                    <span className="font-serif text-lg font-medium">{formatPrice(room.pricePerNight)}</span>
                    <span className="text-[11px] font-sans text-[#718073]"> / đêm</span>
                  </div>
                  <button
                    onClick={() => openBookingModal(room.title)}
                    className="text-xs font-sans font-medium text-[#876D4B] hover:text-[#18281E]"
                  >
                    Đặt phòng
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. HORIZONTAL SLIDER VARIANT */}
        {activeVariant === "horizontal" && (
          <div className="flex overflow-x-auto gap-6 pb-6 scrollbar-none snap-x">
            {sectionData.rooms.map((room) => (
              <div
                key={room.id}
                className="w-[85vw] max-w-[420px] shrink-0 snap-start bg-[#FAFBF9] border border-[#DCE4DD] p-5 space-y-4 shadow-sm"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={room.image} alt={room.title} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-serif">{room.title}</h3>
                <p className="text-xs text-[#4A584D] line-clamp-2">{room.description}</p>
                <div className="flex justify-between items-center pt-2 border-t border-[#DCE4DD]">
                  <div>
                    <span className="font-serif font-medium">{formatPrice(room.pricePerNight)}</span>
                    <span className="text-[11px] font-sans text-[#718073]"> / đêm</span>
                  </div>
                  <button
                    onClick={() => openBookingModal(room.title)}
                    className="px-4 py-2 bg-[#18281E] text-white text-xs font-sans font-medium"
                  >
                    Đặt ngay
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* QUICK VIEW ROOM DETAIL MODAL */}
      {activeDetailRoom && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setActiveDetailRoom(null)}
        >
          <div
            className="bg-[#FAFBF9] border border-[#DCE4DD] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-sans font-medium text-[#876D4B]">
                  {activeDetailRoom.tagline}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#18281E] mt-1">
                  {activeDetailRoom.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveDetailRoom(null)}
                className="p-1 text-[#4A584D] hover:text-[#18281E]"
                aria-label="Đóng chi tiết phòng"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-[16/9] overflow-hidden border border-[#DCE4DD]">
              <img
                src={activeDetailRoom.image}
                alt={activeDetailRoom.title}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-sm font-sans text-[#4A584D] leading-relaxed">
              {activeDetailRoom.description}
            </p>

            <div className="grid grid-cols-3 gap-3 p-4 bg-[#F0F4F1] border border-[#DCE4DD] text-xs font-sans text-[#18281E]">
              <div>
                <span className="block text-[#718073]">Sức chứa:</span>
                <span className="font-semibold">{activeDetailRoom.capacity}</span>
              </div>
              <div>
                <span className="block text-[#718073]">Diện tích:</span>
                <span className="font-semibold">{activeDetailRoom.areaSqm}m²</span>
              </div>
              <div>
                <span className="block text-[#718073]">Loại giường:</span>
                <span className="font-semibold">{activeDetailRoom.bedType}</span>
              </div>
            </div>

            <div>
              <p className="text-xs font-sans font-semibold text-[#18281E] mb-2">
                Tiện nghi trong phòng:
              </p>
              <div className="flex flex-wrap gap-2">
                {activeDetailRoom.amenities.map((a, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-white border border-[#DCE4DD] text-xs font-sans text-[#4A584D]"
                  >
                    ✓ {a}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#DCE4DD] flex items-center justify-between">
              <div>
                <span className="text-xs font-sans text-[#718073]">Giá mỗi đêm:</span>
                <p className="text-2xl font-serif text-[#18281E] font-medium">
                  {formatPrice(activeDetailRoom.pricePerNight)}
                </p>
              </div>

              <button
                onClick={() => {
                  const title = activeDetailRoom.title;
                  setActiveDetailRoom(null);
                  openBookingModal(title);
                }}
                className="px-6 py-3 bg-[#18281E] text-white hover:bg-[#23392B] text-xs font-sans font-medium"
              >
                Đặt Phòng Này Ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
