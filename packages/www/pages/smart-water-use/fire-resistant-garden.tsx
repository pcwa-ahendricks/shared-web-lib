// cspell:ignore Yamasaki
import React, {useMemo} from 'react'
import {
  Box,
  Typography as Type,
  useMediaQuery,
  Link,
  Hidden
} from '@material-ui/core'
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
import WideContainer from '@components/containers/WideContainer'
import OpenInNewLink from '@components/OpenInNewLink/OpenInNewLink'
import Spacing from '@components/boxes/Spacing'
// import CenterImage from '@components/CenterImage/CenterImage'
import {createStyles, makeStyles, useTheme} from '@material-ui/core/styles'
import ResponsiveYouTubePlayer from '@components/ResponsiveYouTubePlayer/ResponsiveYouTubePlayer'
import {TypographyProps} from '@material-ui/core/Typography'
import {LinkProps} from '@material-ui/core/Link'
import MuiNextLink from '@components/NextLink/NextLink'

const useStyles = makeStyles(() =>
  createStyles({
    bulletLi: {
      listStyleType: 'circle',
      marginBottom: 2
    }
  })
)

const FireResistantGardenPage = () => {
  const classes = useStyles()
  const theme = useTheme()
  const isSMUp = useMediaQuery(theme.breakpoints.up('sm'))

  const plantImgStyle = useMemo(
    () => ({
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center'
    }),
    []
  )

  const plantImgSpacing = useMemo(() => (isSMUp ? 2 : 1), [isSMUp])

  const plantImgChildFlex = useMemo(
    () =>
      isSMUp
        ? `calc(50% - ${theme.spacing(plantImgSpacing)}px)`
        : `calc(25% - ${theme.spacing(plantImgSpacing)}px)`,
    [isSMUp, theme, plantImgSpacing]
  )

  const TypeBullet = ({children, ...rest}: TypographyProps<'li'>) => {
    return (
      <Type component="li" className={classes.bulletLi} {...rest}>
        {children}
      </Type>
    )
  }

  const ExtLink = ({children, ...rest}: LinkProps) => {
    return (
      <Link
        {...rest}
        variant="inherit"
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}
      </Link>
    )
  }

  const FirstAsideImage = () => {
    return (
      <LazyImgix
        src="https://cosmic-s3.imgix.net/bb5c31a0-ad6e-11e9-915b-f761e052b1b3-Boys-Scouts-with-Auburn-Fire010.jpg"
        htmlAttributes={{
          alt: 'Boys Scouts with Auburn Fire',
          style: {width: '100%'}
        }}
      />
    )
  }

  return (
    <PageLayout
      title="Fire Resistant Garden"
      bannerComponent={
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
      }
    >
      <MainBox>
        <WideContainer>
          <PageTitle
            title="PCWA Partners with Local Scouts to Transform Fire Station Lawn to a
            Fire and Water-Wise Landscape"
            subtitle="Smart Water Use"
          />
          <Spacing />
          <OpenInNewLink href="https://cdn.cosmicjs.com/088f4270-a25f-11e9-8d2c-2b0caf998b3e-Fire-and-water-2019-Final.pdf">
            <Link variant="h4" component="span">
              As Seen in Fire & Water...
            </Link>
          </OpenInNewLink>

          <Hidden smUp>
            <Box width="100%">
              <Spacing />
              <FirstAsideImage />
            </Box>
          </Hidden>

          <RespRowBox flexSpacing={4}>
            <ChildBox flex="50%">
              <Box mt={4}>
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

                <ul>
                  <TypeBullet>
                    <ExtLink href="https://www.signupgenius.com/go/8050944afa928a3fe3-maidu">
                      Volunteer now with Sign-up Genius
                    </ExtLink>
                  </TypeBullet>
                  <TypeBullet>
                    <ExtLink href="https://cosmic-s3.imgix.net/7647c4d0-ad73-11e9-8ba7-dba4340cf409-MF-L2.1-050719.pdf">
                      View the landscape design plan
                    </ExtLink>
                  </TypeBullet>

                  <TypeBullet>
                    <ExtLink href="https://cdn.cosmicjs.com/32c386c0-b540-11e9-a915-41acc1bf515a-Maidu-Fire-Station-WaterWiseFireWise-Plant-List.pdf">
                      See the complete plant list
                    </ExtLink>
                  </TypeBullet>
                </ul>
                <Spacing size="x-large" />
                <Type paragraph>
                  The garden also will feature state-of-the art drip irrigation
                  and a WaterSense-labeled weather-based sprinkler timer. The
                  drip irrigation, placed below the soil surface in a grid
                  pattern, will deliver water at the root zone with zero
                  evaporation. The sprinkler timer will use local weather
                  conditions to deliver just the right amount of water plants
                  need to be healthy.
                </Type>
                <Type paragraph>
                  The existing lawn and plants are scheduled to be removed in
                  August and September, followed by installation of plants, the
                  irrigation system and mulch in October. The entire project is
                  expected to be completed by November.
                </Type>

                <Spacing size="large" />
                <Type variant="h5" color="primary" gutterBottom>
                  Learn More about Water-Wise Plants and Landscaping
                </Type>
                <ul>
                  <TypeBullet>
                    <MuiNextLink
                      href="/smart-water-use/rebate-programs"
                      variant="inherit"
                    >
                      Rebates available from PCWA
                    </MuiNextLink>{' '}
                    for weather-based sprinkler timers and efficient irrigation
                    equipment.
                  </TypeBullet>
                  <TypeBullet>
                    <ExtLink href="https://www.rwa.watersavingplants.com">
                      Be Water Smart
                    </ExtLink>
                  </TypeBullet>
                  <TypeBullet>
                    <ExtLink href="https://arboretum.ucdavis.edu/plant-database">
                      UC Davis Arboretum
                    </ExtLink>
                  </TypeBullet>
                  <TypeBullet>
                    <ExtLink href="http://www.ecolandscape.org/new-ca">
                      Eco-Friendly Landscape Design Plans
                    </ExtLink>
                  </TypeBullet>
                </ul>

                <Spacing size="large" />
                <Type variant="h5" color="primary" gutterBottom>
                  Thank You!
                </Type>
                <ul>
                  <TypeBullet style={{listStyleType: 'none'}}>
                    Yamasaki Landscape Architecture (landscape plan)
                  </TypeBullet>
                  <TypeBullet style={{listStyleType: 'none'}}>
                    Mid-City Nursery (plants)
                  </TypeBullet>
                  <TypeBullet style={{listStyleType: 'none'}}>
                    Village Nursery (plants)
                  </TypeBullet>
                  <TypeBullet style={{listStyleType: 'none'}}>
                    Hunter Industries (irrigation system and controller)
                  </TypeBullet>
                  <TypeBullet style={{listStyleType: 'none'}}>
                    BrightView Landscape (irrigation installation)
                  </TypeBullet>
                </ul>
              </Box>
            </ChildBox>
            <ChildBox flex="50%">
              <ColumnBox flexSpacing={4}>
                <ChildBox>
                  <ResponsiveYouTubePlayer
                    controls
                    url="https://www.youtube.com/watch?v=IJUea7HWsfI"
                    config={{
                      youtube: {
                        playerVars: {showinfo: 1}
                      }
                    }}
                  />
                  <Box textAlign="center">
                    <Type variant="caption">
                      Landscape Makeover-time lapse video
                    </Type>
                  </Box>
                </ChildBox>
                <Hidden only="xs" implementation="js">
                  <ChildBox>
                    <FirstAsideImage />
                  </ChildBox>
                </Hidden>
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
