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
import LeafIcon from 'mdi-material-ui/Leaf'
// import BirdIcon from 'mdi-material-ui/Bird'
// import StarsIcon from 'mdi-material-ui/Creation'
// import SunIcon from 'mdi-material-ui/WhiteBalanceSunny'
// import TitleIcon from '@mui/icons-material/LocalFlorist'
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
import {grey, purple} from '@mui/material/colors'
import ClevSageAccordion from '@components/summer-strong/ClevSageAccordion'
import LionsTailAccordion from '@components/summer-strong/LionsTailAccordion'
import CrapeMyrtleAccordion from '@components/summer-strong/CrapeMyrtleAccordion'
import VerbenaAccordion from '@components/summer-strong/VerbenaAccordion'
import SantaBarbaraDaisyAccordion from '@components/summer-strong/SantaBarbaraDaisyAccordion'
import FuchsiaAccordion from '@components/summer-strong/FuchsiaAccordion'
import FoothillPenstemonAccordion from '@components/summer-strong/FoothillPenstemonAccordion'

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
  'https://pcwa.imgix.net/pcwa-net/water-efficiency/summer-strong/N%20Penstemon%20Margarita%20BOP%204-17.JPG'
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
                <LeafIcon sx={{marginRight: '8px', color: purple[300]}} />
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
                <Type variant="h3" gutterBottom>
                  {/* GO NATIVE! */}A FOUR-SEASON SENSATION
                </Type>
              </RowBox>
              {/* <Type variant="h3">Cleveland Sage (and other Salvias)</Type> */}
              <Type variant="h3">Western Redbud</Type>
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
                <MediaDialogOnClick
                  mediaUrl="https://pcwa.imgix.net/pcwa-net/water-efficiency/summer-strong/western_redbud.jpg"
                  mediaName="Western Redbud"
                  MediaPreviewDialogProps={{
                    ImageProps: {
                      width: 1193,
                      height: 1536
                    }
                  }}
                >
                  <ImageFancier
                    alt="Western Redbud"
                    src={`https://pcwa.imgix.net/pcwa-net/water-efficiency/summer-strong/western_redbud.jpg${imgixArParams}`}
                    // 5/4 image aspect ratio
                    width={1193}
                    height={954}
                    defaultGrey
                    sizes="(max-width: 600px) 100vw, 33vw"
                    objectFit="contain"
                  />
                </MediaDialogOnClick>
              </ChildBox>
              <ChildBox flex="0 1 33%">
                <MediaDialogOnClick
                  mediaUrl="https://pcwa.imgix.net/pcwa-net/water-efficiency/summer-strong/western_redbud_bee.jpg"
                  mediaName="Western Redbud with bee"
                  MediaPreviewDialogProps={{
                    ImageProps: {
                      width: 5044,
                      height: 3363
                    }
                  }}
                >
                  <ImageFancier
                    alt="Western Redbud with bee"
                    src={`https://pcwa.imgix.net/pcwa-net/water-efficiency/summer-strong/western_redbud_bee.jpg${imgixArParams}`}
                    // 5/4 image aspect ratioi
                    width={4204}
                    height={3363}
                    defaultGrey
                    sizes="(max-width: 600px) 100vw, 33vw"
                    objectFit="contain"
                  />
                </MediaDialogOnClick>
              </ChildBox>
              {/* <ChildBox flex="0 1 33%">

              </ChildBox> */}
            </RowBox>
          </Box>
          <Spacing size="x-large" />
          <Type variant="h4">Western redbud</Type>
          <Type variant="subtitle1" gutterBottom>
            <em>Cercis occidentalis</em>
          </Type>
          <Spacing size="small" />
          <Type variant="subtitle1" gutterBottom>
            <em>By Debbie Arrington, Sacramento Digs Gardening</em>
          </Type>
          <Type paragraph>
            See purple? Think redbud. Native to the Sierra foothills, the
            Western redbud (Cercis occidentalis) is the ultimate right plant in
            the right place for Placer County. With its abundant early spring
            flowers in shades of pink-purple, it supports native bees,
            especially leafcutter bees that love its leaves, too. (They line
            their nests with circles of foliage.)
          </Type>
          <Type paragraph>
            Related to peas and legumes, Western redbud is among California’s
            most popular and showy native shrubs or small trees, offering
            year-round garden interest. They’re a natural for low-water foothill
            gardens and often among the first plants to bloom, signaling the
            coming of spring. Much appreciated by hungry bees, redbud flowers
            pop before the season’s first robin chirps.
          </Type>
          <Type paragraph>
            Bright-green heart-shaped leaves emerge after that eye-catching
            flush of flowers. In fall, rusty red-brown decorative seed pods
            dangle from the branches, adding more garden flair. Even the bare
            brown branches are attractive in winter.
          </Type>
          <Type paragraph>
            Once established, Western redbud is as tough as nails, needing only
            monthly (if any) summer irrigation. They do their best with good
            drainage—a spot where water doesn’t accumulate or stand, especially
            in winter—and tolerate both clay and rocky soils.
          </Type>
          <Type paragraph>
            Although they love Placer County, redbuds aren’t for all of
            California. All redbud varieties need four distinct seasons and a
            little winter chill to be successful; this plant can’t cope on the
            coast.
          </Type>
          <Type paragraph>
            <StrongGrey>Bloom</StrongGrey>: With vibrant pink-purple blooms,
            redbuds flower in big clusters directly on their smooth brown bark
            in late winter through early spring, February-April.
          </Type>
          <Type paragraph>
            <StrongGrey>Water needs</StrongGrey>: Low to very low, once
            established.
          </Type>
          <Type paragraph>
            <StrongGrey>Sun</StrongGrey>:Full sun; some hybrids can take partial
            shade.
          </Type>
          <Type paragraph>
            <StrongGrey>Size</StrongGrey>: Western redbud grows as a large
            deciduous shrub (with multiple trunks); other redbuds such as
            Oklahoma redbud (C. reniformis) can be shaped into a small tree
            (with a single trunk). Western redbuds can reach 20 feet tall (with
            too much water) but usually stay 7 to 10 feet.
          </Type>
          <Type paragraph>
            <StrongGrey>Care</StrongGrey>: Low water requirements after the
            first two years, once the roots are well established. During winter
            dormancy after it loses its leaves, prune the tree gently to shape
            as it matures, removing any dead or diseased wood.
          </Type>
          <Type paragraph>
            <StrongGrey>Availability</StrongGrey>: Western redbud is widely sold
            at local nurseries such as Green Acres Nursery & Supply. Big-box
            stores tend to carry other redbud cultivars such as Oklahoma and
            Eastern redbud hybrids (C. Canadensis), which need more irrigation.
            All redbuds like Placer County.
          </Type>
          <Type paragraph>
            <StrongGrey>Bonus plants</StrongGrey>: Western redbud makes a good
            accent tree or shrub among other low-water California natives such
            as California lilacs (Ceanothus), California fuchsia (Epilobium
            canum), or Cleveland sage (Salvia clevelandii).
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
            <Type>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                variant="body1"
                href="https://arboretum.ucdavis.edu/plant/western-redbud"
              >
                UC Davis Arboretum All-Star, Western Redbud:
                (https://arboretum.ucdavis.edu)
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
                href="https://calscape.org/Cercis-occidentalis-(Western-Redbud)?srchcr=sc662c008b9b052"
              >
                CalScape, Western Redbud: (https://calscape.org)
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
