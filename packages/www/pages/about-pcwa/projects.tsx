// cspell:ignore Bonnynook
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItem: {
      paddingTop: theme.spacing(1) / 2,
      paddingBottom: theme.spacing(1) / 2
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
                    E-mail:
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
            <ProjectChild>bar</ProjectChild>
            <ProjectChild>baz</ProjectChild>
          </RowBox>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export default ProjectsPage
