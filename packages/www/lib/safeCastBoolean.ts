export type BooleanAsString = 'true' | 'false' | ''

const safeCastBooleanToStr = (approved?: boolean | null): BooleanAsString => {
  if (approved === undefined || approved === null) {
    return ''
  } else {
    return approved === true ? 'true' : 'false'
  }
}

const safeCastStrToBoolean = (value?: string | null): boolean | undefined => {
  return value === 'true' ? true : value === 'false' ? false : undefined
}

export {safeCastStrToBoolean, safeCastBooleanToStr}
