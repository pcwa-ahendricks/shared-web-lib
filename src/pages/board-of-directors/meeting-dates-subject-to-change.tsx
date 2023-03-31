import React, {useCallback, useMemo} from 'react'
import {stringify} from 'querystringify'
import {parse, format, compareAsc, isFuture} from 'date-fns'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {
  Paper,
  Typography,
  Box,
  TableRow,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableBody
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import Link from 'next/link'
import colorAlpha from 'color-alpha'
import {yellow} from '@mui/material/colors'
import Spacing from '@components/boxes/Spacing'
import useSWR from 'swr'
import {CosmicObjectResponse} from '@lib/services/cosmicService'

interface MeetingDatesMetadata {
  date: string
  time: string
  notes: string
}

const useStyles = makeStyles({
  table: {
    minWidth: 500
  }
})

const refreshInterval = 1000 * 60 * 2 // Two minute interval.
const meetingDatesParams = {
  hide_metafields: true,
  props: 'id,metadata,status',
  query: JSON.stringify({
    type: 'board-meeting-dates'
  })
}
const meetingDatesQs = stringify({...meetingDatesParams}, true)
const meetingDatesUrl = `/api/cosmic/objects${meetingDatesQs}`

export default function BasicTemplatePage() {
  const classes = useStyles()

  const {data: meetingDatesData} = useSWR<
    CosmicObjectResponse<MeetingDatesMetadata>
  >(meetingDatesUrl, {refreshInterval})

  const parseFn = useCallback(
    (dateStr: string) => parse(dateStr, 'yyyy-MM-dd HHmm', new Date()),
    []
  )

  const boardMeetings = useMemo(
    () =>
      meetingDatesData?.objects
        .map((i) => ({
          date: parseFn(`${i.metadata.date} ${i.metadata.time}`),
          notes: i.metadata.notes
        }))
        .filter((i) => isFuture(i.date))
        .sort((a, b) => compareAsc(a.date, b.date))
        .map((i) => ({
          ...i,
          date: format(i.date, "MMM'.' do',' yyyy 'at' h':'mm aaa"),
          dow: format(i.date, 'EEE')
        })) ?? [],
    [meetingDatesData, parseFn]
  )
  console.log(boardMeetings)

  return (
    <PageLayout title="Board Meeting Dates (subject to change)" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle
            title="Board Meeting Dates"
            subtitle="for administrative use"
          />
          <Box bgcolor={colorAlpha(yellow[50], 0.5)} paddingY={2} paddingX={4}>
            <Typography variant="body1">
              Please note, any and all future Board Meeting dates and times
              listed below are subject to change. Please visit{' '}
              <Link href="/board-of-directors/meeting-agendas">
                https://www.pcwa.net/board-of-directors/meeting-agendas
              </Link>{' '}
              for all scheduled Board Meeting dates and Board Meeting agendas.
            </Typography>
          </Box>
          <Spacing size="large" />

          <TableContainer component={Paper}>
            {/* <Box px={4} py={2}>
              <Typography variant="h4">Future Board Dates</Typography>
            </Box> */}
            <Table
              className={classes.table}
              aria-label="Board Meeting Dates Table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>
                    <Typography noWrap variant="inherit">
                      Day of Week
                    </Typography>
                  </TableCell>
                  <TableCell>Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {boardMeetings.map((row) => (
                  <TableRow key={row.date}>
                    <TableCell component="th" scope="row">
                      <Typography variant="inherit" noWrap>
                        {row.date}
                      </Typography>
                    </TableCell>
                    <TableCell>{row.dow}</TableCell>
                    <TableCell>{row.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}
