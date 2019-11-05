import React, {useState, useCallback} from 'react'
import {Link, Fade} from '@material-ui/core'
import {LinkProps} from '@material-ui/core/Link'
import NativeListener from 'react-native-listener'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import {createStyles, makeStyles} from '@material-ui/core/styles'

export type LinkWithIconProps = {
  children: React.ReactNode
  hoverText?: string
  transitionDuration?: number
} & LinkProps

const useStyles = makeStyles(() =>
  createStyles({
    link: {
      display: 'inline'
    },
    icon: {
      paddingLeft: 5,
      transform: 'translateY(5px)'
    }
  })
)

// [TODO] Why does icon appear to move down a pixel or so after transitioning in? It does the same thing when applying styles/transition directly w/o the use of <Fade/>. It seems this may only happen in Safari; Chrome looks fine.

const OpenInNewLink = ({
  children,
  transitionDuration = 250,
  href,
  ...rest
}: LinkWithIconProps) => {
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const classes = useStyles()

  // [HACK] Next <Link/> will block React's synthetic events, such as onMouseEnter and onMouseLeave. Use react-native-listener as a workaround for this behavior.
  const onMouseEnterHandler = useCallback(() => {
    setIsHovering(true)
  }, [])

  const onMouseLeaveHandler = useCallback(() => {
    setIsHovering(false)
  }, [])

  return (
    <NativeListener
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
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
          <OpenInNewIcon className={classes.icon} color="inherit" />
        </Fade>
      </Link>
    </NativeListener>
  )
}

export default OpenInNewLink
