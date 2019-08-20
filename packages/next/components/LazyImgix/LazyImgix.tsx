import React from 'react'
import Imgix from 'react-imgix'
import clsx from 'clsx'

type Props = {
  src: string
  children?: React.ReactNode
  className?: string
  onMounted?: () => any
  htmlAttributes?: any
  disableQualityByDPR?: boolean
  disableSrcSet?: boolean
  disableLibraryParam?: boolean
  imgixParams?: any
  sizes?: string
  width?: number
  height?: number
}

const LazyImgix = ({className: classNameProp, children, ...rest}: Props) => {
  return (
    <Imgix
      className={clsx([classNameProp, 'lazyload'])}
      sizes="auto"
      attributeConfig={{
        src: 'data-src',
        srcSet: 'data-srcset',
        sizes: 'data-sizes'
      }}
      {...rest}
    >
      {children}
    </Imgix>
  )
}

export default LazyImgix
