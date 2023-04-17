// cspell:ignore Macroinvertebrate Streamflow ferc
import React, {useCallback} from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {RowBox, ChildBox} from 'mui-sleazebox'
import {
  Typography as Type,
  Box,
  useTheme,
  makeStyles,
  createStyles,
  Theme,
  Link
} from '@material-ui/core'
import OpenInNewLink, {
  OpenInNewLinkProps
} from '@components/OpenInNewLink/OpenInNewLink'
import Spacing from '@components/boxes/Spacing'
import Image from 'next/image'
import imgixLoader from '@lib/imageLoader'
import {TreeView} from '@material-ui/lab'
import ExpandMoreIcon from '@material-ui/icons/AddBoxOutlined'
import ExpandLessIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined'
import DescriptionIcon from '@material-ui/icons/DescriptionOutlined'
import ImageIcon from '@material-ui/icons/ImageOutlined'
import VideoIcon from '@material-ui/icons/OndemandVideoOutlined'
import TreeItem from '@material-ui/lab/TreeItem'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    openInNewLinkBox: {
      '& strong, b': {
        color: theme.palette.primary.light
      }
    }
  })
)

const EnvironmentalPlanningPage = () => {
  const classes = useStyles()
  const theme = useTheme()

  const linkProps: Partial<OpenInNewLinkProps> = {
    noWrap: false,
    showIconAlways: true,
    startAdornment: true,
    iconPadding: theme.spacing(1),
    centerIcon: false,
    pdf: true,
    gutterBottom: true,
    iconColor: 'secondary'
  }

  const OpenInNewLinkBox = useCallback(
    (props: OpenInNewLinkProps) => (
      <Box className={classes.openInNewLinkBox}>
        <OpenInNewLink {...props} />
      </Box>
    ),
    [classes]
  )

  return (
    <PageLayout title="Environmental Planning & Compliance" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle
            title="Environmental Planning & Compliance"
            subtitle="General"
          />
          <RowBox responsive flexSpacing={6}>
            <ChildBox flex="35%">
              <Box
                mx="auto"
                width={{xs: '60vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
              >
                <Image
                  width={700}
                  height={959}
                  layout="responsive"
                  sizes="(max-width: 600px) 60vw, 35vw"
                  loader={imgixLoader}
                  src="27251d10-6b32-11e7-a2a2-c992b2b93cb7-environmental-and-planning-documents.jpg"
                  alt="A photo taken of the American River"
                />
              </Box>
            </ChildBox>
            <ChildBox flex="65%">
              As a public agency within the State of California, PCWA is
              required to comply with the California Environmental Quality Act
              (CEQA) when approving projects that may have a direct or indirect
              effect on the environment. In addition to PCWA's obligations under
              CEQA, some PCWA projects are also subject to federal agency
              approval. Such projects require the federal agency to conduct a
              National Environmental Policy Act (NEPA) review. A list of current
              projects subject to CEQA and/or NEPA public review is provided
              below.
            </ChildBox>
          </RowBox>
          <Spacing size="x-large" />
          <RowBox>
            <ChildBox>
              <Type variant="h3" gutterBottom>
                Public Review
              </Type>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://cdn.cosmicjs.com/e1f00cd0-0c3c-11ed-b7be-d956591ad437-FMSS-Scoping-Doc071922-1-page.pdf"
              >
                French Meadows South Shore Water Supply Project scoping document
              </OpenInNewLinkBox>
              <Spacing />
              {/* <Type variant="h3" gutterBottom>
                Environmental Planning & Compliance
              </Type>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://docs.pcwa.net/noi-colfax-wtp.pdf"
              >
                <em>REVISED TIME</em> Notice of Intent to Adopt a Mitigated
                Negative Declaration for the Colfax Water Treatment Plant
                Project
              </OpenInNewLinkBox>
              <Spacing />
              <Type variant="h3" gutterBottom>
                Public Review Documents
              </Type> */}
              {/* <OpenInNewLinkBox
                {...linkProps}
                href="https://docs.pcwa.net/colfax-wtp-initial-study.pdf"
              >
                Colfax Water Treatment Plant Project Initial Study / Mitigated
                Negative Declaration
              </OpenInNewLinkBox> */}
              {/* <Spacing /> */}
              <Type variant="h3" gutterBottom>
                Planning and Studies
              </Type>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://docs.pcwa.net/TCS-CalFrame_water-agency-role-in-forest-health-report"
              >
                Tahoe Central Sierra Cal FRAME Project - Water Agency Role in
                Forest Health Report
              </OpenInNewLinkBox>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://docs.pcwa.net/mvgb-sgma-alt-2018-annual-report"
              >
                Annual Report for the Martis Valley Groundwater Basin,
                Sustainable Groundwater Management Act Alternative Submittal,
                covering Water Years 2016 and 2017
              </OpenInNewLinkBox>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://cdn.cosmicjs.com/8cfe62b0-70c5-11e8-a5be-c3d0d175fd82-Assumed_PCWA_Wholesale_Deliveries_to_Urban_Water_Suppliers_for_Water_Years_2017_2018_&_2019_FINAL.pdf"
              >
                Assumed PCWA Wholesale Deliveries to Urban Water Suppliers for
                Water Years 2017, 2018, & 2019
              </OpenInNewLinkBox>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://docs.pcwa.net/pcwa-water-shortage-contingency-plan"
              >
                PCWA Water Shortage Contingency Plan
              </OpenInNewLinkBox>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://docs.pcwa.net/uwmp-2020"
              >
                2020 Urban Water Management Plan
              </OpenInNewLinkBox>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://docs.pcwa.net/uwmp-2020-errata-sheet"
              >
                2020 Urban Water Management Plan Errata Sheet - 1
              </OpenInNewLinkBox>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://docs.pcwa.net/uwmp-2020-errata-sheet-2"
              >
                2020 Urban Water Management Plan Errata Sheet - 2
              </OpenInNewLinkBox>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://cdn.cosmicjs.com/8f300fc0-70c5-11e8-a5be-c3d0d175fd82-PCWA 2015 UWMP - Final 7.14.16.pdf"
              >
                2015 Urban Water Management Plan - Report
              </OpenInNewLinkBox>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://cdn.cosmicjs.com/902c7120-70c5-11e8-98f8-b18c468f0295-PCWA Final Adopted appendix 7.8.16.pdf"
              >
                2015 Urban Water Management Plan - Appendix
              </OpenInNewLinkBox>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://cdn.cosmicjs.com/255f9fb0-70b7-11e8-a25f-afdbd6ff8ae5-MartisValleyGMPFinal07.22.2013.pdf"
              >
                2013 Martis Valley Groundwater Management Plan
              </OpenInNewLinkBox>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://cdn.cosmicjs.com/8e6daa20-70c5-11e8-a5be-c3d0d175fd82-PCWA_Benchmark_Study_Summary_July_2009.pdf"
              >
                2009 Energy and Green House Gas Benchmark Study July
              </OpenInNewLinkBox>
              <OpenInNewLinkBox
                {...linkProps}
                href="//cdn.cosmicjs.com/8d12fc20-70c5-11e8-98f8-b18c468f0295-East-Loomis-Canal-Efficiency-Study-Executive-Summary.pdf"
              >
                2008 East Loomis Basin Canal Efficiency Study June
              </OpenInNewLinkBox>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://cdn.cosmicjs.com/ed265ac0-70b7-11e8-b89a-91a6fa50a41c-WPCGMP_Groundwater_Management_Plan_07.pdf"
              >
                2007 Western Placer County Groundwater Management Plan
              </OpenInNewLinkBox>
              <OpenInNewLinkBox
                {...linkProps}
                pdf={false}
                altIcon
                href="/planning/arbs"
                isNextLink
              >
                2016 American River Basin Study
              </OpenInNewLinkBox>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://cdn.cosmicjs.com/f6925ec0-027c-11eb-be35-433e751f849e-NRMP-ReportApril-2009.pdf"
              >
                Natural Resources Management Plan
              </OpenInNewLinkBox>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://imgix.cosmicjs.com/a0516f00-6817-11eb-bf71-a9528da73ec2-MVGB-2018-2019-Annual-Report-FINAL01222021.pdf"
              >
                Martis Valley Groundwater Basin Annual Report for Water Years
                2018, 2019
              </OpenInNewLinkBox>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://docs.pcwa.net/pcwa-2022-temporary-transfer-petition-package"
              >
                PCWA 2022 Temporary Transfer Petition Package, 5-24-2022
              </OpenInNewLinkBox>
              <TreeView
                // className={classes.root}
                defaultCollapseIcon={<ExpandLessIcon color="primary" />}
                defaultExpandIcon={<ExpandMoreIcon color="primary" />}
                defaultEndIcon={<DescriptionIcon color="secondary" />}
                color="primary"
                defaultExpanded={['1', '3', '4', '7']}
              >
                <TreeItem nodeId="1" label="2022 Water Connection Charge Study">
                  <TreeItem
                    nodeId="2"
                    label={
                      <Link
                        variant="body1"
                        color="primary"
                        href="https://docs.pcwa.net/wcc-cost-study-2017.pdf"
                        target="blank"
                        rel="noopener noreferrer"
                      >
                        2017 WCC Cost Study
                      </Link>
                    }
                  />

                  <TreeItem nodeId="3" label="2022 Documents">
                    <TreeItem
                      nodeId="4"
                      label="2022 WCC Study Meeting #1 - 6/28/22"
                    >
                      <TreeItem
                        nodeId="5"
                        label={
                          <Link
                            variant="body1"
                            color="primary"
                            href="https://docs.pcwa.net/wcc-presentation-slides-2022_06_28.pdf"
                            target="blank"
                            rel="noopener noreferrer"
                          >
                            Presentation Slides
                          </Link>
                        }
                      />
                      <TreeItem
                        nodeId="6"
                        icon={<VideoIcon color="secondary" />}
                        label={
                          <Link
                            variant="body1"
                            color="primary"
                            href="https://docs.pcwa.net/wcc-presentation-video-2022_06_28.pdf"
                            target="blank"
                            rel="noopener noreferrer"
                          >
                            Presentation Video
                          </Link>
                        }
                      />
                    </TreeItem>
                    <TreeItem
                      nodeId="7"
                      label="2022 WCC Study Meeting #2 - 7/26/22"
                    >
                      <TreeItem
                        nodeId="8"
                        icon={<VideoIcon color="secondary" />}
                        label={
                          <Link
                            variant="body1"
                            color="primary"
                            href="https://cdn.cosmicjs.com/06a6d530-0e9b-11ed-b476-13ceb56f12f2-2022WCCWorkshopAgenda2022.07.26.pdf"
                            target="blank"
                            rel="noopener noreferrer"
                          >
                            Presentation Agenda
                          </Link>
                        }
                      />
                      <TreeItem
                        nodeId="9"
                        label={
                          <Link
                            variant="body1"
                            color="primary"
                            href="https://cdn.cosmicjs.com/06b68ca0-0e9b-11ed-b476-13ceb56f12f2-2022-WCC-Presentation-2022.07.pdf"
                            target="blank"
                            rel="noopener noreferrer"
                          >
                            Presentation Slides
                          </Link>
                        }
                      />
                      <TreeItem
                        nodeId="10"
                        label={
                          <Link
                            variant="body1"
                            color="primary"
                            href="https://cdn.cosmicjs.com/06f0d680-0e9b-11ed-b476-13ceb56f12f2-WCC2022Project-ListDRAFT.pdf"
                            target="blank"
                            rel="noopener noreferrer"
                          >
                            Summary of Water Connection Charge Projects
                          </Link>
                        }
                      />
                      <TreeItem
                        nodeId="11"
                        icon={<ImageIcon color="secondary" />}
                        label={
                          <Link
                            variant="body1"
                            color="primary"
                            href="https://cdn.cosmicjs.com/07150050-0e9b-11ed-b476-13ceb56f12f2-WestPlacerFutureProjects20220725.pdf"
                            target="blank"
                            rel="noopener noreferrer"
                          >
                            West Placer Planning and Water Connection Charge
                            Projects - Map Figure
                          </Link>
                        }
                      />
                    </TreeItem>
                  </TreeItem>
                </TreeItem>
              </TreeView>
              <Spacing size="x-large" />
              {/* <Type variant="h3" gutterBottom>
                Environmental Review
              </Type> */}
              {/* <OpenInNewLinkBox
                {...linkProps}
                href="https://cdn.cosmicjs.com/eb914a90-44bf-11e8-b4ba-c9828ea342a7-Notice of Intent for the PCWA Weather Modification Project.pdf"
              >
                Notice of Intent for the PCWA Weather Modification Project
              </OpenInNewLinkBox> */}
              {/* <OpenInNewLinkBox
                {...linkProps}
                href="https://cdn.cosmicjs.com/ee018740-44bf-11e8-b763-09a3ef6c77b1-Initial Study & Negative Declaration for the PCWA Weather Modification Project.pdf"
              >
                Initial Study & Negative Declaration for the PCWA Weather
                Modification Project
              </OpenInNewLinkBox> */}
              {/* <OpenInNewLinkBox
                {...linkProps}
                href="https://cdn.cosmicjs.com/c92cd580-c87c-11ea-b44f-f5c7da208e23-NOI-for-MFIB.pdf"
              >
                Notice of Intent for the Middle Fork Interbay Sediment
                Management Project
              </OpenInNewLinkBox>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://cdn.cosmicjs.com/ca6f4090-c87c-11ea-b44f-f5c7da208e23-MFIBDraftCEQA06252020.pdf"
              >
                Subsequent Impact Report for the Middle Fork Interbay Sediment
                Management Project
              </OpenInNewLinkBox> */}

              {/* <Spacing />
              <Type variant="h3" gutterBottom>
                FERC Relicensing & Compliance
              </Type>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://docs.pcwa.net/mfp-ferc-license"
              >
                MFP FERC License
              </OpenInNewLinkBox>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://cdn.cosmicjs.com/731df3f0-0372-11eb-9528-f5a6da2be217-MFP-FERC-License-Errata-06122020.pdf"
              >
                MFP FERC License Errata
              </OpenInNewLinkBox>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://cdn.cosmicjs.com/72ff6f70-0372-11eb-9528-f5a6da2be217-MFP-FERC-License-Order-deleting-Article-205-08052020.pdf"
              >
                MFP FERC License Revision
              </OpenInNewLinkBox>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://cdn.cosmicjs.com/73e00b70-0372-11eb-9528-f5a6da2be217-BEMPFeb2011.pdf"
              >
                Bald Eagle Management Plan
              </OpenInNewLinkBox>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://cdn.cosmicjs.com/8a1921b0-0372-11eb-9528-f5a6da2be217-BMINov2012.pdf"
              >
                Benthic Macroinvertebrate Monitoring Plan
              </OpenInNewLinkBox>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://cdn.cosmicjs.com/8be72af0-0372-11eb-9528-f5a6da2be217-FPMPNov2012.pdf"
              >
                Fire Prevention And Suppression Plan
              </OpenInNewLinkBox>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://cdn.cosmicjs.com/8b750830-0372-11eb-9528-f5a6da2be217-FYLFMPNov2012.pdf"
              >
                Foothill Yellow-Legged Frog Monitoring Plan
              </OpenInNewLinkBox>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://cdn.cosmicjs.com/8cd24e40-0372-11eb-9528-f5a6da2be217-GPRPNov2012.pdf"
              >
                Geomorphology/Riparian Monitoring Plan
              </OpenInNewLinkBox>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://cdn.cosmicjs.com/339a46e0-9fd2-11ec-a634-2f1716dd45af-20201204-5077Revised-Rec-Plan.pdf"
              >
                Recreation Plan <strong>[Draft]</strong>
              </OpenInNewLinkBox>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://cdn.cosmicjs.com/d61b4ac0-0372-11eb-9528-f5a6da2be217-DraftSMPFeb2011.pdf"
              >
                Sediment Management Plan <strong>[Draft]</strong>
              </OpenInNewLinkBox>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://cdn.cosmicjs.com/32bf0210-9fd2-11ec-a634-2f1716dd45af-RevisedSREGPNov-2020.pdf"
              >
                Streamflow and Reservoir Elevation Gaging Plan
              </OpenInNewLinkBox>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://cdn.cosmicjs.com/33bfa930-9fd2-11ec-a634-2f1716dd45af-20201204-5079Revised-TSMP.pdf"
              >
                Transportation System Management Plan <strong>[Draft]</strong>
              </OpenInNewLinkBox>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://cdn.cosmicjs.com/92ee7bf0-0372-11eb-9528-f5a6da2be217-VIPMPNov2011.pdf"
              >
                Vegetation and Integrated Pest Management Plan
              </OpenInNewLinkBox>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://cdn.cosmicjs.com/74a53030-0372-11eb-9528-f5a6da2be217-VRMPFeb2011.pdf"
              >
                Visual Resource Management Plan
              </OpenInNewLinkBox>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://cdn.cosmicjs.com/8c1eb5b0-0372-11eb-9528-f5a6da2be217-WPTNov2012.pdf"
              >
                Western Pond Turtle Monitoring Plan
              </OpenInNewLinkBox>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://cdn.cosmicjs.com/8b73cfb0-0372-11eb-9528-f5a6da2be217-WQMPNov2012.pdf"
              >
                Water Quality Monitoring Plan
              </OpenInNewLinkBox>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://cdn.cosmicjs.com/895ed260-0372-11eb-9528-f5a6da2be217-WTMPNov2012.pdf"
              >
                Water Temperature Monitoring Plan
              </OpenInNewLinkBox>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://cdn.cosmicjs.com/34a37980-9fd2-11ec-a634-2f1716dd45af-RLEPNov-2020.pdf"
              >
                Reservoir Level Evaluation Plan
              </OpenInNewLinkBox>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://cdn.cosmicjs.com/326f0d50-9fd2-11ec-a634-2f1716dd45af-Fish-Population-MPNov-2012.pdf"
              >
                Fish Population Monitoring Plan
              </OpenInNewLinkBox>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://cdn.cosmicjs.com/326a2b50-9fd2-11ec-a634-2f1716dd45af-BMMPJune-2021.pdf"
              >
                Bear Management Monitoring Plan
              </OpenInNewLinkBox>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://cdn.cosmicjs.com/32c89f00-9fd2-11ec-a634-2f1716dd45af-PUBLICP-2079PCWAMFPSHIP.pdf"
              >
                Spawning Habitat Improvement Plan <strong>[Draft]</strong>
              </OpenInNewLinkBox>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://cdn.cosmicjs.com/333d80e0-9fd2-11ec-a634-2f1716dd45af-PUBLICP-2079PCWAMFPPenstockPlan.pdf"
              >
                Penstock and Other Drainage Structure Emergency and Maintenance
                Release Points Plan <strong>[Draft]</strong>
              </OpenInNewLinkBox>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://cdn.cosmicjs.com/331c8b60-9fd2-11ec-a634-2f1716dd45af-PUBLICP-2079PCWAMFPLWDPlan.pdf"
              >
                Large Woody Debris Management Plan <strong>[Draft]</strong>
              </OpenInNewLinkBox>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://cdn.cosmicjs.com/32b0d140-9fd2-11ec-a634-2f1716dd45af-PUBLICP-2079PCWAMFPHHOFeasilibityPlan.pdf"
              >
                Hell Hole Dam Outlet Feasibility Study Plan{' '}
                <strong>[Draft]</strong>
              </OpenInNewLinkBox>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://cdn.cosmicjs.com/330002b0-9fd2-11ec-a634-2f1716dd45af-PUBLICP-2079PCWAMFPFMStagingAreaLRP.pdf"
              >
                French Meadows Dam Staging Area Landscape Rehabilitation Plan
                <strong>[Draft]</strong>
              </OpenInNewLinkBox>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://cdn.cosmicjs.com/32833190-9fd2-11ec-a634-2f1716dd45af-PUBLICP-2079PCWAMFPESP.pdf"
              >
                Entrainment Study Plan <strong>[Draft]</strong>
              </OpenInNewLinkBox>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://cdn.cosmicjs.com/3341edb0-9fd2-11ec-a634-2f1716dd45af-PUBLICP-2079PCWAMFPESCMP.pdf"
              >
                Erosion and Sediment Control and Management Plan{' '}
                <strong>[Draft]</strong>
              </OpenInNewLinkBox>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://cdn.cosmicjs.com/3358f820-9fd2-11ec-a634-2f1716dd45af-PUBLICP-2079PCWAMFPAISMP.pdf"
              >
                Aquatic Invasive Species Management Plan{' '}
                <strong>[Draft]</strong>
              </OpenInNewLinkBox> */}
            </ChildBox>
          </RowBox>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default EnvironmentalPlanningPage
