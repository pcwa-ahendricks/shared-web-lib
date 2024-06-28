import {getMonth, getYear} from 'date-fns'

export default function lastTenWaterYears() {
  const now = new Date()
  const currentYear = getYear(now),
    years = [],
    currentMonth = getMonth(now) + 1 // Month index is 0 based
  let currentWaterYear = currentYear
  // If we are in Oct., Nov., Dec. start a year ahead
  if ([10, 11, 12].indexOf(currentMonth) >= 0) {
    currentWaterYear = currentWaterYear + 1
  }
  let startYear = currentWaterYear - 10
  while (startYear <= currentWaterYear) {
    years.push(startYear++)
  }
  return years
}
