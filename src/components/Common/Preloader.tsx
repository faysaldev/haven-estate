"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Hide preloader after a minimum time to ensure smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Minimum 1.5 seconds to show the preloader

    return () => clearTimeout(timer);
  }, [pathname]); // Re-run when route changes

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center">
      <div className="w-[500px] h-[400px] flex items-center justify-center">
        <video
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
          onEnded={() => {}}
        >
          <source src="/preloader.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default Preloader;
