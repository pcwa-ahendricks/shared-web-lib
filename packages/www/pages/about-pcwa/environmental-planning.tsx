import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {RespRowBox, ChildBox} from '@components/boxes/FlexBox'
import {Typography as Type, Box} from '@material-ui/core'
import {useTheme} from '@material-ui/core/styles'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import OpenInNewLink, {
  OpenInNewLinkProps
} from '@components/OpenInNewLink/OpenInNewLink'
import NextLink from 'next/link'
import Spacing from '@components/boxes/Spacing'

const EnvironmentalPlanningPage = () => {
  const theme = useTheme()

  const linkProps: OpenInNewLinkProps = {
    noWrap: false,
    showIconAlways: true,
    startAdornment: true,
    iconPadding: theme.spacing(1),
    centerIcon: false,
    pdf: true,
    gutterBottom: true,
    iconColor: 'secondary'
  }

  const ForwardOpenInNewLink = React.forwardRef(
    (props: OpenInNewLinkProps, ref: React.Ref<any>) => (
      <OpenInNewLink {...props} {...ref} />
    )
  )
  ForwardOpenInNewLink.displayName = 'OpenInNewLink'

  return (
    <PageLayout title="Environmental Planning" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle title="Environmental Planning" subtitle="General" />
          <RespRowBox flexSpacing={6}>
            <ChildBox flex="35%" display="flex">
              <Box
                mx="auto"
                width={{xs: '60vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
              >
                <LazyImgix
                  src="https://cosmicjs.imgix.net/27251d10-6b32-11e7-a2a2-c992b2b93cb7-environmental-and-planning-documents.jpg"
                  htmlAttributes={{
                    alt: 'A photo taken of the American River',
                    style: {width: '100%'}
                  }}
                />
              </Box>
            </ChildBox>
            <ChildBox flex="65%">
              <Type variant="h3" gutterBottom>
                Planning and Studies
              </Type>
              <OpenInNewLink
                {...linkProps}
                href="https://cdn.cosmicjs.com/54c16af0-3f47-11e8-8409-219816b81fd5-MVGB SGMA Alternative 2018 Annual Report.pdf"
              >
                Annual Report for the Martis Valley Groundwater Basin,
                Sustainable Groundwater Management Act Alternative Submittal,
                covering Water Years 2016 and 2017
              </OpenInNewLink>
              <OpenInNewLink
                {...linkProps}
                href="https://cdn.cosmicjs.com/8cfe62b0-70c5-11e8-a5be-c3d0d175fd82-Assumed_PCWA_Wholesale_Deliveries_to_Urban_Water_Suppliers_for_Water_Years_2017_2018_&_2019_FINAL.pdf"
              >
                Assumed PCWA Wholesale Deliveries to Urban Water Suppliers for
                Water Years 2017, 2018, & 2019
              </OpenInNewLink>
              <OpenInNewLink
                {...linkProps}
                href="https://cdn.cosmicjs.com/8f300fc0-70c5-11e8-a5be-c3d0d175fd82-PCWA 2015 UWMP - Final 7.14.16.pdf"
              >
                2015 Urban Water Management Plan - Report
              </OpenInNewLink>
              <OpenInNewLink
                {...linkProps}
                href="https://cdn.cosmicjs.com/902c7120-70c5-11e8-98f8-b18c468f0295-PCWA Final Adopted appendix 7.8.16.pdf"
              >
                2015 Urban Water Management Plan - Appendix
              </OpenInNewLink>
              <OpenInNewLink
                {...linkProps}
                href="https://cdn.cosmicjs.com/255f9fb0-70b7-11e8-a25f-afdbd6ff8ae5-MartisValleyGMPFinal07.22.2013.pdf"
              >
                2013 Martis Valley Groundwater Management Plan
              </OpenInNewLink>
              <OpenInNewLink
                {...linkProps}
                href="https://cdn.cosmicjs.com/8e6daa20-70c5-11e8-a5be-c3d0d175fd82-PCWA_Benchmark_Study_Summary_July_2009.pdf"
              >
                2009 Energy and Green House Gas Benchmark Study July
              </OpenInNewLink>
              <OpenInNewLink
                {...linkProps}
                href="//cdn.cosmicjs.com/8d12fc20-70c5-11e8-98f8-b18c468f0295-East-Loomis-Canal-Efficiency-Study-Executive-Summary.pdf"
              >
                2008 East Loomis Basin Canal Efficiency Study June
              </OpenInNewLink>
              <OpenInNewLink
                {...linkProps}
                href="https://cdn.cosmicjs.com/ed265ac0-70b7-11e8-b89a-91a6fa50a41c-WPCGMP_Groundwater_Management_Plan_07.pdf"
              >
                2007 Western Placer County Groundwater Management Plan
              </OpenInNewLink>
              <NextLink href="/planning/arbs" passHref>
                <ForwardOpenInNewLink
                  {...linkProps}
                  pdf={false}
                  target="_self"
                  altIcon
                >
                  2016 American River Basin Study
                </ForwardOpenInNewLink>
              </NextLink>

              <Spacing />
              <Type variant="h3" gutterBottom>
                Environmental Review
              </Type>
              <OpenInNewLink
                {...linkProps}
                href="https://cdn.cosmicjs.com/eb914a90-44bf-11e8-b4ba-c9828ea342a7-Notice of Intent for the PCWA Weather Modification Project.pdf"
              >
                Notice of Intent for the PCWA Weather Modification Project
              </OpenInNewLink>
              <OpenInNewLink
                {...linkProps}
                href="https://cdn.cosmicjs.com/ee018740-44bf-11e8-b763-09a3ef6c77b1-Initial Study & Negative Declaration for the PCWA Weather Modification Project.pdf"
              >
                Initial Study & Negative Declaration for the PCWA Weather
                Modification Project
              </OpenInNewLink>
            </ChildBox>
          </RespRowBox>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default EnvironmentalPlanningPage
