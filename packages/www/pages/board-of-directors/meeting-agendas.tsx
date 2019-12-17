// cspell:ignore novus ical
import React, {useMemo, useCallback} from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
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
  MenuItem
} from '@material-ui/core'
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles'
import ClerkToBoardEmail from '@components/links/ClerkToBoardEmail'
import NovusIframe from '@components/NovusIframe/NovusIframe'
import Spacing from '@components/boxes/Spacing'
import MuiNextLink from '@components/NextLink/NextLink'
import {
  futureBoardMeetingDates,
  nextBoardMeeting
} from '@lib/board-meeting-dates'
import {compareAsc, format, formatDistanceToNow, addHours} from 'date-fns'
import {saveAs} from 'file-saver'
// import {ics} from 'calendar-link'
// Do this instead. See https://github.com/zeit/next.js/wiki/FAQ
let ics: any, google: any, outlook: any, yahoo: any
if (typeof window !== 'undefined') {
  ics = require('calendar-link').ics
  google = require('calendar-link').google
  yahoo = require('calendar-link').yahoo
  outlook = require('calendar-link').outlook
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      minWidth: 275,
      maxWidth: 500,
      backgroundColor: theme.palette.common.white
    },
    // title: {
    //   fontSize: 14
    // },
    pos: {
      marginBottom: 12
    }
  })
)

const BasicTemplatePage = () => {
  const classes = useStyles()
  const followingFourBoardMeetings = useMemo(
    () => futureBoardMeetingDates.sort(compareAsc).slice(1, 5), // Skip the next meeting/date and take 4 dates.
    []
  )
  console.log(followingFourBoardMeetings)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  // Set event as an object
  const event = {
    title: 'PCWA Board Meeting',
    description: nextBoardMeeting.note || '',
    start: nextBoardMeeting.date,
    end: addHours(nextBoardMeeting.date, 2),
    // duration: [2.5, 'hour'],
    allDay: false
  }

  const iCalEvent = useMemo(
    () => (ics && typeof ics === 'function' ? ics(event) : ''),
    [event]
  ) // standard ICS calendar base on https://icalendar.org/

  const yahooEventHref = useMemo(
    () => (yahoo && typeof yahoo === 'function' ? yahoo(event) : ''),
    [event]
  )
  const googleEventHref = useMemo(
    () => (google && typeof google === 'function' ? google(event) : ''),
    [event]
  )
  const outlookEventHref = useMemo(
    () => (outlook && typeof outlook === 'function' ? outlook(event) : ''),
    [event]
  )

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const iCalClickHandler = useCallback(() => {
    setAnchorEl(null)
    saveAs(iCalEvent, 'pcwa-board-meeting.ics')
  }, [iCalEvent])

  return (
    <PageLayout title="Board Meeting Agendas" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle
            title="Board of Directors' Meeting Agendas"
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
            <NovusIframe />
          </section>
          <Spacing size="x-large" />
          <section>
            <Box>
              <Type gutterBottom variant="h2" color="primary">
                Schedule of Upcoming Board of Directors’ Meetings
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
                <CardContent>
                  {/* <Type
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    Word of the Day
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
                  <div>
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
                      <MenuItem onClick={iCalClickHandler}>iCalendar</MenuItem>
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
                  </div>
                </CardActions>
              </Card>
            </Box>
          </section>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export default BasicTemplatePage
