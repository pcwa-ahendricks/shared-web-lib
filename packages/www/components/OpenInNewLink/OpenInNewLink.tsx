import React, {useState, useCallback, useMemo} from 'react'
import {Link, Fade} from '@material-ui/core'
import {LinkProps} from '@material-ui/core/Link'
import NativeListener from 'react-native-listener'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import {createStyles, makeStyles} from '@material-ui/core/styles'
import {ColumnBox, RowBox} from '@components/boxes/FlexBox'
import {IconProps} from '@material-ui/core/Icon'
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined'

type OpenInNewLinkProps = {
  children: React.ReactNode
  pdf?: boolean
  hoverText?: string
  transitionDuration?: number
  iconFontSize?: IconProps['fontSize']
} & LinkProps

const useStyles = makeStyles(() =>
  createStyles({
    link: {
      display: 'inline-flex'
    },
    icon: {
      paddingLeft: 5
    }
  })
)

// [TODO] Why does icon appear to move down a pixel or so after transitioning in? It does the same thing when applying styles/transition directly w/o the use of <Fade/>. It seems this may only happen in Safari; Chrome looks fine.

const OpenInNewLink = ({
  children,
  transitionDuration = 250,
  iconFontSize = 'default',
  pdf = false,
  href,
  ...rest
}: OpenInNewLinkProps) => {
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const classes = useStyles()

  // [HACK] Next <Link/> will block React's synthetic events, such as onMouseEnter and onMouseLeave. Use react-native-listener as a workaround for this behavior.
  const onMouseEnterHandler = useCallback(() => {
    setIsHovering(true)
  }, [])

  const onMouseLeaveHandler = useCallback(() => {
    setIsHovering(false)
  }, [])

  const linkIconEl = useMemo(
    () =>
      pdf ? (
        <DescriptionOutlinedIcon
          className={classes.icon}
          color="inherit"
          fontSize={iconFontSize}
        />
      ) : (
        <OpenInNewIcon
          className={classes.icon}
          color="inherit"
          fontSize={iconFontSize}
        />
      ),
    [pdf, classes, iconFontSize]
  )

  return (
    <NativeListener
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      <RowBox display="inline-flex" component="span">
        <Link
          className={classes.link}
          target="_blank"
          rel="noopener noreferrer"
          href={href}
          noWrap
          {...rest}
        >
          {children}
          <Fade in={isHovering} timeout={transitionDuration}>
            <ColumnBox component="span" justifyContent="center">
              {linkIconEl}
            </ColumnBox>
          </Fade>
        </Link>
      </RowBox>
    </NativeListener>
  )
}

export default OpenInNewLink
