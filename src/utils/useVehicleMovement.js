import { useState, useEffect, useRef } from "react";

export default function useVehicleMovement(route, interval = 1000) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev < route.length - 1) return prev + 1;
          clearInterval(intervalRef.current);
          return prev;
        });
      }, interval);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, route, interval]);

  return { currentIndex, isPlaying, setIsPlaying };
}
