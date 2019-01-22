// @flow
import React, {type Node} from 'react'
// import {withStyles} from '@material-ui/core/styles'
import {Button} from '@material-ui/core'

type Props = {
  // classes: any,
  children?: Node
}

// const styles = () => ({
//   root: {}
// })

const EspanolButton = ({children}: Props) => {
  return (
    <Button size="small" color="primary">
      {children}
    </Button>
  )
}

// EnewsButton.defaultProps = {}

// export default withStyles(styles)(EnewsButton)
export default EspanolButton
