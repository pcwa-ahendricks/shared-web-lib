// @flow
import React, {useRef, type Node} from 'react'
import {Link, Typography as Type} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import classNames from 'classnames'
import Overline from '../../Overline/Overline'

type Props = {
  describedbyId: string,
  classes: any,
  onLinkClick: () => any,
  onLinkEnter: (any, any) => any,
  onLinkLeave: () => any,
  onBottomBunEnter: () => any,
  parentActiveEl: any,
  children: Node,
  tabIdx?: number
}

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%'
  },
  mmLink: {
    flex: '0 0 auto',
    color: theme.palette.primary.main,
    // fontFamily: 'Asap Condensed', // Should match MegaMenuLink.
    // fontSize: '1rem', // // Default: 0.875rem. Should match MegaMenuLink.
    fontWeight: 600, // Should match MegaMenuLink.
    cursor: 'pointer',
    '&:hover,&:focus,&.mmLinkActive': {
      color: theme.palette.primary.dark
    },
    margin: {
      left: '1vw', // Should match <Overline/> margin.
      right: '1vw' // ""
    }
  },
  mmLinkBun: {
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
      lineMargin="1vw" // This should match .mmLink margin
    >
      <div className={classes.root}>
        <div className={classes.mmLinkBun} />
        <Type
          ref={typeRef}
          className={classNames(classes.mmLink, {
            mmLinkActive: isActive
          })}
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
          className={classes.mmLinkBun}
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
