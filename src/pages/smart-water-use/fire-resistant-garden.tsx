// cspell:ignore Yamasaki
import React, {useMemo} from 'react'
import Image from 'next/image'
import {stringify} from 'querystringify'
import {
  Box,
  Typography as Type,
  useMediaQuery,
  Link,
  Hidden,
  createStyles,
  makeStyles,
  LinkProps,
  TypographyProps,
  useTheme
} from '@material-ui/core'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import PageTitle from '@components/PageTitle/PageTitle'
import {FlexBox, ColumnBox, ChildBox, RowBox} from 'mui-sleazebox'
import WideContainer from '@components/containers/WideContainer'
import OpenInNewLink from '@components/OpenInNewLink/OpenInNewLink'
import Spacing from '@components/boxes/Spacing'
import ResponsiveYouTubePlayer from '@components/ResponsiveYouTubePlayer/ResponsiveYouTubePlayer'
import MuiNextLink from '@components/NextLink/NextLink'
import imgixLoader, {imgixUrlLoader} from '@lib/imageLoader'

const useStyles = makeStyles(() =>
  createStyles({
    bulletLi: {
      listStyleType: 'circle',
      marginBottom: 2
    },
    plantImgStyle: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center'
    }
  })
)

const FireResistantGardenPage = () => {
  const classes = useStyles()
  const theme = useTheme()
  const isSMUp = useMediaQuery(theme.breakpoints.up('sm'))

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
      <Image
        loader={imgixLoader}
        layout="responsive"
        sizes="(max-width: 600px) 100vw, 45vw"
        width={3840}
        height={2556}
        src="bb5c31a0-ad6e-11e9-915b-f761e052b1b3-Boys-Scouts-with-Auburn-Fire010.jpg"
        alt="Boys Scouts with Auburn Fire"
      />
    )
  }

  return (
    <PageLayout
      title="Fire Resistant Garden"
      alertsProps={{bottomBgGradient: false}}
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
            <Image
              loader={imgixUrlLoader}
              layout="responsive"
              src={`https://imgix.cosmicjs.com/1d7bc810-ad6e-11e9-8acd-97664e494c6d-Boys-Scouts-with-Auburn-Fire012.jpg${stringify(
                {fit: 'crop', ar: '9:4'},
                true
              )}`}
              alt="PCWA Water Efficiency Team"
              // objectPosition="center center"
              // objectFit="none"
              width={3840}
              height={1707}
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
          <OpenInNewLink
            href="https://cdn.cosmicjs.com/088f4270-a25f-11e9-8d2c-2b0caf998b3e-Fire-and-water-2019-Final.pdf"
            variant="h4"
          >
            As Seen in Fire & Water...
          </OpenInNewLink>

          <Hidden smUp>
            <Box width="100%">
              <Spacing />
              <FirstAsideImage />
            </Box>
          </Hidden>

          <RowBox responsive flexSpacing={6}>
            <ChildBox flex="55%">
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
                    <ExtLink href="https://imgix.cosmicjs.com/7647c4d0-ad73-11e9-8ba7-dba4340cf409-MF-L2.1-050719.pdf">
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
            <ChildBox flex="45%">
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
                  <Image
                    loader={imgixLoader}
                    layout="responsive"
                    sizes="(max-width: 600px) 100vw, 45vw"
                    width={1200}
                    height={800}
                    src="48ddc470-ad6b-11e9-910a-9dd8fa8729ee-Boys-Scouts-with-Auburn-Fire008.jpg"
                    alt="Boys Scouts with Auburn Fire"
                  />
                </ChildBox>

                <ChildBox>
                  <RowBox
                    flexSpacing={plantImgSpacing}
                    flexWrap="wrap"
                    wrapSpacing={2}
                  >
                    <ChildBox flex={plantImgChildFlex}>
                      <Image
                        loader={imgixLoader}
                        src="e7e0c090-ad61-11e9-910a-9dd8fa8729ee-Rosy-Glow-Barberry.jpg"
                        alt="Rosy Glow Barberry"
                        className={classes.plantImgStyle}
                        width={256}
                        height={384}
                      />
                    </ChildBox>
                    <ChildBox flex={plantImgChildFlex}>
                      <Image
                        loader={imgixLoader}
                        src="e7850c00-ad61-11e9-910a-9dd8fa8729ee-Gold-Dust-Aucuba.jpg"
                        alt="Gold Dust Aucuba"
                        className={classes.plantImgStyle}
                        width={256}
                        height={384}
                      />
                    </ChildBox>
                    <ChildBox flex={plantImgChildFlex}>
                      <Image
                        loader={imgixLoader}
                        src="e7749140-ad61-11e9-8aa7-c50c7cc602b8-Dwarf-Butterfly-Bush.jpg"
                        alt="Dwarf Butterfly Bush"
                        className={classes.plantImgStyle}
                        width={256}
                        height={384}
                      />
                    </ChildBox>
                    <ChildBox flex={plantImgChildFlex}>
                      <Image
                        loader={imgixLoader}
                        src="e711fee0-ad61-11e9-8aa7-c50c7cc602b8-African-Iris.jpg"
                        alt="African Iris"
                        className={classes.plantImgStyle}
                        width={256}
                        height={384}
                      />
                    </ChildBox>
                  </RowBox>
                </ChildBox>
              </ColumnBox>
            </ChildBox>
          </RowBox>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export default FireResistantGardenPage
