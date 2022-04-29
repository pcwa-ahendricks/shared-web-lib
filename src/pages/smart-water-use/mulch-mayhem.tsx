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
  },
  listItem: {
    paddingBottom: 0
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
          <RowBox flexSpacing={10} responsive>
            <ChildBox flex="60%">
              <Type variant="h2" color="primary" gutterBottom>
                <em>Free Mulch Available for Customers of Hosting Agencies.</em>
              </Type>
              <Spacing />
              <Type paragraph>
                Join us for Mulch Mayhem{' '}
                <strong>Saturday, May 14th from 8:00 am - 12:00 pm</strong> at a
                NEW LOCATION: Del Oro High School Football Stadium Parking Lot
                off of Boyington Road in Loomis (Google search “Del Oro Football
                Stadium”)—also see map
              </Type>
              <Type variant="body1">
                A Drive Thru Only Event for Trucks and Trailers. (Bring your own
                tarp to cover).
              </Type>
              <List>
                {/* <ListItem>
                  <ListItemBullet>
                    <BulletIcon fontSize="large" />
                  </ListItemBullet>
                  <ListItemText primary="A Drive Thru Only Event for Trucks and Trailers. (Bring your own tarp to cover)" />
                </ListItem> */}
                <ListItem classes={{root: classes.listItem}}>
                  <ListItemBullet>
                    <BulletIcon fontSize="large" />
                  </ListItemBullet>
                  <ListItemText primary="For trucks and trailers: bring your own tarp to cover your load." />
                </ListItem>

                <ListItem classes={{root: classes.listItem}}>
                  <ListItemBullet>
                    <BulletIcon fontSize="large" />
                  </ListItemBullet>
                  <ListItemText
                    primary="For cars: bring your own tools for picking up and loading by
                hand (event staff is unable to assist)."
                  />
                </ListItem>
                <ListItem classes={{root: classes.listItem}}>
                  <ListItemBullet>
                    <BulletIcon fontSize="large" />
                  </ListItemBullet>
                  <ListItemText primary="Provided on a First-come, first-served basis until supplies are gone." />
                </ListItem>
                <ListItem classes={{root: classes.listItem}}>
                  <ListItemBullet>
                    <BulletIcon fontSize="large" />
                  </ListItemBullet>
                  <ListItemText primary="For personal use only; not for resale or commercial use." />
                </ListItem>
                <ListItem classes={{root: classes.listItem}}>
                  <ListItemBullet>
                    <BulletIcon fontSize="large" />
                  </ListItemBullet>
                  <ListItemText primary="One cubic yard per customer." />
                </ListItem>
              </List>
              <Type variant="body1" paragraph>
                Hosted by PCWA in partnership with San Juan Water District and
                the City of Lincoln.
              </Type>
              <Spacing />
              <Type variant="subtitle1" gutterBottom>
                Mulch Conserves Water!
              </Type>
              <Type paragraph>
                Mulch is like icing on a cake, because it keeps the soil moist
                the way icing keeps a cake moist. Mulch slows evaporation
                allowing water to sink into the soil, moderates soil temperature
                and breaks down into nutrients for plants. Be sure to add three
                to four inches of organic mulch (e.g. leaves, wood chips) around
                trees and plants for the greatest benefit.
              </Type>
              <Spacing />
              <Type variant="subtitle1" gutterBottom>
                Directions
              </Type>
              <Type paragraph>
                Del Oro Stadium Parking: Boyington Rd, Loomis, CA 95650 (Google
                Del Oro Football Stadium)
              </Type>
              <Type variant="subtitle2">From Sacramento:</Type>
              <Type paragraph>
                Take I-80 East
                <br />
                Take exit 112 for Penryn Rd
                <br />
                Turn left onto Penryn Rd
                <br />
                Turn left onto Boyington Rd
                <br />
                Turn right into Del Oro Stadium Parking
              </Type>
              <Type variant="subtitle2">From Auburn:</Type>
              <Type paragraph>
                Take I-80 West
                <br />
                Take exit 112 for Penryn Rd
                <br />
                Continue straight onto Boyington Rd
                <br />
                Turn right into Del Oro Stadium Parking
              </Type>
              <Spacing />
              <Image
                src="f2d8cf20-aeed-11ec-abde-779eab3b09ef-Visio-Mulch-Mayhem-Del-Oro.png"
                alt="Mulch Mayhem Map Directions"
                layout="responsive"
                loader={imgixLoader}
                width={1583}
                height={1599}
              />
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
