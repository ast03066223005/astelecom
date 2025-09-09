import React, { useRef, useEffect } from 'react';

function AutoScrolling({ 
  items = [], 
  speed = 0.7, 
  direction = 'horizontal',
  repeatCount = 4,
  className = '',
  itemClassName = '',
  containerClassName = '',
  pauseOnHover = true 
}) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const isPausedRef = useRef(false);

  // Create repeated items for seamless loop
  const loopItems = Array.from({ length: repeatCount }, () => items).flat();

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    let animationId;
    const content = contentRef.current;
    
    // Calculate content width once
    const contentWidth = content.scrollWidth / repeatCount;
    let currentOffset = 0;

    function animate() {
      if (isPausedRef.current) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      currentOffset += speed;
      
      // Reset to 0 when we've scrolled one full set of items
      if (currentOffset >= contentWidth) {
        currentOffset = 0;
      }
      
      // Update the transform directly instead of using setState
      if (content) {
        content.style.transform = `translateX(-${currentOffset}px)`;
      }

      animationId = requestAnimationFrame(animate);
    }

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [speed, repeatCount]);

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      isPausedRef.current = true;
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      isPausedRef.current = false;
    }
  };

  return (
    <div className={`auto-scrolling-container ${className}`}>
      <div
        className={`w-full overflow-hidden relative ${containerClassName}`}
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={contentRef}
          className={`auto-scrolling-list flex items-center list-none ${itemClassName}`}
          style={{
            transition: 'none',
            width: 'max-content',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          {loopItems.map((item, idx) => (
            <div key={idx} className={`flex-shrink-0 flex ${itemClassName}`}>
              {typeof item === 'string' ? (
                item.startsWith('fa-') ? (
                  <i className={item}></i>
                ) : (
                  <span>{item}</span>
                )
              ) : (
                item
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AutoScrolling;
