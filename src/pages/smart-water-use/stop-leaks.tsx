// cspell:ignore showerheads howto
import React from 'react'
import {
  Typography as Type,
  Link,
  createStyles,
  makeStyles,
  Box,
  useTheme
} from '@material-ui/core'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import PageTitle from '@components/PageTitle/PageTitle'
import {ChildBox, ColumnBox, RowBox} from 'mui-sleazebox'
import MainPhone from '@components/links/MainPhone'
import {TypographyProps} from '@material-ui/core/Typography'
import Spacing from '@components/boxes/Spacing'
import WideContainer from '@components/containers/WideContainer'
import Image from 'next/image'
import imgixLoader from '@lib/imageLoader'
import WaterSenseLogo from '@components/WaterSenseLogo/WaterSenseLogo'

const useStyles = makeStyles(() =>
  createStyles({
    greenColor: {
      color: '#468949'
    },
    blueColor: {
      color: '#0f7fb4'
    },
    leakItem: {
      listStyleType: 'none',
      marginBottom: 10
    }
  })
)

const StopLeaksPage = () => {
  const classes = useStyles()
  const theme = useTheme()

  const LeakItem = ({children, ...rest}: TypographyProps<'li'>) => {
    return (
      <Type component="li" className={classes.leakItem} {...rest}>
        {children}
      </Type>
    )
  }

  return (
    <PageLayout title="Stop Leaks" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle
            title="Stop the Leaks Lurking in Your Home!"
            subtitle="Smart Water Use"
          />

          <RowBox responsive flexSpacing={8}>
            <ChildBox flex="66.66%">
              <Type paragraph>
                Small drips in your home can quickly add up to many gallons
                lost. A dripping faucet can waste 15 to 20 gallons a day. A
                steady leak – from a hole only 1/16th inch in size – can add up
                to more than 1,000 gallons of water wasted each day.
              </Type>

              <Type paragraph>
                Most leaks are easy to find, but some are not so obvious. If you
                notice a sudden spike in your water bill, here are some places
                for spotting—and stopping—the leaks lurking at your home:
              </Type>

              <ul>
                <LeakItem>
                  <strong>Your water meter: </strong>Your water meter is a great
                  place to check for leaks that are not readily apparent. Here
                  is what to do: First, turn off all water inside and outside
                  your home. Then, look at the meter’s leak detector gauge (this
                  is the small red, black or blue dial or triangle). If the
                  triangle is spinning when everything is off, you likely have a
                  leak that needs repair.
                </LeakItem>
                <LeakItem>
                  <strong>Toilets: </strong>Toilet leaks rank among the biggest
                  water wasters--typically 30 to 50 gallons per day. Find toilet
                  leaks by putting a drop of food coloring in the tank and
                  waiting 15 minutes. If color seeps into the bowl without
                  flushing, there is a leak. (Be sure to flush immediately after
                  the experiment to avoid staining the tank.) PCWA offers free
                  test kits to check if there is a slow leak in your toilet. For
                  your kit, contact PCWA Customer Services at <MainPhone />.
                </LeakItem>
                <LeakItem>
                  <RowBox alignItems="flex-start" flexSpacing={2}>
                    <ChildBox>
                      <Type>
                        <strong>Showerheads:</strong> A showerhead leaking at 10
                        drips per minute wastes more than 500 gallons per year –
                        equal to the amount of water it takes to wash 60 loads
                        of dishes in your dishwasher. Most leaky showerheads can
                        be fixed by ensuring a tight connection using pipe tape
                        and a wrench. If you are replacing a showerhead, look
                        for one that has earned the WaterSense label.
                      </Type>
                    </ChildBox>
                    <ChildBox width={100} flex="0 0 auto">
                      <Image
                        loader={imgixLoader}
                        layout="responsive"
                        sizes="100px"
                        width={256}
                        height={316}
                        src="69d73080-299f-11e9-b399-19c097547cb4-Look-for-WaterSense.jpg"
                        alt="Look for WaterSense Logo"
                      />
                    </ChildBox>
                  </RowBox>
                </LeakItem>
                <LeakItem>
                  <strong>Dishwashers and clothes washers</strong>: Check your
                  washing machine hoses for cracks that could result in leaks,
                  and look for drips or stains underneath or behind these
                  appliances, which could also indicate a leak.
                </LeakItem>
                <LeakItem>
                  <strong>Faucets</strong>: Check faucet washers and gaskets for
                  wear and replace them if necessary. If you decide to replace a
                  faucet, look for one that has earned the WaterSense label.
                </LeakItem>
                <LeakItem>
                  <strong>Sprinklers</strong>: Most water use--and water
                  waste--occurs in the landscape. Check your sprinklers for
                  leaks each spring before turning your system on for the
                  watering season. Also, check your garden hose for leaks where
                  it connects to the spigot.
                </LeakItem>
              </ul>

              <Spacing />
              <Type paragraph>
                When you find leaks, turn off water to the problem area until it
                can be repaired. Often only minor repairs are needed to stop
                leaks, and fixing leaks can be as simple as replacing a washer
                or toilet flapper. Learn more about finding and fixing leaks
                from the WaterSense program on the{' '}
                <Link
                  href="https://www.epa.gov/watersense/fix-leak-week"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  EPA website
                </Link>{' '}
                and from Regional Water Authority at{' '}
                <Link
                  href="https://BeWaterSmart.info"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  BeWaterSmart.info
                </Link>
                .
              </Type>
            </ChildBox>

            <ChildBox flex="33.3%">
              <ColumnBox alignItems="center" flexSpacing={2}>
                <ChildBox width={{xs: '70%', sm: '100%'}}>
                  <Image
                    loader={imgixLoader}
                    src="2f603cb0-829b-11eb-8b5d-951d83ec2ae4-PCWA-Leaks-Web-Image.png"
                    alt="Take the 10 minute leak challenge"
                    layout="responsive"
                    sizes="(max-width: 600px) 70vw, 34vw"
                    width={100}
                    height={100}
                  />
                </ChildBox>

                <ChildBox>
                  <Box
                    bgcolor={theme.palette.grey['100']}
                    p={2}
                    boxShadow={2}
                    color={theme.palette.grey['700']}
                  >
                    <Type variant="subtitle2" color="textPrimary" gutterBottom>
                      Take the 10-Minute Leak Challenge
                    </Type>
                    <Type variant="body2" paragraph color="inherit">
                      The average home wastes nearly 10,000 gallons of water per
                      year from easy-to-fix household leaks; that’s equivalent
                      to washing 300 loads of laundry (or enough to do laundry
                      for 10 months)!
                    </Type>
                    <Type variant="body2" paragraph color="inherit">
                      We’re inviting everyone to take the 10-Minute Challenge to
                      find and fix household leaks. It’s easy! You could spend
                      just 10 minutes walking your home checking for leaks. Or,
                      you can do one thing each day from our list here.
                    </Type>
                    <ChildBox width={75} m="auto">
                      <WaterSenseLogo noCaption />
                    </ChildBox>
                  </Box>
                </ChildBox>
              </ColumnBox>
            </ChildBox>
          </RowBox>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export default StopLeaksPage
