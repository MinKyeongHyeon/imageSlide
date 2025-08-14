import { useState, useEffect } from "react";
import { useScrollObserver } from "./Hooks/useScrollObserver";

function ImageList() {
  const [images, setImages] = useState([]);
  const isBottom = useScrollObserver();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchImages(pageNum, isFirst = true) {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${pageNum}&limit=5`
      );
      if (!response.ok) throw new Error("으악! 으악!");
      const data = await response.json();
      if (isFirst) setImages(data);
      else setImages((prev) => [...prev, ...data]);
    } catch (error) {
      console.error("으아악 오류발생", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (isBottom && !isLoading) {
      setPage((prev) => prev + 1);
      fetchImages(page, false);
    }
  }, [isBottom, isLoading, page]);

  // 카드에 옵저버 등록 (이미지가 바뀔 때마다)
  useEffect(() => {
    const cards = document.getElementsByClassName("card");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) =>
        entry.target.classList.toggle("show", entry.isIntersecting)
      );
    });
    Array.from(cards).forEach((card) => observer.observe(card));

    // 정리(clean-up)
    return () => {
      Array.from(cards).forEach((card) => observer.unobserve(card));
      observer.disconnect();
    };
  }, [images]);

  return (
    <>
      <ul>
        {images.map((image) => (
          <li key={image.id} className="card">
            <img src={image.download_url} alt={image.author} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default ImageList;
