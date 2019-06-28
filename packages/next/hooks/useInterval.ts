import {useEffect, useState} from 'react'

const useInterval = (cb: () => any, interval: number = 1000) => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>()

  useEffect(() => {
    const newId = setInterval(() => {
      cb()
    }, interval)
    setTimeoutId(newId)
    return () => {
      clearInterval(newId)
      setTimeoutId(null)
    }
  }, [cb, interval])

  return timeoutId
}
export default useInterval
