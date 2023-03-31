import React from 'react'
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Theme,
  Tooltip
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import PlayIcon from '@mui/icons-material/PlayCircleOutline'
import {PlayListItem} from '@lib/types/youtube'

/*
  See https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/ImageListTile/ImageListTile.js for info regarding how the child <img/> component is handled.
*/

type Props = {
  items?: PlayListItem[]
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      color: theme.palette.common.white
    }
  })
)

export default function YoutubePlaylistImageList({items = []}: Props) {
  const classes = useStyles()

  return (
    <>
      <ImageList rowHeight={200} cols={2}>
        {items.map((item) => {
          return (
            <ImageListItem key={item.id} cols={1}>
              <img
                src={item.snippet.thumbnails.high.url}
                alt="Youtube How-To Video Thumbnail"
              />
              <ImageListItemBar
                title={item.snippet.title}
                subtitle={<span>{item.snippet.description}</span>}
                actionIcon={
                  <Tooltip title="Watch Video" placement="top" enterDelay={300}>
                    <IconButton
                      href={`https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Play video titled ${item.snippet.title}`}
                      className={classes.icon}
                      size="large"
                    >
                      <PlayIcon />
                    </IconButton>
                  </Tooltip>
                }
              />
            </ImageListItem>
          )
        })}
      </ImageList>
    </>
  )
}
