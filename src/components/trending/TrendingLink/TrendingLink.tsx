import React from 'react'
import makeStyles from '@mui/styles/makeStyles'
import FlexButton, {FlexButtonProps} from '@components/FlexButton/FlexButton'

type Props = {
  children: React.ReactNode
  href: string
} & FlexButtonProps

const useStyles = makeStyles({
  root: {},
  // Responsive font size for links. Small size defaults to 0.8125rem.
  '@media screen and (max-width: 700px)': {
    root: {
      fontSize: '0.70rem'
    }
  },
  label: {
    whiteSpace: 'nowrap'
  }
})

const TrendingLink = ({children, ...rest}: Props) => {
  const classes = useStyles()

  return (
    <FlexButton
      size="small"
      color="inherit"
      className={classes.root}
      classes={{label: classes.label}}
      {...rest}
    >
      {children}
    </FlexButton>
  )
}

export default TrendingLink
