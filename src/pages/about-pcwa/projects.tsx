// cspell:ignore Bonnynook Glenview Knutson hknutson kshively Intertie UPRR Shively dsod Hillview bickford caperton
import React, {useCallback} from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import PageTitle from '@components/PageTitle/PageTitle'
import WideContainer from '@components/containers/WideContainer'
import {ChildBox, ChildBoxProps, ColumnBox, RowBox} from 'mui-sleazebox'
import {
  makeStyles,
  createStyles,
  Theme,
  Typography as Type,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemProps,
  Link,
  Box,
  TypographyProps
} from '@material-ui/core'
import ConstructionProject from '@components/ConstructionProject/ConstructionProject'
import Spacing from '@components/boxes/Spacing'
import MediaDialogOnClick from '@components/MediaDialogOnClick/MediaDialogOnClick'
import DownloadIcon from '@material-ui/icons/GetApp'
import ResponsiveYouTubePlayer from '@components/ResponsiveYouTubePlayer/ResponsiveYouTubePlayer'
import Image from 'next/image'
import {imgixUrlLoader} from '@lib/imageLoader'
import {stringify} from 'querystringify'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItem: {
      paddingTop: theme.spacing(1) / 2,
      paddingBottom: theme.spacing(1) / 2
    },
    inlineFlex: {
      display: 'inline-flex'
    },
    bulletLi: {
      // listStyleType: 'none',
      marginBottom: 3
    }
  })
)
const ProjectsPage = () => {
  // const margin = 4 // Used with left and top margin of flexWrap items.
  const classes = useStyles()

  // const itemFlex = `1 0 calc(50% - ${theme.spacing(4)}px)`

  const ProjectChild = ({children}: ChildBoxProps) => {
    // return <ChildBox mt={margin}>{children}</ChildBox>
    return <ChildBox mt={6}>{children}</ChildBox>
  }

  const TypeBullet = ({children, ...rest}: TypographyProps<'li'>) => {
    return (
      <Type component="li" className={classes.bulletLi} {...rest}>
        {children}
      </Type>
    )
  }

  const TimelineListItem = ({children}: ListItemProps) => {
    return (
      <ListItem disableGutters className={classes.listItem}>
        {children}
      </ListItem>
    )
  }

  const ColumnOne = useCallback(({children, ...props}) => {
    return (
      <ColumnBox child flex="1 1 50%" {...props}>
        {children}
      </ColumnBox>
    )
  }, [])

  const ColumnTwo = useCallback(({children, ...props}) => {
    return (
      <ColumnBox child flex="1 1 50%" {...props}>
        {children}
      </ColumnBox>
    )
  }, [])

  return (
    <PageLayout title="Construction Projects" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle title="Construction Projects" subtitle="General" />
          <RowBox responsive="sm" flexSpacing={4}>
            <ColumnOne>
              <ProjectChild>
                <ConstructionProject>
                  <Type variant="h3" gutterBottom color="primary">
                    Hell Hole Dam Core Raise
                  </Type>
                  <Spacing>
                    <Divider />
                  </Spacing>
                  <article>
                    <Type variant="subtitle1" gutterBottom>
                      Project Description
                    </Type>
                    <Type paragraph>
                      Hell Hole Dam is a zoned rock and earth fill structure,
                      which consists of an impervious clay core that holds back
                      the water; two filter zones (of fine and coarse material)
                      that keep the clay core in place; and rockfill slopes that
                      create a “shell” on both the downstream and upstream
                      sides. PCWA is raising the dam core to permit the
                      installation of a gate on the spillway that will allow us
                      to capture an additional 6 feet of water depth (about
                      6,000 acre-feet) during wet years. Most of the additional
                      water will be released over the spillway in a controlled
                      manner to enhance environmental and recreational flows in
                      the Rubicon River downstream; however, the Agency will be
                      able to use some of the water to increase hydropower
                      generation.
                    </Type>

                    <Spacing />
                    <Type variant="subtitle1" gutterBottom>
                      Project Schedule
                    </Type>
                    <Type paragraph>
                      The project is currently in progress and expected to
                      conclude in October of 2020.
                    </Type>
                    <Spacing />
                    <MediaDialogOnClick
                      mediaUrl="https://imgix.cosmicjs.com/b61ce6a0-a9ba-11ea-a37c-29813b746c00-Hell-Hole-Dam-Core-Raise.jpg"
                      mediaName="Photo of Hell Hole Dam construction"
                      mediaPreviewDialogProps={{
                        width: 900,
                        height: 675
                      }}
                    >
                      <Image
                        loader={imgixUrlLoader}
                        src={`https://imgix.cosmicjs.com/b61ce6a0-a9ba-11ea-a37c-29813b746c00-Hell-Hole-Dam-Core-Raise.jpg${stringify(
                          {border: '1,AAAAAA'},
                          true
                        )}`}
                        alt="Photo of Hell Hole Dam construction"
                        layout="responsive"
                        sizes="(max-width: 600px) 100vw, 45vw"
                        width={900}
                        height={675}
                      />
                    </MediaDialogOnClick>
                    <ColumnBox alignItems="center">
                      <ChildBox mt={1} width="60%" textAlign="center">
                        <Type variant="caption">
                          Hell Hole Dam core raise construction{' '}
                          <em>(click to enlarge)</em>
                        </Type>
                      </ChildBox>
                    </ColumnBox>
                  </article>
                </ConstructionProject>
              </ProjectChild>

              <ProjectChild>
                <ConstructionProject>
                  <Type variant="h3" gutterBottom color="primary">
                    Foothill Raw Water Pipeline Phase 2 Project
                  </Type>
                  <Spacing>
                    <Divider />
                  </Spacing>
                  <article>
                    <Type variant="subtitle1" gutterBottom>
                      About Project
                    </Type>
                    <Type paragraph>
                      This project includes raw water and treated water
                      pipelines that connect to existing pipelines located south
                      of I-80, then traverse south, primarily on private
                      property, crossing Indian Hill Road and Glenview Road,
                      before traveling along Powerhouse Road and terminating at
                      the Foothill WTP.
                    </Type>
                    <Type paragraph>
                      The Foothill Raw Water Pipelines - Phase 2 Project will
                      provide the Placer County Water Agency (PCWA) a means to
                      deliver raw water from the American River to the Foothill
                      Water Treatment Plant (WTP) independently of the normal
                      supply of raw water from PG&E’s South Canal in an
                      emergency or during PG&E’s annual fall outage; when the
                      Agency’s raw water supply is shut down for annual
                      maintenance. The Project includes the ability to transfer
                      treated drinking water from the future Ophir WTP to the
                      Foothill WTP. The project also gives PCWA a means for
                      supplementing the current PG&E raw water allotment to meet
                      its expanding service area demands.
                    </Type>
                    <Spacing />
                    <Box maxWidth={500} mx="auto" width="100%">
                      <ResponsiveYouTubePlayer
                        controls
                        url="https://www.youtube.com/watch?v=ybTD1BBXypc"
                        config={{
                          youtube: {
                            playerVars: {showinfo: 1}
                          }
                        }}
                      />
                    </Box>
                    <Spacing />
                    <Type variant="subtitle1" gutterBottom>
                      Description
                    </Type>
                    <Type paragraph>
                      The Foothill Raw Water Pipelines - Phase 2 project
                      includes two primary components, 1) the completion of the
                      Foothill Raw Water Pipeline and 2) construction of a
                      treated water pipeline and related facilities to deliver
                      treated water from the future Ophir Road Water Treatment
                      Plant to the Agency’s Foothill/Sunset System. The Project
                      consists of:
                    </Type>
                    <ul>
                      <TypeBullet>
                        7,300-feet of 12-inch, 18-inch and 24-inch treated water
                        pipeline
                      </TypeBullet>
                      <TypeBullet>
                        650-feet of 45-inch pipe in Ophir Road and removal of
                        two interties
                      </TypeBullet>
                      <TypeBullet>
                        7,866-feet of 33-inch to 39-inch pipeline from Dutch
                        Ravine to the Foothill WTP, and Standpipe
                      </TypeBullet>
                      <TypeBullet>
                        160-feet of 60-inch casing - open shield pipe jacking –
                        UPRR crossing
                      </TypeBullet>
                      <TypeBullet>
                        Stand pipe overflow, cleaning railroad tunnel, and drain
                      </TypeBullet>
                      <TypeBullet>
                        Energy dissipation structure at Dutch Ravine
                      </TypeBullet>
                      <TypeBullet>
                        Energy dissipation structures at the Foothill WTP
                      </TypeBullet>
                      <TypeBullet>
                        Pump Station Improvements at Ophir Road
                      </TypeBullet>
                      <TypeBullet>Fiber Optic System</TypeBullet>
                      <TypeBullet>
                        12-Inch Intertie at the Newcastle Tank
                      </TypeBullet>
                    </ul>
                    <Spacing />
                    <Type variant="subtitle1" gutterBottom>
                      Project Schedule
                    </Type>
                    <Type paragraph>
                      The project is scheduled to begin construction in February
                      2020 and complete October 2021.
                    </Type>
                    <Type variant="subtitle1">
                      Upcoming Work (updated May 14, 2021)
                    </Type>
                    <Type paragraph>
                      The Contractor will be performing the following
                      construction activities in the next few weeks:
                    </Type>
                    <ul>
                      <TypeBullet>
                        <Type variant="body1">
                          Traffic delays are not anticipated along the
                          construction corridor.
                        </Type>
                      </TypeBullet>
                      <TypeBullet>
                        <Type variant="body1">
                          Pipeline installation and testing anticipated
                          completion is scheduled for mid-May.
                        </Type>
                      </TypeBullet>
                      <TypeBullet>
                        <Type variant="body1">
                          Ongoing activities to construct the Energy Dissipation
                          Station at the Foothill Water Treatment Plant,
                          including installation of the roofing, site grading
                          restoration, fiber conduits, and electrical.
                        </Type>
                      </TypeBullet>
                      <TypeBullet>
                        <Type variant="body1">
                          Continue the erection of the Hydraulic Control
                          Standpipe. The contractor is currently Coating the
                          tank, installing electrical conduits, grading and
                          paving around structure, and building a retaining
                          wall.
                        </Type>
                      </TypeBullet>
                      <TypeBullet>
                        <Type variant="body1" component="div">
                          Continue modifications to the Ophir Road Pump Station
                          to increase pump pressures to accommodate the project.
                          Currently the contractor has shipped pump columns out
                          for coating. Reinstallation of pumps and columns is
                          planned for June 1.
                        </Type>
                      </TypeBullet>
                      <TypeBullet>
                        <Type variant="body1">
                          Continue the installation of the Fiber Optics
                          innerduct, and remaining boxes.
                        </Type>
                      </TypeBullet>
                      <TypeBullet>
                        <Type variant="body1">
                          Start removing debris from the drainage tunnel under
                          UPRRs tracks and start reestablishing drainage from
                          the tunnel to the Dutch Ravine.
                        </Type>
                      </TypeBullet>
                    </ul>
                    <Spacing />
                    <Type variant="subtitle1" gutterBottom>
                      For questions regarding this project, contact:
                    </Type>
                    <Type paragraph>
                      Project Manager / Engineer
                      <br />
                      Heather Knutson
                      <br />
                      Phone: (530) 823-4951
                      <br />
                      E-mail:{' '}
                      <Link href="mailto:hknutson@pcwa.net">
                        hknutson@pcwa.net
                      </Link>
                    </Type>
                    <Spacing size="large" />
                    <MediaDialogOnClick
                      mediaUrl="https://imgix.cosmicjs.com/ad5af780-16f5-11ea-a594-a170ead8b2cb-Foothill-Pipeline-Alignment-Figure-Figure-3.png"
                      mediaName="Map Figure of Foothill Raw Water Pipeline Phase 2 Project"
                      mediaPreviewDialogProps={{
                        width: 700,
                        height: 961
                      }}
                    >
                      <Image
                        loader={imgixUrlLoader}
                        src={`https://imgix.cosmicjs.com/ad5af780-16f5-11ea-a594-a170ead8b2cb-Foothill-Pipeline-Alignment-Figure-Figure-3.png${stringify(
                          {border: '1,AAAAAA'},
                          true
                        )}`}
                        alt="Map Figure of Foothill Raw Water Pipeline Phase 2 Project"
                        layout="responsive"
                        sizes="(max-width: 600px) 100vw, 45vw"
                        width={700}
                        height={961}
                      />
                    </MediaDialogOnClick>
                    <ColumnBox alignItems="center">
                      <ChildBox mt={1} width="60%" textAlign="center">
                        <Type variant="caption">
                          Foothill Raw Water Project Components{' '}
                          <em>(click image to enlarge)</em>
                          <br />
                          <Link
                            className={classes.inlineFlex}
                            noWrap
                            variant="inherit"
                            href="https://imgix.cosmicjs.com/6b388000-3ead-11e9-b946-75ef47721136-Foothill-Pipeline-Alignment-Figure-Figure-3.pdf?dl=Foothill-Pipeline-Alignment_Figure-3.pdf"
                          >
                            download pdf
                            <ColumnBox
                              component="span"
                              justifyContent="center"
                              pl={0.5}
                            >
                              <DownloadIcon
                                color="inherit"
                                fontSize="inherit"
                              />
                            </ColumnBox>
                          </Link>
                        </Type>
                      </ChildBox>
                    </ColumnBox>
                  </article>
                </ConstructionProject>
              </ProjectChild>
            </ColumnOne>
            <ColumnTwo>
              <ProjectChild>
                <ConstructionProject>
                  <Type variant="h3" gutterBottom color="primary">
                    Alta Loop Pipeline – Cable And Powerhouse Rd
                  </Type>
                  <Spacing>
                    <Divider />
                  </Spacing>
                  <article>
                    <Type variant="subtitle1" gutterBottom>
                      Project Description
                    </Type>
                    <Type paragraph>
                      The project will consist of replacing the existing 4”
                      steel distribution water main within Cable Road, Alta
                      Power House Road, and Timber (red line). The main has
                      experienced several breaks throughout the years and is at
                      the end of its useful life. The pipe that goes from Brown
                      Road south east through several properties to Alta
                      Bonnynook Road may be replaced by installing a main in
                      Alta Power House Road (yellow line). All existing services
                      will be replaced and/or reconnected.
                    </Type>
                    <Type paragraph>
                      A new water main (green) will also be installed along
                      Cable Road beginning at the intersection of Cable Road and
                      Timber Lane going east connecting to the existing 10”
                      distribution main at the east end of Cable Road. A
                      pressure reducing station (PRS) will be included to
                      connect two distinct pressure zones. The purpose of the
                      new line is to increase the reliability of service by
                      providing redundancy to a portion of the system.
                    </Type>
                    <Spacing />
                    <Type variant="subtitle1">Project Schedule</Type>
                    <List disablePadding>
                      <TimelineListItem>
                        <ListItemText
                          primary="Survey, geotechnical exploration, and other information gathering
              – 2019"
                        />
                      </TimelineListItem>
                      <TimelineListItem>
                        <ListItemText primary="Design – 2019-2020" />
                      </TimelineListItem>
                      <TimelineListItem>
                        <ListItemText primary="Advertise/Award – Late 2020" />
                      </TimelineListItem>
                      <TimelineListItem>
                        <ListItemText primary="Construction – 2021" />
                      </TimelineListItem>
                    </List>
                    <Spacing />
                    <Type variant="subtitle1" gutterBottom>
                      Frequently Asked Questions (FAQ’s)
                    </Type>
                    <Type gutterBottom>
                      <em>What are surveyors doing in my area?</em>
                    </Type>
                    <Type paragraph>
                      Surveyors will be in the neighborhood to begin work by
                      collecting various points of interest (e.g. meter boxes,
                      elevations, existing site improvements, etc.). This
                      includes locating and identifying trees by tagging them
                      with a unique ID tag.
                    </Type>
                    <Type gutterBottom>
                      <em>Can I remove tree tags?</em>
                    </Type>
                    <Type paragraph>
                      No please don’t; these will be critical through the design
                      phase to accurately map the trees on the plans and
                      identify them in the field during construction.
                    </Type>
                    <Type gutterBottom>
                      <em>Will new fire hydrants be added?</em>
                    </Type>
                    <Type paragraph>
                      Currently, hydrants are spaced more than 1,000 feet apart
                      in this area. PCWA standards call for hydrants to be
                      spaced at a maximum of 500 feet for residential areas, 350
                      feet for commercial and industrial areas. This will
                      require the construction of new hydrants.
                    </Type>
                    <Spacing />
                    <Type variant="subtitle1" gutterBottom>
                      For questions regarding this project, contact:
                    </Type>
                    <Type paragraph>
                      PCWA Associate Engineer
                      <br />
                      Jordan Jakobsen
                      <br />
                      Phone: (530) 823-4950
                      <br />
                      E-mail:{' '}
                      <Link href="mailto:jjakobsen@pcwa.net">
                        jjakobsen@pcwa.net
                      </Link>
                    </Type>
                    <Spacing size="large" />
                    <MediaDialogOnClick
                      mediaUrl="https://imgix.cosmicjs.com/0a9e0040-16b5-11ea-a8c4-6b69c807b1d7-Alta-Loop-Pipeline-Map-Figure.png"
                      mediaName="Map Figure of Alta Loop Pipeline Project"
                      mediaPreviewDialogProps={{
                        width: 700,
                        height: 535
                      }}
                    >
                      <Image
                        loader={imgixUrlLoader}
                        src={`https://imgix.cosmicjs.com/0a9e0040-16b5-11ea-a8c4-6b69c807b1d7-Alta-Loop-Pipeline-Map-Figure.png${stringify(
                          {border: '1,AAAAAA'},
                          true
                        )}`}
                        alt="Map Figure of Alta Loop Pipeline Project"
                        width={700}
                        height={535}
                        layout="responsive"
                        sizes="(max-width: 600px) 100vw, 45vw"
                      />
                    </MediaDialogOnClick>
                    <ColumnBox alignItems="center">
                      <Box mt={1} width="60%" textAlign="center">
                        <Type variant="caption">
                          Map Figure of Alta Loop Pipeline Project{' '}
                          <em>(click to enlarge)</em>
                        </Type>
                      </Box>
                    </ColumnBox>
                  </article>
                </ConstructionProject>
              </ProjectChild>
              <ProjectChild>
                <ConstructionProject>
                  <Type variant="h3" gutterBottom color="primary">
                    Lake Alta Dam Improvements Project
                  </Type>
                  <Spacing>
                    <Divider />
                  </Spacing>
                  <article>
                    <Type variant="subtitle1" gutterBottom>
                      About Project
                    </Type>
                    <Type paragraph>
                      The Lake Alta Dam project is a multi-year project to
                      address regulation changes since the two Lake Alta dams
                      were installed. Originally constructed for mining
                      activities in the 1850’s, the dams have been in continuous
                      service ever since. This facility is an important
                      component of PCWA’s water delivery system, and this
                      project will ensure lake levels, vegetation, and drainage
                      comply with current regulatory requirements. See below for
                      document links for this project.
                    </Type>
                    <Type variant="subtitle1" gutterBottom>
                      Project Location
                    </Type>
                    <Type paragraph>
                      The Lake Alta Dam Safety Project is located in the Town of
                      Alta, near Bonny Nook Drive.
                    </Type>
                    <Type variant="subtitle1" gutterBottom>
                      Construction Timeline
                    </Type>
                    <Type paragraph>
                      Consultants are currently gathering information on-site to
                      be used to design improvements to the dams. Completion of
                      design of improvements to the dams is anticipated in 2020.
                      Any future construction work will proceed upon completion
                      of design and regulatory approvals.
                    </Type>
                    <Type variant="subtitle1" gutterBottom>
                      Latest Update
                    </Type>
                    <Type paragraph>
                      PCWA removed dead and dying trees in 2017 the vicinity of
                      the dams to comply with direction from the California
                      Division of Safety of Dams (DSOD). In winter of 2018/2019
                      PCWA collected bore samples from each of the dams. These
                      samples were analyzed and will be incorporated into design
                      of the necessary improvements.
                    </Type>
                    <Spacing />
                    <Type variant="subtitle1" gutterBottom>
                      For questions regarding this project, contact:
                    </Type>
                    <Type paragraph>
                      Project Manager / Engineer
                      <br />
                      Kelly Shively
                      <br />
                      Phone: (530) 863-8384
                      <br />
                      E-mail:{' '}
                      <Link href="mailto:kshively@pcwa.net">
                        kshively@pcwa.net
                      </Link>
                    </Type>
                  </article>
                </ConstructionProject>
              </ProjectChild>
              <ProjectChild>
                <ConstructionProject>
                  <Type variant="h3" gutterBottom color="primary">
                    Bickford Ranch Phase 1 – Mass Grading
                  </Type>
                  <Spacing>
                    <Divider />
                  </Spacing>
                  <Type variant="subtitle1" gutterBottom>
                    Project Description
                  </Type>
                  <Type paragraph>
                    This Facilities Agreement (FA) Project is being funded and
                    completed by Bickford Ranch Developers (Bickford). Bickford
                    is planning to begin construction on Phase 1 of the Bickford
                    Ranch Community Facility District early in 2021. Part of
                    Phase 1 work involves the relocation and permanent pipe
                    encasement of a portion of the Caperton Canal. Overall,
                    approximately 2,900 linear feet of new 42-inch Raw Water
                    Pipeline and six Customer Turn Outs (CTO) will be
                    constructed and upgraded to encase the portion of the
                    Caperton Canal. Additionally, a temporary and new permanent
                    Inlet and Outlet Structure’s will be constructed, helping to
                    create a more robust canal system at this location.
                  </Type>
                  <Spacing />
                  <Type variant="subtitle1">Project Schedule</Type>
                  <List disablePadding>
                    <TimelineListItem>
                      <ListItemText primary="Design – Complete" />
                    </TimelineListItem>
                    <TimelineListItem>
                      <ListItemText primary="Construction: Caperton Canal Relocation – April 2021 – December 2021" />
                    </TimelineListItem>
                    <TimelineListItem>
                      <ListItemText primary="Construction: Mass Grading  – April 2021 – December 2022" />
                    </TimelineListItem>
                  </List>
                  <Spacing />
                  <Type variant="subtitle1" gutterBottom>
                    Frequently Asked Questions (FAQ’s)
                  </Type>
                  <Type gutterBottom>
                    <em>What is happening to my Customer Turn Out (CTO)?</em>
                  </Type>
                  <Type paragraph>
                    Each CTO within the Project location is being upgraded.
                    Bickford’s contractor will be installing a temporary
                    pipeline and permanent pipeline, which they will reconnect
                    every CTO at each step of construction, making sure that you
                    will continue to receive water.
                  </Type>
                  <Type gutterBottom>
                    <em>
                      Will there be water outages on our CTO’s during this work?
                    </em>
                  </Type>
                  <Type paragraph>
                    Yes. Brief outages are be expected during the work.
                    Customers will be notified of all planned outages ahead of
                    time.
                  </Type>
                  <Type gutterBottom>
                    <em>
                      Who do we contact if we need to visit out CTO and clean
                      the service screens?
                    </em>
                  </Type>
                  <Type paragraph>
                    Customers can contact Gene Mancebo, Project Manager at EGM
                    Solutions and a Bickford representative, at{' '}
                    <Type variant="inherit" noWrap>
                      (209) 969-5631
                    </Type>{' '}
                    or{' '}
                    <Link href="mailto:genemancebo@gmail.com">
                      genemancebo@gmail.com
                    </Link>
                    .
                  </Type>
                  <Type gutterBottom>
                    <em>
                      When will construction of the encased Caperton Canal be
                      complete?
                    </em>
                  </Type>
                  <Type paragraph>
                    It is anticipated that construction for encasing the
                    Caperton Canal will be completed by December 2021.
                  </Type>
                  <Spacing />
                  <Type variant="subtitle1" gutterBottom>
                    If you have any questions regarding the Project, please
                    contact the following PCWA Representative:
                  </Type>
                  <Type paragraph>
                    Mitchell McCarthy
                    <br />
                    Associate Engineer
                    <br />
                    Phone: (530) 863-3889
                    <br />
                    E-mail:{' '}
                    <Link href="mailto:mmccarthy@pcwa.net">
                      mmccarthy@pcwa.net
                    </Link>
                  </Type>
                  <Spacing size="large" />
                  <MediaDialogOnClick
                    mediaUrl="https://imgix.cosmicjs.com/2c213b60-930f-11eb-bd79-3164cb34dd88-2021-01-18ExistingandProposedCanalMap-Layout1.pdf"
                    mediaName="Map Figure of existing and proposed canal layout"
                    mediaPreviewDialogProps={{
                      width: 700,
                      height: 525
                    }}
                  >
                    <Image
                      loader={imgixUrlLoader}
                      src={`https://imgix.cosmicjs.com/2c213b60-930f-11eb-bd79-3164cb34dd88-2021-01-18ExistingandProposedCanalMap-Layout1.pdf${stringify(
                        {border: '1,AAAAAA'},
                        true
                      )}`}
                      alt="Map Figure of existing and proposed canal layout"
                      width={700}
                      height={525}
                      layout="responsive"
                      sizes="(max-width: 600px) 100vw, 45vw"
                    />
                  </MediaDialogOnClick>
                  <ColumnBox alignItems="center">
                    <Box mt={1} width="60%" textAlign="center">
                      <Type variant="caption">
                        Map Figure of Bickford Ranch Phase I - Canal Services{' '}
                        <em>(click to enlarge)</em>
                      </Type>
                    </Box>
                  </ColumnBox>
                </ConstructionProject>
              </ProjectChild>
            </ColumnTwo>
          </RowBox>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export default ProjectsPage
