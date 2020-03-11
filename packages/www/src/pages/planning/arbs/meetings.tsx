// cspell:ignore ACWA
import React, {useCallback, useMemo} from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import {
  Breadcrumbs,
  Typography as Type,
  Box,
  BoxProps,
  Divider,
  Link,
  List,
  ListItem,
  ListItemText,
  ListSubheader
} from '@material-ui/core'
import {useTheme} from '@material-ui/core/styles'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import MuiNextLink from '@components/NextLink/NextLink'
import Spacing from '@components/boxes/Spacing'
import {isBefore, parseISO, isAfter, format, compareDesc} from 'date-fns'
// import PageTitle from '@components/PageTitle/PageTitle'

interface Meeting {
  date: string
  title: string
  agendaUrl?: string
  attachments?: {title: string; url: string}[]
}

type MeetingProps = {
  title: Meeting['title']
  date: Date
  agendaUrl?: Meeting['agendaUrl']
  attachments?: Meeting['attachments']
}

const meetings: Meeting[] = [
  {
    date: '2019-10-15T21:00:00.000Z',
    title: 'Assessing Climate Change Challenges - Workshop #2'
  },
  {
    title: 'ACWA 2019 Presentation',
    date: '2019-10-04T21:00:00.000Z',
    attachments: [
      {
        title: `Slideshow Presentation`,
        url:
          'https://cdn.cosmicjs.com/6cd98030-ea1f-11e9-b67f-679b9aa5b8c2-PCWA-ARBS-Downscaling-Presentation-V3.1.pdf'
      }
    ]
  },
  {
    title: 'Assessing Climate Change Challenges - Workshop #1',
    date: '2019-10-03T21:00:00.000Z',
    attachments: [
      {
        title: `Slideshow Presentation`,
        url:
          'https://cosmic-s3.imgix.net/d5193160-ea1d-11e9-ba4d-0371f77c56f3-ARBSWorkshop1v7.pdf'
      },
      {
        title: `Slideshow Presentation - Video`,
        url:
          'https://cosmic-s3.imgix.net/de4ed410-ea1d-11e9-b46c-c33ce7177bb8-2019-10-03-10.02-American-River-Basin-Study-Workshop-1---Assessing-Climate-Change-Challenges.mp4'
      }
    ]
  },
  {
    title: 'Executive Steering Committee Meeting #5',
    date: '2018-09-10T21:00:00.000Z',
    agendaUrl:
      'https://cdn.cosmicjs.com/6c9dafb0-ea1f-11e9-b67f-679b9aa5b8c2-ESC5-agenda.pdf',
    attachments: [
      {
        title: `Slideshow Presentation`,
        url:
          'https://cdn.cosmicjs.com/6d0cec40-ea1f-11e9-b67f-679b9aa5b8c2-ARBSWorkshop1v4.pdf'
      }
    ]
  },
  {
    title: 'Executive Steering Committee Meeting #4',
    date: '2018-07-09T21:00:00.000Z',
    attachments: [
      {
        title: `Slideshow Presentation`,
        url:
          'https://cdn.cosmicjs.com/3d124590-dbd7-11e9-a172-efce876b6938-ESC4-presentation.pdf'
      }
    ]
  },
  {
    title: 'Executive Steering Committee Meeting #3',
    date: '2017-10-24T21:00:00.000Z',
    agendaUrl:
      'https://cdn.cosmicjs.com/3cc64870-dbd7-11e9-a172-efce876b6938-ESC3-agenda.pdf',
    attachments: [
      {
        title: `Slideshow Presentation`,
        url:
          'https://cdn.cosmicjs.com/3d250a40-dbd7-11e9-8c6b-71138726c7d5-ESC3-presentation.pdf'
      },
      {
        title: 'Schedule',
        url:
          'https://cdn.cosmicjs.com/3cdda100-dbd7-11e9-a172-efce876b6938-ESC3-schedule.pdf'
      }
    ]
  },
  {
    title: 'Regional Water Reliability Plan Meeting',
    date: '2018-11-14T21:00:00.000Z',
    agendaUrl:
      'https://cdn.cosmicjs.com/b9360f80-e86c-11e8-a225-35cc76046a3e-Agenda_RWRPMtg_2018.1114.pdf',
    attachments: [
      {
        title: 'ARBS Progress Update Presentation Slides',
        url:
          'http://cdn.cosmicjs.com/b966e380-e86c-11e8-a225-35cc76046a3e-ARBS_RWRP-Meeting_20181114_v5-final.pdf'
      }
    ]
  },
  {
    title: 'Executive Steering Committee Meeting #2',
    date: '2017-03-03T21:00:00.000Z',
    agendaUrl:
      'https://cosmic-s3.imgix.net/b661a970-3269-11ea-bfe8-5b62c3bdf959-agenda.pdf',
    attachments: [
      {
        title: `Slideshow Presentation`,
        url: `https://cdn.cosmicjs.com/b73944c0-3269-11ea-bfe8-5b62c3bdf959-American-River-Basin-Study-170303.pdf`
      },
      {
        title: 'ARBS Plan of Study',
        url:
          'https://cdn.cosmicjs.com/b707fb90-3269-11ea-96a7-8146ec741192-ARBSPlanofStudy20170221clean.pdf'
      },
      {
        title: 'Memorandum Of Agreement',
        url:
          'https://cdn.cosmicjs.com/b65685e0-3269-11ea-96a7-8146ec741192-draft-Final--MOA---ARBS-03022017-bjr.pdf'
      },
      {
        title: `Non-Federal Partner's In-Kind Cost Share`,
        url:
          'https://cdn.cosmicjs.com/b64ac610-3269-11ea-bfe8-5b62c3bdf959-In-Kind-Services-Report-Form-2015-16.pdf'
      }
    ]
  },
  {
    title: 'Executive Steering Committee Meeting #1',
    date: '2016-12-06T21:30:00.000Z',
    agendaUrl:
      'https://cosmic-s3.imgix.net/430b7280-3269-11ea-96a7-8146ec741192-agenda.pdf',
    attachments: [
      {
        title: 'Meeting Notes',
        url:
          'https://cosmic-s3.imgix.net/42ff1670-3269-11ea-bfe8-5b62c3bdf959-meeting-notes.pdf'
      },
      {
        title: 'ARBS Plan of Study (Draft)',
        url:
          'https://cosmic-s3.imgix.net/43487b80-3269-11ea-bfe8-5b62c3bdf959-ARBSPOSDraft20161203clean.pdf'
      },
      {
        title: 'Memorandum Of Agreement (Draft)',
        url:
          'https://cosmic-s3.imgix.net/42f21e20-3269-11ea-96a7-8146ec741192-MOA-ARBS-Draft-20161206.pdf'
      }
    ]
  }
]

const ARBSMeetingsPage = () => {
  const theme = useTheme()

  const pastMeetings = useMemo(
    () =>
      meetings
        .map((meeting) => ({...meeting, date: parseISO(meeting.date)}))
        .filter((meeting) => isBefore(meeting.date, new Date()))
        .sort((l, r) => compareDesc(l.date, r.date)),
    []
  )

  const upcomingMeetings = useMemo(
    () =>
      meetings
        .map((meeting) => ({...meeting, date: parseISO(meeting.date)}))
        .filter((meeting) => isAfter(meeting.date, new Date()))
        .sort((l, r) => compareDesc(l.date, r.date)),
    []
  )

  const Meeting = useCallback(
    ({
      title,
      date,
      agendaUrl,
      attachments,
      ...rest
    }: MeetingProps & BoxProps) => {
      return (
        <Box {...rest}>
          <Type variant="h4">{title}</Type>
          <Type>{format(date, "MMMM do',' yyyy")}</Type>
          {agendaUrl ? (
            <>
              <Spacing size="x-small" />
              <Link href={agendaUrl} rel="noopener noreferrer" target="_blank">
                View Agenda
              </Link>
              <Spacing size="x-small" />
              <List
                dense
                disablePadding
                subheader={<ListSubheader>Attachments</ListSubheader>}
              >
                {attachments?.map((item, idx) => (
                  <ListItem
                    key={idx}
                    button
                    component="a"
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ListItemText primary={item.title} />
                  </ListItem>
                ))}
              </List>
            </>
          ) : null}
        </Box>
      )
    },
    []
  )

  const MeetingWrapper = useCallback(
    ({
      title,
      date,
      lastItem = false,
      ...rest
    }: {lastItem?: boolean} & MeetingProps) => {
      return (
        <React.Fragment>
          <Meeting title={title} date={date} {...rest} />
          {lastItem ? null : (
            <Spacing size="large">
              <Divider variant="middle" />
            </Spacing>
          )}
        </React.Fragment>
      )
    },
    []
  )

  return (
    <PageLayout title="American River Basin Study - Meetings" waterSurface>
      <MainBox>
        <NarrowContainer>
          <Breadcrumbs
            aria-label="breadcrumb"
            separator={<NavigateNextIcon fontSize="small" />}
          >
            <MuiNextLink color="inherit" href="/planning/arbs">
              American River Basin Study
            </MuiNextLink>
            <Type color="textPrimary">Meetings</Type>
          </Breadcrumbs>

          <Spacing size="x-large" />
          {/* <PageTitle title="Basic Template" subtitle="Page Subtitle" /> */}
          <Box bgcolor={theme.palette.common.white} p={4} boxShadow={2}>
            <Type color="primary" variant="h2" gutterBottom>
              Upcoming Meetings
            </Type>
            <Spacing />
            {upcomingMeetings.length > 0 ? (
              upcomingMeetings.map((meeting, idx, arry) => (
                <MeetingWrapper
                  key={idx}
                  title={meeting.title}
                  date={meeting.date}
                  attachments={meeting.attachments}
                  agendaUrl={meeting.agendaUrl}
                  lastItem={arry.length === idx + 1}
                />
              ))
            ) : (
              <Type variant="subtitle1" color="textSecondary">
                <em>There are no meetings scheduled at this time.</em>
              </Type>
            )}

            <Spacing size="x-large">
              <Divider variant="middle" />
            </Spacing>

            <Type color="primary" variant="h2" gutterBottom>
              Past Meetings
            </Type>
            <Spacing />
            {pastMeetings.map((meeting, idx, arry) => (
              <MeetingWrapper
                key={idx}
                title={meeting.title}
                date={meeting.date}
                attachments={meeting.attachments}
                agendaUrl={meeting.agendaUrl}
                lastItem={arry.length === idx + 1}
              />
            ))}
          </Box>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default ARBSMeetingsPage