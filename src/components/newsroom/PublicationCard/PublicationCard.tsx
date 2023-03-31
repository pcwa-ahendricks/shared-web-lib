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
  useTheme,
  BoxProps
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import DownloadIcon from '@mui/icons-material/CloudDownload'
import {format} from 'date-fns'
import fileExtension from '@lib/fileExtension'
import ImageFancier from '@components/ImageFancier/ImageFancier'
import slugify from 'slugify'
import {stringify} from 'querystringify'
import {ImageProps} from 'next/image'

export type PublicationCardProps = {
  title: string
  publishedDate: Date
  imgixURL: string
  thumbImgixURL?: string
  cardMediaWidth?: number
  cardMediaHeight?: number
  objectPosition?: ImageProps['objectPosition']
  sizes?: ImageProps['sizes']
} & BoxProps

type UseStylesProps = {
  cardMediaHeight: number
}

const useStyles = makeStyles(() =>
  createStyles({
    cardMedia: ({cardMediaHeight}: UseStylesProps) => ({
      height: cardMediaHeight,
      overflow: 'hidden'
    })
  })
)

const PublicationCard = ({
  title,
  publishedDate,
  imgixURL,
  thumbImgixURL: thumbImgixURLProp,
  cardMediaWidth = 300,
  cardMediaHeight = 250,
  objectPosition = 'center top',
  sizes,
  ...rest
}: PublicationCardProps) => {
  const classes = useStyles({cardMediaHeight})
  const theme = useTheme()
  const isMDUp = useMediaQuery(theme.breakpoints.up('md'))
  const [actionAreaIsHover, setActionAreaIsHover] = useState<boolean>() // For animation w/ <ImageFancier/> to work properly this must be initialized as undefined
  const thumbImgixURL = thumbImgixURLProp ?? imgixURL // If thumbnail image src specified use it, if not, use the other imgixURL prop.

  // Don't use filenamify with imgix dl query parameter since it requires a safe URL.
  const downloadAs = useMemo(
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
          href={imgixURL}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={enterHandler}
          onMouseLeave={leaveHandler}
        >
          <CardMedia
            className={classes.cardMedia}
            // component={}
            // src={}
            // alt=""
          >
            <ImageFancier
              // In case imgix returns a partially transparent image when converting PDF use bg to background fill w/ white.
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
            href={`${imgixURL}?dl=${downloadAs}`}
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
