import React, {CSSProperties, useCallback, useState} from 'react'
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
  Button,
  Divider,
  ButtonGroup
} from '@mui/material'
import Spacing from '@components/boxes/Spacing'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import NavigatePrevIcon from '@mui/icons-material/NavigateBefore'
import WideContainer from '@components/containers/WideContainer'
import dynamic from 'next/dynamic'
import useLinkComponent from '@hooks/useLinkComponent'
import ImageThumbLink from '@components/ImageThumbLink/ImageThumbLink'
import Link from '@components/Link'
const ReactPdfPage = dynamic(
  () => import('@components/PDFPage/ReactPdfSinglePage'),
  {
    ssr: false
  }
)

export default function BiomassSupplyPage() {
  const LinkComponent = useLinkComponent({
    target: '_blank',
    rel: 'noopener noreferrer'
  })

  const speakerImgStyle: CSSProperties = {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
    maxWidth: '50vw',
    marginBottom: '16px' // adds a extra space when bios contain photos (note, <Image/> doesn't use mui 8x spacing)
  }

  const [agendaPg, setAgendaPg] = useState(1)

  const nextPgClickHandler = useCallback(() => {
    setAgendaPg(2)
  }, [])

  const prevPgClickHander = useCallback(() => {
    setAgendaPg(1)
  }, [])

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
      <MainBox sx={{maxWidth: '100%', overflow: 'hidden'}}>
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
                    href="https://pcwa.sfo3.cdn.digitaloceanspaces.com/pcwa-net/energy/biomass/speaker-slides/OPR%20Cal%20FRAME%20Woody%20Feedstock%20Pilots%20Overviewby%20Michael%20Maguire.pptx"
                  >
                    <ListItemText primary="OPR Cal FRAME Woody Feedstock Pilots Overview by Michael Maguire (PPT, 7 MB)" />
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
                    href="https://pcwa.sfo3.cdn.digitaloceanspaces.com/pcwa-net/energy/biomass/speaker-slides/A%20Look%20Ahead%20for%20Cal%20FRAME%20in%20the%20Tahoe-Central%20Sierra%20by%20Christiana%20Darlington.pptx"
                  >
                    <ListItemText primary="A Look Ahead for Cal FRAME in the Tahoe-Central Sierra by Christiana Darlington (PPT, 13 MB)" />
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
                  sx={{boxShadow: 'rgba(16, 36, 94, 0.09) 0px 30px 40px 0px'}}
                >
                  <Box
                    component={LinkComponent}
                    href="https://pcwa.sfo3.cdn.digitaloceanspaces.com/pcwa-net/energy/biomass/2024_Biomass_Symposium_Final_Agenda.pdf"
                  >
                    <ReactPdfPage
                      slotProps={{
                        DocumentProps: {
                          loading: <></>
                        }
                      }}
                      url="https://pcwa.sfo3.digitaloceanspaces.com/pcwa-net/energy/biomass/2024_Biomass_Symposium_Final_Agenda.pdf"
                    />
                  </Box>
                  <ButtonGroup
                    variant="text"
                    aria-label="Basic button group"
                    fullWidth
                  >
                    <Button
                      tabIndex={-1}
                      startIcon={<NavigatePrevIcon />}
                      fullWidth
                      onClick={prevPgClickHander}
                      disabled={agendaPg === 1}
                    >
                      Prev
                    </Button>
                    <Button
                      tabIndex={-1}
                      endIcon={<NavigateNextIcon />}
                      fullWidth
                      onClick={nextPgClickHandler}
                      disabled={agendaPg === 2}
                    >
                      Next
                    </Button>
                  </ButtonGroup>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Spacing factor={2} />
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
          <Spacing factor={2} />

          <Box>
            <Type variant="h3" color="primary">
              Speakers
            </Type>
            <Spacing />
            <Box>
              <Grid container columnSpacing={8}>
                <Grid xs={12} sm={8}>
                  <Type variant="h4" gutterBottom>
                    Joshua Alpine
                  </Type>
                  <Type variant="h5">PCWA Board Director, District 5</Type>
                  <SpeakerBioDivider />
                  <Type paragraph variant="body2">
                    Elected in November 2012 to the PCWA Board of Directors, Mr.
                    Alpine represents{' '}
                    <Type variant="inherit" component="span" noWrap>
                      District 5
                    </Type>
                    . This extends eastward from Auburn to Lake Tahoe and the
                    Nevada state line. Mr. Alpine is a community leader. He
                    served ten years on the Colfax City Council, including two
                    terms as mayor. He works as an Electric Transmission System
                    Operator.
                  </Type>
                </Grid>
                <Grid xs={12} sm={4}>
                  {}
                </Grid>
              </Grid>
            </Box>
            <Spacing />
            <Box>
              <Grid container columnSpacing={8}>
                <Grid xs={12} sm={8}>
                  <Type variant="h4" gutterBottom>
                    Lori Parlin
                  </Type>
                  <Type variant="h5">
                    El Dorado County Supervisor of District 4
                  </Type>
                  <SpeakerBioDivider />
                  <Type paragraph variant="body2">
                    Lori Parlin is the El Dorado County Supervisor of District
                    IV, which is the northern portion of the county and includes
                    communities such as Georgetown, Cool, Coloma, Shingle
                    Springs, and more. Prior to taking office in 2019, Lori was
                    a community advocate in the county and that has served her
                    well as a Board member when facing tough decisions.
                  </Type>
                </Grid>
                <Grid xs={12} sm={4}>
                  {}
                </Grid>
              </Grid>
            </Box>
            <SpeakerDivider />

            <Box>
              <Grid container columnSpacing={8}>
                <Grid xs={12} sm={8}>
                  <Type variant="h4" gutterBottom>
                    Tom Ivy
                  </Type>
                  <Type variant="h5">
                    Grass Valley Planning Commission and Grass Valley Council
                    Member
                  </Type>
                  <SpeakerBioDivider />
                  <Type paragraph variant="body2">
                    Tom runs a small, efficiency-minded, general and plumbing
                    contracting business out of Grass Valley, originally started
                    by his father. Born and raised in Nevada County, with some
                    years spent at UC Santa Cruz and working in Seattle, he’s
                    still taken with his home in western Nevada County. He was
                    appointed to the Grass Valley Planning Commission in 2018
                    and then elected to the Grass Valley City Council in 2020.
                    As a Council member, his most recent efforts are bringing
                    Pioneer Community Energy to Grass Valley and expanding and
                    preserving the Loma Rica Trail Network. His wife and young
                    child, their garden, walking or biking through their local
                    natural areas and parks and more are the things that light
                    up his life lately...
                  </Type>
                </Grid>
                <Grid xs={12} sm={4}>
                  {}
                </Grid>
              </Grid>
            </Box>
            <SpeakerPanelDivider />
            <Box>
              <Grid container columnSpacing={8}>
                <Grid xs={12} sm={8}>
                  <Type variant="h4" gutterBottom>
                    Steve Monaghan
                  </Type>
                  <Type variant="h5">
                    Director, Information and General Services Agency, Nevada
                    County
                  </Type>
                  <SpeakerBioDivider />
                  <Type paragraph variant="body2">
                    As Director of the Information and General Services Agency
                    for Nevada County, Steve oversees nine county business
                    lines, including Information Systems, Public Library System,
                    Airport, and Emergency Services, managing an annual budget
                    of over $25M and a staff of 120. Recognized for his
                    leadership in technology, he has received numerous awards,
                    including California CIO of the Year and the Visionary Award
                    for IT Leadership. Under his tenure, Nevada County has
                    consistently ranked high in technology excellence. Steve's
                    passion lies in building high-performing, effective
                    organizations. He holds a Bachelor's Degree in Computer
                    Science, a minor in Business Administration, and several
                    industry certifications. Prior to public service, he was a
                    managing partner in a private IT consulting firm.
                  </Type>
                </Grid>
                <Grid xs={12} sm={4}>
                  <Image
                    sizes="(max-width: 600px) 95vw, 40vw"
                    width={1952}
                    height={2439}
                    alt="Steve Monaghan"
                    loader={imgixUrlLoader}
                    src="https://pcwa.imgix.net/pcwa-net/energy/biomass/speaker-bio/Stephen%20Monaghan.jpg"
                    style={{
                      ...speakerImgStyle
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
            <SpeakerDivider />
            <Box>
              <Grid container columnSpacing={8}>
                <Grid xs={12} sm={8}>
                  <Type variant="h4" gutterBottom>
                    Mark Egbert
                  </Type>
                  <Type variant="h5">
                    District Manager, El Dorado & Georgetown Divide RCD
                  </Type>
                  <SpeakerBioDivider />
                  <Type paragraph variant="body2">
                    Mark Egbert is an experienced Resource Management Specialist
                    and has over 25 years of experience working with all levels
                    of government and community. As a native of El Dorado
                    County, he provides guidance on planning, policy,
                    administration, program development, and technical
                    assistance for programs ranging from k-12 education to
                    landscape scale watershed management programs. His
                    experience in a multitude of areas including Dam
                    Remediation, Soil and Water Resource Management, Forest
                    Landscape Restoration Programs, Environmental Education,
                    Coordinated Resource Planning, Ecological Monitoring and
                    Assessment, Community Based Resource Management, and Biomass
                    Utilization
                  </Type>
                </Grid>
                <Grid xs={12} sm={4}>
                  <Image
                    sizes="(max-width: 600px) 95vw, 40vw"
                    width={294}
                    height={337}
                    alt="Mark Egbert"
                    loader={imgixUrlLoader}
                    src="https://pcwa.imgix.net/pcwa-net/energy/biomass/speaker-bio/Mark%20Egbert%20Headshot.JPG"
                    style={{
                      ...speakerImgStyle
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
          <SpeakerDivider />
          <Box>
            <Grid container columnSpacing={8}>
              <Grid xs={12} sm={8}>
                <Type variant="h4" gutterBottom>
                  Josh Huntsinger
                </Type>
                <Type variant="h5">
                  Director of Agriculture, Parks, and Natural Resources, Placer
                  County
                </Type>
                <SpeakerBioDivider />
                <Type paragraph variant="body2">
                  Josh, inspired by his farming grandparents and relatives,
                  pursued agriculture through high school and college, working
                  on various farms. He graduated from Cal Poly, San Luis Obispo,
                  with a B.S. in Fruit Science in 2000 and started his career at
                  the Placer County Agriculture Department, rising to Director
                  of Agriculture, Parks, and Natural Resources in 2023. His
                  department oversees pesticide regulation, consumer protection,
                  invasive species prevention, and park management, among other
                  responsibilities. As an active member of the California
                  Agricultural Commissioners and Sealers Association Josh has
                  served as chair of the Sacramento Valley Area Group, chair of
                  the Specifications & Tolerances Committee, chair of Personnel
                  Standards and the Exam Review Subcommittee, chair of the
                  Cannabis Work Group, VP of Agriculture and currently serves as
                  chair of CACASA’s Legislative Committee.
                </Type>
              </Grid>
              <Grid xs={12} sm={4}>
                {}
              </Grid>
            </Grid>
          </Box>

          <SpeakerPanelDivider />
          <Box>
            <Grid container columnSpacing={8}>
              <Grid xs={12} sm={8}>
                <Type variant="h4" gutterBottom>
                  Matt Dias
                </Type>
                <Type variant="h5">President/CEO at Calforests</Type>
                <SpeakerBioDivider />
                <Type paragraph variant="body2">
                  Matt Dias, President/CEO of the California Forestry
                  Association (Calforests) graduated from Humboldt State
                  University in 1999, after which time he worked within the
                  forest products sector for nearly 13 years. In 2012 Matt was
                  appointed to staff the Board of Forestry and Fire Protection
                  and served as the Executive Officer for 6 years. He has served
                  as the President/CEO of Calforests since July of 2021. Matt is
                  Registered Professional Forester #2773.
                </Type>
              </Grid>
              <Grid xs={12} sm={4}>
                <Image
                  sizes="(max-width: 600px) 95vw, 40vw"
                  width={3209}
                  height={4806}
                  alt="Matt Dias"
                  loader={imgixUrlLoader}
                  src="https://pcwa.imgix.net/pcwa-net/energy/biomass/speaker-bio/Matt%20Dias.jpg"
                  style={{
                    ...speakerImgStyle
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <SpeakerDivider />
          <Box>
            <Grid container columnSpacing={8}>
              <Grid xs={12} sm={8}>
                <Type variant="h4" gutterBottom>
                  Jamie Jones
                </Type>
                <Type variant="h5">
                  Executive Director, Fire Safe Council of Nevada County
                </Type>
                <SpeakerBioDivider />
                <Type paragraph variant="body2">
                  Jamie Jones, Executive Director of the Fire Safe Council of
                  Nevada County, is a native of Nevada City, California. Jamie
                  holds degrees in Computer Information Systems, Business
                  Management, and Accounting. After fifteen years’ experience in
                  creating financial plans, training and operational programs,
                  and managing corporate expansion for national brands in
                  diverse markets, she returned to Nevada County with her
                  family. In addition to professional accomplishments, Jamie
                  also gave back to the community by managing the local little
                  league program for 5 years and remains active in other youth
                  programs. Her experience as an NASM Certified Personal
                  Trainer, with a specialty in adaptive exercise for injury and
                  disability, prepared her well for a remarkable recovery from
                  injuries resulting from a devastating head-on collision with a
                  wrong-way drunk driver. This passion for recovery and safety
                  drives her commitment to community outreach when discussing
                  wildfire prevention and preparedness. Jamie’s diverse
                  background has provided a rich field of experience and
                  perspectives to draw from, and are foundational to her unique
                  vantage point, leadership style, and adaptability to differing
                  organizational structures.
                </Type>
              </Grid>
              <Grid xs={12} sm={4}>
                {}
              </Grid>
            </Grid>
          </Box>
          <SpeakerDivider />
          <Box>
            <Grid container columnSpacing={8}>
              <Grid xs={12} sm={8}>
                <Type variant="h4" gutterBottom>
                  John McCarthy
                </Type>
                <Type variant="h5">Cal Fire, Wood products and Bioenergy</Type>
                <SpeakerBioDivider />
                <Type paragraph variant="body2">
                  John is a Registered Professional Forester and the Program
                  Manager for Wood Products and Bioenergy at the California
                  Department of Forestry and Fire Protection. In this role he
                  supports new and expanding businesses that generate and
                  utilize forest biomass and the continuing development of the
                  forestry workforce. John earned a Bachelor of Science in
                  Forestry from the University of California at Berkeley and a
                  Master of Business Administration from the California State
                  University at Chico.
                </Type>
              </Grid>
              <Grid xs={12} sm={4}>
                <Image
                  sizes="(max-width: 600px) 95vw, 40vw"
                  width={530}
                  height={648}
                  alt="John Mccarthy"
                  loader={imgixUrlLoader}
                  src="https://pcwa.imgix.net/pcwa-net/energy/biomass/speaker-bio/John%20Mccarthy.jpg"
                  style={{
                    ...speakerImgStyle
                  }}
                />
              </Grid>
            </Grid>
          </Box>

          <SpeakerPanelDivider />

          <Box>
            <Grid container columnSpacing={8}>
              <Grid xs={12} sm={8}>
                <Type variant="h4" gutterBottom>
                  Chris Quijano
                </Type>
                <Type variant="h5">
                  Director of Operations, IHI Power Services Corp.
                </Type>
                <SpeakerBioDivider />
                <Type paragraph variant="body2">
                  With over 17 years of experience in the biomass power
                  generation industry, Chris has served in various roles such as
                  Control Room Operator, Instrumentation, Controls and
                  Electrical Technician, Maintenance Manager, Plant Manager and
                  Operations Project Manager. In his current role as Director of
                  Operations, he oversees the overall profitable management of
                  plant operations, safety, compliance, and maintenance of
                  assigned power generations facilities. Working with Plant
                  Management teams, Chris contributes to the development and
                  implementation of operational and organizational strategies,
                  policies, and practices as it relates to the plant operations.
                  Chris is also a part of the IPSC Government Affairs team. He
                  recently transitioned his responsibilities as a board member
                  on the California Biomass Energy Alliance. Chris is a council
                  member and plays an active role in the IPSC Diversity,
                  Inclusion and Respect council.
                </Type>
              </Grid>
              <Grid xs={12} sm={4}>
                <Image
                  sizes="(max-width: 600px) 95vw, 40vw"
                  width={3267}
                  height={4901}
                  alt="Chris Quijano"
                  loader={imgixUrlLoader}
                  src="https://pcwa.imgix.net/pcwa-net/energy/biomass/speaker-bio/Chris%20Quijano.jpg"
                  style={{
                    ...speakerImgStyle
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <SpeakerDivider />

          <Box>
            <Grid container columnSpacing={8}>
              <Grid xs={12} sm={8}>
                <Type variant="h4" gutterBottom>
                  Mark Shaffer
                </Type>
                <Type variant="h5">Fuel Manager, Honey Lake Power Company</Type>
                <SpeakerBioDivider />
                <Type paragraph variant="body2">
                  Mark is a California Registered Professional Forester # 2485,
                  with over 34 years of experience in the field of Forest
                  Management. His experience includes writing and administering
                  California Timber Harvest Plans, Logging Administration for
                  private and Forest Service contracts, and Biomass Fuel
                  Procurement for HL Power Company from 2011 to 2019. He was
                  recently re-hired in March and is enjoying being back in the
                  position. Mark and his wife, Dorinda have 3 children, all
                  successfully raised and out of the house. Spending time
                  outdoors hiking, fishing and exploring in their side-by-side
                  is a big priority, although many years of deferred maintenance
                  on the family homestead often requires that they forego these
                  hobbies and fix things that are broken.
                </Type>
              </Grid>
              <Grid xs={12} sm={4}>
                <Image
                  sizes="(max-width: 600px) 95vw, 40vw"
                  width={362}
                  height={272}
                  alt="Mark Shaffer"
                  loader={imgixUrlLoader}
                  src="https://pcwa.imgix.net/pcwa-net/energy/biomass/speaker-bio/Mark%20Shaffer.jpg"
                  style={{
                    ...speakerImgStyle
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <SpeakerDivider />
          <Box>
            <Grid container columnSpacing={8}>
              <Grid xs={12} sm={8}>
                <Type variant="h4" gutterBottom>
                  Jim Turner
                </Type>
                <Type variant="h5">
                  Director of Operations-Tahoe Forest Products
                </Type>
                <SpeakerBioDivider />
                <Type paragraph variant="body2">
                  Jim started his career at Sierra Pacific Industries and during
                  the 35 year stint worked on both the lumber production side
                  and all bioenergy sites. As a site lumber operations manager
                  at the Loyalton, CA facility, he was responsible for all
                  phases of production from raw material procurement to finished
                  lumber products. From 2001 to 2019 his career with Sierra
                  Pacific was focused on biomass boilers and power generation at
                  all company operations. He worked on several greenfield
                  projects and brownfield sawmill operations production upgrades
                  in California, Oregon, and Washington as Sierra Pacific
                  expanded operations. He also consulted on sawmill/boiler
                  operations improvements for Georgia Pacific, Boise Cascade,
                  Greenleaf, Trinity River, Roseburg, and Weyerhauser. Jim has
                  extensive experience and education in mechanical process
                  design, electrical engineering, boiler
                  thermodynamics/emissions, and lumber manufacturing. The
                  current project at Tahoe Forest Products-Carson City is a
                  greenfield sawmill startup utilizing a combination of
                  rebuilt-used machinery and modern process controls technology.
                  The operation started continuous production March 11, 2024.
                </Type>
              </Grid>
              <Grid xs={12} sm={4}>
                {}
              </Grid>
            </Grid>
          </Box>

          <SpeakerPanelDivider />

          <Box>
            <Grid container columnSpacing={8}>
              <Grid xs={12} sm={8}>
                <Type variant="h4" gutterBottom>
                  Les Day
                </Type>
                <Type variant="h5">New Business, Mountain F. Enterprises</Type>
                <SpeakerBioDivider />
                <Type paragraph variant="body2">
                  Hollis W. Day, commonly known as Les, is the Corporate Safety
                  Director at Mountain F. Enterprises, a leading utility tree
                  company specializing in line clearance and logging services.
                  With over 30 years of experience in the forestry industry, Les
                  holds an A.S. Degree in Forestry from Sierra College and has
                  studied Forest Production at Humboldt State University. Les is
                  a certified arborist and safety professional deeply committed
                  to advancing safety and sustainability in forestry operations.
                  He is the Task Chair of the Electrical Hazard section for the
                  ANSI Z133 Committee and a Utility Arborist Association Safety
                  Committee member. His comprehensive expertise spans safety
                  management, auditing, training, and policy development,
                  particularly in environments where regulatory compliance is
                  paramount. Les is also involved in managing the redevelopment
                  of Mount Lassen Power and Butte Renewable Energy, playing an
                  instrumental role in business development. At MFE, he has been
                  pivotal in navigating the challenges of biomass market
                  fluctuations and promoting sustainable forest management
                  practices. His dedication to enhancing the utilization of
                  forest biomass residuals has positioned MFE as a pioneer in
                  environmental stewardship within the forestry sector.
                </Type>
              </Grid>
              <Grid xs={12} sm={4}>
                <Image
                  sizes="(max-width: 600px) 95vw, 40vw"
                  width={640}
                  height={640}
                  alt="Les Day"
                  loader={imgixUrlLoader}
                  src="https://pcwa.imgix.net/pcwa-net/energy/biomass/speaker-bio/Les%20Day%20Pic.jpg"
                  style={{
                    ...speakerImgStyle
                  }}
                />
              </Grid>
            </Grid>
          </Box>

          <SpeakerDivider />
          <Box>
            <Grid container columnSpacing={8}>
              <Grid xs={12} sm={8}>
                <Type variant="h4" gutterBottom>
                  Madison Thompson
                </Type>
                <Type variant="h5">Lands Manager, The CHY Company</Type>
                <SpeakerBioDivider />
                <Type paragraph variant="body2">
                  Madison Thomson is a Registered Professional Forester
                  (RPF#2947) with over 16 years of experience managing
                  timberlands throughout Northern California. Madison is
                  responsible for managing the CHY Company’s real estate assets
                  including ~13,000 acres of timberland spread throughout
                  Northern California. Madison also provides consulting forestry
                  services to select clients in the region through an affiliated
                  forestry consulting business called Applied Forest Management.
                  Madison has extensive experience designing and managing
                  implementation of fuels reduction and forest health treatments
                  with an emphasis on projects in the central Sierra Nevada
                  region. Madison is acting as the project coordinator for the
                  Yuba Foothills Healthy Forest Project and New Bullards Bar
                  2023 Forest Health Project, multi-landowner collaborative
                  forest health and fuels reduction projects spanning
                  approximately 8,000 acres in the Yuba County foothills. Nearly
                  5000 acres have been treated through these projects since 2020
                  with approximately 30,000 bone dry tons of chips delivered to
                  biomass power plants in the region. Madison has a BS in
                  Forestry from UC Berkeley and prior to joining CHY/Applied
                  Forest Management in 2019 spent 11 years managing timberlands
                  in coastal Mendocino and Sonoma counties.
                </Type>
              </Grid>
              <Grid xs={12} sm={4}>
                <Image
                  sizes="(max-width: 600px) 95vw, 40vw"
                  width={1908}
                  height={1069}
                  alt="Madison Thompson"
                  loader={imgixUrlLoader}
                  src="https://pcwa.imgix.net/pcwa-net/energy/biomass/speaker-bio/Madison%20Picture.jpg"
                  style={{
                    ...speakerImgStyle
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <SpeakerDivider />
          <Box>
            <Grid container columnSpacing={8}>
              <Grid xs={12} sm={8}>
                <Type variant="h4" gutterBottom>
                  Joe Griggs
                </Type>
                <Type variant="h5">Robinson Enterprises</Type>
                <SpeakerBioDivider />
                <Type paragraph variant="body2">
                  Joe's work experience began with a summer job at Robinson
                  Enterprises (REI) in 1974. After being officially hired and
                  starting his first logging job in March 1978, he took a break
                  to attend college and work summer jobs at Southern Pacific
                  Land Company. Joe earned a Business Administration degree from
                  Chico State University and returned to REI, where he served as
                  a logging foreman from 1985 to 1994. In 1995, he began
                  management training, eventually becoming the logging manager.
                  Currently, Joe focuses on the logging and forest road
                  division, working with the younger generation of leaders to
                  promote active management on national forest lands.
                </Type>
              </Grid>
              <Grid xs={12} sm={4}>
                {}
              </Grid>
            </Grid>
          </Box>

          <SpeakerPanelDivider />

          <Box>
            <Grid container columnSpacing={8}>
              <Grid xs={12} sm={8}>
                <Type variant="h4" gutterBottom>
                  Carl Rudeen
                </Type>
                <Type variant="h5">
                  Geospatial Analysist, Spatial Informatics Group
                </Type>
                <SpeakerBioDivider />
                <Type paragraph variant="body2">
                  Carl joined the SIG team after 13 years working for the U.S.
                  Air Force. He brings significant experience as a biologist,
                  project manager, and program manager. He has worked
                  extensively in the high-deserts of the Pacific Northwest and
                  subtropical forests of Okinawa, Japan. Notable among his
                  strengths and experiences are his analysis of spatial natural
                  resources datasets to make management decisions and knowledge
                  of post-fire rehabilitation of rangelands. Carl worked for the
                  Upper Salmon Basin Watershed Project prior to working for the
                  Air Force. There he worked with local ranchers to implement
                  salmon and steelhead conservation projects on private lands.
                  In addition to working with SIG, Carl is currently helping to
                  operate his family’s ranch in southeastern Idaho. Carl’s
                  education includes B.S. degrees in Wildlife Resources and
                  Rangeland Ecology and Management from the University of Idaho,
                  Post-baccalaureate Certificate in GIS from Pennsylvania State
                  University, and M.S. degree in Geographic Information Science
                  from Idaho State University.
                </Type>
              </Grid>
              <Grid xs={12} sm={4}>
                {}
              </Grid>
            </Grid>
          </Box>

          <SpeakerDivider />
          <Box>
            <Grid container columnSpacing={8}>
              <Grid xs={12} sm={8}>
                <Type variant="h4" gutterBottom>
                  Rob Lawson
                </Type>
                <Type variant="h5">
                  Planscape Go-to-market and Partnership Lead, SIG
                </Type>
                <SpeakerBioDivider />
                <Type paragraph variant="body2">
                  Rob leads partnerships and go-to-market strategy for
                  Planscape, the decision support tool for wildfire resilience.
                  He was part of the founding Planscape team while working at
                  Google.org, the non-profit arm of Google, where he spent 5
                  years building business messaging products. Rob trained as an
                  engineer and has extensive experience growing disruptive
                  companies through products, partnerships, sales, and
                  marketing. A citizen of both the US and the UK, Rob lives in
                  Sonoma County and enjoys the natural world, beekeeping,
                  aspiring to be a farmer and riding bicycles in the sunshine.
                </Type>
              </Grid>
              <Grid xs={12} sm={4}>
                {}
              </Grid>
            </Grid>
          </Box>
          <SpeakerDivider />
          <Box>
            <Grid container columnSpacing={8}>
              <Grid xs={12} sm={8}>
                <Type variant="h4" gutterBottom>
                  Camille Swezy
                </Type>
                <Type variant="h5">Mule Ears Consulting</Type>
                <SpeakerBioDivider />
                <Type paragraph variant="body2">
                  Camille has been working at the intersection of biomass
                  utilization and forest restoration for a decade. Some examples
                  of the breadth of her experience include biomass and wood
                  product facility development, supporting forest landowners
                  with Dixie Fire recovery, and not-so tirelessly coaching
                  skidder operators on how to properly install water bars. She
                  has a Master of Forestry degree from Oregon State, works as a
                  forester for a logging company in Plumas County, and supports
                  biomass and forest-health related initiatives locally and
                  regionally through her company Mule Ears Consulting.
                </Type>
              </Grid>
              <Grid xs={12} sm={4}>
                <Image
                  sizes="(max-width: 600px) 95vw, 40vw"
                  width={1880}
                  height={2062}
                  alt="Camille Swezy"
                  loader={imgixUrlLoader}
                  src="https://pcwa.imgix.net/pcwa-net/energy/biomass/speaker-bio/Camille%20headshot.jpg"
                  style={{
                    ...speakerImgStyle
                  }}
                />
              </Grid>
            </Grid>
          </Box>

          <SpeakerPanelDivider />

          <Box>
            <Grid container columnSpacing={8}>
              <Grid xs={12} sm={8}>
                <Type variant="h4" gutterBottom>
                  Martin Twer
                </Type>
                <Type variant="h5">
                  Biomass Program Director, The Watershed Center
                </Type>
                <SpeakerBioDivider />
                <Type paragraph variant="body2">
                  Martin Twer is the Biomass Program Director for the Watershed
                  Research and Training Center, a non-profit organization that
                  promotes sustainable forest management and rural economic
                  development embedded in the natural and working lands of
                  California. Trained as an economist and landscape ecologist,
                  he is among the state's leading experts on wood products and
                  forest biomass utilization. He supports state-wide efforts to
                  increase utilization of forest biomass removed from forest
                  restoration and hazardous fuels reduction projects by
                  increasing awareness, establishing or expanding markets, and
                  accelerating adoption of new or modified technologies and
                  systems for forest health work in fire-prone landscapes. His
                  expertise includes renewable energy, advanced wood building
                  materials, scalable wood processing technologies, integrated
                  wood product campus development, and diverse value-added
                  products and production systems. Martin was born and raised in
                  Germany where he graduated with an advanced degree in
                  Landscape Ecology before moving to Montana in 2002. He holds
                  an MS degree in Resource Conservation and Forestry from the
                  University of Montana and following a decade as Bioenergy
                  Associate Specialist with the Cooperative Extension Service in
                  Montana, he now lives, works, and plays in the Sierra Nevada.
                </Type>
              </Grid>
              <Grid xs={12} sm={4}>
                {}
              </Grid>
            </Grid>
          </Box>
          <SpeakerDivider />
          <Box>
            <Grid container columnSpacing={8}>
              <Grid xs={12} sm={8}>
                <Type variant="h4" gutterBottom>
                  Christiana Darlington
                </Type>
                <Type variant="h5">Lawyer and Owner, CLERE INC</Type>
                <SpeakerBioDivider />
                <Type paragraph variant="body2">
                  A native of South Lake Tahoe, Christiana has a longstanding
                  dedication to innovations that respect our forests and other
                  natural resources. Her career in law began when she clerked
                  for the Alaska Court System, and then served as a Deputy
                  County Counsel in both Mono and Placer Counties, where she
                  worked with the California Environmental Quality Act and sat
                  as counsel for both Planning Commissions. She also served for
                  City of Sacramento as Code Enforcement Deputy City Attorney,
                  and has worked with US Park Service, the State of California
                  and several special districts. Comfortable in urban, suburban
                  and rural communities, she understands the local government
                  perspective, and is dedicated to supporting government action
                  that improves air quality and tackles climate change issues
                  with an emphasis on how bioenergy can achieve carbon
                  neutrality.
                </Type>
              </Grid>
              <Grid xs={12} sm={4}>
                {}
              </Grid>
            </Grid>
          </Box>
          <SpeakerDivider />
          <Box>
            <Grid container columnSpacing={8}>
              <Grid xs={12} sm={8}>
                <Type variant="h4" gutterBottom>
                  Sam Uden
                </Type>
                <Type variant="h5">
                  Director of Climate and Energy Policy, Conservation Strategy
                  Group
                </Type>
                <SpeakerBioDivider />
                <Type paragraph variant="body2">
                  Sam Uden is the Director of Climate and Energy Policy at
                  Conservation Strategy Group, an environmental policy firm
                  based in Sacramento. CSG is supported by climate philanthropy
                  to develop policies to help achieve the state's emissions
                  reduction goals. Biomass policy is one area that CSG has
                  focused on for the past 5 years.
                </Type>
              </Grid>
              <Grid xs={12} sm={4}>
                {}
              </Grid>
            </Grid>
          </Box>
          <SpeakerDivider />
          <Box>
            <Grid container columnSpacing={8}>
              <Grid xs={12} sm={8}>
                <Type variant="h4" gutterBottom>
                  Josiah Hunt
                </Type>
                <Type variant="h5">CEO, Pacific Biochar</Type>
                <SpeakerBioDivider />
                <Type paragraph variant="body2">
                  Josiah Hunt has, since 2008, helped to innovate methods for
                  biochar production, processing, and application in carbon
                  sequestering pathways. He is founder and CEO of Pacific
                  Biochar Benefit Corporation.
                </Type>
              </Grid>
              <Grid xs={12} sm={4}>
                <Image
                  sizes="(max-width: 600px) 95vw, 40vw"
                  width={1908}
                  height={1069}
                  alt="Josiah Hunt"
                  loader={imgixUrlLoader}
                  src="https://pcwa.imgix.net/pcwa-net/energy/biomass/speaker-bio/Josiah%20Hunt%20Headshot.jpg"
                  style={{
                    ...speakerImgStyle
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <SpeakerDivider />

          <Box>
            <Grid container columnSpacing={8}>
              <Grid xs={12} sm={8}>
                <Type variant="h4" gutterBottom>
                  David Lach
                </Type>
                <Type variant="h5">
                  Director of Natural Climate Solutions, Avoided wildfire
                  Emissions
                </Type>
                <SpeakerBioDivider />
                <Type paragraph variant="body2">
                  David Lach serves as Director of Natural Climate Solutions at
                  Anew. Working primarily on ecologically restorative carbon
                  projects, he leads Anew’s forest resilience efforts via the
                  Reduced Emissions from Megafires methodology and has
                  spearheaded the group’s reforestation strategy. David works
                  closely with implementers, agencies, and relevant stakeholders
                  to enable quantification of climate benefits and ultimately
                  generate newfound funding for forest health projects.
                </Type>
              </Grid>
              <Grid xs={12} sm={4}>
                <Image
                  sizes="(max-width: 600px) 95vw, 40vw"
                  width={532}
                  height={855}
                  alt="David Lach"
                  loader={imgixUrlLoader}
                  src="https://pcwa.imgix.net/pcwa-net/energy/biomass/speaker-bio/David%20Lach.jpg"
                  style={{
                    ...speakerImgStyle
                  }}
                />
              </Grid>
            </Grid>
          </Box>

          <SpeakerPanelDivider />

          <Box>
            <Grid container columnSpacing={8}>
              <Grid xs={12} sm={8}>
                <Type variant="h4" gutterBottom>
                  Michael Maguire
                </Type>
                <Type variant="h5">
                  Associate Planner, Wood product Innovation, OPR
                </Type>
                <SpeakerBioDivider />
                <Type paragraph variant="body2">
                  Michael is an Associate Planner for Wood Product Innovation
                  and has been with OPR since 2015. Michael manages the Woody
                  Feedstock Aggregation Pilot Program. In this role, he is
                  responsible for implementing the state’s Forest Sector Market
                  Development initiative as directed under Key Action 3.10 of
                  the Wildfire and Forest Resilience Action Plan. Previously,
                  Michael managed the Wildfire Resilience and Recovery Grant
                  Program, as well as the Biochar Research Advisory Committee as
                  part of the office’s larger wildfire prevention, biomass
                  utilization and forest management portfolio. Michael currently
                  serves as an Advisory Council member for the Joint Institute
                  for Wood Products Innovation at the California Board of
                  Forestry, as well as OPR’s representative on the Wildfire
                  Mitigation Advisory Committee at the California Department of
                  Forestry and Fire Protection. Michael also serves on several
                  working groups under the Wildfire and Forest Resilience Task
                  Force, such as the Risk Modeling Working Group, The Fire
                  Adapted Communities Working Group, and the Wood Utilization
                  Working Group. Michael has a B.A. in Environmental Studies
                  from the University of California at Santa Cruz and an M.S. in
                  Environmental Policy and Management from the University of
                  California at Davis.
                </Type>
              </Grid>
              <Grid xs={12} sm={4}>
                {}
              </Grid>
            </Grid>
          </Box>
          <SpeakerPanelDivider />
          <Box>
            <Grid container columnSpacing={8}>
              <Grid xs={12} sm={8}>
                <Type variant="h4" gutterBottom>
                  Kerri Timmer
                </Type>
                <Type variant="h5">County of Placer</Type>
                <SpeakerBioDivider />
                <Type paragraph variant="body2">
                  Joined Placer County as Regional Forest Health Coordinator in
                  May 202 after spending 14 years in senior management positions
                  with the Sierra Business Council, a non-profit organization
                  headquartered in Truckee, and the Sierra Nevada Conservancy, a
                  state agency headquartered in Auburn. In both organizations
                  Kerri managed strategic and operational planning and
                  implementation activities around climate, energy, and
                  government affairs programs. She was also responsible for
                  inter-agency and stakeholder relationship-building and other
                  liaison work with local, regional, state, and federal
                  officials. Before that she ran her own consulting practice for
                  11 years, providing organizational development and analytical
                  expertise to community-based organizations throughout the
                  Sierra Nevada, as well as spending six years as an account
                  executive for a community and government affairs firm in San
                  Francisco.
                </Type>
              </Grid>
              <Grid xs={12} sm={4}>
                <Image
                  sizes="(max-width: 600px) 95vw, 40vw"
                  width={1551}
                  height={1530}
                  alt="Kerri Timmer"
                  loader={imgixUrlLoader}
                  src="https://pcwa.imgix.net/pcwa-net/energy/biomass/speaker-bio/Kerri%20Timmer%20headshot.pdf"
                  style={{
                    ...speakerImgStyle
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <SpeakerDivider />
          <Box>
            <Grid container columnSpacing={8}>
              <Grid xs={12} sm={8}>
                <Type variant="h4" gutterBottom>
                  Tony Firenzi
                </Type>
                <Type variant="h5">
                  Director of Strategic Affairs, Placer County Water Agency
                </Type>
                <SpeakerBioDivider />
                <Type paragraph variant="body2">
                  Tony Firenzi is a Professional Engineer and Director of
                  Strategic Affairs at Placer County Water Agency (PCWA), where
                  he is responsible for long-range planning and strategic
                  initiatives. He received his bachelor’s and master’s degrees
                  from Colorado State University, where he specialized in River
                  Engineering. After a five year consulting career where he
                  worked on river restoration projects throughout the country,
                  he had a fortunate opportunity to shift into water supply at
                  PCWA. At PCWA, Tony specializes in master planning and
                  partnerships for water supply and infrastructure. He has been
                  central to ensuring the agency’s water supplies through
                  integrated water planning in surface water and groundwater
                  with engagement of non-governmental and environmental
                  organizations. He has been with PCWA since 2003.
                </Type>
              </Grid>
              <Grid xs={12} sm={4}>
                {}
              </Grid>
            </Grid>
          </Box>

          <SpeakerPanelDivider />

          <Box>
            <Grid container columnSpacing={8}>
              <Grid xs={12} sm={8}>
                <Type variant="h4" gutterBottom>
                  Catherine Silvester
                </Type>
                <Type variant="h5">
                  Landmark Consultant and Owner of Point View Environmental
                </Type>
                <SpeakerBioDivider />
                <Type paragraph variant="body2">
                  Catherine Silvester is the owner of Point View Environmental.
                  She has over 17 years of experience in environmental
                  consulting and prepares environmental documentation for fuels
                  thinning and post-fire recovery projects in Northern
                  California.
                </Type>
              </Grid>
              <Grid xs={12} sm={4}>
                {}
              </Grid>
            </Grid>
          </Box>
          <SpeakerDivider />
          <Box>
            <Grid container columnSpacing={8}>
              <Grid xs={12} sm={8}>
                <Type variant="h4" gutterBottom>
                  Amy Lapin
                </Type>
                <Type variant="h5">
                  Economic and Planning Systems, INC. (EPS)
                </Type>
                <SpeakerBioDivider />
                <Type paragraph variant="body2">
                  Since joining EPS in 2003, Amy has helped clients answer key
                  questions to advance sustainable development and public
                  policy. Amy enjoys managing multidisciplinary projects and
                  providing clear solutions based on analytics, policy
                  objectives, and stakeholder input. Amy has completed projects
                  across all of EPS’s lines of business and specializes in
                  unique and challenging assignments. These assignments have
                  included projects such as examining the comprehensive economic
                  impacts of wildfires and critical habitat designations,
                  ensuring the fiscal sustainability of real estate development,
                  and developing creative financing strategies to fund physical
                  infrastructure, public services, and economic revitalization
                  in downtown and infill neighborhood locales. Recently, Amy
                  assisted jurisdictions in understanding the dynamics of their
                  local housing markets, including evaluating socioeconomic
                  trends and regulatory, financial feasibility, and other
                  barriers to achieving desired housing objectives. Drawing on
                  these analyses, Amy has developed targeted strategies to
                  incentivize residential development, support neighborhood
                  stabilization, and minimize gentrification-related
                  displacement. Amy holds a Master’s in Community and Regional
                  Planning from the University of Oregon and a Bachelor of Arts
                  in Economics from Ohio Wesleyan University. Amy is a member of
                  the Urban Land Institute (ULI) and the American Planning
                  Association (APA) and currently serves on the Sacramento Tree
                  Foundation (STF) board. Amy is in her element spending time
                  outside with her family, long-distance running, biking around
                  Sacramento, hiking the plentiful trails of Northern
                  California, and exploring new urban environments.
                </Type>
              </Grid>
              <Grid xs={12} sm={4}>
                <Image
                  sizes="(max-width: 600px) 95vw, 40vw"
                  width={1600}
                  height={1280}
                  alt="Amy Lapin"
                  loader={imgixUrlLoader}
                  src="https://pcwa.imgix.net/pcwa-net/energy/biomass/speaker-bio/Amy%20Lapin.jpg"
                  style={{
                    ...speakerImgStyle
                  }}
                />
              </Grid>
            </Grid>
          </Box>

          <SpeakerPanelDivider />

          <Box>
            <Grid container columnSpacing={8}>
              <Grid xs={12} sm={8}>
                <Type variant="h4" gutterBottom>
                  Elizabeth Betancourt
                </Type>
                <Type variant="h5">
                  Natural and Working Lands Policy Advisor
                </Type>
                <Link href="mailto:Elizabeth.betancout@conservation.ca.gov">
                  Elizabeth.betancout@conservation.ca.gov
                </Link>
                <SpeakerBioDivider />
                <Type paragraph variant="body2">
                  Elizabeth Betancourt has been finding unconventional ways to
                  achieve successes in natural and working lands management,
                  planning, and policy for more than two decades. Her primary
                  focus, currently, is woody biomass utilization to achieve
                  forest health, climate resilience, carbon sequestration, rural
                  sustainability, economic growth, habitat, environment,
                  renewable energy, insurance stability, and public health,
                  goals. Among others. She considers you all colleagues,
                  collaborators, and co-conspirators!
                </Type>
              </Grid>
              <Grid xs={12} sm={4}>
                {}
              </Grid>
            </Grid>
          </Box>
          <SpeakerDivider />
          <Box>
            <Grid container columnSpacing={8}>
              <Grid xs={12} sm={8}>
                <Type variant="h4" gutterBottom>
                  Emily Blackmer
                </Type>
                <Type variant="h5">
                  Policy Analyst, Sierra Nevada Conservancy
                </Type>
                <Link href="mailto:Emily.Blackmer@sierranevada.ca.gov">
                  Emily.Blackmer@sierranevada.ca.gov
                </Link>
                <SpeakerBioDivider />
                <Type paragraph variant="body2">
                  Emily Blackmer works on natural resource and climate policy in
                  California’s Sierra Nevada and Cascade region. She is
                  currently the Policy Analyst for Sierra Nevada Conservancy,
                  acting as a bridge between regional conservation and
                  restoration practitioners and state policymakers. In previous
                  roles, she led a regional climate vulnerability assessment to
                  aid local climate adaptation planning and conducted research
                  on opportunities to build natural stewardship-based economies
                  in the rural West.
                </Type>
              </Grid>
              <Grid xs={12} sm={4}>
                <Image
                  sizes="(max-width: 600px) 95vw, 40vw"
                  width={1500}
                  height={2165}
                  alt="Emily Blackmer"
                  loader={imgixUrlLoader}
                  src="https://pcwa.imgix.net/pcwa-net/energy/biomass/speaker-bio/Emily%20Blackmer_headshot.jpg"
                  style={{
                    ...speakerImgStyle
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <SpeakerDivider />

          <Box>
            <Grid container columnSpacing={8}>
              <Grid xs={12} sm={8}>
                <Type variant="h4" gutterBottom>
                  Katie Harrell
                </Type>
                <Type variant="h5">
                  Joint Institute for Wood Products Innovation
                  <br />
                  California Board of Forestry and Fire Protection
                </Type>
                <Link href="mailto:katie.harrell@bof.ca.gov">
                  katie.harrell@bof.ca.gov
                </Link>
                <SpeakerBioDivider />
                <Type paragraph variant="body2">
                  Katie Harrell has been working on California forest health
                  issues for over 20 years. She is the program administrator for
                  the Board of Forestry and Fire Protection’s Joint Institute
                  for Wood Products Innovation, where she works to provide a
                  forum for information sharing and manages research projects
                  focused on wood and innovative wood products as well as
                  associated issues, with the goal of supporting
                  carbon-beneficial, sustainable forest management in the state.
                  She is quite disappointed she missed out on networking today
                  as she wasn’t able to join us until this afternoon. She
                  welcomes the opportunity to connect with anyone following this
                  session that is interested engaging with the Joint Institute
                  or simply wants to know more about it.
                </Type>
              </Grid>
              <Grid xs={12} sm={4}>
                {}
              </Grid>
            </Grid>
          </Box>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

const SpeakerPanelDivider = () => {
  return (
    <Box sx={{pt: 3, pb: 5}}>
      <Divider variant="middle" sx={{mx: 8}} />
    </Box>
  )
}

const SpeakerDivider = () => {
  return <Spacing />
}

const SpeakerBioDivider = () => {
  return <Spacing size="small" />
}
