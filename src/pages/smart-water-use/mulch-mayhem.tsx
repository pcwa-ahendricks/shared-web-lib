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
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import Image from 'next/image'
import imgixLoader from '@lib/imageLoader'
import Spacing from '@components/boxes/Spacing'
import BulletIcon from 'mdi-material-ui/CircleSmall'

const useStyles = makeStyles((theme) => ({
  // [HACK] - This transition is required to prevent the animation from flickering back on after animation. Not sure why it's flickering at all. This doesn't stop the flicker, merely makes the image transparent so that it is not seen.
  // whammy: ({done}: {done: boolean}) => ({
  //   transition: 'opacity 800ms ease',
  //   opacity: done ? 0 : 1
  // }),
  imageLink: {
    cursor: 'pointer'
  },
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
        <NarrowContainer>
          <PageTitle title="Mulch Mayhem" />
          <Image
            src="3f897b20-0b70-11ec-93a7-070c59f98950-MulchMayhemWebsiteBanner2.jpg"
            alt="Mulch Mayhem Flier"
            layout="responsive"
            loader={imgixLoader}
            width={2396}
            height={1075}
            className={classes.imageLink}
          />
          <Spacing />
          <Type variant="h2" color="primary" gutterBottom>
            <em>
              Free Mulch available for Drive Thru Customers of hosting agencies
            </em>
          </Type>
          <Spacing />
          <Type>
            Join us for Mulch Mayhem{' '}
            <strong>Saturday, September 25th from 8:00 am - 12:00 pm</strong> at
            Sierra College Overflow Lot, located at the corner of Rocklin Road
            and El Don Drive.
          </Type>
          <List>
            <ListItem>
              <ListItemBullet>
                <BulletIcon fontSize="large" />
              </ListItemBullet>
              <ListItemText
                primary="A Drive Thru Only for Trucks and Trailers. (Bring your own tarp
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
            Mulch is like icing on a cake, because it keeps the soil moist the
            way icing keeps a cake moist. Mulch slows evaporation allowing water
            to sink into the soil, moderates soil temperature and breaks down
            into nutrients for plants. Be sure to add three to four inches or
            organic mulch (e.g. leaves, wood chips) around trees and plants for
            the greatest benefit.
          </Type>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}
