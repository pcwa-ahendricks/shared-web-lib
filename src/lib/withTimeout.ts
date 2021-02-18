export default function withTimeout<T>(msecs: number, promise: Promise<any>) {
  const timeout = new Promise((_resolve, reject) => {
    setTimeout(() => {
      reject(new Error('timeout'))
    }, msecs)
  })
  return Promise.race<T>([timeout, promise])
}
