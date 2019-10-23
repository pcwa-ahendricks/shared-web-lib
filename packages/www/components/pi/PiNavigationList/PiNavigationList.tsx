import React, {useMemo} from 'react'
import {List, ListSubheader, Divider, Theme, Box} from '@material-ui/core'
import {useTheme} from '@material-ui/core/styles'
// import {createStyles, makeStyles} from '@material-ui/core/styles'
// import {ListItemProps} from '@material-ui/core/ListItem'
import gages from '@lib/services/pi/gage-config'
import PiNavigationListItem from '../PiNavigationListItem/PiNavigationListItem'

type Props = {
  pid: string
}

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     list: {
//       backgroundColor: theme.palette.common.white
//     }
//   })
// )

const PiNavigationList = ({pid}: Props) => {
  // const classes = useStyles()
  const theme = useTheme<Theme>()

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

  // [HACK] See https://github.com/mui-org/material-ui/issues/17864#issue-506344372
  const Nav = (props: any) => <nav {...props} />

  return (
    <Box boxShadow={1} bgcolor={theme.palette.common.white}>
      <List
        dense
        aria-label="River Gage Links"
        subheader={
          <ListSubheader component={Nav} id="river-gage-links">
            River Gages
          </ListSubheader>
        }
      >
        <Divider />
        {riverGages.map((g) => (
          <PiNavigationListItem key={g.id} pid={pid} g={g} />
        ))}
      </List>
      <List
        dense
        aria-label="Reservoir Gage Links"
        subheader={
          <ListSubheader component={Nav} id="reservoir-gage-links">
            Reservoir Gages
          </ListSubheader>
        }
      >
        <Divider />
        {reservoirGages.map((g) => (
          <PiNavigationListItem key={g.id} pid={pid} g={g} />
        ))}
      </List>
    </Box>
  )
}

export default PiNavigationList
