// cspell:ignore pageview
import ReactGA from 'react-ga'
const PCWA_WEB_UNIQUE_ID = 'UA-85520609-1'

export const initGA = () => {
  ReactGA.initialize(PCWA_WEB_UNIQUE_ID)
}

export const logPageView = () => {
  ReactGA.set({page: window.location.pathname})
  ReactGA.pageview(window.location.pathname)
}
