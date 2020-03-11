import React from 'react'
import {
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  Theme,
  Tooltip
} from '@material-ui/core'
import PlayIcon from '@material-ui/icons/PlayCircleOutline'
import {makeStyles, createStyles} from '@material-ui/core/styles'
import {PlayListItem} from '@lib/types/youtube'

/*
  See https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/GridListTile/GridListTile.js for info regarding how the child <img/> component is handled.
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

const YoutubePlaylistGridList = ({items = []}: Props) => {
  const classes = useStyles()

  return (
    <>
      <GridList cellHeight={200} cols={2}>
        {items.map((item) => {
          return (
            <GridListTile key={item.id} cols={1}>
              <img
                src={item.snippet.thumbnails.high.url}
                alt="Youtube How-To Video Thumbnail"
              />
              <GridListTileBar
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
                    >
                      <PlayIcon />
                    </IconButton>
                  </Tooltip>
                }
              />
            </GridListTile>
          )
        })}
      </GridList>
    </>
  )
}

export default YoutubePlaylistGridList
