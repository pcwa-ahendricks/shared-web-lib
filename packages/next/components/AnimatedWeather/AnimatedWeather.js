// @flow
import React, {useState, useEffect, useRef, useCallback} from 'react'
import Skycons from './skycons'

type Props = {
  animate: boolean,
  size: number,
  color: string,
  icon: IconName
}

const ReactAnimatedWeather = ({icon, animate, size, color}: Props) => {
  const [skyconIcon, setSkyconIcon] = useState(null)
  const canvasRef = useRef()
  const prevColorRef = useRef()
  const prevAnimateRef = useRef()

  const removeSkyconIcon = useCallback((si, cRef) => {
    if (si && si.remove && cRef) {
      si.remove(cRef)
    }
  }, [])

  useEffect(() => {
    if (color !== prevColorRef.current) {
      removeSkyconIcon(skyconIcon, canvasRef.current)
      setSkyconIcon(
        new Skycons({
          color
        })
      )
    }
    prevColorRef.current = color
    return () => {
      removeSkyconIcon(skyconIcon, canvasRef.current)
    }
  }, [canvasRef, skyconIcon, color])

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

ReactAnimatedWeather.defaultProps = {
  animate: true,
  size: 64,
  color: 'black'
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
