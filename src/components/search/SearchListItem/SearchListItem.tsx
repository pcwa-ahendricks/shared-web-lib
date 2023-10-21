import React, {useContext} from 'react'
import {ListItemButton} from '@mui/material'
import {SearchContext} from '../SearchStore'
import {GoogleCseItem} from '../SearchResponse'
import SearchListItemContent from '../SearchListItemContent/SearchListItemContent'
import useLinkComponent from '@hooks/useLinkComponent'

type Props = {result: GoogleCseItem}

const SearchListItem = ({result}: Props) => {
  const searchContext = useContext(SearchContext)
  // const searchDispatch = searchContext.dispatch
  const searchState = searchContext.state
  const {isPaging} = searchState

  // if url is for pcwa.net, allow <Link/> to use Next Router
  const url = new URL(result.link)
  let href = ''

  if (url.host === 'www.pcwa.net') {
    href = url.pathname
  } else {
    href = url.href
  }
  const LinkComponent = useLinkComponent()

  return (
    <ListItemButton
      href={href}
      LinkComponent={LinkComponent}
      sx={{
        padding: 0,
        transition: 'opacity 300ms ease',
        opacity: 1,
        ...(isPaging && {
          opacity: 0.4,
          color: 'transparent',
          textShadow: '0 0 8px rgba(0,0,0,0.6)'
        })
      }}
    >
      <SearchListItemContent result={result} />
    </ListItemButton>
  )
}

export default SearchListItem
