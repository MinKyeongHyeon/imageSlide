import { useState, useEffect, useRef } from "react";

export function useScrollThrottle() {
  const [isBottom, setIsBottom] = useState(false);
  const throttleTimeout = useRef(null);

  useEffect(() => {
    function handleScroll() {
      if (throttleTimeout.current) return;

      console.log("쓰~로틀~스크롤~~링");

      throttleTimeout.current = setTimeout(() => {
        setIsBottom(
          window.innerHeight + document.documentElement.scrollTop + 10 >=
            document.documentElement.offsetHeight
        );
        throttleTimeout.current = null;
      }, 2000);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (throttleTimeout.current) clearTimeout(throttleTimeout.current);
    };
  }, []);

  return isBottom;
}
