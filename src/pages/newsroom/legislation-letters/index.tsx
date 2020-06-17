import React, {useState} from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import Spacing from '@components/boxes/Spacing'
import NextButton from '@components/NextButton/NextButton'
import {
  Typography as Type,
  Paper,
  Box,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  makeStyles,
  createStyles,
  Theme,
  Link,
  Divider
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {RowBox, ChildBox} from '@components/boxes/FlexBox'
import StrongEmphasis from '@components/typography/StrongEmphasis/StrongEmphasis'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    panelDetails: {
      backgroundColor: theme.palette.common.white
    }
  })
)

export default function LegislationAndLettersPage() {
  const archivedLegislationByYear = [
    {
      year: 2016,
      issues: [
        {
          href:
            'https://cdn.cosmicjs.com/2901a8f0-e67b-11e7-bb4c-6f40540093ad-12-19-2016_Comments_on_Making_Conservation_a_California_Way_of_Life_Public_Review_Draft.pdf',
          title:
            '"Making Conservation a California Way of Life" - Comment Letter',
          captions: ['Dec. 19, 2016'],
          body:
            'State Water Resources Control Board, Department of Water Resources'
        },
        {
          href:
            'https://cdn.cosmicjs.com/0cf8fe60-e67b-11e7-a671-ab91e302e67a-3-17-2016_Emergency_Conservation_Regulations.pdf',
          title: 'Emergency Conservation Regulations - Reporting',
          captions: ['Mar. 17, 2016'],
          body: 'State Water Resources Control Board'
        },
        {
          href:
            'https://cdn.cosmicjs.com/e38cbee0-e67a-11e7-bb4c-6f40540093ad-1-27-2016_PCWA_comment_letter_on_Conservation_Extended_Emergency_Regulation.pdf',
          title: 'Extended Emergency Conservation Regulations – Comment Letter',
          captions: ['Jan. 27, 2016'],
          body: 'State Water Resources Control Board'
        }
      ]
    },
    {
      year: 2015,
      issues: [
        {
          href:
            'https://cdn.cosmicjs.com/c31807a0-e67a-11e7-9b23-bf7bb9136344-12-18-2015_Response_to_Water_Conservation_Warning_Letter.pdf',
          title:
            'Water Conservation Formal Enforcement Warning – Response Letter',
          captions: ['Dec. 18, 2015'],
          body: 'State Water Resources Control Board'
        },
        {
          href:
            'https://cdn.cosmicjs.com/68d222d0-e67a-11e7-9b23-bf7bb9136344-10-30-2015_PCWA_Comments_on_BDCP-California_WaterFix_RDEIR-SDEIS.pdf',
          title:
            'Bay Delta Conservation Plan/California WaterFix – Comment Letter',
          captions: [
            'Recirculated Draft Environmental Impact Report/Supplemental Draft Environmental Impact Statement',
            'Oct. 30, 2015'
          ],
          body: 'State of California'
        },
        {
          href:
            'https://cdn.cosmicjs.com/33ae77c0-e67a-11e7-b7f0-25517ee21796-10-6-2015_Comments_on_Upcoming_Hearing_Regarding_Senate_Bill_S_1894_and_House_Bill_HR_2898.pdf',
          title:
            'U.S. Senate Bill 1894 and House Bill 2898: Addresses four-year drought and protects against future dry year cycles – Comment Letter',
          captions: ['Oct. 6, 2015'],
          body: 'Energy and Natural Resources Committee'
        }
      ]
    },
    {
      year: 2014,
      issues: [
        {
          href:
            'https://cdn.cosmicjs.com/042d0f70-e67a-11e7-9b23-bf7bb9136344-7-28-2014_PCWA_BDCP_Comments.pdf',
          title:
            'Bay Delta Conservation Plan Draft Implementing Agreement and Draft Environmental Impact Report/Environmental Impact Statement – Comment Letter',
          captions: ['Jul. 28, 2014'],
          body:
            'National Marine Fisheries Service, U.S. Department of the Interior & California Natural Resources Agency'
        }
      ]
    }
  ]

  const [expanded, setExpanded] = useState<string | false>(false)
  const classes = useStyles()

  const handleChange = (panel: string) => (
    _event: React.ChangeEvent<Record<string, unknown>>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <PageLayout title="Legislation and Letters" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle title="Legislation and Letters" subtitle="Newsroom" />
          <Spacing />
          <Type variant="h2" color="primary" gutterBottom>
            Advocating for Your Water Investments
          </Type>
          <Type paragraph>
            PCWA actively tracks and weighs in on state and federal legislative
            and regulatory policies to protect our customer’s investments. PCWA
            also advances local and regional efforts in water supply planning,
            environmental protection and hydroelectric energy management.
          </Type>
          <Type paragraph>
            Here is a snapshot of the issues we are working on for the 2017-2018
            legislative calendar. They are important to you since they can
            affect your water use, water rates and water supply.
          </Type>
          <Spacing />
          <NextButton
            fullWidth
            href="/newsroom/legislation-letters/faq"
            // color="secondary"
            variant="contained"
          >
            See Our Water Conservation Legislation Faqs
          </NextButton>

          <Spacing size="large" factor={2} />
          <Paper>
            <Box p={3}>
              <Type variant="h3" gutterBottom color="primary">
                No current publications
              </Type>
              <Type variant="subtitle1">
                Check back here with us in the future for more current issues
                for 2020.
              </Type>
            </Box>
          </Paper>

          <Spacing size="large" factor={2} />
          <RowBox justifyContent="space-between" pb={1}>
            <ChildBox>
              <Type variant="h4" color="primary">
                Archived Issues
              </Type>
            </ChildBox>
            <ChildBox>
              <Type variant="caption" color="textSecondary">
                <em>(click dropdown for more information)</em>
              </Type>
            </ChildBox>
          </RowBox>
          <Box>
            <ExpansionPanel
              expanded={expanded === 'panel1'}
              onChange={handleChange('panel1')}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Type>2017 - 2019</Type>
                {/* <Type>I am an expansion panel</Type> */}
              </ExpansionPanelSummary>
              <ExpansionPanelDetails classes={{root: classes.panelDetails}}>
                <Box bgcolor="white" pt={2}>
                  <Type variant="h6">State Issues</Type>
                  <Spacing size="small">
                    <Divider />
                  </Spacing>
                  <Type variant="subtitle1" color="secondary" gutterBottom>
                    Water Tax
                  </Type>
                  <Spacing size="small" />
                  <Link
                    gutterBottom
                    variant="subtitle2"
                    target="_blank"
                    href="https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201720180SB623"
                    rel="noopener noreferrer"
                  >
                    Senate Bill 623
                  </Link>
                  <Type variant="body2" paragraph>
                    PCWA opposes a proposed water tax on all residential and
                    commercial customer water bills. Thanks to a majority of
                    water agencies also voicing opposition, Senate Bill 623 was
                    referred to the Assembly Rules Committee in 2017 as a
                    two-year bill. While PCWA supports the bill’s goal to fund
                    safe drinking water solutions in disadvantaged communities,
                    placing a tax on your water bill is not the proper funding
                    solution.
                  </Type>
                  <Link
                    variant="body2"
                    href="https://cdn.cosmicjs.com/ee9a3670-8912-11e7-85fa-19e32a3becc0-20170606_SB-623-Monning.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    PCWA Opposition Letter to Assembly Environmental Safety and
                    Toxic Materials Committee
                  </Link>
                  <Spacing size="x-small" />
                  <Type variant="body2">
                    <StrongEmphasis color="primary">Status:</StrongEmphasis>{' '}
                    <em>
                      Passed out of the Senate as a two-year bill. Pending
                      action in Assembly Rules Committee.
                    </em>
                  </Type>
                  <Spacing />
                  <Type variant="subtitle1" color="secondary" gutterBottom>
                    Urban Water Management Planning & Water Use Efficiency
                  </Type>
                  <Spacing size="small" />
                  <Link
                    gutterBottom
                    variant="subtitle2"
                    target="_blank"
                    href="https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201720180AB1668"
                    rel="noopener noreferrer"
                  >
                    Assembly Bill 1668
                  </Link>{' '}
                  <Type variant="subtitle2" color="primary" component="span">
                    and
                  </Type>{' '}
                  <Link
                    gutterBottom
                    variant="subtitle2"
                    target="_blank"
                    href="https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201720180SB606"
                    rel="noopener noreferrer"
                  >
                    Senate Bill 606
                  </Link>
                  <Type variant="body2" paragraph>
                    PCWA voiced opposition against new requirements for water
                    management planning and water use targets. Part of Governor
                    Jerry Brown’s "Make Conservation a California Way of Life"
                    framework, Assembly Bill 1668 and Senate Bill 606 would
                    allow the State Water Resources Control Board to enforce
                    water use standards for agencies across the state,
                    regardless of local conditions including water supply. As
                    proposed, there is the potential to cause negative impacts
                    on your water rates, community greenscapes and local
                    businesses.
                  </Type>
                  {/* <Spacing size="x-small" /> */}
                  <Type variant="body2">
                    <StrongEmphasis color="primary">Status:</StrongEmphasis>{' '}
                    <em>
                      Both bills have passed out of houses of origin. Senate
                      Bill 606 is on Assembly floor ready for a final vote.
                      Assembly Bill 1668 is pending action in the Senate Rules
                      Committee.
                    </em>
                  </Type>
                </Box>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={expanded === 'panel2'}
              onChange={handleChange('panel2')}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <Type>Users</Type>
                <Type>You are currently not an owner</Type>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Type>
                  Donec placerat, lectus sed mattis semper, neque lectus feugiat
                  lectus, varius pulvinar diam eros in elit. Pellentesque
                  convallis laoreet laoreet.
                </Type>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Box>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}
