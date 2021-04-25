import React from 'react'
import {
  useMediaQuery,
  Box,
  Typography as Type,
  useTheme
} from '@material-ui/core'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {FlexBox, RowBox, ChildBox} from 'mui-sleazebox'
import Spacing from '@components/boxes/Spacing'
import MainPhone from '@components/links/MainPhone'
import ResponsiveYouTubePlayer from '@components/ResponsiveYouTubePlayer/ResponsiveYouTubePlayer'
import MuiNextLink from '@components/NextLink/NextLink'
import Image from 'next/image'
import imgixLoader from '@lib/imageLoader'

// const useStyles = makeStyles(() =>
//   createStyles({
//     bulletLi: {
//       listStyleType: 'circle',
//       marginBottom: 2
//     }
//   })
// )

const HouseCallsPage = () => {
  // const classes = useStyles()
  const theme = useTheme()
  const isMDUp = useMediaQuery(theme.breakpoints.up('md'))

  // const TypeBullet = ({children, ...rest}: TypographyProps<'li'>) => {
  //   return (
  //     <Type component="li" className={classes.bulletLi} {...rest}>
  //       {children}
  //     </Type>
  //   )
  // }

  return (
    <PageLayout
      title="House Calls"
      alertsProps={{bottomBgGradient: false}}
      bannerComponent={
        // flexShrink fix for Safari
        <FlexBox flexShrink={0}>
          <Box
            m="auto"
            width="100%" // Setting width makes the image re-expand when window width resizes to a larger width from a smaller narrow width.
            maxWidth={1400}
            height={{xs: 250, sm: 350}} // Original Photo is not very tall, so special treatment is given on smaller devices. 'objectFit' is also toggled to help with image display.
            overflow="hidden"
            position="relative"
          >
            <Image
              priority
              layout="fill"
              loader={imgixLoader}
              src="8853bb00-c44f-11e9-8ec5-f7161a5df0bf-WaterWiseBusinessCallTeamfor-webpage.jpg"
              alt="PCWA Water Efficiency Team"
              objectPosition="center 30%"
              objectFit={isMDUp ? 'none' : 'cover'} // Original Photo is not very tall, so special treatment is given on smaller devices. Container height is also toggled to help with image display.
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
            src="https://imgix.cosmicjs.com/8853bb00-c44f-11e9-8ec5-f7161a5df0bf-WaterWiseBusinessCallTeamfor-webpage.jpg"
            htmlAttributes={{
              alt: 'PCWA Water Efficiency Team',
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
            {/* Schedule a Water Wise House Call or Business Call Today */}
            PCWA is Here for You Even When We Must Be Apart
          </Type>
          <Spacing />
          <RowBox responsive flexSpacing={6}>
            <ChildBox flex="60%">
              {/* <Type paragraph>
                Worried you might have a leak? Want to find ways to use water
                more efficiently at home or work? Interested in learning more
                about money- and water-saving rebates available from PCWA? Set
                up your complimentary Water Wise House Call or Business Call
                today! A trained water efficiency professional will visit your
                home or business to:
              </Type> */}
              <Type paragraph>
                At PCWA, we want you to know that we’re here for you even when
                we must be further apart to keep everyone safe during the
                COVID-19 emergency.
              </Type>
              <Type paragraph>
                PCWA is continuing to offer our conservation team’s expertise if
                you find a sudden spike in your water bill or think your home
                might have a leak. Rather than scheduling an in-person Water
                Wise House Call, our team will review your historical water use
                from our records, then may check your water meter for signs that
                there may be a leak, and follow up with a phone call to share
                our findings and information about potential rebates.
              </Type>
              <Type paragraph>
                PCWA’s rebate program is available to help you increase water
                efficiency and potentially lower your water bill. Check out our
                rebates for upgrading to a beautiful, low-maintenance water-wise
                landscape and for incorporating high-efficiency appliances into
                your home. Information and applications are available on our
                website on{' '}
                <MuiNextLink href="/smart-water-use/rebate-programs">
                  our rebates page.
                </MuiNextLink>
              </Type>
              <Type paragraph>
                If you’d like to learn more about PCWA’s water efficiency
                services or rebates, contact our Customer Services team at{' '}
                <MainPhone />.
              </Type>
              {/* <ul>
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
              </ul> */}
              {/* <Type paragraph>
                Water Wise House Calls or Business Calls are offered Monday
                through Friday and typically last about an hour. Schedule yours
                today by calling PCWA Customer Services at <MainPhone />.
              </Type> */}
            </ChildBox>
            <ChildBox flex="40%" display="flex">
              {/* <ChildBox
                mx="auto"
                width={{xs: '70vw', sm: 'inherit'}} // Don't let portrait image get too big in small layouts.
              >
                <LazyImgix
                  src="https://imgix.cosmicjs.com/e62faff0-c430-11e9-b25b-79fa6aa7c400-Mychel-Teater-adjusting-sprinkler.tif"
                  htmlAttributes={{
                    alt: 'Meter Efficiency Technician adjusting sprinkler',
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
          </RowBox>
          <Spacing size="large" />
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export default HouseCallsPage
