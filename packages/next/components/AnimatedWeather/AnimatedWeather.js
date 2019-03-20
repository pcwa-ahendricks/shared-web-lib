// @flow
import React, {useState, useEffect, useRef, useCallback} from 'react'
import Skycons from 'skycons'

type Props = {
  animate: boolean,
  size: number,
  color: string,
  icon: IconName
}

const ReactAnimatedWeather = ({icon, animate, size, color}: Props) => {
  const [skyconIcon, setSkyconIcon] = useState(null)
  const skyconIconRef = useRef()
  const prevColorRef = useRef()

  const removeSkyconIcon = useCallback((si, siCurrentRef) => {
    if (si && si.remove && siCurrentRef) {
      si.remove(siCurrentRef)
    }
  }, [])

  useEffect(() => {
    if (color !== prevColorRef.current) {
      removeSkyconIcon(skyconIcon, skyconIconRef.current)
      setSkyconIcon(
        new Skycons({
          color
        })
      )
    }
    prevColorRef.current = color
    return () => {
      removeSkyconIcon(skyconIcon, skyconIconRef.current)
    }
  }, [skyconIconRef, skyconIcon, color])

  useEffect(() => {
    if (!skyconIcon) {
      return
    }
    skyconIcon.add(skyconIconRef.current, Skycons[icon])

    if (animate) {
      skyconIcon.play()
    } else {
      skyconIcon.pause()
    }
  }, [icon, animate, skyconIcon, skyconIconRef])

  return <canvas ref={skyconIconRef} width={size} height={size} />
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
