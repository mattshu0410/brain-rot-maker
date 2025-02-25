export interface Video {
    id: number
    name: string
    src: string
    alt: string
  }
  
  export interface VideoCarouselProps {
    videos: Video[]
    onSlideChange?: (index: number) => void
  }