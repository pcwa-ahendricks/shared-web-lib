import React, {useState, useCallback, useMemo} from 'react'
import {Fade, SvgIconProps} from '@material-ui/core'
import NativeListener from 'react-native-listener'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import {createStyles, makeStyles} from '@material-ui/core/styles'
import {RowBox, ChildBox} from '@components/boxes/FlexBox'
import {IconProps} from '@material-ui/core/Icon'
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined'
import AltIcon from '@material-ui/icons/Language'
import FlexLink, {FlexLinkProps} from '@components/FlexLink/FlexLink'

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
} & FlexLinkProps

const useStyles = makeStyles(() =>
  createStyles({
    link: {
      display: 'inline-flex'
    },
    icon: ({
      startAdornment,
      iconPadding
    }: {
      startAdornment: boolean
      iconPadding: number
    }) => ({
      paddingLeft: startAdornment ? 0 : iconPadding,
      paddingRight: startAdornment ? iconPadding : 0
    })
  })
)

// [TODO] Why does icon appear to move down a pixel or so after transitioning in? It does the same thing when applying styles/transition directly w/o the use of <Fade/>. It seems this may only happen in Safari; Chrome looks fine.

const OpenInNewLink = ({
  children,
  transitionDuration = 250,
  iconFontSize = 'default',
  pdf = false,
  showIconAlways = false,
  startAdornment = false,
  iconPadding = 5,
  centerIcon = true,
  iconColor = 'inherit',
  altIcon = false,
  isNextLink = false,
  ...rest
}: OpenInNewLinkProps) => {
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const classes = useStyles({startAdornment, iconPadding})

  // [HACK] Next <Link/> will block React's synthetic events, such as onMouseEnter and onMouseLeave. Use react-native-listener as a workaround for this behavior.
  const onMouseEnterHandler = useCallback(() => {
    setIsHovering(true)
  }, [])

  const onMouseLeaveHandler = useCallback(() => {
    setIsHovering(false)
  }, [])

  const linkIconEl = useMemo(() => {
    const linkIconElProps = {
      className: classes.icon,
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
  }, [pdf, classes, iconFontSize, iconColor, altIcon])

  return (
    <NativeListener
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      <RowBox display="inline-flex" component="span">
        <FlexLink
          className={classes.link}
          noWrap
          isNextLink={isNextLink}
          {...rest}
        >
          <RowBox
            display="inline-flex"
            component="span"
            flexDirection={startAdornment ? 'row-reverse' : 'row'}
          >
            <ChildBox>{children}</ChildBox>
            <ChildBox
              display="flex"
              flexDirection="column"
              component="span"
              justifyContent={centerIcon ? 'center' : 'flex-start'}
            >
              <Fade
                in={isHovering || showIconAlways}
                timeout={transitionDuration}
              >
                {linkIconEl}
              </Fade>
            </ChildBox>
          </RowBox>
        </FlexLink>
      </RowBox>
    </NativeListener>
  )
}

export default OpenInNewLink
