import React, {useRef, useCallback} from 'react'
import {Link, Typography as Type, RootRef} from '@material-ui/core'
import {withStyles, createStyles, Theme} from '@material-ui/core/styles'
import clsx from 'clsx'
import Overline from '@components/Overline/Overline'

type Props = {
  classes: any
  typographyClass?: any
  onLinkClick: () => any
  onLinkEnter: (e: any, target: any) => any
  onLinkLeave: () => any
  onBottomBunEnter: () => any
  children: React.ReactNode
  tabIdx?: number
  linkMargin?: string | number
  describedbyId?: string
  parentActiveEl?: any
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%'
    },
    typography: {
      flex: '0 0 auto',
      color: theme.palette.primary.main,
      cursor: 'pointer',
      '&:hover,&:focus,&.linkActive': {
        color: theme.palette.primary.dark
      }
    },
    linkBun: {
      flex: '1 0 auto'
    }
  })

const MegaMenuLink = ({
  classes,
  children,
  describedbyId,
  onLinkClick,
  onLinkEnter,
  onLinkLeave,
  onBottomBunEnter,
  parentActiveEl,
  tabIdx,
  typographyClass,
  linkMargin,
  ...rest
}: Props) => {
  const typeRef = useRef()
  // Prevent null === null validity, resulting with a flash of Overline during initial page load.
  const isActive = Boolean(
    parentActiveEl === typeRef.current && parentActiveEl !== null
  )

  const handleLinkEnter = useCallback(
    (evt) => {
      onLinkEnter(evt, typeRef.current)
    },
    [onLinkEnter, typeRef]
  )

  return (
    <Overline
      useFullHeight
      visible={isActive}
      transitionDuration="200ms"
      lineMargin={linkMargin}
    >
      <div className={classes.root}>
        <div className={classes.linkBun} />
        <RootRef rootRef={typeRef}>
          <Type
            className={clsx(classes.typography, typographyClass, {
              linkActive: isActive
            })}
            // Use padding over margin to prevent mega menu popover from closing when cursor moves between links. Should likely match <Overline/> margin.
            style={{paddingLeft: linkMargin, paddingRight: linkMargin}}
            aria-describedby={describedbyId}
            onClick={onLinkClick}
            onBlur={onLinkLeave}
            onMouseLeave={onLinkLeave}
            onFocus={handleLinkEnter}
            onMouseEnter={handleLinkEnter}
            variant="button"
            tabIndex={tabIdx}
          >
            <Link underline="none" href="#" color="inherit" {...rest}>
              {children}
            </Link>
          </Type>
        </RootRef>
        <div
          className={classes.linkBun}
          onMouseEnter={onBottomBunEnter}
          onFocus={onBottomBunEnter}
          onMouseLeave={onLinkLeave}
          onBlur={onLinkLeave}
        />
      </div>
    </Overline>
  )
}

export default withStyles(styles)(MegaMenuLink)
