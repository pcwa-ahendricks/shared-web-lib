import React from 'react'
import {Typography as Type, TypographyProps} from '@mui/material'
// Font loading using @font-face seems to work with css modules but I don't see where that's documented online. See https://nextjs.org/docs/basic-features/built-in-css-support for more info.
import styles from './StrongEmphasis.module.css'

const StrongEmphasis = ({children, ...rest}: TypographyProps) => {
  return (
    <Type
      color="inherit"
      variant="inherit"
      className={styles.strongEm}
      {...rest}
    >
      <strong>
        <em>{children}</em>
      </strong>
    </Type>
  )
}

export default StrongEmphasis
