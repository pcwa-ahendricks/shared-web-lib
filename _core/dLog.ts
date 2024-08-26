import isDev from './isDev'

/**
 * Logs messages to the console only in development mode.
 *
 * This function wraps `console.log` and logs the provided parameters to the console
 * if the `isDev` flag is set to `true`. It flattens the parameters for proper logging.
 * Optionally, a prefix can be added to the log messages to indicate they are development logs.
 *
 * @param {string} [prefix='[DEV]'] - An optional prefix for the log message.
 * @param {...Parameters<typeof console.log>} params - The parameters to pass to `console.log`.
 *
 * @example
 * dLog('This is a debug message');
 * // Logs '[DEV] This is a debug message' to the console if in development mode.
 *
 * @example
 * dLog('Value:', someVariable);
 * // Logs '[DEV] Value:' followed by the value of `someVariable` to the console if in development mode.
 *
 * @example
 * dLog('CUSTOM PREFIX', 'Custom prefix message');
 * // Logs 'CUSTOM PREFIX Custom prefix message' to the console if in development mode.
 */
export default function dLog(
  prefix: string = '[DEV]',
  ...params: Parameters<typeof console.log>
): void {
  if (isDev) {
    console.log(prefix, ...params)
  }
}
