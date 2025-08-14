import { useEffect } from "react";
import { useState } from "react";

export function useScroll() {
  const [isBottom, setIsBottom] = useState();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      // window.innerHeight > 뷰포트의 높이
      // scrollTop > 타겟 요소가 화면 상단으로부터 스크롤된 길이
      // documentElement > 문서의 루트 요소
      // offsetHeight > 타겟 요소의 전체 높이

      setIsBottom(
        window.innerHeight + document.documentElement.scrollTop + 10 >=
          document.documentElement.offsetHeight
      );
      console.log("scrolling...");
    });
  }, []);

  return isBottom;
}
