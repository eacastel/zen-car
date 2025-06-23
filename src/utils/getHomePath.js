export const getHomePath = () => {
  if (typeof window !== "undefined") {
    const preferredHome = localStorage.getItem("preferredHome");
    if (preferredHome && preferredHome !== "/") {
      return preferredHome;
    }
  }
  return "/";
};
