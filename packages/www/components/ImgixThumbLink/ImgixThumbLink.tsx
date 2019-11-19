import React, {useState, useMemo, useCallback} from 'react'
import {Box, Theme, Typography as Type, useMediaQuery} from '@material-ui/core'
import ImgixFancy from '@components/ImgixFancy/ImgixFancy'
import {useTheme, createStyles, makeStyles} from '@material-ui/core/styles'
import {ColumnBox} from '@components/boxes/FlexBox'
import {BoxProps} from '@material-ui/core/Box'

type Props = {
  caption?: string
  url: string
  anchorHref?: string
  filename?: string
  margin?: number
  alt: string
  paddingPercent?: string
  imageWidth?: BoxProps['width']
}

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
      alignItems: 'center'
    },
    thumbnailContainer: ({isHover}: UseStylesProps) => ({
      boxShadow: '1px 1px 4px #ccc',
      border: !isHover
        ? '1px solid transparent'
        : '1px solid rgba(180, 191, 205, 0.7)'
    })
  })
)

const ImgixThumbLink = ({
  caption = '',
  url,
  anchorHref,
  filename = '',
  margin = 0,
  alt,
  imageWidth: imageWidthProp,
  paddingPercent = '129.412%' // Default to 8.5x11 ratio (11/8.5*100).
}: Props) => {
  const theme = useTheme<Theme>()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))
  const isSm = useMediaQuery(theme.breakpoints.only('sm'))
  const defaultImageWidth = isXs ? 70 : isSm ? 75 : 85
  const imageWidth = useMemo(
    () => (imageWidthProp ? imageWidthProp : defaultImageWidth),
    [imageWidthProp, defaultImageWidth]
  )
  const [isHover, setIsHover] = useState<boolean>(false)
  const classes = useStyles({isHover})

  const mouseEnterHandler = useCallback(() => {
    setIsHover(true)
  }, [])
  const mouseLeaveHandler = useCallback(() => {
    setIsHover(false)
  }, [])

  return (
    <Box mt={margin} ml={margin} width="100%">
      <a
        href={anchorHref || `${url}?dl=${filename}`}
        rel="noopener noreferrer"
        target="_blank"
        className={classes.link}
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
      >
        <Box width={imageWidth} className={classes.thumbnailContainer}>
          <ImgixFancy
            paddingPercent={paddingPercent}
            lqipWidth={20}
            src={url}
            alt={alt}
            htmlAttributesProps={{
              style: {
                backgroundColor: theme.palette.common.white
              }
            }}
          />
        </Box>
        <ColumnBox textAlign="center" mt={1}>
          <Type variant="body2" className={classes.titleCaption}>
            {caption}
          </Type>
        </ColumnBox>
      </a>
    </Box>
  )
}

export default ImgixThumbLink
