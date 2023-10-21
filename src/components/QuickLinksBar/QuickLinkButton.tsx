import {Fab, useMediaQuery, FabProps, SxProps, alpha} from '@mui/material'
import Link, {LinkProps} from '@components/Link'
import {blue as hl} from '@mui/material/colors'
import {ChildBox, ColumnBox} from '@components/MuiSleazebox'
import imgixLoader from '@lib/imageLoader'
import React, {useCallback, useMemo, useState} from 'react'
import Image, {ImageProps} from 'next/legacy/image'
import Overline from '@components/Overline/Overline'
import {Theme} from '@lib/material-theme'
import useTheme from '@hooks/useTheme'
import useLinkComponent from '@hooks/useLinkComponent'

export default function QuickLinkButton({
  href,
  imageAlt,
  imageSrc,
  caption,
  ...rest
}: {
  href: string
  caption: string
  imageAlt: ImageProps['alt']
  imageSrc: string
} & Partial<FabProps<any>>) {
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.only('sm'))
  const fabSize = isSm ? 70 : 90

  const FabImage = useCallback(() => {
    return (
      <Image
        loader={imgixLoader}
        width={fabSize}
        height={fabSize}
        alt={imageAlt}
        src={imageSrc}
      />
    )
  }, [fabSize, imageSrc, imageAlt])

  const btnCaptionVariant: LinkProps['variant'] = isSm ? 'subtitle2' : 'h6'
  const [overlineVisible, setOverlineVisible] = useState(false)

  const style = useMemo(
    () => ({
      fab: {
        zIndex: 1, // show AppBar and Mega Menu Popover above mega menu popper with box shadow, and above Mui <Fab/> (default z-index of 1050)
        height: fabSize,
        width: fabSize,
        borderWidth: 0,
        transition: 'box-shadow 400ms ease',
        // Conditional CSS Properties
        ...(overlineVisible && {
          borderColor: 'transparent' /* remove the border's color */,
          /* emulate the border */
          boxShadow: `0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12),
      0px 0px 4px 1px ${alpha(hl[400], 0.7)},0px 0px 7px 0px ${alpha(
        hl[400],
        0.5
      )},0px 0px 4px 0px ${alpha(hl[400], 0.6)}`
        })
      } as SxProps<Theme>
    }),
    [fabSize, overlineVisible]
  )

  const mouseLeaveHandler = useCallback(() => {
    setOverlineVisible(false)
  }, [])
  const mouseEnterHandler = useCallback(() => {
    setOverlineVisible(true)
  }, [])

  const LinkComponent = useLinkComponent()

  return (
    <ColumnBox child alignItems="center">
      <ChildBox
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
      >
        <Fab
          LinkComponent={LinkComponent}
          href={href}
          sx={{...style.fab}}
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
          <Link
            href={href}
            variant={btnCaptionVariant}
            color="primary"
            align="center"
            underline="none"
          >
            {caption}
          </Link>
        </Overline>
      </ChildBox>
    </ColumnBox>
  )
}
