import React, {useState, useRef, useEffect, useCallback} from 'react'
import {Popper, Fade as Collapse, Theme} from '@material-ui/core'
import {PopperProps} from '@material-ui/core/Popper'
import {makeStyles, createStyles} from '@material-ui/styles'
import useDebounce from '@hooks/useDebounce'
import {ToolbarVariant} from '@components/PrimaryHeader/PrimaryHeader'

const POPOVER_TRAN_EXIT_DURATION = 150

type Props = {
  id?: string
  open?: boolean
  children: React.ReactNode
  onOpen: () => any
  onClose: () => any
  onTransitionChange?: (active: boolean) => any
  toolbarVariant: ToolbarVariant
  anchorEl: PopperProps['anchorEl']
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
          // borderColor: `transparent transparent ${theme.palette.primary.dark} transparent` // Dark Background
          borderColor: `transparent transparent ${theme.palette.grey['300']} transparent` // Light Background
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
)

const MegaMenuPopper = ({
  children,
  anchorEl,
  toolbarVariant,
  onOpen,
  onClose,
  onTransitionChange,
  id,
  open = false
}: Props) => {
  const classes = useStyles()
  const arrowRef = useRef(null)
  const [popperTransActive, setPopperTransActive] = useState(false)
  const debouncedPopperTransActive = useDebounce(
    popperTransActive,
    POPOVER_TRAN_EXIT_DURATION
  )

  useEffect(() => {
    onTransitionChange && onTransitionChange(debouncedPopperTransActive)
  }, [debouncedPopperTransActive, onTransitionChange])

  const transitionExitHandler = useCallback(() => {
    setPopperTransActive(true)
  }, [])

  const transitionEnterHandler = useCallback(() => {
    setPopperTransActive(false)
  }, [])

  const hasAnchorEl = Boolean(anchorEl)
  return (
    <React.Fragment>
      <Popper
        // Logical Or for type checking only.
        id={id || undefined}
        className={classes.popper}
        open={open && hasAnchorEl}
        anchorEl={anchorEl}
        transition
        modifiers={{
          // flip: {
          //   enabled: true
          // },
          offset: {
            enabled: true,
            offset: `${toolbarVariant === 'dense' ? '0, 10' : '0, 17'}`
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
            timeout={{enter: 150, exit: POPOVER_TRAN_EXIT_DURATION}}
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
        // Logical Or for type checking only.
        id={id || undefined}
        open={open && toolbarVariant === 'regular' && hasAnchorEl}
        className={classes.popper}
        transition
        anchorEl={anchorEl}
        modifiers={{
          // flip: {
          //   enabled: true
          // },
          offset: {
            enabled: true,
            offset: `${toolbarVariant === 'dense' ? '0, 10' : '0, 18'}`
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: 'window',
            padding: 0
          },
          arrow: {
            enabled: arrowRef.current,
            element: arrowRef.current
          }
        }}
      >
        {({TransitionProps}) => (
          <Collapse
            {...TransitionProps}
            timeout={{enter: 300, exit: POPOVER_TRAN_EXIT_DURATION}}
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

export default MegaMenuPopper
