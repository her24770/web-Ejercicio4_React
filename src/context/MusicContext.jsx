import { createContext, useContext, useState } from 'react'

const MusicContext = createContext()

export function MusicProvider({ children }) {
  const [tema, setTema] = useState(() => localStorage.getItem('tema') || 'dark')

  function toggleTema() {
    const nuevoTema = tema === 'dark' ? 'light' : 'dark'
    setTema(nuevoTema)
    localStorage.setItem('tema', nuevoTema)
  }

  return (
    <MusicContext.Provider value={{ tema, toggleTema }}>
      <div className={tema}>
        {children}
      </div>
    </MusicContext.Provider>
  )
}

export function useMusic() {
  return useContext(MusicContext)
}
