import React, {useCallback} from 'react'
import {
  makeStyles,
  createStyles,
  // Typography as Type,
  List,
  ListItem,
  ListItemProps,
  ListItemText,
  Theme,
  ListSubheader,
  Box
} from '@material-ui/core'
import NextLink, {LinkProps as NextLinkProps} from 'next/link'
// import FlexLink, {FlexLinkProps} from '@components/FlexLink/FlexLink'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    subheader: {
      fontStyle: 'italic',
      color: theme.palette.text.secondary
    },
    type: {
      color: theme.palette.text.secondary
    }
  })
)
const TrendingBarMobile = () => {
  const classes = useStyles()
  const TrendingLink = useCallback(
    ({title, ...props}: ListItemProps<'a', {button?: true}>) => {
      return (
        <ListItem button component="a" {...props}>
          <ListItemText primary={title} classes={{primary: classes.type}} />
        </ListItem>
      )
    },
    [classes]
  )

  const TrendingNextLink = useCallback(
    ({
      title,
      href,
      as,
      ...props
    }: NextLinkProps & ListItemProps<'a', {button?: true}>) => {
      return (
        <NextLink href={href} as={as}>
          <ListItem button component="a" {...props}>
            <ListItemText primary={title} classes={{primary: classes.type}} />
          </ListItem>
        </NextLink>
      )
    },
    [classes]
  )

  return (
    <Box pt={2}>
      <List dense>
        <ListSubheader classes={{root: classes.subheader}}>
          Trending Pages
        </ListSubheader>
        {/* <Type variant="h6" color="textSecondary"></Type> */}
        <TrendingNextLink href="/smart-water-use" title="Smart Water Use" />
        <TrendingNextLink href="/services" title="Customer Service" />
        <TrendingNextLink
          href="/smart-water-use/rebate-programs"
          title="Rebates"
        />
        <TrendingNextLink href="/services/outage" title="Outages" />
        <TrendingLink
          href="https://careers.pcwa.net/"
          title="Careers"
          rel="noopener noreferrer"
          target="_blank"
        />
        {/* <TrendingLink href="...">Recruitment Video</TrendingLink> */}
      </List>
    </Box>
  )
}

export default TrendingBarMobile
