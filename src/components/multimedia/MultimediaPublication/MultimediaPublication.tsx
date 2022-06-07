// cspell:ignore Lightbox
import React, {useMemo, Fragment} from 'react'
import NextLink from 'next/link'
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  useTheme
} from '@material-ui/core'
import slugify from 'slugify'
import {ColumnBox} from 'mui-sleazebox'
import Image from 'next/image'
import {imgixUrlLoader} from '@lib/imageLoader'
import {PickedPublicationResponse} from '@lib/types/multimedia'

type Props = {
  publication: PickedPublicationResponse
  thumbMedia?: PickedPublicationResponse
}

// const useStyles = makeStyles(() =>
//   createStyles({

//   })
// )

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
        href="/education-center/documents/[publication]"
        as={`/education-center/documents/${publicationSlug}`}
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
              <Image
                layout="responsive"
                sizes="(min-width: 600px) 35vw, 15vw"
                // width={thumbWith}
                loader={imgixUrlLoader}
                src={thumbUrl}
                objectFit="cover"
                objectPosition="center top"
                alt={`Thumbnail image for ${title} publication`}
                width={850}
                height={1100}
              />
            </ColumnBox>
          </ListItemAvatar>
          <ListItemText
            primary={title}
            // color="primary"
            primaryTypographyProps={{variant: 'subtitle1'}}
          />
        </ListItem>
      </NextLink>
    </Fragment>
  )
}

export default MultimediaPublication
