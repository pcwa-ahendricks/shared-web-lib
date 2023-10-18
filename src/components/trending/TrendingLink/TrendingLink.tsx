import {ButtonProps, Button} from '@mui/material'
import React from 'react'

/*
NOTE - If this is used again, it will need to be updated and modeled after QuickLinkButton and/or MMNavLink since it used to use <FlexButton/>, which has been deleted.
*/

type Props = {
  children: React.ReactNode
  href: string
} & ButtonProps

const TrendingLink = ({children, sx, ...rest}: Props) => {
  return (
    <Button
      size="small"
      color="inherit"
      sx={{
        ...sx,
        // Responsive font size for links. Small size defaults to 0.8125rem.
        '@media screen and (max-width: 700px)': {
          fontSize: '0.70rem'
        },
        '& .MuiButton-text': {
          whiteSpace: 'nowrap'
        }
      }}
      {...rest}
    >
      {children}
    </Button>
  )
}

export default TrendingLink
