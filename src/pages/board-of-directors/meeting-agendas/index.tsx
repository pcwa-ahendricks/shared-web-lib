// cspell:ignore novus ical thenby
import React, {useMemo, useCallback, Fragment, useState} from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import InboxRoundedIcon from '@material-ui/icons/InboxRounded'
import PageTitle from '@components/PageTitle/PageTitle'
import {
  Box,
  Typography as Type,
  Link,
  Card,
  CardContent,
  CardActions,
  Button,
  Menu,
  MenuItem,
  Divider,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  CircularProgress,
  makeStyles,
  createStyles,
  Theme,
  useTheme
} from '@material-ui/core'
import GavelRoundedIcon from '@material-ui/icons/GavelRounded'
import ClerkToBoardEmail from '@components/links/ClerkToBoardEmail'
import NovusIframe from '@components/NovusIframe/NovusIframe'
import Spacing from '@components/boxes/Spacing'
import MuiNextLink from '@components/NextLink/NextLink'
import {firstBy} from 'thenby'
import {
  futureBoardMeetingDates,
  nextBoardMeeting
} from '@lib/board-meeting-dates'
import {
  compareAsc,
  format,
  formatDistanceToNow,
  addHours,
  parse,
  startOfDay,
  isBefore
} from 'date-fns'
import {saveAs} from 'file-saver'
import {FlexBox, ChildBox, RowBox, ColumnBox} from 'mui-sleazebox'
import {CosmicObjectResponse} from '@lib/services/cosmicService'
import {green} from '@material-ui/core/colors'
import ImgixThumbLink from '@components/ImgixThumbLink/ImgixThumbLink'
import OpenInNewLink from '@components/OpenInNewLink/OpenInNewLink'
import useSWR from 'swr'
import {stringify} from 'querystringify'
import {ics, google, yahoo, outlook} from '@lib/calendar-link'
import slugify from 'slugify'
// const isDev = process.env.NODE_ENV === 'development'

type Props = {
  initialData?: CosmicObjectResponse<AgendaMetadata>
}

const refreshInterval = 1000 * 60 * 2 // Two minute interval.
const endOfBusinessDayHour = 17

interface AgendaMetadata {
  agenda_pdf: {
    imgix_url: string
    url: string
  }
  date: string
  time: string
  sort_order: number
  hidden: boolean
}
const params = {
  hide_metafields: true,
  props: 'id,metadata,status,title',
  query: JSON.stringify({
    type: 'agendas'
  })
}
const qs = stringify({...params}, true)
const agendasUrl = `/api/cosmic/objects${qs}`

const DATE_FNS_FORMAT = 'yyyy-MM-dd'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      minWidth: 275,
      backgroundColor: theme.palette.common.white,
      borderTopWidth: 2,
      borderTopStyle: 'solid',
      borderColor: green['500']
    },
    pos: {
      marginBottom: 12
    }
  })
)

// Set event as an object
const event = nextBoardMeeting?.date
  ? {
      title: 'PCWA Board Meeting',
      description: nextBoardMeeting?.note || '',
      start: nextBoardMeeting?.date,
      end: addHours(nextBoardMeeting.date, 2),
      // duration: [2, 'hour'],
      allDay: false
    }
  : null

const iCalEvent = ics && typeof ics === 'function' && event ? ics(event) : ''
// standard ICS calendar base on https://icalendar.org/
const yahooEventHref =
  yahoo && typeof yahoo === 'function' && event ? yahoo(event) : ''
const googleEventHref =
  google && typeof google === 'function' && event ? google(event) : ''
const outlookEventHref =
  outlook && typeof outlook === 'function' && event ? outlook(event) : ''

const MeetingAgendasPage = ({initialData}: Props) => {
  const classes = useStyles()
  const theme = useTheme()
  const isSMUp = useMediaQuery(theme.breakpoints.up('sm'))
  const followingFourBoardMeetings = useMemo(
    () => futureBoardMeetingDates.sort(compareAsc).slice(1, 5), // Skip the next meeting/date and take 4 dates.
    []
  )

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget)
    },
    []
  )

  const {data: agendasData} = useSWR<CosmicObjectResponse<AgendaMetadata>>(
    agendasUrl,
    {initialData, refreshInterval}
  )

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const iCalClickHandler = useCallback(() => {
    const filenameSuffix = nextBoardMeeting?.date
      ? format(nextBoardMeeting.date, 'MM-dd-yyyy')
      : ''
    // Remove URL from iCal event since it will cause an error when user adds it to an un-supported mail client such as Apple Mail. To make regular expression non-greedy use ".+?" instead of ".*"
    const noUrlICalEvent = iCalEvent.replace(/url:.+?%0a/i, '')
    setAnchorEl(null)
    saveAs(noUrlICalEvent, `pcwa-board-meeting_${filenameSuffix}.ics`)
  }, [])

  const agendas = useMemo(
    () =>
      agendasData && Array.isArray(agendasData.objects)
        ? agendasData.objects
            .map((agenda) => ({
              dateTime: parse(
                `${agenda.metadata.date}:${agenda.metadata.time}`,
                "yyyy'-'MM'-'dd':'HHmm",
                new Date()
              ),
              ...agenda
            }))
            // Hide agendas that are explicitly hidden.
            .filter((agenda) => !agenda.metadata?.hidden)
            // Hide agendas on the close of business for a given date.
            .filter((agenda) =>
              isBefore(
                new Date(),
                addHours(startOfDay(agenda.dateTime), endOfBusinessDayHour)
              )
            )
            // Sort by date and time then by sort order.
            .sort(
              firstBy((a: any, b: any) => compareAsc(a, b)).thenBy(
                (a, b) => a.order - b.order
              )
            )
        : [],
    [agendasData]
  )

  return (
    <PageLayout title="Board Meetings" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle
            title="Board of Directors Meetings"
            subtitle="Board of Directors"
          />
          <Box>
            <Type paragraph>
              Meeting agendas are posted at least 72 hours prior to the meeting.
              Special Meeting agendas are posted at least 24 hours prior to the
              meeting. Agendas are retained permanently. If an agenda is not
              listed below, you may request a copy by completing a{' '}
              <Link
                href="https://cdn.cosmicjs.com/0e276210-4b36-11e9-8cec-7bc2ed80e6ac-Public-Records-Request.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Public Records Request
              </Link>
              . Please email your request to <ClerkToBoardEmail /> or mail to
              Placer County Water Agency, Attention: Clerk to the Board, PO Box
              6570, Auburn CA 95604.
            </Type>
          </Box>
          <Spacing size="large" />

          <section>
            <Type gutterBottom variant="h2" color="primary">
              Board Meeting Agendas
            </Type>
            <NovusIframe />
          </section>
          <section id="board-meeting-dates">
            <Spacing size="large">
              <FlexBox>
                <Box m="auto">
                  <GavelRoundedIcon fontSize="large" color="primary" />
                </Box>
              </FlexBox>
            </Spacing>
            <Box>
              <Type gutterBottom variant="h2" color="primary">
                Schedule of Upcoming Board Meetings
              </Type>
              <Type gutterBottom>
                All Board meetings will be held at the Agency’s Business Center
                at{' '}
                <MuiNextLink href="/about-pcwa/directions">
                  144 Ferguson Road, Auburn, California
                </MuiNextLink>
                , unless otherwise noted.
              </Type>
              <Spacing />
              <Card className={classes.card}>
                <RowBox
                  responsive
                  flexSpacing={isSMUp ? 4 : 1}
                  width="100%"
                  justifyContent="space-around"
                  alignItems="center"
                >
                  <ChildBox>
                    {nextBoardMeeting?.date ? (
                      <>
                        <CardContent>
                          {/* <Type
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    Title ...
                  </Type> */}

                          <Type variant="h3">
                            {format(
                              nextBoardMeeting.date,
                              "eeee',' MMMM do '@' h':'mm aaaa"
                            )}
                          </Type>
                          <Type className={classes.pos} color="textSecondary">
                            In {formatDistanceToNow(nextBoardMeeting.date)}
                          </Type>
                          <Type variant="body2" component="p">
                            {nextBoardMeeting.note
                              ? nextBoardMeeting.note
                              : 'Next Regular Board of Directors’ meeting.'}
                          </Type>
                        </CardContent>
                        <CardActions>
                          <Box>
                            <Button
                              color="secondary"
                              aria-controls="add-to-calendar-menu"
                              aria-haspopup="true"
                              onClick={handleClick}
                            >
                              Add to my Calendar
                            </Button>
                            <Menu
                              id="add-to-calendar-menu"
                              anchorEl={anchorEl}
                              keepMounted
                              open={Boolean(anchorEl)}
                              onClose={handleClose}
                              disableBackdropClick={false}
                            >
                              <MenuItem onClick={iCalClickHandler}>
                                iCalendar
                              </MenuItem>
                              <MenuItem
                                href={googleEventHref}
                                component="a"
                                rel="noopener noreferrer"
                                target="_blank"
                                onClick={handleClose}
                              >
                                Google Calendar
                              </MenuItem>
                              <MenuItem
                                href={outlookEventHref}
                                component="a"
                                rel="noopener noreferrer"
                                target="_blank"
                                onClick={handleClose}
                              >
                                Outlook
                              </MenuItem>
                              <MenuItem
                                href={yahooEventHref}
                                component="a"
                                rel="noopener noreferrer"
                                target="_blank"
                                onClick={handleClose}
                              >
                                Yahoo
                              </MenuItem>
                            </Menu>
                          </Box>
                        </CardActions>
                      </>
                    ) : (
                      <>
                        <CardContent>
                          <ColumnBox justifyContent="center" minHeight={50}>
                            <Type variant="h4" color="textSecondary">
                              <em>No meetings scheduled at this time.</em>
                            </Type>
                          </ColumnBox>
                        </CardContent>
                      </>
                    )}
                  </ChildBox>
                  {followingFourBoardMeetings.length > 0 ? (
                    <ChildBox>
                      <Box
                        p={3}
                        // bgcolor={theme.palette.common.white}
                        // boxShadow={2}
                        // borderRadius={2}
                      >
                        <Type variant="subtitle1">
                          Future Board Meeting Dates
                        </Type>
                        <List dense>
                          {followingFourBoardMeetings.map((bm, idx, arry) => (
                            <Fragment key={idx}>
                              <ListItem>
                                <ListItemText
                                  primary={format(bm, "MMM'.' do',' h:mm aaaa")}
                                />
                              </ListItem>
                              {arry.length !== idx + 1 ? <Divider /> : null}
                            </Fragment>
                          ))}
                        </List>
                      </Box>
                    </ChildBox>
                  ) : null}
                </RowBox>
              </Card>
            </Box>
          </section>
          <Spacing size="x-large" factor={2} />
          <section>
            {/* <CommitteeAgendas title="Upcoming Committee Meetings" /> */}

            <Type gutterBottom variant="h4">
              {/* {title}: */}
              Upcoming Committee Meetings:
            </Type>
            <Box
              p={3}
              bgcolor={theme.palette.common.white}
              boxShadow={1}
              borderRadius={2}
            >
              {!agendas ? (
                <FlexBox height={75}>
                  <Box m="auto">
                    <CircularProgress
                      color="secondary"
                      variant="indeterminate"
                    />
                  </Box>
                </FlexBox>
              ) : agendas.length > 0 ? (
                agendas.map((item, idx) => {
                  // Don't slugify route (ie "/")
                  const linkAs = `/board-of-directors/meeting-agendas/${
                    // item.derivedFilenameAttr?.date + '-' + item.metadata?.type
                    slugify(
                      format(item.dateTime, DATE_FNS_FORMAT) + '-' + item.title
                    )
                  }`
                  return (
                    <RowBox key={idx}>
                      <ChildBox>
                        <ImgixThumbLink
                          isNextLink
                          imageWidth={75}
                          url={item.metadata.agenda_pdf.imgix_url}
                          alt={`Thumbnail and link for ${item.title}`}
                          as={linkAs}
                          href="/board-of-directors/meeting-agendas/[agenda-slug]"
                        />
                      </ChildBox>
                      <ChildBox ml={4}>
                        <OpenInNewLink
                          pdf
                          isNextLink
                          as={linkAs}
                          href="/board-of-directors/meeting-agendas/[agenda-slug]"
                        >
                          <Type variant="subtitle1">{item.title}</Type>
                        </OpenInNewLink>
                        <Type
                          variant="subtitle2"
                          color="textSecondary"
                          gutterBottom
                        >
                          {format(item.dateTime, "eeee',' MMMM do, yyyy")}
                        </Type>
                        <Type variant="body2" paragraph>
                          Click the title link (or thumbnail image on left) to
                          view the agenda, and for additional information
                          including the time and location of this meeting.
                        </Type>
                      </ChildBox>
                    </RowBox>
                  )
                })
              ) : (
                <RowBox fontStyle="italic" alignItems="center">
                  <ColumnBox child justifyContent="center">
                    <InboxRoundedIcon fontSize="large" color="disabled" />
                  </ColumnBox>
                  <ChildBox ml={4}>
                    <Type color="textSecondary">None at this time.</Type>
                  </ChildBox>
                </RowBox>
              )}
            </Box>
            {/* <Spacing factor={2} />
            <OtherAgenda
              list={auditCommitteeAgendas}
              title="Upcoming Board of Directors' Audit Committee Meetings"
            />
            <Spacing factor={2} />
            <OtherAgenda
              list={otherCommitteeAgendas}
              title="Other Upcoming Board of Directors' Committee Meetings"
            /> */}
          </section>

          <Spacing size="x-large" factor={2} />

          <Type paragraph>
            For Board meeting minutes see our{' '}
            <MuiNextLink href="/board-of-directors/meeting-minutes">
              Minutes Page
            </MuiNextLink>
          </Type>
          <Type paragraph>
            For more information, contact the Clerk to the Board at{' '}
            <ClerkToBoardEmail />
          </Type>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export default MeetingAgendasPage
