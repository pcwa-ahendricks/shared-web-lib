import React, {useCallback, useContext, useEffect, useState} from 'react'
import ArrowDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import {ListItemProps} from '@material-ui/core/ListItem'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import {
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Theme,
  Box,
  Collapse,
  Typography as Type,
  Divider,
  makeStyles,
  useTheme,
  createStyles,
  ListItemIcon
} from '@material-ui/core'
import menuConfig from '@lib/menuConfig'
import Link from 'next/link'
import FlexLink from '@components/FlexLink/FlexLink'
import {setDrawerViz, UiContext} from '@components/ui/UiStore'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import clsx from 'clsx'
import {ColumnBox, ChildBox, RowBox} from 'mui-sleazebox'
// import PcwaLogo from '@components/PcwaLogo/PcwaLogo'
import FacebookIcon from 'mdi-material-ui/Facebook'
import TwitterIcon from 'mdi-material-ui/Twitter'
import YoutubeIcon from 'mdi-material-ui/Youtube'
import SocialIconButton from '@components/SocialIconButton/SocialIconButton'
import {useRouter} from 'next/router'
// import TrendingBarMobile from '@components/trending/TrendingBar/TrendingBarMobile'
import colorAlpha from 'color-alpha'
import Spacing from '@components/boxes/Spacing'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItemIcon: {
      minWidth: 28
    },
    bolder: {
      fontWeight: 500
    },
    nested: {
      paddingLeft: theme.spacing(4)
    },
    subheader: {
      // color: theme.palette.common.black,
      // color: theme.palette.primary.main,
      color: colorAlpha(theme.palette.text.secondary, 0.5), // Defaults to 0.54
      textTransform: 'uppercase',
      // fontStyle: 'italic',
      backgroundColor: theme.palette.background.paper // Cover other ListItems when scrolling via sticky positioning.
    }
  })
)

const SwipeableTemporaryDrawer = () => {
  const classes = useStyles()
  const [activeGroup, setActiveGroup] = useState<number | null>(null)
  const router = useRouter()

  const {state, dispatch} = useContext(UiContext)
  const theme = useTheme<Theme>()
  const notXS = useMediaQuery(theme.breakpoints.up('sm'))

  const toggleDrawer = useCallback(
    (openDrawer: boolean) => () => {
      dispatch(setDrawerViz(openDrawer))
    },
    [dispatch]
  )

  // See https://material-ui.com/components/drawers/#swipeable-temporary-drawer for more info.
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)

  const groupSelectHandler = useCallback(
    (groupKey: number) => () => {
      setActiveGroup((currentGroupKey) =>
        currentGroupKey === groupKey ? null : groupKey
      )
    },
    []
  )

  const NavListItem = useCallback(
    ({
      title,
      ...rest
    }: {title: string} & ListItemProps<'li', {button?: true}>) => {
      return (
        <ListItem
          component="li"
          className={classes.nested}
          button
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          {...rest}
        >
          <ListItemText primaryTypographyProps={{color: 'inherit'}}>
            <Type variant="caption" color="inherit">
              {title}
            </Type>
          </ListItemText>
        </ListItem>
      )
    },
    [classes, toggleDrawer]
  )

  const SideList = useCallback(
    () => (
      <>
        <List component="nav">
          <Link href="/" passHref>
            <ListItem
              button
              component="a"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <ListItemText
                primary="Home"
                primaryTypographyProps={{
                  color: 'primary',
                  classes: {colorPrimary: classes.bolder}
                }}
              />
            </ListItem>
          </Link>
          {menuConfig.map((cfg, idxLvl1) => (
            <React.Fragment key={idxLvl1}>
              <ListItem
                button
                onClick={groupSelectHandler(cfg.key)}
                onKeyDown={groupSelectHandler(cfg.key)}
              >
                <ListItemIcon classes={{root: classes.listItemIcon}}>
                  {activeGroup === cfg.key ? (
                    <ArrowDownIcon color="action" />
                  ) : (
                    <ArrowRightIcon color="action" />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={cfg.menuName}
                  primaryTypographyProps={{
                    color: 'primary',
                    classes: {colorPrimary: classes.bolder}
                  }}
                />
              </ListItem>
              <Collapse in={activeGroup === cfg.key} timeout="auto">
                <List component="div" disablePadding>
                  {cfg.groups.map((g, idxLvl2) => (
                    <React.Fragment key={idxLvl2}>
                      <Box mb={2}>
                        <ListSubheader
                          classes={{
                            root: clsx([classes.nested, classes.subheader])
                          }}
                        >
                          {g.groupName}
                        </ListSubheader>
                        {g.items.map((i, idxLvl3) => (
                          <FlexLink
                            key={idxLvl3}
                            href={i.nextLink || i.href || '/'}
                            underline="none"
                            color="primary"
                            as={i.as}
                            isNextLink={Boolean(i.nextLink)}
                          >
                            <NavListItem
                              title={i.title}
                              selected={i.nextLink === router.pathname}
                            />
                          </FlexLink>
                        ))}
                      </Box>
                    </React.Fragment>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          ))}
        </List>
        <Spacing size="x-small">
          <Divider />
        </Spacing>
        <List dense>
          <ListItem
            href="https://ipn.paymentus.com/cp/plco"
            target="_blank"
            button
            component="a"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <ListItemText
              primary="Pay Bill"
              primaryTypographyProps={{
                color: 'secondary',
                classes: {colorSecondary: classes.bolder}
              }}
            />
          </ListItem>
          <Link href="/services/outage" passHref>
            <ListItem
              button
              component="a"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <ListItemText
                primary="Outages"
                primaryTypographyProps={{
                  color: 'secondary',
                  classes: {colorSecondary: classes.bolder}
                }}
              />
            </ListItem>
          </Link>
          <ListItem
            href="https://careers.pcwa.net/"
            target="_blank"
            button
            component="a"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <ListItemText
              primary="Careers"
              primaryTypographyProps={{
                color: 'secondary',
                classes: {colorSecondary: classes.bolder}
              }}
            />
          </ListItem>
          <Link href="/board-of-directors/meeting-agendas" passHref>
            <ListItem
              button
              component="a"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <ListItemText
                primary="Board Meetings"
                primaryTypographyProps={{
                  color: 'secondary',
                  classes: {colorSecondary: classes.bolder}
                }}
              />
            </ListItem>
          </Link>
          <Link href="/smart-water-use/rebate-programs" passHref>
            <ListItem
              button
              component="a"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <ListItemText
                primary="Rebates"
                primaryTypographyProps={{
                  color: 'secondary',
                  classes: {colorSecondary: classes.bolder}
                }}
              />
            </ListItem>
          </Link>
        </List>
        {/* <Divider /> */}
      </>
    ),
    [
      classes,
      toggleDrawer,
      activeGroup,
      router,
      groupSelectHandler,
      NavListItem
    ]
  )

  // Close the drawer if it's open and window is resized larger.
  useEffect(() => {
    if (notXS && state.drawerOpen) {
      dispatch(setDrawerViz(false))
    }
  }, [notXS, toggleDrawer, state, dispatch])

  return (
    <Box component="nav" aria-label="main-navigation">
      <SwipeableDrawer
        open={state.drawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        ModalProps={{
          keepMounted: true
        }}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
      >
        <ColumnBox width={275} height="100%">
          <ChildBox>
            <SideList />
          </ChildBox>
          {/* <ChildBox>
            <TrendingBarMobile />
          </ChildBox> */}
          <ChildBox flex="auto" />
          <ChildBox my={1}>
            <RowBox justifyContent="center" fontStyle="italic">
              <Type variant="body1" color="primary">
                Also on
              </Type>
            </RowBox>
            <RowBox justifyContent="center" flexSpacing={2} mt={1}>
              <ChildBox>
                <SocialIconButton
                  href="https://www.facebook.com/ThePCWA"
                  color="primary"
                >
                  <FacebookIcon fontSize="large" />
                </SocialIconButton>
              </ChildBox>
              <ChildBox>
                <SocialIconButton
                  href="https://twitter.com/PlacerWater"
                  color="primary"
                >
                  <TwitterIcon fontSize="large" />
                </SocialIconButton>
              </ChildBox>
              <ChildBox>
                <SocialIconButton
                  href="https://www.youtube.com/user/ThePCWA"
                  color="primary"
                >
                  <YoutubeIcon fontSize="large" />
                </SocialIconButton>
              </ChildBox>
            </RowBox>
          </ChildBox>
          {/* <ChildBox mt={6} mb={1} flex="0 1 auto">
            <RowBox justifyContent="space-around">
              <PcwaLogo width="30%" missionStatementFill="rgba(0,0,0,0)" />
            </RowBox>
          </ChildBox> */}
        </ColumnBox>
      </SwipeableDrawer>
    </Box>
  )
}

export default SwipeableTemporaryDrawer
