import React from 'react'
import {
  Link,
  Box,
  Typography as Type,
  createStyles,
  makeStyles
} from '@material-ui/core'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {RowBox, ChildBox, ColumnBox} from 'mui-sleazebox'
import MuiNextLink from '@components/NextLink/NextLink'
import Image from 'next/image'
import imgixLoader from '@lib/imageLoader'
import OpenInNewLink from '@components/OpenInNewLink/OpenInNewLink'

const useStyles = makeStyles(() =>
  createStyles({
    greenColor: {
      color: '#468949'
    },
    blueColor: {
      color: '#0f7fb4'
    }
  })
)

const WaterSensePage = () => {
  const classes = useStyles()
  return (
    <PageLayout title="WaterSense" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle title="WaterSense" subtitle="Smart Water Use" />
          <RowBox responsive justifyContent="space-between" alignItems="center">
            <ChildBox textAlign="center" p={2}>
              <Type variant="h2" gutterBottom>
                Look for the{' '}
                <Type
                  component="strong"
                  variant="inherit"
                  className={classes.blueColor}
                >
                  Water
                </Type>
                <Type
                  component="strong"
                  variant="inherit"
                  className={classes.greenColor}
                >
                  Sense
                </Type>{' '}
                Label
              </Type>
            </ChildBox>
            <ChildBox maxWidth={275} width="100%">
              <Image
                layout="responsive"
                loader={imgixLoader}
                src="69d73080-299f-11e9-b399-19c097547cb4-Look-for-WaterSense.jpg"
                alt="Look for WaterSense Logo"
                width={200}
                height={247}
              />
            </ChildBox>
          </RowBox>
          <Box mt={6}>
            <Type paragraph>
              WaterSense is a national program from the U.S. Environmental
              Protection Agency that makes it easy for consumers to find and
              select water-efficient products and fixtures. Just like the Energy
              Star logo for energy-efficient appliances, products with the
              WaterSense label are third-party certified to meet EPA’s
              specifications for efficiency and performance.
            </Type>
            <Type paragraph>
              WaterSense products and fixtures include toilets, showerheads,
              faucets, aerators, sprinkler bodies and sprinkler timers, with
              many more categories in the works. They can be found at local
              hardware and home improvement stores—just look for the label on
              the box.
            </Type>
            <Type paragraph>
              Since its introduction in 2006, the number of WaterSense products
              have grown to more than 27,000 products, saving U.S. consumers an
              estimated 2.7 trillion gallons of water and more than $63.8
              billion in water and energy bills. Learn more about WaterSense at{' '}
              <OpenInNewLink
                rel="noopener noreferrer"
                target="_blank"
                href="https://www.epa.gov/watersense"
              >
                https://www.epa.gov/watersense
              </OpenInNewLink>
              .
            </Type>
            <Type paragraph>
              PCWA is proud to be a WaterSense partner and offers rebates on
              WaterSense products that can help you upgrade your lifestyle while
              saving water.
            </Type>

            <Box mt={6}>
              <ColumnBox justifyContent="start" alignItems="center">
                <Type variant="subtitle1">
                  Rebates are available for WaterSense-labeled
                </Type>
                <Type>High-efficiency toilets</Type>
                <Type>Weather-based irrigation controllers</Type>
                <Type>Pressure regulating sprinkler bodies</Type>
              </ColumnBox>
            </Box>
            <Box mt={3}>
              <Type>
                Learn more about our rebates today and apply online on our{' '}
                <MuiNextLink href="/smart-water-use/rebate-programs">
                  Rebate Programs
                </MuiNextLink>{' '}
                page.
              </Type>
            </Box>
          </Box>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default WaterSensePage
