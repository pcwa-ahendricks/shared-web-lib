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
    <PageLayout
      title="State of Our Water Supplies Webinar - Spring '23"
      waterSurface
    >
      <MainBox>
        <WideContainer>
          {/* <PageTitle
            title="State of Our Water Supplies Webinar"
            subtitle="Newsroom"
          /> */}
          <Box>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://us02web.zoom.us/webinar/register/WN_WU82zUvrRDy_lxTRoHkTng"
              // aria-label="Link to State of our Water Webinar recording on YouTube.com"
              aria-label="Link to State of our Water Webinar registration"
            >
              <Image
                src="9dcf2750-cd9a-11ed-94ed-95257c20dd73-PCWAWaterSuppliesWebinarGraphicPost4.jpg"
                alt="State of our Water Webinar flier"
                layout="responsive"
                loader={imgixLoader}
                width={5333}
                height={3000}
              />
            </a>
            <Spacing size="x-large" />
            <Type gutterBottom variant="h3">
              <em>Join us for our April Lunch & Learn Webinar</em>
            </Type>
            <Spacing size="small" />
            {/* <Type gutterBottom variant="h3">
              <em>Watch the recording: PCWA Presents...</em>
            </Type> */}
            <Type variant="h1">State of PCWA's Water Supplies 2023</Type>
            <Spacing size="x-small" />
            <Type variant="h3">
              <em>Thursday, April 20, 2023, 12-12:45 p.m.</em>
            </Type>
            {/* <Type variant="h4">Recorded April 13th, 2023</Type> */}
            <Spacing />
            {/* <Type variant="h4" paragraph>
              A free webinar and live audience Q&A exploring the state of PCWA's
              water supplies for 2022 amid an emerging third year of severe
              drought in California.
            </Type> */}
            <Type variant="h4" paragraph>
              Moderated by Heather Waldman, KCRA 3 Meteorologist
            </Type>
            <Type variant="body1" paragraph>
              A free webinar and live audience Q&A exploring the state of PCWA's
              water supplies for 2023 amid the dramatic weather swings from
              drought to flood. The live discussion will feature PCWA Energy
              Marketing Manager and staff meteorologist Shane Motley and PCWA
              Deputy Director of Customer Services Linda Higgins.
            </Type>
            <Paper>
              <Box pb={2}>
                <List dense>
                  {/* <ListSubheader style={{fontSize: '1rem'}}>
                    Discussion topics will explore:
                  </ListSubheader> */}
                  <ListSubheader style={{fontSize: '1rem'}}>
                    Discussion topics explore:
                  </ListSubheader>
                  <ListItem classes={{root: classes.listItem}}>
                    <ListItemBullet />
                    <ListItemText primary="The crucial question, “Are we really out of the drought?" />
                  </ListItem>
                  <ListItem classes={{root: classes.listItem}}>
                    <ListItemBullet />
                    <ListItemText primary="How PCWA measures water supply utilizing the latest technology" />
                  </ListItem>
                  <ListItem classes={{root: classes.listItem}}>
                    <ListItemBullet />
                    <ListItemText primary="Results of PCWA's April 1 snow survey" />
                  </ListItem>
                  <ListItem classes={{root: classes.listItem}}>
                    <ListItemBullet />
                    <ListItemText primary="Melt rates and the projected impacts of climate change" />
                  </ListItem>
                  <ListItem classes={{root: classes.listItem}}>
                    <ListItemBullet />
                    <ListItemText primary="Rebates and services available from PCWA to help customers use water wisely" />
                  </ListItem>
                </List>
              </Box>
            </Paper>
            <Spacing size="large" />
            <Button
              variant="contained"
              color="secondary"
              href="https://us02web.zoom.us/webinar/register/WN_WU82zUvrRDy_lxTRoHkTng"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Register for Webinar button link, opens in new tab"
            >
              Learn More & Register here
            </Button>
            {/* <Button
              variant="contained"
              color="secondary"
              href="https://www.youtube.com/watch?v=p4gmgAPqAK0&feature=youtu.be"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Watch recording of Webinar button link, opens in new tab"
            >
              Watch the Recording
            </Button> */}
          </Box>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export default StateOfOurWaterWebinarPage
