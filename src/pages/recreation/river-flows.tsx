import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {FlexBox, RowBox, ChildBox} from '@components/MuiSleazebox'
import {
  Typography as Type,
  Box,
  Link,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button
} from '@mui/material'

import Spacing from '@components/boxes/Spacing'
// import defaultPageGage from '@components/pi/defaultPageGage'
import Image from 'next/legacy/image'
import imgixLoader from '@lib/imageLoader'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

const cardImageHeight = 200

const ResponsiveImageTemplatePage = () => {
  const style = {
    card: {
      margin: 'auto',
      maxWidth: 345,
      backgroundColor: 'common.white'
    },
    media: {
      height: cardImageHeight,
      overflow: 'hidden'
    }
  }

  // const cardClickHandler = useCallback(() => {
  //   router.push(
  //     '/recreation/flows/gages/[pid]',
  //     `/recreation/flows/gages/${defaultPageGage}`
  //   )
  // }, [router])

  return (
    <PageLayout title="American River Flows" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle title="American River Flows" subtitle="Recreation" />
          <RowBox responsive flexSpacing={4}>
            <ChildBox flex="60%">
              <Type paragraph>
                PCWA currently coordinates with the California Department of
                Parks and Recreation and a designated commercial whitewater
                boating representative to schedule Middle Fork Project
                operations during the summer and early fall to accommodate
                whitewater recreation in the Middle Fork American River below
                Oxbow Powerhouse. Whitewater boating releases are scheduled on a
                voluntary basis such that they do not compromise power
                production, maintenance activities, or consumptive water
                deliveries.
              </Type>
              <Type paragraph>
                The Department of Water Resources website contains{' '}
                <Link
                  href="https://cdec.water.ca.gov/jspplot/jspPlotServlet.jsp?sensor_no=7712&end=&geom=&interval=&cookies="
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                >
                  Middle Fork American River Flows near Oxbow Powerhouse
                </Link>{' '}
                for the last 2 days.
              </Type>
            </ChildBox>
            <ChildBox flex="40%" display="flex">
              <Box
                mx="auto"
                width={{xs: '60vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
              >
                <Image
                  src="c5c38d30-6b37-11e7-860a-a98685e05496-river-flows.jpg"
                  alt="Woman observing the Middle Fork of the American River"
                  loader={imgixLoader}
                  layout="responsive"
                  sizes="(max-width: 600px) 60vw, 40vw"
                  width={200}
                  height={259}
                />
              </Box>
            </ChildBox>
          </RowBox>

          <Spacing size="x-large" />
          <FlexBox>
            <Card sx={{...style.card}}>
              {/* <CardActionArea onClick={cardClickHandler}> */}
              <CardActionArea
                href="https://www.middleforkfun.com/rivers-and-reservoirs"
                rel="noopener noreferrer"
                target="_blank"
              >
                <CardMedia component="div" sx={{...style.media}}>
                  <Image
                    loader={imgixLoader}
                    src="6635fa60-61c3-11e7-9d28-7b65c66a2644-French_Meadows_Inlet_04.jpg"
                    alt="A Photo of the Middle Fork American River near French Meadows Reservoir"
                    // height={cardImageHeight}
                    objectFit="cover"
                    layout="responsive"
                    sizes="(max-width: 600px) 70vw, 45vw"
                    width={1080}
                    height={723}
                  />
                </CardMedia>
                <CardContent>
                  <Type gutterBottom variant="h5" component="h2">
                    Recorded River & Reservoir Conditions
                  </Type>
                  <Type variant="body2" color="textSecondary" component="p">
                    Find recorded river flow and reservoir conditions along the
                    Middle Fork of the American River at{' '}
                    <Link
                      rel="noopener noreferrer"
                      target="_blank"
                      href="https://www.middleforkfun.com/rivers-and-reservoirs"
                      underline="hover"
                    >
                      MiddleForkFun.com
                    </Link>
                    . Recorded data is refreshed every hour. Keep in mind that
                    all of the recorded data collected via instrumentation does
                    not reflect actual river and reservoir conditions. All data
                    is subject to correction, change, and revision by PCWA.
                  </Type>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  // fullWidth
                  aria-label="Visit MiddleForkFun.com"
                  href="https://www.middleforkfun.com/rivers-and-reservoirs"
                  rel="noopener noreferrer"
                  target="_blank"
                  endIcon={<OpenInNewIcon />}
                  variant="text"
                >
                  <Type variant="inherit" style={{textTransform: 'none'}}>
                    Visit MiddleForkFun.com
                  </Type>
                </Button>
                {/* <NextLink
                  passHref
                  href="/recreation/flows/gages/[pid]"
                  as={`/recreation/flows/gages/${defaultPageGage}`}
                >
                  <Button size="small" color="primary">
                    See Recorded Flows
                  </Button>
                </NextLink> */}
              </CardActions>
            </Card>
          </FlexBox>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default ResponsiveImageTemplatePage
