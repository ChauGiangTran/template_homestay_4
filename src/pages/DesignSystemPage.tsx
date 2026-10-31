import React, { useState } from "react";
import { useTheme, THEMES_LIST, ThemeId } from "../context/ThemeContext";
import { HeroSection } from "../components/sections/HeroSection";
import { RoomsSection } from "../components/sections/RoomsSection";
import { GallerySection } from "../components/sections/GallerySection";
import { Layout, Layers, Type, Palette, Sliders } from "lucide-react";

export const DesignSystemPage: React.FC = () => {
  const { currentTheme, setTheme, themeMeta } = useTheme();

  // Variant switcher preview states
  const [heroVariant, setHeroVariant] = useState<"split" | "fullscreen" | "editorial" | "minimal">("split");
  const [roomVariant, setRoomVariant] = useState<"editorial" | "grid" | "horizontal">("editorial");
  const [galleryVariant, setGalleryVariant] = useState<"masonry" | "grid" | "asymmetric">("masonry");

  // Active preview tab
  const [activeTab, setActiveTab] = useState<"tokens" | "components" | "variants">("tokens");

  return (
    <main className="py-12 bg-[#FAFBF9]">
      {/* Theme Switcher Top Bar */}
      <div className="sticky top-20 z-30 bg-[#FAFBF9] border-b border-[#DCE4DD] py-4 px-4 sm:px-8 mb-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 bg-[#18281E] text-white">
              <Sliders className="w-4 h-4" />
            </span>
            <div>
              <p className="text-xs font-sans font-bold text-[#18281E]">
                Design System Inspector
              </p>
              <p className="text-xs font-sans text-[#718073]">
                Chủ đề đang xem: <span className="font-semibold text-[#876D4B]">{themeMeta.name}</span> ({themeMeta.tagline})
              </p>
            </div>
          </div>

          {/* Theme Selector Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-sans text-[#718073] mr-1">Ngôn ngữ thiết kế:</span>
            {THEMES_LIST.map((theme) => {
              const isSelected = currentTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => setTheme(theme.id as ThemeId)}
                  className={`px-3 py-1.5 text-xs font-sans transition-all border flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-[#18281E] text-[#FAFBF9] border-[#18281E] font-medium shadow-sm"
                      : "bg-[#F0F4F1] text-[#4A584D] border-[#DCE4DD] hover:border-[#876D4B]"
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full inline-block"
                    style={{ backgroundColor: theme.primaryColor }}
                  />
                  <span>{theme.name}</span>
                  {isSelected && <span className="text-[#FAFBF9] text-xs">✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Intro Section */}
        <div className="border-b border-[#DCE4DD] pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-3 max-w-3xl">
            <span className="text-xs font-sans font-medium text-[#876D4B]">
              PDTeam Architecture Standard
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif text-[#18281E]">
              Homestay &amp; Retreat Design System
            </h1>
            <p className="text-sm sm:text-base font-sans text-[#4A584D] leading-relaxed">
              Kiến trúc giao diện mô-đun hóa, tuân thủ 100% tài liệu <code className="bg-[#F0F4F1] px-1.5 py-0.5 text-xs font-sans">NEW_PROJECT_MASTER_GUIDE.md</code> và triệt tiêu AI Slop.
            </p>
          </div>

          {/* Navigation Subtabs */}
          <div className="flex items-center gap-2 p-1 bg-[#F0F4F1] border border-[#DCE4DD] text-xs font-sans">
            <button
              onClick={() => setActiveTab("tokens")}
              className={`px-3 py-1.5 flex items-center gap-1.5 transition-colors ${
                activeTab === "tokens" ? "bg-[#18281E] text-white" : "text-[#4A584D]"
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Tokens &amp; Type</span>
            </button>
            <button
              onClick={() => setActiveTab("components")}
              className={`px-3 py-1.5 flex items-center gap-1.5 transition-colors ${
                activeTab === "components" ? "bg-[#18281E] text-white" : "text-[#4A584D]"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>UI Components</span>
            </button>
            <button
              onClick={() => setActiveTab("variants")}
              className={`px-3 py-1.5 flex items-center gap-1.5 transition-colors ${
                activeTab === "variants" ? "bg-[#18281E] text-white" : "text-[#4A584D]"
              }`}
            >
              <Layout className="w-3.5 h-3.5" />
              <span>Section Variants</span>
            </button>
          </div>
        </div>

        {/* TAB 1: DESIGN TOKENS & TYPOGRAPHY */}
        {activeTab === "tokens" && (
          <div className="space-y-16">
            {/* 1. Color Palette Tokens */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-[#876D4B]" />
                <h2 className="text-2xl font-serif text-[#18281E]">
                  1. Bảng Màu Thương Hiệu (Color Tokens)
                </h2>
              </div>
              <p className="text-xs font-sans text-[#718073]">
                Hệ màu đặc thù theo ngôn ngữ <span className="font-semibold text-[#18281E]">{themeMeta.name}</span>, không sử dụng các màu default median của AI.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="p-4 border border-[#DCE4DD] bg-[#FAFBF9] space-y-2">
                  <div className="h-16 w-full bg-[#FAFBF9] border border-[#DCE4DD]" />
                  <p className="text-xs font-sans font-semibold text-[#18281E]">Canvas (Nền)</p>
                  <p className="text-xs font-sans text-[#718073]">#FAFBF9</p>
                </div>

                <div className="p-4 border border-[#DCE4DD] bg-[#FAFBF9] space-y-2">
                  <div className="h-16 w-full bg-[#F0F4F1] border border-[#DCE4DD]" />
                  <p className="text-xs font-sans font-semibold text-[#18281E]">Surface (Thẻ)</p>
                  <p className="text-xs font-sans text-[#718073]">#F0F4F1</p>
                </div>

                <div className="p-4 border border-[#DCE4DD] bg-[#FAFBF9] space-y-2">
                  <div className="h-16 w-full bg-[#18281E]" />
                  <p className="text-xs font-sans font-semibold text-[#18281E]">Primary (Chính)</p>
                  <p className="text-xs font-sans text-[#718073]">#18281E</p>
                </div>

                <div className="p-4 border border-[#DCE4DD] bg-[#FAFBF9] space-y-2">
                  <div className="h-16 w-full bg-[#23392B]" />
                  <p className="text-xs font-sans font-semibold text-[#18281E]">Pine (Thông Già)</p>
                  <p className="text-xs font-sans text-[#718073]">#23392B</p>
                </div>

                <div className="p-4 border border-[#DCE4DD] bg-[#FAFBF9] space-y-2">
                  <div className="h-16 w-full bg-[#876D4B]" />
                  <p className="text-xs font-sans font-semibold text-[#18281E]">Timber (Gỗ Trầm)</p>
                  <p className="text-xs font-sans text-[#718073]">#876D4B</p>
                </div>

                <div className="p-4 border border-[#DCE4DD] bg-[#FAFBF9] space-y-2">
                  <div className="h-16 w-full bg-[#DCE4DD]" />
                  <p className="text-xs font-sans font-semibold text-[#18281E]">Mist (Viền Mờ)</p>
                  <p className="text-xs font-sans text-[#718073]">#DCE4DD</p>
                </div>
              </div>
            </div>

            {/* 2. Typography Hierarchy */}
            <div className="space-y-6 pt-8 border-t border-[#DCE4DD]">
              <div className="flex items-center gap-2">
                <Type className="w-5 h-5 text-[#876D4B]" />
                <h2 className="text-2xl font-serif text-[#18281E]">
                  2. Phân Cấp Typography ({themeMeta.fontHeading} + {themeMeta.fontBody})
                </h2>
              </div>

              <div className="p-8 border border-[#DCE4DD] bg-[#FAFBF9] space-y-8">
                <div className="border-b border-[#DCE4DD] pb-6 space-y-1">
                  <span className="text-xs font-sans text-[#718073]">
                    Display Hero (64px - Font Serif)
                  </span>
                  <h1 className="text-5xl sm:text-6xl font-serif text-[#18281E] font-normal">
                    Trở về với sự thảnh thơi nơi thung lũng
                  </h1>
                </div>

                <div className="border-b border-[#DCE4DD] pb-6 space-y-1">
                  <span className="text-xs font-sans text-[#718073]">
                    Heading H2 (40px - Font Serif)
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-serif text-[#18281E]">
                    Không gian lưu trú mộc mạc và chữa lành
                  </h2>
                </div>

                <div className="border-b border-[#DCE4DD] pb-6 space-y-1">
                  <span className="text-xs font-sans text-[#718073]">
                    Heading H3 (24px - Font Serif)
                  </span>
                  <h3 className="text-2xl font-serif text-[#18281E]">
                    Phòng Mây Ngàn, View Thung Lũng
                  </h3>
                </div>

                <div className="border-b border-[#DCE4DD] pb-6 space-y-1">
                  <span className="text-xs font-sans text-[#718073]">
                    Body Text (15px - Public Sans, relaxed line-height)
                  </span>
                  <p className="text-base font-sans text-[#4A584D] leading-relaxed max-w-3xl">
                    Cửa kính panorama chạm sàn 180 độ hướng thẳng thung lũng thông xanh. Có ban công riêng đón gió mát và bồn tắm gỗ ngâm thảo mộc tự nhiên giữa khí trời se lạnh của Đà Lạt.
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-sans text-[#718073]">
                    Thông số vị trí (12px)
                  </span>
                  <p className="text-xs font-sans text-[#876D4B]">
                    Độ cao 1.520m, sương sớm 16°C, Hoàng Hoa Thám, Đà Lạt
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: UI KIT & BUTTONS */}
        {activeTab === "components" && (
          <div className="space-y-16">
            {/* Buttons Showcase */}
            <div className="space-y-6">
              <h2 className="text-2xl font-serif text-[#18281E]">1. Hệ Nút Bấm (Button System)</h2>
              <div className="p-8 border border-[#DCE4DD] bg-[#FAFBF9] flex flex-wrap items-center gap-6">
                <div>
                  <button className="px-6 py-3 bg-[#18281E] text-[#FAFBF9] hover:bg-[#23392B] text-xs font-sans font-medium">
                    Nút Chính (Primary)
                  </button>
                  <span className="block text-xs font-sans text-[#718073] mt-2 text-center">Primary Solid</span>
                </div>

                <div>
                  <button className="px-6 py-3 bg-transparent border border-[#18281E] text-[#18281E] hover:bg-[#F0F4F1] text-xs font-sans font-medium flex items-center gap-2">
                    <span>Nút Viền (Outline)</span>
                  </button>
                  <span className="block text-xs font-sans text-[#718073] mt-2 text-center">Outline Border</span>
                </div>

                <div>
                  <button className="px-6 py-3 bg-[#876D4B] text-[#FAFBF9] hover:bg-[#5E4638] text-xs font-sans font-medium">
                    Nhấn Gỗ (Accent)
                  </button>
                  <span className="block text-xs font-sans text-[#718073] mt-2 text-center">Accent Timber</span>
                </div>

                <div>
                  <button className="px-4 py-2 bg-[#F0F4F1] border border-[#DCE4DD] text-[#4A584D] text-xs font-sans hover:border-[#876D4B]">
                    Tag / Pill Button
                  </button>
                  <span className="block text-xs font-sans text-[#718073] mt-2 text-center">Pill / Tag</span>
                </div>
              </div>
            </div>

            {/* Badges & Indicators */}
            <div className="space-y-6 pt-8 border-t border-[#DCE4DD]">
              <h2 className="text-2xl font-serif text-[#18281E]">2. Nhãn Trạng Thái (Badges &amp; Tags)</h2>
              <div className="p-8 border border-[#DCE4DD] bg-[#FAFBF9] flex flex-wrap gap-4">
                <span className="px-3 py-1 bg-[#18281E] text-white text-xs font-sans">
                  Được yêu thích nhất
                </span>
                <span className="px-3 py-1 bg-[#876D4B] text-white text-xs font-sans">
                  View Thung Lũng
                </span>
                <span className="px-3 py-1 bg-[#F0F4F1] border border-[#DCE4DD] text-[#18281E] text-xs font-sans">
                  Độ cao 1.500m
                </span>
                <span className="px-3 py-1 bg-green-50 border border-green-200 text-green-800 text-xs font-sans">
                  Phòng Còn Trống
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SECTION VARIANTS PREVIEW */}
        {activeTab === "variants" && (
          <div className="space-y-16">
            {/* 1. Hero Variants Preview */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-serif text-[#18281E]">1. Biến Thể Hero (Hero Variants)</h2>
                  <p className="text-xs font-sans text-[#718073]">Chọn variant để kiểm tra giao diện render trực tiếp bên dưới:</p>
                </div>
                <div className="flex gap-2 bg-[#F0F4F1] p-1 border border-[#DCE4DD] text-xs font-sans">
                  {(["split", "fullscreen", "editorial", "minimal"] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setHeroVariant(v)}
                      className={`px-3 py-1 ${
                        heroVariant === v ? "bg-[#18281E] text-white" : "text-[#4A584D]"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
              <div className="border border-[#DCE4DD] bg-white">
                <HeroSection forcedVariant={heroVariant} />
              </div>
            </div>

            {/* 2. Room Variants Preview */}
            <div className="space-y-4 pt-12 border-t border-[#DCE4DD]">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-serif text-[#18281E]">2. Biến Thể Rooms (Room Layout Variants)</h2>
                  <p className="text-xs font-sans text-[#718073]">Kiểm tra 3 layout trình bày danh mục phòng:</p>
                </div>
                <div className="flex gap-2 bg-[#F0F4F1] p-1 border border-[#DCE4DD] text-xs font-sans">
                  {(["editorial", "grid", "horizontal"] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setRoomVariant(v)}
                      className={`px-3 py-1 ${
                        roomVariant === v ? "bg-[#18281E] text-white" : "text-[#4A584D]"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
              <div className="border border-[#DCE4DD] bg-white">
                <RoomsSection forcedVariant={roomVariant} />
              </div>
            </div>

            {/* 3. Gallery Variants Preview */}
            <div className="space-y-4 pt-12 border-t border-[#DCE4DD]">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-serif text-[#18281E]">3. Biến Thể Gallery (Gallery Layout Variants)</h2>
                  <p className="text-xs font-sans text-[#718073]">Kiểm tra 3 phong cách thư viện ảnh:</p>
                </div>
                <div className="flex gap-2 bg-[#F0F4F1] p-1 border border-[#DCE4DD] text-xs font-sans">
                  {(["masonry", "grid", "asymmetric"] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setGalleryVariant(v)}
                      className={`px-3 py-1 ${
                        galleryVariant === v ? "bg-[#18281E] text-white" : "text-[#4A584D]"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
              <div className="border border-[#DCE4DD] bg-white">
                <GallerySection forcedVariant={galleryVariant} />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
