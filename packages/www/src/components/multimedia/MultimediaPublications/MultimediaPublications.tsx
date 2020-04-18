// cspell:ignore Lightbox
import React, {Fragment, useCallback, useMemo} from 'react'
import {
  PublicationList
  // MappedMultimedia
} from '@components/multimedia/MultimediaStore'
import {Box, List, Divider} from '@material-ui/core'
import {fileNameUtil} from '@lib/services/cosmicService'
import MultimediaPublication from '../MultimediaPublication/MultimediaPublication'
import Spacing from '@components/boxes/Spacing'

type Props = {
  multimedia?: PublicationList
}

// const useStyles = makeStyles(() =>
//   createStyles({

//   })
// )

/* eslint-disable @typescript-eslint/camelcase */
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
        .filter((pub) => {
          return filenameRe.test(pub.derivedFilenameAttr?.base)
        })
        .shift()
    },
    [mappedPublications]
  )

  // Since we are using getMediaPDFPages() with linked Dynamic Publication page only display PDFs.
  const filteredPublications = useMemo(
    () =>
      mappedPublications
        .filter((pub) => pub.derivedFilenameAttr.extension === 'pdf')
        .filter((pub) => !/(cover)/i.test(pub.original_name)),
    [mappedPublications]
  )

  return (
    <Box>
      <List>
        {filteredPublications.map((pub, idx, arry) => (
          <Fragment key={pub._id}>
            <MultimediaPublication
              publication={pub}
              thumbMedia={getThumbMedia(pub.derivedFilenameAttr?.base)}
            />
            {!(arry.length - 1 === idx) ? (
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
