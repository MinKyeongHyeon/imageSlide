import { useEffect } from "react";
import { useState } from "react";

export function useMouseLocation(initVal) {
  const [mouseLocation, setMouseLocation] = useState(
    initVal || { x: null, y: null }
  );

  useEffect(() => {
    window.addEventListener("mousemove", (event) => {
      setMouseLocation({ x: event.x, y: event.y });
    });

    return () => {};
  }, []);

  return mouseLocation;
}
