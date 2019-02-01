// @flow
import React from 'react'
import {Paper, Tooltip} from '@material-ui/core'
import TrendingLink from '../TrendingLink/TrendingLink'
import {TrendingUp} from '@material-ui/icons'
import {withStyles} from '@material-ui/core/styles'

type Props = {
  classes: any
}

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    height: theme.spacing.unit * 6, // 48px (dense <Toolbar/>)
    boxSizing: 'border-box',
    padding: theme.spacing.unit * 1,
    color: theme.palette.grey[300]
  }
})

const TrendingBar = ({classes}: Props) => {
  return (
    <Paper square className={classes.root}>
      <Tooltip title="Trending Links" placement="top">
        <TrendingUp fontSize="small" />
      </Tooltip>
      <TrendingLink href="#">Smart Water Use</TrendingLink>
      <TrendingLink href="/services/irrigation-canal">
        Customer Service
      </TrendingLink>
      <TrendingLink href="#">Rebates</TrendingLink>
      <TrendingLink href="#">Outages</TrendingLink>
      <TrendingLink href="#">Careers</TrendingLink>
      <TrendingLink href="#">Recruitment Video</TrendingLink>
    </Paper>
  )
}

export default withStyles(styles)(TrendingBar)
