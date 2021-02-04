// cspell:ignore bewatersmart arwec usbr
import React, {useCallback} from 'react'
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
  Box,
  Typography as Type,
  BoxProps,
  TypographyProps,
  Link
} from '@material-ui/core'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import LocalDrinkIcon from '@material-ui/icons/LocalDrink'
import DetectiveIcon from 'mdi-material-ui/AccountSearch'
import Spacing from '@components/boxes/Spacing'
import {FlexBox} from 'mui-sleazebox'
import MainPhone from '@components/links/MainPhone'
import CustomerServicesEmail from '@components/links/CustomerServicesEmail'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bulletLi: {
      listStyleType: 'circle',
      marginBottom: 10
    },
    tightBulletLi: {
      listStyleType: 'none',
      marginBottom: 5
    },
    disc: {
      display: 'inline-block',
      width: '1em',
      marginLeft: '-1em',
      color: theme.palette.grey['800']
    }
  })
)

const TipsForKidsPage = () => {
  const classes = useStyles()
  const theme = useTheme()

  const TypeBullet = useCallback(
    ({children, ...rest}: TypographyProps<'li'>) => {
      return (
        <Type component="li" className={classes.bulletLi} {...rest}>
          {children}
        </Type>
      )
    },
    [classes]
  )

  const Disc = useCallback(
    ({...rest}: BoxProps) => (
      <Box className={classes.disc} {...rest}>
        •
      </Box>
    ),
    [classes]
  )

  const TightBullet = useCallback(
    ({children, ...rest}: TypographyProps<'li'>) => {
      return (
        <Type component="li" className={classes.tightBulletLi} {...rest}>
          <Disc />
          {children}
        </Type>
      )
    },
    [classes, Disc]
  )

  return (
    <PageLayout title="Tips for Kids" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle
            title="Tips for Encouraging Kids to Use Water Wisely"
            subtitle="Smart Water Use"
          />
          <Box mt={6}>
            <Type paragraph>
              Over the last several years, California’s historic drought has
              challenged all of us to see just how much water we can conserve.
              Many of us let our lawns go golden, took shorter showers and made
              our landscapes more water wise—and it showed. Our region had some
              of the highest water reductions in the state.
            </Type>
            <Type paragraph>
              The drought emergency proved that we could all come together to
              conserve when needed. The drought also helped show us that
              everyone has an important role to play in conserving water—kids
              included.
            </Type>
            <Type paragraph>
              This year, we’re fortunate to have a respite from the emergency
              thanks to winter’s snow and rainfall in Northern California. But,
              it’s still important to maintain those good water-saving habits
              formed during the drought and to create new ones.
            </Type>
            <Type paragraph>
              Here are some tips to help kids understand the importance of using
              water wisely every day—even when there is no drought
              emergency--and the actions they can take to be water smart for a
              lifetime:
            </Type>
            <Spacing size="large" factor={1}>
              <FlexBox>
                <Box m="auto">
                  <LocalDrinkIcon color="secondary" fontSize="large" />
                </Box>
              </FlexBox>
            </Spacing>
            <Type variant="h2" color="primary" gutterBottom>
              {/* <LocalDrinkIcon /> */}
              Show Them Where Water Really Comes From
            </Type>
            <Type paragraph>
              In the Sacramento region, water comes from two sources: surface
              water sources such as the American and Sacramento rivers and
              underground water basins called aquifers. Water is pumped out of
              the rivers and from underground, treated and sent to our homes for
              drinking, cooking, bathing and watering our landscapes.
            </Type>
            <Type paragraph>
              While the concept of underground water can be difficult even for
              adults, it’s easy to show kids our beautiful lakes, rivers and
              streams. Get out and enjoy Folsom Lake, the American River (North
              or Middle Fork) the Ralston Picnic area) and the Sacramento River
              or Auburn Ravine. This helps kids understand the connection
              between water in the environment and the water that comes out of
              the tap. If they appreciate these precious resources, they’ll
              better appreciate the need to use water wisely.
            </Type>
            <Type paragraph>Teach them where water is used at home.</Type>
            <Type paragraph>
              In our region, most of the water we use at home goes toward
              watering our landscapes—and that’s where we can make the biggest
              difference in overall water use. While landscape watering is
              typically an adult responsibility, kids can still play a part by
              using a shut-off nozzle on their garden hose and telling adults
              about water-wasting problems, like broken sprinklers.
            </Type>
            <Type paragraph>
              Inside our homes, toilets are the biggest water user, followed by
              the clothes washer, showers, faucets and leaks. Knowing this can
              help kids better understand why it’s important to not use the
              toilet as a trash can and to take shorter showers.
            </Type>
            <Spacing size="large" factor={1}>
              <FlexBox>
                <Box m="auto">
                  <DetectiveIcon color="secondary" fontSize="large" />
                </Box>
              </FlexBox>
            </Spacing>
            <Type variant="h2" color="primary" gutterBottom>
              Make Them A Water Detective
            </Type>
            <Type paragraph>
              There are so many easy things kids (and adults) can do to save
              water. Teach them the simple tips they can do every day, like
              turning off the water when soaping hands or brushing teeth. Also,
              teach them to be a water detective to look for things around the
              house that waste water—a dripping faucet or hose bib, for example.
              This hands-on learning will help your whole household save water.
            </Type>
            <Type paragraph>
              We are fortunate in this region to be surrounded by beautiful
              waterways that make our community unique. Teaching your youngest
              consumers about why and how to use water efficiently is critical
              to ensuring they grow to be responsible stewards of those
              resources and our community.
            </Type>
            <Type paragraph>
              <em>
                Linda Higgins is Deputy Director of Customer Services for Placer
                County Water Agency, and Amy Talbot is the Water Efficiency
                Program Manager for the Regional Water Authority. Learn more
                tips and information about free water saving programs and
                rebates at{' '}
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://BeWaterSmart.info"
                >
                  BeWaterSmart.info
                </Link>
                .
              </em>
            </Type>
            <Spacing />
            <Box p={3} bgcolor={theme.palette.grey['200']}>
              <Type variant="subtitle1" gutterBottom>
                Water Smart Tips for Kids
              </Type>
              <ul style={{listStyle: 'none'}}>
                <TightBullet>
                  When washing hands, turn off the water after wetting hands and
                  turn it back on to rinse. Also, shut the water off while
                  brushing teeth, too.
                </TightBullet>
                <TightBullet>
                  Never use the toilet as a trashcan, and don’t flush the toilet
                  more than you have to.
                </TightBullet>
                <TightBullet>
                  Make sure your garden hose has a shut-off spray nozzle when
                  watering the garden or playing.
                </TightBullet>
                <TightBullet>Remember to take quick showers.</TightBullet>
                <TightBullet>
                  If you see a water-wasting problem (such as a leaky faucet or
                  broken sprinkler) tell an adult right away.
                </TightBullet>
              </ul>
            </Box>

            <Spacing />
            <Box p={3} bgcolor={theme.palette.grey['200']}>
              <Type variant="subtitle1" gutterBottom>
                Water Smart Tips for Adults
              </Type>
              <ul style={{listStyle: 'none'}}>
                <TightBullet>
                  Consider replacing all or part of your thirsty lawn with
                  beautiful, low-water use plants.
                </TightBullet>
                <TightBullet>
                  Make sure landscape watering is as efficient as possible by
                  replacing older sprinklers with efficient MP rotators and
                  installing a weather-based WaterSense-labeled sprinkler timer.
                </TightBullet>
                <TightBullet>
                  Replace older toilets and clothes washers with high-efficiency
                  ones. (Rebates are available to help offset costs.)
                </TightBullet>
                <TightBullet>
                  Quickly fix leaky faucets and toilets.
                </TightBullet>
                <TightBullet>
                  Call your water provider for a Water Wise House Call, a free
                  at-home consultation with tailored information on how to use
                  less water in your home and landscape.
                </TightBullet>
              </ul>
            </Box>

            <Spacing size="x-large" />
            <Type variant="h3" color="primary" gutterBottom>
              Local Resources for Learning About Water
            </Type>

            <ul>
              <TypeBullet>
                Roseville Utility Exploration Center on Pleasant Grove Blvd. in
                Roseville is an environmental learning center with information
                about protecting natural resources in a fun, engaging way.
                Topics covered include energy efficiency, renewable technology,
                water conservation and recycling. Learn more at{' '}
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.roseville.ca.us/explore"
                >
                  www.roseville.ca.us/explore
                </Link>
                .
              </TypeBullet>
              <TypeBullet>
                Water-Efficient Landscape Gardens throughout the region—these
                are great places to enjoy a picnic and wander around beautiful,
                water-wise landscaping. You can also learn about water-efficient
                sprinkler systems, plants that attract butterflies and other
                River-Friendly landscaping tips. Find a list of gardens at{' '}
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://bewatersmart.info/residential-resources"
                >
                  bewatersmart.info/residential-resources
                </Link>
                .
              </TypeBullet>
              <TypeBullet>
                American River Water Education Center, located near Folsom Dam,
                has numerous water use and efficiency displays. Learn more at{' '}
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.usbr.gov/mp/arwec"
                >
                  www.usbr.gov/mp/arwec
                </Link>
                .
              </TypeBullet>
              <TypeBullet>
                Local water providers, including Placer County Water Agency, has
                knowledgeable staff available to speak about water efficiency at
                community functions. Learn more by contacting PCWA Customer
                Services at <MainPhone /> or email at <CustomerServicesEmail />.
              </TypeBullet>
            </ul>
          </Box>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default TipsForKidsPage
