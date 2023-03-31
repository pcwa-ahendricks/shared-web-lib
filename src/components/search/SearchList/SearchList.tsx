import React, {useContext, useMemo} from 'react'
import {List} from '@mui/material'
import {ListProps} from '@mui/material/List'
import {SearchContext} from '../SearchStore'
import SearchListItem from '../SearchListItem/SearchListItem'

type Props = Partial<ListProps>

const SearchList = ({...rest}: Props) => {
  const searchContext = useContext(SearchContext)
  const searchState = searchContext.state
  const {results} = searchState
  const filteredResults = useMemo(
    () => results.map((result, idx) => ({id: idx, ...result})),
    [results]
  )

  return (
    <List {...rest}>
      {filteredResults.map((result) => (
        <SearchListItem key={result.id} result={result} />
      ))}
    </List>
  )
}

export default SearchList
