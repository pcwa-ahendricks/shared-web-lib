// cspell:ignore SSJRBS
import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {Typography as Type, TypographyProps, Box} from '@material-ui/core'
import {
  makeStyles,
  createStyles,
  useTheme,
  Theme
} from '@material-ui/core/styles'
import Spacing from '@components/boxes/Spacing'
import DoneIcon from '@material-ui/icons/Done'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import EventIcon from '@material-ui/icons/Event'
import NoCollapseVerticalTimeline from '@components/NoCollapseVerticalTimeline/NoCollapseVerticalTimeline'
import {
  VerticalTimelineElement,
  VerticalTimelineElementProps
} from 'react-vertical-timeline-component'
import {yellow} from '@material-ui/core/colors'
import alpha from 'color-alpha'

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
          width: 40, // defaults to 60px
          height: 40, // defaults to 60px
          top: 15 // defaults to 0
        },
        '& .vertical-timeline-element-content .vertical-timeline-element-date': {
          top: 12 // defaults to 6px
        }
      }
      // '& .vertical-timeline-element:first-child': {
      //   marginTop: 0
      // },
      // '& .vertical-timeline-element:last-child': {
      //   marginBottom: 0
      // }
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
            : theme.palette.grey['600'],
          color: theme.palette.common.white
        }}
        icon={completed ? <DoneIcon /> : <EventIcon />}
        contentStyle={{
          background: alpha(yellow['50'], 0.5),
          color: theme.palette.text.primary
        }}
        contentArrowStyle={{
          borderRight: `7px solid  ${yellow['50']}`
        }}
        {...rest}
      >
        <Type
          variant="h5"
          className="vertical-timeline-element-title"
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
        <NarrowContainer>
          <PageTitle title="American River Basin Study" subtitle="Planning" />
          <Type variant="h3" gutterBottom>
            Background
          </Type>
          <Type paragraph>
            Water managers in the American River Basin continue to experience a
            growing imbalance between water demands and water supply due to a
            variety of factors, including population growth; increased
            regulatory requirements; changes in Central Valley Project (CVP)
            operations; inadequate infrastructure; and lack of interagency
            planning necessary to address emerging climate change conditions,
            and increasingly intense and more frequent extreme events (droughts
            and floods).
          </Type>
          <Type paragraph>
            The U.S. Department of the Interior, Bureau of Reclamation
            (Reclamation) recently completed the Sacramento and San Joaquin
            Rivers Basin Study (SSJRBS) (March 2016). The SSJRBS forecasts the
            potential impacts of climate change on water supply, water quality
            and critical habitat within California’s Central Valley. The 60,000
            square mile study area for the SSJRBS encompasses all main
            tributaries within the Central Valley as well as the Sacramento-San
            Joaquin Delta (Delta), the largest estuary on the west coast of
            North America. The SSJRBS outlines potential impacts over a range of
            possible future climate conditions on various natural resources and
            presents portfolios of broad adaptive strategies for consideration
            by water agencies and other interests.
          </Type>
          <Type paragraph>
            The purpose of the American River Basin Study (ARBS or Study) is to
            refine and update the data, tools, analyses, and adaptation
            strategies in the SSJRBS for the American River Basin. Specifically,
            the ARBS will update the SSJRBS to reflect basin-specific,
            integrated water management strategies to improve regional water
            supply reliability within the American River Basin, while improving
            the Reclamation’s flexibility in operating Folsom Reservoir to meet
            flow and water quality standards and protect endangered fishery
            species in the lower American River.
          </Type>
          <Type paragraph>
            The ARBS will present a holistic examination of water management
            practices to address significant recent changes in conditions and
            regulatory requirements related to the CVP and regional water
            management, including Biological Opinions for endangered fishery
            species protection, the State’s Sustainable Groundwater Management
            Act, and the science of climate change.
          </Type>
          <Spacing />

          <Type variant="h3" gutterBottom>
            Basin Study Objectives
          </Type>
          <Type paragraph>
            Under the “new normal” of a changing climate, the ARBS will improve
            the resolution of regional climate change data and develop
            regionally-specific mitigation and adaptation strategies, building
            on those identified in the SSJRBS. The ARBS will:
          </Type>
          <ul>
            <TypeBullet>
              Further refine an assessment of water supplies and demands for the
              American River Basin over the data developed for the SSJRBS.
            </TypeBullet>
            <TypeBullet>
              Address regional demand-supply imbalance and infrastructure
              deficiencies under the threat of climate change.
            </TypeBullet>
            <TypeBullet>
              Improve regional self-reliance and collaboration for sustainable
              water resources management and quality of life.
            </TypeBullet>
            <TypeBullet>
              Integrate regional water supply reliability with operational
              flexibility for Reclamation’s Folsom Dam and Reservoir to help
              meet all authorized purposes of the CVP.
            </TypeBullet>
            <TypeBullet>
              Align regional water management strategies and planning efforts
              with those of Reclamation.
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
              relating to climate change as defined in Section 9503(b)(2) of the
              SECURE Water Act.
            </TypeBullet>
            <TypeBullet>
              Analyze how existing water and power infrastructure and operations
              will perform in the face of changing water realities and other
              impact identified in Section 9503(b)(3) of the SECURE Water Act,
              including the ability to deliver water; hydroelectric power
              generation; recreation; fish and wildlife habitat; applicable
              species listed as endangered, threatened, or candidate species
              and/or designated critical habitat under the Endangered Species
              Act of 1973; water quality issues (including salinity levels);
              flow and water dependent ecological resiliency; and flood control
              and/or management.
            </TypeBullet>
            <TypeBullet>
              Develop appropriate adaptation and mitigation strategies to meet
              future water demands.
            </TypeBullet>
            <TypeBullet>
              Complete a trade-off analysis of the identified options, including
              an analysis of all options in terms of their relative cost,
              environmental impact, risk, stakeholder response, or other common
              attributes.
            </TypeBullet>
          </ul>
          <Type paragraph>
            The ARBS will provide a unique opportunity to align the water
            management strategies and planning efforts of the region with those
            of Reclamation and the CVP, and Study Partners are committed to
            pursuing integrated water management solutions that benefit all
            parties.
          </Type>

          <Type variant="h3" gutterBottom>
            Description of Study Area
          </Type>

          <section>
            <Type variant="h3" gutterBottom>
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
                  date="October 2019"
                  title="Complete Climate Change Data & Model Development"
                />
                <TimelineElement
                  date="October 2019"
                  title="Complete Water Supply & Demand Projections"
                />
                <TimelineElement
                  date="January 2020"
                  title="Develop & Evaluate Adaptation Strategies"
                />
                <TimelineElement
                  date="March 2020"
                  title="Findings & Recommendations"
                />
                <TimelineElement
                  date="April 2020"
                  title="Final Technical Sufficiency Review"
                />
                <TimelineElement
                  date="June 2020"
                  title="Publish Final Report"
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
          </section>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default ARBSPage
