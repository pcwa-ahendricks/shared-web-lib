import React from 'react'
import {
  BoxProps,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography as Type
} from '@material-ui/core'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import {ChildBox} from '@components/boxes/FlexBox'
import {MultimediaPhotoGallery} from '../MultimediaPhotoGalleries/MultimediaPhotoGalleries'
import {MultimediaVideoGallery} from '../MultimediaVideoGalleries/MultimediaVideoGalleries'

type Props = {
  gallery: MultimediaPhotoGallery | MultimediaVideoGallery
  imageWidth: number
  imageHeight: number
  onCardClick?: () => any
} & BoxProps

const MultimediaGalleryCard = ({
  gallery,
  onCardClick,
  imageWidth,
  imageHeight,
  ...rest
}: Props) => {
  return (
    <ChildBox width={imageWidth} {...rest}>
      <Card onClick={onCardClick}>
        <CardActionArea>
          <CardMedia component="div">
            <LazyImgix
              src={gallery.galleryCover.imgix_url}
              width={imageWidth}
              htmlAttributes={{
                alt: `Thumbnail image for ${gallery.label} gallery`,
                style: {
                  height: imageHeight,
                  objectFit: 'cover'
                }
              }}
            />
          </CardMedia>
          <CardContent>
            <Type gutterBottom variant="h4">
              {gallery.label}
            </Type>
          </CardContent>
        </CardActionArea>
      </Card>
    </ChildBox>
  )
}

export default MultimediaGalleryCard
