import React, {
  useCallback,
  useMemo,
  useContext,
  useEffect,
  useState
} from 'react'
import {makeStyles, useTheme, createStyles} from '@material-ui/core/styles'
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
  Divider
} from '@material-ui/core'
import menuConfig from '@lib/menuConfig'
import Link from 'next/link'
import FlexLink from '@components/FlexLink/FlexLink'
import {setDrawerViz, UiContext} from '@components/ui/UiStore'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import clsx from 'clsx'
import {ColumnBox, ChildBox, RowBox} from '@components/boxes/FlexBox'
// import PcwaLogo from '@components/PcwaLogo/PcwaLogo'
import FacebookIcon from 'mdi-material-ui/Facebook'
import TwitterIcon from 'mdi-material-ui/Twitter'
import YoutubeIcon from 'mdi-material-ui/Youtube'
import SocialIconButton from '@components/SocialIconButton/SocialIconButton'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(4)
    },
    subheader: {
      color: theme.palette.common.black,
      textTransform: 'uppercase'
    }
  })
)

const SwipeableTemporaryDrawer = () => {
  const classes = useStyles()
  const [activeGroup, setActiveGroup] = useState<number | null>(null)

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

  const groupSelectHandler = (groupKey: number) => () => {
    setActiveGroup((currentGroupKey) =>
      currentGroupKey === groupKey ? null : groupKey
    )
  }

  const NavListItem = ({title}: {title: string}) => {
    return (
      <ListItem
        className={classes.nested}
        button
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <ListItemText>
          <Type variant="caption">{title}</Type>
        </ListItemText>
      </ListItem>
    )
  }

  const sideList = useMemo(
    () => (
      <>
        <List component="nav">
          <Link href="/">
            <ListItem
              button
              component="a"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          {menuConfig.map((cfg, idxLvl1) => (
            <React.Fragment key={idxLvl1}>
              <ListItem
                button
                onClick={groupSelectHandler(cfg.key)}
                onKeyDown={groupSelectHandler(cfg.key)}
              >
                <ListItemText primary={cfg.menuName} />
              </ListItem>
              <Collapse in={activeGroup === cfg.key} timeout="auto">
                <List component="div" disablePadding>
                  {cfg.groups.map((g, idxLvl2) => (
                    <React.Fragment key={idxLvl2}>
                      <Box mb={2}>
                        <ListSubheader
                          className={clsx([classes.nested, classes.subheader])}
                        >
                          {g.groupName}
                        </ListSubheader>
                        {g.items.map((i, idxLvl3) => (
                          <FlexLink
                            key={idxLvl3}
                            href={i.nextLink || i.href || '/'}
                            underline="none"
                            color="textPrimary"
                            as={i.as}
                          >
                            <NavListItem title={i.title} />
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
        <Divider />
      </>
    ),
    [classes, toggleDrawer, activeGroup]
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
        <ColumnBox width={300} height="100%">
          <ChildBox>{sideList}</ChildBox>
          <ChildBox flex="auto" />
          <ChildBox mb={1}>
            <RowBox justifyContent="center" fontStyle="italic">
              <Type variant="body1" color="primary">
                Also on
              </Type>
            </RowBox>
            <RowBox justifyContent="center" flexSpacing={2} mt={1}>
              <ChildBox>
                <SocialIconButton
                  href="https://twitter.com/PlacerWater"
                  color="primary"
                >
                  <FacebookIcon fontSize="large" />
                </SocialIconButton>
              </ChildBox>
              <ChildBox>
                <SocialIconButton
                  href="https://www.facebook.com/ThePCWA"
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
