export default function paramToStr(param?: string | string[]): string {
  return Array.isArray(param) ? param.join(',') : param || ''
}
