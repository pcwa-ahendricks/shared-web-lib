import React, {useCallback, useContext} from 'react'
import {
  Box,
  Hidden,
  Toolbar,
  Theme,
  useMediaQuery,
  makeStyles,
  useTheme
} from '@material-ui/core'
import FacebookIcon from 'mdi-material-ui/Facebook'
import TwitterIcon from 'mdi-material-ui/Twitter'
import YoutubeIcon from 'mdi-material-ui/Youtube'
import SocialIconButton from '@components/SocialIconButton/SocialIconButton'
import ENewsButton from '@components/eNews/ENewsButton/ENewsButton'
import EspanolButton from '@components/EspanolButton/EspanolButton'
import SearchInput from '@components/search/SearchInput/SearchInput'
import GlowButton from '@components/GlowButton/GlowButton'
import NextGlowButton from '@components/NextGlowButton/NextGlowButton'
// import dynamic from 'next/dynamic'
import ForecastContainer from '@components/ForecastContainer/ForecastContainer'
import {
  setEnewsDialogOpen,
  NewsroomContext
} from '@components/newsroom/NewsroomStore'

// const DynamicForecast = dynamic(
//   import('@components/ForecastContainer/ForecastContainer'),
//   {
//     /* eslint-disable-next-line react/display-name */
//     loading: () => (
//       <CircularProgress size={20} disableShrink={true} color="secondary" />
//     )
//   }
// )

// Be careful not to break <ReactCSSTransitionReplace/> with Flex layouts, hence forecastContainer with fixed width. Pixel units and % will work, 'auto' and vw units will not.
const useStyles = makeStyles({
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexGrow: 1,
    overflowX: 'hidden'
  }
})

const SecondaryHeader = () => {
  const classes = useStyles()
  const theme = useTheme<Theme>()
  // Custom width defined by point at which menu links overlap each other.
  const noSocialIcons = useMediaQuery('@media screen and (max-width: 690px)')
  const newsroomContext = useContext(NewsroomContext)
  const newsroomDispatch = newsroomContext.dispatch

  const subscribeEnewsHandler = useCallback(() => {
    newsroomDispatch(setEnewsDialogOpen(true))
  }, [newsroomDispatch])

  return (
    <Toolbar variant="dense" className={classes.toolbar}>
      {/* Don't use CSS implementation of hide cause it will allow and trigger Forecast timers and fetch requests on mobile devices that won't display Forecast. */}
      <Hidden smDown implementation="js">
        {/* <DynamicForecast /> */}
        <ForecastContainer />
      </Hidden>
      <Box component="span" flexGrow={1} />
      <NextGlowButton aria-label="Link" size="small" href="/services/outage">
        Outages
      </NextGlowButton>
      <ENewsButton size="small" onClick={subscribeEnewsHandler}>
        E-News
      </ENewsButton>
      <NextGlowButton
        size="small"
        aria-label="Link"
        href="/board-of-directors/meeting-agendas"
      >
        Board Meetings
      </NextGlowButton>
      <GlowButton
        size="small"
        aria-label="Link"
        href="https://ipn.paymentus.com/cp/plco"
        target="_blank"
        rel="noopener noreferrer"
      >
        Pay My Bill
      </GlowButton>
      <Box
        flex="0 0 auto"
        color={theme.palette.primary.main}
        display={noSocialIcons ? 'none' : 'block'} // IE doesn't like 'initial'
      >
        <SocialIconButton href="https://twitter.com/PlacerWater">
          <TwitterIcon />
        </SocialIconButton>
        <SocialIconButton href="https://www.facebook.com/ThePCWA">
          <FacebookIcon />
        </SocialIconButton>
        <SocialIconButton href="https://www.youtube.com/user/ThePCWA">
          <YoutubeIcon />
        </SocialIconButton>
      </Box>
      <EspanolButton>Español</EspanolButton>
      <SearchInput />
    </Toolbar>
  )
}

export default SecondaryHeader
