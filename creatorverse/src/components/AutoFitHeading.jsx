import { useEffect, useRef, useState } from "react";

/**
 * Auto-shrinks text so it fits on ONE line within its container.
 * Props:
 *  - max: starting font size in px
 *  - min: minimum font size in px
 *  - step: decrement step in px
 */
export default function AutoFitHeading({ children, max = 24, min = 12, step = 1, style, ...props }) {
  const ref = useRef(null);
  const [fontSize, setFontSize] = useState(max);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function fit() {
      let size = max;
      // Apply styles for measuring
      el.style.whiteSpace = "nowrap";
      el.style.fontSize = size + "px";

      // Decrease until it fits or we hit min
      while (el.scrollWidth > el.clientWidth && size > min) {
        size -= step;
        el.style.fontSize = size + "px";
      }
      setFontSize(size);
    }

    // Initial + on resize
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    window.addEventListener("resize", fit);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, [children, max, min, step]);

  return (
    <h3
      ref={ref}
      style={{
        marginBottom: 4,
        whiteSpace: "nowrap",
        overflow: "hidden",
        fontSize,
        ...style,
      }}
      {...props}
    >
      {children}
    </h3>
  );
}
