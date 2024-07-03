import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
// import PageTitle from '@components/PageTitle/PageTitle'
import Image from 'next/image'
import {imgixUrlLoader} from '@lib/imageLoader'
import {
  Box,
  Typography as Type,
  Unstable_Grid2 as Grid,
  List,
  ListItemText,
  ListItemButton,
  Button
} from '@mui/material'
import Spacing from '@components/boxes/Spacing'
import WideContainer from '@components/containers/WideContainer'
import dynamic from 'next/dynamic'
import useLinkComponent from '@hooks/useLinkComponent'
import ImageThumbLink from '@components/ImageThumbLink/ImageThumbLink'
const ReactPdfPage = dynamic(
  () => import('@components/PDFPage/ReactPdfSinglePage'),
  {
    ssr: false
  }
)

export default function BasicTemplatePage() {
  const LinkComponent = useLinkComponent({
    target: '_blank',
    rel: 'noopener noreferrer'
  })
  return (
    <PageLayout title="Biomass Supply" marginTop={0}>
      <Box sx={{display: 'flex', flexDirection: 'column'}}>
        <Image
          priority
          src="https://pcwa.imgix.net/pcwa-net/energy/biomass/PPT%20Background-Biomass%20Supply-1.png"
          width={2560}
          height={1440}
          loader={imgixUrlLoader}
          alt="Biomass Banner"
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            maxWidth: '1127px',
            margin: 'auto'
          }}
        />
      </Box>
      <Spacing factor={2} />
      <MainBox>
        <WideContainer>
          <Type variant="h3">June 26, 2024</Type>
          <Type variant="h2">Biomass Supply Symposium Event</Type>
          {/* <PageTitle title="Basic Template" subtitle="Page Subtitle" /> */}
          <Spacing />
          <Box>
            <Grid container spacing={4}>
              <Grid xs={12} sm={7}>
                <Type color="primary" variant="h3" gutterBottom>
                  Panel Presentations
                </Type>
                <Type variant="caption">
                  Click any of the links below to download individual
                  presentations (.PPT, requires MS Powerpoint)
                </Type>
                <Spacing />
                <List dense>
                  <ListItemButton
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://pcwa.sfo3.cdn.digitaloceanspaces.com/pcwa-net/energy/biomass/speaker-slides/A%20Look%20Ahead%20for%20Cal%20FRAME%20in%20the%20Tahoe-Central%20Sierra%20by%20Christiana%20Darlington.pptx"
                  >
                    <ListItemText primary="A Look Ahead for Cal FRAME in the Tahoe-Central Sierra by Christiana Darlington (PPT, 13 MB)" />
                  </ListItemButton>
                  <ListItemButton
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://pcwa.sfo3.cdn.digitaloceanspaces.com/pcwa-net/energy/biomass/speaker-slides/OPR%20Cal%20FRAME%20Woody%20Feedstock%20Pilots%20Overviewby%20Michael%20Maguire.pptx"
                  >
                    <ListItemText primary="OPR Cal FRAME Woody Feedstock Pilots Overview by Michael Maguire (PPT, 7 MB)" />
                  </ListItemButton>
                  <ListItemButton
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://pcwa.sfo3.cdn.digitaloceanspaces.com/pcwa-net/energy/biomass/speaker-slides/Panel%201-Biomass%20Collection%20Carried%20Out%20by%20Local%20Government.pptx"
                  >
                    <ListItemText primary="Panel 1 - Biomass Collection Carried Out by Local Government (PPT, 33 MB)" />
                  </ListItemButton>
                  <ListItemButton
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://pcwa.sfo3.cdn.digitaloceanspaces.com/pcwa-net/energy/biomass/speaker-slides/Panel%202-Bring%20the%20Biomass%20Out%20of%20the%20Forest_An%20Outlook%20for%20Future%20Prospects.pptx"
                  >
                    <ListItemText primary="Panel 2 - Bring the Biomass Out of the Forest, An Outlook for Future Prospects (PPT, 10 MB)" />
                  </ListItemButton>
                  <ListItemButton
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://pcwa.sfo3.cdn.digitaloceanspaces.com/pcwa-net/energy/biomass/speaker-slides/Panel%203-Local%20Voices%20from%20the%20Business%20Community_Commercial%20Biomass%20Utilization%20Today.pptx"
                  >
                    <ListItemText primary="Panel 3 - Local Voices from the Business Community: Commercial Biomass Utilization Today (PPT, 56 MB)" />
                  </ListItemButton>
                  <ListItemButton
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://pcwa.sfo3.cdn.digitaloceanspaces.com/pcwa-net/energy/biomass/speaker-slides/Panel%204-Local%20Voices%20from%20the%20Business%20Community_Commercial%20Timber%20and%20Line%20Clearance%20Work.pptx"
                  >
                    <ListItemText primary="Panel 4 - Local Voices from the Business Community: Commercial Timber and Line Clearance Work (PPT, 27 MB)" />
                  </ListItemButton>
                  <ListItemButton
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://pcwa.sfo3.cdn.digitaloceanspaces.com/pcwa-net/energy/biomass/speaker-slides/Panel%205-Technology%20That%20Finds%20Where%20the%20Biomass%20is%20Growing%20or%20Piled.pptx"
                  >
                    <ListItemText primary="Panel 5 - Technology That Finds Where the Biomass is Growing or Piled (PPT, 53 MB)" />
                  </ListItemButton>
                  <ListItemButton
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://pcwa.sfo3.cdn.digitaloceanspaces.com/pcwa-net/energy/biomass/speaker-slides/Panel%206-Where%20Does%20the%20Biomass%20Go%20Now%20and%20In%20the%20Future.pptx"
                  >
                    <ListItemText primary="Panel 6 - Where Does the Biomass Go Now and In the Future (PPT, 171 MB)" />
                  </ListItemButton>
                  <ListItemButton
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://pcwa.sfo3.cdn.digitaloceanspaces.com/pcwa-net/energy/biomass/speaker-slides/Panel%207-TCS%20CAL%20FRAME%20Panel%201.pptx"
                  >
                    <ListItemText primary="Panel 7 - TCS CAL FRAME Panel 1 (PPT, 37 MB)" />
                  </ListItemButton>
                  <ListItemButton
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://pcwa.sfo3.cdn.digitaloceanspaces.com/pcwa-net/energy/biomass/speaker-slides/Panel%208-Panel%207-TCS%20CAL%20FRAME%20Panel%202.pptx"
                  >
                    <ListItemText primary="Panel 8 - TCS CAL FRAME Panel 2 (PPT, 19 MB)" />
                  </ListItemButton>
                  <ListItemButton
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://pcwa.sfo3.cdn.digitaloceanspaces.com/pcwa-net/energy/biomass/speaker-slides/Panel%209-Other%20State%20Programs%20that%20Work%20on%20Biomass-Related%20Issues.pptx"
                  >
                    <ListItemText primary="Panel 9 - Other State Programs that Work on Biomass-Related Issues (PPT, 10 MB)" />
                  </ListItemButton>
                </List>
              </Grid>
              <Grid xs={12} sm={5}>
                <Type color="primary" variant="h3">
                  Agenda
                </Type>
                {/* <Type variant="caption">
                Click agenda to download (PDF, 186 KB)
              </Type> */}
                <Button
                  color="secondary"
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://pcwa.sfo3.cdn.digitaloceanspaces.com/pcwa-net/energy/biomass/2024_Biomass_Symposium_Final_Agenda.pdf"
                >
                  Download Agenda (PDF, 186 KB)
                </Button>
                <Spacing />
                <Box
                  sx={{boxShadow: 'rgba(16, 36, 94, 0.07) 0px 30px 40px 0px'}}
                >
                  <Box
                    component={LinkComponent}
                    href="https://pcwa.sfo3.cdn.digitaloceanspaces.com/pcwa-net/energy/biomass/2024_Biomass_Symposium_Final_Agenda.pdf"
                  >
                    <ReactPdfPage
                      slotProps={{
                        PageProps: {renderTextLayer: false, pageNumber: 1}
                      }}
                      url="https://pcwa.sfo3.digitaloceanspaces.com/pcwa-net/energy/biomass/2024_Biomass_Symposium_Final_Agenda.pdf"
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Spacing />
          <Box>
            <Type variant="h3" color="primary">
              Reports and Resources
            </Type>
            <Spacing />
            <Grid container spacing={3}>
              <Grid xs={6} sm={4} md={1.7}>
                <ImageThumbLink
                  sizes="(max-width: 600px) 25vw, 10vw"
                  href="https://pcwa.sfo3.cdn.digitaloceanspaces.com/pcwa-net/energy/biomass/SNC-2024-29-StrategicPlan.pdf"
                  imgixUrl="https://pcwa.imgix.net/pcwa-net/energy/biomass/SNC-2024-29-StrategicPlan.pdf"
                  caption="Sierra Nevada Conservancy Strategic Plan 2024-2029"
                  alt="Sierra Nevada Conservancy Strategic Plan 2024-2029 pdf"
                />
              </Grid>
              <Grid xs={6} sm={4} md={1.7}>
                <ImageThumbLink
                  sizes="(max-width: 600px) 25vw, 10vw"
                  href="https://pcwa.sfo3.cdn.digitaloceanspaces.com/pcwa-net/energy/biomass/speaker-slides/Resources-TCS%20Cal%20FRAME%20Report/01-TCS%20Pilot%20Program_Water%20Agency%20Report.pdf"
                  imgixUrl="https://pcwa.imgix.net/pcwa-net/energy/biomass/speaker-slides/Resources-TCS%20Cal%20FRAME%20Report/01-TCS%20Pilot%20Program_Water%20Agency%20Report.pdf"
                  caption="TCS Pilot Program, Water Agency Report"
                  alt="01-TCS Pilot Program_Water Agency Report pdf"
                />
              </Grid>
              <Grid xs={6} sm={4} md={1.7}>
                <ImageThumbLink
                  sizes="(max-width: 600px) 25vw, 10vw"
                  href="https://pcwa.sfo3.cdn.digitaloceanspaces.com/pcwa-net/energy/biomass/speaker-slides/Resources-TCS%20Cal%20FRAME%20Report/02-TCS%20Pilot%20Program_Entity%20Options%20Report.pdf"
                  imgixUrl="https://pcwa.imgix.net/pcwa-net/energy/biomass/speaker-slides/Resources-TCS%20Cal%20FRAME%20Report/02-TCS%20Pilot%20Program_Entity%20Options%20Report.pdf"
                  caption="TCS Pilot Program, Entity Options Report"
                  alt="02-TCS Pilot Program_Entity Options Report pdf"
                />
              </Grid>
              <Grid xs={6} sm={4} md={1.7}>
                <ImageThumbLink
                  sizes="(max-width: 600px) 25vw, 10vw"
                  href="https://pcwa.sfo3.cdn.digitaloceanspaces.com/pcwa-net/energy/biomass/speaker-slides/Resources-TCS%20Cal%20FRAME%20Report/03-TCS%20Pilot%20Program_Community%20Collaboration%20Report.pdf"
                  imgixUrl="https://pcwa.imgix.net/pcwa-net/energy/biomass/speaker-slides/Resources-TCS%20Cal%20FRAME%20Report/03-TCS%20Pilot%20Program_Community%20Collaboration%20Report.pdf"
                  caption="TCS Pilot Program, Community Collaboration Report"
                  alt="TCS Pilot Program, Community Collaboration Report pdf"
                />
              </Grid>
              <Grid xs={6} sm={4} md={1.7}>
                <ImageThumbLink
                  sizes="(max-width: 600px) 25vw, 10vw"
                  href="https://pcwa.sfo3.cdn.digitaloceanspaces.com/pcwa-net/energy/biomass/speaker-slides/Resources-TCS%20Cal%20FRAME%20Report/04-A%20Snapshot%20of%20Entity%20Options.pdf"
                  imgixUrl="https://pcwa.imgix.net/pcwa-net/energy/biomass/speaker-slides/Resources-TCS%20Cal%20FRAME%20Report/04-A%20Snapshot%20of%20Entity%20Options.pdf"
                  caption="A Snapshot of Entity Options"
                  alt="A Snapshot of Entity Options pdf"
                />
              </Grid>
              <Grid xs={6} sm={4} md={1.7}>
                <ImageThumbLink
                  sizes="(max-width: 600px) 25vw, 10vw"
                  href="https://pcwa.sfo3.cdn.digitaloceanspaces.com/pcwa-net/energy/biomass/speaker-slides/Resources-TCS%20Cal%20FRAME%20Report/05-Exec%20Summary%20for%20Entity%20Options.pdf"
                  imgixUrl="https://pcwa.imgix.net/pcwa-net/energy/biomass/speaker-slides/Resources-TCS%20Cal%20FRAME%20Report/05-Exec%20Summary%20for%20Entity%20Options.pdf"
                  caption="Exec Summary for Entity Options"
                  alt="Exec Summary for Entity Options pdf"
                />
              </Grid>
              <Grid xs={6} sm={4} md={1.7}>
                <ImageThumbLink
                  sizes="(max-width: 600px) 25vw, 10vw"
                  href="https://pcwa.sfo3.cdn.digitaloceanspaces.com/pcwa-net/energy/biomass/speaker-slides/Resources-TCS%20Cal%20FRAME%20Report/06-TCS%20Pilot%20Program%20Biomass%20Supply%20Report.pdf"
                  imgixUrl="https://pcwa.imgix.net/pcwa-net/energy/biomass/speaker-slides/Resources-TCS%20Cal%20FRAME%20Report/06-TCS%20Pilot%20Program%20Biomass%20Supply%20Report.pdf"
                  caption="TCS Pilot Program Biomass Supply Report"
                  alt="TCS Pilot Program Biomass Supply Report pdf"
                />
              </Grid>
            </Grid>
          </Box>
          <Spacing />

          <Box>
            <Type variant="h3" color="primary">
              Speakers
            </Type>
            <Spacing />
            <Box>
              <Grid container spacing={8}>
                <Grid xs={12} sm={7}>
                  <Type variant="h4" gutterBottom>
                    Amy Lapin
                  </Type>
                  <Type variant="h5">
                    Economic and Planning Systems, INC. (EPS)
                  </Type>
                  <Spacing />
                  <Type paragraph variant="body2">
                    Since joining EPS in 2003, Amy has helped clients answer key
                    questions to advance sustainable development and public
                    policy. Amy enjoys managing multidisciplinary projects and
                    providing clear solutions based on analytics, policy
                    objectives, and stakeholder input. Amy has completed
                    projects across all of EPS’s lines of business and
                    specializes in unique and challenging assignments. These
                    assignments have included projects such as examining the
                    comprehensive economic impacts of wildfires and critical
                    habitat designations, ensuring the fiscal sustainability of
                    real estate development, and developing creative financing
                    strategies to fund physical infrastructure, public services,
                    and economic revitalization in downtown and infill
                    neighborhood locales. Recently, Amy assisted jurisdictions
                    in understanding the dynamics of their local housing
                    markets, including evaluating socioeconomic trends and
                    regulatory, financial feasibility, and other barriers to
                    achieving desired housing objectives. Drawing on these
                    analyses, Amy has developed targeted strategies to
                    incentivize residential development, support neighborhood
                    stabilization, and minimize gentrification-related
                    displacement. Amy holds a Master’s in Community and Regional
                    Planning from the University of Oregon and a Bachelor of
                    Arts in Economics from Ohio Wesleyan University. Amy is a
                    member of the Urban Land Institute (ULI) and the American
                    Planning Association (APA) and currently serves on the
                    Sacramento Tree Foundation (STF) board. Amy is in her
                    element spending time outside with her family, long-distance
                    running, biking around Sacramento, hiking the plentiful
                    trails of Northern California, and exploring new urban
                    environments.
                  </Type>
                </Grid>
                <Grid xs={12} sm={5}>
                  <Image
                    width={1600}
                    height={1280}
                    alt="Amy Lapin"
                    src="https://pcwa.imgix.net/pcwa-net/energy/biomass/speaker-bio/Amy%20Lapin.jpg"
                    style={{width: '100%', height: 'auto', objectFit: 'cover'}}
                  />
                </Grid>
              </Grid>
            </Box>
            <Spacing />
            <Box>
              <Grid container spacing={8}>
                <Grid xs={12} sm={7}>
                  <Type variant="h4" gutterBottom>
                    Camille Swezy
                  </Type>
                  <Type variant="h5">Mule Ears Consulting</Type>
                  <Spacing />
                  <Type paragraph variant="body2">
                    Camille has been working at the intersection of biomass
                    utilization and forest restoration for a decade. Some
                    examples of the breadth of her experience include biomass
                    and wood product facility development, supporting forest
                    landowners with Dixie Fire recovery, and not-so tirelessly
                    coaching skidder operators on how to properly install water
                    bars. She has a Master of Forestry degree from Oregon State,
                    works as a forester for a logging company in Plumas County,
                    and supports biomass and forest-health related initiatives
                    locally and regionally through her company Mule Ears
                    Consulting.
                  </Type>
                </Grid>
                <Grid xs={12} sm={5}>
                  <Image
                    width={1880}
                    height={2062}
                    alt="Camille Swezy"
                    src="https://pcwa.imgix.net/pcwa-net/energy/biomass/speaker-bio/Camille%20headshot.jpg"
                    style={{width: '100%', height: 'auto', objectFit: 'cover'}}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}
