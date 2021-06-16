import {parse, isFuture, isBefore} from 'date-fns'

interface BoardMeeting {
  note?: string
  date: string
}

export const boardMeetings: Array<BoardMeeting> = [
  {date: '1-5-2017 2:00PM'},
  {date: '1-19-2017 2:00PM'},
  {date: '2-2-2017 2:00PM'},
  {date: '2-16-2017 2:00PM'},
  {date: '3-2-2017 2:00PM'},
  {date: '3-16-2017 2:00PM'},
  {date: '4-6-2017 2:00PM'},
  {date: '4-20-2017 2:00PM'},
  {date: '5-4-2017 2:00PM'},
  {date: '5-18-2017 2:00PM'},
  {date: '6-1-2017 2:00PM'},
  {date: '6-15-2017 2:00PM'},
  {date: '6-22-2017 8:30AM'},
  {date: '7-6-2017 2:00PM'},
  {date: '7-20-2017 2:00PM'},
  {date: '8-3-2017 2:00PM'},
  {date: '8-17-2017 2:00PM'},
  {date: '9-7-2017 2:00PM'},
  {
    date: '9-21-2017 8:15AM',
    note:
      `The September 21st meeting starts at 8:15 a.m. at the Business Center. The Board will ` +
      `consider regular business items and then depart and travel to Squaw Valley Public Service ` +
      `District, 305 Squaw Valley, Olympic Valley, California, to continue their meeting.`
  },
  {date: '10-5-2017 8:30AM'},
  {date: '10-19-2017 2:00PM'},
  {date: '11-2-2017 2:00PM'},
  {date: '11-16-2017 2:00PM'},
  {date: '12-7-2017 2:00PM'},
  {date: '12-18-2017 8:00AM'},
  // 2018 Board Dates
  {date: '1-4-2018 2:00PM'},
  {date: '1-18-2018 2:00PM'},
  {date: '2-1-2018 2:00PM'},
  {date: '2-15-2018 2:00PM'},
  {date: '3-1-2018 2:00PM'},
  {date: '3-15-2018 2:00PM'},
  {date: '4-5-2018 2:00PM'},
  {date: '4-19-2018 2:00PM'},
  {date: '5-3-2018 2:00PM'},
  {date: '5-17-2018 2:00PM'},
  // {
  //   date: "6-7-2018 2:00PM",
  //   note:
  //     `The June 7th Board Meeting has been cancelled.`
  // },
  {date: '6-21-2018 2:00PM'},
  {date: '7-5-2018 2:00PM'},
  {date: '7-19-2018 2:00PM'},
  {date: '8-2-2018 2:00PM'},
  {date: '8-16-2018 2:00PM'},
  {date: '9-6-2018 2:00PM'},
  {date: '9-20-2018 8:15AM'},
  {date: '10-4-2018 2:00PM'},
  {date: '10-18-2018 2:00PM'},
  {date: '11-1-2018 2:00PM'},
  {date: '11-15-2018 2:00PM'},
  {date: '12-6-2018 2:00PM'},
  {date: '12-20-2018 2:00PM'},

  {date: '1-3-2019 2:00PM'},
  {date: '1-17-2019 2:00PM'},
  {date: '2-7-2019 2:00PM'},
  {date: '2-21-2019 2:00PM'},
  {date: '3-7-2019 2:00PM'},
  {date: '3-21-2019 2:00PM'},
  {date: '4-4-2019 2:00PM'},
  {date: '4-18-2019 2:00PM'},
  {date: '5-2-2019 2:00PM'},
  {date: '5-16-2019 2:00PM'},
  {date: '6-6-2019 2:00PM'},
  {date: '6-20-2019 2:00PM'},
  {date: '7-8-2019 2:00PM'},
  {date: '7-18-2019 2:00PM'},
  {date: '8-1-2019 2:00PM'},
  {date: '8-15-2019 2:00PM'},
  {date: '9-5-2019 2:00PM'},
  {
    date: '9-11-2019 8:30AM',
    note: "The September 11th meeting starts at 8:30 a.m. at the Business Center. Board of Directors' workshop meeting to begin at Placer County Water Agency Business Center, 144 Ferguson Road, Auburn, California.  Thereafter the Board will drive to the Middle Fork American River Project facilities and have a strategic planning session at the Hell Hole Dormitory, 20900 Soda Springs Road, Foresthill, California. The meeting will adjourn at 5:00 p.m."
  },
  {
    date: '9-12-2019 8:00AM',
    note: 'Board meeting to reconvene Thursday, September 12, 2019, 8:00 a.m. at Hell Hole Dormitory for strategic planning and tour of Middle Fork American River Project facilities, returning to Placer County Water Agency Business Center, 144 Ferguson Road, Auburn, California, at approximately noon.'
  },
  // { date: '9-19-2019 2:00PM' },
  {
    date: '9-19-2019 8:15AM',
    note: 'The September 19th meeting starts at 8:15 a.m. at the Business Center. The Board will consider regular business items and then depart and travel to North Tahoe Public Utility District, 8318 North Lake Blvd., Kings Beach, California, to continue their meeting at approximately 11 a.m.'
  },
  {date: '10-3-2019 2:00PM'},
  {date: '10-17-2019 2:00PM'},
  {date: '11-7-2019 2:00PM'},
  {date: '11-21-2019 2:00PM'},
  {date: '12-9-2019 2:00PM'},
  {date: '12-19-2019 2:00PM'},

  {date: '1-6-2020 2:00PM'},
  {date: '1-16-2020 2:00PM'},
  {date: '2-6-2020 2:00PM'},
  {date: '2-20-2020 2:00PM'},
  {date: '3-5-2020 2:00PM'},
  {date: '3-19-2020 2:00PM'},
  {date: '4-2-2020 2:00PM'},
  {date: '4-16-2020 2:00PM'},
  {date: '5-11-2020 2:00PM'},
  {date: '5-21-2020 2:00PM'},
  {date: '6-4-2020 2:00PM'},
  {date: '6-18-2020 2:00PM'},
  {date: '7-2-2020 2:00PM'},
  {date: '7-16-2020 2:00PM'},
  {date: '8-6-2020 2:00PM'},
  {date: '8-20-2020 2:00PM'},
  {date: '9-3-2020 2:00PM'},
  {date: '9-17-2020 2:00PM'},
  {date: '10-1-2020 8:30AM'},
  {date: '10-5-2020 2:00PM'},
  {date: '10-15-2020 2:00PM'},
  {date: '11-5-2020 2:00PM'},
  {date: '11-19-2020 2:00PM'},
  {date: '12-7-2020 2:00PM'},
  {date: '12-17-2020 2:00PM'},
  // 2021 Board Dates
  {date: '1-7-2021 2:00PM'},
  {date: '1-21-2021 2:00PM'},
  {date: '2-4-2021 2:00PM'},
  {date: '2-18-2021 2:00PM'},
  {date: '3-4-2021 2:00PM'},
  {date: '3-18-2021 2:00PM'},
  {date: '4-1-2021 2:00PM'},
  {date: '4-15-2021 2:00PM'},
  {date: '5-10-2021 2:00PM'},
  {date: '5-20-2021 2:00PM'},
  {date: '6-3-2021 2:00PM'},
  {date: '6-17-2021 2:00PM'},
  {date: '7-1-2021 2:00PM'},
  {date: '7-15-2021 2:00PM'},
  {date: '8-5-2021 2:00PM'},
  {date: '8-19-2021 2:00PM'},
  {date: '9-2-2021 2:00PM'},
  {
    date: '9-16-2021 2:00PM'
    // note:
    //   'The September 16th meeting starts at 8:15 a.m. at the Business Center. The Board will consider regular business items and then depart and travel to North Tahoe Public Utility District, 8318 North Lake Blvd., Kings Beach, California, to continue their meeting at approximately 11 a.m.'
  },
  {
    date: '10-7-2021 2:00PM',
    note: "The October 7th meeting starts at 8:30 a.m. at the Business Center. Board of Directors' workshop meeting to begin at Placer County Water Agency Business Center, 144 Ferguson Road, Auburn, California.  Thereafter the Board will drive to the Middle Fork American River Project facilities and have a strategic planning session at the Hell Hole Dormitory, 20900 Soda Springs Road, Foresthill, California. The meeting will adjourn at 5:00 p.m."
  },
  {
    date: '10-8-2021 2:00PM',
    note: 'Board meeting to reconvene Thursday, October 8, 8:00 a.m. at Hell Hole Dormitory for strategic planning and tour of Middle Fork American River Project facilities, returning to Placer County Water Agency Business Center, 144 Ferguson Road, Auburn, California, at approximately noon.'
  },
  {date: '10-21-2021 2:00PM'},
  {date: '11-4-2021 2:00PM'},
  {date: '11-18-2021 2:00PM'},
  {date: '12-6-2021 2:00PM'},
  {date: '12-16-2021 2:00PM'}
]

const parseFn = (dateStr: string) =>
  parse(dateStr, "M-d-yyyy h':'mma", new Date())

export const boardMeetingDates = boardMeetings.map((bm) => parseFn(bm.date))

export const futureBoardMeetingDates = boardMeetingDates.filter((bm) =>
  isFuture(bm)
)

export const futureBoardMeetings = boardMeetings.filter((bm) =>
  isFuture(parseFn(bm.date))
)

// export const nextBoardMeetingDate = min(futureBoardMeetingDates)

export const nextBoardMeeting = futureBoardMeetings.reduce<
  | {
      note?: string
      date: Date
    }
  | undefined
>((p, v) => {
  const vDate = parseFn(v.date)
  if (!vDate && !p) {
    return
  }
  if (!p?.date) {
    return {...v, date: vDate}
  }
  return isBefore(p.date, vDate) ? {...p, date: p.date} : {...v, date: vDate}
}, undefined)
