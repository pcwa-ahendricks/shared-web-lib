import {NextPageContext} from 'next'

const queryParamToStr = (param?: NextPageContext['query'][0]): string => {
  if (Array.isArray(param)) {
    param = param.join(',')
  }
  return param ?? ''
}

// Don't use w/ Vercel lambda, ?? operator won't work.
export const paramToStr = (param?: string | string[]): string => {
  if (Array.isArray(param)) {
    param = param.join(',')
  }
  return param ?? ''
}

export default queryParamToStr
