// cspell:ignore bgcolor
import React from 'react'
import {
  Box,
  ButtonBase,
  Divider,
  Link,
  Theme,
  Typography as Type,
  useMediaQuery
} from '@material-ui/core'
import {createStyles, makeStyles, useTheme} from '@material-ui/styles'
import NextLink from '@components/NextLink/NextLink'
import WideContainer from '@components/containers/WideContainer'
import {RowBox, ColumnBox, RespRowBox} from '@components/boxes/FlexBox'
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
import GlowGreen from '@components/GlowGreen/GlowGreen'
import MainPhone from '@components/links/MainPhone'

const useFooterStyles = makeStyles((theme: Theme) =>
  createStyles({
    subtle: {
      color: theme.palette.grey[500],
      fontSize: '0.9rem'
    },
    link: {
      color: theme.palette.grey[200],
      fontSize: '0.9rem'
    }
  })
)

const useDividerStyles = makeStyles((theme: Theme) =>
  createStyles({
    subtleDivider: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      backgroundColor: theme.palette.grey[600],
      opacity: 0.4,
      width: '80%'
    }
    // [theme.breakpoints.only('xs')]: {
    //   subtleDivider: {
    //     width: '100%'
    //   }
    // }
  })
)

const SubtleDivider = () => {
  const classes = useDividerStyles()
  return <Divider className={classes.subtleDivider} />
}

const Footer = () => {
  const classes = useFooterStyles()
  const theme = useTheme<Theme>()
  const isXS = useMediaQuery(theme.breakpoints.only('xs'))

  return (
    <Box>
      <Box bgcolor={theme.palette.primary.main} color={theme.palette.grey[200]}>
        <WideContainer mt={4} mb={4}>
          <RespRowBox
            bgcolor="inherit"
            alignItems={{xs: 'center', sm: 'stretch'}} // IE doesn't like 'initial'
          >
            <Box flex={{xs: '0 0 auto', sm: '1 1 25%'}}>
              <PcwaLogo
                preserveAspectRatio={isXS ? 'xMidYMin meet' : 'xMinYMin meet'}
                height="100%"
                // Setting max width/height prevents strange jank'ing when toolbar variant changes.
                style={{
                  maxWidth: theme.spacing(22),
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
                <Box color={theme.palette.grey[300]}>
                  <MapIcon fontSize="small" />
                </Box>
                <Box ml={1}>
                  <GlowGreen>
                    <NextLink
                      variant="body2"
                      color="inherit"
                      href="/about-pcwa/directions"
                      gutterBottom
                      underline="none"
                    >
                      144 Ferguson Road <br />
                      P.O. Box 6570 <br />
                      Auburn, CA 95604
                    </NextLink>
                  </GlowGreen>
                  <Type variant="body2">Mon. - Fri., 8 am – 5 pm </Type>
                </Box>
              </RowBox>
              <RowBox mt={3}>
                <Box color={theme.palette.grey[300]}>
                  <PhoneIcon fontSize="small" />
                </Box>
                <Box ml={1}>
                  <GlowGreen>
                    <MainPhone
                      color="inherit"
                      variant="body2"
                      gutterBottom
                      underline="none"
                    />
                  </GlowGreen>
                  <Type variant="body2">Mon. - Fri., 9 am – 5 pm</Type>
                </Box>
              </RowBox>
            </ColumnBox>
            <ColumnBox
              width="100%"
              ml={{xs: 0, sm: 2}}
              mt={{xs: 4, sm: 0}}
              flex={{xs: '0 0 auto', sm: '1 1 25%'}}
              alignItems="center"
            >
              <GlowGreen>
                <ButtonBase>
                  <ColumnBox>
                    <Box>
                      <WaterIcon />
                    </Box>
                    <Type variant="body1">Report Water Waste</Type>
                  </ColumnBox>
                </ButtonBase>
              </GlowGreen>
              <SubtleDivider />

              <GlowGreen>
                <ButtonBase>
                  <ColumnBox>
                    <Box>
                      <ChatIcon />
                    </Box>
                    <Type>Contact Us</Type>
                  </ColumnBox>
                </ButtonBase>
              </GlowGreen>
              <SubtleDivider />
              <GlowGreen>
                <ButtonBase>
                  <ColumnBox>
                    <Box>
                      <EmailIcon />
                    </Box>
                    <Type>Subscribe to E-News</Type>
                  </ColumnBox>
                </ButtonBase>
              </GlowGreen>
            </ColumnBox>
            <ColumnBox
              width="100%"
              ml={{xs: 0, sm: 2}}
              mt={{xs: 4, sm: 0}}
              flex={{xs: '0 0 auto', sm: '1 1 25%'}}
              alignItems="center"
            >
              <Type variant="body2" color="inherit">
                Also on
              </Type>
              <RowBox>
                <GlowGreen>
                  <SocialIconButton
                    href="https://twitter.com/PlacerWater"
                    color="inherit"
                  >
                    <FacebookIcon fontSize="large" />
                  </SocialIconButton>
                </GlowGreen>
                <GlowGreen>
                  <SocialIconButton
                    href="https://www.facebook.com/ThePCWA"
                    color="inherit"
                  >
                    <TwitterIcon fontSize="large" />
                  </SocialIconButton>
                </GlowGreen>
                <GlowGreen>
                  <SocialIconButton
                    href="https://www.youtube.com/user/ThePCWA"
                    color="inherit"
                  >
                    <YoutubeIcon fontSize="large" />
                  </SocialIconButton>
                </GlowGreen>
              </RowBox>
            </ColumnBox>
          </RespRowBox>
        </WideContainer>
      </Box>
      <Box bgcolor={theme.palette.primary.dark}>
        <WideContainer mt={3} mb={3}>
          <Box bgcolor="inherit">
            <Type variant="body2" component="span" className={classes.subtle}>
              Copyright &copy; 2019
            </Type>
            <NextLink href="/" className={classes.link}>
              &nbsp;&nbsp;Placer County Water Agency
            </NextLink>
            <Type variant="body2" component="span" className={classes.subtle}>
              &nbsp;&nbsp;All Rights
              Reserved&nbsp;&nbsp;&#9830;&nbsp;&nbsp;Weather Provided by
            </Type>
            <Link
              variant="body2"
              className={classes.link}
              href="https://darksky.net/poweredby"
              target="_blank"
              rel="noopener noreferrer"
            >
              &nbsp;Dark Sky
            </Link>
          </Box>
        </WideContainer>
      </Box>
    </Box>
  )
}

export default Footer
