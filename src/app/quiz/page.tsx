'use client'

import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { questions } from "@/data/questions"
import type { AnsweredQuestion } from "@/types/quiz-answers"

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState<AnsweredQuestion[]>([])
  
  const { completeQuiz } = useAuth()

  const currentQuestion = questions[currentQuestionIndex]

  function handleAnswer(answer: string) {
    const currentAnsweredQuestion: AnsweredQuestion = {
      questionIndex: currentQuestionIndex,
      answer: answer,
    }
    setAnsweredQuestions((prev) => [...prev, currentAnsweredQuestion])

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      completeQuiz([...answeredQuestions, currentAnsweredQuestion])
    }
  }

  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-zinc-900 text-zinc-50 p-4">
      <div className="max-w-xl w-full space-y-14">
        <div className="flex flex-col gap-5 md:items-center">
          <h1 className="text-3xl font-medium flex flex-col">
            QUIZ
            <span className="font-extrabold -mt-1">FURIOSO 🔥</span>
          </h1>
          <p className="text-sm text-zinc-300">Responda as perguntas para conhecermos mais sobre você.</p>
        </div>

        <div className="bg-zinc-800 p-6 rounded-2xl space-y-6 border border-zinc-600">
          <h2 className="text-lg font-semibold">{currentQuestion.question}</h2>

          <div className="flex flex-col gap-4">
            {currentQuestion.options.map(option => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className="bg-zinc-100 border border-zinc-500 text-zinc-900 p-1.5 rounded hover:bg-zinc-300 transition duration-200 cursor-pointer"
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <p className="text-zinc-400 text-center text-sm">
          Pergunta {currentQuestionIndex + 1} de {questions.length}
        </p>
      </div>
    </main>
  )

  
}