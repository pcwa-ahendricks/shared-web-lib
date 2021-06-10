import {
  Fab,
  makeStyles,
  useTheme,
  useMediaQuery,
  FabProps,
  Link as MatLink,
  LinkProps as MatLinkProps
} from '@material-ui/core'
import {blue} from '@material-ui/core/colors'
import {ChildBox, ColumnBox} from 'mui-sleazebox'
import imgixLoader from '@lib/imageLoader'
import React, {useCallback, useState} from 'react'
import Image, {ImageProps} from 'next/image'
import Link from 'next/link'
import Overline from '@components/Overline/Overline'

export default function QuickLinkButton({
  href,
  imageAlt,
  imageSrc,
  caption,
  target,
  isNextLink = true,
  ...rest
}: {
  href: string
  isNextLink?: boolean
  caption: string
  imageAlt: ImageProps['alt']
  imageSrc: ImageProps['src']
} & Partial<FabProps<'a'>>) {
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.only('sm'))
  const height = isSm ? 70 : 90
  const width = isSm ? 70 : 90

  const useStyles = makeStyles({
    fabRoot: ({width, height}: {width: number; height: number}) => ({
      height,
      width,
      '&:hover': {
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: blue[300]
      }
    })
  })
  const FabImage = useCallback(() => {
    return (
      <Image
        loader={imgixLoader}
        width={width}
        height={height}
        alt={imageAlt}
        src={imageSrc}
      />
    )
  }, [height, width, imageSrc, imageAlt])

  const classes = useStyles({height, width})
  const btnCaptionVariant: MatLinkProps['variant'] = isSm ? 'subtitle2' : 'h6'
  const [overlineVisible, setOverlineVisible] = useState(false)

  const mouseLeaveHandler = useCallback(() => {
    setOverlineVisible(false)
  }, [])
  const mouseEnterHandler = useCallback(() => {
    setOverlineVisible(true)
  }, [])

  if (isNextLink) {
    return (
      <ColumnBox child alignItems="center">
        <ChildBox
          onMouseEnter={mouseEnterHandler}
          onMouseLeave={mouseLeaveHandler}
        >
          <Link href={href} passHref>
            <Fab href={href} classes={{root: classes.fabRoot}} {...rest}>
              <FabImage />
            </Fab>
          </Link>
        </ChildBox>
        <ChildBox
          mt={1}
          onMouseEnter={mouseEnterHandler}
          onMouseLeave={mouseLeaveHandler}
        >
          <Overline
            color={theme.palette.primary.main}
            underline
            visible={overlineVisible}
          >
            <Link href={href} passHref>
              <MatLink
                variant={btnCaptionVariant}
                color="primary"
                align="center"
                underline="none"
              >
                {caption}
              </MatLink>
            </Link>
          </Overline>
        </ChildBox>
      </ColumnBox>
    )
  }

  return (
    <ColumnBox child alignItems="center">
      <ChildBox
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
      >
        <Fab
          href={href}
          target={target}
          classes={{root: classes.fabRoot}}
          {...rest}
        >
          <FabImage />
        </Fab>
      </ChildBox>
      <ChildBox
        mt={1}
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
      >
        <Overline
          color={theme.palette.primary.main}
          underline
          visible={overlineVisible}
        >
          <MatLink
            variant={btnCaptionVariant}
            color="primary"
            align="center"
            href={href}
            target={target}
            underline="none"
          >
            {caption}
          </MatLink>
        </Overline>
      </ChildBox>
    </ColumnBox>
  )
}
