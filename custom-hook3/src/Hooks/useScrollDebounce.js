import { useState, useEffect } from "react";

export function useScrollDebounce() {
  const [isBottom, setIsBottom] = useState();

  const debounce = (callback, delay) => {
    let timerId;

    return (...args) => {
      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(callback, delay, ...args);
    };
  };

  useEffect(
    debounce(() => {
      window.addEventListener("scroll", () => {
        // window.innerHeight > 뷰포트의 높이
        // scrollTop > 타겟 요소가 화면 상단으로부터 스크롤 된 길이
        // offsetHeight > 타겟 요소의 전체 높이
        setIsBottom(
          window.innerHeight + document.documentElement.scrollTop + 10 >=
            document.documentElement.offsetHeight
        );
      });
    }),
    []
  );

  return isBottom;
}
