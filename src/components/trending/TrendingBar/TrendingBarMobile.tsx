import React, {useCallback, useContext, useMemo} from 'react'
import {
  // Typography as Type,
  List,
  ListItemProps,
  ListItemText,
  ListSubheader,
  Box,
  ListItemButton
} from '@mui/material'

import NextLink, {LinkProps as NextLinkProps} from 'next/link'
import {setDrawerViz, UiContext} from '@components/ui/UiStore'
import useTheme from '@hooks/useTheme'
// import FlexLink, {FlexLinkProps} from '@components/FlexLink/FlexLink'

const TrendingBarMobile = () => {
  const theme = useTheme()
  const {dispatch} = useContext(UiContext)
  const style = useMemo(
    () => ({
      subheader: {
        fontStyle: 'italic',
        color: theme.palette.text.secondary
      },
      type: {
        color: theme.palette.text.secondary
      }
    }),
    [theme]
  )
  const toggleDrawer = useCallback(
    (openDrawer: boolean) => () => {
      dispatch(setDrawerViz(openDrawer))
    },
    [dispatch]
  )
  const TrendingLink = useCallback(
    ({title, ...props}: ListItemProps<'a', {button?: true}>) => {
      return (
        <ListItemButton
          component="a"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          {...props}
        >
          <ListItemText
            primary={title}
            sx={{['& .MuiListItemText-primary']: {...style.type}}}
          />
        </ListItemButton>
      )
    },
    [style, toggleDrawer]
  )

  const TrendingNextLink = useCallback(
    ({
      title,
      href,
      as,
      ...props
    }: NextLinkProps & ListItemProps<'a', {button?: true}>) => {
      return (
        <NextLink href={href} as={as} passHref legacyBehavior>
          <ListItemButton
            component="a"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            {...props}
          >
            <ListItemText
              primary={title}
              sx={{['& .MuiListItemText-primary']: {...style.type}}}
            />
          </ListItemButton>
        </NextLink>
      )
    },
    [style, toggleDrawer]
  )

  return (
    <Box pt={1}>
      <List dense>
        <ListSubheader sx={{...style.subheader}}>Trending Pages</ListSubheader>
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
