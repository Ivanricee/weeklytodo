import { useState, useEffect } from 'react'

export default function CurrentHour() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date())
    }, 10000)

    return () => clearInterval(intervalId) // Limpia el intervalo al desmontar el componente
  }, [])
  const lang = navigator.language
  const time = currentTime.toLocaleString(lang, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
  return <small className="text-foreground/75 font-medium">{time}</small>
}
