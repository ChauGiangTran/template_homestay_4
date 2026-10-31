import React from "react";
import { HeroSection } from "../components/sections/HeroSection";
import { AboutStorySection } from "../components/sections/AboutStorySection";
import { RoomsSection } from "../components/sections/RoomsSection";
import { ExperiencesSection } from "../components/sections/ExperiencesSection";
import { AmenitiesSection } from "../components/sections/AmenitiesSection";
import { GallerySection } from "../components/sections/GallerySection";
import { TestimonialsSection } from "../components/sections/TestimonialsSection";
import { LocationSection } from "../components/sections/LocationSection";
import { FAQSection } from "../components/sections/FAQSection";
import { BookingCTASection } from "../components/sections/BookingCTASection";

export const HomePage: React.FC = () => {
  return (
    <main>
      <HeroSection />
      <AboutStorySection />
      <RoomsSection />
      <ExperiencesSection />
      <AmenitiesSection />
      <GallerySection />
      <TestimonialsSection />
      <LocationSection />
      <FAQSection />
      <BookingCTASection />
    </main>
  );
};
