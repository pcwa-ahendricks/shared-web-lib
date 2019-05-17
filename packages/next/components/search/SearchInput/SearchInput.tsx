import React, {useState, useCallback} from 'react'
import {makeStyles, createStyles} from '@material-ui/styles'
import {Paper, Theme} from '@material-ui/core'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import colorAlpha from 'color-alpha'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: colorAlpha(theme.palette.primary.main, 0.07),
      margin: theme.spacing(1),
      height: theme.spacing(4),
      display: 'flex',
      alignItems: 'center',
      color: theme.palette.common.white
    },
    inputWithFocus: {},
    input: {
      maxWidth: 100,
      '-webkit-transition': 'max-width 500ms ease',
      transition: 'width 500ms ease',
      '&$inputWithFocus': {
        maxWidth: 175
      },
      marginLeft: theme.spacing(2),
      flex: '1 1 auto'
    }
    // withStartAdornment: {
    //   paddingLeft: theme.spacing( 1)
    // }
  })
)
const CustomizedInputBase = () => {
  const classes = useStyles()
  const [searchValue, setSearchValue] = useState('')

  const inputChangeHandler = useCallback((e) => {
    setSearchValue(e.target.value)
  }, [])

  const searchHandler = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      console.log(e)
    },
    []
  )

  const clickHandler = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      console.log(e)
    },
    []
  )

  const keyPressHandler = useCallback(
    (evt: React.KeyboardEvent<HTMLDivElement>) => {
      if (evt.key.toLowerCase() === 'enter') {
        searchHandler(evt)
      }
    },
    [searchHandler]
  )

  const inputHasValue = searchValue && searchValue.length > 0
  return (
    <Paper className={classes.root} elevation={0} square={false}>
      <InputBase
        type="search"
        margin="dense"
        // startAdornment={<SearchIcon />}
        onChange={inputChangeHandler}
        onKeyPress={keyPressHandler}
        className={classes.input}
        placeholder="Search..."
        classes={{
          // inputAdornedStart: classes.withStartAdornment,
          focused: classes.inputWithFocus
        }}
      />
      <IconButton
        disabled={!inputHasValue}
        color="primary"
        aria-label="Search"
        onClick={clickHandler}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

export default CustomizedInputBase
