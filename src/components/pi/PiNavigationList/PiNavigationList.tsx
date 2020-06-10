import React, {useMemo, useRef, useCallback, useState, useEffect} from 'react'
import {
  Collapse,
  List,
  ListSubheader,
  Divider,
  Box,
  Button,
  createStyles,
  makeStyles,
  useTheme,
  Theme
} from '@material-ui/core'
// import {ListItemProps} from '@material-ui/core/ListItem'
import gages from '@lib/services/pi/gage-config'
import PiNavigationListItem from '../PiNavigationListItem/PiNavigationListItem'
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded'

type Props = {
  pid?: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      maxHeight: 700,
      overflowY: 'scroll',
      paddingBottom: 0
    },
    subheader: {
      backgroundColor: theme.palette.background.paper // Cover other ListItems when scrolling via sticky positioning.
    }
  })
)

const PiNavigationList = ({pid}: Props) => {
  const classes = useStyles()
  const theme = useTheme<Theme>()
  const gageListRef = useRef<HTMLUListElement>(null)
  const reservoirListRef = useRef<HTMLUListElement>(null)
  const [showMoreRiverGages, setShowMoreRiverGages] = useState(false)
  const [showMoreReservoirGages, setShowMoreReservoirGages] = useState(false)

  const riverGages = useMemo(
    () =>
      gages.filter(
        (g) => g.baseElement === '\\\\BUSINESSPI2\\OPS\\Gauging Stations'
      ),
    []
  )
  const reservoirGages = useMemo(
    () =>
      gages.filter((g) => g.baseElement === '\\\\BUSINESSPI2\\OPS\\Reservoirs'),
    []
  )

  const calcShowMoreRiverGages = useCallback(() => {
    const show = gageListRef.current
      ? gageListRef.current.scrollHeight - gageListRef.current.scrollTop !=
        gageListRef.current.clientHeight
      : false
    setShowMoreRiverGages(show)
  }, [])

  const calcShowMoreReservoirGages = useCallback(() => {
    const show = reservoirListRef.current
      ? reservoirListRef.current.scrollHeight -
          reservoirListRef.current.scrollTop !=
        reservoirListRef.current.clientHeight
      : false
    setShowMoreReservoirGages(show)
  }, [])

  const hideShowMoreRiverGages = Boolean(
    gageListRef &&
      gageListRef.current &&
      gageListRef.current.clientHeight >= gageListRef.current.scrollHeight
  )

  const hideShowMoreReservoirGages = Boolean(
    reservoirListRef &&
      reservoirListRef.current &&
      reservoirListRef.current.clientHeight >=
        reservoirListRef.current.scrollHeight
  )

  useEffect(() => {
    calcShowMoreRiverGages()
    calcShowMoreReservoirGages()
  }, [gageListRef, calcShowMoreRiverGages, calcShowMoreReservoirGages])

  const clickHandler = useCallback(
    (type: 'river' | 'reservoir') => () => {
      // const foo: any = gageListRef.current
      // // console.log('ct', foo.clientTop)
      // console.log('ch', foo.clientHeight)
      // console.log('st', foo.scrollTop)
      // console.log('sh', foo.scrollHeight)
      // // console.log('ot', foo.offsetTop)
      // // console.log('oh', foo.offsetHeight)

      const scrollOptions: ScrollToOptions = {
        left: 0,
        top: 100, // will be overwritten depending on height of the list.
        behavior: 'smooth'
      }
      const scrollDownFactor = 0.5

      if (type === 'river') {
        if (!gageListRef || !gageListRef.current) {
          return
        }
        scrollOptions.top = gageListRef.current.clientHeight * scrollDownFactor
        gageListRef.current.scrollBy(scrollOptions)
      } else if (type === 'reservoir') {
        if (!reservoirListRef || !reservoirListRef.current) {
          return
        }
        scrollOptions.top =
          reservoirListRef.current.clientHeight * scrollDownFactor
        reservoirListRef.current?.scrollBy(scrollOptions)
      }
    },
    []
  )

  const scrollHandler = useCallback(() => {
    calcShowMoreRiverGages()
    calcShowMoreReservoirGages()
  }, [calcShowMoreRiverGages, calcShowMoreReservoirGages])

  const ScrollForMoreButton = ({
    collapsed,
    disabled,
    type
  }: {
    collapsed: boolean
    disabled: boolean
    type: 'river' | 'reservoir'
  }) => {
    return (
      <Collapse in={!collapsed}>
        <Button
          disabled={disabled}
          onClick={clickHandler(type)}
          color="secondary"
          size="small"
          fullWidth
          startIcon={<ExpandMoreRoundedIcon />}
        >
          Scroll for more
        </Button>
      </Collapse>
    )
  }

  return (
    <Box boxShadow={1} bgcolor={theme.palette.common.white}>
      <List
        onScroll={scrollHandler}
        ref={gageListRef}
        className={classes.list}
        dense
        aria-label="River Gage Links"
        subheader={
          <ListSubheader
            component="nav"
            id="river-gage-links"
            className={classes.subheader}
          >
            River Gages
          </ListSubheader>
        }
      >
        <Divider />
        {riverGages.map((g) => (
          <PiNavigationListItem key={g.id} pid={pid} g={g} />
        ))}
      </List>
      <ScrollForMoreButton
        collapsed={hideShowMoreRiverGages}
        disabled={!showMoreRiverGages}
        type="river"
      />
      <List
        ref={reservoirListRef}
        className={classes.list}
        dense
        aria-label="Reservoir Gage Links"
        subheader={
          <ListSubheader
            component="nav"
            id="reservoir-gage-links"
            className={classes.subheader}
          >
            Reservoir Gages
          </ListSubheader>
        }
      >
        <Divider />
        {reservoirGages.map((g) => (
          <PiNavigationListItem key={g.id} pid={pid} g={g} />
        ))}
      </List>
      <ScrollForMoreButton
        collapsed={hideShowMoreReservoirGages}
        disabled={!showMoreReservoirGages}
        type="reservoir"
      />
    </Box>
  )
}

export default PiNavigationList
