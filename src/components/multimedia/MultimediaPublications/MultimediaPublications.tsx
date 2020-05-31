// cspell:ignore Lightbox
import React, {Fragment, useCallback, useMemo} from 'react'
import {
  PublicationList,
  PickedPublicationResponse
  // MappedMultimedia
} from '@components/multimedia/MultimediaStore'
import {Box, List, Divider, Typography} from '@material-ui/core'
import {fileNameUtil} from '@lib/services/cosmicService'
import MultimediaPublication from '../MultimediaPublication/MultimediaPublication'
import Spacing from '@components/boxes/Spacing'
import groupBy from '@lib/groupBy'

type Props = {
  multimedia?: PublicationList
}

// const useStyles = makeStyles(() =>
//   createStyles({

//   })
// )

enum Sort {
  'Fact Sheets',
  'Brochures',
  'Books'
}

const MultimediaPublications = ({multimedia = []}: Props) => {
  // const classes = useStyles()

  const mappedPublications = multimedia.map((pub) => ({
    ...pub,
    derivedFilenameAttr: fileNameUtil(pub.original_name)
  }))

  const getThumbMedia = useCallback(
    (filename = '') => {
      const filenameRe = new RegExp(`${filename}.*`, 'i')
      return mappedPublications
        .filter((pub) => /.+(cover)/i.test(pub.original_name))
        .filter((pub) => filenameRe.test(pub.derivedFilenameAttr?.base))
        .shift()
    },
    [mappedPublications]
  )

  const groupedPublications = useMemo(() => {
    // Group publication objects by Category into JS Map.
    const groupedByCategory = [
      ...groupBy<PickedPublicationResponse, string>(
        // Since we are using getMediaPages() with linked Dynamic Publication page only display PDFs.
        mappedPublications
          .filter((pub) => pub.derivedFilenameAttr.extension === 'pdf')
          .filter((pub) => !/(cover)/i.test(pub.original_name)),
        (a) => a.metadata?.category
      )
    ] // Spreading Map will convert Map into an Array
      // Sort individual media objects by title property.
      .map(([cat, values]) => ({
        cat,
        sort: Object.keys(Sort).indexOf(cat),
        values: values.sort((a, b) => {
          if ((a.metadata?.title ?? '') < (b.metadata?.title ?? '')) return -1
          else if ((a.metadata?.title ?? '') > (b.metadata?.title ?? ''))
            return 1
          else return 0
        })
      }))
      .sort((a, b) => a.sort - b.sort) // Sort grouped database by Category.

    return groupedByCategory
  }, [mappedPublications])

  return (
    <Box>
      <List>
        {groupedPublications.map((group, grpIndex, arry) => (
          <Fragment key={grpIndex}>
            <Typography variant="h3" color="primary">
              {group.cat}
            </Typography>
            <Spacing size="small" />
            {group.values.map((pub) => (
              <Fragment key={pub._id}>
                <MultimediaPublication
                  publication={pub}
                  thumbMedia={getThumbMedia(pub.derivedFilenameAttr?.base)}
                />
                <Spacing size="x-small" />
              </Fragment>
            ))}
            {!(arry.length - 1 === grpIndex) ? (
              <Spacing size="large">
                <Divider />
              </Spacing>
            ) : null}
          </Fragment>
        ))}
      </List>
    </Box>
  )
}

export default MultimediaPublications
