// @flow
import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import {Hidden, Toolbar} from '@material-ui/core'
import FacebookIcon from 'mdi-material-ui/Facebook'
import TwitterIcon from 'mdi-material-ui/Twitter'
import YoutubeIcon from 'mdi-material-ui/Youtube'
import SocialIconButton from './SocialIconButton'
import ENewsButton from '../eNews/ENewsButton/ENewsButton'
import EspanolButton from '../EspanolButton/EspanolButton'
import SearchInput from '../search/SearchInput/SearchInput'
import GlowButton, {NextGlowButton} from '../GlowButton/GlowButton'
import dynamic from 'next/dynamic'

const DynamicForecast = dynamic(
  import('../ForecastContainer/ForecastContainer')
)

type Props = {
  classes: any
}

// Be careful not to break <ReactCSSTransitionReplace/> with Flex layouts, hence forecastContainer with fixed width. Pixel units and % will work, 'auto' and vw units will not.
const styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
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
}

const SecondaryHeader = ({classes}: Props) => {
  return (
    <div className={classes.root}>
      <Toolbar variant="dense" className={classes.toolbar}>
        {/* Don't use CSS implementation of hide cause it will allow and trigger Forecast timers and fetch requests on mobile devices that won't display Forecast. */}
        <Hidden smDown implementation="js">
          <DynamicForecast />
        </Hidden>
        <span className={classes.grow} />
        <NextGlowButton aria-label="Link" color="primary" size="small" href="#">
          Outages
        </NextGlowButton>
        <ENewsButton size="small">E-News</ENewsButton>
        <NextGlowButton
          aria-label="Link"
          color="primary"
          size="small"
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
    </div>
  )
}

export default withStyles(styles)(SecondaryHeader)
