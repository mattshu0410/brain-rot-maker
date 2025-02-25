"use client";

import { DashboardButtons } from "@/app/DashboardButtons";
import { StickyHeader } from "@/components/layout/sticky-header";
import { useState } from "react";
import { Suspense } from "react";

import { Loader2 } from "lucide-react";
import VideoCarousel from "@/components/ui/video-carousel";
import VideoDisplay from "@/components/ui/video-display";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

// Helper function to generate random NBA player data
const generateNBAPlayer = () => {
  const names = [
    "LeBron James",
    "Stephen Curry",
    "Kevin Durant",
    "Giannis Antetokounmpo",
    "Kawhi Leonard",
  ];
  const randomName = names[Math.floor(Math.random() * names.length)];
  return {
    id: Math.floor(Math.random() * 1000),
    name: randomName,
    src: `https://i.makeagif.com/media/6-03-2016/O-ifm3.gif`,
    alt: `${randomName} playing basketball`,
  };
};

const topVideos = Array(5).fill(null).map(generateNBAPlayer);

const celebrityVideos = Array(5).fill(null).map(generateNBAPlayer);

export default function Home() {
  const [loadingText, setLoadingText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTopVideo, setSelectedTopVideo] = useState<number | null>(null);
  const [selectedCelebrity, setSelectedCelebrity] = useState(0);

  const handleGenerate = () => {
    setIsGenerating(true);
    setLoadingText("Mimicking voice...");
    new Promise((resolve) => setTimeout(resolve, 2000))
      .then(() => {
        setLoadingText("Syncing lips...");
        return new Promise((resolve) => setTimeout(resolve, 2000));
      })
      .then(() => {
        setLoadingText("Generating brain-rot...");
        return new Promise((resolve) => setTimeout(resolve, 2000));
      })
      .catch((error) => {
        console.error("Error during generation:", error);
        setLoadingText("An error occurred.");
      })
      .finally(() => {
        setLoadingText("");
        setIsGenerating(false);
      });
  };

  const handleTopVideoChange = (index: number) => {
    setSelectedTopVideo(topVideos[index].id);
  };

  return (
    <>
      <StickyHeader className="px-4 py-2">
        <div className="flex justify-between items-center">
          <span>SaaS Starter</span>
          <Suspense>
            <DashboardButtons />
          </Suspense>
        </div>
      </StickyHeader>
      <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24 bg-gray-100">
        <div className="z-10 w-full max-w-5xl items-center justify-between">
          <h1 className="text-4xl font-bold mb-8 text-center">
            productivebrainrot.ai
          </h1>
          <Textarea />
          <div className="my-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Select Top Video
            </h2>
            <VideoCarousel
              videos={topVideos}
              onSlideChange={handleTopVideoChange}
            />
            <p className="text-center mt-4">
              Selected Top Video:{" "}
              {selectedTopVideo !== null
                ? topVideos.find((v) => v.id === selectedTopVideo)?.name
                : "None"}
            </p>
          </div>
          <div className="my-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Select Celebrity
            </h2>
            <VideoCarousel
              videos={celebrityVideos}
              onSlideChange={setSelectedCelebrity}
            />
            <p className="text-center mt-4">
              Selected Celebrity: {selectedCelebrity + 1}
            </p>
          </div>
          <div className="text-center mt-8">
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || selectedTopVideo === null}
              className="w-full max-w-sm"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Video"
              )}
            </Button>
          </div>
          <VideoDisplay isLoading={isGenerating} loadingText={loadingText} />
        </div>
      </main>
    </>
  );
}
