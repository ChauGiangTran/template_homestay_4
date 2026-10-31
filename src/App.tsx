import React, { useEffect, useState } from "react";
import { getPageNameFromPath } from "./utils/pageScope";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { BookingModal } from "./components/BookingModal";
import { ThemeProvider } from "./context/ThemeContext";
import { BookingModalProvider } from "./context/BookingModalContext";

// Pages
import { HomePage } from "./pages/HomePage";
import { RoomsPage } from "./pages/RoomsPage";
import { AboutPage } from "./pages/AboutPage";
import { ExperiencesPage } from "./pages/ExperiencesPage";
import { GalleryPage } from "./pages/GalleryPage";
import { ContactPage } from "./pages/ContactPage";
import { DesignSystemPage } from "./pages/DesignSystemPage";

export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(
    typeof window !== "undefined" ? window.location.pathname : "/"
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);

    // Intercept relative internal link clicks for instant SPA routing
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      // If href is internal page route (not anchor, not external tel/mailto)
      if (
        href &&
        href.startsWith("/") &&
        !href.startsWith("//") &&
        !target.hasAttribute("download") &&
        target.target !== "_blank"
      ) {
        e.preventDefault();
        window.history.pushState({}, "", href);
        setCurrentPath(href);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    document.addEventListener("click", handleLinkClick);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("click", handleLinkClick);
    };
  }, []);

  // Compute Page Scope Name compliant with NEW_PROJECT_MASTER_GUIDE.md Section 9
  const pageName = getPageNameFromPath(currentPath);

  // Render matching page
  const renderPage = () => {
    switch (pageName) {
      case "Rooms":
        return <RoomsPage />;
      case "About":
        return <AboutPage />;
      case "Experiences":
        return <ExperiencesPage />;
      case "Gallery":
        return <GalleryPage />;
      case "Contact":
        return <ContactPage />;
      case "DesignSystem":
        return <DesignSystemPage />;
      case "Home":
      default:
        return <HomePage />;
    }
  };

  return (
    <ThemeProvider>
      <BookingModalProvider>
        <div className="min-h-screen flex flex-col bg-[#FAFBF9] text-[#18281E]">
          <Header currentPath={currentPath} currentPage={pageName} />
          <div className="flex-1">{renderPage()}</div>
          <Footer currentPage={pageName} />
          <BookingModal />
        </div>
      </BookingModalProvider>
    </ThemeProvider>
  );
};
