// @flow
// $FlowFixMe
import React, {useRef, type Node} from 'react'
import {Link, Typography as Type} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import classNames from 'classnames'
import Overline from '../../Overline/Overline'

type Props = {
  describedbyId: string,
  classes: any,
  typographyClass?: any,
  onLinkClick: () => any,
  onLinkEnter: (any, any) => any,
  onLinkLeave: () => any,
  onBottomBunEnter: () => any,
  parentActiveEl: any,
  children: Node,
  tabIdx?: number,
  linkMargin?: string | number
}

const styles = (theme) => ({
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
  const typeRef = useRef(null)
  // Prevent null === null validity, resulting with a flash of Overline during initial page load.
  const isActive = Boolean(
    parentActiveEl === typeRef.current && parentActiveEl !== null
  )

  const handleLinkEnter = (evt) => {
    onLinkEnter(evt, typeRef.current)
  }

  return (
    <Overline
      useFullHeight
      visible={isActive}
      transitionDuration={200}
      lineMargin={linkMargin}
    >
      <div className={classes.root}>
        <div className={classes.linkBun} />
        <Type
          ref={typeRef}
          className={classNames(classes.typography, typographyClass, {
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

MegaMenuLink.defaultProps = {
  describedbyId: null,
  onLinkClick: () => null,
  onLinkEnter: () => null,
  onLinkLeave: () => null,
  onBottomBunEnter: () => null,
  parentActiveEl: null
}

export default withStyles(styles)(MegaMenuLink)
