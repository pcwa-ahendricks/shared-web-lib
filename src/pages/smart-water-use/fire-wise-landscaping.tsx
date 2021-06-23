import React from 'react'
import {
  ListItemText,
  Box,
  Typography as Type,
  createStyles,
  List,
  ListItem,
  makeStyles
} from '@material-ui/core'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import Spacing from '@components/boxes/Spacing'
import Link from 'next/link'

const useStyles = makeStyles(() => createStyles({}))

const FireWiseLandscapingPage = () => {
  const classes = useStyles()

  return (
    <PageLayout title="Fire-wise Landscaping" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle
            title="Fire-Wise, Water-Wise Landscaping"
            subtitle="Smart Water Use"
          />
          <Box>
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
            <Type variant="h3" gutterBottom>
              What is Fire-Wise, Water-Wise Landscaping?
            </Type>
            <Type paragraph>
              Fire-Wise, Water-Wise Landscaping (also called “Firescaping”) is
              the practice of designing and maintaining your yard in a way that
              reduces its vulnerability to wildfire. The goal is to create a
              landscape that is both beautiful and provides defensible space to
              protect your home and property from fire.
            </Type>
            <Type paragraph>
              These landscapes can include many of the same traditional
              landscape elements that are important to living and enjoying your
              home, including places to entertain and play, and plants with
              varying colors, textures, flowers and foliage. The difference lies
              in the types of plants and their placement.
            </Type>
            <Spacing />
            <Type variant="h3" gutterBottom>
              Plant Selection
            </Type>
            <List>
              <Link
                href="/smart-water-use/maidu-fire-station-makeover#landscapeDesignPlan"
                passHref
              >
                <ListItem component="a">
                  <ListItemText primary="See the landscape design used in the Maidu Fire Station Makeover in Auburn" />
                </ListItem>
              </Link>
              <ListItem>
                <ListItemText primary="Find more about creating a Fire-Smart Yard from FIRESafe Marin, including several helpful videos [link to: https://www.firesafemarin.org/fire-smart-yard]" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Learn more about planting zones [link to: https://climate.asla.org/FirescapeDemonstrationGarden.html]" />
              </ListItem>
            </List>
            <Spacing />
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
            <Spacing />
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
            <Spacing />
            <Type variant="h3" gutterBottom>
              Other Considerations
            </Type>
            <Spacing />
            <Type variant="h3" gutterBottom>
              Demonstration Gardens
            </Type>
          </Box>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default FireWiseLandscapingPage
