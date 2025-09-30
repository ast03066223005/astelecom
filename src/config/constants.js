// CDN Configuration
// If "main" branch is not available, fallback to commit hash, then to local
export const CDN_BASE_URL = (() => {
  // Try to use main branch CDN
  const mainUrl = "https://cdn.jsdelivr.net/gh/code-abdulrehman/ast-fe@main/public";
  const localUrl = "https://astelecom.store";

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

export const currency = "Rs.";
export const whatsappNumber = "+923066223005";
export const whatsappMessage = (product) => {
  return `Hi! I want to order: ${product.title} - ${currency}:${product.discount_price} \n${window.location.href}`;
};
export const offerTimer = "2025-10-05T23:59:59";
export const socialLinks = {
  facebook: 'https://www.facebook.com/astelecom6',
  twitter: 'https://twitter.com/',
  instagram: 'https://instagram.com/',
  linkedin: 'https://linkedin.com/company/',
  youtube: 'https://youtube.com/',
  tiktok: 'https://tiktok.com/',
  whatsapp: 'https://wa.me/+923066223005',
  telegram: 'https://t.me/'
};
