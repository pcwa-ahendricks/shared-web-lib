import React, {useMemo, useCallback, useState} from 'react'
import {
  Card,
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Typography as Type,
  CardContent,
  CardActions,
  TypographyProps,
  useMediaQuery,
  BoxProps
} from '@mui/material'
import DownloadIcon from '@mui/icons-material/CloudDownload'
import {format} from 'date-fns'
import fileExtension from '@lib/fileExtension'
import ImageFancier from '@components/ImageFancier/ImageFancier'
import slugify from 'slugify'
import {stringify} from 'querystringify'
import {ImageProps} from 'next/legacy/image'
import useTheme from '@hooks/useTheme'

export type PublicationCardProps = {
  title: string
  publishedDate: Date
  imgixURL: string
  downloadUrl?: string
  linkUrl?: string
  thumbImgixURL?: string
  cardMediaWidth?: number
  cardMediaHeight?: number
  objectPosition?: ImageProps['objectPosition']
  sizes?: ImageProps['sizes']
} & BoxProps

const PublicationCard = ({
  title,
  publishedDate,
  imgixURL,
  linkUrl,
  downloadUrl,
  thumbImgixURL: thumbImgixURLProp,
  cardMediaWidth = 300,
  cardMediaHeight = 250,
  objectPosition = 'center top',
  sizes,
  ...rest
}: PublicationCardProps) => {
  const theme = useTheme()
  const style = {
    cardMedia: {
      height: cardMediaHeight,
      overflow: 'hidden'
    }
  }
  const isMDUp = useMediaQuery(theme.breakpoints.up('md'))
  const [actionAreaIsHover, setActionAreaIsHover] = useState<boolean>() // For animation w/ <ImageFancier/> to work properly this must be initialized as undefined
  const thumbImgixURL = thumbImgixURLProp ?? imgixURL // If thumbnail image src specified use it, if not, use the other imgixURL prop.

  // Don't use filenamify with imgix dl query parameter since it requires a safe URL.
  const imgixDownloadAs = useMemo(
    () => `${slugify(title)}.${fileExtension(imgixURL)}`,
    [imgixURL, title]
  )

  const enterHandler = useCallback(() => {
    setActionAreaIsHover(true)
  }, [])

  const leaveHandler = useCallback(() => {
    setActionAreaIsHover(false)
  }, [])

  const pubCardHeader: TypographyProps['variant'] = isMDUp
    ? 'subtitle1'
    : 'subtitle2'

  return (
    <Box width={cardMediaWidth} {...rest}>
      <Card>
        <CardActionArea
          href={linkUrl || imgixURL}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={enterHandler}
          onMouseLeave={leaveHandler}
        >
          <CardMedia
            sx={{...style.cardMedia}}
            // component={}
            // src={}
            // alt=""
          >
            <ImageFancier
              // In case imgix returns a partially transparent image when converting PDF use bg to background fill w/ white.
              layout="responsive"
              src={`${thumbImgixURL}${stringify(
                {
                  bg: 'ffffff'
                },
                true
              )}`}
              objectFit="cover"
              objectPosition={objectPosition}
              alt={`Thumbnail image and link for ${title} publication`}
              height={cardMediaHeight}
              width={cardMediaWidth}
              isHover={actionAreaIsHover}
              sizes={sizes}
              defaultGrey
            />
          </CardMedia>
          <CardContent>
            <Type gutterBottom variant={pubCardHeader}>
              {title}
            </Type>
            <Type variant="body2" color="textSecondary" paragraph>
              Published {format(publishedDate, 'M/dd/yyyy')}
            </Type>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            startIcon={<DownloadIcon color="action" />}
            href={downloadUrl || `${imgixURL}?dl=${imgixDownloadAs}`}
            // It's unclear if the download attribute helps in this regard, so leaving it commented out.
            // download
            target="_blank"
          >
            <Type variant="inherit" color="textSecondary">
              Download
            </Type>
          </Button>
        </CardActions>
      </Card>
    </Box>
  )
}

export default PublicationCard
