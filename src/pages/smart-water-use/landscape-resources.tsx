// cspell:ignore Eisley Normac Selec
import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import {Typography as Type, Divider, Box} from '@material-ui/core'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import {ChildBox, RowBox} from 'mui-sleazebox'
import Spacing from '@components/boxes/Spacing'
import OpenInNewLink, {
  OpenInNewLinkProps
} from '@components/OpenInNewLink/OpenInNewLink'
import {TypographyProps} from '@material-ui/core/Typography'
import {DividerProps} from '@material-ui/core/Divider'
import Image from 'next/image'
import imgixLoader from '@lib/imageLoader'

// const useStyles = makeStyles(() =>
//   createStyles({
//     annotate: {
//       textTransform: 'capitalize'
//     }
//   })
// )

const ResourceLink = ({children, ...rest}: OpenInNewLinkProps) => {
  return (
    <>
      <OpenInNewLink {...rest}>{children}</OpenInNewLink>
      <br />
    </>
  )
}
const Resource = ({children, ...rest}: TypographyProps<'div'>) => {
  return (
    <Type variant="body2" component="div" {...rest}>
      {children}
    </Type>
  )
}

const ResourceDivider = ({...rest}: DividerProps) => {
  return (
    // 10px spacing
    <Spacing size="x-small" factor={1.25}>
      <Divider {...rest} />
    </Spacing>
  )
}

const LandscapeResourcesPage = () => {
  return (
    <PageLayout title="Landscaping Resources" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle title="Landscaping Resources" subtitle="Smart Water Use" />
          <Type paragraph>
            Having a beautiful yard doesn’t have to mean using a lot of water or
            spending a lot of money. Below you'll find local professionals and
            resources that can help you upgrade, repair, design or install your
            water-wise landscape and water efficient irrigation system.
          </Type>
          <Spacing />
          <RowBox responsive flexSpacing={4}>
            <ChildBox flex="33.3%">
              <Type variant="subtitle1" gutterBottom color="primary">
                Local Nurseries & Growers
              </Type>
              <Resource>
                <ResourceLink href="https://norcalwholesalebark.com">
                  NorCal Wholesale Bark
                </ResourceLink>
                Applied Landscape Materials, Inc. (bark blower truck
                installation
                <br />
                4500 Pacific Street, Suite O, Rocklin, CA 95677 <br />
                (916) 632-9419
              </Resource>
              <ResourceDivider />
              <Resource>
                <ResourceLink href="https://www.eisleynursery.com">
                  Eisley Nursery
                </ResourceLink>
                380 Nevada Street <br />
                Auburn, CA 95603 <br />
                (530) 885-5163
              </Resource>
              <ResourceDivider />
              <Resource>
                <ResourceLink href="https://idiggreenacres.com">
                  Green Acres Nursery & Supply
                </ResourceLink>
                <em>Roseville Store</em>
                <br />
                901 Galleria Blvd., <br />
                Roseville, CA 95678 <br />
                (916) 782-2273
                <br />
                <em>Rocklin Store</em>
                <br />
                5436 Crossings Dr., <br />
                Rocklin, CA 95677 <br />
                (916) 824-1310
              </Resource>
              <ResourceDivider />
              <Resource>
                <ResourceLink href="https://www.highhand.com">
                  High Hand Nursery
                </ResourceLink>
                3750 Taylor Road <br />
                Loomis, CA 95650 <br />
                (916) 652-2065
              </Resource>
              <ResourceDivider />
              <Resource>
                <ResourceLink href="http://www.hrnursery.com">
                  High Ranch Nursery, Inc.
                </ResourceLink>
                <em>Wholesale Nursery</em>
                <br />
                3800 Delmar Ave. <br />
                Loomis, CA 9650 <br />
                (916) 652-9261
              </Resource>
              <ResourceDivider />
              <Resource>
                <ResourceLink href="https://www.flowerfarminn.com">
                  The Flower Farm
                </ResourceLink>
                4150 Auburn Folsom Road <br />
                Loomis, CA 95650 <br />
                (916) 652-5650
              </Resource>
              <ResourceDivider />
              <Resource>
                <ResourceLink href="https://www.bushnellgardens.com">
                  Bushnell Gardens Nursery
                </ResourceLink>
                5255 Douglas Blvd <br />
                Granite Bay, CA 95746 <br />
                (916) 791-4199
              </Resource>
              <ResourceDivider />
              <Resource>
                <ResourceLink href="https://goldenpondwaterplants.com">
                  Golden Pond Water Plants
                </ResourceLink>
                3275 Sierra College Blvd. <br />
                Loomis, CA 95650 <br />
                (916) 652-5459
              </Resource>
              <Spacing size="large" />
              <Type variant="subtitle1" gutterBottom color="primary">
                Local Demonstration Gardens
              </Type>
              <Resource>
                <ResourceLink href="https://www.usbr.gov/mp/arwec">
                  American River Water Education Center
                </ResourceLink>
                7794 Folsom Dam Road <br />
                Folsom, CA 95630 <br />
                (916) 989-7275
              </Resource>
              <ResourceDivider />
              <Resource>
                <ResourceLink href="http://placernaturecenter.org/about-us/exhibits">
                  Placer Nature Center
                </ResourceLink>
                3700 Christian Valley Road <br />
                Auburn, CA 95602 <br />
                (530) 878-6053
              </Resource>
              <ResourceDivider />
              <Resource>
                <ResourceLink href="https://www.sjwd.org/water-efficiency">
                  San Juan Water District WEL Garden
                </ResourceLink>
                9935 Auburn Folsom Road <br />
                Granite Bay, CA 95746 <br />
                (916) 791-2663
              </Resource>
            </ChildBox>
            <ChildBox flex="33.3%">
              <Type variant="subtitle1" gutterBottom color="primary">
                Local Irrigation Houses
              </Type>
              <Resource>
                <ResourceLink href="http://www.sierrapipe.com">
                  Anderson’s Sierra Pipe Company
                </ResourceLink>
                825 Nevada Street <br />
                Auburn, CA 95603 <br />
                (530) 885-8475
              </Resource>
              <ResourceDivider />
              <Resource>
                <ResourceLink href="https://www.ewingirrigation.com">
                  Ewing Irrigation
                </ResourceLink>
                500 Berry St., Unit B <br />
                Roseville, CA 95678 <br />
                (916) 784-0323
              </Resource>
              <ResourceDivider />
              <Resource>
                <ResourceLink href="https://www.idiggreenacres.com">
                  Green Acres Nursery & Supply
                </ResourceLink>
                <em>Roseville Store</em>
                <br />
                901 Galleria Blvd., <br />
                Roseville, CA 95678 <br />
                (916) 782-2273
                <br />
                <em>Rocklin Store</em>
                <br />
                5436 Crossings Dr., <br />
                Rocklin, CA 95677 <br />
                (916) 824-1310
              </Resource>
              <ResourceDivider />
              <Resource>
                <ResourceLink href="https://www.horizononline.com">
                  Horizon Irrigation
                </ResourceLink>
                861 Galleria Blvd. <br />
                Roseville, CA 95678 <br />
                (916) 780-2033
              </Resource>
              <ResourceDivider />
              <Resource>
                <ResourceLink href="http://www.normac1.com">
                  Normac Irrigation
                </ResourceLink>
                4311 Anthony Ct. #900 <br />
                Rocklin, CA 95677 <br />
                (916) 652-5827
              </Resource>
              <ResourceDivider />
              <Resource>
                <ResourceLink href="https://www.dripriteirrigationproducts.com">
                  Drip Rite Irrigation Products
                </ResourceLink>
                308 Melville Ct <br />
                Roseville, CA 95747 <br />
                (916) 797-8707
              </Resource>
              <ResourceDivider />
              <Resource>
                <ResourceLink href="https://www.siteone.com">
                  SiteOne Landscape Supply
                </ResourceLink>
                1675 Nichols Dr. <br />
                Rocklin, CA 95765 <br />
                (916) 408-0024
              </Resource>
              <Spacing size="large" />
              <Type variant="subtitle1" gutterBottom color="primary">
                Additional Resources
              </Type>
              <Resource>
                <ResourceLink href="https://www.fire.ca.gov">
                  California Department of Forestry &amp; Fire Protection
                </ResourceLink>
                Creating and maintaining defensible space
              </Resource>
              <ResourceDivider />
              <Resource>
                <ResourceLink href="http://www.ecolandscape.org/new-ca">
                  Eco-Friendly Landscape Design
                </ResourceLink>
              </Resource>
              <ResourceDivider />
              <Resource>
                <ResourceLink href="http://pcmg.ucanr.org/index.cfm">
                  Placer County Master Gardeners
                </ResourceLink>
              </Resource>
              <ResourceDivider />
              <Resource>
                <ResourceLink href="https://www.sunset.com/plantfinder">
                  Sunset Plant Finder
                </ResourceLink>
              </Resource>
              <ResourceDivider />
              <Resource>
                <ResourceLink href="https://selectree.calpoly.edu/index">
                  Urban Forests Ecosystems Institute
                </ResourceLink>
                CalPoly SelecTree Guide - Selecting & Placing Trees
              </Resource>
              <ResourceDivider />
              <Resource>
                <ResourceLink href="https://arboretum.ucdavis.edu">
                  University of California, Davis
                </ResourceLink>
                Recommended Plants for Central Valley Gardens
              </Resource>
            </ChildBox>
            <ChildBox flex="33.3%">
              <Box
                mx="auto"
                width={{xs: '70vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
              >
                <Image
                  src="d0684f40-6b42-11e7-b267-0b654f5c65d5-landscape_ymbpw3.png"
                  alt="Landscaping Photo Collage"
                  loader={imgixLoader}
                  layout="responsive"
                  sizes="(max-width: 600px) 70vw, 34vw"
                  width={828}
                  height={1274}
                />
              </Box>
            </ChildBox>
          </RowBox>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export default LandscapeResourcesPage
