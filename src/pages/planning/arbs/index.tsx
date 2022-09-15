// cspell:ignore SSJRBS Cosumnes Subbasins USBR EDCWA brickards Rickards anickel
import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import PageTitle from '@components/PageTitle/PageTitle'
import {
  Typography as Type,
  TypographyProps,
  Box,
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
// import DoneIcon from '@material-ui/icons/Done'
// import MenuBookIcon from '@material-ui/icons/MenuBook'
// import EventIcon from '@material-ui/icons/Event'
// import NoCollapseVerticalTimeline from '@components/NoCollapseVerticalTimeline/NoCollapseVerticalTimeline'
// import {
//   VerticalTimelineElement,
//   VerticalTimelineElementProps
// } from 'react-vertical-timeline-component'
// import {lightBlue} from '@material-ui/core/colors'
// import alpha from 'color-alpha'
import {ChildBox, ColumnBox, RowBox} from 'mui-sleazebox'
import MediaDialogOnClick from '@components/MediaDialogOnClick/MediaDialogOnClick'
import ARBSSidebar from '@components/ARBSSidebar/ARBSSidebar'
import WideContainer from '@components/containers/WideContainer'
import imgixLoader from '@lib/imageLoader'
import Image from 'next/image'
import ListBulletItem from '@components/lists/ListBulletItem'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    compactItem: {paddingBottom: 0, paddingTop: 0, marginBottom: -4},
    noBottomMargin: {
      marginBottom: 0
    },
    bulletLi: {
      listStyleType: 'disc',
      marginBottom: 2
    },
    listItemText: {
      paddingLeft: theme.spacing(4)
    },
    listItemAvatarPortrait: {
      '& :first-child': {
        width: 36,
        margin: 'auto !important'
      }
    },
    link: {
      fontFamily: 'dona'
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
        '& .vertical-timeline-element-content .vertical-timeline-element-date':
          {
            top: 12 // defaults to 6px
          }
      },
      '&.vertical-timeline--two-columns': {
        '& .vertical-timeline-element-content .vertical-timeline-element-date':
          {
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
    // See note below regarding global styling and css specificity.
    timelineTitle: {
      marginTop: 0
    }
  })
)

const ARBSPage = () => {
  const classes = useStyles()
  const theme = useTheme()

  const TypeBullet = ({children, ...rest}: TypographyProps<'li'>) => {
    return (
      <Type component="li" className={classes.bulletLi} {...rest}>
        {children}
      </Type>
    )
  }

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
    portrait = false,
    children,
    ...rest
  }: {portrait?: boolean; children: React.ReactNode} & ListItemAvatarProps) => {
    return (
      <ListItemAvatar
        classes={{root: portrait ? classes.listItemAvatarPortrait : undefined}}
        {...rest}
      >
        {children}
      </ListItemAvatar>
    )
  }

  /*
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
  */

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
              <Type id="report" variant="h3" gutterBottom color="primary">
                Final Report
              </Type>
              <Type paragraph>
                The American River Basin Study (ARBS) was released in August
                2022. To view the U.S. Bureau of Reclamation (USBR) press
                release, see{' '}
                <Link
                  href="https://www.usbr.gov/newsroom/news-release/4312"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  American River Basin Study finds that increasing temperatures
                  and changing precipitation will impact basin through rest of
                  21st century
                </Link>
                . For more information about the study, visit the{' '}
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.usbr.gov/watersmart/bsp/arbs/#:~:text=Municipal%20users%20in%20the%20basin%20use%20516%2C000%20acre-feet,change%20adaptation%20strategies%20for%20the%20American%20River%20Basin."
                >
                  USBR's ARBS webpage
                </Link>
                .
              </Type>
              <Spacing />
              <Link
                variant="body1"
                color="primary"
                TypographyClasses={{colorPrimary: classes.link}}
                href="https://docs.pcwa.net/american-river-basin-study-2022_08.pdf"
                rel="noopener noreferrer"
                target="_blank"
              >
                American River Basin Study Report
              </Link>
              <Spacing size="x-small" />
              <List dense disablePadding>
                <ListBulletItem classes={{root: classes.compactItem}}>
                  <ListItemText classes={{root: classes.noBottomMargin}}>
                    <Link
                      variant="body2"
                      color="primary"
                      TypographyClasses={{colorPrimary: classes.link}}
                      href="https://www.usbr.gov/watersmart/bsp/docs/arbs/Appendix%20A_Communic_Outreach.pdf"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Appendix A - Communication and Outreach Activities
                    </Link>
                  </ListItemText>
                </ListBulletItem>
                <ListBulletItem classes={{root: classes.compactItem}}>
                  <ListItemText classes={{root: classes.noBottomMargin}}>
                    <Link
                      variant="body2"
                      color="primary"
                      TypographyClasses={{colorPrimary: classes.link}}
                      href="https://www.usbr.gov/watersmart/bsp/docs/arbs/Appendix%20B_Devel_Future_Climate_Hydro_Scenarios.pdf"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Appendix B - Development of Future Climate and Hydrology
                      Scenarios
                    </Link>
                  </ListItemText>
                </ListBulletItem>
                <ListBulletItem classes={{root: classes.compactItem}}>
                  <ListItemText classes={{root: classes.noBottomMargin}}>
                    <Link
                      variant="body2"
                      color="primary"
                      TypographyClasses={{colorPrimary: classes.link}}
                      href="https://www.usbr.gov/watersmart/bsp/docs/arbs/Appendix%20C_CalSim3_UAR_Module_Doc.pdf"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Appendix C - CalSim 3 Upper American River Module
                      Documentation
                    </Link>
                  </ListItemText>
                </ListBulletItem>
                <ListBulletItem classes={{root: classes.compactItem}}>
                  <ListItemText classes={{root: classes.noBottomMargin}}>
                    <Link
                      variant="body2"
                      color="primary"
                      TypographyClasses={{colorPrimary: classes.link}}
                      href="https://www.usbr.gov/watersmart/bsp/docs/arbs/Appendix%20D_Develop_Urban_Agri_Demands.pdf"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Appendix D - Development of Urban and Agricultural Demands
                    </Link>
                  </ListItemText>
                </ListBulletItem>
                <ListBulletItem classes={{root: classes.compactItem}}>
                  <ListItemText classes={{root: classes.noBottomMargin}}>
                    <Link
                      variant="body2"
                      color="primary"
                      TypographyClasses={{colorPrimary: classes.link}}
                      href="https://www.usbr.gov/watersmart/bsp/docs/arbs/Appendix%20E_Adapt_Meas_Prelim_Screen_Results.pdf"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Appendix E - Adaptation Measure Preliminary Screening
                      Results
                    </Link>
                  </ListItemText>
                </ListBulletItem>
                <ListBulletItem classes={{root: classes.compactItem}}>
                  <ListItemText classes={{root: classes.noBottomMargin}}>
                    <Link
                      variant="body2"
                      color="primary"
                      TypographyClasses={{colorPrimary: classes.link}}
                      href="https://www.usbr.gov/watersmart/bsp/docs/arbs/Appendix%20F_Draft_Adapt_Portfolios.pdf"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Appendix F - Draft Description of Adaptaion Portfolios
                    </Link>
                  </ListItemText>
                </ListBulletItem>
                <ListBulletItem classes={{root: classes.compactItem}}>
                  <ListItemText classes={{root: classes.noBottomMargin}}>
                    <Link
                      variant="body2"
                      color="primary"
                      TypographyClasses={{colorPrimary: classes.link}}
                      href="https://www.usbr.gov/watersmart/bsp/docs/arbs/Appendix%20G_Adaptation_Portfolios_%20Eval_Results.pdf"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Appendix G - Adaptation Portfolios Evaluation Results
                    </Link>
                  </ListItemText>
                </ListBulletItem>
                <ListBulletItem classes={{root: classes.compactItem}}>
                  <ListItemText classes={{root: classes.noBottomMargin}}>
                    <Link
                      variant="body2"
                      color="primary"
                      TypographyClasses={{colorPrimary: classes.link}}
                      href="https://www.usbr.gov/watersmart/bsp/docs/arbs/Appendix%20H_%20LowerAR_Water_Temp_Model_Doc_Results.pdf"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Appendix H - Lower American River Water Temperature
                      Modeling Documentation and Results
                    </Link>
                  </ListItemText>
                </ListBulletItem>
              </List>
              <Spacing size="large" />
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
                  flexibility for Reclamation's Folsom Dam and Reservoir to help
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
                Sacramento River. Figure 1-1 shows the Study Area - the American
                River Basin - that is bounded by the Bear River to the north,
                the Cosumnes River to the south, the Sierra Nevada mountain
                range to the east, and the Feather and Sacramento Rivers to the
                west. The Study Area encompasses two parts:
              </Type>
              <ul>
                <TypeBullet>
                  <strong>American River Watershed</strong> - This watershed
                  covers 2,140 square miles from Sacramento to the peaks of the
                  northern Sierra Nevada mountains west of Lake Tahoe. Areas
                  outside of the watershed that are served by Study Partners
                  with American River water are also included in the Study Area.
                </TypeBullet>
                <TypeBullet>
                  <strong>North and South Groundwater Subbasins</strong> - These
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
                <MediaDialogOnClick
                  mediaUrl="https://imgix.cosmicjs.com/421bc920-6b37-11e7-860a-a98685e05496-AmRiver_Basin_Study_Area_20160609.jpg"
                  mediaName="Map of American River Basin Study Area"
                  mediaPreviewDialogProps={{
                    width: 700,
                    height: 525
                  }}
                >
                  <Image
                    loader={imgixLoader}
                    src="421bc920-6b37-11e7-860a-a98685e05496-AmRiver_Basin_Study_Area_20160609.jpg"
                    alt="Map of American River Basin Study Area"
                    width={700}
                    height={525}
                    layout="responsive"
                    sizes="(max-width: 600px) 100vw, 75vw"
                  />
                </MediaDialogOnClick>
                <ColumnBox alignItems="center">
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
                    <LIAvatar portrait>
                      <Image
                        loader={imgixLoader}
                        layout="responsive"
                        width={64}
                        height={74}
                        sizes="10vw"
                        alt="U.S. Department of the Interior, Bureau of Reclamation logo"
                        src="877b2410-a69e-11eb-b503-77b97fb4d7e8-bor-logo.png"
                      />
                    </LIAvatar>
                    <LIText
                      // inset
                      primary="U.S. Department of the Interior, Bureau of Reclamation (USBR)"
                    />
                  </ListItemAnchor>
                  <ListItemAnchor href="https://www.pcwa.net">
                    <LIAvatar>
                      <Image
                        loader={imgixLoader}
                        layout="responsive"
                        width={700}
                        height={179}
                        sizes="10vw"
                        alt="Placer County Water Agency logo"
                        src="05c801a0-31a5-11ea-96a7-8146ec741192-pcwa.png"
                      />
                    </LIAvatar>
                    <LIText primary="Placer County Water Agency (PCWA)" />
                  </ListItemAnchor>
                  <ListItemAnchor href="https://www.roseville.ca.us/">
                    <LIAvatar>
                      <Image
                        loader={imgixLoader}
                        layout="responsive"
                        width={700}
                        height={330}
                        sizes="10vw"
                        alt="City of Roseville logo"
                        src="083c35f0-31a5-11ea-96a7-8146ec741192-cor.png"
                      />
                    </LIAvatar>
                    <LIText primary="City of Roseville (Roseville)" />
                  </ListItemAnchor>
                  <ListItemAnchor href="https://www.cityofsacramento.org">
                    <LIAvatar>
                      <Image
                        loader={imgixLoader}
                        layout="responsive"
                        width={128}
                        height={49}
                        sizes="10vw"
                        alt="City of Sacramento logo"
                        src="0abd89a0-31a5-11ea-96a7-8146ec741192-cos.jpg"
                      />
                    </LIAvatar>
                    <LIText primary="City of Sacramento (Sacramento)" />
                  </ListItemAnchor>
                  <ListItemAnchor href="https://www.edcgov.us/Water">
                    <LIAvatar>
                      <Image
                        loader={imgixLoader}
                        layout="responsive"
                        width={128}
                        height={96}
                        sizes="10vw"
                        alt="El Dorado County Water Agency logo"
                        src="0d083cf0-31a5-11ea-96a7-8146ec741192-edcwapadded.png"
                      />
                    </LIAvatar>
                    <LIText primary="El Dorado County Water Agency (EDCWA)" />
                  </ListItemAnchor>
                  <ListItemAnchor href="https://www.folsom.ca.us">
                    <LIAvatar>
                      <Image
                        loader={imgixLoader}
                        layout="responsive"
                        width={128}
                        height={82}
                        sizes="10vw"
                        alt="City of Folsom logo"
                        src="0ee5d690-31a5-11ea-96a7-8146ec741192-cof.png"
                      />
                    </LIAvatar>
                    <LIText primary="City of Folsom (Folsom)" />
                  </ListItemAnchor>
                  <ListItemAnchor href="https://rwah2o.org/">
                    <LIAvatar>
                      <Image
                        loader={imgixLoader}
                        layout="responsive"
                        width={128}
                        height={71}
                        sizes="10vw"
                        alt="Regional Water Authority logo"
                        src="10e5ec50-31a5-11ea-96a7-8146ec741192-rwablue.jpg"
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
              {/*
              <Spacing size="large" />
              {// [TODO] Using any <h(*)/> in <article/> will be styled via GlobalStyles. Prevent this by not including timeline in <article/>. It's possible css specificity can rectify this issue.}
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
                </h4>
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
                    date="August 2020"
                    title="USBR Policy Review (pending)"
                  />
                  <TimelineElement
                    date="Winter 2021"
                    title="Publish Final Report *"
                  />
                  <TimelineElement date="Spring 2022" title="Finalize Report" />
                  <RowBox justifyContent="flex-end">
                    <Type
                      variant="caption"
                      align="right"
                      style={{zIndex: 1, maxWidth: '50%'}}
                    >
                      <em>
                        * Subject to U.S. Department of the Interior Approval
                      </em>
                    </Type>
                  </RowBox>

                  <VerticalTimelineElement
                    iconStyle={{
                      background: theme.palette.primary.main,
                      color: theme.palette.common.white
                    }}
                    icon={<MenuBookIcon />}
                  />
                </NoCollapseVerticalTimeline>
              </Box>
              */}
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
                    <Type variant="subtitle1">Mike Dietl</Type>
                    <Type
                      variant="subtitle2"
                      color="textSecondary"
                      gutterBottom
                    >
                      Program Manager <br />
                    </Type>
                    <Type variant="body2" paragraph>
                      Bureau of Reclamation <br />
                      Interior Region 10 · California-Great Basin <br />
                      2800 Cottage Way, Room W-2830
                      <br />
                      Sacramento, California 95825
                      <br />
                      (916) 978-5070 <br />
                      <Link href="mailto:mdietl@usbr.gov">mdietl@usbr.gov</Link>
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
