import React from 'react'
import FlexButton, {FlexButtonProps} from '@components/FlexButton/FlexButton'

type Props = {
  children: React.ReactNode
  href: string
} & FlexButtonProps

const TrendingLink = ({children, sx, ...rest}: Props) => {
  return (
    <FlexButton
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
    </FlexButton>
  )
}

export default TrendingLink
