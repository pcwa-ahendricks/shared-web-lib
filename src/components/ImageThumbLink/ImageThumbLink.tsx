import React, {useState, useMemo, useCallback} from 'react'
import {Box, Theme, Typography as Type} from '@mui/material'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import {ColumnBox} from 'mui-sleazebox'
import FlexLink, {FlexLinkProps} from '@components/FlexLink/FlexLink'
import slugify from 'slugify'
import Image, {ImageProps} from 'next/legacy/image'
import {imgixUrlLoader} from '@lib/imageLoader'

type Props = {
  caption?: string
  imgixUrl?: string
  filename?: string
  margin?: number
  alt: string
  paddingPercent?: number
} & Partial<FlexLinkProps> &
  Partial<ImageProps>

type UseStylesProps = {
  isHover: boolean
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    titleCaption: ({isHover}: UseStylesProps) => ({
      color: !isHover ? theme.palette.text.primary : theme.palette.primary.main
    }),
    link: {
      textDecoration: 'none',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      outline: 'none' // Don't show outline
    },
    thumbnailContainer: ({isHover}: UseStylesProps) => ({
      background: theme.palette.common.white,
      boxShadow: '1px 1px 4px #ccc',
      border: !isHover
        ? '1px solid transparent'
        : '1px solid rgba(180, 191, 205, 0.7)'
    })
  })
)

const ImageThumbLink = ({
  caption = '',
  imgixUrl,
  filename: filenameProp = '',
  margin = 0,
  alt,
  width = 85,
  height = 110,
  href: hrefProp,
  isNextLink = false,
  sizes = '10vw',
  ...rest
}: Props) => {
  // const theme = useTheme<Theme>()
  // const isXs = useMediaQuery(theme.breakpoints.only('xs'))
  // const isSm = useMediaQuery(theme.breakpoints.only('sm'))
  const [isHover, setIsHover] = useState<boolean>(false)
  const classes = useStyles({isHover})

  const mouseEnterHandler = useCallback(() => {
    setIsHover(true)
  }, [])
  const mouseLeaveHandler = useCallback(() => {
    setIsHover(false)
  }, [])

  const downloadAs = useMemo(() => slugify(filenameProp), [filenameProp])

  const href = hrefProp || `${imgixUrl}?dl=${downloadAs}`

  return (
    // minWidth required w/ Image on Standards page
    <Box mt={margin} ml={margin} minWidth={width} width="100%">
      <FlexLink
        href={href}
        className={classes.link}
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
        isNextLink={isNextLink}
        {...rest}
      >
        <Box
          width={width}
          className={classes.thumbnailContainer}
          alignItems="stretch"
        >
          <Image
            loader={imgixUrlLoader}
            src={imgixUrl || href}
            alt={alt}
            layout="responsive"
            sizes={sizes}
            width={width ?? 0}
            height={height ?? 0}
            objectFit="cover"
          />
        </Box>
        <ColumnBox textAlign="center" mt={1}>
          <Type variant="body2" className={classes.titleCaption}>
            {caption}
          </Type>
        </ColumnBox>
      </FlexLink>
    </Box>
  )
}

export default ImageThumbLink
