import React from 'react'
import Hammer from 'react-hammerjs'

type Props = {
  children: React.ReactNode
}

const NoPinch = ({children}: Props) => (
  <Hammer
    onPinch={() => null}
    options={{
      recognizers: {
        pinch: {enable: true}
      }
    }}
  >
    {/* Using <div/> is important if you want to prevent runtime errors. */}
    <div>{children}</div>
  </Hammer>
)

export default NoPinch
