// @flow

import React, {useState, useEffect} from 'react'
import ReactAnimatedWeather from 'react-animated-weather'
import {withTheme, withStyles} from '@material-ui/core/styles'
import {Link, Popover, Typography as Type} from '@material-ui/core'

const DARKSKY_BG_COLOR = '#313134'

type Props = {
  forecast: ForecastData,
  theme: any,
  classes: any
}

export type Location = {
  id: number,
  title: string,
  queryParams: {
    lat: number,
    lng: number
  }
}

export type ForecastData = {
  id: number,
  title: string,
  data: any
}

const styles = (theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    cursor: 'pointer'
  },
  forecastType: {
    paddingLeft: 5,
    fontWeight: 'bold'
  },
  popover: {
    pointerEvents: 'none'
  },
  paper: {
    padding: theme.spacing.unit,
    backgroundColor: DARKSKY_BG_COLOR
  },
  popoverContent: {
    width: 150,
    height: 20,
    background: {
      image: 'url(./static/images/darksky/poweredby-oneline-dark-300.png)',
      repeat: 'no-repeat',
      position: 'center',
      size: 'cover'
    }
  }
})

const defaults = {
  icon: 'CLEAR_DAY',
  color: 'black',
  size: 25,
  animate: true
}

// const handleClick = (evt, f) => {
//   const url = darkSkyHref(f)
//   openInNewTab(url)
// }

const getDarkSkyHref = (lngLat: [number, number]): string =>
  `https://darksky.net/forecast/${lngLat[1]},${lngLat[0]}/us12/en`

const Forecast = ({forecast, theme, classes}: Props) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [darkSkyHref, setDarkSkyHref] = useState('#')
  useEffect(
    () => {
      const {latitude, longitude} = forecast.data || {}
      if (latitude && longitude) {
        setDarkSkyHref(getDarkSkyHref([longitude, latitude]))
      } else {
        setDarkSkyHref('#')
      }
    },
    [forecast]
  )

  const {temperature, icon = defaults.icon} =
    (forecast && forecast.data && forecast.data.currently) || {}
  // The icon names returned from API do not match the icon names expected as props for <ReactAnimatedWeather/>. The icon names should be uppercase and should use underscores over dashes.
  const iconName = icon.toUpperCase().replace(/-/g, '_')
  const validForecast = (): boolean => {
    return forecast && forecast.data && forecast.data.currently
  }

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  return validForecast() ? (
    <React.Fragment>
      <div
        className={classes.container}
        // onClick={(evt) => handleClick(evt, forecast.data)}
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <ReactAnimatedWeather
          icon={iconName}
          color={theme.palette.primary.main || defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        />
        <Type variant="subtitle1" className={classes.forecastType}>
          <Link
            target="_blank"
            rel="noreferrer"
            href={darkSkyHref}
            underline="none"
          >{`${parseInt(temperature, 10)}° ${forecast.title} `}</Link>
        </Type>
      </div>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 30,
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <div className={classes.popoverContent} />
      </Popover>
    </React.Fragment>
  ) : null
}

Forecast.defaultProps = {
  forecast: {
    data: {
      currently: null
    }
  }
}

export default withTheme()(withStyles(styles)(Forecast))
