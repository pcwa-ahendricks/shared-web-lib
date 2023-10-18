import React, {useCallback, useContext, useEffect, useState} from 'react'
import ArrowDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import {
  SwipeableDrawer,
  List,
  ListItemText,
  ListSubheader,
  Box,
  Collapse,
  Typography as Type,
  Divider,
  alpha,
  ListItemIcon,
  ListItemButton,
  ListItemButtonProps,
  useMediaQuery
} from '@mui/material'
import menuConfig from '@lib/menuConfig'
import {setDrawerViz, UiContext} from '@components/ui/UiStore'
import {ColumnBox, ChildBox, RowBox} from '@components/MuiSleazebox'
// import PcwaLogo from '@components/PcwaLogo/PcwaLogo'
import FacebookIcon from 'mdi-material-ui/Facebook'
import TwitterIcon from 'mdi-material-ui/Twitter'
import YoutubeIcon from 'mdi-material-ui/Youtube'
import SocialIconButton from '@components/SocialIconButton/SocialIconButton'
import {useRouter} from 'next/router'
// import TrendingBarMobile from '@components/trending/TrendingBar/TrendingBarMobile'
import Spacing from '@components/boxes/Spacing'
import Link from '@components/Link'
import NextLink from 'next/link'
import useTheme from '@hooks/useTheme'

const SwipeableTemporaryDrawer = () => {
  const [activeGroup, setActiveGroup] = useState<number | null>(null)
  const router = useRouter()

  const {state, dispatch} = useContext(UiContext)
  const theme = useTheme()
  const notXS = useMediaQuery(theme.breakpoints.up('sm'))

  const toggleDrawer = useCallback(
    (openDrawer: boolean) => () => {
      dispatch(setDrawerViz(openDrawer))
    },
    [dispatch]
  )

  // See https://mui.com/material-ui/react-drawer/#swipeable for more info.
  const iOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent)

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
    }: {title: string} & ListItemButtonProps<'div', {button?: true}>) => {
      return (
        <ListItemButton
          sx={{
            paddingLeft: theme.spacing(4)
          }}
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          {...rest}
        >
          <ListItemText primaryTypographyProps={{color: 'inherit'}}>
            <Type variant="caption" color="inherit">
              {title}
            </Type>
          </ListItemText>
        </ListItemButton>
      )
    },
    [theme, toggleDrawer]
  )

  const SideList = useCallback(
    () => (
      <>
        <List component="nav">
          <NextLink href="/" passHref legacyBehavior>
            <ListItemButton
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <ListItemText
                primary="Home"
                primaryTypographyProps={{
                  color: 'primary',
                  sx: {fontWeight: 500}
                }}
              />
            </ListItemButton>
          </NextLink>
          {menuConfig.map((cfg, idxLvl1) => (
            <Box key={idxLvl1}>
              <ListItemButton
                onClick={groupSelectHandler(cfg.key)}
                onKeyDown={groupSelectHandler(cfg.key)}
              >
                <ListItemIcon sx={{minWidth: 28}}>
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
                    sx: {fontWeight: 500}
                  }}
                />
              </ListItemButton>
              <Collapse in={activeGroup === cfg.key} timeout="auto">
                <List component="div" disablePadding>
                  {cfg.groups.map((g, idxLvl2) => (
                    <Box key={idxLvl2}>
                      <Box mb={2}>
                        <ListSubheader
                          sx={{
                            // color: theme.palette.common.black,
                            // color: theme.palette.primary.main,
                            color: alpha(theme.palette.text.secondary, 0.5), // Defaults to 0.54
                            textTransform: 'uppercase',
                            // fontStyle: 'italic',
                            backgroundColor: theme.palette.background.paper, // Cover other ListItems when scrolling via sticky positioning.
                            paddingLeft: theme.spacing(4)
                          }}
                        >
                          {g.groupName}
                        </ListSubheader>
                        {g.items.map((i, idxLvl3) => (
                          <Link
                            key={idxLvl3}
                            href={i.href || '/'}
                            underline="none"
                            color="primary"
                            as={i.as}
                          >
                            <NavListItem
                              title={i.title}
                              selected={i.href === router.pathname}
                            />
                          </Link>
                        ))}
                      </Box>
                    </Box>
                  ))}
                </List>
              </Collapse>
            </Box>
          ))}
        </List>
        <Spacing size="x-small">
          <Divider />
        </Spacing>
        <List dense>
          <ListItemButton
            href="https://ipn.paymentus.com/cp/plco"
            target="_blank"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <ListItemText
              primary="Pay Bill"
              primaryTypographyProps={{
                color: 'secondary',
                sx: {fontWeight: 500}
              }}
            />
          </ListItemButton>
          <NextLink href="/services/outage" passHref legacyBehavior>
            <ListItemButton
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <ListItemText
                primary="Outages"
                primaryTypographyProps={{
                  color: 'secondary',
                  sx: {fontWeight: 500}
                }}
              />
            </ListItemButton>
          </NextLink>
          <ListItemButton
            href="https://careers.pcwa.net/"
            target="_blank"
            component="a"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <ListItemText
              primary="Careers"
              primaryTypographyProps={{
                color: 'secondary',
                sx: {fontWeight: 500}
              }}
            />
          </ListItemButton>
          <NextLink
            href="/board-of-directors/meeting-agendas"
            passHref
            legacyBehavior
          >
            <ListItemButton
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <ListItemText
                primary="Board Meetings"
                primaryTypographyProps={{
                  color: 'secondary',
                  sx: {fontWeight: 500}
                }}
              />
            </ListItemButton>
          </NextLink>
          <NextLink
            href="/smart-water-use/rebate-programs"
            passHref
            legacyBehavior
          >
            <ListItemButton
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <ListItemText
                primary="Rebates"
                primaryTypographyProps={{
                  color: 'secondary',
                  sx: {fontWeight: 500}
                }}
              />
            </ListItemButton>
          </NextLink>
        </List>
        {/* <Divider /> */}
      </>
    ),
    [toggleDrawer, activeGroup, router, groupSelectHandler, NavListItem, theme]
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
