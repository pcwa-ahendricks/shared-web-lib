import React, {useState, useCallback, useMemo} from 'react'
import {Fade, SvgIconProps, IconProps, Box} from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
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
    <Box
      display="inline-flex"
      flexDirection="row"
      component="span"
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      <Link sx={{...style.link, ...sx}} underline="hover" noWrap {...rest}>
        <Box
          display="inline-flex"
          component="span"
          flexDirection={startAdornment ? 'row-reverse' : 'row'}
        >
          <Box>{children}</Box>
          <Box
            flexDirection="column"
            flex="auto"
            component="span"
            justifyContent={centerIcon ? 'center' : 'flex-start'}
          >
            <Fade
              in={isHovering || showIconAlways}
              timeout={transitionDuration}
            >
              <Box>
                <LinkIcon />
              </Box>
            </Fade>
          </Box>
        </Box>
      </Link>
    </Box>
  )
}

export default OpenInNewLink
