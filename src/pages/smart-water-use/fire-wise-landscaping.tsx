// cspell:ignore firewise ondemand
import React, {useCallback} from 'react'
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo'
import {
  Paper,
  ListItemText,
  Link as MatLink,
  Box,
  Typography as Type,
  List,
  ListItem,
  makeStyles,
  IconButton,
  IconButtonProps
} from '@material-ui/core'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import PageTitle from '@components/PageTitle/PageTitle'
import Spacing from '@components/boxes/Spacing'
import Link from 'next/link'
import {ChildBox, RowBox} from 'mui-sleazebox'
import WideContainer from '@components/containers/WideContainer'
import StrongEmphasis from '@components/typography/StrongEmphasis/StrongEmphasis'
import ImageParallaxBanner from '@components/ImageParallaxBanner/ImageParallaxBanner'
import Image from 'next/image'
import imgixLoader from '@lib/imageLoader'

const useStyles = makeStyles(() => ({
  listItem: {
    paddingTop: 4,
    paddingBottom: 4
  }
}))

const FireWiseLandscapingPage = () => {
  const classes = useStyles()

  const OndemandVideoBtn = useCallback(
    ({href, ...rest}: Partial<IconButtonProps<'a'>>) => {
      return (
        <IconButton href={href ?? ''} {...rest}>
          <OndemandVideoIcon color="action" />
        </IconButton>
      )
    },
    []
  )

  return (
    <PageLayout title="Fire-wise Landscaping" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle
            title="Fire-Wise, Water-Wise Landscaping"
            subtitle="Smart Water Use"
          />
          <Box>
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://cdn.cosmicjs.com/2954df70-0693-11ec-82e2-c9b3a7ec6b59-210825Webinar480.mp4"
              aria-label="Watch a video of PCWA’s webinar on Fire-Wise, Water-Wise Landscaping (opens in a new window)"
            >
              <Image
                src="c657f680-05d1-11ec-b6f4-332534522a48-image001-3.jpg"
                alt="Fire-wise, water-wise landscaping webinar flier"
                layout="responsive"
                loader={imgixLoader}
                width={2396}
                height={1075}
              />
            </a>
            <Spacing size="large" />
            <RowBox alignItems="center" flexSpacing={3}>
              <ChildBox>
                <OndemandVideoBtn
                  href="https://cdn.cosmicjs.com/2954df70-0693-11ec-82e2-c9b3a7ec6b59-210825Webinar480.mp4"
                  rel="noopener noreferrer"
                  target="blank"
                />
              </ChildBox>
              <ChildBox>
                <MatLink
                  href="https://cdn.cosmicjs.com/2954df70-0693-11ec-82e2-c9b3a7ec6b59-210825Webinar480.mp4"
                  rel="noopener noreferrer"
                  variant="h3"
                  target="blank"
                  aria-label="Watch a video of PCWA’s webinar on Fire-Wise, Water-Wise Landscaping (opens in a new window)"
                >
                  Watch a video of PCWA’s webinar on Fire-Wise, Water-Wise
                  Landscaping, hosted on{' '}
                  <Type variant="inherit" noWrap component="span">
                    August 25, 2021
                  </Type>
                  . You can find it here.
                </MatLink>
              </ChildBox>
            </RowBox>
            <Spacing factor={2} />
            {/* <Type variant="h3">Fire-Wise, Water-Wise Landscaping</Type> */}
            <Type paragraph>
              Much of PCWA’s service area is located in the wildland-urban
              interface, where beautiful forests meet new and existing
              neighborhoods. As the threat of wildfire becomes ever-more present
              with a changing climate, a new type of landscaping—one that is not
              only water-wise but also fire-wise—is emerging as a new tool for
              reducing the vulnerability of homes and property to wildfire.
            </Type>
            <Spacing />
            <RowBox responsive flexSpacing={6}>
              <ChildBox flex="75%">
                <Type variant="h3" gutterBottom>
                  What is Fire-Wise, Water-Wise Landscaping?
                </Type>
                <Type paragraph>
                  Fire-Wise, Water-Wise Landscaping (also called “Firescaping”)
                  is the practice of designing and maintaining your yard in a
                  way that reduces its vulnerability to wildfire. The goal is to
                  create a landscape that is both beautiful and provides
                  defensible space to protect your home and property from fire.
                </Type>
                <Type paragraph>
                  These landscapes can include many of the same traditional
                  landscape elements that are important to living and enjoying
                  your home, including places to entertain and play, and plants
                  with varying colors, textures, flowers and foliage. The
                  difference lies in the types of plants and their placement.
                </Type>
              </ChildBox>
              <ChildBox flex="25%">
                <Paper>
                  <Box p={2}>
                    <Type variant="body1">
                      <em>
                        <StrongEmphasis>Defensible space</StrongEmphasis> is an
                        area between your home and other structures where
                        potential fuel (materials or vegetation) are modified,
                        reduced or cleared to create a barrier and slow the
                        spread of wildfire toward a home.
                      </em>
                    </Type>
                  </Box>
                </Paper>
              </ChildBox>
            </RowBox>
            <Spacing />
            <Type variant="h3" gutterBottom>
              Plant Selection
            </Type>

            <Type paragraph>
              A fire-resistant landscape features plants less likely to catch
              fire placed in ways to resist the spread of fire to a home. There
              are no “fire-proof” plants—plants cannot be damaged or killed by
              fire. However, there are plants with foliage and stems that are
              less likely to significantly contribute to a fire’s fuel and
              intensity as long as they are properly maintained, pruned and
              watered. These plants are also great in California, because they
              are often native and/or drought tolerant.
            </Type>
            <Type paragraph>
              On the other hand, Fire-Wise, Water-Wise landscaping avoids the
              planting of evergreen shrubs and trees, as well as ornamental
              grasses and berries, within 30 feet of a home because they are
              typically more flammable.
            </Type>
            <Type paragraph>
              Once planted, properly maintaining trees, shrubs and plants is
              just as important as their selection.
            </Type>

            <Spacing size="large" />
            <RowBox alignItems="center" flexSpacing={3}>
              <ChildBox>
                <OndemandVideoBtn
                  href="https://cdn.cosmicjs.com/e27c49f0-05d2-11ec-b6f4-332534522a48-FirehouseKevin.mp4"
                  rel="noopener noreferrer"
                  target="blank"
                />
              </ChildBox>
              <ChildBox>
                <MatLink
                  href="https://cdn.cosmicjs.com/e27c49f0-05d2-11ec-b6f4-332534522a48-FirehouseKevin.mp4"
                  rel="noopener noreferrer"
                  variant="h3"
                  target="blank"
                >
                  Watch a brief video: Introduction to Fire-Wise, Water-Wise
                  Landscaping with Kevin Marini, Placer County Master Gardener,
                  interviewed by Battalion Chief Rob Zaucha of the Auburn Fire
                  Department.
                </MatLink>
              </ChildBox>
            </RowBox>
            <Spacing size="large" />

            <RowBox alignItems="center" flexSpacing={3}>
              <ChildBox>
                <OndemandVideoBtn
                  href="https://cdn.cosmicjs.com/e5d2c7f0-05d2-11ec-b6f4-332534522a48-GreenAcres.mp4"
                  rel="noopener noreferrer"
                  target="blank"
                />
              </ChildBox>
              <ChildBox>
                <MatLink
                  href="https://cdn.cosmicjs.com/e5d2c7f0-05d2-11ec-b6f4-332534522a48-GreenAcres.mp4"
                  variant="h3"
                >
                  Watch a brief video: Water-Wise Plants with Greg Gayton, Green
                  Acres Nursery & Supply, interviewed by PCWA’s Linda Higgins{' '}
                </MatLink>
              </ChildBox>
            </RowBox>
            <Spacing size="large" />
            <Paper elevation={0}>
              <Box p={1}>
                <List>
                  <ListItem
                    component="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    classes={{root: classes.listItem}}
                    href="https://docs.pcwa.net/maidu-fire-station-landscape-plants.pdf"
                  >
                    <ListItemText primary="See the plant list used in the Maidu Fire Station Makeover in Auburn" />
                  </ListItem>
                  <ListItem
                    component="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    classes={{root: classes.listItem}}
                    href="https://docs.pcwa.net/cnps-redbud-fire-resistant.pdf"
                  >
                    <ListItemText primary="Selected Fire-Resistant Native Plants for Nevada and Placer County Landscapes" />
                  </ListItem>
                  <ListItem
                    classes={{root: classes.listItem}}
                    component="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.firesafemarin.org/fire-smart-yard/choosing-plants"
                  >
                    <ListItemText primary="Learn more about Fire-Wise, Water-Wise plants from FIRESafe Marin" />
                  </ListItem>
                  <ListItem
                    classes={{root: classes.listItem}}
                    component="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.firesafemarin.org/fire-smart-yard/mulches"
                  >
                    <ListItemText primary="Learn about fire-resistant mulch from FIRESafe Marin" />
                  </ListItem>
                  <ListItem
                    classes={{root: classes.listItem}}
                    component="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://naes.agnt.unr.edu/PMS/Pubs/1510_2011_95.pdf"
                  >
                    <ListItemText primary="The Combustibility of Landscape Mulches by the University of Nevada Cooperative Extension" />
                  </ListItem>
                </List>
              </Box>
            </Paper>
            <Spacing factor={2} />
            <Type variant="h3" gutterBottom>
              Landscape Design and Plant Placement
            </Type>
            <Type paragraph>
              Design principles incorporate all of a landscape’s features to
              create defensible space and fuel breaks, including driveways,
              lawns, walkways, patios, parking areas, boulders and rocks, pools,
              ponds, streams and other areas. The overall approach is “less is
              more” - with plenty of space between plants, groups of plants and
              other elements.
            </Type>
            <Type paragraph>
              Design is often built around concentric fire-safety zones or
              circles with plants that become taller and less water intensive
              the further away from the home. Combined, the zones create 100
              feet of defensible space around a home required by California law
              to prevent the spread of wildfire.
            </Type>
            <Type>
              Zone 1 is the 30 feet closest to a home or structure, which is the
              most critical area for defensible space. Here, plants should be
              efficiently irrigated throughout the fire season. Plants for this
              area may include perennials, low-growing or non-woody deciduous
              plants, or a small amount of lawn (or turf alternative) irrigated
              with high-efficiency rotator sprinklers and a weather-based
              sprinkler timer (rebates available!). Other good choices for this
              area include patios, masonry or rock planters, dry streambeds and
              boulders.
            </Type>
            <Spacing size="large" />
            <RowBox alignItems="center" flexSpacing={3}>
              <ChildBox>
                <OndemandVideoBtn
                  href="https://cdn.cosmicjs.com/e340d270-05d2-11ec-b6f4-332534522a48-FirehouseJeff.mp4"
                  rel="noopener noreferrer"
                  target="blank"
                />
              </ChildBox>
              <ChildBox>
                <MatLink
                  href="https://cdn.cosmicjs.com/e340d270-05d2-11ec-b6f4-332534522a48-FirehouseJeff.mp4"
                  rel="noopener noreferrer"
                  variant="h3"
                  target="blank"
                >
                  Watch a brief video: Landscape and Irrigation Design with Jeff
                  Ambrosia, Yamaski Landscape Architecture, interviewed by
                  Battalion Chief Rob Zaucha of the Auburn Fire Department.
                </MatLink>
              </ChildBox>
            </RowBox>
            <Spacing size="large" />

            <Paper elevation={0}>
              <Box p={1}>
                <List>
                  <ListItem
                    component="a"
                    classes={{root: classes.listItem}}
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://docs.pcwa.net/maidu-fire-station-landscape-dev-plans.pdf"
                  >
                    <ListItemText primary="See the landscape design used in the Maidu Fire Station Makeover in Auburn" />
                  </ListItem>
                  <ListItem
                    component="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.firesafemarin.org/fire-smart-yard"
                    classes={{root: classes.listItem}}
                  >
                    <ListItemText primary="Find more about creating a Fire-Smart Yard from FIRESafe Marin, including several helpful videos" />
                  </ListItem>
                  <ListItem
                    component="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://climate.asla.org/FirescapeDemonstrationGarden.html"
                    classes={{root: classes.listItem}}
                  >
                    <ListItemText primary="Learn more about planting zones" />
                  </ListItem>
                </List>
              </Box>
            </Paper>
            <Spacing factor={2} />
            <RowBox justifyContent="space-around">
              <Box maxWidth={1400} flex="1 1 auto">
                <ImageParallaxBanner
                  amount={0.1}
                  ImageProps={{
                    width: 6720,
                    height: 4480,
                    priority: true,
                    src: 'https://imgix.cosmicjs.com/0aa9f030-d937-11eb-a548-fd45a29c394a-3-Fire-station-year-after-makeover002.jpg',
                    alt: 'Photo of Maidu Fire Station landscaped with fire-wise and water-wise plants'
                  }}
                  style={{
                    height: '45vw',
                    maxHeight: '55vh'
                  }}
                />
              </Box>
            </RowBox>
            <Spacing factor={2} />
            <Type variant="h3" gutterBottom>
              Other Considerations
            </Type>

            <List>
              <ListItem classes={{root: classes.listItem}}>
                <ListItemText primary="A home on a brushy site above a south- or west-facing slope will require more extensive defensible space landscape planning than a home located on a flat lot with little vegetation." />
              </ListItem>
              <ListItem classes={{root: classes.listItem}}>
                <ListItemText primary="Prevailing winds, seasonal weather, local fire history and the characteristics of native vegetation are also important to consider when creating your Fire-Wise, Water-Wise landscape." />
              </ListItem>
            </List>

            <Spacing />
            <Type variant="h3" gutterBottom>
              Demonstration Gardens
            </Type>
            <Paper elevation={0}>
              <Box p={1}>
                <List>
                  <Link
                    href="/smart-water-use/maidu-fire-station-makeover"
                    as="/smart-water-use/maidu-fire-station-makeover"
                    passHref
                  >
                    <ListItem component="a" classes={{root: classes.listItem}}>
                      <ListItemText primary="Maidu Fire Station Makeover in Auburn" />
                    </ListItem>
                  </Link>
                  <ListItem
                    component="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://climate.asla.org/FirescapeDemonstrationGarden.html"
                    classes={{root: classes.listItem}}
                  >
                    <ListItemText primary="Firescape Demonstration Garden at Santa Barbara’s Firehouse #7" />
                  </ListItem>
                </List>
              </Box>
            </Paper>
            <Spacing />
            <Type variant="h3" gutterBottom>
              Additional Resources
            </Type>
            <List>
              <ListItem>
                <ListItemText>
                  <Type variant="subtitle1">Firewise Trailer Program </Type>
                  <Type variant="subtitle2" gutterBottom>
                    <em>Free from the Placer Resource Conservation District</em>
                  </Type>
                  <Type>
                    To assist communities in becoming fire safe, the Placer RCD
                    Firewise Trailer is now available for community and
                    neighborhood clean-up days. The trailer is full of tools
                    such as pruners, rakes, weed eaters, loppers weed wrenches
                    and hand tools. Educational materials regarding defensible
                    space and wildfire prevention are also available for events.
                    For information, please contact George Alves at{' '}
                    <MatLink href="mailto:George@placerrcd.org">
                      George@placerrcd.org
                    </MatLink>
                  </Type>
                </ListItemText>
              </ListItem>
              <ListItem
                component="a"
                target="_blank"
                rel="noopener noreferrer"
                classes={{root: classes.listItem}}
                href="http://sonomamg.ucanr.edu/Firewise_Landscaping/"
              >
                <ListItemText primary="Firewise Landscaping Information from the UC Master Gardener Program of Sonoma County" />
              </ListItem>
              <ListItem
                component="a"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.readyforwildfire.org/prepare-for-wildfire/get-ready/fire-resistant-landscaping/"
                classes={{root: classes.listItem}}
              >
                <ListItemText primary="Fire-Resistant Landscaping Information from CalFire" />
              </ListItem>
              <ListItem
                component="a"
                target="_blank"
                rel="noopener noreferrer"
                href="https://ucanr.edu/sites/fire/Prepare/"
                classes={{root: classes.listItem}}
              >
                <ListItemText primary="UC Cooperative Extension: Fire in California: Wildfire Preparation" />
              </ListItem>
              <ListItem
                component="a"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.placer.ca.gov/5721/Fire-Safe-Alliance"
                classes={{root: classes.listItem}}
              >
                <ListItemText primary="Placer County Fire Safe Alliance" />
              </ListItem>
              <ListItem
                component="a"
                target="_blank"
                rel="noopener noreferrer"
                href="https://ucanr.edu/sites/SoCo/files/308873.pdf"
                classes={{root: classes.listItem}}
              >
                <ListItemText primary="Produce Safety after Urban Wildfire" />
              </ListItem>
              <ListItem
                component="a"
                target="_blank"
                rel="noopener noreferrer"
                href="http://pcmg.ucanr.org/Drought_Advice/"
                classes={{root: classes.listItem}}
              >
                <ListItemText primary="UC Master Gardeners of Placer County Drought Advice" />
              </ListItem>
              {/* <ListItem
                component="a"
                target="_blank"
                rel="noopener noreferrer"
                href="https://docs.pcwa.net/test.png"
                classes={{root: classes.listItem}}
              >
                <ListItemText primary="test" />
              </ListItem> */}
            </List>
          </Box>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export default FireWiseLandscapingPage
