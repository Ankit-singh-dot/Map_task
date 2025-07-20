import React from "react";
import MapView from "./components/MapView";
import "leaflet/dist/leaflet.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { getDistance } from "geolib";
const App = () => {
  const [route, setRoute] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const data = await axios.get("/dummy-route.json");
        setRoute(data.data);
        setCurrentIndex(0);
      } catch (error) {
        console.error("Error loading route data:", error);
      }
    };
    fetchRoute();
  }, []);

  useEffect(() => {
    if (isPlaying && route.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          if (prevIndex >= route.length - 1) {
            setIsPlaying(false); 
            return prevIndex;
          }

          const prev = route[prevIndex];
          const curr = route[prevIndex + 1];

          if (prev && curr) {
            const distance = getDistance(
              { latitude: prev.latitude, longitude: prev.longitude },
              { latitude: curr.latitude, longitude: curr.longitude }
            );
            const timeDiff =
              (new Date(curr.timestamp) - new Date(prev.timestamp)) / 1000;

            const calculatedSpeed = (distance / timeDiff) * 3.6; 
            setSpeed(calculatedSpeed.toFixed(2));
          }
          return prevIndex + 1;
        });
       
      }, 2000); 
    } else {

        clearInterval(intervalRef.current);
        intervalRef.current = null;
        
      }
    

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, route]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const resetToStart = () => {
    setCurrentIndex(0);
    setIsPlaying(false);
  };


  return (
    <div className="h-screen w-screen">
      {route.length > 0 && (
        <>
          <MapView route={route} currentIndex={currentIndex} />
          <div className="absolute top-4 left-4 bg-white shadow-lg p-4 rounded-lg z-[1000]">
            <div className="flex gap-2 mb-3 ">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
                onClick={togglePlay}
              >
                {isPlaying ? "⏸️ Pause" : "▶️ Play"}
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
                onClick={resetToStart}
              >
                🔄 Reset
              </button>
            </div>
            <div className="text-sm text-gray-700 space-y-1">
              <p>
                <strong>Position:</strong> {currentIndex + 1} / {route.length}
              </p>
              <p>
                <strong>Lat:</strong> {route[currentIndex]?.latitude.toFixed(6)}
              </p>
              <p>
                <strong>Lng:</strong>{" "}
                {route[currentIndex]?.longitude.toFixed(6)}
              </p>
              <p>
                <strong>Time:</strong> {route[currentIndex]?.timestamp}
              </p>
              <p>
                <strong>Speed:</strong>{" "}
                {speed !== null ? `${speed} km/h` : "--"}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
