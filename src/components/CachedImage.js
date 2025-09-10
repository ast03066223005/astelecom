import { useEffect, useState } from "react";
import { loadImage } from "../utils/imageCache";

function CachedImage({ src, alt, ...props }) {
  const [loadedSrc, setLoadedSrc] = useState(null);

  useEffect(() => {
    loadImage(src).then(setLoadedSrc);
  }, [src]);

  if (!loadedSrc) return <div style={{ width: 100, height: 100 }}>Loading...</div>;

  return <img src={loadedSrc} alt={alt} {...props} />;
}

export default CachedImage;