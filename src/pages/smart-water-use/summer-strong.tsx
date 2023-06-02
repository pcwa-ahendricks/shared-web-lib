import React, {useState, useCallback} from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import PageTitle from '@components/PageTitle/PageTitle'
import {RowBox, ChildBox} from 'mui-sleazebox'
import {
  Typography as Type,
  Box,
  Link,
  useMediaQuery,
  useTheme,
  TypographyProps,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@material-ui/core'
// import LeafIcon from 'mdi-material-ui/Leaf'
// import BirdIcon from 'mdi-material-ui/Bird'
import StarsIcon from 'mdi-material-ui/Creation'
import Image from 'next/image'
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
import {grey, orange} from '@material-ui/core/colors'

type Props = {
  placeholders: Placeholders
}

const imgixImages = [
  '29837ac0-f4d4-11ed-bb44-790a83f99a24-PCWA-Summer-Strong-Cleveland-Sage-050823.jpg',
  '29536a10-f4d4-11ed-bb44-790a83f99a24-FL-Salvia-clevelandii-State-Fair-7-24.JPG',
  '297bb290-f4d4-11ed-bb44-790a83f99a24-N-Salvia-clevelandii-8-23.JPG',
  '296878b0-f4d4-11ed-bb44-790a83f99a24-N-Salvia-clevelandii-5-16-3.JPG'
]

const StrongGrey = ({children, ...props}: TypographyProps) => {
  return (
    <Type
      component="strong"
      style={{color: grey[800], ...props.style}}
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
      (
        _event: React.ChangeEvent<Record<string, unknown>>,
        isExpanded: boolean
      ) => {
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
                Master Gardeners of Placer County to highlight six Summer Strong
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
                {/* <LeafIcon color="secondary" style={{marginRight: 8}} /> */}
                {/* <BirdIcon
                  style={{marginRight: 8, color: blueGrey[500], fontSize: 32}}
                /> */}
                <StarsIcon
                  style={{marginRight: 8, color: orange[400], fontSize: 32}}
                />
                <Type variant="h2" gutterBottom>
                  {/* Hello Hummingbirds! */}
                  Arboretum All Stars
                </Type>
              </RowBox>
              {/* <Type variant="h3">Cleveland Sage (and other Salvias)</Type> */}
              <Type variant="h3">Santa Barbara Daisy</Type>
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
          <Spacing size="large" />

          <Box>
            <RowBox flexSpacing={6} responsive>
              <ChildBox flex="0 1 33%">
                <MediaDialogOnClick
                  mediaUrl="https://imgix.cosmicjs.com/c12deaa0-0199-11ee-9c26-15fefb4eeda0-FL-Erigeron.JPG"
                  mediaName="Santa Barbara Daisy"
                  mediaPreviewDialogProps={{
                    width: 2448,
                    height: 3264
                  }}
                >
                  <ImageFancier
                    alt="Santa Barbara Daisy"
                    src={`https://imgix.cosmicjs.com/c12deaa0-0199-11ee-9c26-15fefb4eeda0-FL-Erigeron.JPG${imgixArParams}`}
                    // 5/4 image aspect ration
                    width={1975}
                    height={1580}
                    defaultGrey
                    sizes="(max-width: 600px) 100vw, 33vw"
                    objectFit="contain"
                  />
                </MediaDialogOnClick>
              </ChildBox>
            </RowBox>
            <Spacing size="x-large" />
          </Box>
          <Spacing size="x-large" />
          <Type variant="h4">Santa Barbara Daisy</Type>
          <Type variant="subtitle1" gutterBottom>
            <em>Erigeron karvinskianus</em>
          </Type>
          <Type variant="subtitle1" gutterBottom>
            <em>By Laurie Meyerpeter, Master Gardener</em>
          </Type>
          <Type paragraph>
            This is a tough plant with nearly continual bloom. It begins
            flowering about the time you pull out the shorts and sandals in
            spring and flowers until you get out a sweater in the fall. It may
            briefly shut down during an intense heat wave but will quickly
            resume once the swelter stops. If you're out in the heat, this plant
            is blooming.
          </Type>
          <Type paragraph>
            Santa Barbara Daisy is lovely trailing over a wall or used in a
            container. It can stand on its own but it also shines as a
            supporting plant tucked in among other water conserving plants and
            flowers, where it flowers prolifically without stealing the show.
            It’s an underappreciated workhorse in the garden and it’s a
            wonderful plant for this region.
          </Type>
          <Type paragraph>
            This plant is an Arboretum All Star, a group of water-conserving,
            heat-tolerant ornamental plants that thrive in this region. The
            plants have low maintenance needs and have value to birds and
            pollinators. Here is more information about the All Star program:{' '}
            <Link
              rel="noopener noreferrer"
              target="_blank"
              href="https://ccuh.ucdavis.edu/arboretum-all-stars#:~:text=The%20All%2DStars%20program%2C%20an,insects%2C%20and%20other%20native%20pollinators"
            >
              https://ccuh.ucdavis.edu/arboretum-all-stars
            </Link>
            .
          </Type>
          <Type paragraph>
            <StrongGrey>Bloom</StrongGrey>: Santa Barbara Daisy blooms from
            spring through fall. It may shut down bloom briefly during an
            intense heat wave but soon after, it will resume its floriferous
            habit.
          </Type>
          <Type paragraph>
            <StrongGrey>Water needs</StrongGrey>: Low once established.
          </Type>
          <Type paragraph>
            <StrongGrey>Sun</StrongGrey>: Full sun, part shade.
          </Type>
          <Type paragraph>
            <StrongGrey>Size</StrongGrey>: Santa Barbara Daisy is a spreading or
            trailing groundcover-type perennial that grows 1-2' tall and can
            spreads 3-5'.
          </Type>
          <Type paragraph>
            <StrongGrey>Care</StrongGrey>: Low water requirements. Can be cut
            nearly to the ground to renew if it gets too big or rangy.
          </Type>
          <Type paragraph>
            <StrongGrey>Availability</StrongGrey>: Santa Barbara Daisy is
            readily available at local nurseries throughout the growing season.
          </Type>
          <Type paragraph>
            <StrongGrey>Bonus plants</StrongGrey>: Other low-water,
            complimentary floriferous Arboretum All Stars include ‘Island Pink’
            Yarrow (Yarrow (Achillea millefolium ‘Island Pink) and other yarrow
            varieties, Cape Balsam (Bulbine frutescens), several Lavenders like
            ‘Goodwin Creek’ (Lavendula x ginginsii ‘Goodwin Creek’) and ‘Otto
            Quast’ (Lavandula stoechas ‘Otto Quast’) , and Santa Margarita
            Foothill Penstemon (Penstemon heterophyllus ‘Margarita BOP’). Most
            are available at local nurseries on a seasonal basis.
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
                href="https://arboretum.ucdavis.edu/plant/Santa-Barbara-daisy"
              >
                UC Davis Arboretum All Stars: (https://arboretum.ucdavis.edu)
              </Link>
            </Type>
            {/* <Type>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                variant="body1"
                href="https://calscape.org/Salvia-clevelandii-'Winnifred-Gilman'-(Winnifred-Gilman-Cleveland-Sage)?srchcr=sc646565c122cdb"
              >
                CalScape (https://calscape.org)
              </Link>
            </Type> */}
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
            <Accordion
              expanded={expanded === 'panel1'}
              onChange={handleChange('panel1')}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <RowBox justifyContent="space-between" width="100%">
                  <ChildBox flex="grow">
                    {/* <AcctCancelIcon
                    style={{
                      fontSize: '32px',
                      color: red[400],
                      paddingRight: 8
                    }}
                  /> */}
                    <Type variant="h4">
                      Hello Hummingbirds! Cleveland Sage (and other Salvias)
                    </Type>
                  </ChildBox>
                  {/* <ChildBox flex="nogrow" width={150}>
                    <Image
                      alt="'Winnifred Gilman' Cleveland Sage, Salvia clevelandii 'Winnifred Gilman'"
                      src={`https://imgix.cosmicjs.com/297bb290-f4d4-11ed-bb44-790a83f99a24-N-Salvia-clevelandii-8-23.JPG${imgixArParams}`}
                      width={3939}
                      height={3151}
                      loader={imgixUrlLoader}
                      layout="responsive"
                      sizes="(max-width: 600px) 100vw, 33vw"
                      objectFit="cover"
                    />
                  </ChildBox> */}
                </RowBox>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  {/* <Type variant="subtitle1" className={classes.accordionCaption}>
                  No worries. It takes no time to set one up.
                </Type>
                <Spacing size="small" /> */}
                  <Box>
                    <Box>
                      <RowBox flexSpacing={6} responsive>
                        <ChildBox flex="33%">
                          <MediaDialogOnClick
                            mediaUrl="https://imgix.cosmicjs.com/29536a10-f4d4-11ed-bb44-790a83f99a24-FL-Salvia-clevelandii-State-Fair-7-24.JPG"
                            mediaName="'Winnifred Gilman' Cleveland Sage, Salvia clevelandii 'Winnifred Gilman'"
                            mediaPreviewDialogProps={{
                              width: 1975,
                              height: 2688
                            }}
                          >
                            <ImageFancier
                              alt="'Winnifred Gilman' Cleveland Sage, Salvia clevelandii 'Winnifred Gilman'"
                              src={`https://imgix.cosmicjs.com/29536a10-f4d4-11ed-bb44-790a83f99a24-FL-Salvia-clevelandii-State-Fair-7-24.JPG${imgixArParams}`}
                              width={1975}
                              height={1580}
                              defaultGrey
                              sizes="(max-width: 600px) 100vw, 33vw"
                              objectFit="contain"
                            />
                          </MediaDialogOnClick>
                        </ChildBox>
                        <ChildBox flex="33%">
                          <MediaDialogOnClick
                            mediaUrl="https://imgix.cosmicjs.com/297bb290-f4d4-11ed-bb44-790a83f99a24-N-Salvia-clevelandii-8-23.JPG"
                            mediaName="'Winnifred Gilman' Cleveland Sage, Salvia clevelandii 'Winnifred Gilman'"
                            mediaPreviewDialogProps={{
                              width: 3939,
                              height: 3456
                            }}
                          >
                            <ImageFancier
                              alt="'Winnifred Gilman' Cleveland Sage, Salvia clevelandii 'Winnifred Gilman'"
                              src={`https://imgix.cosmicjs.com/297bb290-f4d4-11ed-bb44-790a83f99a24-N-Salvia-clevelandii-8-23.JPG${imgixArParams}`}
                              width={3939}
                              height={3151}
                              defaultGrey
                              sizes="(max-width: 600px) 100vw, 33vw"
                              objectFit="contain"
                            />
                          </MediaDialogOnClick>
                        </ChildBox>
                        <ChildBox flex="33%">
                          <MediaDialogOnClick
                            // transPaper={0.2}
                            // popperTypeProps={{style: {color: '#fff', fontWeight: 'bold'}}}
                            mediaUrl="https://imgix.cosmicjs.com/296878b0-f4d4-11ed-bb44-790a83f99a24-N-Salvia-clevelandii-5-16-3.JPG"
                            mediaName="'Winnifred Gilman' Cleveland Sage, Salvia clevelandii 'Winnifred Gilman'"
                            mediaPreviewDialogProps={{
                              width: 5167,
                              height: 3445
                            }}
                          >
                            <ImageFancier
                              alt="'Winnifred Gilman' Cleveland Sage, Salvia clevelandii 'Winnifred Gilman'"
                              src={`https://imgix.cosmicjs.com/296878b0-f4d4-11ed-bb44-790a83f99a24-N-Salvia-clevelandii-5-16-3.JPG${imgixArParams}`}
                              width={4306}
                              height={3445}
                              defaultGrey
                              sizes="(max-width: 600px) 100vw, 33vw"
                              objectFit="contain"
                            />
                          </MediaDialogOnClick>
                        </ChildBox>
                      </RowBox>
                      <Spacing size="x-large" />
                    </Box>
                    <Spacing size="x-large" />
                    <Type variant="h4">'Winnifred Gilman' Cleveland Sage</Type>
                    <Type variant="subtitle1" gutterBottom>
                      <em>Salvia clevelandii 'Winnifred Gilman'</em>
                    </Type>
                    <Type variant="subtitle1" gutterBottom>
                      <em>By Laurie Meyerpeter, Master Gardener</em>
                    </Type>
                    <Type paragraph>
                      Along with gorgeous flowers, the leaves of 'Winnifred
                      Gilman' and other Cleveland sage cultivars are highly
                      aromatic. When the Placer County Master Gardeners teach a
                      propagation class at Del Oro High School, this plant is a
                      huge favorite of the teens because of its beautiful aroma
                      and the unique flowers.
                    </Type>
                    <Type paragraph>
                      'Winnifred Gilman' is one cultivar of Cleveland sage but
                      local nurseries may stock similar and interchangeable
                      Cleveland sage cultivars such as 'Allen Chickering'. And
                      the terms "salvia" and “sage” are both used
                      interchangeably to describe this very large family of
                      plants. Many of them are California natives. Salvias are
                      beloved by hummingbirds, bees, and butterflies.
                    </Type>
                    <Type paragraph>
                      <StrongGrey>Bloom</StrongGrey>: 'Winnifred Gilman' blooms
                      in late spring into early summer, with a light bloom later
                      in the summer. The distinctive whorled flowers are shades
                      of blue and violet. When not in bloom, the plant forms a
                      mound of gray-green leaves that are very aromatic on warm
                      summer days.
                    </Type>
                    <Type paragraph>
                      <StrongGrey>Water needs</StrongGrey>: Low to Very Low once
                      established.
                    </Type>
                    <Type paragraph>
                      <StrongGrey>Sun</StrongGrey>: Full sun, part shade.
                    </Type>
                    <Type paragraph>
                      <StrongGrey>Size</StrongGrey>: 'Winnifred Gilman'
                      Cleveland sage grows 3-4' x 3-4' mounded shrub if
                      unpruned. Other cultivars may be slightly larger and wider
                      if unpruned.
                    </Type>
                    <Type paragraph>
                      <StrongGrey>Care</StrongGrey>: Low water requirements.
                      Lightly prune in late fall to maintain compact form.
                    </Type>
                    <Type paragraph>
                      <StrongGrey>Availability</StrongGrey>: Cleveland sage is
                      seasonally available. Local nurseries typically stock
                      either 'Winnifred Gilman' Cleveland Sage or 'Allan
                      Chickering' Cleveland Sage throughout the spring and
                      summer months.
                    </Type>
                    <Type paragraph>
                      <StrongGrey>Bonus plants</StrongGrey>: Many other salvias
                      or sages are Summer Strong plants with low water
                      requirements and good summer looks. Besides 'Winnifred
                      Gilman', 'Allen Chickering', and other Cleveland sages and
                      cultivars, check out these readily available salvias:
                      'Bee's Bliss' Sage (Salvia 'Bees Bliss'), White Sage
                      (Salvia apiana), and Hummingbird Sage (Salvia spathacea).
                      A fantastic and popular family of plants! Available
                      seasonally at local nurseries.
                    </Type>
                  </Box>

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
                        href="https://arboretum.ucdavis.edu/plant/Winnifred-Gilman-Cleveland-sage"
                      >
                        UC Davis Arboretum All Stars:
                        (https://arboretum.ucdavis.edu)
                      </Link>
                    </Type>
                    <Type>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="body1"
                        href="https://calscape.org/Salvia-clevelandii-'Winnifred-Gilman'-(Winnifred-Gilman-Cleveland-Sage)?srchcr=sc646565c122cdb"
                      >
                        CalScape (https://calscape.org)
                      </Link>
                    </Type>
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
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
