import React from 'react'
import {ListItem, ListItemText} from '@material-ui/core'
// import {ListItemProps} from '@material-ui/core/ListItem'
// import {SearchContext} from '../SearchStore'
import {GoogleCseItem} from '../SearchResponse'
import SearchResultLink from '../SearchResultLink/SearchResultLink'

// const useStyles = makeStyles((theme: Theme) => createStyles({}))
type Props = {result: GoogleCseItem}

const SearchList = ({result}: Props) => {
  // const searchContext = useContext(SearchContext)
  // const searchState = searchContext.state
  // const {results} = searchState
  console.log('result', result)

  return (
    <ListItem button>
      <ListItemText>
        <SearchResultLink title={result.formattedUrl} href={result.link} />
      </ListItemText>
    </ListItem>
  )
}

export default SearchList
