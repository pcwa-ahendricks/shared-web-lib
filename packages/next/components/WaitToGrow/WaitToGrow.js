// @flow
import React, {useState, useCallback, useMemo, type Node} from 'react'
import {Grow} from '@material-ui/core'

type Props = {
  isIn: boolean,
  children: Node
}

const WaitToGrow = ({isIn, children}: Props) => {
  const [show, setShow] = useState<boolean>(false)
  const enteringTransHandler = useCallback(() => {
    setShow(true)
  }, [])

  const exitedTransHandler = useCallback(() => {
    setShow(false)
  }, [])

  const waitToGrowEl = useMemo(
    () =>
      show || isIn ? (
        <div>
          <Grow
            in={isIn}
            onEntering={enteringTransHandler}
            onExited={exitedTransHandler}
          >
            {children}
          </Grow>
        </div>
      ) : null,
    [show, isIn, enteringTransHandler, exitedTransHandler, children]
  )

  return <React.Fragment>{waitToGrowEl}</React.Fragment>
}

export default WaitToGrow
