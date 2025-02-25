import { Loader2 } from "lucide-react"

interface VideoDisplayProps {
  isLoading: boolean
  loadingText: string
  videoSrc?: string | null
}

export default function VideoDisplay({ isLoading, loadingText, videoSrc }: VideoDisplayProps) {
  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="relative w-full h-[640px] bg-gray-200 rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin" />
            <p className="mt-4 text-lg font-semibold">{loadingText}</p>
          </div>
        ) : videoSrc ? (
          <img src={videoSrc || "/placeholder.svg"} alt="Generated Video" className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-lg font-semibold">Your video will appear here</p>
          </div>
        )}
      </div>
    </div>
  )
}

