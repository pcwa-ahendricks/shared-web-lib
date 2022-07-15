import React, {useState, useCallback, useEffect} from 'react'
import {
  Box,
  BoxProps,
  makeStyles,
  createStyles,
  useTheme
} from '@material-ui/core'
import {FlexBox} from 'mui-sleazebox'
import SearchRoundedIcon from '@material-ui/icons/SearchRounded'
import JackinBox from 'mui-jackinbox'
import {imgixUrlLoader} from '@lib/imageLoader'
import ImageBlur, {ImageBlurProps} from '@components/imageBlur/ImageBlur'

type Props = {
  boxProps?: BoxProps
  isHover?: boolean
  src: string
} & Partial<Omit<ImageBlurProps, 'placeholder' | 'blurDataURL' | 'src'>>

interface UseStylesProps {
  isHover?: boolean
}

const useStyles = makeStyles(() =>
  createStyles({
    clickableImg: ({isHover}: UseStylesProps) => ({
      cursor: 'pointer',
      // boxShadow 2 -> 5
      boxShadow: isHover
        ? 'rgba(0, 0, 0, 0.2) 0px 3px 5px -1px, rgba(0, 0, 0, 0.14) 0px 5px 8px 0px, rgba(0, 0, 0, 0.12) 0px 1px 14px 0px'
        : 'rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px',
      transition: 'box-shadow 200ms ease-in'
      // borderStyle: 'solid',
      // borderWidth: isHover ? 1 : 0,
      // borderColor: !isHover
      //   ? 'rgba(180, 191, 205, 0.0)'
      //   : 'rgba(180, 191, 205, 0.7)'
    }),
    img: ({isHover}: UseStylesProps) => ({
      transition: 'transform 150ms ease 0s',
      transform: isHover ? 'scale3d(1.1, 1.1, 1.1)' : 'scale3d(1, 1, 1)'
    }),
    dimmer: ({isHover}: UseStylesProps) => ({
      opacity: isHover ? 0.3 : 0,
      transition: 'opacity 150ms ease-in 0s'
    })
  })
)

const ImageFancier = ({
  width = 0,
  height = 0,
  src = '',
  alt,
  boxProps,
  isHover: isHoverProp,
  ...rest
}: Props) => {
  const [isHover, setIsHover] = useState<boolean>() // For animation to work properly this must be initialized as undefined

  useEffect(() => {
    setIsHover(isHoverProp)
  }, [isHoverProp])

  const classes = useStyles({isHover: isHover})
  const theme = useTheme()

  const mouseEnterHandler = useCallback(() => {
    // Use of isHoverProp is exclusive
    if (isHoverProp === undefined) {
      setIsHover(true)
    }
  }, [isHoverProp])

  const mouseLeaveHandler = useCallback(() => {
    // Use of isHoverProp is exclusive
    if (isHoverProp === undefined) {
      setIsHover(false)
    }
  }, [isHoverProp])

  return (
    <Box
      width={width}
      height={height}
      className={classes.clickableImg}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      boxShadow={2}
      position="relative"
      {...boxProps}
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        bgcolor={theme.palette.common.black}
        width="100%"
        height="100%"
        zIndex={3}
        className={classes.dimmer}
      />
      <FlexBox
        justifyContent="center"
        alignItems="center"
        position="absolute"
        color={theme.palette.grey['300']}
        top={0}
        left={0}
        width="100%"
        height="100%"
        zIndex={3}
      >
        <JackinBox
          name={isHover ? 'fadeIn' : 'fadeOut'}
          hideUntilAnimate
          animate={isHover !== undefined}
          speed="fast"
        >
          <SearchRoundedIcon fontSize="large" color="inherit" />
        </JackinBox>
      </FlexBox>
      <ImageBlur
        alt={alt}
        src={src}
        loader={imgixUrlLoader}
        layout="responsive"
        height={height}
        width={width}
        className={classes.img}
        {...rest}
      />
    </Box>
  )
}

export default ImageFancier
export type {Props as ImageFancierProps}
