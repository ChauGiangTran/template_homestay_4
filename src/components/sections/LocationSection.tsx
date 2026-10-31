import React, { useEffect, useState } from "react";
import { MapPin, Navigation, Compass } from "lucide-react";
import { getClientDataValues } from "../../utils/clientData";

interface IHighlightItem {
  name: string;
  distance: string;
  note: string;
}

export const LocationSection: React.FC = () => {
  const [data, setData] = useState({
    title: "Vị Trí & Đường Về Vườn Thông",
    address: "Đồi Thông Hoàng Hoa Thám, Phường 10, TP. Đà Lạt, Lâm Đồng (Dữ liệu demo)",
    altitude: "Độ cao 1.520m, cách chợ Đà Lạt 3.8km (Dữ liệu demo)",
    mapUrl: "https://maps.google.com/?q=Da+Lat",
    highlights: [
      {
        name: "Hồ Xuân Hương",
        distance: "10 phút đi xe",
        note: "Tuyến đường ngắm biệt thự cổ thanh bình",
      },
      {
        name: "Rừng Thông Dinh 1",
        distance: "5 phút đi xe",
        note: "Cung đường đi dạo lý tưởng buổi sáng",
      },
      {
        name: "Sân bay Liên Khương",
        distance: "40 phút di chuyển",
        note: "Có hỗ trợ xe đưa đón riêng tận cửa",
      },
    ] as IHighlightItem[],
  });

  useEffect(() => {
    let active = true;

    async function loadLocation() {
      try {
        const [title, address, alt, mapUrl, rawHighlights] = await getClientDataValues(
          [
            "location_title",
            "location_address",
            "location_altitude",
            "location_map_url",
            "location_highlights",
          ],
          { pageName: "Home", layoutName: "Location" }
        );

        if (!active) return;

        setData((prev) => {
          let list = prev.highlights;
          if (Array.isArray(rawHighlights) && rawHighlights.length > 0) {
            list = rawHighlights.map((h: any) => ({
              name: h.name || "",
              distance: h.distance || "",
              note: h.note || "",
            }));
          }

          return {
            title: typeof title === "string" && title.trim() ? title : prev.title,
            address: typeof address === "string" && address.trim() ? address : prev.address,
            altitude: typeof alt === "string" && alt.trim() ? alt : prev.altitude,
            mapUrl: typeof mapUrl === "string" && mapUrl.trim() ? mapUrl : prev.mapUrl,
            highlights: list,
          };
        });
      } catch (err) {
        console.error("Lỗi khi tải Location:", err);
      }
    }

    loadLocation();
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="py-24 lg:py-32 bg-[#FAFBF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-sans text-[#876D4B]">
              <span className="tracking-wide font-medium">Chỉ Dẫn Hành Trình</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#18281E] font-normal leading-tight text-balance">
              {data.title}
            </h2>

            <div className="p-6 bg-[#F7F9F6] border border-[#DCE4DD] space-y-3 shadow-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#876D4B] shrink-0 mt-0.5" />
                <p className="text-sm font-sans text-[#18281E] font-medium leading-relaxed">
                  {data.address}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-sans text-[#718073] pl-8">
                <Compass className="w-3.5 h-3.5 text-[#876D4B]" />
                <span>{data.altitude}</span>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-sans font-medium text-[#18281E] uppercase tracking-wider">
                Khoảng cách đến các địa điểm trọng điểm:
              </h3>
              <div className="divide-y divide-[#DCE4DD] border-y border-[#DCE4DD]">
                {data.highlights.map((h, i) => (
                  <div key={i} className="py-3.5 flex items-center justify-between text-xs font-sans">
                    <div>
                      <span className="text-[#18281E] font-medium text-sm">{h.name}</span>
                      <span className="block text-xs text-[#718073] mt-0.5 font-light">
                        {h.note}
                      </span>
                    </div>
                    <span className="text-xs font-sans text-[#876D4B] font-medium">
                      {h.distance}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <a
                href={data.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#18281E] text-[#FAFBF9] hover:bg-[#23392B] active:scale-[0.98] text-xs font-sans font-medium tracking-wide transition-all shadow-sm"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Mở Trên Google Maps</span>
              </a>
            </div>
          </div>

          {/* Right Visual Map Card */}
          <div className="lg:col-span-6 relative aspect-[4/3] border border-[#DCE4DD] overflow-hidden bg-[#F0F4F1] shadow-md group">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
              alt="Cảnh quan đường đến thung lũng"
              className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6 sm:p-8">
              <div className="text-white space-y-1">
                <p className="font-serif text-xl font-normal">Cung Đường Hoàng Hoa Thám</p>
                <p className="text-xs font-sans text-[#DCE4DD]/90 font-light">
                  Đường dốc thông reo ngắm thung lũng mây đẹp bậc nhất Đà Lạt
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
