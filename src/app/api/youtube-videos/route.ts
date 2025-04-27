import type { YoutubeVideo } from "@/types/youtube-video";
import { NextResponse } from "next/server";

let cachedVideos: YoutubeVideo[] = [];
let cacheTimestamp = 0;
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 dias em ms

export async function GET() {
  const ytApiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const furiaChannelID = "UCT1F3iuRk0j7owMzNC09q1w";
  const maxResults = 5;
  
  const now = Date.now();

  if (cachedVideos.length > 0 && (now - cacheTimestamp) < CACHE_DURATION) {
    console.log("Serving videos from cache");
    return NextResponse.json({ items: cachedVideos }, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=0, s-maxage=604800', // 7 dias
      },
    });
  }

  console.log("Fetching fresh videos from YouTube");

  const url = `https://www.googleapis.com/youtube/v3/search?key=${ytApiKey}&channelId=${furiaChannelID}&part=snippet,id&order=date&maxResults=${maxResults}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (!data.items) {
      throw new Error("No items found in the response");
    }

    cachedVideos = data.items;
    cacheTimestamp = now;

    return NextResponse.json({ items: cachedVideos }, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=0, s-maxage=604800', 
      },
    });
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 });
  }
}
