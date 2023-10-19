// cspell:ignore firewise ondemand
import React, {useCallback, useMemo} from 'react'
import {
  ListItemText,
  Box,
  Typography as Type,
  List,
  ListItem,
  ListSubheader,
  Button,
  ListItemIcon,
  ListItemIconProps,
  Paper
} from '@mui/material'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import Spacing from '@components/boxes/Spacing'
import WideContainer from '@components/containers/WideContainer'
import Image from 'next/legacy/image'
import imgixLoader from '@lib/imageLoader'
import BulletIcon from 'mdi-material-ui/CircleSmall'
import useTheme from '@hooks/useTheme'

const StateOfOurWaterWebinarPage = () => {
  const theme = useTheme()
  const style = useMemo(
    () => ({
      listItem: {
        paddingBottom: 0
      },
      listItemBullet: {
        minWidth: theme.spacing(5)
      }
    }),
    [theme]
  )

  const ListItemBullet = useCallback(
    ({children, ...rest}: ListItemIconProps) => {
      return (
        <ListItemIcon sx={{...style.listItemBullet}} {...rest}>
          <BulletIcon fontSize="large" />
        </ListItemIcon>
      )
    },
    [style]
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
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.youtube.com/watch?v=p4gmgAPqAK0&feature=youtu.be"
              aria-label="Link to State of our Water Webinar recording on YouTube.com"
            >
              <Image
                src="49389270-bf3c-11ec-bf80-e74645a81647-PCWAWaterSuppliesWebinarGraphicRecording.jpg"
                alt="State of our Water Webinar flier"
                layout="responsive"
                loader={imgixLoader}
                width={2254}
                height={1270}
              />
            </a>
            <Spacing size="x-large" />
            {/* <Type gutterBottom variant="h3">
              <em>Join us for PCWA Presents…</em>
            </Type> */}
            <Type gutterBottom variant="h3">
              <em>Watch the recording: PCWA Presents...</em>
            </Type>
            <Type variant="h1">Lunch & Learn: State of our Water Supplies</Type>
            <Spacing size="x-small" />
            {/* <Type variant="h3">
              <em>Wednesday, April 13, 2022, 12-12:45 p.m.</em>
            </Type> */}
            <Type variant="h4">Recorded April 13th, 2022</Type>
            <Spacing />
            {/* <Type variant="h4" paragraph>
              A free webinar and live audience Q&A exploring the state of PCWA's
              water supplies for 2022 amid an emerging third year of severe
              drought in California.
            </Type> */}
            <Type variant="h4" paragraph>
              This live webinar and audience Q&A explores the state of PCWA's
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
                  {/* <ListSubheader sx={{fontSize: '1rem'}}>
                    Discussion topics will explore:
                  </ListSubheader> */}
                  <ListSubheader sx={{fontSize: '1rem'}}>
                    Discussion topics explore:
                  </ListSubheader>
                  <ListItem sx={{...style.listItem}}>
                    <ListItemBullet />
                    <ListItemText primary="Results of PCWA's April 1 snow survey—the most critical of the year" />
                  </ListItem>
                  <ListItem sx={{...style.listItem}}>
                    <ListItemBullet />
                    <ListItemText primary="The “winter whiplash” of 2021-22—how rain and snow moved from historic wets to record-breaking dries" />
                  </ListItem>
                  <ListItem sx={{...style.listItem}}>
                    <ListItemBullet />
                    <ListItemText primary="Unique insights into historical trends in Placer County snowpack and how PCWA is preparing for climate change" />
                  </ListItem>
                  <ListItem sx={{...style.listItem}}>
                    <ListItemBullet />
                    <ListItemText primary="What customers can expect in terms of requested or required water use reductions in 2022" />
                  </ListItem>
                  <ListItem sx={{...style.listItem}}>
                    <ListItemBullet />
                    <ListItemText primary="Rebates and services available from PCWA to help customers save water" />
                  </ListItem>
                </List>
              </Box>
            </Paper>
            <Spacing size="large" />
            {/* <Button
              variant="contained"
              color="secondary"
              href="https://us02web.zoom.us/webinar/register/WN_ertmYFRfQoWnSvwAgYTPhQ"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Register for Webinar button link, opens in new tab"
            >
              Register here
            </Button> */}
            <Button
              variant="contained"
              color="secondary"
              href="https://www.youtube.com/watch?v=p4gmgAPqAK0&feature=youtu.be"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Watch recording of Webinar button link, opens in new tab"
            >
              Watch the Recording
            </Button>
          </Box>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export default StateOfOurWaterWebinarPage
