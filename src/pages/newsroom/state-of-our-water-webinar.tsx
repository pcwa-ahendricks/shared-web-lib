// cspell:ignore firewise ondemand
import React, {useCallback} from 'react'
import {
  ListItemText,
  Box,
  Typography as Type,
  List,
  ListItem,
  makeStyles,
  ListSubheader,
  Button,
  ListItemIcon,
  ListItemIconProps,
  Paper
} from '@material-ui/core'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import Spacing from '@components/boxes/Spacing'
import WideContainer from '@components/containers/WideContainer'
import Image from 'next/image'
import imgixLoader from '@lib/imageLoader'
import BulletIcon from 'mdi-material-ui/CircleSmall'

const useStyles = makeStyles((theme) => ({
  listItem: {
    // paddingTop: 4
    paddingBottom: 0
  },
  listItemBullet: {
    minWidth: theme.spacing(5)
  }
}))

const StateOfOurWaterWebinarPage = () => {
  const classes = useStyles()

  const ListItemBullet = useCallback(
    ({children, ...rest}: ListItemIconProps) => {
      return (
        <ListItemIcon classes={{root: classes.listItemBullet}} {...rest}>
          <BulletIcon fontSize="large" />
        </ListItemIcon>
      )
    },
    [classes]
  )
  return (
    <PageLayout title="State of Our Water Supplies Webinar" waterSurface>
      <MainBox>
        <WideContainer>
          {/* <PageTitle
            title="State of Our Water Supplies Webinar"
            subtitle="Newsroom"
          /> */}
          <Box>
            <Image
              src="968e55a0-aeca-11ec-abde-779eab3b09ef-PCWAWaterSuppliesWebinarGraphic3.jpg"
              alt="Fire-wise, water-wise landscaping webinar flier"
              layout="responsive"
              loader={imgixLoader}
              width={2254}
              height={1270}
            />
            <Spacing size="x-large" />
            <Type gutterBottom variant="h2">
              <em>Join us for PCWA Presents…</em>
            </Type>
            <Type variant="h1">Lunch & Learn: State of our Water Supplies</Type>
            <Type variant="h3">
              <em>Wednesday, April 13, 2022, 12-12:45 p.m.</em>
            </Type>
            <Spacing />
            <Type variant="h4" paragraph>
              A free webinar and live audience Q&A exploring the state of PCWA's
              water supplies for 2022 amid an emerging third year of severe
              drought in California.
            </Type>
            <Type variant="body1" paragraph>
              Moderated by Barry Stigers, News Director and Morning News Host
              for KAHI 104.5 FM and 950 AM Radio, and featuring PCWA Energy
              Marketing Manager and staff meteorologist Shane Motley and PCWA
              Deputy Director of Customer Services Linda Higgins.
            </Type>
            <Paper>
              <Box pb={2}>
                <List>
                  <ListSubheader style={{fontSize: '1rem'}}>
                    Discussion topics will explore:
                  </ListSubheader>
                  <ListItem classes={{root: classes.listItem}}>
                    <ListItemBullet />
                    <ListItemText primary="Results of PCWA's April 1 snow survey—the most critical of the year" />
                  </ListItem>
                  <ListItem classes={{root: classes.listItem}}>
                    <ListItemBullet />
                    <ListItemText primary="The “winter whiplash” of 2021-22—how rain and snow moved from historic wets to record-breaking dries" />
                  </ListItem>
                  <ListItem classes={{root: classes.listItem}}>
                    <ListItemBullet />
                    <ListItemText primary="Unique insights into historical trends in Placer County snowpack and how PCWA is preparing for climate change" />
                  </ListItem>
                  <ListItem classes={{root: classes.listItem}}>
                    <ListItemBullet />
                    <ListItemText primary="What customers can expect in terms of requested or required water use reductions in 2022" />
                  </ListItem>
                  <ListItem classes={{root: classes.listItem}}>
                    <ListItemBullet />
                    <ListItemText primary="Rebates and services available from PCWA to help customers save water" />
                  </ListItem>
                </List>
              </Box>
            </Paper>
            <Spacing size="large" />
            <Button
              variant="contained"
              color="secondary"
              href="https://us02web.zoom.us/webinar/register/WN_ertmYFRfQoWnSvwAgYTPhQ"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Register for Webinar button link, opens in new tab"
            >
              Learn more and register here
            </Button>
          </Box>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export default StateOfOurWaterWebinarPage
