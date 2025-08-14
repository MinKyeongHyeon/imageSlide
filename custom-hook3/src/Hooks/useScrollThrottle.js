import { useState, useEffect, useRef } from "react";

export function useScrollThrottle() {
  const [isBottom, setIsBottom] = useState();
  const timer = useRef(null);

  useEffect(() => {
    function throttle(callback, delay) {
      return () => {
        if (timer.current === null) {
          timer.current = setTimeout(() => {
            callback();
            timer.current = null;
          }, delay);
        }
      };
    }

    const handleScroll = () => {
      setIsBottom(
        window.innerHeight + document.documentElement.scrollTop + 10 >=
          document.documentElement.offsetHeight
      );
      console.log("scrollEvent", setIsBottom);
    };

    const throttleHandler = throttle(handleScroll, 2000);
    // window.addEventListener("scroll", () => {
    //     setIsBottom(window.innerHeight + document.documentElement.scrollTop + 10 >= document.documentElement.offsetHeight);
    //     console.log("scrolling...");
    // });

    window.addEventListener("scroll", throttleHandler);

    return () => {
      window.removeEventListener("scroll", throttleHandler);
    };
  }, []);

  return isBottom;
}
