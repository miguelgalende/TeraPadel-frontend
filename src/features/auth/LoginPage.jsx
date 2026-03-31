import React, { useState, useEffect } from "react";
import img1 from "../../assets/padel1.png";
import img2 from "../../assets/padel2.png";
import img3 from "../../assets/padel3.png";
import img4 from "../../assets/padel4.png";

export default function LoginPage() {
  const images = [img1, img2, img3, img4];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <main className="pt-24 relative flex flex-col items-center justify-center min-h-screen bg-black text-center overflow-hidden">
      <div className="relative w-full h-screen">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`slide-${index}`}
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-50" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="absolute z-10 text-[#d7ff00]">
        <h1 className="text-4xl font-bold mb-4">Bienvenido</h1>
      </div>
    </main>
  );
}
