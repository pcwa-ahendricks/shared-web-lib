// cspell:ignore firewise ondemand
import React from 'react'
import {Box, Typography as Type, Button} from '@mui/material'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import Spacing from '@components/boxes/Spacing'
import WideContainer from '@components/containers/WideContainer'
import Image from 'next/legacy/image'
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
              href="https://www.youtube.com/watch?v=M43ubkUswSY&feature=youtu.be"
              aria-label="Link to From the Mountain Tops to Your Tap Webinar recording on YouTube.com"
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
              <em>Watch the recording: PCWA Presents...</em>
            </Type>

            <Type variant="h1">
              Lunch & Learn: From the Mountain Tops to Your Tap
            </Type>
            <Spacing size="x-small" />
            <Type variant="h4">Recorded August 10th, 2022</Type>

            <Spacing />

            <Type variant="body1" paragraph>
              This live webinar and audience Q&A features water quality experts
              from PCWA. Watch as they discuss the quality of your drinking
              water, where your water comes from, how it's treated and its path
              to your tap.
            </Type>

            {/* <Paper>
              <Box pb={2}>
                <List>
                  <ListSubheader sx={{fontSize: '1rem'}}>
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
              href="https://www.youtube.com/watch?v=M43ubkUswSY&feature=youtu.be"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Watch recording of Webinar button link, opens in new tab"
            >
              Watch the Recording
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
