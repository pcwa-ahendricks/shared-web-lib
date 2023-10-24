import React, {useState, useCallback, useMemo} from 'react'
import {Fade, SvgIconProps, IconProps} from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import AltIcon from '@mui/icons-material/Language'
import Link, {LinkProps} from '@components/Link'
import Span from '@components/boxes/Span'

export type OpenInNewLinkProps = {
  children?: React.ReactNode
  pdf?: boolean
  hoverText?: string
  transitionDuration?: number
  iconFontSize?: IconProps['fontSize']
  showIconAlways?: boolean
  startAdornment?: boolean
  iconPadding?: number | string
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
  iconPadding = '5px',
  centerIcon = true,
  iconColor = 'inherit',
  altIcon = false,
  sx,
  ...rest
}: OpenInNewLinkProps) => {
  const [isHovering, setIsHovering] = useState<boolean>(false)

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

  const LinkIcon = useCallback(() => {
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
    <Span
      display="inline-flex"
      flexDirection="row"
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      <Link sx={{...style.link, ...sx}} underline="hover" noWrap {...rest}>
        <Span
          display="inline-flex"
          flexDirection={startAdornment ? 'row-reverse' : 'row'}
        >
          <Span>{children}</Span>
          <Span
            flexDirection="column"
            flex="auto"
            justifyContent={centerIcon ? 'center' : 'flex-start'}
          >
            <Fade
              in={isHovering || showIconAlways}
              timeout={transitionDuration}
            >
              <span>
                <LinkIcon />
              </span>
            </Fade>
          </Span>
        </Span>
      </Link>
    </Span>
  )
}

export default OpenInNewLink
