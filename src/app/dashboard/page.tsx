'use client'
import { useAuth } from "@/contexts/AuthContext";
import { SignOut } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getFanLevel } from "@/utils/getFanLevel";
import type { AnsweredQuestion } from "@/types/quiz-answers";
import { getGameplayStyle } from "@/utils/getGameplayStyle";
import { getRecommendedChannel } from "@/utils/getRecommendedChannel";

interface YoutubeVideo {
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

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const [ytVideos, setYtVideos] = useState<YoutubeVideo[]>([])
  const [fanLevel, setFanLevel] = useState<string>("")
  const [gameplayStyle, setGameplayStyle] = useState<string>("")
  const [recommendedContent, setRecommendedContent] = useState<string>("")

  const router = useRouter()
  
  async function fetchFuriaVideos() {
    const ytApiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
    const furiaChannelID = "UCT1F3iuRk0j7owMzNC09q1w"
    const maxResults = 5

    const url = `https://www.googleapis.com/youtube/v3/search?key=${ytApiKey}&channelId=${furiaChannelID}&part=snippet,id&order=date&maxResults=${maxResults}`
    
    try {
      const response = await fetch(url)
      const data = await response.json()
      setYtVideos(data.items)
    } catch (error) {
      console.log("Error fetching YouTube videos:", error)
    }
  }

  useEffect(() => {
    if (user) {
      async function generateFanProfile() {
        if (!user) return null
        
        const userId = `${user.email}-${user.name}`
        const quizAnswers = localStorage.getItem(`furioso-quiz-${userId}`)
        
        if (!quizAnswers) {
          return router.push("/quiz")
        }
    
        const parsedQuizAnswers: AnsweredQuestion[] = await JSON.parse(quizAnswers)
    
        const fanLevel = getFanLevel(parsedQuizAnswers.filter(answeredQuestion => answeredQuestion.questionIndex === 1)[0].answer)
        const recommendedContent = getRecommendedChannel(parsedQuizAnswers.filter(answeredQuestion => answeredQuestion.questionIndex === 2)[0].answer)
        const gameplayStyle = getGameplayStyle(parsedQuizAnswers.filter(answeredQuestion => answeredQuestion.questionIndex === 3)[0].answer)
  
        setFanLevel(fanLevel)
        setGameplayStyle(gameplayStyle)
        setRecommendedContent(recommendedContent)
      }
  
      generateFanProfile()
      fetchFuriaVideos()
    }
  }, [router, user])

  if (!user) return null

  return (
    <main className="flex flex-col min-h-screen items-center bg-zinc-900 text-zinc-50 p-4 md:py-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  className="w-full h-full rounded-full"
                  width={40}
                  height={40}
                />
              ) : (
                <Image
                  src="/furia-logo.png"
                  alt="Furia"
                  className="w-8 h-8"
                  width={40}
                  height={40}
                />
              )}
            </div>
            <div className="flex flex-col gap-px">
              <p className="text-xs font-medium uppercase tracking-wider">Bem vindo,</p>
              <p className="font-bold text-lg leading-tight">{user.name}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="text-red-500 cursor-pointer hover:text-red-400 transition-colors duration-200"
          >
            <SignOut size={24} />
          </button>
        </div>

        <section className="bg-zinc-800 p-6 rounded-2xl space-y-4 md:space-y-8 border border-zinc-700">
          <h2 className="text-2xl font-semibold text-center md:text-start">Resumo do seu perfil</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-zinc-900 p-4 rounded-xl space-y-2">
              <h3 className="text-lg font-bold">Nível de Fã</h3>
              <p className="uppercase text-sm">{fanLevel}🔥</p>
            </div>

            <div className="bg-zinc-900 p-4 rounded-xl space-y-2">
              <h3 className="text-lg font-bold">Estilo favorito</h3>
              <p className="uppercase text-sm">{gameplayStyle} 🎯</p>
            </div>

            <div className="bg-zinc-900 p-4 rounded-xl space-y-2">
              <h3 className="text-lg font-bold">Recomendação</h3>
              <p className="text-sm">
                Corre conferir as últimas notícias da {' '}
                <a href={recommendedContent} className="font-black underline">FURIA</a> 🏆
              </p>
            </div>
          </div>
        </section>

        {ytVideos && (
          <section className="bg-zinc-800 p-6 rounded-2xl space-y-4 md:space-y-8 border border-zinc-700">
            <h2 className="text-2xl font-semibold text-center md:text-start">Últimos vídeos da FURIA</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {ytVideos.map(video => (
                <a
                  key={video.id.videoId}
                  href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-zinc-900 pb-4 flex flex-col items-center border border-transparent hover:border-zinc-700 hover:shadow-lg transition-all duration-300 rounded-lg overflow-hidden"
                >
                  <Image
                    src={video.snippet.thumbnails.high.url}
                    alt={video.snippet.title}
                    className="w-full mb-2"
                    width={video.snippet.thumbnails.high.width}
                    height={video.snippet.thumbnails.high.height}
                  />
                  <p className="px-4 line-clamp-3">{video.snippet.title}</p>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}