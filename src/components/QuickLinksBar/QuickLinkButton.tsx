import {
  Fab,
  makeStyles,
  useTheme,
  useMediaQuery,
  FabProps,
  Link as MatLink,
  LinkProps as MatLinkProps
} from '@material-ui/core'
import {blue as hl} from '@material-ui/core/colors'
import {ChildBox, ColumnBox} from 'mui-sleazebox'
import imgixLoader from '@lib/imageLoader'
import React, {useCallback, useState} from 'react'
import Image, {ImageProps} from 'next/image'
import Link from 'next/link'
import Overline from '@components/Overline/Overline'
import alpha from 'color-alpha'

const useStyles = makeStyles({
  fabRoot: ({
    width,
    height,
    highlight
  }: {
    width: number
    height: number
    highlight: boolean
  }) => ({
    height,
    width,
    borderWidth: 0,
    transition: 'box-shadow 400ms ease',
    // Conditional CSS Properties
    ...(highlight && {
      borderColor: 'transparent' /* remove the border's colour */,
      /* emulate the border */
      boxShadow: `0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12),
      0px 0px 4px 1px ${alpha(hl[400], 0.7)},0px 0px 7px 0px ${alpha(
        hl[400],
        0.5
      )},0px 0px 4px 0px ${alpha(hl[400], 0.6)}`
    })
  })
})

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
  const wh = isSm ? 70 : 90

  const FabImage = useCallback(() => {
    return (
      <Image
        loader={imgixLoader}
        width={wh}
        height={wh}
        alt={imageAlt}
        src={imageSrc}
      />
    )
  }, [wh, imageSrc, imageAlt])

  const btnCaptionVariant: MatLinkProps['variant'] = isSm ? 'subtitle2' : 'h6'
  const [overlineVisible, setOverlineVisible] = useState(false)
  const classes = useStyles({height: wh, width: wh, highlight: overlineVisible})

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
