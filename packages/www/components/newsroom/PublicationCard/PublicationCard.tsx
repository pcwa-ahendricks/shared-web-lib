import React, {useMemo} from 'react'
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

type Props = {
  title: string
  publishedDate: Date
  imgixURL: string
}

const useStyles = makeStyles(() =>
  createStyles({
    cardMedia: {
      height: 200
    }
  })
)

const PublicationCard = ({title, publishedDate, imgixURL}: Props) => {
  const classes = useStyles()

  const downloadAs = useMemo(
    () => `${slugify(title)}.${fileExtension(imgixURL)}`,
    [imgixURL, title]
  )

  return (
    <ChildBox maxWidth={300}>
      <Card>
        <CardActionArea
          href={imgixURL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <CardMedia
            className={classes.cardMedia}
            component="img"
            src={`${imgixURL}?auto=format`}
            alt="Design for the New California Landscape"
          />
          <CardContent>
            <Type gutterBottom variant="h5">
              {title}
            </Type>
            <Type variant="body2" color="textSecondary" paragraph>
              Published {format(publishedDate, 'MM/dd/yyyy')}
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
