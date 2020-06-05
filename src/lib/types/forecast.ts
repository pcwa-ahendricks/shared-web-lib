// import {stringify} from 'querystringify'
// import {Location} from '@components/forecast/ForecastDisplay/ForecastDisplay'

// Using relative URL.
// const FORECAST_URL = '/api/forecast'

export interface ForecastResponse {
  temperature: string
  icon: string
  stationId: string
  latitude: string
  longitude: string
}

// const fetchForecast = async (location: Location) => {
//   const url = `${FORECAST_URL}${stringify(location.queryParams, true)}`
//   try {
//     return await fetcher<ForecastResponse>(url)
//   } catch (error) {
//     console.warn(error)
//     return {} as ForecastResponse
//   }
// }

// const fetchForecasts = async (forecastLocations: Location[]) => {
//   const forecastData = await Promise.all(
//     forecastLocations.map(async (location) => ({
//       id: location.id,
//       title: location.title,
//       data: await fetchForecast(location)
//     }))
//   )
//   return forecastData
// }

// export {fetchForecasts}
