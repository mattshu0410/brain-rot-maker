"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import type { VideoCarouselProps } from "@/types/index";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";

export default function VideoCarousel({
  videos,
  onSlideChange,
}: VideoCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper: SwiperType) => {
    const newIndex = swiper.realIndex;
    setActiveIndex(newIndex);
    if (onSlideChange) {
      onSlideChange(newIndex);
    }
  };

  return (
    <div className="w-full mx-auto relative py-4">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1.5}
        initialSlide={2}
        loop={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2,
          slideShadows: true,
        }}
        modules={[EffectCoverflow]}
        className="w-full"
        onSlideChange={handleSlideChange}
      >
        {videos.map((video, index) => (
          <SwiperSlide
            key={video.id || index}
            className="w-[400px] h-[225px] transition-all duration-300 rounded-lg overflow-hidden"
          >
            <div
              className={`relative w-full h-full group ${
                index === activeIndex ? "scale-110 z-10" : "scale-100"
              }`}
            >
              <img
                src={video.src || "/placeholder.svg"}
                alt={video.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-5 right-0 p-4">
                <h3 className="text-white text-[length:clamp(0.8rem,1.5vw,1.25rem)] font-semibold">
                  {video.name || `Slide ${index + 1}`}
                </h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
