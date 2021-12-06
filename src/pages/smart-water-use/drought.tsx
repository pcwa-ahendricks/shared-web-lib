// cspell:ignore Eisley Normac watersavingplants
import React, {useCallback} from 'react'
import BulletIcon from 'mdi-material-ui/CircleSmall'
// import WaterIcon from 'mdi-material-ui/WaterPercent'
// import EcoIcon from '@material-ui/icons/Eco'
import {
  Typography as Type,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  createStyles,
  makeStyles,
  Theme,
  ListItemProps,
  ListItemIconProps
} from '@material-ui/core'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {ChildBox, RowBox} from 'mui-sleazebox'
import Spacing from '@components/boxes/Spacing'
import Image from 'next/image'
import MuiNextLink from '@components/NextLink/NextLink'
import imgixLoader from '@lib/imageLoader'
import Link from 'next/link'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItemBullet: {
      minWidth: theme.spacing(5)
    },
    headingIcon: {
      paddingRight: theme.spacing(1)
    },
    expansionPanel: {
      backgroundColor: theme.palette.common.white
    },
    cardMedia: {
      height: 200
    }
  })
)

export default function DroughtPage() {
  const classes = useStyles()

  const BulletItem = useCallback(
    ({children, ...rest}: Omit<ListItemProps, 'button'>) => {
      return <ListItem {...rest}>{children}</ListItem>
    },
    []
  )
  const ListItemBullet = useCallback(
    ({children, ...rest}: ListItemIconProps) => {
      return (
        <ListItemIcon classes={{root: classes.listItemBullet}} {...rest}>
          {children}
        </ListItemIcon>
      )
    },
    [classes]
  )

  return (
    <PageLayout title="Drought" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle title="Drought is Here" />
          <Spacing size="large" />
          <RowBox responsive="sm" flexSpacing={8}>
            <ChildBox flex="65%">
              <Type variant="h3" color="primary" gutterBottom>
                2021 is a critically dry year. What can customers do to save
                water?
              </Type>
              <Type paragraph>
                On October 19, 2021, Governor Newsom called on all Californians
                to redouble efforts to voluntarily reduce water use by 15
                percent to respond to the critically dry year we are currently
                experiencing. PCWA is taking actions to address water supply and
                environmental concerns and encourages customers to continue
                using water efficiently.
              </Type>
              <Type paragraph>
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
              </Type>
            </ChildBox>
            <ChildBox flex="1 1 40%">
              <Box maxWidth="70vw" margin="auto">
                {/*            <Image
                  alt="Was to save water"
                  layout="responsive"
                  width={1920}
                  height={1080}
                  loader={imgixLoader}
                  // src="6502b1b0-0b74-11ec-93a7-070c59f98950-MulchMayhem21edit.png"
                  src="9817ec90-2d49-11ec-bacc-a907dd10dd58-WayToSaveTV.jpg"
                /> */}
                <Box style={{cursor: 'pointer'}}>
                  <Link href="/smart-water-use/trees" passHref>
                    <Image
                      role="link"
                      tabIndex={0}
                      src="e8094190-52e2-11ec-9aff-3d50541531a0-your-yard-needs-less-water.jpg"
                      alt="Drought is back, water your trees, stress your lawn"
                      loader={imgixLoader}
                      layout="responsive"
                      sizes="(max-width: 600px) 60vw, 40vw"
                      width={960}
                      height={960}
                    />
                  </Link>
                </Box>
                <MuiNextLink href="/smart-water-use/trees" variant="caption">
                  Click image to learn how to help your trees survive the
                  drought
                </MuiNextLink>
              </Box>
            </ChildBox>
          </RowBox>
          <Spacing size="x-large" />
          <RowBox responsive flexSpacing={6}>
            <ChildBox flex="50.00%">
              <Type variant="h4" color="primary">
                Actions <strong>PCWA</strong> is taking
              </Type>
              <List dense disablePadding>
                <BulletItem>
                  <ListItemBullet>
                    <BulletIcon fontSize="large" />
                  </ListItemBullet>
                  <ListItemText primary="Operating PCWA’s western Placer groundwater wells to reduce surface water demands." />
                </BulletItem>
                <BulletItem>
                  <ListItemBullet>
                    <BulletIcon fontSize="large" />
                  </ListItemBullet>
                  <ListItemText primary="Shifting a portion of wholesale demands to groundwater." />
                </BulletItem>{' '}
                <BulletItem>
                  <ListItemBullet>
                    <BulletIcon fontSize="large" />
                  </ListItemBullet>
                  <ListItemText primary="Enhancing water efficiency rebate programs." />
                </BulletItem>
                <BulletItem>
                  <ListItemBullet>
                    <BulletIcon fontSize="large" />
                  </ListItemBullet>
                  <ListItemText primary="Expanding canal operation hours to monitor for and minimize water losses." />
                </BulletItem>
                <BulletItem>
                  <ListItemBullet>
                    <BulletIcon fontSize="large" />
                  </ListItemBullet>
                  <ListItemText primary="Meeting our Water Forum commitment to the lower American River by releasing extra water from our reservoirs for fishery benefits." />
                </BulletItem>
              </List>
              <Spacing size="large" />
              <Box width="90%" m="auto">
                <Image
                  src="acae4b60-207c-11ec-99dc-57488d0e52ad-WaterHereLessHerewebsite-banner.jpg"
                  loader={imgixLoader}
                  alt="Drought is here, water less banner"
                  height={540}
                  width={1200}
                  layout="responsive"
                  sizes="(max-width: 600px) 90vw, 40vw"
                />
              </Box>
            </ChildBox>
            <ChildBox flex="50.00%">
              <Type variant="h4" color="primary">
                Actions <strong>customers</strong> can take outdoors and indoors
              </Type>
              <List dense disablePadding>
                <BulletItem>
                  <ListItemBullet>
                    <BulletIcon fontSize="large" />
                  </ListItemBullet>
                  <ListItemText>
                    <Type variant="inherit">
                      Stress your lawn and save your trees. Now’s the time to
                      turn off sprinklers and let Mother Nature do the watering.
                      Cooler, shorter, wetter days mean your yard shouldn’t need
                      extra water. But remember to take special care of your
                      trees, especially if the weather stays dry for a while.
                      Follow{' '}
                      <Link href="/smart-water-use/trees">
                        this link to learn tree watering tips
                      </Link>
                      .
                    </Type>
                  </ListItemText>
                </BulletItem>
                <BulletItem>
                  <ListItemBullet>
                    <BulletIcon fontSize="large" />
                  </ListItemBullet>
                  <ListItemText primary="Check soil moisture before turning on sprinklers. Stop by our main office to pick up a free moisture meter today." />
                </BulletItem>{' '}
                <BulletItem>
                  <ListItemBullet>
                    <BulletIcon fontSize="large" />
                  </ListItemBullet>
                  <ListItemText primary="Replace older sprinklers with more efficient nozzles." />
                </BulletItem>
                <BulletItem>
                  <ListItemBullet>
                    <BulletIcon fontSize="large" />
                  </ListItemBullet>
                  <ListItemText primary="Upgrade to a WaterSense-labeled, weather-based sprinkler timer." />
                </BulletItem>
                <BulletItem>
                  <ListItemBullet>
                    <BulletIcon fontSize="large" />
                  </ListItemBullet>
                  <ListItemText primary="Water plants early in the morning to reduce evaporation." />
                </BulletItem>
                <BulletItem>
                  <ListItemBullet>
                    <BulletIcon fontSize="large" />
                  </ListItemBullet>
                  <ListItemText primary="Check for and fix leaks. The most common type of leak inside a home is a toilet leak, which can waste 200 gallons of water per day.  That’s enough to wash seven loads of laundry every day for a month." />
                </BulletItem>
                <BulletItem>
                  <ListItemBullet>
                    <BulletIcon fontSize="large" />
                  </ListItemBullet>
                  <ListItemText primary="Add a layer of mulch on top of soil, 2-3 inches thick. Mulch is like icing on a cake, because it keeps the soil moist the way icing keeps a cake moist." />
                </BulletItem>
                <BulletItem>
                  <ListItemBullet>
                    <BulletIcon fontSize="large" />
                  </ListItemBullet>
                  <ListItemText
                    primary="Cycle and soak to prevent runoff. Some sprinkler systems apply water faster than the ground will absorb, causing water to run off your landscape into the street and gutter. Cycle and soak is a process of running your sprinklers in shorter increments spaced out over a period of time to allow for better absorption by the soil.
·         Adjust sprinklers to reduce overspray."
                  />
                </BulletItem>
                <BulletItem>
                  <ListItemBullet>
                    <BulletIcon fontSize="large" />
                  </ListItemBullet>
                  <ListItemText primary="Adjust sprinklers to reduce overspray." />
                </BulletItem>
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
