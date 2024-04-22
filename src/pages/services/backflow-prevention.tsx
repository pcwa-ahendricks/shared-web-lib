import React from 'react'
import {
  Box,
  Divider,
  Link,
  List,
  ListItem,
  ListItemText,
  useTheme,
  Typography as Type,
  useMediaQuery,
  ListItemProps
} from '@mui/material'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {RowBox, ChildBox} from '@components/MuiSleazebox'
import BsiOnlineWebsite from '@components/links/BsiOnlineWebsite'
import BsiOnlinePhone from '@components/links/BsiOnlinePhone'
import BackflowEmail from '@components/links/BackflowEmail'
import EightHundredPhone from '@components/links/EightHundredPhone'
import MainPhone from '@components/links/MainPhone'
import Spacing from '@components/boxes/Spacing'
import Image from 'next/legacy/image'
import imgixLoader from '@lib/imageLoader'
import {Theme} from '@lib/material-theme'
import BackflowPhone from '@components/links/BackflowPhone'

const CrossControlPreventionPage = () => {
  const theme = useTheme<Theme>()
  const style = {
    listItem: {
      paddingTop: 0,
      paddingBottom: '4px' // Defaults to 8px
    }
  }
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))

  const CompactListItem = ({sx, ...props}: ListItemProps) => (
    <ListItem sx={{...sx, ...style.listItem}} {...props} />
  )

  return (
    <PageLayout title="Cross-Connection Control Program" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle
            title="Cross-Connection Control Program"
            subtitle="Services"
          />
          <RowBox responsive flexSpacing={6}>
            <ChildBox flex="60%">
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
                <Type paragraph={!isXs}>
                  In accordance with the requirements of the California
                  Administrative code, Title 17, Chapter V, Sections 7583-7605,
                  PCWA requires backflow protection on any treated water service
                  with the potential for contamination of the public water
                  supply.
                </Type>
              </article>
            </ChildBox>
            <ChildBox
              flex="40%"
              mx="auto"
              width={{xs: '60vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
            >
              <Image
                src="83b0e520-6b30-11e7-b8ae-eb2280fc8c40-backflow-prevention-aside.jpg"
                alt="Backflow Prevention Maintenance Photo"
                loader={imgixLoader}
                layout="responsive"
                sizes="(max-width: 600px) 60vw, 40vw"
                width={1080}
                height={1480}
              />
            </ChildBox>
          </RowBox>
          <Spacing />
          <Box>
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
          <Spacing size="large">
            <Divider />
          </Spacing>
          <Box>
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
              contact BSI Online at <BsiOnlinePhone />, or via email at{' '}
              <Link href="mailto:support@backflow.com">
                support@backflow.com
              </Link>
              . For more information visit <BsiOnlineWebsite />.
            </Type>
            <Type paragraph>
              For more information regarding the Cross-Connection Control
              Program contact PCWA Customer Services at <BackflowPhone /> or
              email <BackflowEmail />.
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
                      href="https://pcwa.sfo3.cdn.digitaloceanspaces.com/pcwa-net/customer-service/Backflow%20Policy%20-%20JAN%202017-1.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="hover"
                    >
                      PCWA's Backflow Testing Policy
                    </Link>
                  }
                />
              </CompactListItem>
              <CompactListItem>
                <ListItemText
                  primary={
                    <Link
                      href="https://www.waterboards.ca.gov/drinking_water/certlic/drinkingwater/documents/lawbook/dwregulations-2017-04-10.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="hover"
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
                      href="https://cdn.cosmicjs.com/c916db10-6b30-11e7-b8ae-eb2280fc8c40-Cross-Connection_Brochure.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="hover"
                    >
                      PCWA Cross-Connection Control Program Brochure
                    </Link>
                  }
                />
              </CompactListItem>
              {/* <CompactListItem>
                <ListItemText
                  primary={
                    <Link
                      href="https://emd.saccounty.net/EC/Documents/BACKFLOW%20PREVENTION%20PUBLIC%20TESTER%20LIST.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="hover"
                    >
                      Tester List for Western Placer County - County of
                      Sacramento, Environmental Management Department
                    </Link>
                  }
                />
              </CompactListItem> */}
              <CompactListItem>
                <ListItemText
                  primary={
                    <Link
                      href="https://pcwa.sfo3.cdn.digitaloceanspaces.com/pcwa-net/customer-service/Backflow%20Testing%20Companies.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="hover"
                    >
                      Backflow Testing Companies
                    </Link>
                  }
                />
              </CompactListItem>
              <CompactListItem>
                <ListItemText
                  primary={
                    <Link
                      href="https://cdn.cosmicjs.com/f0b37df0-68af-11e7-93e2-c90edc3b7006-PCWA_Improvement_Standards.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="hover"
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
                      href="https://cdn.cosmicjs.com/b8b01840-6b30-11e7-a2a2-c992b2b93cb7-Program_Changes_BSI_Transition_Blank.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="hover"
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
