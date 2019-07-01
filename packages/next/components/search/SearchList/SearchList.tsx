import React, {useContext} from 'react'
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

  return (
    <List {...rest}>
      {results.map((result, idx) => (
        <SearchListItem key={idx} result={result} />
      ))}
    </List>
  )
}

export default SearchList
