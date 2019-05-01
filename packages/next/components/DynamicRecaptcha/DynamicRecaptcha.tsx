// ref property used in page for accessing methods such as reset() will not be available with Dynamic component unless forwardedRef is used.
// See https://github.com/zeit/next.js/issues/4957 and https://reactjs.org/docs/forwarding-refs.html for more info.
import React, {forwardRef} from 'react'
import dynamic from 'next/dynamic'
const DynamicRecaptcha = dynamic(import('./ForwardedRecaptcha'), {ssr: false})
const Recaptcha = forwardRef((props, ref) => (
  <DynamicRecaptcha {...props} forwardedRef={ref} />
))
// Give this component a more helpful display name in DevTools.
// e.g. "ForwardRef(DisplayName(MyComponent))"
Recaptcha.displayName = 'Recaptcha'

export default Recaptcha
