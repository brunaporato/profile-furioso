import { NextResponse } from "next/server";

export async function GET() {
  const ytApiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const furiaChannelID = "UCT1F3iuRk0j7owMzNC09q1w";
  const maxResults = 5;

  const url = `https://www.googleapis.com/youtube/v3/search?key=${ytApiKey}&channelId=${furiaChannelID}&part=snippet,id&order=date&maxResults=${maxResults}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (!data.items) {
      throw new Error("No items found in the response");
    }

    return NextResponse.json(data.items, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=0, s-maxage=604800', // 7d in seconds
      },
    });
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 });
  }
}
