// cspell:ignore firewise ondemand
import React from 'react'
import {Box, Typography as Type, Button} from '@material-ui/core'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import Spacing from '@components/boxes/Spacing'
import WideContainer from '@components/containers/WideContainer'
import Image from 'next/image'
import imgixLoader from '@lib/imageLoader'

const MountainToTapWebinarPage = () => {
  return (
    <PageLayout title="From the Mountain Tops to Your Tap Webinar" waterSurface>
      <MainBox>
        <WideContainer>
          <Box>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://us02web.zoom.us/webinar/register/WN_ueX1wXRBTZipKjyQ69nJCQ"
              aria-label="Link to From the Mountain Tops to Your Tap Webinar registration"
            >
              <Image
                src="b9ad3b20-1a7f-11ed-a845-076c64d3ede5-PCWAMtnTapWebinarGraphicPost.jpg"
                alt="From the Mountain Tops to Your Tap Webinar flier"
                layout="responsive"
                loader={imgixLoader}
                width={2254}
                height={1270}
              />
            </a>
            <Spacing size="x-large" />
            <Type gutterBottom variant="h3">
              <em>Join us for PCWA Presents…</em>
            </Type>
            {/* <Type gutterBottom variant="h2">
              <em>Watch the recording: PCWA Presents…</em>
            </Type> */}
            <Type variant="h1">
              Lunch & Learn: From the Mountain Tops to Your Tap
            </Type>
            <Spacing size="x-small" />
            <Type variant="h4">
              Wednesday, August 10th, 2022, 12-12:45 p.m.
            </Type>
            {/* <Type variant="h3">
              <em>Recorded April 13, 2022</em>
            </Type> */}
            <Spacing />
            {/* <Type variant="h4" paragraph>
              A free webinar and live audience Q&A exploring the state of PCWA's
              water supplies for 2022 amid an emerging third year of severe
              drought in California.
            </Type> */}
            <Type variant="body1" paragraph>
              Join the water quality experts from PCWA for a conversation about
              the quality of your drinking water during our next Lunch & Learn
              webinar on Wednesday, August 10th at noon.
            </Type>
            <Type variant="body1" paragraph>
              We'll explore where your water comes from, how it's treated and
              its path to your tap. The live conversation will include time for
              audience questions.
            </Type>

            {/* <Paper>
              <Box pb={2}>
                <List>
                  <ListSubheader style={{fontSize: '1rem'}}>
                    Discussion topics explore:
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
            </Paper> */}
            <Spacing size="large" />
            <Button
              variant="contained"
              color="secondary"
              href="https://us02web.zoom.us/webinar/register/WN_ueX1wXRBTZipKjyQ69nJCQ"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Register for Webinar button link, opens in new tab"
            >
              Register here
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

export default MountainToTapWebinarPage
