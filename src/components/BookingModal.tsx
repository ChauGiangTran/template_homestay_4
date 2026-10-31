import React, { useState } from "react";
import { X, AlertCircle, Loader2 } from "lucide-react";
import { useBookingModal } from "../context/BookingModalContext";
import { sendContactRequest } from "../utils/clientData";

export const BookingModal: React.FC = () => {
  const { isOpen, closeBookingModal, selectedRoomTitle } = useBookingModal();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    note: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setErrorMsg("Vui lòng điền họ tên và số điện thoại.");
      return;
    }

    // Date validation
    if (formData.checkIn && formData.checkOut) {
      if (new Date(formData.checkOut) <= new Date(formData.checkIn)) {
        setErrorMsg("Ngày trả phòng phải sau ngày nhận phòng.");
        return;
      }
    }

    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      await sendContactRequest({
        fullName: formData.fullName,
        phone: formData.phone,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        roomType: selectedRoomTitle || "Chưa chọn phòng cụ thể",
        note: formData.note,
        subject: `Yêu cầu đặt phòng: ${selectedRoomTitle || "Tư vấn chung"}`,
      });

      setSuccessMsg("Yêu cầu đã được gửi thành công! Quản gia sẽ liên hệ xác nhận trong 15 phút.");
      setTimeout(() => {
        setSuccessMsg("");
        closeBookingModal();
      }, 3500);
    } catch (err: any) {
      setErrorMsg(err.message || "Gửi yêu cầu thất bại. Vui lòng gọi trực tiếp hotline.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 overflow-y-auto animate-in fade-in duration-200"
      onClick={closeBookingModal}
    >
      <div
        className="relative w-full max-w-lg bg-[#FAFBF9] border border-[#DCE4DD] p-6 sm:p-9 shadow-2xl text-[#18281E] my-auto max-h-[92vh] overflow-y-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeBookingModal}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 text-[#4A584D] hover:text-[#18281E] transition-colors"
          aria-label="Đóng cửa sổ đặt phòng"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6 pr-6">
          <p className="text-xs text-[#876D4B] font-medium mb-1">
            Đặt Chỗ Trực Tiếp
          </p>
          <h2 id="booking-modal-title" className="text-2xl sm:text-3xl font-serif text-[#18281E]">
            {selectedRoomTitle ? `Đặt ${selectedRoomTitle}` : "Gửi Yêu Cầu Đặt Phòng"}
          </h2>
          <p className="text-sm text-[#4A584D] mt-1 font-sans leading-relaxed">
            Giữ chỗ sớm để đảm bảo có phòng view thung lũng đẹp nhất vào kỳ nghỉ của bạn.
          </p>
        </div>

        {successMsg ? (
          <div className="p-5 bg-[#F0F4F1] border border-[#23392B]/20 text-[#18281E] flex items-start gap-3 my-4">
            <span className="w-5 h-5 bg-[#23392B] text-white flex items-center justify-center text-xs shrink-0 mt-0.5 rounded-full">
              ✓
            </span>
            <p className="text-sm font-sans">{successMsg}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-[#4A584D] mb-1">
                Họ và tên của bạn *
              </label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Ví dụ: Nguyễn Phương Linh"
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DCE4DD] text-[#18281E] placeholder:text-[#718073]/50 focus:outline-none focus:border-[#876D4B]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#4A584D] mb-1">
                Số điện thoại / Zalo nhận xác nhận *
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="0985 xxx xxx"
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DCE4DD] text-[#18281E] placeholder:text-[#718073]/50 focus:outline-none focus:border-[#876D4B]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#4A584D] mb-1">
                  Nhận phòng (Check-in)
                </label>
                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 text-sm bg-white border border-[#DCE4DD] text-[#18281E] focus:outline-none focus:border-[#876D4B]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#4A584D] mb-1">
                  Trả phòng (Check-out)
                </label>
                <input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 text-sm bg-white border border-[#DCE4DD] text-[#18281E] focus:outline-none focus:border-[#876D4B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#4A584D] mb-1">
                Ghi chú thêm &amp; Số lượng khách
              </label>
              <textarea
                name="note"
                rows={2}
                value={formData.note}
                onChange={handleChange}
                placeholder="Ví dụ: 2 người lớn, cần phòng tầng cao đón sương..."
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DCE4DD] text-[#18281E] placeholder:text-[#718073]/50 focus:outline-none focus:border-[#876D4B]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 bg-[#18281E] text-[#FAFBF9] hover:bg-[#23392B] active:scale-[0.99] text-xs font-medium font-sans transition-all flex items-center justify-center gap-2 min-h-[44px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Đang gửi yêu cầu...</span>
                  </>
                ) : (
                  "Xác Nhận Gửi Yêu Cầu"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
