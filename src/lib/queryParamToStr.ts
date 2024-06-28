import {NextPageContext} from 'next'

export default function queryParamToStr(
  param?: NextPageContext['query'][0]
): string {
  if (Array.isArray(param)) {
    param = param.join(',')
  }
  return param ?? ''
}
