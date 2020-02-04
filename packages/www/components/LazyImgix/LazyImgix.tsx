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
  htmlAttributes,
  ...rest
}: LazyImgixProps) => {
  const {style = {}, ...restOfHtmlAttributes} = htmlAttributes ?? {}
  return (
    <Imgix
      className={clsx([classNameProp, 'lazyload'])}
      sizes={sizes}
      attributeConfig={{
        src: 'data-src',
        srcSet: 'data-srcset',
        sizes: 'data-sizes'
      }}
      // By default, don't let image grow wider than it's container. The affects of not using width can be seen with Responsive Image Template Page when shrinking the browser width to that of a mobile device. When doing so the image doesn't shrink responsively. maxWidth would work but doesn't grow the image to 100% when needed (See Env. Planning Page and image for example of when maxWidth is only used; In such a case, the image won't center and grow when needed during a screen resize), so width is used here for both reasons.
      htmlAttributes={{
        style: {width: '100%', ...style},
        ...restOfHtmlAttributes
      }}
      {...rest}
    />
  )
}

export default LazyImgix
