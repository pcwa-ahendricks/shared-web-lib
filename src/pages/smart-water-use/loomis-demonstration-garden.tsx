// cspell:ignore bewatersmart arwec usbr
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import {
  useTheme,
  Box,
  Typography as Type,
  Unstable_Grid2 as Grid,
  Grid2Props,
  useMediaQuery
} from '@mui/material'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import PageTitle from '@components/PageTitle/PageTitle'
import Spacing from '@components/boxes/Spacing'
import {Theme} from '@lib/material-theme'
import Image from 'next/image'
import {imgixUrlLoader} from '@lib/imageLoader'
import WideContainer from '@components/containers/WideContainer'
import FadeIn, {FadeInProps} from '@components/boxes/animate/FadeIn'
import {useIntersection} from 'react-use'
import SlideInLeft, {
  SlideInLeftProps
} from '@components/boxes/animate/SlideInLeft'
import Link from '@components/Link'
import {UiContext, setAnimateDone} from '@components/ui/UiStore'
import useLinkComponent from '@hooks/useLinkComponent'

const LoomisDemonstrationGardenPage = () => {
  const theme = useTheme<Theme>()

  const secondaryPalette = theme.palette.secondary
  const imgixIconFg = secondaryPalette.main.replace('#', '') // -> 599F46

  const LinkComponent = useLinkComponent()

  const isXS = useMediaQuery(theme.breakpoints.only('xs'))

  return (
    <PageLayout title="Loomis Demonstration Garden" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle
            title="Discover the Loomis Demonstration Garden"
            subtitle="Smart Water Use"
          />
          <Box mt={6}>
            <Type paragraph>
              Explore water-wise landscaping techniques and sustainable
              gardening practices at Placer County’s newest demonstration garden
              at the Loomis Library and Community Learning Center. Spearheaded
              by the UC Master Gardeners of Placer County, the Loomis
              Demonstration Garden replaced over 11,000 square feet of lawn to
              serve as a valuable community resource.
            </Type>
            <Spacing size="large" factor={2} />
            <TileContainer>
              <Tile>
                <FadeInIntersect animateKey="loomis-demo-garden-img1">
                  <SlideInLeftIntersect animateKey="loomis-demo-garden-img1">
                    <TileHeaderContainer>
                      <TileHeaderImg>
                        <Box>
                          <Image
                            alt="Learning Hub Header Icon"
                            loader={imgixUrlLoader}
                            width={698}
                            height={698}
                            style={{
                              objectFit: 'contain',
                              width: '100%',
                              height: 'auto'
                            }}
                            src={`https://pcwa.imgix.net/pcwa-net/water-efficiency/loomis-demo-garden/PCWA_LoomisDemonstrationGarden_Icons-LearningHub.png?duotone=${imgixIconFg},00FFFFFF&duotone-alpha=100`}
                          />
                        </Box>
                      </TileHeaderImg>
                      <TileHeaderTitle>
                        <Type variant="h2" gutterBottom color="primary">
                          A Learning Hub
                        </Type>
                      </TileHeaderTitle>
                    </TileHeaderContainer>
                  </SlideInLeftIntersect>
                  <Type paragraph>
                    The demonstration garden provides a great opportunity to see
                    expert methods for creating a water-wise and
                    wildlife-friendly garden that attracts pollinators and
                    supports local biodiversity. Each plant is labeled and has a
                    QR code providing additional information. The garden also
                    hosts free workshops, community classes, and events
                    throughout the year.
                  </Type>
                </FadeInIntersect>
              </Tile>

              <Tile>
                <FadeInIntersect animateKey="loomis-demo-garden-img2">
                  <SlideInLeftIntersect animateKey="loomis-demo-garden-img2">
                    <TileHeaderContainer>
                      <TileHeaderImg>
                        <Box>
                          <Image
                            alt="Diverse Plantings Header Icon"
                            loader={imgixUrlLoader}
                            width={698}
                            height={698}
                            style={{
                              objectFit: 'contain',
                              width: '100%',
                              height: 'auto'
                            }}
                            src={`https://pcwa.imgix.net/pcwa-net/water-efficiency/loomis-demo-garden/PCWA_LoomisDemonstrationGarden_Icons-DiversePlantings.png?duotone=${imgixIconFg},00FFFFFF&duotone-alpha=100`}
                          />
                        </Box>
                      </TileHeaderImg>
                      <TileHeaderTitle>
                        <Type variant="h2" gutterBottom color="primary">
                          Diverse Plantings
                        </Type>
                      </TileHeaderTitle>
                    </TileHeaderContainer>
                  </SlideInLeftIntersect>

                  <Type paragraph>
                    The garden showcases 12 unique areas with over 85 plant
                    varieties. From California natives to pollinators, each
                    section offers insights into plants that thrive in our
                    region.
                  </Type>
                </FadeInIntersect>
              </Tile>

              <Tile>
                <FadeInIntersect animateKey="loomis-demo-garden-img3">
                  <SlideInLeftIntersect animateKey="loomis-demo-garden-img3">
                    <TileHeaderContainer>
                      <TileHeaderImg>
                        <Box>
                          <Image
                            alt="Designed with Water Efficiency in Mind Header Icon"
                            loader={imgixUrlLoader}
                            width={698}
                            height={698}
                            style={{
                              objectFit: 'contain',
                              width: '100%',
                              height: 'auto'
                            }}
                            src={`https://pcwa.imgix.net/pcwa-net/water-efficiency/loomis-demo-garden/PCWA_LoomisDemonstrationGarden_Icons-DesignedWaterEfficiency.png?duotone=${imgixIconFg},00FFFFFF&duotone-alpha=100`}
                          />
                        </Box>
                      </TileHeaderImg>
                      <TileHeaderTitle>
                        <Type variant="h2" gutterBottom color="primary">
                          Designed with Water Efficiency in Mind
                        </Type>
                      </TileHeaderTitle>
                    </TileHeaderContainer>
                  </SlideInLeftIntersect>
                  <Type paragraph>
                    PCWA invested over $22,000 in rebates and sponsorships to
                    help fund the makeover from thirsty lawn to native and
                    low-water plants suited to our local climate and the
                    installation of an efficient irrigation system.
                  </Type>
                  <Type paragraph>
                    The garden features alternatives to traditional lawns with a
                    no-mow turf area and incorporates advanced irrigation
                    technology, including drip systems and smart sprinkler
                    timers.
                  </Type>
                </FadeInIntersect>
              </Tile>

              <Tile>
                <FadeInIntersect animateKey="loomis-demo-garden-img4">
                  <SlideInLeftIntersect animateKey="loomis-demo-garden-img4">
                    <TileHeaderContainer>
                      <TileHeaderImg>
                        <Box>
                          <Image
                            alt="HOA-Friendly Approaches Header Icon"
                            loader={imgixUrlLoader}
                            width={698}
                            height={698}
                            style={{
                              objectFit: 'contain',
                              width: '100%',
                              height: 'auto'
                            }}
                            src={`https://pcwa.imgix.net/pcwa-net/water-efficiency/loomis-demo-garden/PCWA_LoomisDemonstrationGarden_Icons-HOA_Friendly.png?duotone=${imgixIconFg},00FFFFFF&duotone-alpha=100`}
                          />
                        </Box>
                      </TileHeaderImg>
                      <TileHeaderTitle>
                        <Type variant="h2" gutterBottom color="primary">
                          HOA-Friendly Approaches
                        </Type>
                      </TileHeaderTitle>
                    </TileHeaderContainer>
                  </SlideInLeftIntersect>
                  <Type paragraph>
                    The HOA-friendly area showcases how native plants can be
                    incorporated into residential landscapes while maintaining a
                    tidy appearance and meeting architectural guidelines for
                    many homeowner’s associations. Many of these plants are also
                    deer-resistant.
                  </Type>
                </FadeInIntersect>
              </Tile>

              <Tile>
                <FadeInIntersect animateKey="loomis-demo-garden-img5">
                  <SlideInLeftIntersect animateKey="loomis-demo-garden-img5">
                    <TileHeaderContainer>
                      <TileHeaderImg>
                        <Box>
                          <Image
                            alt="Fruitful Displays Header Icon"
                            loader={imgixUrlLoader}
                            width={698}
                            height={698}
                            style={{
                              objectFit: 'contain',
                              width: '100%',
                              height: 'auto'
                            }}
                            src={`https://pcwa.imgix.net/pcwa-net/water-efficiency/loomis-demo-garden/PCWA_LoomisDemonstrationGarden_Icons-FruitfulDisplays.png?duotone=${imgixIconFg},00FFFFFF&duotone-alpha=100`}
                          />
                        </Box>
                      </TileHeaderImg>
                      <TileHeaderTitle>
                        <Type variant="h2" gutterBottom color="primary">
                          Fruitful Displays
                        </Type>
                      </TileHeaderTitle>
                    </TileHeaderContainer>
                  </SlideInLeftIntersect>
                  <Type paragraph>
                    Explore the small orchard, showcasing fruit trees trained on
                    trellises and grown in large pots. From apples and pears to
                    berries and herbs, the garden demonstrates how to cultivate
                    delicious produce in a backyard setting.
                  </Type>
                </FadeInIntersect>
              </Tile>
            </TileContainer>
            {/* END  */}
            <Spacing size="large" factor={2}>
              {/* <Box display="flex"> */}
              {/* <Box m="auto"> */}
              {/* <LocalDrinkIcon color="secondary" fontSize="large" /> */}
              {/* </Box> */}
              {/* </Box> */}
            </Spacing>
            <Type variant="h3" gutterBottom>
              Visit the Garden
            </Type>
            <Box>
              <Grid
                container
                flexDirection={isXS ? 'row-reverse' : 'row'}
                spacing={isXS ? 0 : 4}
              >
                <Grid
                  xs={1.25}
                  sm={1.2}
                  md={1.1}
                  lg={1}
                  display="flex"
                  alignItems="center"
                >
                  <Image
                    loader={imgixUrlLoader}
                    height={1424}
                    width={1424}
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: 'auto'
                    }}
                    alt="Loomis Library and Community Learning Center Map Marker Graphic"
                    src="https://pcwa.imgix.net/pcwa-net/water-efficiency/loomis-demo-garden/Loomis%20Demo%20Garden%20Map%20Marker.png"
                  />
                </Grid>
                <Grid xs display="flex" alignItems="center">
                  <Box>
                    <Type>
                      <Type component="strong">Location:</Type>{' '}
                      <Type component="span">
                        Loomis Library and Community Learning Center at 6050
                        Library Drive in Loomis
                      </Type>
                    </Type>
                    <Type>
                      <Type component="strong">Hours:</Type>{' '}
                      <Type component="span">
                        Open during regular library hours
                      </Type>
                    </Type>
                    <Type>
                      <Type component="strong">Admission and parking:</Type>{' '}
                      <Type component="span">Free of charge</Type>
                    </Type>
                    <Type>
                      <Type component="strong">Learn more:</Type>{' '}
                      <Type component="span">
                        Scan the QR code below, or visit{' '}
                        <Link
                          href="https://pcmg.ucanr.edu/Demonstration_Garden"
                          rel="noopener noreferrer"
                          target="_blank"
                          noWrap
                        >
                          https://pcmg.ucanr.edu/Demonstration_Garden
                        </Link>
                      </Type>
                    </Type>
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{margin: 'auto', maxWidth: 125, marginTop: 2}}>
                <Box
                  component={LinkComponent}
                  href="https://pcmg.ucanr.edu/Demonstration_Garden"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-describedby="qr-description"
                >
                  <Image
                    loader={imgixUrlLoader}
                    src="https://pcwa.imgix.net/pcwa-net/water-efficiency/loomis-demo-garden/qr-code%20Loomis%20Demo%20Garden.png"
                    width={800}
                    height={800}
                    alt="Loomis Demonstration Garden QR Code"
                    style={{
                      objectFit: 'contain',
                      width: '100%',
                      height: 'auto'
                    }}
                    aria-describedby="qr-description"
                  />
                </Box>
                <p id="qr-description" className="sr-only">
                  Scan this QR code with your phone to visit
                  https://pcmg.ucanr.edu/Demonstration_Garden.
                </p>
              </Box>
            </Box>

            <Spacing factor={2} />
            <Type variant="h3" gutterBottom>
              Rebates Available!
            </Type>
            <Type>
              PCWA offers rebates for homes and businesses wishing to undertake
              their own garden transformation. Learn more by visiting our{' '}
              <Link underline="always" href="/smart-water-use/rebate-programs">
                Rebate Programs Page
              </Link>
              .
            </Type>
          </Box>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export default LoomisDemonstrationGardenPage

const FadeInIntersect = ({
  children,
  animateKey,
  ...props
}: FadeInProps & {animateKey: string}) => {
  const uiContext = useContext(UiContext)
  const {state: uiState, dispatch: uiDispatch} = uiContext

  const {[animateKey]: previouslyAnimated} = uiState.animateDone
  const animateDoneHandler = useCallback(() => {
    uiDispatch(setAnimateDone(animateKey, true))
  }, [uiDispatch, animateKey])

  const ref = useRef<HTMLDivElement>(null)
  const [intersected, setIntersected] = useState(false)
  const intersection = useIntersection(ref, {
    root: null,
    rootMargin: '0px'
  })

  useEffect(() => {
    const animate = intersection?.isIntersecting
    if (animate && !intersected) {
      setIntersected(true)
    }
  }, [intersection, intersected])

  const shouldAnimate = intersected && !previouslyAnimated

  return (
    <Box ref={ref}>
      <FadeIn
        transparentUntilAnimate={!previouslyAnimated}
        animate={shouldAnimate}
        onAnimationEnd={animateDoneHandler}
        {...props}
      >
        {children}
      </FadeIn>
    </Box>
  )
}

const SlideInLeftIntersect = ({
  children,
  animateKey,
  ...props
}: SlideInLeftProps & {animateKey: string}) => {
  const uiContext = useContext(UiContext)
  const {state: uiState, dispatch: uiDispatch} = uiContext

  const {[animateKey]: previouslyAnimated} = uiState.animateDone
  const animateDoneHandler = useCallback(() => {
    uiDispatch(setAnimateDone(animateKey, true))
  }, [uiDispatch, animateKey])

  const ref = useRef<HTMLDivElement>(null)
  const [intersected, setIntersected] = useState(false)
  const intersection = useIntersection(ref, {
    root: null,
    rootMargin: '0px'
  })

  useEffect(() => {
    const animate = intersection?.isIntersecting
    if (animate && !intersected) {
      setIntersected(true)
    }
  }, [intersection, intersected])

  const shouldAnimate = intersected && !previouslyAnimated

  return (
    <Box ref={ref}>
      <SlideInLeft
        animate={shouldAnimate}
        onAnimationEnd={animateDoneHandler}
        {...props}
      >
        {children}
      </SlideInLeft>
    </Box>
  )
}

const TileContainer = ({children, ...props}: Grid2Props) => {
  return (
    <Grid container columnSpacing={8} rowSpacing={4} {...props}>
      {children}
    </Grid>
  )
}

const Tile = ({children, ...props}: Grid2Props) => {
  return (
    <Grid xs={12} sm={6} {...props}>
      {children}
    </Grid>
  )
}

const TileHeaderContainer = ({children, ...props}: Grid2Props) => {
  return (
    <Grid container spacing={3} sx={{marginBottom: 1}} {...props}>
      {children}
    </Grid>
  )
}
const TileHeaderImg = ({children, ...props}: Grid2Props) => {
  return (
    <Grid xs={2} sm={2.5} display="flex" alignItems="center" {...props}>
      {children}
    </Grid>
  )
}
const TileHeaderTitle = ({children, ...props}: Grid2Props) => {
  return (
    <Grid xs display="flex" alignItems="center" {...props}>
      {children}
    </Grid>
  )
}
