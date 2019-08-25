import fetch from 'isomorphic-unfetch'
// import {stringify} from 'querystringify'
import ErrorResponse from '@lib/ErrorResponse'

const COSMIC_URL = process.env.NEXT_COSMIC_URL || ''

const getSalarySchedule = async (): Promise<any> => {
  try {
    const url = `${COSMIC_URL}/salary-schedule`
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      const text = await response.text()
      const error: ErrorResponse = new Error(text || response.statusText)
      error.response = response
      throw error
    }
  } catch (error) {
    console.warn(error)
    throw error
  }
}

export {getSalarySchedule}
