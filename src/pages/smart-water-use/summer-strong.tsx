import React, {useState, useCallback} from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import PageTitle from '@components/PageTitle/PageTitle'
import {RowBox, ChildBox} from '@components/MuiSleazebox'
import {
  Typography as Type,
  Box,
  Link,
  useMediaQuery,
  useTheme,
  TypographyProps
} from '@mui/material'
// import LeafIcon from 'mdi-material-ui/Leaf'
// import BirdIcon from 'mdi-material-ui/Bird'
// import StarsIcon from 'mdi-material-ui/Creation'
// import SunIcon from 'mdi-material-ui/WhiteBalanceSunny'
// import TitleIcon from '@mui/icons-material/LocalFlorist'
// import BeeIcon from '@mui/icons-material/EmojiNature'
import Image from 'next/legacy/image'
import NextLink from 'next/link'
import imgixLoader from '@lib/imageLoader'
import Spacing from '@components/boxes/Spacing'
import ImageFancier from '@components/ImageFancier/ImageFancier'
import {getImgixBlurHashes} from '@components/imageBlur/ImageBlur'
import {GetStaticProps} from 'next'
import usePlaceholders from '@components/imageBlur/usePlaceholders'
import {Placeholders} from '@components/imageBlur/ImageBlurStore'
import MediaDialogOnClick from '@components/MediaDialogOnClick/MediaDialogOnClick'
import WideContainer from '@components/containers/WideContainer'
import {grey} from '@mui/material/colors'
import ClevSageAccordion from '@components/summer-strong/ClevSageAccordion'
import LionsTailAccordion from '@components/summer-strong/LionsTailAccordion'
import CrapeMyrtleAccordion from '@components/summer-strong/CrapeMyrtleAccordion'
import VerbenaAccordion from '@components/summer-strong/VerbenaAccordion'
import SantaBarbaraDaisyAccordion from '@components/summer-strong/SantaBarbaraDaisyAccordion'
import FuchsiaAccordion from '@components/summer-strong/FuchsiaAccordion'
import FoothillPenstemonAccordion from '@components/summer-strong/FoothillPenstemonAccordion'
import WesternRedbudAccordion from '@components/summer-strong/WesternRedbudAccordion'
import ValleyVioletLilacAccordion from '@components/summer-strong/ValleyVioletLilacAccordion'

type Props = {
  placeholders: Placeholders
}

const imgixImages = [
  'https://imgix.cosmicjs.com/29837ac0-f4d4-11ed-bb44-790a83f99a24-PCWA-Summer-Strong-Cleveland-Sage-050823.jpg',
  'https://imgix.cosmicjs.com/29536a10-f4d4-11ed-bb44-790a83f99a24-FL-Salvia-clevelandii-State-Fair-7-24.JPG',
  'https://imgix.cosmicjs.com/297bb290-f4d4-11ed-bb44-790a83f99a24-N-Salvia-clevelandii-8-23.JPG',
  'https://imgix.cosmicjs.com/296878b0-f4d4-11ed-bb44-790a83f99a24-N-Salvia-clevelandii-5-16-3.JPG',
  'https://imgix.cosmicjs.com/c12deaa0-0199-11ee-9c26-15fefb4eeda0-FL-Erigeron.JPG',
  'https://imgix.cosmicjs.com/6d0cb510-1c1e-11ee-8805-5d9e4358a1d4-IMG6411.JPG',
  'https://imgix.cosmicjs.com/98712ae0-33b3-11ee-9ab5-815d9b73ff1f-T-Lagerstroemia-Tuscarora-8-26.JPG',
  'https://imgix.cosmicjs.com/e27e0eb0-491f-11ee-89ab-17371fc03105-FL-Lionstail-2391.JPG',
  'https://imgix.cosmicjs.com/e1ea3320-491f-11ee-bfb7-cfc5e4366a0b-FL-Leonitis-Lions-Tail.JPG',
  'https://imgix.cosmicjs.com/4b4381a0-5e1a-11ee-b975-cb0cfadd93ad-N-Zaushneria-0856-Test-Garden.JPG',
  'https://imgix.cosmicjs.com/dfdbf900-5e1a-11ee-b975-cb0cfadd93ad-3093a-Credit-Garden-Soft.jpg',
  'https://pcwa.imgix.net/pcwa-net/water-efficiency/summer-strong/N%20Penstemon%20Margarita%20BOP%204-17.JPG',
  // 'https://pcwa.imgix.net/pcwa-net/water-efficiency/summer-strong/ceanothus-clusters.webp',
  // 'https://pcwa.imgix.net/pcwa-net/water-efficiency/summer-strong/valley-violet.webp'
  'https://pcwa.imgix.net/pcwa-net/water-efficiency/summer-strong/Ceanothus%20maritimus%20%E2%80%98Valley%20Violet%E2%80%99.jpg',
  'https://pcwa.imgix.net/pcwa-net/water-efficiency/summer-strong/1000_F_435874585_H4ui8yCFHnprmInZvYmj7NnnOLstT6Mb.jpg'
]

export const StrongGrey = ({children, sx, ...props}: TypographyProps) => {
  return (
    <Type
      component="strong"
      sx={{color: grey[800], ...props.style, ...sx}}
      {...props}
    >
      {children}
    </Type>
  )
}

const UcMasterGardenersLogo = () => {
  return (
    <>
      <Image
        // src="29837ac0-f4d4-11ed-bb44-790a83f99a24-PCWA-Summer-Strong-Cleveland-Sage-050823.jpg"
        src="853a4840-f5d2-11ed-a7ff-83a764999c5f-UC-Master-Gardeners-logo.png"
        priority
        alt="UC Master Gardeners logo"
        loader={imgixLoader}
        layout="responsive"
        sizes="(max-width: 600px) 60vw, 20vw"
        width={900}
        height={900}
      />
      <Type variant="caption">
        <em>partnered with</em>
        <br />
        <Link
          variant="inherit"
          target="_blank"
          href="https://pcmg.ucanr.org"
          rel="noopener noreferrer"
        >
          UC Master Gardeners
          <br />
          of Placer County
        </Link>
      </Type>
    </>
  )
}

export default function SummerStrongPage({placeholders}: Props) {
  usePlaceholders(placeholders)
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))
  const imgixArParams = '?ar=5:4&fit=crop&crop=top'
  const [expanded, setExpanded] = useState<string | false>(false)

  const handleChange = useCallback(
    (panel: string) =>
      (_event: React.SyntheticEvent<Element, Event>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false)
      },
    []
  )
  return (
    <PageLayout title="Summer Strong" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle title="Summer Strong" subtitle="Smart Water Use" />
          <RowBox responsive flexSpacing={6}>
            <ChildBox flex="85%">
              <Type paragraph>
                Summer Strong plants are not only beautiful but tough enough to
                handle the hottest days. PCWA is pleased to partner with the UC
                Master Gardeners of Placer County to highlight Summer Strong
                flowers, shrubs and trees that are water-wise, well-suited to
                Placer County's environment and available at local nurseries.
              </Type>
              <Type>
                Fire-wise plants are also Summer Strong. You can learn more
                about Fire-Wise landscaping, including a list of plants used in
                the Maidu Fire Station Makeover in Auburn on our{' '}
                <NextLink
                  href="/smart-water-use/fire-wise-landscaping"
                  passHref
                >
                  <Link underline="always">
                    Fire-Wise, Water-Wise Landscaping
                  </Link>
                </NextLink>{' '}
                page.
              </Type>
              <Spacing size="x-large" />
              <Type variant="h2" color="primary">
                Featured Plant of the Month
              </Type>
              <Spacing />
              <RowBox>
                {/* <LeafIcon color="secondary" sx={{marginRight: '8px'}} /> */}
                {/* <LeafIcon sx={{marginRight: '8px', color: purple[300]}} /> */}
                {/* <BirdIcon
                  sx={{marginRight: '8px', color: blueGrey[500], fontSize: 32}}
                /> */}
                {/* <SunIcon
                  sx={{marginRight: '8px', color: orange[400], fontSize: 32}}
                /> */}
                {/* <TitleIcon
                  sx={{marginRight: '8px', color: purple[300], fontSize: 32}}
                /> */}
                {/* <Type variant="h3" gutterBottom>
                  A Butterfly Buffet!
                </Type>*/}
                {/* <BeeIcon
                  sx={{marginRight: '8px', color: grey[700], fontSize: 32}}
                /> */}
                <Type variant="h3" gutterBottom>
                  GOLDEN STANDOUT IN SUMMER, FALL
                </Type>
              </RowBox>
              {/* <Type variant="h3">Cleveland Sage (and other Salvias)</Type> */}
              <Type variant="h3">California goldenrod</Type>
            </ChildBox>
            <ChildBox
              flex="15%"
              mx="auto"
              textAlign="center"
              display={isXs ? 'none' : 'block'}
            >
              <UcMasterGardenersLogo />
            </ChildBox>
          </RowBox>
          <Spacing />

          <Box>
            <RowBox flexSpacing={6} responsive>
              <ChildBox flex="0 1 33%">
                {/* <MediaDialogOnClick
                  // mediaUrl="https://pcwa.imgix.net/pcwa-net/water-efficiency/summer-strong/valley-violet.webp"
                  mediaUrl="https://pcwa.imgix.net/pcwa-net/water-efficiency/summer-strong/Ceanothus%20maritimus%20%E2%80%98Valley%20Violet%E2%80%99.jpg"
                  mediaName="‘Valley Violet’ California lilac"
                  // original dimensions
                  MediaPreviewDialogProps={{
                    ImageProps: {
                      // width: 1080,
                      // height: 798,
                      width: 300,
                      height: 300
                    }
                  }}
                > */}
                <Image
                  alt="‘Valley Violet’ California lilac"
                  // src={`https://pcwa.imgix.net/pcwa-net/water-efficiency/summer-strong/valley-violet.webp${imgixArParams}`}
                  src={`https://pcwa.imgix.net/pcwa-net/water-efficiency/summer-strong/Ceanothus%20maritimus%20%E2%80%98Valley%20Violet%E2%80%99.jpg${imgixArParams}`}
                  // 5/4 image aspect ratio dimensions (?ar=5%3A4&fit=crop&crop=top)
                  // width={998}
                  // height={798}
                  width={300}
                  height={240}
                  // defaultGrey
                  sizes="(max-width: 600px) 100vw, 33vw"
                  style={{
                    objectFit: 'contain'
                  }}
                />
                {/* </MediaDialogOnClick> */}
              </ChildBox>
              <ChildBox flex="0 1 33%">
                <MediaDialogOnClick
                  // mediaUrl="https://pcwa.imgix.net/pcwa-net/water-efficiency/summer-strong/ceanothus-clusters.webp"
                  mediaUrl="https://pcwa.imgix.net/pcwa-net/water-efficiency/summer-strong/1000_F_435874585_H4ui8yCFHnprmInZvYmj7NnnOLstT6Mb.jpg"
                  mediaName="‘Valley Violet’ California lilac flower close-up"
                  // original dimensions
                  MediaPreviewDialogProps={{
                    ImageProps: {
                      // width: 1440,
                      // height: 1049,
                      width: 1000,
                      height: 662
                    }
                  }}
                >
                  <ImageFancier
                    alt="‘Valley Violet’ California lilac flower close-up"
                    // src={`https://pcwa.imgix.net/pcwa-net/water-efficiency/summer-strong/ceanothus-clusters.webp${imgixArParams}`}
                    src={`https://pcwa.imgix.net/pcwa-net/water-efficiency/summer-strong/1000_F_435874585_H4ui8yCFHnprmInZvYmj7NnnOLstT6Mb.jpg${imgixArParams}`}
                    // 5/4 image aspect ratio dimensions (?ar=5%3A4&fit=crop&crop=top)
                    // width={1311}
                    // height={1049}
                    width={828}
                    height={662}
                    defaultGrey
                    sizes="(max-width: 600px) 100vw, 33vw"
                    style={{
                      objectFit: 'contain'
                    }}
                  />
                </MediaDialogOnClick>
              </ChildBox>
              {/* <ChildBox flex="0 1 33%">

              </ChildBox> */}
            </RowBox>
          </Box>
          <Spacing size="x-large" />
          <Type variant="h4">California goldenrod</Type>
          <Type variant="subtitle1" gutterBottom>
            <em>Solidago velutina ssp. californica</em>
          </Type>
          <Spacing size="small" />
          <Type variant="subtitle1" gutterBottom>
            <em>By Debbie Arrington, Sacramento Digs Gardening</em>
          </Type>
          <Type paragraph>
            Not all California wildflowers tolerate “captivity.” But California
            goldenrod would love a place in your Placer County garden. Local
            wildlife would appreciate it, too.
          </Type>
          <Type paragraph>
            Our native goldenrod (Solidago velutina ssp. californica) is easy to
            spot in valley and foothill meadows. In the grasslands surrounding
            oaks, this native perennial blooms when few other wildflowers can be
            seen—July through November.
          </Type>
          <Type paragraph>
            California goldenrod is well adapted to our climate; it needs winter
            rain but little summer water. It dependably comes back year after
            year.
          </Type>
          <Type paragraph>
            A sunflower cousin, goldenrod lives up to its name. Covering the
            tips of 3-foot-tall stalks, the flowerheads are made up of dozens,
            sometimes hundreds, of tiny yellow blooms. The clusters get so
            heavy, their weight eventually curves the stalks into crooks.
            Surrounded by native grasses, the stalks look like golden
            exclamation points and question marks.
          </Type>
          <Type paragraph>
            Besides its attractive looks, goldenrod supports wildlife for
            months. Bees and other beneficial insects love its pollen and nectar
            in late summer and fall. Birds gobble its seeds throughout fall and
            winter.
          </Type>
          <Type paragraph>
            See California goldenrod in the hedgerow at the UC Master Gardeners
            of Placer County Demonstration Garden at the Loomis Library and
            Community Learning Center.
          </Type>

          <Type paragraph>
            <StrongGrey>Bloom</StrongGrey>: California goldenrod produces tall
            stalks covered with tiny, bright yellow flowers from late summer
            through fall.
          </Type>
          <Type paragraph>
            <StrongGrey>Water needs</StrongGrey>: Low to very low, once
            established. Irrigate deeply once or twice a month.
          </Type>
          <Type paragraph>
            <StrongGrey>Sun</StrongGrey>: Prefers full sun or an open spot near
            an oak tree.
          </Type>
          <Type paragraph>
            <StrongGrey>Size</StrongGrey>: California goldenrod generally
            reaches 2 to 3 feet tall in summer, then dies back to the ground. It
            spreads by underground roots (and can become a garden thug), so make
            sure it has plenty of room.
          </Type>
          <Type paragraph>
            <StrongGrey>Care</StrongGrey>: Low to very low water requirements
            after the first year, once the roots are well established.
            California goldenrod needs little care; cut stalks to the ground
            after the plant dies back in winter to control the spread of seeds
            (or leave them for the birds). Goldenrod prefers a mostly dry
            summer, but can tolerate extra water – as well as poor soil.
          </Type>
          <Type paragraph>
            <StrongGrey>Availability</StrongGrey>: Native plant nurseries offer
            California goldenrod including the SacValley CNPS Nursery at Soil
            Born Farms in Rancho Cordova, Cornflower Farms in Elk Grove and
            Nevada County Native Plants in Nevada City.
          </Type>
          <Type paragraph>
            <StrongGrey>Bonus plants</StrongGrey>: California goldenrod thrives
            with other low-water natives such as deergrass (Muhlenbergia
            rigens), manzanita (Arctostaphylos sp.), Cleveland sage (Salvia
            clevelandii) and local oaks – valley oak (Quercus lobata) , blue oak
            (Q. douglasii) and interior live oak (Q. wislizeni).
          </Type>

          <Spacing size="large" />
          <Box>
            <Type variant="subtitle1" gutterBottom>
              Information:
            </Type>
            <Type>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                variant="body1"
                href="https://ucanr.edu/sites/WUCOLS/files/183488.pdf"
              >
                WUCOLS (https://ucanr.edu)
              </Link>
            </Type>
            {/* <Type>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                variant="body1"
                href="https://arboretum.ucdavis.edu/plant/valley-violet-maritime-ceanothus"
              >
                UC Davis Arboretum All-Star, ‘Valley Violet’ maritime ceanothus:
                (https://arboretum.ucdavis.edu)
              </Link>
            </Type> */}
            <Type>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                variant="body1"
                href="https://www.sacvalleycnps.org/product/solidago-velutina-ssp-californica"
              >
                SacValley CNPS, California goldenrod:
                (https://www.sacvalleycnps.org)
              </Link>
            </Type>
            {/* <Type>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                variant="body1"
                href="https://arboretum.ucdavis.edu/plant/island-pink-yarrow"
              >
                UC Davis Arboretum All Star, Island Pink Yarrow:
                (https://arboretum.ucdavis.edu)
              </Link>
            </Type> */}
            <Type>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                variant="body1"
                href="https://calscape.org/Solidago-velutina-ssp.-californica-(California-Goldenrod)"
              >
                Calscape, California goldenrod: (https://calscape.org)
              </Link>
            </Type>
          </Box>
          <Spacing size="x-large" />
          <Type variant="h2" color="primary">
            Previously Featured Plants
          </Type>
          <Spacing />
          <Type paragraph>
            Click on any of the dropdown(s) below to see previously featured
            Summer Strong plants.
          </Type>
          <Spacing />
          <Box>
            <ValleyVioletLilacAccordion
              imgixArParams={imgixArParams}
              expanded={expanded === 'panel9'}
              onChange={handleChange('panel9')}
              AccordionSummaryProps={{
                'aria-controls': 'panel9-content',
                id: 'panel9-header'
              }}
            />
            <WesternRedbudAccordion
              imgixArParams={imgixArParams}
              expanded={expanded === 'panel8'}
              onChange={handleChange('panel8')}
              AccordionSummaryProps={{
                'aria-controls': 'panel8-content',
                id: 'panel8-header'
              }}
            />
            <FoothillPenstemonAccordion
              imgixArParams={imgixArParams}
              expanded={expanded === 'panel7'}
              onChange={handleChange('panel7')}
              AccordionSummaryProps={{
                'aria-controls': 'panel7-content',
                id: 'panel7-header'
              }}
            />
            <FuchsiaAccordion
              imgixArParams={imgixArParams}
              expanded={expanded === 'panel1'}
              onChange={handleChange('panel1')}
              AccordionSummaryProps={{
                'aria-controls': 'panel1-content',
                id: 'panel1-header'
              }}
            />
            <LionsTailAccordion
              imgixArParams={imgixArParams}
              expanded={expanded === 'panel2'}
              onChange={handleChange('panel2')}
              AccordionSummaryProps={{
                'aria-controls': 'panel2-content',
                id: 'panel2-header'
              }}
            />
            <CrapeMyrtleAccordion
              imgixArParams={imgixArParams}
              expanded={expanded === 'panel3'}
              onChange={handleChange('panel3')}
              AccordionSummaryProps={{
                'aria-controls': 'panel3-content',
                id: 'panel3-header'
              }}
            />
            <VerbenaAccordion
              imgixArParams={imgixArParams}
              expanded={expanded === 'panel4'}
              onChange={handleChange('panel4')}
              AccordionSummaryProps={{
                'aria-controls': 'panel4-content',
                id: 'panel4-header'
              }}
            />
            <SantaBarbaraDaisyAccordion
              imgixArParams={imgixArParams}
              expanded={expanded === 'panel5'}
              onChange={handleChange('panel5')}
              AccordionSummaryProps={{
                'aria-controls': 'panel5-content',
                id: 'panel5-header'
              }}
            />
            <ClevSageAccordion
              imgixArParams={imgixArParams}
              expanded={expanded === 'panel6'}
              onChange={handleChange('panel6')}
              AccordionSummaryProps={{
                'aria-controls': 'panel6-content',
                id: 'panel6-header'
              }}
            />
          </Box>
          <Spacing size="x-large" />
          <Box
            margin="auto"
            textAlign="center"
            display={isXs ? 'block' : 'none'}
            width="40vw"
          >
            <UcMasterGardenersLogo />
          </Box>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    // const placeholders = await getImgixBlurHashes(imgixImages, {
    //   urlPrefix: 'https://imgix.cosmicjs.com/'
    // })
    const placeholders = await getImgixBlurHashes(imgixImages)

    return {
      props: {placeholders}
    }
  } catch (error) {
    console.log(
      'There was an error fetching placeholders for Summer Strong page',
      error
    )
    return {props: {}}
  }
}
