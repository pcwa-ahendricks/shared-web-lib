import React, {useState, useCallback, useMemo} from 'react'
import {Fade, SvgIconProps, IconProps} from '@mui/material'
import NativeListener from 'react-native-listener'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import {RowBox, ChildBox, ColumnBox} from '@components/MuiSleazebox'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import AltIcon from '@mui/icons-material/Language'
import Link, {LinkProps} from '@components/Link'

export type OpenInNewLinkProps = {
  children?: React.ReactNode
  pdf?: boolean
  hoverText?: string
  transitionDuration?: number
  iconFontSize?: IconProps['fontSize']
  showIconAlways?: boolean
  startAdornment?: boolean
  iconPadding?: number
  centerIcon?: boolean
  iconColor?: SvgIconProps['color']
  altIcon?: boolean
} & LinkProps

// [TODO] Why does icon appear to move down a pixel or so after transitioning in? It does the same thing when applying styles/transition directly w/o the use of <Fade/>. It seems this may only happen in Safari; Chrome looks fine.

const OpenInNewLink = ({
  children,
  transitionDuration = 250,
  iconFontSize = 'medium',
  pdf = false,
  showIconAlways = false,
  startAdornment = false,
  iconPadding = 5,
  centerIcon = true,
  iconColor = 'inherit',
  altIcon = false,
  sx,
  ...rest
}: OpenInNewLinkProps) => {
  const [isHovering, setIsHovering] = useState<boolean>(false)

  // [HACK] Next <Link/> will block React's synthetic events, such as onMouseEnter and onMouseLeave. Use react-native-listener as a workaround for this behavior.
  const onMouseEnterHandler = useCallback(() => {
    setIsHovering(true)
  }, [])

  const onMouseLeaveHandler = useCallback(() => {
    setIsHovering(false)
  }, [])

  const style = useMemo(
    () => ({
      link: {
        display: 'inline-flex'
      },
      icon: {
        paddingLeft: startAdornment ? 0 : iconPadding,
        paddingRight: startAdornment ? iconPadding : 0
      }
    }),
    [startAdornment, iconPadding]
  )

  const linkIconEl = useMemo(() => {
    const linkIconElProps = {
      sx: {
        ...style.icon
      },
      color: iconColor,
      fontSize: iconFontSize
    }
    return pdf ? (
      <DescriptionOutlinedIcon {...linkIconElProps} />
    ) : altIcon ? (
      <AltIcon {...linkIconElProps} />
    ) : (
      <OpenInNewIcon {...linkIconElProps} />
    )
  }, [pdf, iconFontSize, iconColor, altIcon, style])

  return (
    <NativeListener
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      <RowBox display="inline-flex" component="span">
        <Link sx={{...style.link, ...sx}} underline="hover" noWrap {...rest}>
          <RowBox
            display="inline-flex"
            component="span"
            flexDirection={startAdornment ? 'row-reverse' : 'row'}
          >
            <ChildBox>{children}</ChildBox>
            <ColumnBox
              child
              component="span"
              justifyContent={centerIcon ? 'center' : 'flex-start'}
            >
              <Fade
                in={isHovering || showIconAlways}
                timeout={transitionDuration}
              >
                {linkIconEl}
              </Fade>
            </ColumnBox>
          </RowBox>
        </Link>
      </RowBox>
    </NativeListener>
  )
}

export default OpenInNewLink
