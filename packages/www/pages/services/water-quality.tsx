// cspell:ignore Bianchi subheader
import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import WaterSurfaceImg from '@components/WaterSurfaceImg/WaterSurfaceImg'
import PageTitle from '@components/PageTitle/PageTitle'
import {
  Box,
  Divider,
  Link,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Theme,
  Typography as Type,
  useMediaQuery
} from '@material-ui/core'
import {useTheme} from '@material-ui/styles'
import {
  RespRowBox,
  RowBox,
  ColumnBox,
  RespChildBox
} from '@components/boxes/FlexBox'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import {blueGrey} from '@material-ui/core/colors'
// import QuoteCloseIcon from '@material-ui/icons/FormatQuote'
import QuoteOpenIcon from 'mdi-material-ui/FormatQuoteOpen'
import QuoteCloseIcon from 'mdi-material-ui/FormatQuoteClose'
import FancyButton from '@components/FancyButton/FancyButton'
import MediaDialogOnClick from '@components/MediaDialogOnClick/MediaDialogOnClick'

const tsaImageUrl =
  'https://cosmic-s3.imgix.net/2c559c90-c5c8-11e9-aaff-5105a05bb7d4-treated-services-areas.jpg'
const tsaImageAlt = 'Map of Treated Water Services Areas'

const WaterQualityPage = () => {
  const theme = useTheme<Theme>()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))

  const ListItemLink = (props: any) => {
    return (
      <ListItem
        button
        component="a"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    )
  }

  return (
    <PageLayout title="Water Quality">
      <WaterSurfaceImg />
      <MainBox>
        <NarrowContainer>
          <PageTitle title="Water Quality" subtitle="Services" />
          <Type paragraph>
            PCWA is proud to supply safe, reliable and healthy water that meets
            or exceeds State and Federal public health standards for drinking
            water. Annually, PCWA publishes a water quality report titled
            <em>"Consumer Confidence Report"</em> as required by the State
            Department of Public Health to inform customers about the quality of
            their drinking water. This report is based on a culmination of water
            sample data collected throughout the year from selected sample
            sites.
          </Type>
          <Type paragraph>
            As required, PCWA samples and tests hundreds of compounds each year
            and the Consumer Confidence Report only reports those detected
            unless required otherwise.
          </Type>

          <Box mt={6}>
            <Type variant="h3" gutterBottom color="primary">
              Consumer Confidence Reports
            </Type>
            <Type paragraph>
              The PCWA Consumer Confidence Report is specific to a service area.
              For your reference, please click on the appropriate link to view
              the report for your service area:
            </Type>
            <RespRowBox>
              <RespChildBox first flex={{xs: 'auto', sm: '0 1 70%'}}>
                <MediaDialogOnClick
                  mediaUrl={tsaImageUrl}
                  mediaExt="jpg"
                  mediaName={tsaImageAlt}
                >
                  <ColumnBox alignItems="center">
                    <LazyImgix
                      src={tsaImageUrl}
                      imgixParams={{border: '1,AAAAAA'}}
                      htmlAttributes={{
                        alt: tsaImageAlt,
                        style: {
                          width: '100%',
                          cursor: !isXs ? 'pointer' : 'default'
                        }
                      }}
                    />
                    <Box mt={1}>
                      <Type variant="caption" align="center">
                        Treated Water Services Areas
                      </Type>
                    </Box>
                  </ColumnBox>
                </MediaDialogOnClick>
              </RespChildBox>
              <RespChildBox flexSpacing={4} flex="auto">
                <Box
                  bgcolor={theme.palette.common.white}
                  border={1}
                  borderColor={theme.palette.grey[200]}
                  borderRadius={2}
                >
                  <List
                    aria-label="PCWA Consumer Confidence Report links"
                    subheader={
                      <ListSubheader component="div" id="nested-list-subheader">
                        View Reports (PDF)
                      </ListSubheader>
                    }
                  >
                    <ListItemLink href="https://s3-us-west-2.amazonaws.com/cosmicjs/0945bee0-50d6-11e9-8f45-5ddcaed67e68-Alta2019FINAL.pdf">
                      <ListItemText primary="Alta" />
                    </ListItemLink>
                    <Divider />
                    <ListItemLink href="https://s3-us-west-2.amazonaws.com/cosmicjs/0565eca0-50d6-11e9-8f45-5ddcaed67e68-Applegate2019FINAL.pdf">
                      <ListItemText primary="Applegate" />
                    </ListItemLink>
                    <Divider />
                    <ListItemLink href="https://s3-us-west-2.amazonaws.com/cosmicjs/05b62f80-50d6-11e9-9a20-bd22ccee1c2b-Auburn-Bowman2019FINAL.pdf">
                      <ListItemText primary="Auburn - Bowman" />
                    </ListItemLink>
                    <Divider />
                    <ListItemLink href="http://s3-us-west-2.amazonaws.com/cosmicjs/052c3f00-50d6-11e9-9a20-bd22ccee1c2b-Bianchi2019FINAL.pdf">
                      <ListItemText primary="Bianchi Estates" />
                    </ListItemLink>
                    <Divider />
                    <ListItemLink href="https://s3-us-west-2.amazonaws.com/cosmicjs/053566c0-50d6-11e9-8f45-5ddcaed67e68-Colfax2019FINAL.pdf">
                      <ListItemText primary="Colfax" />
                    </ListItemLink>
                    <Divider />
                    <ListItemLink href="https://s3-us-west-2.amazonaws.com/cosmicjs/1404e7c0-50d6-11e9-8476-15b71bc03089-Foothill-Sunset2019FINAL.pdf">
                      <ListItemText primary="Foothill - Sunset" />
                    </ListItemLink>
                    <Divider />
                    <ListItemLink href="https://s3-us-west-2.amazonaws.com/cosmicjs/0c508de0-50d6-11e9-8f45-5ddcaed67e68-MonteVista2019FINAL.pdf">
                      <ListItemText primary="Monte Vista" />
                    </ListItemLink>
                  </List>
                </Box>
              </RespChildBox>
            </RespRowBox>
          </Box>

          <Box mt={6} p={{xs: 2, sm: 4, md: 6}} bgcolor={blueGrey[50]}>
            <RowBox alignItems="center">
              <Box color={theme.palette.grey[400]}>
                <QuoteOpenIcon fontSize="large" />
              </Box>
              <Box ml={1} mr={1}>
                <Type variant="h5">Is there Fluoride in my water?</Type>
              </Box>
              <Box color={theme.palette.grey[400]}>
                <QuoteCloseIcon fontSize="large" />
              </Box>
            </RowBox>
            <Box mt={1}>
              <Type variant="body2">
                PCWA does not fluoridate its water. There is a very small
                portion of the City of Rocklin, which receives water from the
                City of Roseville during high demand in warm months only. In
                addition, our Bianchi system receives Roseville water at all
                times. Roseville is required to fluoridate its water. If you
                would like to know if you live in an area that receives
                fluoridated water from one of these areas, view the maps below:
              </Type>
            </Box>
            <RowBox mt={2} justifyContent="flex-end">
              <Box>
                <FancyButton
                  size="small"
                  aria-label="Open PDF of Fluoridated Water within Rocklin"
                  hoverText="View PDF"
                  variant="text"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://s3-us-west-2.amazonaws.com/cosmicjs/394eafc0-b5e0-11e8-8f62-f9335c363962-Rocklin_Area.pdf"
                >
                  Rocklin Residents Map
                </FancyButton>
              </Box>
              <Box ml={2}>
                <FancyButton
                  variant="text"
                  size="small"
                  aria-label="Open PDF of Fluoridated Water within Bianchi Estates"
                  hoverText="View PDF"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://s3-us-west-2.amazonaws.com/cosmicjs/202c8250-b5eb-11e8-906a-53ab98ffc135-2018_09_10_RosevilleFluorination_Bianchi_BS_v2.pdf"
                >
                  Bianchi Estates Map
                </FancyButton>
              </Box>
            </RowBox>
          </Box>

          <Box mt={6}>
            <article>
              <Type variant="h3" color="primary">
                Useful Tips
              </Type>
              <Type variant="h4" gutterBottom>
                Plumbing Freeze in Winter
              </Type>
              <Type paragraph>
                PCWA is reminding customers to take a few simple steps during
                winter to keep your water lines from freezing. Frozen pipes can
                cause damage to your property and cause a major inconvenience.
                They can also be expensive to repair. Most frozen lines occur on
                private property and are the responsibility of the homeowner.
                Tips on winterizing your home can be found at{' '}
                <Link
                  title="WikiHow"
                  href="https://www.wikihow.com/Winterize-a-Vacant-Home"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WikiHow
                </Link>
              </Type>
              <Type variant="h4" gutterBottom>
                Away Much?
              </Type>
              <Type paragraph>
                PCWA is aware that many homes in the Placer County area are
                vacation homes. If you are away from your home often or for
                extended periods of time for any reason, we’d like to remind you
                that it is a good idea to thoroughly flush all of your faucets
                upon return. Try to flush enough water to where you are sure
                you’re getting fresh water from the main.
              </Type>
            </article>
          </Box>

          <Box mt={6} mb={6}>
            <Divider />
          </Box>

          <Box>
            <Type variant="h3" color="primary">
              More Information On Water Quality
            </Type>
            <RowBox mt={2} justifyContent="flex-start">
              <Box>
                <FancyButton
                  aria-label="Open PDF of 2019 Public Health and Goals Report"
                  hoverText="View PDF"
                  variant="text"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://cdn.cosmicjs.com/43ab2160-87e5-11e9-b702-11cbd0e20193-2019PHGTransmittal.pdf"
                >
                  2019 Public Health and Goals Report
                </FancyButton>
              </Box>
              <Box ml={2}>
                <FancyButton
                  variant="text"
                  aria-label="Open PDF of FAQs on Water Quality"
                  hoverText="View PDF"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://s3-us-west-2.amazonaws.com/cosmicjs/d247e020-50d6-11e9-9e90-b1c67a0a9b8f-WaterQualityFAQs.pdf"
                >
                  FAQs on Water Quality
                </FancyButton>
              </Box>
            </RowBox>
          </Box>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default WaterQualityPage
