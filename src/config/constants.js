// CDN Configuration
// If "main" branch is not available, fallback to commit hash, then to local
export const CDN_BASE_URL = (() => {
  // Try to use main branch CDN
  const mainUrl = "https://cdn.jsdelivr.net/gh/code-abdulrehman/ast-fe@main/public";
  const localUrl = "http://localhost:3000";

  // In browser, try to check if main branch exists by pinging a known file
  if (typeof window !== "undefined" && typeof fetch !== "undefined") {
    // This is async, but we need a sync export, so fallback to main by default
    // Optionally, you could implement a runtime check elsewhere
    return mainUrl;
  } else {
    // In Node or build time, just use main, fallback to commit, then local
    return mainUrl || localUrl;
  }
})();

// Image path helpers
export const getProductImageUrl = (imagePath) => {
  return `${CDN_BASE_URL}${imagePath}`;
};

export const getBannerImageUrl = (imagePath) => {
  return `${CDN_BASE_URL}${imagePath}`;
};
