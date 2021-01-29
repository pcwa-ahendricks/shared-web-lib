// cspell:ignore SSJRBS Cosumnes Subbasins USBR EDCWA brickards Rickards anickel
import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import PageTitle from '@components/PageTitle/PageTitle'
import {
  Typography as Type,
  TypographyProps,
  Box,
  useMediaQuery,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemProps,
  ListItemTextProps,
  ListItemAvatarProps,
  Link,
  makeStyles,
  createStyles,
  useTheme,
  Theme
} from '@material-ui/core'
import Spacing from '@components/boxes/Spacing'
import DoneIcon from '@material-ui/icons/Done'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import EventIcon from '@material-ui/icons/Event'
import NoCollapseVerticalTimeline from '@components/NoCollapseVerticalTimeline/NoCollapseVerticalTimeline'
import {
  VerticalTimelineElement,
  VerticalTimelineElementProps
} from 'react-vertical-timeline-component'
import {lightBlue} from '@material-ui/core/colors'
import alpha from 'color-alpha'
import {ChildBox, ColumnBox, RowBox} from '@components/boxes/FlexBox'
import MediaDialogOnClick from '@components/MediaDialogOnClick/MediaDialogOnClick'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import ARBSSidebar from '@components/ARBSSidebar/ARBSSidebar'
import WideContainer from '@components/containers/WideContainer'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bulletLi: {
      listStyleType: 'disc',
      marginBottom: 2
    },
    verticalTimelineBar: {
      position: 'absolute',
      top: 0,
      left: 'calc(50% - 12px)',
      height: '100%',
      width: 4,
      background: theme.palette.grey['100']
    },
    timeline: {
      '& .vertical-timeline-element': {
        margin: `${theme.spacing(4)}px 0`,
        '& .vertical-timeline-element-icon': {
          zIndex: 2, // Icon should appear over call-out arrow tips if and when overlap occurs
          width: 36, // defaults to 60px
          height: 36, // defaults to 60px
          top: 15 // defaults to 0
        },
        [`${theme.breakpoints.down('sm')}`]: {
          '& .vertical-timeline-element-icon': {
            width: 28, // defaults to 60px
            height: 28 // defaults to 60px
          }
        },
        '& .vertical-timeline-element-content': {
          paddingTop: theme.spacing(2),
          paddingBottom: theme.spacing(2)
        },
        '& .vertical-timeline-element-content .vertical-timeline-element-date': {
          top: 12 // defaults to 6px
        }
      },
      '&.vertical-timeline--two-columns': {
        '& .vertical-timeline-element-content .vertical-timeline-element-date': {
          paddingRight: theme.spacing(1)
        }
      }
      // '&:not(.vertical-timeline--two-columns)': {
      //   '& $verticalTimelineBar': {
      //     display: 'none'
      //   }
      // }

      // '& .vertical-timeline-element:first-child': {
      //   marginTop: 0
      // },
      // '& .vertical-timeline-element:last-child': {
      //   marginBottom: 0
      // }
    },
    listItemText: {
      paddingLeft: theme.spacing(4)
    },
    listItemAvatar: {
      width: 100
    },
    // See note below regarding global styling and css specificity.
    timelineTitle: {
      marginTop: 0
    }
  })
)

const ARBSPage = () => {
  const classes = useStyles()
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))

  const TypeBullet = ({children, ...rest}: TypographyProps<'li'>) => {
    return (
      <Type component="li" className={classes.bulletLi} {...rest}>
        {children}
      </Type>
    )
  }
  const mapImageUrl =
    'https://cosmicjs.imgix.net/421bc920-6b37-11e7-860a-a98685e05496-AmRiver_Basin_Study_Area_20160609.jpg'
  const mapImageAlt = 'Map of American River Basin Study Area'

  const ListItemAnchor = ({
    children,
    ...rest
  }: {children: React.ReactNode} & ListItemProps<'a', {button?: true}>) => {
    return (
      <ListItem
        component="a"
        button
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
      </ListItem>
    )
  }

  const LIText = ({
    children,
    ...rest
  }: {children?: React.ReactNode} & ListItemTextProps) => {
    return (
      <ListItemText
        disableTypography
        classes={{root: classes.listItemText}}
        {...rest}
      >
        {/* Using a div here will help with padding-left property for wrapping text. */}
        <Type component="div">{children}</Type>
      </ListItemText>
    )
  }

  const LIAvatar = ({
    children,
    ...rest
  }: {children: React.ReactNode} & ListItemAvatarProps) => {
    return (
      <ListItemAvatar classes={{root: classes.listItemAvatar}} {...rest}>
        {children}
      </ListItemAvatar>
    )
  }

  const TimelineElement = ({
    children,
    date,
    title,
    typographyProps,
    completed = false,
    ...rest
  }: {
    children?: React.ReactNode
    date: string
    title: string
    completed?: boolean
    typographyProps?: TypographyProps
  } & VerticalTimelineElementProps) => {
    return (
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date={date}
        iconStyle={{
          background: completed
            ? theme.palette.secondary.main
            : theme.palette.grey['500'],
          color: theme.palette.common.white
        }}
        icon={completed ? <DoneIcon /> : <EventIcon />}
        contentStyle={{
          background: alpha(lightBlue['50'], 0.4),
          color: theme.palette.text.primary
        }}
        contentArrowStyle={{
          borderRight: `7px solid  ${alpha(lightBlue['50'], 0.6)}`
        }}
        {...rest}
      >
        <Type
          variant="h5"
          className="vertical-timeline-element-title"
          classes={{h5: classes.timelineTitle}}
          {...typographyProps}
        >
          {title}
        </Type>
        {children}
      </VerticalTimelineElement>
    )
  }

  return (
    <PageLayout title="American River Basin Study" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle title="American River Basin Study" subtitle="Planning" />

          <RowBox responsive flexSpacing={4}>
            <ChildBox>
              <ARBSSidebar />
            </ChildBox>
            <ChildBox>
              <Type id="background" variant="h3" gutterBottom color="primary">
                Background
              </Type>
              <Type paragraph>
                Water managers in the American River Basin continue to
                experience a growing imbalance between water demands and water
                supply due to a variety of factors, including population growth;
                increased regulatory requirements; changes in Central Valley
                Project (CVP) operations; inadequate infrastructure; and lack of
                interagency planning necessary to address emerging climate
                change conditions, and increasingly intense and more frequent
                extreme events (droughts and floods).
              </Type>
              <Type paragraph>
                The U.S. Department of the Interior, Bureau of Reclamation
                (Reclamation) recently completed the Sacramento and San Joaquin
                Rivers Basin Study (SSJRBS) (March 2016). The SSJRBS forecasts
                the potential impacts of climate change on water supply, water
                quality and critical habitat within California’s Central Valley.
                The 60,000 square mile study area for the SSJRBS encompasses all
                main tributaries within the Central Valley as well as the
                Sacramento-San Joaquin Delta (Delta), the largest estuary on the
                west coast of North America. The SSJRBS outlines potential
                impacts over a range of possible future climate conditions on
                various natural resources and presents portfolios of broad
                adaptive strategies for consideration by water agencies and
                other interests.
              </Type>
              <Type paragraph>
                The purpose of the American River Basin Study (ARBS or Study) is
                to refine and update the data, tools, analyses, and adaptation
                strategies in the SSJRBS for the American River Basin.
                Specifically, the ARBS will update the SSJRBS to reflect
                basin-specific, integrated water management strategies to
                improve regional water supply reliability within the American
                River Basin, while improving the Reclamation’s flexibility in
                operating Folsom Reservoir to meet flow and water quality
                standards and protect endangered fishery species in the lower
                American River.
              </Type>
              <Type paragraph>
                The ARBS will present a holistic examination of water management
                practices to address significant recent changes in conditions
                and regulatory requirements related to the CVP and regional
                water management, including Biological Opinions for endangered
                fishery species protection, the State’s Sustainable Groundwater
                Management Act, and the science of climate change.
              </Type>

              <Spacing size="large" />
              <Type id="objectives" variant="h3" gutterBottom color="primary">
                Basin Study Objectives
              </Type>
              <Type paragraph>
                Under the “new normal” of a changing climate, the ARBS will
                improve the resolution of regional climate change data and
                develop regionally-specific mitigation and adaptation
                strategies, building on those identified in the SSJRBS. The ARBS
                will:
              </Type>
              <ul>
                <TypeBullet>
                  Further refine an assessment of water supplies and demands for
                  the American River Basin over the data developed for the
                  SSJRBS.
                </TypeBullet>
                <TypeBullet>
                  Address regional demand-supply imbalance and infrastructure
                  deficiencies under the threat of climate change.
                </TypeBullet>
                <TypeBullet>
                  Improve regional self-reliance and collaboration for
                  sustainable water resources management and quality of life.
                </TypeBullet>
                <TypeBullet>
                  Integrate regional water supply reliability with operational
                  flexibility for Reclamation’s Folsom Dam and Reservoir to help
                  meet all authorized purposes of the CVP.
                </TypeBullet>
                <TypeBullet>
                  Align regional water management strategies and planning
                  efforts with those of Reclamation.
                </TypeBullet>
              </ul>
              <Type paragraph>
                The ARBS will address the following specifically required Basin
                Study elements:
              </Type>
              <ul>
                <TypeBullet>
                  Develop projections of future water supply and demand in the
                  basin, including an assessment of risk to the water supply
                  relating to climate change as defined in Section 9503(b)(2) of
                  the SECURE Water Act.
                </TypeBullet>
                <TypeBullet>
                  Analyze how existing water and power infrastructure and
                  operations will perform in the face of changing water
                  realities and other impact identified in Section 9503(b)(3) of
                  the SECURE Water Act, including the ability to deliver water;
                  hydroelectric power generation; recreation; fish and wildlife
                  habitat; applicable species listed as endangered, threatened,
                  or candidate species and/or designated critical habitat under
                  the Endangered Species Act of 1973; water quality issues
                  (including salinity levels); flow and water dependent
                  ecological resiliency; and flood control and/or management.
                </TypeBullet>
                <TypeBullet>
                  Develop appropriate adaptation and mitigation strategies to
                  meet future water demands.
                </TypeBullet>
                <TypeBullet>
                  Complete a trade-off analysis of the identified options,
                  including an analysis of all options in terms of their
                  relative cost, environmental impact, risk, stakeholder
                  response, or other common attributes.
                </TypeBullet>
              </ul>
              <Type paragraph>
                The ARBS will provide a unique opportunity to align the water
                management strategies and planning efforts of the region with
                those of Reclamation and the CVP, and Study Partners are
                committed to pursuing integrated water management solutions that
                benefit all parties.
              </Type>

              <Spacing size="large" />
              <Type id="study-area" variant="h3" gutterBottom color="primary">
                Description of Study Area
              </Type>
              <Type paragraph>
                The American River is one of four major tributaries to the
                Sacramento River. Figure 1-1 shows the Study Area – the American
                River Basin – that is bounded by the Bear River to the north,
                the Cosumnes River to the south, the Sierra Nevada mountain
                range to the east, and the Feather and Sacramento Rivers to the
                west. The Study Area encompasses two parts:
              </Type>
              <ul>
                <TypeBullet>
                  <strong>American River Watershed</strong> – This watershed
                  covers 2,140 square miles from Sacramento to the peaks of the
                  northern Sierra Nevada mountains west of Lake Tahoe. Areas
                  outside of the watershed that are served by Study Partners
                  with American River water are also included in the Study Area.
                </TypeBullet>
                <TypeBullet>
                  <strong>North and South Groundwater Subbasins</strong> – These
                  two groundwater basins in the west side of the Study area are
                  separated by the American River, and their eastern boundary
                  represents the approximate edge of the alluvial basin, where
                  little or no groundwater flows into or out of the groundwater
                  basins from the Sierra Nevada basement rock. In addition to
                  surface water from the American River, local water agencies
                  use groundwater for their water supply needs.
                </TypeBullet>
              </ul>

              <ChildBox flex={{xs: 'auto', sm: '0 1 70%'}}>
                <ColumnBox alignItems="center">
                  <MediaDialogOnClick
                    mediaUrl={mapImageUrl}
                    mediaName={mapImageAlt}
                  >
                    <LazyImgix
                      src={mapImageUrl}
                      imgixParams={{border: '1,AAAAAA'}}
                      htmlAttributes={{
                        alt: mapImageAlt,
                        style: {
                          width: '100%',
                          cursor: !isXs ? 'pointer' : 'default'
                        }
                      }}
                    />
                  </MediaDialogOnClick>
                  <Box mt={1}>
                    <Type variant="caption">
                      Figure 1-1. American River Basin Study Area Map
                    </Type>
                  </Box>
                </ColumnBox>
              </ChildBox>

              <Spacing size="large" />

              <Type id="partners" variant="h3" gutterBottom color="primary">
                Cost-Share Partners
              </Type>

              <Box bgcolor={theme.palette.common.white} boxShadow={1} p={4}>
                <Type paragraph>
                  The ARBS is a joint effort between Reclamation and six
                  non-Federal cost-sharing partners (non-Federal Partners).
                  Non-Federal Partners include:
                </Type>
                <List>
                  <ListItemAnchor href="https://www.usbr.gov">
                    <LIAvatar>
                      <LazyImgix
                        htmlAttributes={{
                          alt:
                            'U.S. Department of the Interior, Bureau of Reclamation logo'
                        }}
                        src="https://imgix.cosmicjs.com/02c6cf90-31a5-11ea-96a7-8146ec741192-bor.png"
                      />
                    </LIAvatar>
                    <LIText
                      // inset
                      primary="U.S. Department of the Interior, Bureau of Reclamation (USBR)"
                    />
                  </ListItemAnchor>
                  <ListItemAnchor href="https://www.pcwa.net">
                    <LIAvatar>
                      <LazyImgix
                        htmlAttributes={{
                          alt: 'Placer County Water Agency logo'
                        }}
                        src="https://imgix.cosmicjs.com/05c801a0-31a5-11ea-96a7-8146ec741192-pcwa.png"
                      />
                    </LIAvatar>
                    <LIText primary="Placer County Water Agency (PCWA)" />
                  </ListItemAnchor>
                  <ListItemAnchor href="https://www.roseville.ca.us/">
                    <LIAvatar>
                      <LazyImgix
                        htmlAttributes={{
                          alt: 'City of Roseville logo'
                        }}
                        src="https://imgix.cosmicjs.com/083c35f0-31a5-11ea-96a7-8146ec741192-cor.png"
                      />
                    </LIAvatar>
                    <LIText primary="City of Roseville (Roseville)" />
                  </ListItemAnchor>
                  <ListItemAnchor href="https://www.cityofsacramento.org">
                    <LIAvatar>
                      <LazyImgix
                        htmlAttributes={{
                          alt: 'City of Sacramento logo'
                        }}
                        src="https://imgix.cosmicjs.com/0abd89a0-31a5-11ea-96a7-8146ec741192-cos.jpg"
                      />
                    </LIAvatar>
                    <LIText primary="City of Sacramento (Sacramento)" />
                  </ListItemAnchor>
                  <ListItemAnchor href="https://www.edcgov.us/Water">
                    <LIAvatar>
                      <LazyImgix
                        htmlAttributes={{
                          alt: 'El Dorado County Water Agency logo'
                        }}
                        src="https://imgix.cosmicjs.com/0d083cf0-31a5-11ea-96a7-8146ec741192-edcwapadded.png"
                      />
                    </LIAvatar>
                    <LIText primary="El Dorado County Water Agency (EDCWA)" />
                  </ListItemAnchor>
                  <ListItemAnchor href="https://www.folsom.ca.us">
                    <LIAvatar>
                      <LazyImgix
                        htmlAttributes={{
                          alt: 'City of Folsom logo'
                        }}
                        src="https://imgix.cosmicjs.com/0ee5d690-31a5-11ea-96a7-8146ec741192-cof.png"
                      />
                    </LIAvatar>
                    <LIText primary="City of Folsom (Folsom)" />
                  </ListItemAnchor>
                  <ListItemAnchor href="https://rwah2o.org/">
                    <LIAvatar>
                      <LazyImgix
                        htmlAttributes={{
                          alt: 'Regional Water Authority logo'
                        }}
                        src="https://imgix.cosmicjs.com/10e5ec50-31a5-11ea-96a7-8146ec741192-rwablue.jpg"
                      />
                    </LIAvatar>
                    <LIText primary="Regional Water Authority (RWA)" />
                  </ListItemAnchor>
                </List>
              </Box>

              <Spacing size="large" />
              <Type
                id="participation"
                variant="h3"
                gutterBottom
                color="primary"
              >
                Public and Stakeholder Participation
              </Type>
              <Type paragraph>
                The ARBS will seek to be open and inclusive and to encourage
                diverse viewpoints. The Study Partners will be seeking broad
                stakeholder and public participation at key points during the
                ARBS development process. Stakeholders and interested members of
                the public can be notified of public meetings/workshops via the
                ARBS Web site, or elect to sign up for email notifications here.{' '}
                <Link href="mailto:brickards@pcwa.net">
                  “Request to join ARBS Stakeholder distribution list.”
                </Link>{' '}
                Email distribution will be an important tool to keep interested
                stakeholders and the public informed on ARBS progress, timing of
                deliverables, and opportunities for input (e.g., public
                meetings/workshops).
              </Type>
              <Type paragraph>
                In an effort to maximize public outreach, news/press releases
                will be developed and issued by the Study Partners at key points
                in the ARBS process, including:
              </Type>
              <ul>
                <TypeBullet>Initiation of ARBS development.</TypeBullet>
                <TypeBullet>Major ARBS milestones.</TypeBullet>
                <TypeBullet>Completion of the Draft ARBS Report.</TypeBullet>
                <TypeBullet>Completion of the Final ARBS Report.</TypeBullet>
                <TypeBullet>
                  Notification of Public Meetings/Workshops.
                </TypeBullet>
              </ul>
              <Type paragraph>
                The Study Partners intend to hold public meetings/workshops at
                key points during development of the ARBS for informational
                purposes and to solicit feedback/input. These meetings/workshops
                will be publicized with news/press releases, email
                notifications, Web site postings, targeted invitations, and/or
                other methods (as appropriate). If interested, please contact
                the Project Manager for the next Public Meeting.
              </Type>
              <Spacing size="large" />
              {/* [TODO] Using any <h(*)/> in <article/> will be styled via GlobalStyles. Prevent this by not including timeline in <article/>. It's possible css specificity can rectify this issue.  */}
              <Type id="timeline" variant="h3" gutterBottom color="primary">
                Study Timeline
              </Type>
              <Box bgcolor={theme.palette.common.white} boxShadow={1}>
                <NoCollapseVerticalTimeline
                  layout="2-columns"
                  className={classes.timeline}
                >
                  <Box className={classes.verticalTimelineBar} />
                  <TimelineElement
                    date="October 2016"
                    title="Begin Study"
                    completed
                    // contentStyle={{background: 'rgb(33, 150, 243)', color: '#fff'}}
                    // contentArrowStyle={{
                    //   borderRight: '7px solid  rgb(33, 150, 243)'
                    // }}
                    // iconStyle={{background: 'rgb(33, 150, 243)', color: '#fff'}}
                  >
                    {/* <h4 className="vertical-timeline-element-subtitle">
                  Subtitle
                </h4> */}
                    {/* <p>
                  ...
                </p> */}
                  </TimelineElement>
                  <TimelineElement
                    completed
                    date="June 2017"
                    title="Complete Governance"
                  />
                  <TimelineElement
                    completed
                    date="October 2019"
                    title="Complete Climate Change Data & Model Development"
                  />
                  <TimelineElement
                    completed
                    date="October 2019"
                    title="Complete Water Supply & Demand Projections"
                  />
                  <TimelineElement
                    completed
                    date="January 2020"
                    title="Develop & Evaluate Adaptation Strategies"
                  />
                  <TimelineElement
                    completed
                    date="March 2020"
                    title="Findings & Recommendations"
                  />
                  <TimelineElement
                    completed
                    date="April 2020"
                    title="Final Technical Sufficiency Review"
                  />
                  <TimelineElement
                    date="June 2020"
                    title="USBR Sufficiency Review"
                  />
                  <TimelineElement
                    date="October 2020"
                    title="Publish Final Report"
                  />
                  <TimelineElement
                    date="December 2020"
                    title="Finalize Report"
                  />

                  <VerticalTimelineElement
                    iconStyle={{
                      background: theme.palette.primary.main,
                      color: theme.palette.common.white
                    }}
                    icon={<MenuBookIcon />}
                  />
                </NoCollapseVerticalTimeline>
              </Box>

              <Spacing size="large" />
              <Type variant="h3" gutterBottom color="primary">
                Contact Information - Co-Study Managers
              </Type>
              <Box bgcolor={theme.palette.common.white} boxShadow={1} p={4}>
                <RowBox
                  responsive
                  justifyContent="space-around"
                  flexSpacing={2}
                >
                  <ChildBox>
                    <Type variant="subtitle1">Brian Rickards</Type>
                    <Type
                      variant="subtitle2"
                      color="textSecondary"
                      gutterBottom
                    >
                      Project Manager
                    </Type>
                    <Type variant="body2" paragraph>
                      PCWA <br />
                      144 Ferguson Road <br />
                      Auburn, California 95604 <br />
                      (530) 823-4845 <br />
                      <Link href="mailto:brickards@pcwa.net">
                        brickards@pcwa.net
                      </Link>
                    </Type>
                  </ChildBox>
                  <ChildBox>
                    <Type variant="subtitle1">Ankur Bhattacharya</Type>
                    <Type
                      variant="subtitle2"
                      color="textSecondary"
                      gutterBottom
                    >
                      Title XVI and Basin Study Program Coordinator, <br />
                    </Type>
                    <Type variant="body2" paragraph>
                      Reclamation <br />
                      Mid-Pacific Regional Office <br />
                      2800 Cottage Way <br />
                      Sacramento, California 95825-1898 <br />
                      (916) 978-5348 <br />
                      <Link href="mailto:ankurbhattacharya@usbr.gov">
                        ankurbhattacharya@usbr.gov
                      </Link>
                    </Type>
                  </ChildBox>
                </RowBox>
              </Box>
            </ChildBox>
          </RowBox>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export default ARBSPage
