import React from 'react'
import {makeStyles} from '@material-ui/styles'
import {Hidden, Toolbar} from '@material-ui/core'
import FacebookIcon from 'mdi-material-ui/Facebook'
import TwitterIcon from 'mdi-material-ui/Twitter'
import YoutubeIcon from 'mdi-material-ui/Youtube'
import SocialIconButton from './SocialIconButton'
import ENewsButton from '@components/eNews/ENewsButton/ENewsButton'
import EspanolButton from '@components/EspanolButton/EspanolButton'
import SearchInput from '@components/search/SearchInput/SearchInput'
import GlowButton from '@components/GlowButton/GlowButton'
import NextGlowButton from '@components/NextGlowButton/NextGlowButton'
// import dynamic from 'next/dynamic'
import ForecastContainer from '@components/ForecastContainer/ForecastContainer'
import {RowBox} from '@components/boxes/FlexBox'

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
  grow: {
    flexGrow: 1
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexGrow: 1,
    overflowX: 'hidden'
  },
  socialIconContainer: {
    flex: '0 0 auto'
  },
  // Custom width defined by point at which menu links overlap each other.
  '@media screen and (max-width: 690px)': {
    socialIconContainer: {
      display: 'none'
    }
  }
})

const SecondaryHeader = () => {
  const classes = useStyles()
  return (
    <RowBox justifyContent="flex-start" alignItems="center">
      <Toolbar variant="dense" className={classes.toolbar}>
        {/* Don't use CSS implementation of hide cause it will allow and trigger Forecast timers and fetch requests on mobile devices that won't display Forecast. */}
        <Hidden smDown implementation="js">
          {/* <DynamicForecast /> */}
          <ForecastContainer />
        </Hidden>
        <span className={classes.grow} />
        <NextGlowButton aria-label="Link" color="primary" size="small" href="#">
          Outages
        </NextGlowButton>
        <ENewsButton size="small">E-News</ENewsButton>
        <NextGlowButton
          size="small"
          aria-label="Link"
          color="primary"
          href="/about-pcwa/board-agenda"
        >
          Board Meetings
        </NextGlowButton>
        <GlowButton
          size="small"
          aria-label="Link"
          color="primary"
          href="https://ipn.paymentus.com/cp/plco"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pay My Bill
        </GlowButton>
        <div className={classes.socialIconContainer}>
          <SocialIconButton href="https://twitter.com/PlacerWater">
            <FacebookIcon />
          </SocialIconButton>
          <SocialIconButton href="https://www.facebook.com/ThePCWA">
            <TwitterIcon />
          </SocialIconButton>
          <SocialIconButton href="https://www.youtube.com/user/ThePCWA">
            <YoutubeIcon />
          </SocialIconButton>
        </div>
        <EspanolButton>Español</EspanolButton>
        <SearchInput />
      </Toolbar>
    </RowBox>
  )
}

export default SecondaryHeader
