import React, {useState, useCallback} from 'react'
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
  Divider,
  LinkProps,
  TypographyProps
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
  // const archivedLegislationByYear = [
  //   {
  //     year: 2016,
  //     issues: [
  //       {
  //         href:
  //           'https://cdn.cosmicjs.com/2901a8f0-e67b-11e7-bb4c-6f40540093ad-12-19-2016_Comments_on_Making_Conservation_a_California_Way_of_Life_Public_Review_Draft.pdf',
  //         title:
  //           '"Making Conservation a California Way of Life" - Comment Letter',
  //         captions: ['Dec. 19, 2016'],
  //         body:
  //           'State Water Resources Control Board, Department of Water Resources'
  //       },
  //       {
  //         href:
  //           'https://cdn.cosmicjs.com/0cf8fe60-e67b-11e7-a671-ab91e302e67a-3-17-2016_Emergency_Conservation_Regulations.pdf',
  //         title: 'Emergency Conservation Regulations - Reporting',
  //         captions: ['Mar. 17, 2016'],
  //         body: 'State Water Resources Control Board'
  //       },
  //       {
  //         href:
  //           'https://cdn.cosmicjs.com/e38cbee0-e67a-11e7-bb4c-6f40540093ad-1-27-2016_PCWA_comment_letter_on_Conservation_Extended_Emergency_Regulation.pdf',
  //         title: 'Extended Emergency Conservation Regulations – Comment Letter',
  //         captions: ['Jan. 27, 2016'],
  //         body: 'State Water Resources Control Board'
  //       }
  //     ]
  //   },
  //   {
  //     year: 2015,
  //     issues: [
  //       {
  //         href:
  //           'https://cdn.cosmicjs.com/c31807a0-e67a-11e7-9b23-bf7bb9136344-12-18-2015_Response_to_Water_Conservation_Warning_Letter.pdf',
  //         title:
  //           'Water Conservation Formal Enforcement Warning – Response Letter',
  //         captions: ['Dec. 18, 2015'],
  //         body: 'State Water Resources Control Board'
  //       },
  //       {
  //         href:
  //           'https://cdn.cosmicjs.com/68d222d0-e67a-11e7-9b23-bf7bb9136344-10-30-2015_PCWA_Comments_on_BDCP-California_WaterFix_RDEIR-SDEIS.pdf',
  //         title:
  //           'Bay Delta Conservation Plan/California WaterFix – Comment Letter',
  //         captions: [
  //           'Recirculated Draft Environmental Impact Report/Supplemental Draft Environmental Impact Statement',
  //           'Oct. 30, 2015'
  //         ],
  //         body: 'State of California'
  //       },
  //       {
  //         href:
  //           'https://cdn.cosmicjs.com/33ae77c0-e67a-11e7-b7f0-25517ee21796-10-6-2015_Comments_on_Upcoming_Hearing_Regarding_Senate_Bill_S_1894_and_House_Bill_HR_2898.pdf',
  //         title:
  //           'U.S. Senate Bill 1894 and House Bill 2898: Addresses four-year drought and protects against future dry year cycles – Comment Letter',
  //         captions: ['Oct. 6, 2015'],
  //         body: 'Energy and Natural Resources Committee'
  //       }
  //     ]
  //   },
  //   {
  //     year: 2014,
  //     issues: [
  //       {
  //         href:
  //           'https://cdn.cosmicjs.com/042d0f70-e67a-11e7-9b23-bf7bb9136344-7-28-2014_PCWA_BDCP_Comments.pdf',
  //         title:
  //           'Bay Delta Conservation Plan Draft Implementing Agreement and Draft Environmental Impact Report/Environmental Impact Statement – Comment Letter',
  //         captions: ['Jul. 28, 2014'],
  //         body:
  //           'National Marine Fisheries Service, U.S. Department of the Interior & California Natural Resources Agency'
  //       }
  //     ]
  //   }
  // ]

  const [expanded, setExpanded] = useState<string | false>('panel1')
  const classes = useStyles()

  const handleChange = (panel: string) => (
    _event: React.ChangeEvent<Record<string, unknown>>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false)
  }

  const IssueTitle = useCallback(
    ({children, ...props}: Partial<LinkProps>) => (
      <Link
        gutterBottom
        variant="subtitle2"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </Link>
    ),
    []
  )

  const CategoryTitle = useCallback(
    ({children, ...props}: Partial<TypographyProps>) => (
      <>
        <Type variant="subtitle1" color="secondary" {...props}>
          {children}
        </Type>
        <Spacing size="small" />
      </>
    ),
    []
  )

  const LocalityTitle = useCallback(
    ({children, ...props}: Partial<TypographyProps>) => (
      <>
        <Type variant="h6" {...props}>
          {children}
        </Type>
        <Spacing size="small">
          <Divider />
        </Spacing>
      </>
    ),
    []
  )

  const StatusCaption = useCallback(
    ({children, ...props}: Partial<TypographyProps>) => (
      <>
        <Type variant="body2" {...props}>
          <StrongEmphasis color="primary">Status:</StrongEmphasis>{' '}
          <em>{children}</em>
        </Type>
      </>
    ),
    []
  )

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
              </ExpansionPanelSummary>
              <ExpansionPanelDetails classes={{root: classes.panelDetails}}>
                <Box bgcolor="white" pt={2}>
                  <LocalityTitle>State Issues</LocalityTitle>
                  <CategoryTitle>Water Tax</CategoryTitle>
                  <IssueTitle href="https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201720180SB623">
                    Senate Bill 623
                  </IssueTitle>
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
                  <Type>
                    <Link
                      variant="body2"
                      href="https://cdn.cosmicjs.com/ee9a3670-8912-11e7-85fa-19e32a3becc0-20170606_SB-623-Monning.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      PCWA Opposition Letter to Assembly Environmental Safety
                      and Toxic Materials Committee
                    </Link>
                  </Type>
                  <Spacing size="x-small" />
                  <StatusCaption>
                    Passed out of the Senate as a two-year bill. Pending action
                    in Assembly Rules Committee.
                  </StatusCaption>
                  {/*  */}
                  <Spacing />
                  <CategoryTitle>
                    Urban Water Management Planning & Water Use Efficiency
                  </CategoryTitle>
                  {/*  */}
                  <IssueTitle href="https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201720180AB1668">
                    Assembly Bill 1668
                  </IssueTitle>{' '}
                  <Type variant="subtitle2" color="primary" component="span">
                    and
                  </Type>{' '}
                  <IssueTitle href="https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201720180SB606">
                    Senate Bill 606
                  </IssueTitle>
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
                  <StatusCaption>
                    Both bills have passed out of houses of origin. Senate Bill
                    606 is on Assembly floor ready for a final vote. Assembly
                    Bill 1668 is pending action in the Senate Rules Committee.
                  </StatusCaption>
                  {/*  */}
                  <Spacing />
                  <IssueTitle href="https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201720180AB1654">
                    Assembly Bill 1654
                  </IssueTitle>{' '}
                  <Type variant="subtitle2" color="primary" component="span">
                    and
                  </Type>{' '}
                  <IssueTitle href="https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201720180AB968">
                    968
                  </IssueTitle>
                  <Type variant="body2" paragraph>
                    PCWA supports Assembly Bills 1654 and 968, which provided an
                    alternative approach to water management planning and water
                    use targets. These bills promoted water use efficiency and a
                    robust drought response while ensuring local agencies
                    continue to control their water supplies. These bills
                    optimize PCWA’s ability to plan and prepare for future
                    droughts which benefits our long-term water use efficiency.
                  </Type>
                  <Type>
                    <Link
                      variant="body2"
                      href="https://cdn.cosmicjs.com/cfd9c500-e67f-11e7-a671-ab91e302e67a-4-10-2017_Support_of_Legislation.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      PCWA support letter to Assemblymember Blanca Rubio
                    </Link>
                  </Type>
                  <Spacing size="x-small" />
                  <StatusCaption>
                    Both bills held under submission in Assembly Appropriations
                    Committee.
                  </StatusCaption>
                  {/*  */}
                  <Spacing />
                  <IssueTitle href="https://cdn.cosmicjs.com/84d95150-e67b-11e7-bb4c-6f40540093ad-1-10-2017_Urban Water Conservation Workshop comment letter.pdf">
                    Urban Water Conservation Workshop – Comment Letter
                  </IssueTitle>{' '}
                  <Type variant="body2" paragraph>
                    PCWA commented on emergency drought regulations in February
                    2017, requesting for the expiration of such regulations.
                    Although regulators felt compelled to institute emergency
                    regulations for mandatory water conservation during the
                    height of the drought, PCWA has demonstrated the ability to
                    meet demands over multiple years whether conditions are wet
                    or dry.
                  </Type>
                  {/*  */}
                  <Spacing />
                  <CategoryTitle>California WaterFix</CategoryTitle>
                  {/*  */}
                  <Type variant="body2" paragraph>
                    PCWA opposes California’s WaterFix project as currently
                    proposed. WaterFix, commonly referred to as the "Twin
                    Tunnels," proposes to add additional points of diversion for
                    the State Water Project and Central Valley Project in the
                    north Delta, on the Sacramento River, and convey water
                    through two tunnels to destinations south of the Delta. By
                    adding points of diversion in the north Delta, the
                    California Department of Water Resources and the United
                    States Bureau of Reclamation will have the ability to move
                    more stored water from north-of-Delta reservoirs to central
                    and southern California, which could adversely affect water
                    supplies in the American River watershed, including lower
                    water levels in Folsom Reservoir.
                  </Type>
                  <Type>
                    <Link
                      variant="body2"
                      href="https://cdn.cosmicjs.com/8af1e9a0-e688-11e7-bf31-b7cc55a09d69-2016-08-31 Testimony of Einar Maisch on the Matter of CA DWR and USBR Request for a Change in Point of Diversion for CA WaterFix.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Testimony of Einar Maisch Before the State Water Resources
                      Control Board
                    </Link>
                  </Type>
                  <Type>
                    <Link
                      paragraph
                      variant="body2"
                      href="https://cdn.cosmicjs.com/65cc0660-e688-11e7-8d0b-c90b31884282-08-28-2017_PCWA_Files_Suit_Agaisnt_California_WaterFix.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      PCWA News Release: PCWA Files Suit Against California
                      WaterFix
                    </Link>
                  </Type>
                  <Spacing size="x-small" />
                  <StatusCaption>
                    The WaterFix project is currently obtaining regulatory
                    permits necessary to construct and operate the project. PCWA
                    is actively working with regional partners in all legal and
                    regulatory proceedings to defend the region’s interests.
                  </StatusCaption>
                  {/*  */}
                  <Spacing />
                  <CategoryTitle>Wild and Scenic Rivers</CategoryTitle>
                  {/*  */}
                  <IssueTitle href="https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201720180AB975">
                    Assembly Bill 975
                  </IssueTitle>
                  <Type variant="body2" paragraph>
                    PCWA opposes expansion of California’s Wild and Scenic
                    Rivers Act. As proposed, Assembly Bill 975 would increase
                    the scope of “wild and scenic” designations from immediately
                    adjacent to a river to one-quarter mile on either side of
                    the river. Such an expansion threatens to usurp local land
                    use planning authority, force private land owners to use
                    special treatment rules that do not exist under federal law,
                    and hinder fire-fighting efforts on state and federal land.
                  </Type>
                  <Type>
                    <Link
                      variant="body2"
                      href="https://cdn.cosmicjs.com/5a95ce70-e5e8-11e7-b28a-cd7c8fbfdd99-Oppose_letter_AB_975.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      PCWA opposition letter to Assemblyman Kevin Kiley
                    </Link>
                  </Type>
                  <Spacing size="x-small" />
                  <StatusCaption>
                    Ordered to the inactive file by author.
                  </StatusCaption>
                  {/*  */}
                  <Spacing size="large" />
                  {/*  */}
                  <LocalityTitle>Federal Issues</LocalityTitle>
                  <CategoryTitle>Wildfires and Watersheds</CategoryTitle>
                  {/*  */}
                  <IssueTitle href="https://www.congress.gov/bill/115th-congress/house-bill/2936/text">
                    H.R. 2936 - The Resilient Federal Forests Act of 2017
                  </IssueTitle>
                  <Type variant="body2" paragraph>
                    PCWA supports the Resilient Federal Forests Act of 2017 as a
                    member of a western water interest coalition effort in
                    support of active management and secure federal funding.
                    H.R. 2936 would implement proactive management standards for
                    forests and includes a solution to the current
                    fire-borrowing problem that impacts the ability of the
                    Forest Service to respond to wildfires and fund other
                    essential programs.
                  </Type>
                  <Type>
                    <Link
                      variant="body2"
                      href="https://cdn.cosmicjs.com/ce8ffec0-e441-11e7-817a-115aad0bd4bb-H.R.2936 Westerman 2.0 letter.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Water coalition support letter to House Committee on
                      Energy and Natural Resources
                    </Link>
                  </Type>
                  <Spacing size="x-small" />
                  <StatusCaption>
                    Introduced in the House on June 20, 2017. Passed the House
                    on November 1, 2017. Pending action in the Senate Committee
                    on Agriculture.
                  </StatusCaption>
                  {/*  */}
                  <Spacing />
                  <IssueTitle href="https://www.congress.gov/bill/115th-congress/senate-bill/2068?q=%7B%22search%22%3A%5B%22s+2068%22%5D%7D&r=1">
                    S. 2068 - Wildfire Prevention and Mitigation Act of 2017
                  </IssueTitle>
                  <Type variant="body2" paragraph>
                    PCWA supports the Wildfire Prevention and Mitigation Act of
                    2017 as a member of a western water interest coalition
                    effort in support of active management and secure federal
                    funding. S. 2068 directs the Department of Agriculture to
                    create a categorical exclusion for immediate action in
                    critical response situations due to disease and insect
                    infestations, threats to watersheds, and other high-risk
                    areas. The legislation also streamlines environmental review
                    for ecosystem restoration projects by requiring the U.S.
                    Forest Service to consider only two alternatives during the
                    planning process: an "action" alternative and a "no action"
                    alternative.
                  </Type>
                  <Type>
                    <Link
                      variant="body2"
                      href="https://cdn.cosmicjs.com/ce9bbe90-e441-11e7-b63a-e3c5cbbbeb2f-WaterCoalition EPA Wildfire Final 10.23.17.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Water coalition support letter to Senate Committee on
                      Environment and Public Works
                    </Link>
                  </Type>
                  <Spacing size="x-small" />
                  <StatusCaption>
                    Introduced in the Senate on December 2, 2017. Pending action
                    in the Committee on Environment and Public Works.
                  </StatusCaption>
                  {/*  */}
                  <Spacing />
                  <IssueTitle href="https://www.congress.gov/bill/115th-congress/house-bill/1873?q=%7B%22search%22%3A%5B%22LaMalfa+fire%22%5D%7D&r=6">
                    H.R.1873 - Electricity Reliability and Forest Protection Act
                  </IssueTitle>
                  <Type variant="body2" paragraph>
                    PCWA supports the Electricity Reliability Act of 2017. This
                    bipartisan legislation provides power companies with greater
                    flexibility to conduct vegetation management activities in
                    rights-of-way on federal lands. H.R. 1873 would expedite and
                    streamline the process by which the Departments of the
                    Interior and Agriculture approve vegetation management
                    plans. It also would direct the Departments to modify
                    regulations to minimize the need for case-by-case or annual
                    approvals of routine vegetation management.
                  </Type>
                  {/* <Spacing size="x-small" /> */}
                  <StatusCaption>
                    Introduced in the House on April 4, 2017. Passed the House
                    on June 21, 2017. Pending action in the Senate Committee on
                    Energy and Natural Resources.
                  </StatusCaption>
                  {/*  */}
                  <Spacing />
                  <IssueTitle href="https://cdn.cosmicjs.com/45beaf60-e67b-11e7-a671-ab91e302e67a-3-1-2017_Fecko.PCWA.3.12017.WPTestimony.pdf">
                    Testimony to the U.S. House Subcommittee on Water, Power and
                    Oceans
                  </IssueTitle>
                  <Type variant="body2" paragraph>
                    PCWA provided comments and concerns to the U.S. House
                    Subcommittee on Water, Power and Oceans about critical
                    infrastructure and regulatory streamlining necessary to
                    promote public safety and water supply reliability for the
                    western region’s farms, cities, homes and businesses. PCWA
                    urged Congress to keep the western region which includes
                    Placer County a part of the U.S. economy to maintain
                    facilities during droughts and floods and grow its economy
                    further.
                  </Type>
                  {/*  */}
                </Box>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            {/* <ExpansionPanel
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
            </ExpansionPanel> */}
          </Box>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}
