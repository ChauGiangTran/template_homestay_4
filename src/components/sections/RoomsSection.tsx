import React, { useEffect, useState } from "react";
import { Users, Maximize, Bed, X, ArrowUpRight, Check, Sparkles } from "lucide-react";
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
  hideHeader?: boolean;
}

export const RoomsSection: React.FC<IRoomsSectionProps> = ({ forcedVariant, hideHeader }) => {
  const { openBookingModal } = useBookingModal();
  const [activeDetailRoom, setActiveDetailRoom] = useState<IRoomItem | null>(null);

  const [sectionData, setSectionData] = useState({
    variant: "editorial",
    title: "Không Gian Chữa Lành",
    subtitle: "Tất cả các phòng đều được chăm chút tỉ mỉ với vật liệu gỗ ấm áp, chăn nệm cao cấp và view trọn thung lũng thông.",
    rooms: [
      {
        id: "phong-view-thung-lung",
        slug: "phong-view-thung-lung",
        title: "Phòng Mây Ngàn · View Thung Lũng",
        tagline: "Tầng cao nhất đón biển mây sáng sớm",
        description: "Cửa kính panorama chạm sàn 180 độ hướng thẳng thung lũng thông xanh. Có ban công riêng đón gió mát và bồn tắm gỗ ngâm thảo mộc thiên nhiên.",
        pricePerNight: 1350000,
        capacity: "2 Người lớn",
        areaSqm: 36,
        bedType: "1 Giường King 1m8",
        image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=85",
        amenities: ["Ban công ngắm mây", "Bồn tắm thảo mộc", "Máy sưởi ấm mùa đông", "Bữa sáng đặc sản", "Kệ sách chọn lọc"],
        badge: "Signature Suite",
        isFeatured: true,
      },
      {
        id: "phong-ap-mai-am-cung",
        slug: "phong-ap-mai-am-cung",
        title: "Phòng Áp Mái · Hơi Thở Gỗ Mộc",
        tagline: "Không gian kín đáo, ấm cúng dành cho cặp đôi",
        description: "Mái dốc ốp gỗ thông tự nhiên tỏa hương thơm nhẹ nhàng. Cửa sổ trần đón ánh trăng và nắng sớm le lói bên rặng cây.",
        pricePerNight: 1050000,
        capacity: "2 Người lớn",
        areaSqm: 28,
        bedType: "1 Giường Queen 1m6",
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=85",
        amenities: ["Cửa sổ trần ngắm sao", "Máy sấy tóc & trà thơm", "Đệm lông vũ êm ái", "Bữa sáng tại phòng"],
        badge: "Lãng mạn",
        isFeatured: false,
      },
      {
        id: "bungalow-gia-dinh",
        slug: "bungalow-gia-dinh",
        title: "Bungalow Vườn Hoa · Nhóm & Gia Đình",
        tagline: "Hiên nhà rộng rãi quây quần bên luống hoa cẩm tú cầu",
        description: "Bungalow biệt lập giữa vườn hoa, phòng khách sinh hoạt chung ấm cúng cùng 2 phòng ngủ riêng biệt đầy đủ tiện nghi.",
        pricePerNight: 2450000,
        capacity: "4 - 6 Khách",
        areaSqm: 65,
        bedType: "2 Giường King + Sofa",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85",
        amenities: ["Hiên thưởng trà riêng", "Khu BBQ sân vườn", "Bếp mini & trà gừng", "Tủ lạnh & lò vi sóng"],
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
              image: getImageUrl(r.image) || "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=85",
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

  const signatureRoom = sectionData.rooms[0];
  const secondaryRooms = sectionData.rooms.slice(1);

  return (
    <section id="rooms" className="py-20 sm:py-28 lg:py-32 bg-[#FAFBF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block with Clean Editorial Proportions */}
        {!hideHeader && (
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14 sm:mb-16 pb-8 border-b border-[#DCE4DD]">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-sans text-[#876D4B]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#876D4B]" />
                <span className="tracking-widest uppercase font-medium">Lưu Trú Thung Lũng</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#18281E] font-normal leading-tight">
                {sectionData.title}
              </h2>
              <p className="text-sm sm:text-base font-sans text-[#4A584D] leading-relaxed font-light">
                {sectionData.subtitle}
              </p>
            </div>
            <div className="text-right">
              <a
                href="/rooms"
                className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-[#18281E] hover:text-[#876D4B] transition-colors py-2 group"
              >
                <span>Xem tất cả hạng phòng</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#876D4B] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        )}

        {/* 1. EDITORIAL LAYOUT (Signature Showcase + Paired Suites) */}
        {activeVariant === "editorial" && (
          <div className="space-y-16 lg:space-y-20">
            {/* SIGNATURE LEAD ROOM (Wide Architectural Showcase) */}
            {signatureRoom && (
              <article className="border border-[#DCE4DD] bg-[#F7F9F6] p-6 sm:p-8 lg:p-10 shadow-xs">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Visual Frame */}
                  <div className="lg:col-span-7 relative">
                    <div className="relative aspect-[16/10] overflow-hidden border border-[#DCE4DD] bg-[#F0F4F1] shadow-sm group">
                      <img
                        src={signatureRoom.image}
                        alt={signatureRoom.title}
                        className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />

                      {signatureRoom.badge && (
                        <div className="absolute top-4 left-4 px-3 py-1 bg-[#18281E]/85 backdrop-blur-sm text-[11px] font-sans font-medium text-[#FAFBF9] border border-white/20 flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-[#876D4B]" />
                          <span>{signatureRoom.badge}</span>
                        </div>
                      )}

                      <button
                        onClick={() => setActiveDetailRoom(signatureRoom)}
                        className="absolute bottom-4 right-4 px-3.5 py-1.5 bg-[#18281E]/85 backdrop-blur-sm text-[#FAFBF9] text-xs font-sans hover:bg-[#18281E] transition-colors flex items-center gap-1.5 border border-white/20"
                        aria-label={`Xem chi tiết ${signatureRoom.title}`}
                      >
                        <Maximize className="w-3.5 h-3.5" />
                        <span>Xem chi tiết</span>
                      </button>
                    </div>
                  </div>

                  {/* Room Details Column */}
                  <div className="lg:col-span-5 space-y-5">
                    <div className="space-y-1.5">
                      <p className="text-xs font-sans uppercase tracking-wider text-[#876D4B] font-medium">
                        {signatureRoom.tagline}
                      </p>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#18281E] font-normal leading-snug">
                        {signatureRoom.title}
                      </h3>
                    </div>

                    <p className="text-sm font-sans text-[#4A584D] leading-relaxed font-light">
                      {signatureRoom.description}
                    </p>

                    {/* Room Specifications Matrix */}
                    <div className="grid grid-cols-3 gap-2 py-3.5 border-y border-[#DCE4DD] text-xs font-sans text-[#718073]">
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-[#876D4B] shrink-0" />
                        <span className="truncate">{signatureRoom.capacity}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Maximize className="w-3.5 h-3.5 text-[#876D4B] shrink-0" />
                        <span>{signatureRoom.areaSqm} m²</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Bed className="w-3.5 h-3.5 text-[#876D4B] shrink-0" />
                        <span className="truncate">{signatureRoom.bedType}</span>
                      </div>
                    </div>

                    {/* Amenities list */}
                    <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs font-sans text-[#4A584D]">
                      {signatureRoom.amenities.map((item, i) => (
                        <span key={i} className="inline-flex items-center gap-1.5">
                          <span className="text-[#876D4B]">·</span>
                          <span>{item}</span>
                        </span>
                      ))}
                    </div>

                    {/* Price & Action Strip */}
                    <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#DCE4DD]">
                      <div>
                        <span className="block text-[11px] font-sans text-[#718073] uppercase tracking-wider">
                          Giá lưu trú
                        </span>
                        <div className="flex items-baseline gap-1.5 mt-0.5">
                          <span className="text-2xl sm:text-3xl font-serif text-[#18281E] font-medium">
                            {formatPrice(signatureRoom.pricePerNight)}
                          </span>
                          <span className="text-xs font-sans text-[#718073]">/ đêm</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <button
                          onClick={() => setActiveDetailRoom(signatureRoom)}
                          className="px-4 py-2.5 bg-transparent border border-[#18281E]/30 text-[#18281E] hover:border-[#18281E] hover:bg-[#F0F4F1] text-xs font-sans font-medium transition-colors"
                        >
                          Thông số
                        </button>
                        <button
                          onClick={() => openBookingModal(signatureRoom.title)}
                          className="px-6 py-2.5 bg-[#18281E] text-[#FAFBF9] hover:bg-[#23392B] text-xs font-sans font-medium tracking-wide transition-colors shadow-xs"
                        >
                          Đặt Hạng Phòng
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* SECONDARY SUITES (Refined 2-Column Pair) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {secondaryRooms.map((room) => (
                <article
                  key={room.id}
                  className="border border-[#DCE4DD] bg-[#FAFBF9] p-6 flex flex-col justify-between space-y-6 shadow-xs group"
                >
                  <div className="space-y-5">
                    {/* Visual */}
                    <div className="relative aspect-[16/10] overflow-hidden border border-[#DCE4DD] bg-[#F0F4F1]">
                      <img
                        src={room.image}
                        alt={room.title}
                        className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      {room.badge && (
                        <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#FAFBF9] border border-[#DCE4DD] text-[11px] font-sans text-[#18281E]">
                          {room.badge}
                        </div>
                      )}
                      <button
                        onClick={() => setActiveDetailRoom(room)}
                        className="absolute bottom-3 right-3 px-3 py-1 bg-[#18281E]/80 backdrop-blur-sm text-[#FAFBF9] text-xs font-sans hover:bg-[#18281E] transition-colors flex items-center gap-1"
                        aria-label={`Xem chi tiết ${room.title}`}
                      >
                        <Maximize className="w-3 h-3" />
                        <span>Xem chi tiết</span>
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      <p className="text-[11px] font-sans uppercase tracking-wider text-[#876D4B] font-medium">
                        {room.tagline}
                      </p>
                      <h3 className="text-xl sm:text-2xl font-serif text-[#18281E] font-normal leading-snug">
                        {room.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-sans text-[#4A584D] leading-relaxed font-light line-clamp-2">
                        {room.description}
                      </p>
                    </div>

                    {/* Specs */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#DCE4DD] text-xs font-sans text-[#718073]">
                      <div className="flex items-center gap-1.5 truncate">
                        <Users className="w-3 h-3 text-[#876D4B] shrink-0" />
                        <span className="truncate">{room.capacity}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Maximize className="w-3 h-3 text-[#876D4B] shrink-0" />
                        <span>{room.areaSqm} m²</span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <Bed className="w-3 h-3 text-[#876D4B] shrink-0" />
                        <span className="truncate">{room.bedType}</span>
                      </div>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-3 border-t border-[#DCE4DD] flex items-center justify-between gap-3">
                    <div>
                      <span className="block text-[10px] font-sans text-[#718073] uppercase tracking-wider">
                        Giá lưu trú
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl sm:text-2xl font-serif text-[#18281E] font-medium">
                          {formatPrice(room.pricePerNight)}
                        </span>
                        <span className="text-xs font-sans text-[#718073]">/ đêm</span>
                      </div>
                    </div>

                    <button
                      onClick={() => openBookingModal(room.title)}
                      className="px-5 py-2.5 bg-[#18281E] text-[#FAFBF9] hover:bg-[#23392B] text-xs font-sans font-medium tracking-wide transition-colors"
                    >
                      Đặt Hạng Phòng
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* 2. GRID VARIANT */}
        {activeVariant === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {sectionData.rooms.map((room) => (
              <article
                key={room.id}
                className="border border-[#DCE4DD] bg-[#FAFBF9] p-6 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <div className="aspect-[4/3] overflow-hidden border border-[#DCE4DD] relative">
                    <img src={room.image} alt={room.title} className="w-full h-full object-cover" />
                    {room.badge && (
                      <div className="absolute top-3 left-3 px-2 py-0.5 bg-[#FAFBF9] text-[10px] font-sans">
                        {room.badge}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-serif text-[#18281E]">{room.title}</h3>
                    <p className="text-xs text-[#718073] mt-1">{room.tagline}</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-[#DCE4DD] flex items-center justify-between">
                  <span className="text-lg font-serif">{formatPrice(room.pricePerNight)}</span>
                  <button
                    onClick={() => openBookingModal(room.title)}
                    className="px-4 py-2 bg-[#18281E] text-white text-xs font-sans"
                  >
                    Đặt Phòng
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* 3. HORIZONTAL VARIANT */}
        {activeVariant === "horizontal" && (
          <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-thin">
            {sectionData.rooms.map((room) => (
              <article
                key={room.id}
                className="min-w-[320px] max-w-[360px] border border-[#DCE4DD] bg-[#FAFBF9] p-5 shrink-0 space-y-4"
              >
                <div className="aspect-[16/10] overflow-hidden border border-[#DCE4DD]">
                  <img src={room.image} alt={room.title} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-serif">{room.title}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-base font-serif">{formatPrice(room.pricePerNight)}</span>
                  <button
                    onClick={() => openBookingModal(room.title)}
                    className="px-4 py-1.5 bg-[#18281E] text-white text-xs"
                  >
                    Đặt
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* QUICK ROOM DETAIL MODAL */}
      {activeDetailRoom && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Chi tiết phòng ${activeDetailRoom.title}`}
          className="fixed inset-0 z-50 bg-[#121E16]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveDetailRoom(null)}
        >
          <div
            className="bg-[#FAFBF9] border border-[#DCE4DD] max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start border-b border-[#DCE4DD] pb-4">
              <div>
                <span className="text-xs font-sans text-[#876D4B] uppercase tracking-wider font-medium">
                  {activeDetailRoom.tagline}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#18281E] mt-1">
                  {activeDetailRoom.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveDetailRoom(null)}
                className="p-2 text-[#718073] hover:text-[#18281E] hover:bg-[#F0F4F1] transition-colors"
                aria-label="Đóng chi tiết phòng"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-[16/10] overflow-hidden border border-[#DCE4DD]">
              <img
                src={activeDetailRoom.image}
                alt={activeDetailRoom.title}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-sm font-sans text-[#4A584D] leading-relaxed font-light">
              {activeDetailRoom.description}
            </p>

            <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#DCE4DD] text-xs font-sans text-[#718073]">
              <div>
                <span className="block font-medium text-[#18281E]">Sức chứa</span>
                <span>{activeDetailRoom.capacity}</span>
              </div>
              <div>
                <span className="block font-medium text-[#18281E]">Diện tích</span>
                <span>{activeDetailRoom.areaSqm} m²</span>
              </div>
              <div>
                <span className="block font-medium text-[#18281E]">Loại giường</span>
                <span>{activeDetailRoom.bedType}</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-sans font-medium text-[#18281E] uppercase tracking-wider block">
                Tiện nghi tiêu chuẩn bao gồm:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-[#4A584D]">
                {activeDetailRoom.amenities.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#876D4B] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#DCE4DD] flex items-center justify-between">
              <div>
                <span className="text-xs font-sans text-[#718073] block">Giá lưu trú mỗi đêm</span>
                <span className="text-2xl font-serif text-[#18281E] font-medium">
                  {formatPrice(activeDetailRoom.pricePerNight)}
                </span>
              </div>
              <button
                onClick={() => {
                  const roomTitle = activeDetailRoom.title;
                  setActiveDetailRoom(null);
                  openBookingModal(roomTitle);
                }}
                className="px-6 py-3 bg-[#18281E] text-[#FAFBF9] hover:bg-[#23392B] text-xs font-sans font-medium tracking-wide transition-colors"
              >
                Đặt Hạng Phòng Này
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
