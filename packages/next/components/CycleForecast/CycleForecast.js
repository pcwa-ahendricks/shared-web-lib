// @flow

import React, {useState} from 'react'
import Forecast, {type ForecastData} from '../Forecast/Forecast'
import ReactCSSTransitionReplace from 'react-css-transition-replace'
import useInterval from '../../hooks/useInterval'
import {withStyles} from '@material-ui/core/styles'
import {maxInt} from '../../lib/util'

type Props = {
  classes: any,
  forecasts: Array<ForecastData>,
  cycleInterval: number,
  crossFadeDuration: number
}
// type State = {
//   forecasts: Array<ForecastData>,
// }

const styles = {
  trans: {
    '& .cross-fade-leave': {
      opacity: 1
    },
    '& .cross-fade-leave.cross-fade-leave-active': {
      opacity: 0,
      transition: 'opacity 1s ease-in'
    },
    '& .cross-fade-enter': {
      opacity: 0
    },
    '& .cross-fade-enter.cross-fade-enter-active': {
      opacity: 1,
      transition: 'opacity 1s ease-in'
    },
    '& .cross-fade-height': {
      transition: 'height 0.5s ease-in-out'
    }
  }
}

const CycleForecast = ({
  classes,
  forecasts,
  cycleInterval,
  crossFadeDuration
}: Props) => {
  const [activeForecastId, setActiveForecastId]: [number, any] = useState(1)

  useInterval(handleInterval, cycleInterval, [forecasts, activeForecastId])

  function handleInterval() {
    if (!forecasts) {
      return
    }
    setActiveForecastId(
      activeForecastId >= maxInt(forecasts, 'id') ? 1 : activeForecastId + 1
    )
  }

  const activeForecast = () =>
    forecasts.find((forecast) => forecast.id === activeForecastId)

  const forecast = activeForecast()
  return forecast ? (
    <ReactCSSTransitionReplace
      className={classes.trans}
      transitionName="cross-fade"
      transitionEnterTimeout={crossFadeDuration}
      transitionLeaveTimeout={crossFadeDuration}
    >
      <Forecast key={forecast.id} forecast={forecast} />
    </ReactCSSTransitionReplace>
  ) : null
}

CycleForecast.defaultProps = {
  forecasts: [],
  cycleInterval: 1000 * 10, // 10 seconds
  crossFadeDuration: 1000 * 1 // 1 seconds
}

export default withStyles(styles)(CycleForecast)
