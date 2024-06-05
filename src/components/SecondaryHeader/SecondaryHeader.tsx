import React, {useCallback, useContext} from 'react'
import {
  Box,
  Toolbar,
  Theme,
  useMediaQuery, // Typography as Type,
  useTheme
} from '@mui/material'
import FacebookIcon from 'mdi-material-ui/Facebook'
import TwitterIcon from 'mdi-material-ui/Twitter'
import YoutubeIcon from 'mdi-material-ui/Youtube'
import SocialIconButton from '@components/SocialIconButton/SocialIconButton'
import ENewsButton from '@components/eNews/ENewsButton/ENewsButton'
// import EspanolButton from '@components/EspanolButton/EspanolButton'
import SearchInput from '@components/search/SearchInput/SearchInput'
import GlowButton from '@components/GlowButton/GlowButton'
// import NextGlowButton from '@components/NextGlowButton/NextGlowButton'
// import dynamic from 'next/dynamic'
import ForecastContainer from '@components/ForecastContainer/ForecastContainer'
import {
  setEnewsDialogOpen,
  NewsroomContext
} from '@components/newsroom/NewsroomStore'

const SecondaryHeader = () => {
  const theme = useTheme<Theme>()
  // Custom width defined by point at which menu links overlap each other.
  const noSocialIcons = useMediaQuery('@media screen and (max-width: 690px)')
  const newsroomContext = useContext(NewsroomContext)
  const newsroomDispatch = newsroomContext.dispatch
  const isSMUp = useMediaQuery(theme.breakpoints.up('sm'))

  const subscribeEnewsHandler = useCallback(() => {
    newsroomDispatch(setEnewsDialogOpen(true))
  }, [newsroomDispatch])

  return (
    <Toolbar
      variant="dense"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexGrow: 1,
        overflowX: 'hidden'
      }}
    >
      {/* Don't use CSS implementation of <Hidden/> cause it will allow and trigger Forecast timers and fetch requests on mobile devices that won't display Forecast. */}
      <ForecastContainer width={155} overflow="hidden" />
      {/* <NextGlowButton
        size="small"
        aria-label="Link"
        href="/services/annual-canal-survey"
      >
        <Type variant="inherit" className={classes.survey} sx={{
          color: theme.palette.secondary.dark,
          fontWeight: 600,
          fontSize: '0.9rem',
          paddingLeft: '16px'
        }}>
          Canal Survey
        </Type>
      </NextGlowButton> */}
      <Box component="span" flexGrow={1} />
      {/* <NextGlowButton aria-label="Link" size="small" href="/services/outage">
        Outages
      </NextGlowButton> */}
      {/* <NextGlowButton
        size="small"
        aria-label="Board Meeting Agendas Link"
        href="/board-of-directors/meeting-agendas"
      >
        Board Meetings
      </NextGlowButton> */}
      {/* <GlowButton
        size="small"
        aria-label="New Customer Service Portal"
        href="/newsroom/new-customer-service-portal-2024"
        sx={{color: red['700']}}
      >
        <em>New Customer Service Portal</em>
      </GlowButton> */}
      <GlowButton
        size="small"
        aria-label="Paymentus web payment link"
        href="https://ipn.paymentus.com/cp/plco"
        target="_blank"
        rel="noopener noreferrer"
      >
        Pay My Bill
      </GlowButton>
      <ENewsButton size="small" onClick={subscribeEnewsHandler}>
        E-News
      </ENewsButton>
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
      {/* <EspanolButton>Español</EspanolButton> */}
      {isSMUp ? <SearchInput /> : null}
    </Toolbar>
  )
}

export default SecondaryHeader
