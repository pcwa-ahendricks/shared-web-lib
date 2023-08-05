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
// import StarsIcon from 'mdi-material-ui/Creation'
import SunIcon from 'mdi-material-ui/WhiteBalanceSunny'
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
  '296878b0-f4d4-11ed-bb44-790a83f99a24-N-Salvia-clevelandii-5-16-3.JPG',
  'c12deaa0-0199-11ee-9c26-15fefb4eeda0-FL-Erigeron.JPG',
  '6d0cb510-1c1e-11ee-8805-5d9e4358a1d4-IMG6411.JPG',
  '98712ae0-33b3-11ee-9ab5-815d9b73ff1f-T-Lagerstroemia-Tuscarora-8-26.JPG'
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
                <SunIcon
                  style={{marginRight: 8, color: orange[400], fontSize: 32}}
                />
                {/* <Type variant="h3" gutterBottom>
                  A Butterfly Buffet!
                </Type>*/}
                <Type variant="h3" gutterBottom>
                  Queen of Summer
                </Type>
              </RowBox>
              {/* <Type variant="h3">Cleveland Sage (and other Salvias)</Type> */}
              <Type variant="h3">Crape Myrtle hybrids and cultivars</Type>
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
                  mediaUrl="https://imgix.cosmicjs.com/98712ae0-33b3-11ee-9ab5-815d9b73ff1f-T-Lagerstroemia-Tuscarora-8-26.JPG"
                  mediaName="Crape Myrtle"
                  mediaPreviewDialogProps={{
                    width: 3648,
                    height: 2736
                  }}
                >
                  <ImageFancier
                    alt="Crape Myrtle"
                    src={`https://imgix.cosmicjs.com/98712ae0-33b3-11ee-9ab5-815d9b73ff1f-T-Lagerstroemia-Tuscarora-8-26.JPG${imgixArParams}`}
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
          </Box>
          <Spacing size="x-large" />
          <Type variant="h4">Crape Myrtle</Type>
          <Type variant="subtitle1" gutterBottom>
            {/* <em>Verbena lilacina ‘De La Mina’, Glandularia lilacina. </em> */}
            <em>Lagerstoemia</em> hybrids and cultivars
          </Type>
          <Spacing size="small" />
          <Type variant="subtitle1" gutterBottom>
            <em>By Laurie Meyerpeter, Master Gardener</em>
          </Type>
          <Type paragraph>
            Nothing says “Summer Strong” more than crape myrtle. Crape myrtle is
            one tough tree. When conditions get rough, crape myrtle is there,
            shouting its hot pink, red, white or lavender blooms while the rest
            of the region melts during our hot summers. When other plants wilt
            in the heat and the drought, crape myrtle growls, “Here, hold my
            beer,” steps up, and then knocks our socks off with its brilliantly
            colored flowers, throwing a party every summer with its
            crepe-paper-like blooms that just cover the tree for weeks. It
            doesn’t matter how you take care of them, whether you painstakingly
            prune them or ignore them, whether you water them weekly or forget
            most of the time, whether they you coddle them or give them tough
            love, Crape Myrtles bloom.
          </Type>
          <Type paragraph>
            And if summer blooms aren’t enough, it goes on to have an autumn
            encore with brilliant fall color. Mature trees have gorgeous
            ornamental bark.
          </Type>
          <Type paragraph>
            Crape myrtle cultivars come in many sizes, from trees to small
            shrubs. Choose cultivars that best fit your location, space, and
            color choice.
          </Type>
          <Type paragraph>
            The hybrids are more resistant to powdery mildew.
          </Type>
          <Type paragraph>This plant is an Arboretum All Star.</Type>
          <Type paragraph>
            <StrongGrey>Bloom</StrongGrey>: Pink, lavender, red and white
            cultivars available. Peak bloom is during the hottest months of July
            and August.
          </Type>
          <Type paragraph>
            <StrongGrey>Water needs</StrongGrey>: Low once established.
          </Type>
          <Type paragraph>
            <StrongGrey>Sun</StrongGrey>: Full sun. Without full sun, it may
            flower slightly less and some flower colors like red will be muted.
          </Type>
          <Type paragraph>
            <StrongGrey>Size</StrongGrey>: Size varies depending on the
            cultivar.
          </Type>
          <Type paragraph>
            <StrongGrey>Care</StrongGrey>: Low water requirements. Needs little
            pruning or care. Excessive pruning is discouraged.
          </Type>
          <Type paragraph>
            <StrongGrey>Availability</StrongGrey>: Crape Myrtles are widely
            available year-round.
          </Type>
          <Type paragraph>
            <StrongGrey>Bonus plants</StrongGrey>: Supporting cast includes
            Lantanas <em>(Lantana montevidensis. L. sellowiana, L. hybrids)</em>{' '}
            which bloom profusely throughout the summer and fall. The flower
            colors often overlaps Crape Myrtle as well, for example ‘Muskogee’
            Crape Myrtle shares a similar lavender color as{' '}
            <em>Lantana montevidensis</em> for a soft lavender effect, and
            ‘Natchez’ Crape Myrtle can be matched with white lantana hybrids for
            a “full moon” garden of “summer whites in the night”
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
                href="https://arboretum.ucdavis.edu/plant/crape-myrtle"
              >
                UC Davis Arboretum All Stars: (https://arboretum.ucdavis.edu)
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
            <Accordion
              expanded={expanded === 'panel1'}
              onChange={handleChange('panel1')}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
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
                      De La Mina Verbena or Cedros Island Verbena
                    </Type>
                  </ChildBox>
                </RowBox>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  <RowBox flexSpacing={6} responsive>
                    <ChildBox flex="0 1 33%">
                      <MediaDialogOnClick
                        mediaUrl="https://imgix.cosmicjs.com/6d0cb510-1c1e-11ee-8805-5d9e4358a1d4-IMG6411.JPG"
                        mediaName="De La Mina Verbena or Cedros Island Verbena"
                        mediaPreviewDialogProps={{
                          width: 3024,
                          height: 4032
                        }}
                      >
                        <ImageFancier
                          alt="De La Mina Verbena or Cedros Island Verbena"
                          src={`https://imgix.cosmicjs.com/6d0cb510-1c1e-11ee-8805-5d9e4358a1d4-IMG6411.JPG${imgixArParams}`}
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
                  <Type variant="h4">
                    De La Mina Verbena or Cedros Island Verbena
                  </Type>
                  <Type variant="subtitle1" gutterBottom color="textSecondary">
                    <em>
                      Verbena lilacina ‘De La Mina’, Glandularia lilacina.
                    </em>
                  </Type>
                  <Type variant="subtitle1" gutterBottom>
                    <em>By Laurie Meyerpeter, Master Gardener</em>
                  </Type>
                  <Type paragraph>
                    Just say it. <em>Verbena lilacina 'De La Mina'</em>. Fun,
                    fun, fun! It just skips off the tongue like a nursery rhyme.
                    Or if you're short on time, De La Mina Verbena is almost as
                    fun to say. Either one is so rhyme-y and joyful.{' '}
                    <em>Glandularia lilacina</em> is a newer name but many
                    nurseries continue to use to the older name for this plant.
                  </Type>
                  <Type paragraph>
                    Everything about this plant is joyful. This charming
                    perennial or small shrub has lovely fern-like green foliage
                    and tiny purple flowers in profuse numbers. Its heaviest
                    bloom is in the spring but it has profuse flowers in the
                    summer and fall as well. In some climates, it can bloom
                    nearly year round, although in this region, it seems to take
                    a slight break during the cold season. It’s a selection from
                    Cedros Island off Baja California and is hardy to about 25
                    degrees (similar to citrus). Butterflies love it.{' '}
                  </Type>
                  <Type paragraph>
                    This plant is a favorite of master gardeners and is a staff
                    favorite at the UC Arboretum in Davis.
                  </Type>
                  <Type paragraph>
                    <StrongGrey>Bloom</StrongGrey>: ‘De La Mina’ Verbena blooms
                    in spring, summer, and fall, and sometimes into winter
                    during warmer years. The diminutive purple flowers are
                    shades of purple and although small, the plant is usually
                    covered in the tiny blooms. The flowers are butterfly
                    favorites and have a light, spicy fragrance.
                  </Type>
                  <Type paragraph>
                    <StrongGrey>Water needs</StrongGrey>: Low, once established.
                  </Type>
                  <Type paragraph>
                    <StrongGrey>Sun</StrongGrey>: Full sun, part shade.
                  </Type>
                  <Type paragraph>
                    <StrongGrey>Size</StrongGrey>: This plant is 2-3’ tall, and
                    3-4’ wide with a rounded form.
                  </Type>
                  <Type paragraph>
                    <StrongGrey>Care</StrongGrey>: Low water requirements.
                    Lightly prune in late fall to maintain compact form.
                  </Type>
                  <Type paragraph>
                    <StrongGrey>Availability</StrongGrey>: ‘De La Mina’ Verbena
                    is available during the warmer months at local nurseries,
                    sometimes sporadically. If not in stock, it’s worth asking
                    when it will be re-stocked or check back in a few weeks.
                  </Type>
                  <Type paragraph>
                    <StrongGrey>Bonus plants</StrongGrey>: Many other low and
                    very low water plants are butterfly favorites as well.
                    Besides De La Mina Verbena, consider yarrows like ‘Island
                    Pink’ Yarrow (Achillea millefolium ‘Island Pink’, an
                    Arboretum All-Star) and other yarrows, Santa Barbara Daisy
                    (Erigeron karvinsianus, an Arboretum All-Star), and Catmint
                    (Nepeta x faassenii, an Arboretum All-Star). All bloom
                    profusely in early and mid-summer with repeated blooms
                    throughout summer, and make a nice combination. Yarrows,
                    Santa Barbara Daisy, and Catmint are all readily available
                    in local nurseries.
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
                        href="https://calscape.org/Verbena-lilacina-'De-La-Mina'-(De-La-Mina-Verbena)?srchcr=sc5e4b2b6ca32ac"
                      >
                        CalScape, De La Mina (https://calscape.org)
                      </Link>
                    </Type>
                    <Type>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="body1"
                        href="https://calscape.org/Achillea-millefolium-%27Island-Pink%27-(Island-Pink-Yarrow)"
                      >
                        CalScape, Island Pink Yarrow (https://calscape.org)
                      </Link>
                    </Type>
                    <Type>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="body1"
                        href="https://arboretum.ucdavis.edu/plant/island-pink-yarrow"
                      >
                        UC Davis Arboretum All Stars, Island Pink Yarrow:
                        (https://arboretum.ucdavis.edu)
                      </Link>
                    </Type>
                    <Type>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="body1"
                        href="https://arboretum.ucdavis.edu/plant/Santa-Barbara-daisy"
                      >
                        UC Davis Arboretum All Stars, Santa Barbara Daisy:
                        (https://arboretum.ucdavis.edu)
                      </Link>
                    </Type>
                    <Type>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="body1"
                        href="https://arboretum.ucdavis.edu/plant/hybrid-catmint"
                      >
                        UC Davis Arboretum All Stars, Hybrid Catmint:
                        (https://arboretum.ucdavis.edu)
                      </Link>
                    </Type>
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === 'panel2'}
              onChange={handleChange('panel2')}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
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
                    <Type variant="h4">Santa Barbara Daisy</Type>
                  </ChildBox>
                </RowBox>
              </AccordionSummary>
              <AccordionDetails>
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
                  <Type variant="h4">Santa Barbara Daisy</Type>
                  <Type variant="subtitle1" gutterBottom color="textSecondary">
                    <em>Erigeron karvinskianus</em>
                  </Type>
                  <Type variant="subtitle1" gutterBottom>
                    <em>By Laurie Meyerpeter, Master Gardener</em>
                  </Type>
                  <Type paragraph>
                    This is a tough plant with nearly continual bloom. It begins
                    flowering about the time you pull out the shorts and sandals
                    in spring and flowers until you get out a sweater in the
                    fall. It may briefly shut down during an intense heat wave
                    but will quickly resume once the swelter stops. If you're
                    out in the heat, this plant is blooming.
                  </Type>
                  <Type paragraph>
                    Santa Barbara Daisy is lovely trailing over a wall or used
                    in a container. It can stand on its own but it also shines
                    as a supporting plant tucked in among other water conserving
                    plants and flowers, where it flowers prolifically without
                    stealing the show. It’s an underappreciated workhorse in the
                    garden and it’s a wonderful plant for this region.
                  </Type>
                  <Type paragraph>
                    This plant is an Arboretum All Star, a group of
                    water-conserving, heat-tolerant ornamental plants that
                    thrive in this region. The plants have low maintenance needs
                    and have value to birds and pollinators. Here is more
                    information about the All Star program:{' '}
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
                    <StrongGrey>Bloom</StrongGrey>: Santa Barbara Daisy blooms
                    from spring through fall. It may shut down bloom briefly
                    during an intense heat wave but soon after, it will resume
                    its floriferous habit.
                  </Type>
                  <Type paragraph>
                    <StrongGrey>Water needs</StrongGrey>: Low once established.
                  </Type>
                  <Type paragraph>
                    <StrongGrey>Sun</StrongGrey>: Full sun, part shade.
                  </Type>
                  <Type paragraph>
                    <StrongGrey>Size</StrongGrey>: Santa Barbara Daisy is a
                    spreading or trailing groundcover-type perennial that grows
                    1-2' tall and can spreads 3-5'.
                  </Type>
                  <Type paragraph>
                    <StrongGrey>Care</StrongGrey>: Low water requirements. Can
                    be cut nearly to the ground to renew if it gets too big or
                    rangy.
                  </Type>
                  <Type paragraph>
                    <StrongGrey>Availability</StrongGrey>: Santa Barbara Daisy
                    is readily available at local nurseries throughout the
                    growing season.
                  </Type>
                  <Type paragraph>
                    <StrongGrey>Bonus plants</StrongGrey>: Other low-water,
                    complimentary floriferous Arboretum All Stars include
                    ‘Island Pink’ Yarrow (Yarrow (Achillea millefolium ‘Island
                    Pink) and other yarrow varieties, Cape Balsam (Bulbine
                    frutescens), several Lavenders like ‘Goodwin Creek’
                    (Lavendula x ginginsii ‘Goodwin Creek’) and ‘Otto Quast’
                    (Lavandula stoechas ‘Otto Quast’) , and Santa Margarita
                    Foothill Penstemon (Penstemon heterophyllus ‘Margarita
                    BOP’). Most are available at local nurseries on a seasonal
                    basis.
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
                        UC Davis Arboretum All Stars:
                        (https://arboretum.ucdavis.edu)
                      </Link>
                    </Type>
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === 'panel3'}
              onChange={handleChange('panel3')}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3-content"
                id="panel3-header"
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
                      {/* Hello Hummingbirds! Cleveland Sage (and other Salvias) */}
                      Cleveland Sage (and other Salvias)
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
                  <Type variant="h4">'Winnifred Gilman' Cleveland Sage</Type>
                  <Type variant="subtitle1" gutterBottom color="textSecondary">
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
                    Cleveland sage cultivars such as 'Allen Chickering'. And the
                    terms "salvia" and “sage” are both used interchangeably to
                    describe this very large family of plants. Many of them are
                    California natives. Salvias are beloved by hummingbirds,
                    bees, and butterflies.
                  </Type>
                  <Type paragraph>
                    <StrongGrey>Bloom</StrongGrey>: 'Winnifred Gilman' blooms in
                    late spring into early summer, with a light bloom later in
                    the summer. The distinctive whorled flowers are shades of
                    blue and violet. When not in bloom, the plant forms a mound
                    of gray-green leaves that are very aromatic on warm summer
                    days.
                  </Type>
                  <Type paragraph>
                    <StrongGrey>Water needs</StrongGrey>: Low to Very Low once
                    established.
                  </Type>
                  <Type paragraph>
                    <StrongGrey>Sun</StrongGrey>: Full sun, part shade.
                  </Type>
                  <Type paragraph>
                    <StrongGrey>Size</StrongGrey>: 'Winnifred Gilman' Cleveland
                    sage grows 3-4' x 3-4' mounded shrub if unpruned. Other
                    cultivars may be slightly larger and wider if unpruned.
                  </Type>
                  <Type paragraph>
                    <StrongGrey>Care</StrongGrey>: Low water requirements.
                    Lightly prune in late fall to maintain compact form.
                  </Type>
                  <Type paragraph>
                    <StrongGrey>Availability</StrongGrey>: Cleveland sage is
                    seasonally available. Local nurseries typically stock either
                    'Winnifred Gilman' Cleveland Sage or 'Allan Chickering'
                    Cleveland Sage throughout the spring and summer months.
                  </Type>
                  <Type paragraph>
                    <StrongGrey>Bonus plants</StrongGrey>: Many other salvias or
                    sages are Summer Strong plants with low water requirements
                    and good summer looks. Besides 'Winnifred Gilman', 'Allen
                    Chickering', and other Cleveland sages and cultivars, check
                    out these readily available salvias: 'Bee's Bliss' Sage
                    (Salvia 'Bees Bliss'), White Sage (Salvia apiana), and
                    Hummingbird Sage (Salvia spathacea). A fantastic and popular
                    family of plants! Available seasonally at local nurseries.
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
