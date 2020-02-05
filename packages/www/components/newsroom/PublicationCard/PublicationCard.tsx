import React, {useMemo, useCallback, useState} from 'react'
import {ChildBox} from '@components/boxes/FlexBox'
import {
  Card,
  Button,
  CardActionArea,
  CardMedia,
  Typography as Type,
  CardContent,
  CardActions,
  makeStyles,
  createStyles
} from '@material-ui/core'
import DownloadIcon from '@material-ui/icons/CloudDownload'
import {format} from 'date-fns'
import fileExtension from '@lib/fileExtension'
import slugify from 'slugify'
// import LazyImgix from '@components/LazyImgix/LazyImgix'
import ImgixFancier from '@components/ImgixFancier/ImgixFancier'

type Props = {
  title: string
  publishedDate: Date
  imgixURL: string
  cardMediaWidth?: number
  cardMediaHeight?: number
}

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
  cardMediaWidth = 300,
  cardMediaHeight = 250
}: Props) => {
  const classes = useStyles({cardMediaHeight})
  const [actionAreaIsHover, setActionAreaIsHover] = useState<boolean>(false)

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

  return (
    <ChildBox width={cardMediaWidth}>
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
            <ImgixFancier
              src={`${imgixURL}?auto=format`}
              htmlAttributes={{
                alt: `Thumbnail image and link for ${title} publication`
              }}
              height={cardMediaHeight}
              width={cardMediaWidth}
              imgixParams={{fit: 'crop', crop: 'top'}}
              paddingPercent={`${(cardMediaHeight / cardMediaWidth) * 100}%`}
              isHover={actionAreaIsHover}
            />
          </CardMedia>
          <CardContent>
            <Type gutterBottom variant="h4">
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
    </ChildBox>
  )
}

export default PublicationCard
