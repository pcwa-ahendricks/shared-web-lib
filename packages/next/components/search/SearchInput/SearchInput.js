// @flow
import React, {useState} from 'react'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import colorAlpha from 'color-alpha'

type Props = {
  classes: any
}

const styles = (theme) => ({
  root: {
    backgroundColor: colorAlpha(theme.palette.primary.main, 0.07),
    margin: theme.spacing.unit * 1,
    height: theme.spacing.unit * 4,
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.white
  },
  inputWithFocus: {},
  input: {
    width: 150,
    '-webkit-transition': 'width 500ms ease',
    transition: 'width 500ms ease',
    '&$inputWithFocus': {
      width: 225
    },
    marginLeft: theme.spacing.unit * 2,
    flex: 1
  }
  // withStartAdornment: {
  //   paddingLeft: theme.spacing.unit * 1
  // }
})

const CustomizedInputBase = ({classes}: Props) => {
  const [searchValue, setSearchValue] = useState('')

  const inputChangeHandler = (e) => {
    setSearchValue(e.target.value)
  }

  const searchHandler = (e) => {
    console.log(e)
  }

  const keyPressHandler = (e) => {
    if (e.key.toLowerCase() === 'enter') {
      searchHandler()
    }
  }

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
        onClick={searchHandler}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

export default withStyles(styles)(CustomizedInputBase)
