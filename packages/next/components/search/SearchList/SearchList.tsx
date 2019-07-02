import React, {useContext, useMemo} from 'react'
import {List} from '@material-ui/core'
import {ListProps} from '@material-ui/core/List'
import {SearchContext} from '../SearchStore'
import SearchListItem from '../SearchListItem/SearchListItem'

// const useStyles = makeStyles((theme: Theme) => createStyles({}))
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
