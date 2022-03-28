import React, {useCallback} from 'react'
import {
  List,
  ListItem,
  makeStyles,
  Typography as Type,
  ListItemText,
  ListItemIcon,
  ListItemIconProps
} from '@material-ui/core'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import PageTitle from '@components/PageTitle/PageTitle'
import Image from 'next/image'
import imgixLoader from '@lib/imageLoader'
import Spacing from '@components/boxes/Spacing'
import BulletIcon from 'mdi-material-ui/CircleSmall'
import WideContainer from '@components/containers/WideContainer'
import {ChildBox, ColumnBox, RowBox} from 'mui-sleazebox'

const useStyles = makeStyles((theme) => ({
  listItemBullet: {
    minWidth: theme.spacing(5)
  }
}))

export default function MulchMayhemPage() {
  const classes = useStyles()
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
    <PageLayout title="Mulch Mayhem" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle title="Mulch Mayhem" />
          <Image
            src="d73771e0-aeed-11ec-abde-779eab3b09ef-PCWA-Mulch-Mayhem-Graphic-for-Web.jpg"
            alt="Mulch Mayhem Flier"
            layout="responsive"
            loader={imgixLoader}
            width={1200}
            height={628}
          />
          <Spacing factor={2} size="large" />
          <RowBox flexSpacing={10}>
            <ChildBox flex="60%">
              <Type variant="h2" color="primary" gutterBottom>
                <em>
                  Free Mulch available for Drive Thru Customers of hosting
                  agencies
                </em>
              </Type>
              <Spacing />
              <Type>
                Join us for Mulch Mayhem{' '}
                <strong>
                  Saturday, September 25th from 8:00 am - 12:00 pm
                </strong>{' '}
                at Sierra College Overflow Lot, located at the corner of Rocklin
                Road and El Don Drive.
              </Type>
              <List>
                <ListItem>
                  <ListItemBullet>
                    <BulletIcon fontSize="large" />
                  </ListItemBullet>
                  <ListItemText
                    primary="A Drive Thru Only Event for Trucks and Trailers. (Bring your own tarp
                to cover)"
                  />
                </ListItem>
                <ListItem>
                  <ListItemBullet>
                    <BulletIcon fontSize="large" />
                  </ListItemBullet>
                  <ListItemText primary="Provided on a First-come, first-served basis until supplies are gone." />
                </ListItem>
                <ListItem>
                  <ListItemBullet>
                    <BulletIcon fontSize="large" />
                  </ListItemBullet>
                  <ListItemText primary="For personal use only; not for resale or commercial use." />
                </ListItem>
              </List>
              <Spacing />
              <Type variant="subtitle1" gutterBottom>
                Mulch Conserves Water!
              </Type>
              <Type paragraph>
                Mulch is like icing on a cake, because it keeps the soil moist
                the way icing keeps a cake moist. Mulch slows evaporation
                allowing water to sink into the soil, moderates soil temperature
                and breaks down into nutrients for plants. Be sure to add three
                to four inches or organic mulch (e.g. leaves, wood chips) around
                trees and plants for the greatest benefit.
              </Type>
            </ChildBox>
            <ColumnBox child flex="40%">
              <ChildBox>
                <Image
                  src="a80ea740-0c12-11ec-93a7-070c59f98950-Mulch-Mayhem-loading-trucks01.JPG"
                  alt="Pickup truck with a bed full of mulch"
                  layout="responsive"
                  loader={imgixLoader}
                  height={3840}
                  width={5760}
                />
              </ChildBox>
              <Spacing />
              <ChildBox>
                <Image
                  src="a07660e0-0c12-11ec-93a7-070c59f98950-Mulch-Mayhem-loading-trucks04.JPG"
                  alt="Tractor loading mulch into the bed of a pickup truck"
                  layout="responsive"
                  loader={imgixLoader}
                  height={3840}
                  width={5760}
                />
              </ChildBox>
              <Spacing />
              <ChildBox>
                <Image
                  src="99102700-0c12-11ec-93a7-070c59f98950-Mulch-Mayhem-loading-trucks02.JPG"
                  alt="Tractor loading mulch"
                  layout="responsive"
                  loader={imgixLoader}
                  height={3840}
                  width={5760}
                />
              </ChildBox>
            </ColumnBox>
          </RowBox>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}
