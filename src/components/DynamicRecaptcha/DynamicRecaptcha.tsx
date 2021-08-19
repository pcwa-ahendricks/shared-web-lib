// ref property used in page for accessing methods such as reset() will not be available with Dynamic component unless forwardedRef is used.
// See https://github.com/zeit/next.js/issues/4957 and https://reactjs.org/docs/forwarding-refs.html for more info.
import React, {forwardRef} from 'react'
import dynamic from 'next/dynamic'
const DynamicRecaptcha = dynamic(import('./ForwardedRecaptcha'), {ssr: false})
const Recaptcha = forwardRef(function forwardRecaptcha(props, ref) {
  return <DynamicRecaptcha {...props} forwardedRef={ref} />
})

export default Recaptcha
