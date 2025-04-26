"use client"
import { signIn } from "next-auth/react"
import Image from "next/image"

export default function Login() {
  function handleLogin() {
    signIn('google', { callbackUrl: '/quiz' })
  }

  return (
    <main className='flex relative min-h-screen items-center justify-center bg-zinc-900 text-zinc-50 max-w-screen overflow-hidden'>
      <div className='flex flex-col items-center gap-4'>
        <Image src="/furia-logo.png" alt="Furia" width={82} height={82} />
        <h1 className='text-2xl mt-4 md:text-3xl font-bold flex flex-col items-center'>
          <span className="uppercase font-medium tracking-widest">Bem vindo ao</span>
          <span className="font-extrabold text-3xl md:text-4xl">FURIOSO PROFILE</span>
        </h1>
        <p className='text-zinc-300 text-sm leading-relaxed md:text-md text-center max-w-xs md:max-w-md'>Conecte-se com sua conta para descobrir seu perfil de fã da FURIA!</p>

        <button onClick={handleLogin} className='flex items-center justify-center gap-2 bg-zinc-50 text-zinc-900 py-3 w-full rounded-md font-medium tracking-wider hover:bg-zinc-200 transition-all duration-300 cursor-pointer mt-5'>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
              <path fill="#FFC107" d="M43.6 20.5h-2V20H24v8h11.3c-1.7 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l6-6C36.1 7.2 30.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.9-8.9 19.9-20 0-1.3-.1-2.7-.3-3.5z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14 15.7 18.6 14 24 14c3.1 0 5.9 1.2 8 3.1l6-6C36.1 7.2 30.4 4 24 4c-7.8 0-14.4 4.5-17.7 10.7z"/>
              <path fill="#4CAF50" d="M24 44c6.4 0 12.1-2.5 16.4-6.5l-7.6-6.2c-2.2 1.8-5 2.9-8.2 2.9-5.2 0-9.5-3.4-11.1-8H6.3C9.6 39.5 16.2 44 24 44z"/>
              <path fill="#1976D2" d="M43.6 20.5h-2V20H24v8h11.3c-1 2.7-2.9 5-5.3 6.5l7.6 6.2c4.4-4.1 7-10.1 7-16.7 0-1.3-.1-2.7-.3-3.5z"/>
            </svg>
          </span>
          Entrar com Google
        </button>
      </div>

      <div className="w-40 h-40 block bg-yellow-500 rounded-full blur-3xl absolute -top-12 -right-20 md:-right-10 md:-top-8 md:h-52 md:w-52" />
      <div className="w-40 h-40 block bg-zinc-100 rounded-full blur-3xl absolute -bottom-16 -left-20 md:-left-10 md:-bottom-12 md:h-52 md:w-52" />
    </main>
  )
}