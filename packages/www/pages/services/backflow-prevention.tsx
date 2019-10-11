import React from 'react'
import {
  Box,
  Divider,
  Link,
  List,
  ListItem,
  ListItemText,
  Theme,
  Typography as Type,
  useMediaQuery
} from '@material-ui/core'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import WaterSurfaceImg from '@components/WaterSurfaceImg/WaterSurfaceImg'
import PageTitle from '@components/PageTitle/PageTitle'
import {makeStyles, createStyles, useTheme} from '@material-ui/styles'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import {RespRowBox, ChildBox} from '@components/boxes/FlexBox'
import BsiOnlineWebsite from '@components/links/BsiOnlineWebsite'
import BsiOnlinePhone from '@components/links/BsiOnlinePhone'
import CustomerServicesEmail from '@components/links/CustomerServicesEmail'
import EightHundredPhone from '@components/links/EightHundredPhone'
import MainPhone from '@components/links/MainPhone'

const useStyles = makeStyles(() =>
  createStyles({
    listItem: {
      paddingTop: 0,
      paddingBottom: 4 // Defaults to 8px
    }
  })
)

const CrossControlPreventionPage = () => {
  const theme = useTheme<Theme>()
  const isXsDown = useMediaQuery(theme.breakpoints.down('xs'))
  const classes = useStyles()

  const CompactListItem = (props: any) => (
    <ListItem classes={{root: classes.listItem}} {...props} />
  )

  return (
    <PageLayout title="Cross-Connection Control Program">
      <WaterSurfaceImg />
      <MainBox>
        <NarrowContainer>
          <PageTitle
            title="Cross-Connection Control Program"
            subtitle="Services"
          />
          <RespRowBox flexSpacing={4}>
            <ChildBox flex="1 1 60%">
              <article>
                <Type variant="h4" gutterBottom>
                  About Cross-Connection Control Prevention
                </Type>
                <Type paragraph>
                  PCWA works diligently to deliver safe and reliable drinking
                  water to its customers. This effort begins with protecting our
                  water supply sources and continues through the entire
                  conveyance, treatment and distribution process until the water
                  reaches the meter. The prevention of backflow into the public
                  water supply is an integral part of ensuring safe drinking
                  water.
                </Type>
                <Type variant="h4" gutterBottom>
                  Why We Administer A Cross-Connection Control Program
                </Type>
                <Type paragraph={!isXsDown}>
                  In accordance with the requirements of the California
                  Administrative code, Title 17, Chapter V, Sections 7583-7605,
                  PCWA requires backflow protection on any treated water service
                  with the potential for contamination of the public water
                  supply.
                </Type>
              </article>
            </ChildBox>
            <ChildBox
              flex="auto"
              m={{xs: 'auto', sm: 0}} // Center image in small layouts.
              ml={{xs: 'auto', sm: 4}} // xs: auto will center image in small layouts.
              maxWidth={{xs: '60vw', sm: 'inherit'}} // Don't let portrait image get too big in small layouts.
            >
              <LazyImgix
                src="https:////cosmicjs.imgix.net/83b0e520-6b30-11e7-b8ae-eb2280fc8c40-backflow-prevention-aside.jpg"
                htmlAttributes={{
                  alt: 'Backflow Prevention Maintenance Photo',
                  style: {width: '100%'}
                }}
              />
            </ChildBox>
          </RespRowBox>
          <Box mt={6}>
            <Type variant="h4" gutterBottom>
              Treated Water Connections Requiring Backflow Prevention Devices
            </Type>
            <List>
              <CompactListItem>
                <ListItemText primary="&#8226; Residential connections with a secondary source of non-potable water such as wells, ponds, springs, untreated irrigation water, and other waterways." />
              </CompactListItem>
              <CompactListItem>
                <ListItemText primary="&#8226; All commercial connections." />
              </CompactListItem>
              <CompactListItem>
                <ListItemText primary="&#8226; All landscape connections." />
              </CompactListItem>
              <CompactListItem>
                <ListItemText primary="&#8226; All fire-line connections." />
              </CompactListItem>
              <CompactListItem>
                <ListItemText primary="&#8226; Any other conditions as determined by PCWA." />
              </CompactListItem>
            </List>
          </Box>
          <Box mb={3} mt={3}>
            <Divider />
          </Box>
          <Box mt={6}>
            <Type variant="h4" gutterBottom>
              Compliance Requirements - How to Remain Compliant
            </Type>
            <Type paragraph>
              After the initial installation inspection and backflow prevention
              device testing by PCWA staff, customer must:
            </Type>
            <List>
              <CompactListItem>
                <ListItemText primary="&#8226; Maintain the privately-owned backflow prevention device." />
              </CompactListItem>
              <CompactListItem>
                <ListItemText
                  primary={
                    <span>
                      &#8226; Supply tester with Customer Confirmation Number
                      (CCN) from annual notification and confirm test has been
                      submitted electronically to BSI online portal at{' '}
                      <BsiOnlineWebsite />.
                    </span>
                  }
                />
              </CompactListItem>
            </List>

            <Type paragraph>
              For questions regarding your required backflow device testing
              contact BSI Online at <BsiOnlinePhone /> or <BsiOnlineWebsite />.
            </Type>
            <Type paragraph>
              For more information regarding the Cross-Connection Control
              Program contact PCWA Customer Services at <MainPhone />,{' '}
              <EightHundredPhone /> or email <CustomerServicesEmail />.
            </Type>
          </Box>
          <Box mb={6} mt={6}>
            <Divider />
          </Box>
          <Box mt={6}>
            <Type variant="h4" gutterBottom>
              Resource Links
            </Type>
            <List>
              <CompactListItem>
                <ListItemText
                  primary={
                    <Link
                      href="https://www.waterboards.ca.gov/drinking_water/certlic/drinkingwater/documents/lawbook/dwregulations-2016-09-23.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      California Health and Safety Code Title 17 Code of
                      Regulation
                    </Link>
                  }
                />
              </CompactListItem>
              <CompactListItem>
                <ListItemText
                  primary={
                    <Link
                      href="https://cosmicjs.com/uploads/c916db10-6b30-11e7-b8ae-eb2280fc8c40-Cross-Connection_Brochure.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      PCWA Cross-Connection Control Program Brochure
                    </Link>
                  }
                />
              </CompactListItem>
              <CompactListItem>
                <ListItemText
                  primary={
                    <Link
                      href="http://www.emd.saccounty.net/EC/Documents/PUBLICTESTERLIST.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Tester List for Western Placer County - County of
                      Sacramento, Environmental Management Department
                    </Link>
                  }
                />
              </CompactListItem>
              <CompactListItem>
                <ListItemText
                  primary={
                    <Link
                      href="https://cosmicjs.com/uploads/f0b37df0-68af-11e7-93e2-c90edc3b7006-PCWA_Improvement_Standards.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      PCWA's Improvement Standards, Standard Specifications, and
                      Standard Drawings
                    </Link>
                  }
                />
              </CompactListItem>
              <CompactListItem>
                <ListItemText
                  primary={
                    <Link
                      href="https://cosmicjs.com/uploads/b8b01840-6b30-11e7-a2a2-c992b2b93cb7-Program_Changes_BSI_Transition_Blank.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Customer/Tester letter, Cross-Connection Control Program
                      Changes (BSI)
                    </Link>
                  }
                />
              </CompactListItem>
            </List>
          </Box>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default CrossControlPreventionPage
