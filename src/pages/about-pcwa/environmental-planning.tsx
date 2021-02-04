// cspell:ignore Macroinvertebrate Streamflow ferc
import React, {useCallback} from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {FlexBox, RowBox, ChildBox} from 'mui-sleazebox'
import {
  Typography as Type,
  Box,
  useTheme,
  makeStyles,
  createStyles,
  Theme
} from '@material-ui/core'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import OpenInNewLink, {
  OpenInNewLinkProps
} from '@components/OpenInNewLink/OpenInNewLink'
import Spacing from '@components/boxes/Spacing'

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
            <FlexBox child flex="35%">
              <Box
                mx="auto"
                width={{xs: '60vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
              >
                <LazyImgix
                  src="https://cosmicjs.imgix.net/27251d10-6b32-11e7-a2a2-c992b2b93cb7-environmental-and-planning-documents.jpg"
                  htmlAttributes={{
                    alt: 'A photo taken of the American River'
                  }}
                />
              </Box>
            </FlexBox>
            <ChildBox flex="65%">
              <Type variant="h3" gutterBottom>
                Planning and Studies
              </Type>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://cdn.cosmicjs.com/54c16af0-3f47-11e8-8409-219816b81fd5-MVGB SGMA Alternative 2018 Annual Report.pdf"
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

              <Spacing />
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

              <Spacing />
              <Type variant="h3" gutterBottom>
                FERC Relicensing & Compliance
              </Type>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://cdn.cosmicjs.com/8ce512f0-0372-11eb-9528-f5a6da2be217-MFP-FERC-License-06082020.pdf"
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
              <Spacing size="x-small" />
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
                href="https://cdn.cosmicjs.com/a9ad3cf0-0372-11eb-9528-f5a6da2be217-DraftRECNov2012.pdf"
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
                href="https://cdn.cosmicjs.com/8e6a7a70-0372-11eb-9528-f5a6da2be217-DraftSREGPNov2012.pdf"
              >
                Streamflow and Reservoir Elevation Gaging Plan{' '}
                <strong>[Draft]</strong>
              </OpenInNewLinkBox>
              <OpenInNewLinkBox
                {...linkProps}
                href="https://cdn.cosmicjs.com/d5cc6770-0372-11eb-9528-f5a6da2be217-DraftTSMPNov2012.pdf"
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
            </ChildBox>
          </RowBox>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default EnvironmentalPlanningPage
