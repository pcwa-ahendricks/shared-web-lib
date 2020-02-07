import React from 'react'
import {Paper, Theme, Tooltip} from '@material-ui/core'
import TrendingLink from '../TrendingLink/TrendingLink'
import {TrendingUp} from '@material-ui/icons'
import {makeStyles, createStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      flexGrow: 1,
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: theme.palette.primary.main,
      height: theme.spacing(6), // 48px (dense <Toolbar/>)
      boxSizing: 'border-box',
      padding: theme.spacing(1),
      color: theme.palette.grey[300]
    }
  })
)
const TrendingBar = () => {
  const classes = useStyles()
  return (
    <Paper square className={classes.root}>
      <Tooltip title="Trending Links" placement="top">
        <TrendingUp fontSize="small" />
      </Tooltip>
      <TrendingLink href="/smart-water-use">Smart Water Use</TrendingLink>
      <TrendingLink href="/services">Customer Service</TrendingLink>
      <TrendingLink href="/smart-water-use/rebate-programs">
        Rebates
      </TrendingLink>
      <TrendingLink href="/services/outage">Outages</TrendingLink>
      <TrendingLink isNextLink={false} href="https://careers.pcwa.net/">
        Careers
      </TrendingLink>
      {/* <TrendingLink href="...">Recruitment Video</TrendingLink> */}
    </Paper>
  )
}

export default TrendingBar
