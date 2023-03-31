import React from 'react'
import {
  BoxProps,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography as Type
} from '@mui/material'
import {ChildBox} from 'mui-sleazebox'
import {MultimediaPhotoGallery} from '../MultimediaPhotoGalleries/MultimediaPhotoGalleries'
import {MultimediaVideoGallery} from '../MultimediaVideoGalleries/MultimediaVideoGalleries'
import Image from 'next/image'
import {imgixUrlLoader} from '@lib/imageLoader'

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
}: Props) => (
  <ChildBox width={imageWidth} {...rest}>
    <Card onClick={onCardClick}>
      <CardActionArea>
        <CardMedia component="div">
          <Image
            loader={imgixUrlLoader}
            src={gallery.galleryCover.imgix_url}
            width={imageWidth}
            height={imageHeight}
            objectFit="cover"
            alt={`Thumbnail image for ${gallery.label} gallery`}
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

export default MultimediaGalleryCard
