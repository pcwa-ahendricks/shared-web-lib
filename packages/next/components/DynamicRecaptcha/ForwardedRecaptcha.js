// @flow
import React from 'react'
import Recaptcha from 'react-google-recaptcha'

const LoadedDynamicallyRecaptcha = ({forwardedRef, ...props}: any) => (
  <Recaptcha ref={forwardedRef} {...props} />
)

export default LoadedDynamicallyRecaptcha
