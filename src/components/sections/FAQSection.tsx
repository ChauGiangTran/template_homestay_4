import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { getClientDataValues } from "../../utils/clientData";

export interface IFAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string>("faq-1");

  const [data, setData] = useState({
    title: "Câu Hỏi Thường Gặp",
    subtitle: "Một vài lưu ý nhỏ giúp kỳ nghỉ của bạn tại Vườn Thông thêm phần trọn vẹn",
    items: [
      {
        id: "faq-1",
        question: "Giờ nhận phòng và trả phòng quy định như thế nào?",
        answer: "Giờ nhận phòng tiêu chuẩn là từ 14:00 và giờ trả phòng trước 12:00 trưa. Trường hợp bạn đến sớm hơn hoặc muốn gửi hành lý để đi dạo, homestay luôn có khu vực tiếp đón và bảo quản hành lý chu đáo miễn phí.",
        category: "Lưu trú",
      },
      {
        id: "faq-2",
        question: "Đường xuống homestay xe ô tô có vào tận nơi được không?",
        answer: "Đường Hoàng Hoa Thám ô tô 4 - 16 chỗ vào thoải mái. Đoạn rẽ vào dốc thung lũng được đổ bê tông kiên cố, xe 4-7 chỗ gầm cao xuống tận sân đỗ xe của homestay. Homestay luôn có nhân viên hỗ trợ mang hành lý cho bạn.",
        category: "Di chuyển",
      },
      {
        id: "faq-3",
        question: "Homestay có cho phép mang thú cưng đi cùng không?",
        answer: "Chúng tôi rất yêu quý động vật và chào đón các bé thú cưng ngoan ngoãn. Vui lòng thông báo trước với quản gia khi đặt phòng để chúng tôi sắp xếp căn phòng có sân vườn phù hợp nhất.",
        category: "Quy định",
      },
      {
        id: "faq-4",
        question: "Tại homestay có tổ chức tiệc nướng BBQ buổi tối không?",
        answer: "Có bạn nhé! Homestay có sẵn bếp than, vỉ nướng, bàn ghế ngoài trời và chuẩn bị than hoa sạch. Bạn có thể tự mang đồ ướp sẵn đến hoặc đặt trước set BBQ rau củ Đà Lạt tươi ngon từ chúng tôi.",
        category: "Ẩm thực",
      },
    ] as IFAQItem[],
  });

  useEffect(() => {
    let active = true;

    async function loadFAQ() {
      try {
        const [title, subtitle, rawItems] = await getClientDataValues(
          ["faq_title", "faq_subtitle", "faq_items"],
          { pageName: "Home", layoutName: "FAQ" }
        );

        if (!active) return;

        setData((prev) => {
          let list = prev.items;
          if (Array.isArray(rawItems) && rawItems.length > 0) {
            list = rawItems.map((item: any) => ({
              id: item.id || "faq",
              question: item.question || "",
              answer: item.answer || "",
              category: item.category || "Chung",
            }));
          }

          return {
            title: typeof title === "string" && title.trim() ? title : prev.title,
            subtitle: typeof subtitle === "string" && subtitle.trim() ? subtitle : prev.subtitle,
            items: list,
          };
        });
      } catch (err) {
        console.error("Lỗi khi tải FAQ:", err);
      }
    }

    loadFAQ();
    return () => {
      active = false;
    };
  }, []);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? "" : id);
  };

  return (
    <section className="py-24 lg:py-32 bg-[#FAFBF9]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="text-xs font-sans text-[#876D4B]">
            <span className="tracking-wide font-medium">Lưu Ý Nghỉ Dưỡng</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#18281E] font-normal leading-tight text-balance">
            {data.title}
          </h2>
          <p className="text-sm sm:text-base font-sans text-[#4A584D] leading-relaxed font-light">
            {data.subtitle}
          </p>
        </div>

        <div className="divide-y divide-[#DCE4DD] border-y border-[#DCE4DD]">
          {data.items.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className="py-6 transition-colors">
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full flex items-center justify-between text-left group"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-serif text-[#18281E] group-hover:text-[#876D4B] transition-colors pr-6 font-normal">
                    {item.question}
                  </span>
                  <div className="w-7 h-7 rounded-none border border-[#DCE4DD] flex items-center justify-center shrink-0 group-hover:border-[#876D4B] transition-colors">
                    <ChevronDown
                      className={`w-4 h-4 text-[#876D4B] transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-4 pr-10 text-sm font-sans text-[#4A584D] leading-relaxed font-light animate-in fade-in-50 duration-200">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
