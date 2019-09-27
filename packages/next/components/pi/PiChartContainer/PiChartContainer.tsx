// cspell:ignore highcharts highstock
import React, {useState} from 'react'
import {Box, Theme} from '@material-ui/core'
// import {useTheme, makeStyles, createStyles} from '@material-ui/styles'
import {useTheme} from '@material-ui/styles'
import useWindowResize from '@hooks/useWindowResize'
import {AttributeStream} from '../PiStore'
import PiChart from '../PiChart/PiChart'

type Props = {
  data?: AttributeStream
}

const PiChartContainer = ({data}: Props) => {
  const theme = useTheme<Theme>()
  const [windowWidth, setWindowWidth] = useState<number>()

  useWindowResize(() => {
    if (window && window.innerWidth) {
      setWindowWidth(window.innerWidth)
    }
  }, 80)

  return (
    <Box boxShadow={2} bgcolor={theme.palette.common.white} m={3} p={3}>
      <PiChart data={data} windowWidth={windowWidth} />
    </Box>
  )
}

export default PiChartContainer
