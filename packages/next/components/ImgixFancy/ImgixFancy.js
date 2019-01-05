import Imgix from 'react-imgix'

const ImgixFancy = ({
  src,
  lqipSrc,
  sizes,
  htmlAttributesProps,
  paddingPercent,
  ...rest
}) => {
  return (
    <div className="mediabox" style={{paddingBottom: paddingPercent}}>
      <Imgix
        className="lazyload mediabox-img"
        src={src}
        sizes={sizes}
        attributeConfig={{
          src: 'data-src',
          srcSet: 'data-srcset',
          sizes: 'data-sizes'
        }}
        htmlAttributes={{
          // 'data-expand': -400, //debug
          'data-lowsrc':
            lqipSrc || `${src}?auto=format&fit=crop&ixlib=react-8.5.1&w=40`, // low quality image here
          style: {width: '100%'},
          ...htmlAttributesProps
        }}
        {...rest}
      />
    </div>
  )
}

ImgixFancy.defaultProps = {
  sizes: 'auto',
  htmlAttributesProps: {},
  paddingPercent: '66.6667%'
}

export default ImgixFancy
