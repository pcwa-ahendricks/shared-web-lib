import React from 'react'
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
  TypographyProps
} from '@material-ui/core'
// import LeafIcon from 'mdi-material-ui/Leaf'
import BirdIcon from 'mdi-material-ui/Bird'
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
import {blueGrey, grey} from '@material-ui/core/colors'

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
                <BirdIcon
                  style={{marginRight: 8, color: blueGrey[500], fontSize: 32}}
                />
                <Type variant="h2" gutterBottom>
                  Hello Hummingbirds!
                </Type>
              </RowBox>
              <Type variant="h3">Cleveland Sage (and other Salvias)</Type>
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
            Along with gorgeous flowers, the leaves of 'Winifred Gilman' and
            other Cleveland sage cultivars are highly aromatic. When the Placer
            County Master Gardeners teach a propagation class at Del Oro High
            School, this plant is a huge favorite of the teens because of its
            beautiful aroma and the unique flowers.
          </Type>
          <Type paragraph>
            'Winifred Gilman' is one cultivar of Cleveland sage but local
            nurseries may stock similar and interchangeable Cleveland sage
            cultivars such as 'Allen Chickering'. And the terms “salvia” and
            “sage” are both used interchangeable to describe this very large
            family of plants. Many of them are California natives. Salvias are
            beloved by hummingbirds, bees, and butterflies.
          </Type>
          <Type paragraph>
            <StrongGrey>Bloom</StrongGrey>: 'Winifred Gilman' blooms in late
            spring into early summer, with a light bloom later in the summer.
            The distinctive whorled flowers are shades of blue and violet. When
            not in bloom, the plant forms a mound of gray-green leaves that are
            very aromatic on warm summer days.
          </Type>
          <Type paragraph>
            <StrongGrey>Water needs</StrongGrey>: Low to Very Low once
            established.
          </Type>
          <Type paragraph>
            <StrongGrey>Sun</StrongGrey>: Full sun, part shade.
          </Type>
          <Type paragraph>
            <StrongGrey>Size</StrongGrey>: 'Winifred Gilman' Cleveland sage
            grows 3-4' x 3-4' mounded shrub if unpruned. Other cultivars may be
            slightly larger and wider if unpruned.
          </Type>
          <Type paragraph>
            <StrongGrey>Care</StrongGrey>: Low water requirements. Lightly prune
            in late fall to maintain compact form.
          </Type>
          <Type paragraph>
            <StrongGrey>Availability</StrongGrey>: Cleveland sage is seasonally
            available. Local nurseries typically stock either 'Winifred Gilman'
            Cleveland Sage or 'Allan Chickering' Cleveland Sage throughout the
            spring and summer months.
          </Type>
          <Type paragraph>
            <StrongGrey>Bonus plants</StrongGrey>: Many other salvias or sages
            are Summer Strong plants with low water requirements and good summer
            looks. Besides 'Winnifred Gilman', 'Allen Chickering', and other
            Cleveland sages and cultivars, check out these readily available
            salvias: 'Bee's Bliss' Sage (Salvia 'Bees Bliss'), White Sage
            (Salvia apiana), and Hummingbird Sage (Salvia spathacea). A
            fantastic and popular family of plants! Available seasonally at
            local nurseries.
          </Type>
          <Spacing />
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
              UC Davis Arboretum All Stars: (https://arboretum.ucdavis.edu)
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
