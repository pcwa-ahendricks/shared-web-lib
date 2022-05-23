import React, {useCallback, useState} from 'react'
import {
  CardActionArea,
  CardMedia,
  CardActionAreaProps,
  CardMediaProps
} from '@material-ui/core'
import ImageFancier, {
  ImageFancierProps
} from '@components/ImageFancier/ImageFancier'

export type FancierCardActionAreaProps = {
  CardMediaProps?: CardMediaProps
  ImageFancierProps: ImageFancierProps
} & CardActionAreaProps

const FancierCardActionArea = ({
  CardMediaProps,
  ImageFancierProps,
  children,
  ...rest
}: FancierCardActionAreaProps) => {
  const [actionAreaIsHover, setActionAreaIsHover] = useState<boolean>() // For animation w/ <ImageFancier/> to work properly this must be initialized as undefined

  const enterHandler = useCallback(() => {
    setActionAreaIsHover(true)
  }, [])

  const leaveHandler = useCallback(() => {
    setActionAreaIsHover(false)
  }, [])

  return (
    /* prop order is important */
    <CardActionArea
      {...rest}
      onMouseEnter={enterHandler}
      onMouseLeave={leaveHandler}
    >
      <CardMedia {...CardMediaProps}>
        <ImageFancier {...ImageFancierProps} isHover={actionAreaIsHover} />
      </CardMedia>
      {children}
    </CardActionArea>
  )
}

export default FancierCardActionArea
