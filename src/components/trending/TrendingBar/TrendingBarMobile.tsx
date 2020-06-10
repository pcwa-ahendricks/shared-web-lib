import React, {useCallback} from 'react'
import {makeStyles, createStyles, Typography as Type} from '@material-ui/core'
import {ColumnBox} from '@components/boxes/FlexBox'
import FlexButton, {FlexButtonProps} from '@components/FlexButton/FlexButton'

const useStyles = makeStyles(() =>
  createStyles({
    root: {}
  })
)
const TrendingBarMobile = () => {
  const classes = useStyles()
  const TrendingLink = useCallback(({children, ...props}: FlexButtonProps) => {
    return (
      <FlexButton size="small" {...props}>
        {children}
      </FlexButton>
    )
  }, [])

  return (
    <ColumnBox className={classes.root}>
      <Type variant="h6">Trending</Type>
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
    </ColumnBox>
  )
}

export default TrendingBarMobile
