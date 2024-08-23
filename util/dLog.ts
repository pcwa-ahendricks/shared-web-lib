import isDev from './isDev'

export function dLog(...params: Parameters<(typeof console)['log']>) {
  isDev && console.log(params)
}
