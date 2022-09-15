// cspell:ignore Eisley Normac watersavingplants Newsom
import React from 'react'
import GovtIcon from '@material-ui/icons/AccountBalance'
// import WaterIcon from 'mdi-material-ui/WaterPercent'
// import EcoIcon from '@material-ui/icons/Eco'
import {
  Typography as Type,
  Box,
  List,
  ListItemText,
  createStyles,
  makeStyles,
  Paper,
  useMediaQuery,
  useTheme
} from '@material-ui/core'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {ChildBox, ColumnBox, RowBox} from 'mui-sleazebox'
import Spacing from '@components/boxes/Spacing'
import Image from 'next/image'
import MuiNextLink from '@components/NextLink/NextLink'
import imgixLoader from '@lib/imageLoader'
import Link from 'next/link'
import ListBulletItem from '@components/lists/ListBulletItem'

const useStyles = makeStyles((theme) =>
  createStyles({
    headingIcon: {
      paddingRight: theme.spacing(1)
    },
    expansionPanel: {
      backgroundColor: theme.palette.common.white
    },
    cardMedia: {
      height: 200
    },
    noBottomMargin: {
      marginBottom: 0
    }
  })
)

export default function DroughtPage() {
  const classes = useStyles()

  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))

  return (
    <PageLayout title="Drought" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle title="How To Conserve 20% During Drought" />
          <Spacing size="large" />
          <RowBox responsive="sm" flexSpacing={8}>
            <ChildBox flex="65%">
              {/* <Type variant="h3" color="primary" gutterBottom>
                2021 is a critically dry year. What can customers do to save
                water?
              </Type> */}
              {/* <Type paragraph>
                On October 19, 2021, Governor Newsom called on all Californians
                to redouble efforts to voluntarily reduce water use by 15
                percent to respond to the critically dry year we are currently
                experiencing. PCWA is taking actions to address water supply and
                environmental concerns and encourages customers to continue
                using water efficiently.
              </Type> */}
              <Type paragraph>
                Due to severe drought, Governor Newsom has called on all
                Californians to increase their water conservation efforts and
                reduce water use by 20 percent. In line with the Governor, the
                State Water Resources Control Board adopted an emergency
                regulation on May 24, 2022. As a result, PCWA moved to Stage 2
                of its{' '}
                <MuiNextLink
                  underline="always"
                  href="/smart-water-use/water-shortage-contingency-plan"
                  noWrap
                >
                  Water Shortage Contingency Plan
                </MuiNextLink>
                .
              </Type>
              {/* <Type paragraph>
                Here are some tips you can follow around your home and business
                to help our water stewardship efforts. Also, make sure to take
                advantage of PCWA's enhanced water efficiency{' '}
                <MuiNextLink
                  underline="always"
                  href="/smart-water-use/rebate-programs"
                >
                  rebate
                </MuiNextLink>{' '}
                program.{' '}
              </Type> */}
              <Type paragraph>
                PCWA asks customers to pitch in and do their part to stop water
                waste and use less water. Below are some tips to follow at your
                home and business to help our water stewardship efforts. You can
                also take advantage of PCWA's enhanced{' '}
                <MuiNextLink
                  noWrap
                  underline="always"
                  href="/smart-water-use/rebate-programs"
                >
                  water efficiency rebate programs
                </MuiNextLink>{' '}
                or search for additional tips on the{' '}
                <MuiNextLink underline="always" href="/smart-water-use">
                  Smart Water Use
                </MuiNextLink>{' '}
                page.
              </Type>
              <Box py={1}>
                <Paper>
                  <RowBox p={2} flexSpacing={2} alignItems="center">
                    <ChildBox>
                      <GovtIcon color="primary" />
                    </ChildBox>
                    <ColumnBox child>
                      <Type variant="subtitle1">
                        State Water Resources Control Board Regulations
                      </Type>
                      <MuiNextLink
                        // underline="always"
                        variant="body1"
                        href="/smart-water-use/cii-conservation-regulations"
                      >
                        Click here to learn About Emergency Conservation
                        Regulations for Commercial, Industrial and Institutional
                        Properties
                      </MuiNextLink>
                    </ColumnBox>
                  </RowBox>
                </Paper>
              </Box>
            </ChildBox>
          </RowBox>
        </WideContainer>
        <Box my={2} mb={4}>
          <Paper elevation={0}>
            <WideContainer py={3}>
              <RowBox responsive flexSpacing={3}>
                <ChildBox flex="1 0 57%">
                  <Type variant="h3" color="primary">
                    Actions <strong>customers</strong> can take outdoors and
                    indoors
                  </Type>
                  <List dense disablePadding>
                    <ListBulletItem>
                      <ListItemText classes={{root: classes.noBottomMargin}}>
                        {/* <Type variant="inherit">
                      Stress your lawn and save your trees. Now's the time to
                      turn off sprinklers and let Mother Nature do the watering.
                      Cooler, shorter, wetter days mean your yard shouldn't need
                      extra water. But remember to take special care of your
                      trees, especially if the weather stays dry for a while.
                      Follow{' '}
                      <Link href="/smart-water-use/trees">
                        this link to learn tree watering tips
                      </Link>
                      .
                    </Type> */}
                        <Type variant="inherit">
                          Stress your lawn and save your trees. Reduce each
                          sprinkler cycle by two minutes to achieve an instant
                          water savings of 20 percent. But remember to take
                          special care of your trees. Follow{' '}
                          <Link href="/smart-water-use/trees">
                            this link to learn tree watering tips
                          </Link>
                          .
                        </Type>
                      </ListItemText>
                    </ListBulletItem>
                    <ListBulletItem>
                      <ListItemText
                        classes={{root: classes.noBottomMargin}}
                        primary="Check soil moisture before turning on sprinklers. Stop by our main office to pick up a free moisture meter today."
                      />
                    </ListBulletItem>{' '}
                    <ListBulletItem>
                      <ListItemText
                        classes={{root: classes.noBottomMargin}}
                        primary="Replace older sprinklers with more efficient nozzles."
                      />
                    </ListBulletItem>
                    <ListBulletItem>
                      <ListItemText
                        classes={{root: classes.noBottomMargin}}
                        primary="Upgrade to a WaterSense-labeled, weather-based sprinkler timer."
                      />
                    </ListBulletItem>
                    <ListBulletItem>
                      <ListItemText
                        classes={{root: classes.noBottomMargin}}
                        primary="Water plants early in the morning to reduce evaporation."
                      />
                    </ListBulletItem>
                    <ListBulletItem>
                      <ListItemText
                        classes={{root: classes.noBottomMargin}}
                        primary="Check for and fix leaks. The most common type of leak inside a home is a toilet leak, which can waste 200 gallons of water per day.  That’s enough to wash seven loads of laundry every day for a month."
                      />
                    </ListBulletItem>
                    <ListBulletItem>
                      <ListItemText
                        classes={{root: classes.noBottomMargin}}
                        primary="Add a layer of mulch on top of soil, 2-3 inches thick. Mulch is like icing on a cake, because it keeps the soil moist the way icing keeps a cake moist."
                      />
                    </ListBulletItem>
                    <ListBulletItem>
                      <ListItemText
                        classes={{root: classes.noBottomMargin}}
                        primary="Cycle and soak to prevent runoff. Some sprinkler systems apply water faster than the ground will absorb, causing water to run off your landscape into the street and gutter. Cycle and soak is a process of running your sprinklers in shorter increments spaced out over a period of time to allow for better absorption by the soil."
                      />
                    </ListBulletItem>
                    <ListBulletItem>
                      <ListItemText
                        classes={{root: classes.noBottomMargin}}
                        primary="Adjust sprinklers to reduce overspray."
                      />
                    </ListBulletItem>
                  </List>
                </ChildBox>
                <ChildBox flex="nogrow">
                  <Box maxWidth="70vw" margin="auto">
                    <Box style={{cursor: 'pointer'}}>
                      <Link href="/smart-water-use/trees" passHref>
                        <Image
                          aria-label="image link to Tree Care page"
                          role="link"
                          tabIndex={0}
                          // src="d5a80e50-52e2-11ec-9aff-3d50541531a0-drought-is-back.jpg"
                          // alt="Drought is back, water your trees, stress your lawn"
                          src="9051d290-e5dc-11ec-9447-f98173199613-Young-tree-canopy.jpg"
                          alt="Young Tree Canopy photo"
                          loader={imgixLoader}
                          layout="responsive"
                          sizes="(max-width: 600px) 60vw, 40vw"
                          width={971}
                          height={1295}
                          /* width={300}
                      height={250} */
                        />
                        {/*            <Image
                  alt="Was to save water"
                  layout="responsive"
                  width={1920}
                  height={1080}
                  loader={imgixLoader}
                  // src="6502b1b0-0b74-11ec-93a7-070c59f98950-MulchMayhem21edit.png"
                  src="9817ec90-2d49-11ec-bacc-a907dd10dd58-WayToSaveTV.jpg"
                /> */}
                      </Link>

                      <Box maxWidth="80%" textAlign="center" m="auto" mt={1}>
                        <MuiNextLink
                          href="/smart-water-use/trees"
                          variant="caption"
                        >
                          Visit our Tree Care page to learn how to help your
                          trees survive the drought
                        </MuiNextLink>
                      </Box>
                    </Box>
                  </Box>
                </ChildBox>
              </RowBox>
            </WideContainer>
          </Paper>
        </Box>
        <WideContainer>
          <RowBox responsive flexSpacing={3}>
            <ChildBox flex="45%" order={isXs ? 2 : 1}>
              <Box width="95%" m="auto">
                <Image
                  // src="d5a80e50-52e2-11ec-9aff-3d50541531a0-drought-is-back.jpg"
                  // alt="Drought is back, water your trees, stress your lawn"
                  src="93013b20-e5dc-11ec-9447-f98173199613-Young-tree-in-landscape.jpg"
                  alt="Young tree in new water-wise yard"
                  loader={imgixLoader}
                  layout="responsive"
                  sizes="(max-width: 600px) 60vw, 40vw"
                  width={1250}
                  height={903}
                  /* width={300}
                height={250} */
                />
                {/*               <Image
                  src="acae4b60-207c-11ec-99dc-57488d0e52ad-WaterHereLessHerewebsite-banner.jpg"
                  loader={imgixLoader}
                  alt="Drought is here, water less banner"
                  height={540}
                  width={1200}
                  layout="responsive"
                  sizes="(max-width: 600px) 90vw, 40vw"
                /> */}
                {/* <Image
                  role="link"
                  tabIndex={0}
                  src="e8094190-52e2-11ec-9aff-3d50541531a0-your-yard-needs-less-water.jpg"
                  alt="Your yard needs less water in the winter graphic"
                  loader={imgixLoader}
                  layout="responsive"
                  sizes="(max-width: 600px) 60vw, 40vw"
                  width={300}
                  height={250}
                /> */}
              </Box>
            </ChildBox>
            <ChildBox flex="55%" order={isXs ? 1 : 2}>
              <Type variant="h3" color="primary">
                Actions <strong>PCWA</strong> is taking
              </Type>
              <List dense disablePadding>
                <ListBulletItem>
                  <ListItemText
                    classes={{root: classes.noBottomMargin}}
                    primary="Operating PCWA's western Placer groundwater wells to reduce surface water demands."
                  />
                </ListBulletItem>
                <ListBulletItem>
                  <ListItemText
                    classes={{root: classes.noBottomMargin}}
                    primary="Shifting a portion of wholesale demands to groundwater."
                  />
                </ListBulletItem>
                <ListBulletItem>
                  <ListItemText
                    classes={{root: classes.noBottomMargin}}
                    primary="Enhancing water efficiency rebate programs."
                  />
                </ListBulletItem>
                <ListBulletItem>
                  <ListItemText
                    classes={{root: classes.noBottomMargin}}
                    primary="Expanding canal operation hours to monitor for and minimize water losses."
                  />
                </ListBulletItem>
                <ListBulletItem>
                  <ListItemText
                    classes={{root: classes.noBottomMargin}}
                    primary="Meeting our Water Forum commitment to the lower American River by releasing extra water from our reservoirs for fishery benefits."
                  />
                </ListBulletItem>
              </List>
            </ChildBox>
          </RowBox>
          {/* <Spacing size="x-large" />
          <RowBox justifyContent="center" flexSpacing={2}>
            <ChildBox>
              <WaterIcon fontSize="large" color="primary" />
            </ChildBox>
            <ChildBox>
              <EcoIcon fontSize="large" color="secondary" />
            </ChildBox>
          </RowBox> */}
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}
