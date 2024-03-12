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
              // href="https://us02web.zoom.us/webinar/register/WN_WU82zUvrRDy_lxTRoHkTng"
              href="https://www.youtube.com/watch?v=46A1b6lUOZw&feature=youtu.be"
              // aria-label="Link to State of our Water Webinar registration"
              aria-label="Link to State of our Water Webinar recording on YouTube.com"
            >
              <Image
                // src="bf071a60-ce51-11ed-94ed-95257c20dd73-PCWAWaterSuppliesWebinarGraphicPost5.jpg"
                src="aba338f0-e080-11ed-844d-e9c32ac4a1e9-PCWAWaterSuppliesWebinarGraphicPostRecordingPosted.jpg"
                // alt="State of our Water Webinar flier"
                alt="State of our Water Webinar recording"
                layout="responsive"
                loader={imgixLoader}
                // width={5333}
                width={1280}
                // height={3000}
                height={720}
              />
            </a>
            <Spacing size="x-large" />
            {/* <Type gutterBottom variant="h3">
              <em>Join us for our April Lunch & Learn Webinar</em>
            </Type> */}
            <Type gutterBottom variant="h3">
              <em>Watch the recording: PCWA Presents...</em>
            </Type>
            <Spacing size="small" />
            <Type variant="h1">State of PCWA's Water Supplies 2023</Type>
            <Spacing size="x-small" />
            {/* <Type variant="h3">
              <em>Thursday, April 20, 2023, 12-12:45 p.m.</em>
            </Type> */}
            <Type variant="h4">Recorded April 20th, 2023</Type>
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
                  {/* <ListSubheader sx={{fontSize: '1rem'}}>
                    Discussion topics explore:
                  </ListSubheader> */}
                  <ListSubheader sx={{fontSize: '1rem'}}>
                    Discussion topics explored:
                  </ListSubheader>
                  <ListItem sx={{...style.listItem}}>
                    <ListItemBullet />
                    <ListItemText primary="The crucial question, “Are we really out of the drought?" />
                  </ListItem>
                  <ListItem sx={{...style.listItem}}>
                    <ListItemBullet />
                    <ListItemText primary="How PCWA measures water supply utilizing the latest technology" />
                  </ListItem>
                  <ListItem sx={{...style.listItem}}>
                    <ListItemBullet />
                    <ListItemText primary="Results of PCWA's April 1 snow survey" />
                  </ListItem>
                  <ListItem sx={{...style.listItem}}>
                    <ListItemBullet />
                    <ListItemText primary="Melt rates and the projected impacts of climate change" />
                  </ListItem>
                  <ListItem sx={{...style.listItem}}>
                    <ListItemBullet />
                    <ListItemText primary="Rebates and services available from PCWA to help customers use water wisely" />
                  </ListItem>
                </List>
              </Box>
            </Paper>
            <Spacing size="large" />
            {/* <Button
              variant="contained"
              color="secondary"
              href="https://us02web.zoom.us/webinar/register/WN_WU82zUvrRDy_lxTRoHkTng"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Register for Webinar button link, opens in new tab"
            >
              Learn More & Register here
            </Button> */}
            <Button
              variant="contained"
              color="secondary"
              href="https://www.youtube.com/watch?v=46A1b6lUOZw&feature=youtu.be"
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
