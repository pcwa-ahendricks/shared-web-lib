import React, {useState, useEffect} from 'react'

type Props = {
  waitBeforeShow: number
  children?: React.ReactNode
}

const Delayed = ({waitBeforeShow = 0, children}: Props) => {
  const [hidden, setHidden] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      setHidden(false)
    }, waitBeforeShow)
  })

  return hidden ? null : <React.Fragment>{children}</React.Fragment>
}

export default Delayed
