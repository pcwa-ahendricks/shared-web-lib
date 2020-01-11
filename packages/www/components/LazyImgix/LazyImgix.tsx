import React from 'react'
import Imgix from 'react-imgix'
import clsx from 'clsx'

type ImgixProps = React.ComponentProps<typeof Imgix>

// [TODO] Can't figure out how to best do this with Typescript; "any" shouldn't be necessary. This issue pops up when an attribute such as 'data-lowsrc' or 'data-optimumx' is used with htmlAttributes prop.
export type LazyImgixProps = Omit<ImgixProps, 'htmlAttributes'> & {
  htmlAttributes: any
}

const LazyImgix = ({
  className: classNameProp,
  sizes = 'auto',
  ...rest
}: LazyImgixProps) => {
  return (
    <Imgix
      className={clsx([classNameProp, 'lazyload'])}
      sizes={sizes}
      attributeConfig={{
        src: 'data-src',
        srcSet: 'data-srcset',
        sizes: 'data-sizes'
      }}
      {...rest}
    />
  )
}

export default LazyImgix
