// cspell:ignore nospace
declare module 'prettysize' {
  const pretty = (
    size: number,
    nospace?: boolean = false,
    one?: boolean = false,
    places?: number = 1,
    numOnly?: boolean
  ): string | number => {}
  export default pretty
}
