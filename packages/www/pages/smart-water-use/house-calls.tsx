import React from 'react'
import {useMediaQuery, Box, Typography as Type} from '@material-ui/core'
import {useTheme, createStyles, makeStyles} from '@material-ui/core/styles'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import PageTitle from '@components/PageTitle/PageTitle'
// import {RespRowBox, ChildBox, ColumnBox} from '@components/boxes/FlexBox'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import FlexBox, {RespRowBox, ChildBox} from '@components/boxes/FlexBox'
import Spacing from '@components/boxes/Spacing'
import MainPhone from '@components/links/MainPhone'
import {TypographyProps} from '@material-ui/core/Typography'
import ResponsiveYouTubePlayer from '@components/ResponsiveYouTubePlayer/ResponsiveYouTubePlayer'
// import MuiNextLink from '@components/NextLink/NextLink'
// import Imgix from 'react-imgix'

const useStyles = makeStyles(() =>
  createStyles({
    bulletLi: {
      listStyleType: 'circle',
      marginBottom: 2
    }
  })
)

const HouseCallsPage = () => {
  const classes = useStyles()
  const theme = useTheme()
  const isMDUp = useMediaQuery(theme.breakpoints.up('md'))

  const TypeBullet = ({children}: TypographyProps) => {
    return (
      <Type component="li" className={classes.bulletLi}>
        {children}
      </Type>
    )
  }

  return (
    <PageLayout
      title="House Calls"
      bannerComponent={
        <FlexBox>
          <Box
            m="auto"
            width="100%" // Setting width makes the image re-expand when window width resizes to a larger width from a smaller narrow width.
            maxWidth={1400}
            height={{xs: 250, sm: 350}} // Original Photo is not very tall, so special treatment is given on smaller devices. 'objectFit' is also toggled to help with image display.
            overflow="hidden"
            position="relative"
          >
            <LazyImgix
              src="https://cosmic-s3.imgix.net/8853bb00-c44f-11e9-8ec5-f7161a5df0bf-WaterWiseBusinessCallTeamfor-webpage.jpg"
              htmlAttributes={{
                alt: 'PCWA Water Efficiency Team',
                style: {
                  objectPosition: 'center 30%',
                  objectFit: isMDUp ? 'none' : 'cover', // Original Photo is not very tall, so special treatment is given on smaller devices. Container height is also toggled to help with image display.
                  width: '100%',
                  height: '100%'
                }
              }}
            />
          </Box>
          {/* <Box
          m="auto"
          width="100%" // Setting width makes the image re-expand when window width resizes to a larger width from a smaller narrow width.
          maxWidth={1400}
          maxHeight={350}
          overflow="hidden"
        >
          <LazyImgix
            src="https://cosmic-s3.imgix.net/8853bb00-c44f-11e9-8ec5-f7161a5df0bf-WaterWiseBusinessCallTeamfor-webpage.jpg"
            htmlAttributes={{
              alt: 'PCWA Water Efficiency Team',
              style: {width: '100%'}
            }}
          />
        </Box> */}
        </FlexBox>
      }
    >
      <MainBox>
        <WideContainer>
          <PageTitle title="We Make House Calls!" subtitle="Smart Water Use" />
          <Spacing />
          <Type variant="h3" component="em" color="primary">
            Schedule a Water Wise House Call or Business Call Today
          </Type>
          <Spacing />
          <RespRowBox flexSpacing={6}>
            <ChildBox flex="60%">
              <Type paragraph>
                Worried you might have a leak? Want to find ways to use water
                more efficiently at home or work? Interested in learning more
                about money- and water-saving rebates available from PCWA? Set
                up your complimentary Water Wise House Call or Business Call
                today! A trained water efficiency professional will visit your
                home or business to:
              </Type>
              <ul>
                <TypeBullet>
                  Review your sprinkler system and provide watering suggestions
                </TypeBullet>
                <TypeBullet>
                  Survey your landscape for watering problems and sprinkler
                  issues
                </TypeBullet>
                <TypeBullet>
                  Develop a custom watering schedule for your yard
                </TypeBullet>
                <TypeBullet>
                  Demonstrate how to check your toilets for leaks
                </TypeBullet>
                <TypeBullet>
                  Explain how to read your meter so you can monitor for leaks
                </TypeBullet>
                <TypeBullet>
                  Provide tips and suggestions to help you avoid high water
                  bills
                </TypeBullet>
                <TypeBullet>
                  Identify rebates perfect for your home and business
                </TypeBullet>
                <TypeBullet>And more!</TypeBullet>
              </ul>
              <Type paragraph>
                Water Wise House Calls or Business Calls are offered Monday
                through Friday and typically last about an hour. Schedule yours
                today by calling PCWA Customer Services at <MainPhone />.
              </Type>
            </ChildBox>
            <ChildBox flex="40%" display="flex">
              {/* <ChildBox
                mx="auto"
                width={{xs: '70vw', sm: 'inherit'}} // Don't let portrait image get too big in small layouts.
              >
                <LazyImgix
                  src="https://cosmic-s3.imgix.net/e62faff0-c430-11e9-b25b-79fa6aa7c400-Mychel-Teater-adjusting-sprinkler.tif"
                  htmlAttributes={{
                    alt: 'Meter Efficiency Technician adjusting sprinkler',
                    style: {width: '100%'}
                  }}
                />
              </ChildBox> */}

              <Box maxWidth={700} mx="auto" width="100%">
                <ResponsiveYouTubePlayer
                  controls
                  url="https://www.youtube.com/watch?v=hvWbNsKzd2U"
                  config={{
                    youtube: {
                      playerVars: {showinfo: 1}
                    }
                  }}
                />
              </Box>
            </ChildBox>
          </RespRowBox>
          <Spacing size="large" />
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export default HouseCallsPage
