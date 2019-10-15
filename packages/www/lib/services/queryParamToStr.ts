import {NextPageContext} from 'next'

const queryParamToStr = (param?: NextPageContext['query'][0]): string => {
  if (Array.isArray(param)) {
    param = param.join(',')
  }
  return param || ''
}

export default queryParamToStr
