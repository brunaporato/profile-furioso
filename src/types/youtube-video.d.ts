export type YoutubeVideo = {
  id: {
    videoId: string
  }
  snippet: {
    title: string
    description: string
    thumbnails: {
      high: {
        url: string
        width: number
        height: number
      }
    }
  }
}

export type YoutubeVideosResponse =  { items: YoutubeVideo[] } | { error: string }