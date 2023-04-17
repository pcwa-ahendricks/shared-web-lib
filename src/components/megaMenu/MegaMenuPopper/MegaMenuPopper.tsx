import React, {useState, useEffect, useCallback} from 'react'
import {Popper, Fade as Collapse, PopperProps} from '@mui/material'
import {useDebounce} from 'use-debounce'
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
  const [popperTransActive, setPopperTransActive] = useState(false)
  const [debouncedPopperTransActive] = useDebounce(
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

  const style = {
    popper: {
      zIndex: 3 // Mapbox attribution is 2 so this should be higher than that.
    }
  }
  return (
    <>
      <Popper
        // Logical Or for type checking only.
        id={id ?? undefined}
        sx={{
          ...style.popper
        }}
        open={open && hasAnchorEl}
        anchorEl={anchorEl}
        transition
        modifiers={[
          // TODO - make an arrow
          // {
          //   name: 'arrow',
          //   options: {
          //     element: arrow
          //   }
          // },
          {
            name: 'offset',
            options: {
              offset: [0, toolbarVariant === 'dense' ? 10 : 17]
            }
          },
          {
            name: 'preventOverflow',
            options: {
              // boundariesElement: 'window', // Not sure if this is necessary, commented out during Mui v5 upgrade due to lack of documentation. It might be a deprecated Popper.js v1 option.
              padding: 0
            }
          }
        ]}
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
              {/* <Box data-popper-arrow sx={{...style.arrow}} /> */}
              {children}
            </div>
          </Collapse>
        )}
      </Popper>
    </>
  )
}

export default MegaMenuPopper
