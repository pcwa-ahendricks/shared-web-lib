import React from 'react'
import {Paper, Tooltip} from '@mui/material'
import TrendingLink from '../TrendingLink/TrendingLink'
import {TrendingUp} from '@mui/icons-material'
import useTheme from '@hooks/useTheme'

const TrendingBar = () => {
  const theme = useTheme()
  return (
    <Paper
      square
      sx={{
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
      }}
    >
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
