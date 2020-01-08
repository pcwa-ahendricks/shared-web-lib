// cspell:ignore Bonnynook Glenview Knutson hknutson kshively
import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import PageTitle from '@components/PageTitle/PageTitle'
import WideContainer from '@components/containers/WideContainer'
import {
  RowBox,
  ChildBox,
  ChildBoxProps,
  ColumnBox
} from '@components/boxes/FlexBox'
import {
  useTheme,
  makeStyles,
  createStyles,
  Theme
} from '@material-ui/core/styles'
import {
  Typography as Type,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemProps,
  Link,
  useMediaQuery,
  Box
} from '@material-ui/core'
import ConstructionProject from '@components/ConstructionProject/ConstructionProject'
import Spacing from '@components/boxes/Spacing'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import MediaDialogOnClick from '@components/MediaDialogOnClick/MediaDialogOnClick'
import DownloadIcon from '@material-ui/icons/GetApp'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItem: {
      paddingTop: theme.spacing(1) / 2,
      paddingBottom: theme.spacing(1) / 2
    },
    inlineFlex: {
      display: 'inline-flex'
    }
  })
)
const ProjectsPage = () => {
  const margin = 4 // Used with left and top margin of flexWrap items.
  const theme = useTheme()
  const classes = useStyles()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))

  const itemFlex = `1 0 calc(50% - ${theme.spacing(4)}px)`

  const ProjectChild = ({children}: ChildBoxProps) => {
    return (
      <ChildBox mt={margin} flex={itemFlex}>
        {children}
      </ChildBox>
    )
  }

  const TimelineListItem = ({children}: ListItemProps) => {
    return (
      <ListItem disableGutters className={classes.listItem}>
        {children}
      </ListItem>
    )
  }

  return (
    <PageLayout title="Construction Projects" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle title="Construction Projects" subtitle="General" />
          <RowBox flexWrap="wrap" flexSpacing={margin} mt={-margin}>
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
                    The project will consist of replacing the existing 4” steel
                    distribution water main within Cable Road, Alta Power House
                    Road, and Timber (red line). The main has experienced
                    several breaks throughout the years and is at the end of its
                    useful life. The pipe that goes from Brown Road south east
                    through several properties to Alta Bonnynook Road may be
                    replaced by installing a main in Alta Power House Road
                    (yellow line). All existing services will be replaced and/or
                    reconnected.
                  </Type>
                  <Type paragraph>
                    A new water main (green) will also be installed along Cable
                    Road beginning at the intersection of Cable Road and Timber
                    Lane going east connecting to the existing 10” distribution
                    main at the east end of Cable Road. A pressure reducing
                    station (PRS) will be included to connect two distinct
                    pressure zones. The purpose of the new line is to increase
                    the reliability of service by providing redundancy to a
                    portion of the system.
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
                    elevations, existing site improvements, etc.). This includes
                    locating and identifying trees by tagging them with a unique
                    ID tag.
                  </Type>
                  <Type gutterBottom>
                    <em>Can I remove tree tags?</em>
                  </Type>
                  <Type paragraph>
                    No please don’t; these will be critical through the design
                    phase to accurately map the trees on the plans and identify
                    them in the field during construction.
                  </Type>
                  <Type gutterBottom>
                    <em>Will new fire hydrants be added?</em>
                  </Type>
                  <Type paragraph>
                    Currently, hydrants are spaced more than 1,000 feet apart in
                    this area. PCWA standards call for hydrants to be spaced at
                    a maximum of 500 feet for residential areas, 350 feet for
                    commercial and industrial areas. This will require the
                    construction of new hydrants.
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
                      mediaUrl="https://cosmic-s3.imgix.net/0a9e0040-16b5-11ea-a8c4-6b69c807b1d7-Alta-Loop-Pipeline-Map-Figure.png"
                      mediaName="Map Figure of Alta Loop Pipeline Project"
                    >
                      <LazyImgix
                        src="https://cosmic-s3.imgix.net/0a9e0040-16b5-11ea-a8c4-6b69c807b1d7-Alta-Loop-Pipeline-Map-Figure.png"
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
                    The purpose of the Foothill Raw Water Pipeline Phase 2
                    Project is to give the Placer County Water Agency (PCWA) the
                    ability to deliver raw water from the American River to the
                    Foothill Water Treatment Plant (WTP) independently of the
                    normal supply of raw water from PG&E’s South Canal and allow
                    the transfer of treated drinking water from the future Ophir
                    WTP to the Foothill WTP. The project gives PCWA a means for
                    supplementing the current PG&E raw water allotment to meet
                    its expanding service area demands for both raw and treated
                    water.
                  </Type>
                  <Type paragraph>
                    This phase of the project includes a raw water pipeline and
                    treated water pipeline that connects to existing pipelines
                    located south of I-80, then traverse south, primarily on
                    private property, crossing Indian Hill Road and Glenview
                    Road, before traveling along Powerhouse Road and terminating
                    at the Foothill WTP. The project is scheduled to begin
                    construction in Winter of 2019/2020 and take approximately
                    21 months to complete.
                  </Type>
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
                      mediaUrl="https://cosmic-s3.imgix.net/ad5af780-16f5-11ea-a594-a170ead8b2cb-Foothill-Pipeline-Alignment-Figure-Figure-3.png"
                      mediaName="Map Figure of Foothill Raw Water Pipeline Phase 2 Project"
                    >
                      <LazyImgix
                        src="https://cosmic-s3.imgix.net/ad5af780-16f5-11ea-a594-a170ead8b2cb-Foothill-Pipeline-Alignment-Figure-Figure-3.png"
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
                          href="https://cosmic-s3.imgix.net/6b388000-3ead-11e9-b946-75ef47721136-Foothill-Pipeline-Alignment-Figure-Figure-3.pdf?dl=Foothill-Pipeline-Alignment_Figure-3.pdf"
                        >
                          download pdf
                          <ColumnBox
                            component="span"
                            justifyContent="center"
                            pl={0.5}
                          >
                            <DownloadIcon color="inherit" fontSize="inherit" />
                          </ColumnBox>
                        </Link>
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
                    The Lake Alta Dam project is a multi-year project to address
                    regulation changes since the two Lake Alta dams were
                    installed. Originally constructed for mining activities in
                    the 1850’s, the dams have been in continuous service ever
                    since. This facility is an important component of PCWA’s
                    water delivery system, and this project will ensure lake
                    levels, vegetation, and drainage comply with current
                    regulatory requirements. See below for document links for
                    this project.
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
                    design of improvements to the dams is anticipated in 2019.
                    Any future construction work will proceed upon completion of
                    design and regulatory approvals.
                  </Type>
                  <Type variant="subtitle1" gutterBottom>
                    Latest Update
                  </Type>
                  <Type paragraph>
                    PCWA removed dead and dying trees in 2017 the vicinity of
                    the dams to comply with direction from the California
                    Division of Safety of Dams (DSOD). In winter of 2018/2019
                    PCWA will collect bore samples from each of the dams. These
                    sample will be analyzed and incorporated into the design of
                    future dam improvements.
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
          </RowBox>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export default ProjectsPage