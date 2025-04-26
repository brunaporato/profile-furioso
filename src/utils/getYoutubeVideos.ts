import type { YoutubeVideosResponse } from "@/types/youtube-video";

export async function getYoutubeVideos(): Promise<YoutubeVideosResponse | undefined> {
  try {
    const response = await fetch("/api/youtube-videos", {
      next: { revalidate: 604800 }, // 7d in seconds
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
  }
}
