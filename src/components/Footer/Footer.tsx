// cspell:ignore bgcolor
import React, {useCallback, useContext} from 'react'
import Link from '@components/Link'
import {
  Box,
  ButtonBase,
  Divider,
  SxProps,
  Theme,
  Typography as Type,
  useMediaQuery,
  useTheme
} from '@mui/material'
import WideContainer from '@components/containers/WideContainer'
import {RowBox, ColumnBox} from '@components/MuiSleazebox'
import PcwaLogo from '@components/PcwaLogo/PcwaLogo'
import FacebookIcon from 'mdi-material-ui/Facebook'
import TwitterIcon from 'mdi-material-ui/Twitter'
import YoutubeIcon from 'mdi-material-ui/Youtube'
import SocialIconButton from '@components/SocialIconButton/SocialIconButton'
import WaterIcon from 'mdi-material-ui/WaterOutline'
import ChatIcon from 'mdi-material-ui/ChatOutline'
import EmailIcon from 'mdi-material-ui/EmailOutline'
import MapIcon from 'mdi-material-ui/MapMarkerOutline'
import PhoneIcon from 'mdi-material-ui/PhoneOutline'
import {GlowLightGreen} from '@components/GlowGreen/GlowGreen'
import MainPhone from '@components/links/MainPhone'
import WeatherIcon from '@components/WeatherIcon/WeatherIcon'
import {
  NewsroomContext,
  setEnewsDialogOpen
} from '@components/newsroom/NewsroomStore'
import styles from './Footer.module.css'

const SubtleDivider = () => {
  const theme = useTheme<Theme>()
  return (
    <Divider
      sx={{
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        backgroundColor: theme.palette.grey[600],
        opacity: 0.4,
        width: '80%'
      }}
    />
  )
}

const Footer = () => {
  const theme = useTheme()
  const isXS = useMediaQuery(theme.breakpoints.only('xs'))
  const newsroomContext = useContext(NewsroomContext)
  const newsroomDispatch = newsroomContext.dispatch

  const subscribeEnewsHandler = useCallback(() => {
    newsroomDispatch(setEnewsDialogOpen(true))
  }, [newsroomDispatch])

  const style = {
    subtle: {
      color: theme.palette.grey[400],
      fontSize: '0.9rem'
    } as SxProps<Theme>,
    link: {
      color: theme.palette.grey[200]
    } as SxProps<Theme>,
    weatherIcon: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      fontSize: '1rem'
    } as SxProps<Theme>
  }

  return (
    <Box>
      <Box bgcolor={theme.palette.primary.main} color={theme.palette.grey[200]}>
        <WideContainer mt={4} mb={4}>
          <RowBox
            responsive
            bgcolor="inherit"
            sx={{
              [theme.breakpoints.only('xs')]: {
                alignItems: 'center'
              },
              [theme.breakpoints.up('sm')]: {
                alignItems: 'stretch' // IE doesn't like 'initial'
              }
            }}
          >
            <Box flex={{xs: '0 0 auto', sm: '1 1 25%'}}>
              <PcwaLogo
                preserveAspectRatio={isXS ? 'xMidYMin meet' : 'xMinYMin meet'}
                height="100%"
                // Setting max width/height prevents strange jank'ing when toolbar variant changes.
                sx={{
                  maxWidth: 175,
                  width: '100%'
                }}
                missionStatementFill="rgba(0,0,0,0)"
                brandFill={theme.palette.grey[200]}
                logoLeftFill={theme.palette.grey[200]}
                logoRightFill={theme.palette.grey[300]}
              />
            </Box>
            <ColumnBox
              ml={{xs: 0, sm: 2}}
              mt={{xs: 4, sm: 0}}
              flex={{xs: '0 0 auto', sm: '1 1 25%'}}
            >
              <RowBox>
                <MapIcon
                  // fontSize="small"
                  sx={{
                    color: 'grey.300',
                    paddingTop: '4px'
                  }}
                />
                <Box ml={1}>
                  <GlowLightGreen>
                    <Link
                      display="inline-block" // fix anchor line spacing
                      variant="body2"
                      color="inherit"
                      href="/about-pcwa/directions"
                      underline="none"
                    >
                      144 Ferguson Road <br />
                      P.O. Box 6570 <br />
                      Auburn, CA 95604
                    </Link>
                  </GlowLightGreen>
                  <Type variant="body2">Mon. - Thurs., 8am - 5pm</Type>
                </Box>
              </RowBox>
              <RowBox mt={3}>
                <PhoneIcon
                  // fontSize="small"
                  sx={{
                    color: 'grey.300',
                    paddingTop: '6px'
                  }}
                />
                <Box ml={1}>
                  <GlowLightGreen>
                    <MainPhone
                      color="inherit"
                      variant="body2"
                      gutterBottom
                      underline="none"
                    />
                  </GlowLightGreen>
                  <Type variant="body2">Mon. - Thurs., 8am - 5:30pm</Type>
                  <Type variant="body2">Fri., 8am - 5pm</Type>
                </Box>
              </RowBox>
            </ColumnBox>
            <ColumnBox
              width="100%"
              ml={{xs: 0, sm: 2}}
              mt={{xs: 4, sm: 0}}
              flex={{xs: '0 0 auto', sm: '1 1 25%'}}
              sx={{
                alignItems: 'center',
                color: 'grey.200'
              }}
            >
              <GlowLightGreen>
                <Link
                  href="/report-water-waste"
                  sx={{
                    color: 'inherit'
                  }}
                >
                  <ButtonBase>
                    <Box display="flex" flexDirection="column">
                      <Box>
                        <WaterIcon />
                      </Box>
                      <Type variant="body1" sx={{color: 'inherit'}}>
                        Report Water Waste
                      </Type>
                    </Box>
                  </ButtonBase>
                </Link>
              </GlowLightGreen>

              <SubtleDivider />

              <GlowLightGreen>
                <Link
                  href="/contact-us"
                  sx={{
                    color: 'inherit'
                  }}
                >
                  <ButtonBase>
                    <Box display="flex" flexDirection="column">
                      <Box>
                        <ChatIcon />
                      </Box>
                      <Type>Contact Us</Type>
                    </Box>
                  </ButtonBase>
                </Link>
              </GlowLightGreen>

              <SubtleDivider />

              <GlowLightGreen>
                <ButtonBase onClick={subscribeEnewsHandler}>
                  <Box display="flex" flexDirection="column">
                    <Box>
                      <EmailIcon />
                    </Box>
                    <Type>Subscribe to E-News</Type>
                  </Box>
                </ButtonBase>
              </GlowLightGreen>
            </ColumnBox>
            <ColumnBox
              width="100%"
              ml={{xs: 0, sm: 2}}
              mt={{xs: 4, sm: 0}}
              flex={{xs: '0 0 auto', sm: '1 1 25%'}}
              sx={{
                alignItems: 'center'
              }}
            >
              <Type variant="body2" color="inherit">
                Also on
              </Type>
              <RowBox>
                <GlowLightGreen>
                  <SocialIconButton
                    href="https://twitter.com/PlacerWater"
                    color="inherit"
                  >
                    <TwitterIcon fontSize="large" />
                  </SocialIconButton>
                </GlowLightGreen>
                <GlowLightGreen>
                  <SocialIconButton
                    href="https://www.facebook.com/ThePCWA"
                    color="inherit"
                  >
                    <FacebookIcon fontSize="large" />
                  </SocialIconButton>
                </GlowLightGreen>
                <GlowLightGreen>
                  <SocialIconButton
                    href="https://www.youtube.com/user/ThePCWA"
                    color="inherit"
                  >
                    <YoutubeIcon fontSize="large" />
                  </SocialIconButton>
                </GlowLightGreen>
              </RowBox>
            </ColumnBox>
          </RowBox>
        </WideContainer>
      </Box>
      <Box bgcolor={theme.palette.primary.dark}>
        <WideContainer mt={3} mb={3}>
          <Box bgcolor="inherit" sx={{fontSize: '0.9rem'}}>
            <Type
              variant="body2"
              component="span"
              classes={{body2: styles.copyright}}
              sx={{...style.subtle, fontSize: 'inherit'}}
            >
              Copyright &copy; 2023
            </Type>{' '}
            <Link
              variant="body2"
              sx={{...style.link}}
              TypographyClasses={{
                body2: styles.copyright
              }}
              classes={{root: styles.copyright}}
              href="/"
              underline="hover"
            >
              Placer County Water Agency
            </Link>{' '}
            <Type
              variant="body2"
              component="span"
              classes={{body2: styles.copyright}}
              sx={{...style.subtle}}
            >
              All Rights Reserved
              <WeatherIcon
                name="cloud"
                fontSize="small"
                sx={{...style.weatherIcon}}
              />
              Weather Provided by
            </Type>{' '}
            <Link
              variant="body2"
              TypographyClasses={{
                body2: styles.copyright
              }}
              classes={{root: styles.copyright}}
              sx={{...style.link}}
              href="https://openweathermap.org/"
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
            >
              OpenWeather
            </Link>
          </Box>
        </WideContainer>
      </Box>
    </Box>
  )
}

export default Footer
