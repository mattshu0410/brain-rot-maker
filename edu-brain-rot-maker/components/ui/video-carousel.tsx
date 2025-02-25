"use client"

import { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCoverflow } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"
import type { VideoCarouselProps} from "@/types/index"




export default function VideoCarousel({ videos, onSlideChange }: VideoCarouselProps) {
    const [activeIndex, setActiveIndex] = useState(0)
  
    const handleSlideChange = (swiper: SwiperType) => {
      const newIndex = swiper.realIndex
      setActiveIndex(newIndex)
      if (onSlideChange) {
        onSlideChange(newIndex)
      }
    }
  
    return (
      <div className="w-full max-w-[800px] mx-auto">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          loop={true}
          coverflowEffect={{
            rotate: 5,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          modules={[EffectCoverflow]}
          className="w-full py-8"
          onSlideChange={handleSlideChange}
        >
          {videos.map((video, index) => (
            <SwiperSlide
              key={video.id || index}
              className="w-[540px] h-[480px] rounded-[32px] overflow-hidden bg-black transition-all"
              style={{
                width: "540px",
                height: "480px",
              }}
            >
              <div className={`relative w-full h-full ${index === activeIndex ? "ring-4 ring-blue-500" : ""}`}>
                <img src={video.src || "/placeholder.svg"} alt={video.alt} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                  <h3 className="text-white text-2xl font-semibold">{video.name || `Slide ${index + 1}`}</h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )
  }
  