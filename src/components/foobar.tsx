import React, {useState, useCallback} from 'react'
import {makeStyles, createStyles, Box, Button} from '@material-ui/core'

// Inspiration: https://www.kevinpeters.net/adding-object-properties-conditionally-with-es-6
// More info at: https://material-ui.com/styles/api/#makestyles-styles-options-hook

interface UseStylesProps {
  tweakBg: boolean
  color: React.CSSProperties['color']
}

const useStyles = makeStyles(
  createStyles({
    root: ({tweakBg, color}: UseStylesProps) => ({
      padding: 20,
      // Conditional CSS Properties
      ...(tweakBg && {
        backgroundColor: color,
        color: 'white'
      })
    })
  })
)

export default function Foobar() {
  const [color, setColor] = useState<React.CSSProperties['color']>('blue')
  const [tweakBg, setTweakBg] = useState<boolean>(true)
  const classes = useStyles({color, tweakBg})
  const tweakHandler = useCallback(() => {
    setTweakBg(tweakBg ? false : true)
  }, [tweakBg])
  const toggleHandler = useCallback(() => {
    setColor(color === 'blue' ? 'red' : 'blue')
  }, [color])

  return (
    <Box>
      <Button onClick={toggleHandler}>Toggle</Button>
      <Button onClick={tweakHandler}>{tweakBg ? 'Turn Off' : 'Turn On'}</Button>
      <div className={classes.root}>Foobar</div>
    </Box>
  )
}
