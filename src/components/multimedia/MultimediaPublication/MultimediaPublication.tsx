// cspell:ignore Lightbox
import React, {useMemo, Fragment} from 'react'
import NextLink from 'next/link'
import {ListItemAvatar, ListItemButton, ListItemText} from '@mui/material'
import slugify from 'slugify'
import {ColumnBox} from '@components/MuiSleazebox'
import Image from 'next/legacy/image'
import {imgixUrlLoader} from '@lib/imageLoader'
import {PickedPublicationResponse} from '@lib/types/multimedia'
import useTheme from '@hooks/useTheme'

type Props = {
  publication: PickedPublicationResponse
  thumbMedia?: PickedPublicationResponse
}

const MultimediaPublication = ({publication, thumbMedia}: Props) => {
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
      >
        <ListItemButton>
          <ListItemAvatar>
            <ColumnBox
              sx={{
                bgcolor: theme.palette.common.white,
                borderColor: theme.palette.grey['300'],
                borderWidth: 1,
                borderStyle: 'solid'
              }}
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
        </ListItemButton>
      </NextLink>
    </Fragment>
  )
}

export default MultimediaPublication
