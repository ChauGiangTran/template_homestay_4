/**
 * Route scoping helper compliant with NEW_PROJECT_MASTER_GUIDE.md Section 9
 */

export const getPageNameFromPath = (pathname: string): string => {
  const cleanPath = pathname.split("?")[0].split("#")[0];

  // Specific static routes first
  if (/^\/contact\/?$/.test(cleanPath)) return "Contact";
  if (/^\/design-system\/?$/.test(cleanPath)) return "DesignSystem";
  if (/^\/about\/?$/.test(cleanPath)) return "About";
  if (/^\/experiences\/?$/.test(cleanPath)) return "Experiences";
  if (/^\/gallery\/?$/.test(cleanPath)) return "Gallery";
  if (/^\/rooms\/?$/.test(cleanPath)) return "Rooms";

  // Dynamic route for room details
  if (/^\/rooms\/[^/]+\/?$/.test(cleanPath)) return "RoomDetail";

  // Default fallback
  if (cleanPath === "/" || cleanPath === "") return "Home";

  return "Home";
};
