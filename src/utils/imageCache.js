const cache = {};

export async function loadImage(url) {
  if (cache[url]) return cache[url];

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      cache[url] = url;
      resolve(url);
    };
    img.onerror = reject;
  });
}
