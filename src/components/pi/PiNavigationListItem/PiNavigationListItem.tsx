import React, {useMemo} from 'react'
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography as Type,
  makeStyles,
  createStyles
} from '@material-ui/core'
import NextLink from 'next/link'
import {GageConfigItem} from '@lib/services/pi/gage-config'
import acronym from '@lib/acronym'
import {orange} from '@material-ui/core/colors'
import clsx from 'clsx'
import {spacesRe} from '@pages/recreation/flows/gages/[pid]'

type Props = {
  pid?: string
  g: GageConfigItem
}

const useStyles = makeStyles(() =>
  createStyles({
    reviewAvatar: {
      color: orange['500']
    }
  })
)

const PiNavigationListItem = ({pid, g}: Props) => {
  const gageIdSlug = g.id.replace(spacesRe, '-').toLowerCase()
  const activeRoute = useMemo(
    () =>
      // Need to compare id to modified pid.
      pid === gageIdSlug,
    [pid, gageIdSlug]
  )

  const isReview = useMemo(() => Boolean(g.review), [g])
  const classes = useStyles({isReview})

  // Abbreviate "Hell Hole" and "French Meadows".
  const abbrevCode = useMemo(() => {
    const words = (g.id || '').split(/\s/)
    return words.length >= 2 ? (acronym(g.id) || '').toUpperCase() : g.id
  }, [g])

  return (
    <NextLink
      passHref
      href="/recreation/flows/gages/[pid]"
      as={`/recreation/flows/gages/${gageIdSlug}`}
    >
      <ListItem
        button
        component="a"
        disabled={g.disabled}
        selected={activeRoute}
      >
        <ListItemAvatar>
          <Type
            variant="h6"
            className={clsx({[classes.reviewAvatar]: isReview})}
          >
            {abbrevCode}
          </Type>
        </ListItemAvatar>
        <ListItemText primary={g.description} />
      </ListItem>
    </NextLink>
  )
}

export default PiNavigationListItem
