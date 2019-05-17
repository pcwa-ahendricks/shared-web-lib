import React, {useState, useEffect, useCallback, useMemo} from 'react'
import ForecastDisplay, {
  ForecastData
} from '@components/forecast/ForecastDisplay/ForecastDisplay'
import ReactCSSTransitionReplace from 'react-css-transition-replace'
import {makeStyles} from '@material-ui/styles'
import ForecastPopover from '@components/forecast/ForecastPopover/ForecastPopover'
import {startCycleForecastTimer} from '@store/actions'
import {State} from '@store/index'
import {useDispatch, useMappedState} from 'redux-react-hook'

type Props = {
  cycleInterval?: number
  crossFadeDuration?: number
  forecasts?: ForecastData[]
}
// type State = {
//   forecasts: Array<ForecastData>,
// }

const useStyles = makeStyles({
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
})

const ForecastCycle = ({
  forecasts = [],
  cycleInterval = 1000 * 10, // 10 seconds
  crossFadeDuration = 1000 * 1 // 1 second
}: Props) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [transitionEnter, setTransitionEnter] = useState<boolean>(false)

  const forecastState = useCallback(
    (state: State) => ({
      activeCycleForecastId: state.forecast.activeCycleForecastId
    }),
    []
  )
  const {activeCycleForecastId} = useMappedState(forecastState)
  const dispatch = useDispatch()

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

  const forecast = activeForecast()
  const open = Boolean(anchorEl)

  const forecastDisplay = useMemo(
    () =>
      forecast && forecast.id ? (
        <ForecastDisplay key={forecast.id} forecast={forecast} />
      ) : null,
    [forecast]
  )
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
        {forecastDisplay}
      </ReactCSSTransitionReplace>
      <ForecastPopover
        anchorEl={anchorEl ? anchorEl : undefined} // Ternary is just for typechecking.
        onPopoverClose={handlePopoverClose}
      />
    </div>
  )
}

export default ForecastCycle
