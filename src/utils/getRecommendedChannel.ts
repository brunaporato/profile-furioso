const recommendedChannelMap: Record<string, string> = {
  'Instagram': 'https://www.instagram.com/furiagg/',
  'Twitter/X': 'https://x.com/FURIA',
  'TikTok': 'https://www.tiktok.com/@furia',
  'YouTube': 'https://www.youtube.com/@FURIAggCS',
}

export function getRecommendedChannel(social: string): string {
  return recommendedChannelMap[social] || 'https://www.youtube.com/@FURIAggCS'
}
