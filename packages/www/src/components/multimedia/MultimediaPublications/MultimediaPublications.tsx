// cspell:ignore Lightbox
import React, {Fragment, useCallback, useMemo} from 'react'
import {
  MultimediaList
  // MappedMultimedia
} from '@components/multimedia/MultimediaStore'
import {Box, List, Divider} from '@material-ui/core'
import {fileNameUtil} from '@lib/services/cosmicService'
import MultimediaPublication from '../MultimediaPublication/MultimediaPublication'
import Spacing from '@components/boxes/Spacing'

type Props = {
  multimedia?: MultimediaList
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
      console.log(filenameRe)
      return mappedPublications
        .filter((pub) => /.+(cover)/i.test(pub.original_name))
        .filter((pub) => {
          return filenameRe.test(pub.derivedFilenameAttr?.base)
        })
        .shift()
    },
    [mappedPublications]
  )

  const filteredPublications = useMemo(
    () =>
      mappedPublications.filter((pub) => !/(cover)/i.test(pub.original_name)),
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
