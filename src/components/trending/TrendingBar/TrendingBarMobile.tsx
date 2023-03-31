import React, {useCallback, useContext} from 'react'
import {
  // Typography as Type,
  List,
  ListItem,
  ListItemProps,
  ListItemText,
  Theme,
  ListSubheader,
  Box
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import NextLink, {LinkProps as NextLinkProps} from 'next/link'
import {setDrawerViz, UiContext} from '@components/ui/UiStore'
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
  const {dispatch} = useContext(UiContext)
  const classes = useStyles()
  const toggleDrawer = useCallback(
    (openDrawer: boolean) => () => {
      dispatch(setDrawerViz(openDrawer))
    },
    [dispatch]
  )
  const TrendingLink = useCallback(
    ({title, ...props}: ListItemProps<'a', {button?: true}>) => {
      return (
        <ListItem
          button
          component="a"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          {...props}
        >
          <ListItemText primary={title} classes={{primary: classes.type}} />
        </ListItem>
      )
    },
    [classes, toggleDrawer]
  )

  const TrendingNextLink = useCallback(
    ({
      title,
      href,
      as,
      ...props
    }: NextLinkProps & ListItemProps<'a', {button?: true}>) => {
      return (
        <NextLink href={href} as={as} passHref>
          <ListItem
            button
            component="a"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            {...props}
          >
            <ListItemText primary={title} classes={{primary: classes.type}} />
          </ListItem>
        </NextLink>
      )
    },
    [classes, toggleDrawer]
  )

  return (
    <Box pt={1}>
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
