/**
 * A boolean flag indicating whether the current environment is development.
 *
 * This constant checks the `NODE_ENV` environment variable to determine if the
 * application is running in development mode. It is `true` if `NODE_ENV` is set
 * to `'development'`, and `false` otherwise.
 *
 * @type {boolean}
 *
 * @example
 * if (isDev) {
 *   console.log('Running in development mode');
 * }
 *
 * @example
 * // Conditionally execute code only in development
 * if (isDev) {
 *   enableDebuggingTools();
 * }
 */
const isDev = process.env.NODE_ENV === 'development'

export default isDev
