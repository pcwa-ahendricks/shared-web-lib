import React, {useMemo} from 'react'
import {Box, Typography as Type, useMediaQuery, Link} from '@material-ui/core'
import {useTheme} from '@material-ui/core/styles'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import PageTitle from '@components/PageTitle/PageTitle'
import FlexBox, {
  ColumnBox,
  RespRowBox,
  ChildBox,
  RowBox
} from '@components/boxes/FlexBox'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import MuiNextLink from '@components/NextLink/NextLink'
import WideContainer from '@components/containers/WideContainer'
import OpenInNewLink from '@components/OpenInNewLink/OpenInNewLink'
import Spacing from '@components/boxes/Spacing'
// import CenterImage from '@components/CenterImage/CenterImage'

const FireResistantGardenPage = () => {
  const theme = useTheme()
  const isSMUp = useMediaQuery(theme.breakpoints.up('sm'))
  const marginTop = useMemo(() => (isSMUp ? 4 : 1), [isSMUp])

  const plantImgStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center'
  }

  const plantImgSpacing = isSMUp ? 2 : 1
  const plantImgChildFlex = {
    xs: `calc(25% - ${theme.spacing(plantImgSpacing)}px)`,
    sm: `calc(50% - ${theme.spacing(plantImgSpacing)}px)`
  }

  return (
    <PageLayout title="Fire Resistant Garden" mt={0}>
      <FlexBox>
        <Box
          m="auto"
          width="100%" // Setting width makes the image re-expand when window width resizes to a larger width from a smaller narrow width.
          maxWidth={1400}
          height={{xs: 300, sm: 350, lg: 450}}
          overflow="hidden"
          position="relative"
        >
          <LazyImgix
            src="https://cosmic-s3.imgix.net/1d7bc810-ad6e-11e9-8acd-97664e494c6d-Boys-Scouts-with-Auburn-Fire012.jpg"
            htmlAttributes={{
              alt: 'PCWA Water Efficiency Team',
              style: {
                objectPosition: 'center 40%',
                objectFit: 'none',
                width: '100%',
                height: '100%'
              }
            }}
          />
        </Box>
      </FlexBox>

      <MainBox mt={marginTop}>
        <WideContainer>
          <PageTitle
            title="PCWA Partners with Local Scouts to Transform Fire Station Lawn to a
            Fire and Water-Wise Landscape"
            subtitle="Smart Water Use"
          />
          <Spacing />
          <OpenInNewLink href="https://cdn.cosmicjs.com/088f4270-a25f-11e9-8d2c-2b0caf998b3e-Fire-and-water-2019-Final.pdf">
            <Link variant="h4">As Seen in Fire & Water...</Link>
          </OpenInNewLink>

          <RespRowBox flexSpacing={4}>
            <ChildBox flex="50%">
              <Box mt={6}>
                <Type paragraph>
                  Eagle Scout candidates Cody Hansen and David Hurren of Rocklin
                  are partnering with PCWA and the City of Auburn Fire
                  Department to makeover the thirsty turf at Auburn’s Maidu Fire
                  Station into a fire-resistant, water-wise landscape. The
                  project is part of their application to earn the rank of Eagle
                  Scout, the highest rank attainable in the Boy Scouts of
                  America.
                </Type>
                <Type paragraph>
                  A fire-resistant landscape features plants less likely to
                  catch fire placed in ways to resist the spread of fire to a
                  home. These plants can be damaged or even killed by fire, but
                  their foliage and stems are less likely to significantly
                  contribute to the fuel and fire's intensity as long as they
                  are properly maintained, pruned and watered.
                </Type>
                <Type paragraph>
                  Fire-resistant plants are great in California, because they
                  are often native and/or drought tolerant, too. When finished,
                  the landscape will include more than 100 beautiful flowers,
                  plants and shrubs that are both fire-resistant and water-wise.
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
            </ChildBox>
            <ChildBox flex="50%">
              <ColumnBox flexSpacing={4}>
                <ChildBox>
                  <LazyImgix
                    src="https://cosmic-s3.imgix.net/bb5c31a0-ad6e-11e9-915b-f761e052b1b3-Boys-Scouts-with-Auburn-Fire010.jpg"
                    htmlAttributes={{
                      alt: 'Boys Scouts with Auburn Fire',
                      style: {width: '100%'}
                    }}
                  />
                </ChildBox>
                <ChildBox>
                  <LazyImgix
                    src="https://cosmic-s3.imgix.net/48ddc470-ad6b-11e9-910a-9dd8fa8729ee-Boys-Scouts-with-Auburn-Fire008.jpg"
                    htmlAttributes={{
                      alt: 'Boys Scouts with Auburn Fire',
                      style: {width: '100%'}
                    }}
                  />
                </ChildBox>

                <ChildBox>
                  <RowBox flexSpacing={plantImgSpacing} flexWrap="wrap" mt={-2}>
                    <ChildBox mt={2} flex={plantImgChildFlex}>
                      <LazyImgix
                        src="https://cosmic-s3.imgix.net/e7e0c090-ad61-11e9-910a-9dd8fa8729ee-Rosy-Glow-Barberry.jpg"
                        htmlAttributes={{
                          alt: 'Rosy Glow Barberry',
                          style: plantImgStyle
                        }}
                      />
                    </ChildBox>
                    <ChildBox mt={2} flex={plantImgChildFlex}>
                      <LazyImgix
                        src="https://cosmic-s3.imgix.net/e7850c00-ad61-11e9-910a-9dd8fa8729ee-Gold-Dust-Aucuba.jpg"
                        htmlAttributes={{
                          alt: 'Gold Dust Aucuba',
                          style: plantImgStyle
                        }}
                      />
                    </ChildBox>
                    <ChildBox mt={2} flex={plantImgChildFlex}>
                      <LazyImgix
                        src="https://cosmic-s3.imgix.net/e7749140-ad61-11e9-8aa7-c50c7cc602b8-Dwarf-Butterfly-Bush.jpg"
                        htmlAttributes={{
                          alt: 'Dwarf Butterfly Bush',
                          style: plantImgStyle
                        }}
                      />
                    </ChildBox>
                    <ChildBox mt={2} flex={plantImgChildFlex}>
                      <LazyImgix
                        src="https://cosmic-s3.imgix.net/e711fee0-ad61-11e9-8aa7-c50c7cc602b8-African-Iris.jpg"
                        htmlAttributes={{
                          alt: 'African Iris',
                          style: plantImgStyle
                        }}
                      />
                    </ChildBox>
                  </RowBox>
                </ChildBox>
              </ColumnBox>
            </ChildBox>
          </RespRowBox>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export default FireResistantGardenPage
