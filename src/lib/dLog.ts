const isDev = process.env.NODE_ENV === 'development'

export function dLog(...params: Parameters<(typeof console)['log']>) {
  isDev && console.log(params)
}
