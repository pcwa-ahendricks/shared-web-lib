// cspell:ignore Lightbox
import React, {useMemo, Fragment} from 'react'
import NextLink from 'next/link'
import {
  PickedPublicationResponse
  // MappedMultimedia
} from '@components/multimedia/MultimediaStore'
import {ListItem, ListItemAvatar, ListItemText} from '@material-ui/core'
import {useTheme} from '@material-ui/core/styles'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import slugify from 'slugify'
import {ColumnBox} from '@components/boxes/FlexBox'

type Props = {
  publication: PickedPublicationResponse
  thumbMedia?: PickedPublicationResponse
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
  const publicationSlug = useMemo(
    () => slugify(publication.derivedFilenameAttr?.base ?? ''),
    [publication]
  )

  const thumbWith = 100

  const title =
    publication.metadata?.title || publication.derivedFilenameAttr?.title

  return (
    <Fragment>
      <NextLink
        passHref
        href="/resource-library/publications/[publication]"
        as={`/resource-library/publications/${publicationSlug}`}
        scroll
      >
        <ListItem button component="a">
          <ListItemAvatar>
            <ColumnBox
              bgcolor={theme.palette.common.white}
              borderColor={theme.palette.grey['300']}
              border={1}
              mr={2}
              width={thumbWith}
            >
              <LazyImgix
                width={thumbWith}
                src={thumbUrl}
                htmlAttributes={{
                  alt: `Thumbnail image for ${title} publication`,
                  style: {
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    height: thumbWith * (11 / 8.5) // Default thumbnail to 8.5x11 w/h ratio.
                  }
                }}
              />
            </ColumnBox>
          </ListItemAvatar>
          <ListItemText
            primary={title}
            color="primary"
            primaryTypographyProps={{variant: 'subtitle1'}}
          />
        </ListItem>
      </NextLink>
    </Fragment>
  )
}

export default MultimediaPublication
