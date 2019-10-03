import React, {useCallback, useMemo} from 'react'
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography as Type
} from '@material-ui/core'
import NextLink from 'next/link'
import {GageConfigItem} from '@lib/services/pi/gage-config'
import acronym from '@lib/acronym'

type Props = {
  pid: string
  g: GageConfigItem
}

const PiNavigationListItem = ({pid, g}: Props) => {
  const activeRoute = useCallback(
    (id: string) => pid.toLowerCase() === id.toLowerCase(),
    [pid]
  )

  // Abbreviate "Hell Hole" and "French Meadows".
  const abbrevCode = useMemo(() => {
    const words = (g.id || '').split(/\s/)
    return words.length >= 2 ? (acronym(g.id) || '').toUpperCase() : g.id
  }, [g])

  return (
    <NextLink
      passHref
      href="/recreation/flows/gages/[pid]"
      as={`/recreation/flows/gages/${g.id}`}
    >
      <ListItem
        button
        component="a"
        disabled={g.disabled}
        selected={activeRoute(g.id)}
      >
        <ListItemAvatar>
          <Type variant="h6">{abbrevCode}</Type>
        </ListItemAvatar>
        <ListItemText primary={g.description} />
      </ListItem>
    </NextLink>
  )
}

export default PiNavigationListItem
