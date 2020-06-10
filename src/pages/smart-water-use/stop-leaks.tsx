// cspell:ignore showerheads howto
import React from 'react'
import {
  Typography as Type,
  Link,
  createStyles,
  makeStyles
} from '@material-ui/core'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {ChildBox, RowBox} from '@components/boxes/FlexBox'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import MainPhone from '@components/links/MainPhone'
import {TypographyProps} from '@material-ui/core/Typography'
import Spacing from '@components/boxes/Spacing'

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
        <NarrowContainer>
          <PageTitle
            title="Stop the Leaks Lurking in Your Home!"
            subtitle="Smart Water Use"
          />

          <Type paragraph>
            Small drips in your home can quickly add up to many gallons lost. A
            dripping faucet can waste 15 to 20 gallons a day. A steady leak –
            from a hole only 1/16th inch in size – can add up to more than 1,000
            gallons of water wasted each day.
          </Type>

          <Type paragraph>
            Most leaks are easy to find, but some are not so obvious. If you
            notice a sudden spike in your water bill, here are some places for
            spotting—and stopping—the leaks lurking at your home:
          </Type>

          <ul>
            <LeakItem>
              <strong>Your water meter: </strong>Your water meter is a great
              place to check for leaks that are not readily apparent. Here is
              what to do: First, turn off all water inside and outside your
              home. Then, look at the meter’s leak detector gauge (this is the
              small red, black or blue dial or triangle). If the triangle is
              spinning when everything is off, you likely have a leak that needs
              repair.
            </LeakItem>
            <LeakItem>
              <strong>Toilets: </strong>Toilet leaks rank among the biggest
              water wasters--typically 30 to 50 gallons per day. Find toilet
              leaks by putting a drop of food coloring in the tank and waiting
              15 minutes. If color seeps into the bowl without flushing, there
              is a leak. (Be sure to flush immediately after the experiment to
              avoid staining the tank.) PCWA offers free test kits to check if
              there is a slow leak in your toilet. For your kit, contact PCWA
              Customer Services at <MainPhone />.
            </LeakItem>
            <LeakItem>
              <RowBox alignItems="flex-start" flexSpacing={2}>
                <ChildBox>
                  <Type>
                    <strong>Showerheads:</strong> A showerhead leaking at 10
                    drips per minute wastes more than 500 gallons per year –
                    equal to the amount of water it takes to wash 60 loads of
                    dishes in your dishwasher. Most leaky showerheads can be
                    fixed by ensuring a tight connection using pipe tape and a
                    wrench. If you are replacing a showerhead, look for one that
                    has earned the WaterSense label.
                  </Type>
                </ChildBox>
                <ChildBox width={100} flex="0 0 auto">
                  <LazyImgix
                    src="https://cosmic-s3.imgix.net/69d73080-299f-11e9-b399-19c097547cb4-Look-for-WaterSense.jpg"
                    htmlAttributes={{
                      alt: 'Look for WaterSense Logo'
                    }}
                  />
                </ChildBox>
              </RowBox>
            </LeakItem>
            <LeakItem>
              <strong>Dishwashers and clothes washers</strong>: Check your
              washing machine hoses for cracks that could result in leaks, and
              look for drips or stains underneath or behind these appliances,
              which could also indicate a leak.
            </LeakItem>
            <LeakItem>
              <strong>Faucets</strong>: Check faucet washers and gaskets for
              wear and replace them if necessary. If you decide to replace a
              faucet, look for one that has earned the WaterSense label.
            </LeakItem>
            <LeakItem>
              <strong>Sprinklers</strong>: Most water use--and water
              waste--occurs in the landscape. Check your sprinklers for leaks
              each spring before turning your system on for the watering season.
              Also, check your garden hose for leaks where it connects to the
              spigot.
            </LeakItem>
          </ul>

          <Spacing />
          <Type paragraph>
            When you find leaks, turn off water to the problem area until it can
            be repaired. Often only minor repairs are needed to stop leaks, and
            fixing leaks can be as simple as replacing a washer or toilet
            flapper. Learn more about finding and fixing leaks from the
            WaterSense program on the{' '}
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
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default StopLeaksPage
