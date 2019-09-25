import React, {useMemo} from 'react'
import {List, ListSubheader, Divider} from '@material-ui/core'
// import {ListItemProps} from '@material-ui/core/ListItem'
import {gages} from '@lib/services/pi/gage-config'
import PiNavigationListItem from '../PiNavigationListItem/PiNavigationListItem'

type Props = {
  pid: string
}

const PiNavigationList = ({pid}: Props) => {
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

  return (
    <React.Fragment>
      <List
        dense
        aria-label="River Gage Links"
        subheader={
          <ListSubheader component="nav" id="river-gage-links">
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
          <ListSubheader component="nav" id="reservoir-gage-links">
            Reservoir Gages
          </ListSubheader>
        }
      >
        <Divider />
        {reservoirGages.map((g) => (
          <PiNavigationListItem key={g.id} pid={pid} g={g} />
        ))}
      </List>
    </React.Fragment>
  )
}

export default PiNavigationList
