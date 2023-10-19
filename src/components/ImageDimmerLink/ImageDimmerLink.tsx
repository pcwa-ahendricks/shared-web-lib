import React, {useState} from 'react'
import {Box, Typography as Type, BoxProps} from '@mui/material'
import Link from 'next/link'
import {stringify} from 'querystringify'
import Image from 'next/legacy/image'
import {imgixUrlLoader} from '@lib/imageLoader'
import useTheme from '@hooks/useTheme'

type Props = {
  imgSrc: string
  href: string
  height?: number
  width?: number
  imgAlt: string
  caption: string
  description: string
  descriptionSubtitle?: string
  imgixParams?: any
} & BoxProps

const ImageDimmerLink = ({
  imgAlt: alt,
  caption,
  description,
  descriptionSubtitle = 'Click for more info...',
  height = 300,
  width = 400,
  imgSrc,
  href,
  imgixParams = {},
  ...rest
}: Props) => {
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const theme = useTheme()
  const style = {
    dimmer: {
      transition: 'background-color 300ms cubic-bezier(0.4, 0.0, 0.2, 1)',
      backgroundColor: isHovering ? 'rgba(0, 0, 0, .6)' : 'rgba(0,0,0, 0.0)',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    },
    container: {
      cursor: 'pointer'
    },
    imgCaption: {
      color: theme.palette.common.white,
      position: 'absolute',
      lineHeight: '1.5em',
      pointerEvents: 'none',
      width: '95%',
      fontWeight: 500,
      top: 'calc(50% - 3rem)',
      left: 0,
      textAlign: 'center',
      textTransform: 'capitalize',
      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
      transition: 'opacity 400ms ease',
      opacity: isHovering ? 0 : 1
    },
    hoverCaptionContainer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: 'auto',
      width: '90%',
      textAlign: 'center',
      pointerEvents: 'none',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
      // lineHeight: '1.5rem',
    },
    description: {
      color: theme.palette.common.white,
      fontWeight: 500,
      transition: 'opacity 400ms ease',
      opacity: isHovering ? 1 : 0
    },
    descriptionSubtitle: {
      marginTop: '1rem',
      color: theme.palette.common.white,
      fontStyle: 'italic',
      fontWeight: 400,
      transition: 'opacity 400ms ease',
      opacity: isHovering ? 1 : 0
    }
  }

  return (
    <Link href={href}>
      <Box
        sx={{...style.container}}
        position="relative"
        onMouseLeave={() => setIsHovering(false)}
        onMouseEnter={() => setIsHovering(true)}
        overflow="hidden"
        minWidth={width}
        width="100%"
        {...rest}
      >
        <Image
          loader={imgixUrlLoader}
          src={`${imgSrc}${stringify(
            {
              fit: 'crop',
              ...imgixParams
            },
            true
          )}`}
          layout="responsive"
          sizes="(max-width: 600px) 100vw, 45vw"
          width={width}
          height={height}
          alt={alt}
        />
        <Box sx={{...style.dimmer}} />
        <Box>
          <Type variant="h2" sx={{...style.imgCaption}}>
            {caption}
          </Type>
        </Box>
        <Box sx={{...style.hoverCaptionContainer}}>
          <Type variant="h4" sx={{...style.description}}>
            {description}
          </Type>
          <Type variant="h6" sx={{...style.descriptionSubtitle}}>
            {descriptionSubtitle}
          </Type>
        </Box>
      </Box>
    </Link>
  )
}

export default ImageDimmerLink
