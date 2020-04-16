// cspell:ignore Lightbox
import React, {Fragment} from 'react'
import NextLink from 'next/link'
import {
  PickedMultimediaResponse
  // MappedMultimedia
} from '@components/multimedia/MultimediaStore'
import {Box, ListItem, ListItemAvatar, ListItemText} from '@material-ui/core'
import {useTheme} from '@material-ui/core/styles'
import LazyImgix from '@components/LazyImgix/LazyImgix'

type Props = {
  publication: PickedMultimediaResponse
  thumbMedia?: PickedMultimediaResponse
}

// const useStyles = makeStyles(() =>
//   createStyles({

//   })
// )

/* eslint-disable @typescript-eslint/camelcase */
const MultimediaPublication = ({publication, thumbMedia}: Props) => {
  // const classes = useStyles()
  const theme = useTheme()

  const thumbUrl = thumbMedia?.imgix_url ?? publication.imgix_url

  return (
    <Fragment>
      <NextLink
        passHref
        href="/newsroom/news-releases/[release-date]"
        as={`/newsroom/news-releases/${publication.derivedFilenameAttr?.base}`}
        scroll
      >
        <ListItem button component="a">
          <ListItemAvatar>
            <Box
              bgcolor={theme.palette.common.white}
              borderColor={theme.palette.grey['300']}
              border={1}
              mr={2}
              width={100}
            >
              <LazyImgix
                width={100}
                src={thumbUrl}
                htmlAttributes={{
                  alt: `Thumbnail image for ${publication.derivedFilenameAttr?.title} publication`
                }}
              />
            </Box>
          </ListItemAvatar>
          <ListItemText
            primary={publication.derivedFilenameAttr?.title}
            color="primary"
            primaryTypographyProps={{variant: 'subtitle1'}}
          />
        </ListItem>
      </NextLink>
    </Fragment>
  )
}

export default MultimediaPublication
