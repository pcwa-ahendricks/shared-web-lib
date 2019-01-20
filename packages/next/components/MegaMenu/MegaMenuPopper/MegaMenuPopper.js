// @flow
import React, {useState, useRef, useEffect, type Node} from 'react'
import {Popper, Fade as Collapse} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import useDebounce from '../../../hooks/useDebounce'
import {type ToolbarVariant} from '../../PrimaryHeader/PrimaryHeader'

const POPOVER_TRAN_EXIT_DURATION = 150

type Props = {
  id?: string,
  open: boolean,
  children: Node,
  onOpen: () => any,
  onClose: () => any,
  onTransitionChange?: (active: boolean) => any,
  anchorEl: any,
  classes: any,
  toolbarVariant: ToolbarVariant
}

const styles = (theme) => ({
  popper: {
    zIndex: 1,
    '& $arrow': {
      top: 0,
      left: 0,
      marginTop: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${
          theme.palette.primary.dark
        } transparent`
      }
    }
  },
  arrow: {
    position: 'absolute',
    fontSize: 7,
    width: '3em',
    height: '3em',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
      transform: 'translate3d(-50%, 0, 0)', // Keep arrow centered.
      '-webkit-transform': 'translate3d(-50%, 0 ,0)'
    }
  }
})

const MegaMenuPopper = ({
  open,
  children,
  classes,
  anchorEl,
  toolbarVariant,
  onOpen,
  onClose,
  onTransitionChange,
  id
}: Props) => {
  const arrowRef = useRef(null)
  const [popperTransActive, setPopperTransActive] = useState(false)
  const debouncedPopperTransActive = useDebounce(
    popperTransActive,
    POPOVER_TRAN_EXIT_DURATION
  )

  useEffect(() => {
    onTransitionChange && onTransitionChange(debouncedPopperTransActive)
  }, [debouncedPopperTransActive])
  const transitionExitHandler = () => {
    setPopperTransActive(true)
  }

  const transitionEnterHandler = () => {
    setPopperTransActive(false)
  }

  return (
    <React.Fragment>
      <Popper
        id={id}
        className={classes.popper}
        open={open}
        anchorEl={anchorEl}
        transition
        modifiers={{
          // flip: {
          //   enabled: true
          // },
          offset: {
            enabled: true,
            offset: `${toolbarVariant === 'dense' ? '0, 10' : '0, 14'}`
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: 'window',
            padding: 0
          }
        }}
      >
        {({TransitionProps}) => (
          <Collapse
            {...TransitionProps}
            timeout={{enter: 100, exit: POPOVER_TRAN_EXIT_DURATION}}
            onExit={transitionExitHandler}
            onEntered={transitionEnterHandler}
          >
            <div
              onMouseLeave={onClose}
              onBlur={onClose}
              onMouseEnter={onOpen}
              onFocus={onOpen}
            >
              {children}
            </div>
          </Collapse>
        )}
      </Popper>
      <Popper
        id={id}
        open={open && toolbarVariant === 'regular'}
        className={classes.popper}
        transition
        anchorEl={anchorEl}
        modifiers={{
          // flip: {
          //   enabled: true
          // },
          offset: {
            enabled: true,
            offset: `${toolbarVariant === 'dense' ? '0, 10' : '0, 14'}`
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: 'window',
            padding: 0
          },
          arrow: {
            enabled: arrowRef.current, // Check prevents popper.js console.log() msg.
            element: arrowRef.current
          }
        }}
      >
        {({TransitionProps}) => (
          <Collapse
            {...TransitionProps}
            timeout={{enter: 100, exit: POPOVER_TRAN_EXIT_DURATION}}
          >
            <span
              className={classes.arrow}
              ref={arrowRef}
              onMouseLeave={onClose}
              onBlur={onClose}
              onMouseEnter={onOpen}
              onFocus={onOpen}
            />
          </Collapse>
        )}
      </Popper>
    </React.Fragment>
  )
}

MegaMenuPopper.defaultProps = {
  open: false
}

export default withStyles(styles)(MegaMenuPopper)
