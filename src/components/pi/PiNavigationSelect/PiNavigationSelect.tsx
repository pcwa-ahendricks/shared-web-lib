import React, {useCallback} from 'react'
import {FormControl, InputLabel, Select, MenuItem} from '@material-ui/core'
import gages, {GageConfigItem} from '@lib/services/pi/gage-config'
import {useRouter} from 'next/router'
import acronym from '@lib/acronym'
import {spacesRe} from '@pages/recreation/flows/gages/[pid]'

type Props = {
  pid?: string
}

const PiNavigationSelect = ({pid}: Props) => {
  const router = useRouter()
  const changeHandler = useCallback(
    (
      event: React.ChangeEvent<{
        name?: string | undefined
        value: any
      }>
    ) => {
      const {value: slug = ''} = event.target
      router.push(
        '/recreation/flows/gages/[pid]',
        `/recreation/flows/gages/${slug}`
      )
    },
    [router]
  )

  const menuItemCaption = useCallback((g: GageConfigItem) => {
    const gId = (g.id || '').split(/\s/)
    const code = gId.length >= 2 ? (acronym(g.id) || '').toUpperCase() : g.id
    return `${code} - ${g.description}`
  }, [])

  return (
    <>
      <FormControl fullWidth>
        <InputLabel htmlFor="gage-id">Select a Gage</InputLabel>
        <Select
          aria-label="Gage Links"
          value={pid}
          onChange={changeHandler}
          inputProps={{
            name: 'gage',
            id: 'gage-id'
          }}
        >
          {gages.map((g) => {
            const value = g.id.replace(spacesRe, '-').toLowerCase()
            return (
              <MenuItem key={g.id} value={value} disabled={g.disabled}>
                {menuItemCaption(g)}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </>
  )
}

export default PiNavigationSelect
