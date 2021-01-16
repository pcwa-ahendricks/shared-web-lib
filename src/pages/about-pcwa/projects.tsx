// cspell:ignore Bonnynook Glenview Knutson hknutson kshively Intertie UPRR Shively dsod Hillview
import React, {useCallback} from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import PageTitle from '@components/PageTitle/PageTitle'
import WideContainer from '@components/containers/WideContainer'
import {
  ChildBox,
  ChildBoxProps,
  ColumnBox,
  RowBox
} from '@components/boxes/FlexBox'
import {
  useTheme,
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
  useMediaQuery,
  Box,
  TypographyProps
} from '@material-ui/core'
import ConstructionProject from '@components/ConstructionProject/ConstructionProject'
import Spacing from '@components/boxes/Spacing'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import MediaDialogOnClick from '@components/MediaDialogOnClick/MediaDialogOnClick'
import DownloadIcon from '@material-ui/icons/GetApp'
import ResponsiveYouTubePlayer from '@components/ResponsiveYouTubePlayer/ResponsiveYouTubePlayer'

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
  const theme = useTheme()
  const classes = useStyles()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))

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
      <ChildBox flex="1 1 50%" display="flex" flexDirection="column" {...props}>
        {children}
      </ChildBox>
    )
  }, [])

  const ColumnTwo = useCallback(({children, ...props}) => {
    return (
      <ChildBox flex="1 1 50%" display="flex" flexDirection="column" {...props}>
        {children}
      </ChildBox>
    )
  }, [])

  return (
    <PageLayout title="Construction Projects" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle title="Construction Projects" subtitle="General" />
          <RowBox
            responsive
            flexDirection={{xs: 'column', md: 'row'}}
            flexSpacing={4}
          >
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
                    <ColumnBox alignItems="center">
                      <MediaDialogOnClick
                        mediaUrl="https://imgix.cosmicjs.com/b61ce6a0-a9ba-11ea-a37c-29813b746c00-Hell-Hole-Dam-Core-Raise.jpg"
                        mediaName="Photo of Hell Hole Dam construction"
                      >
                        <LazyImgix
                          src="https://imgix.cosmicjs.com/b61ce6a0-a9ba-11ea-a37c-29813b746c00-Hell-Hole-Dam-Core-Raise.jpg"
                          imgixParams={{border: '1,AAAAAA'}}
                          htmlAttributes={{
                            alt: 'Photo of Hell Hole Dam construction',
                            style: {
                              width: '100%',
                              cursor: !isXs ? 'pointer' : 'default'
                            }
                          }}
                        />
                      </MediaDialogOnClick>
                      <Box mt={1} width="60%" textAlign="center">
                        <Type variant="caption">
                          Hell Hole Dam core raise construction{' '}
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
                      Upcoming Work (updated January 15, 2021)
                    </Type>
                    <Type paragraph>
                      The Contractor will be performing the following
                      construction activities in the next few weeks:
                    </Type>
                    <ul>
                      <TypeBullet>
                        <Type variant="body1">
                          Road closures and traffic delays are anticipated on
                          Powerhouse Road and Sierra Oaks Court. Watch out for
                          advance warning road signs.
                        </Type>
                      </TypeBullet>
                      <TypeBullet>
                        <Type variant="body1">
                          Installation of 33-inch raw water pipe from the Energy
                          Dissipation Station, through Powerhouse Road, and
                          through Sierra Oaks Court.
                        </Type>
                      </TypeBullet>
                      <TypeBullet>
                        <Type variant="body1">
                          Ongoing activities to construct the Energy Dissipation
                          Station at the Foothill Water Treatment Plant,
                          continue installation of roofing, including pouring
                          concrete, and installing trusses.
                        </Type>
                      </TypeBullet>
                      <TypeBullet>
                        <Type variant="body1">
                          Minor activities on the Dutch Ravine Energy
                          Dissipation Structure at PCWA property located on
                          Hillview Lane. Installation of PG&E electrical
                          service, painting canopy and installing canopy roof.
                        </Type>
                      </TypeBullet>
                      <TypeBullet>
                        <Type variant="body1" component="div">
                          Hydraulic Control Standpipe are on hold. Water tank is
                          anticipated to be delivered and erected starting in
                          mid-February.
                        </Type>
                      </TypeBullet>
                      <TypeBullet>
                        <Type variant="body1">
                          Installation of 12-inch treated water pipe at the
                          Foothill Water Treatment plant.
                        </Type>
                      </TypeBullet>
                      <TypeBullet>
                        <Type variant="body1">
                          Continue installation of 39-inch raw water pipe from
                          the Dutch Ravine Turnout to the railroad tracks.
                        </Type>
                      </TypeBullet>
                      <TypeBullet>
                        <Type variant="body1">
                          Modifications to the Ophir Road Pump Station to
                          increase pump pressures to accommodate the project.
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
                    <ColumnBox alignItems="center">
                      <MediaDialogOnClick
                        mediaUrl="https://imgix.cosmicjs.com/ad5af780-16f5-11ea-a594-a170ead8b2cb-Foothill-Pipeline-Alignment-Figure-Figure-3.png"
                        mediaName="Map Figure of Foothill Raw Water Pipeline Phase 2 Project"
                      >
                        <LazyImgix
                          src="https://imgix.cosmicjs.com/ad5af780-16f5-11ea-a594-a170ead8b2cb-Foothill-Pipeline-Alignment-Figure-Figure-3.png"
                          imgixParams={{border: '1,AAAAAA'}}
                          htmlAttributes={{
                            alt:
                              'Map Figure of Foothill Raw Water Pipeline Phase 2 Project',
                            style: {
                              width: '100%',
                              cursor: !isXs ? 'pointer' : 'default'
                            }
                          }}
                        />
                      </MediaDialogOnClick>
                      <Box mt={1} width="60%" textAlign="center">
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
                      </Box>
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
                    <ColumnBox alignItems="center">
                      <MediaDialogOnClick
                        mediaUrl="https://imgix.cosmicjs.com/0a9e0040-16b5-11ea-a8c4-6b69c807b1d7-Alta-Loop-Pipeline-Map-Figure.png"
                        mediaName="Map Figure of Alta Loop Pipeline Project"
                      >
                        <LazyImgix
                          src="https://imgix.cosmicjs.com/0a9e0040-16b5-11ea-a8c4-6b69c807b1d7-Alta-Loop-Pipeline-Map-Figure.png"
                          imgixParams={{border: '1,AAAAAA'}}
                          htmlAttributes={{
                            alt: 'Map Figure of Alta Loop Pipeline Project',
                            style: {
                              width: '100%',
                              cursor: !isXs ? 'pointer' : 'default'
                            }
                          }}
                        />
                      </MediaDialogOnClick>
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
            </ColumnTwo>
          </RowBox>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export default ProjectsPage
