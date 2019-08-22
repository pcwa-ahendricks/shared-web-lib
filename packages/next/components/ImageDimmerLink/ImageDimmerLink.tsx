import React, {useState} from 'react'
import {Box, Theme, Typography} from '@material-ui/core'
import {BoxProps} from '@material-ui/core/Box'
// import LazyImgix from '@components/LazyImgix/LazyImgix'
import ReactImgix from 'react-imgix'
import Link from 'next/link'
import {createStyles, makeStyles} from '@material-ui/styles'

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

type UseStylesProps = {
  isHovering: boolean
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dimmer: ({isHovering}: UseStylesProps) => ({
      transition: 'background-color 300ms cubic-bezier(0.4, 0.0, 0.2, 1)',
      backgroundColor: isHovering ? 'rgba(0, 0, 0, .6)' : 'rgba(0,0,0, 0.0)'
    }),
    container: {
      cursor: 'pointer'
    },
    imgCaption: ({isHovering}: UseStylesProps) => ({
      color: theme.palette.common.white,
      position: 'absolute',
      lineHeight: '1.5em',
      // zIndex: 50, // zIndex overlaps Primary Navbar.
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
    }),
    hoverCaptionContainer: {
      position: 'absolute',
      top: 'calc(50% - 3rem)',
      left: 0,
      right: 0,
      margin: 'auto',
      width: '90%',
      textAlign: 'center',
      pointerEvents: 'none'
      // lineHeight: '1.5rem',
    },
    description: ({isHovering}: UseStylesProps) => ({
      color: theme.palette.common.white,
      // zIndex: 50,
      fontWeight: 500,
      transition: 'opacity 400ms ease',
      opacity: isHovering ? 1 : 0
    }),
    descriptionSubtitle: ({isHovering}: UseStylesProps) => ({
      marginTop: '1rem',
      color: theme.palette.common.white,
      // zIndex: 50,
      fontStyle: 'italic',
      fontWeight: 400,
      transition: 'opacity 400ms ease',
      opacity: isHovering ? 1 : 0
    })
  })
)

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
  const classes = useStyles({isHovering})

  return (
    <Link href={href}>
      <Box
        className={classes.container}
        position="relative"
        onMouseLeave={() => setIsHovering(false)}
        onMouseEnter={() => setIsHovering(true)}
        overflow="hidden"
        {...rest}
      >
        <ReactImgix
          width={width}
          height={height}
          src={imgSrc}
          htmlAttributes={{
            alt
            // style: {width: '100%'}
          }}
          imgixParams={{
            fit: 'crop',
            ...imgixParams
          }}
        />
        <Box
          className={classes.dimmer}
          position="absolute"
          top={0}
          bottom={0}
          left={0}
          right={0}
        />
        <Box>
          <Typography variant="h2" className={classes.imgCaption}>
            {caption}
          </Typography>
        </Box>
        <Box className={classes.hoverCaptionContainer}>
          <Typography variant="h4" className={classes.description}>
            {description}
          </Typography>
          <Typography variant="h6" className={classes.descriptionSubtitle}>
            {descriptionSubtitle}
          </Typography>
        </Box>
      </Box>
    </Link>
  )
}

export default ImageDimmerLink
