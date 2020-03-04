import React from 'react'
import Link, {LinkProps} from '@material-ui/core/Link'

const GisDeptEmail = ({...rest}: LinkProps) => {
  return (
    <Link href="mailto:gis-dept@pcwa.net" {...rest}>
      gis-dept@pcwa.net
    </Link>
  )
}

export default GisDeptEmail
