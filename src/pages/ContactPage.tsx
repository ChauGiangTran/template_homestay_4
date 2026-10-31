import React, { useState, useEffect } from "react";
import { Phone, Mail, MapPin, AlertCircle, Loader2 } from "lucide-react";
import { sendContactRequest, getClientDataValues } from "../utils/clientData";
import { LocationSection } from "../components/sections/LocationSection";

export const ContactPage: React.FC = () => {
  const [pageData, setPageData] = useState({
    contactTitle: "Kết Nối Cùng Quản Gia",
    contactSubtitle: "Đừng ngại liên hệ với chúng tôi để được tư vấn chọn căn phòng có góc ngắm hoàng hôn hay bình minh ưng ý nhất.",
    formTitle: "Phiếu Đặt Phòng và Yêu Cầu Trực Tiếp",
    formSubtitle: "Gửi thông tin để giữ phòng ưu tiên và nhận xác nhận chính thức",
  });

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    checkIn: "",
    checkOut: "",
    guestCount: "2 người lớn",
    roomType: "Phòng Mây Ngàn, View Thung Lũng",
    note: "",
  });

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const [heroTitle, heroSub] = await getClientDataValues(
          ["contact_title", "contact_subtitle"],
          { pageName: "Contact", layoutName: "ContactHero" }
        );
        const [formTitle, formSub] = await getClientDataValues(
          ["form_title", "form_subtitle"],
          { pageName: "Contact", layoutName: "ContactForm" }
        );
        if (active) {
          setPageData({
            contactTitle: typeof heroTitle === "string" && heroTitle.trim() ? heroTitle : pageData.contactTitle,
            contactSubtitle: typeof heroSub === "string" && heroSub.trim() ? heroSub : pageData.contactSubtitle,
            formTitle: typeof formTitle === "string" && formTitle.trim() ? formTitle : pageData.formTitle,
            formSubtitle: typeof formSub === "string" && formSub.trim() ? formSub : pageData.formSubtitle,
          });
        }
      } catch (err) {
        console.error("Lỗi tải Contact data:", err);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setErrorMsg("Vui lòng nhập họ tên và số điện thoại.");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      await sendContactRequest({
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        roomType: formData.roomType,
        guestCount: formData.guestCount,
        note: formData.note,
        subject: `Yêu cầu đặt phòng: ${formData.roomType} (${formData.fullName})`,
      });

      setSuccessMsg(
        "Cảm ơn bạn! Yêu cầu đặt phòng đã được ghi nhận. Quản gia VUONTHONG sẽ gọi điện hoặc nhắn tin Zalo xác nhận phòng trống trong vòng 15 phút."
      );
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        checkIn: "",
        checkOut: "",
        guestCount: "2 người lớn",
        roomType: "Phòng Mây Ngàn, View Thung Lũng",
        note: "",
      });
    } catch (err: any) {
      setErrorMsg(err.message || "Không thể gửi yêu cầu lúc này. Vui lòng gọi trực tiếp hotline.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="py-12 bg-[#FAFBF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Contact Details & Host Message */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="text-xs font-sans text-[#876D4B]">
                <span className="tracking-wide font-medium">Liên Hệ Trực Tiếp</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#18281E] font-normal leading-tight text-balance">
                {pageData.contactTitle}
              </h1>
              <p className="text-sm sm:text-base font-sans text-[#4A584D] leading-relaxed font-light">
                {pageData.contactSubtitle}
              </p>
            </div>

            <div className="p-6 bg-[#F0F4F1] border border-[#DCE4DD] space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#876D4B] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-sans text-[#718073]">Địa chỉ thung lũng</h3>
                  <p className="text-sm text-[#18281E] font-medium mt-0.5">
                    Đồi Thông Hoàng Hoa Thám, Phường 10, TP. Đà Lạt (Dữ liệu demo)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#876D4B] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-sans text-[#718073]">Hotline đặt phòng</h3>
                  <p className="text-sm text-[#18281E] font-medium mt-0.5">
                    0900 000 000 (Dữ liệu demo)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#876D4B] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-sans text-[#718073]">Email hỗ trợ</h3>
                  <p className="text-sm text-[#18281E] font-medium mt-0.5">
                    contact@vuonthong.demo
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 border border-[#DCE4DD] text-xs font-sans text-[#718073] space-y-2">
              <p className="text-[#18281E] font-bold">
                Thời Gian Tiếp Nhận:
              </p>
              <p>Lễ tân đón tiếp: 06:30 - 22:30 hàng ngày</p>
              <p>Hotline hỗ trợ khẩn cấp: 24/7</p>
            </div>
          </div>

          {/* Booking Form (NEW_PROJECT_MASTER_GUIDE.md Section 10 Compliant) */}
          <div className="lg:col-span-7 bg-[#FAFBF9] border border-[#DCE4DD] p-8 lg:p-10 shadow-sm">
            <div className="mb-6">
              <h2 className="text-2xl font-serif text-[#18281E]">
                {pageData.formTitle}
              </h2>
              <p className="text-xs text-[#718073] font-sans mt-1">
                {pageData.formSubtitle}
              </p>
            </div>

            {successMsg ? (
              <div className="p-6 bg-[#F0F4F1] border border-[#23392B]/20 text-[#18281E] space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#23392B] text-white flex items-center justify-center text-xs">
                    ✓
                  </span>
                  <span className="font-serif text-lg font-medium">Gửi Yêu Cầu Thành Công</span>
                </div>
                <p className="text-sm font-sans leading-relaxed">{successMsg}</p>
                <button
                  onClick={() => setSuccessMsg("")}
                  className="mt-3 px-4 py-2 bg-[#18281E] text-white text-xs font-sans font-medium"
                >
                  Gửi Yêu Cầu Khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sans font-medium text-[#4A584D] mb-1">
                      Họ và tên của bạn *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Ví dụ: Hoàng Tuấn Anh"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DCE4DD] text-[#18281E] focus:outline-none focus:border-[#876D4B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sans font-medium text-[#4A584D] mb-1">
                      Số điện thoại / Zalo *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0985 xxx xxx"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DCE4DD] text-[#18281E] focus:outline-none focus:border-[#876D4B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sans font-medium text-[#4A584D] mb-1">
                      Ngày nhận phòng (Check-in)
                    </label>
                    <input
                      type="date"
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DCE4DD] text-[#18281E] focus:outline-none focus:border-[#876D4B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-sans font-medium text-[#4A584D] mb-1">
                      Ngày trả phòng (Check-out)
                    </label>
                    <input
                      type="date"
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DCE4DD] text-[#18281E] focus:outline-none focus:border-[#876D4B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sans font-medium text-[#4A584D] mb-1">
                      Hạng phòng mong muốn
                    </label>
                    <select
                      name="roomType"
                      value={formData.roomType}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DCE4DD] text-[#18281E] focus:outline-none focus:border-[#876D4B]"
                    >
                      <option value="Phòng Mây Ngàn, View Thung Lũng">Phòng Mây Ngàn, View Thung Lũng</option>
                      <option value="Phòng Áp Mái, Hơi Thở Gỗ Mộc">Phòng Áp Mái, Hơi Thở Gỗ Mộc</option>
                      <option value="Bungalow Vườn Hoa, Nhóm và Gia Đình">Bungalow Vườn Hoa, Nhóm và Gia Đình</option>
                      <option value="Cần tư vấn thêm hạng phòng">Chưa quyết định (Cần tư vấn thêm)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-sans font-medium text-[#4A584D] mb-1">
                      Số lượng khách
                    </label>
                    <input
                      type="text"
                      name="guestCount"
                      value={formData.guestCount}
                      onChange={handleChange}
                      placeholder="Ví dụ: 2 người lớn, 1 trẻ em"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DCE4DD] text-[#18281E] focus:outline-none focus:border-[#876D4B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-sans font-medium text-[#4A584D] mb-1">
                    Ghi chú đặc biệt hoặc câu hỏi cho quản gia
                  </label>
                  <textarea
                    name="note"
                    rows={3}
                    value={formData.note}
                    onChange={handleChange}
                    placeholder="Ví dụ: Cần chuẩn bị xe máy đón tại bến xe, cần ăn sáng chay..."
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DCE4DD] text-[#18281E] focus:outline-none focus:border-[#876D4B]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 bg-[#18281E] text-[#FAFBF9] hover:bg-[#23392B] text-xs font-sans font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Đang gửi đến quản gia...</span>
                      </>
                    ) : (
                      "Gửi Phiếu Đặt Phòng Trực Tiếp"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="mt-16">
        <LocationSection />
      </div>
    </main>
  );
};
