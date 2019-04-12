// @flow
import React, {useState, useEffect, useCallback} from 'react'
import ForecastDisplay, {
  type ForecastData
} from '@components/forecast/ForecastDisplay/ForecastDisplay'
import ReactCSSTransitionReplace from 'react-css-transition-replace'
import {connect} from 'react-redux'
import {withStyles, type StyleRulesCallback} from '@material-ui/core/styles'
import ForecastPopover from '@components/forecast/ForecastPopover/ForecastPopover'
import {startCycleForecastTimer} from '@store/actions'

type Props = {
  classes: any,
  dispatch: any,
  forecasts: Array<ForecastData>,
  cycleInterval: number,
  crossFadeDuration: number,
  activeCycleForecastId: ?number // redux
}
// type State = {
//   forecasts: Array<ForecastData>,
// }

const styles: StyleRulesCallback = {
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

const ForecastCycle = ({
  classes,
  dispatch,
  forecasts,
  cycleInterval,
  crossFadeDuration,
  activeCycleForecastId
}: Props) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [transitionEnter, setTransitionEnter] = useState(false)

  useEffect(() => {
    if (!forecasts || forecasts.length === 0 || !cycleInterval) {
      return
    }
    dispatch(startCycleForecastTimer(forecasts, cycleInterval))
    // Shorten the "Enter" transition during first enter (every page load). See below.
    if (!transitionEnter) {
      setTransitionEnter(true)
    }
  }, [forecasts, dispatch, cycleInterval, transitionEnter])

  const activeForecast = useCallback(
    () => forecasts.find((forecast) => forecast.id === activeCycleForecastId),
    [forecasts, activeCycleForecastId]
  )

  const handlePopoverOpen = useCallback((event) => {
    setAnchorEl(event.currentTarget)
  }, [])

  const handlePopoverClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const forecast = activeForecast() || {}
  const open = Boolean(anchorEl)
  return (
    <div
      aria-owns={open ? 'forecast-popover' : undefined}
      aria-haspopup="true"
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
    >
      <ReactCSSTransitionReplace
        className={classes.trans}
        transitionName="cross-fade"
        transitionEnterTimeout={
          !transitionEnter ? crossFadeDuration * 0.2 : crossFadeDuration
        }
        transitionLeaveTimeout={crossFadeDuration}
      >
        <ForecastDisplay key={forecast.id} forecast={forecast} />
      </ReactCSSTransitionReplace>
      <ForecastPopover
        anchorEl={anchorEl}
        onPopoverClose={handlePopoverClose}
      />
    </div>
  )
}

const mapStateToProps = (state) => ({
  activeCycleForecastId: state.forecast.activeCycleForecastId
})

ForecastCycle.defaultProps = {
  forecasts: [],
  cycleInterval: 1000 * 10, // 10 seconds
  crossFadeDuration: 1000 * 1 // 1 seconds
}

export default connect(mapStateToProps)(withStyles(styles)(ForecastCycle))
