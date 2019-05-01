import React, {useState, useEffect, useRef, useCallback} from 'react'
import Skycons from './skycons'

type Props = {
  icon: IconName
  color?: string
  size?: number
  animate?: boolean
}

const ReactAnimatedWeather = ({
  icon,
  animate = true,
  size = 64,
  color = 'black'
}: Props) => {
  const [skyconIcon, setSkyconIcon] = useState<any>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prevColorRef = useRef<string>()
  const prevAnimateRef = useRef<boolean>()

  const removeSkyconIcon = useCallback((si, cRef) => {
    if (si && si.remove && cRef) {
      si.remove(cRef)
    }
  }, [])

  useEffect(() => {
    const currentCanvasRef = canvasRef.current
    if (color !== prevColorRef.current) {
      removeSkyconIcon(skyconIcon, currentCanvasRef)
      setSkyconIcon(
        new Skycons({
          color
        })
      )
    }
    prevColorRef.current = color
    return () => {
      removeSkyconIcon(skyconIcon, currentCanvasRef)
    }
  }, [canvasRef, skyconIcon, color, removeSkyconIcon])

  useEffect(() => {
    if (!skyconIcon) {
      return
    }
    skyconIcon.add(canvasRef.current, Skycons[icon])

    if (animate !== prevAnimateRef.current) {
      skyconIcon.play()
    } else {
      skyconIcon.pause()
    }
    prevAnimateRef.current = animate
  }, [icon, animate, skyconIcon, canvasRef])

  return <canvas ref={canvasRef} width={size} height={size} />
}

export default ReactAnimatedWeather
export type IconName =
  | 'CLEAR_DAY'
  | 'CLEAR_NIGHT'
  | 'PARTLY_CLOUDY_DAY'
  | 'PARTLY_CLOUDY_NIGHT'
  | 'CLOUDY'
  | 'RAIN'
  | 'SLEET'
  | 'SNOW'
  | 'WIND'
  | 'FOG'
