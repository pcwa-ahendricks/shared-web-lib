import React, {useState, useCallback, useMemo} from 'react'
import {Button, Snackbar, SnackbarContent, Theme} from '@material-ui/core'
import {makeStyles, createStyles} from '@material-ui/core/styles'
// import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import MediaPreviewDialog from '@components/MediaPreviewDialog/MediaPreviewDialog'
import {stringify} from 'querystringify'
import {SlideTransition as Transition} from '@components/Transition/Transition'

type Props = {
  fileName: string
  pageCount: number
  termsConditionsUrl: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    snackbar: {
      marginBottom: theme.spacing(2)
    },
    snackbarContentRoot: {
      justifyContent: 'center'
    }
  })
)

// Imgix API query parameters.
const baseOpts = {
  fm: 'jpg',
  w: 1400
}

const IrrigEffTermsConditions = ({
  pageCount,
  termsConditionsUrl,
  fileName
}: Props) => {
  const classes = useStyles()
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const [scrollSnackOpen, setScrollSnackOpen] = useState<boolean>(false)

  // Imgix API query parameter for downloading image.
  const qsDownloadUrl = useMemo(
    () =>
      stringify(
        {
          dl: fileName
        },
        true
      ),
    [fileName]
  )

  const usePreviewUrls = useMemo(
    () =>
      [...Array(pageCount).keys()].map((pageIndex) => {
        const qs = stringify(
          {
            ...baseOpts,
            page: pageIndex + 1 // pageIndex is 0 based.
          },
          true
        )
        return `${termsConditionsUrl}${qs}`
      }),
    [pageCount, termsConditionsUrl]
  )

  const buttonClickHandler = useCallback(() => {
    setDialogOpen(true)
  }, [])

  const scrollHandler = useCallback(
    (evt) => {
      if (scrollSnackOpen && evt.target.scrollTop > 100) {
        setScrollSnackOpen(false)
      }
    },
    [scrollSnackOpen]
  )

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="secondary"
        // target="_blank"
        // rel="noopener noreferrer"
        // href={termsConditionsUrl}
        onClick={buttonClickHandler}
      >
        Review Terms & Conditions
        {/* <OpenInNewIcon className={classes.rightIcon} /> */}
      </Button>
      <div onScroll={scrollHandler}>
        <MediaPreviewDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          name={fileName}
          url={usePreviewUrls}
          ext="jpg"
          scroll="body"
          fullWidth={false}
          maxWidth="xl"
          showActions
          dlUrl={`${termsConditionsUrl}${qsDownloadUrl}`}
          onEntered={() => setScrollSnackOpen(true)}
          onExiting={() => setScrollSnackOpen(false)}
        />
      </div>
      <Snackbar
        className={classes.snackbar}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={scrollSnackOpen}
        // autoHideDuration={6000}
        onClose={() => setScrollSnackOpen(false)}
        TransitionComponent={Transition}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
      >
        <SnackbarContent
          message={<span id="message-id">Scroll down to continue</span>}
          classes={{root: classes.snackbarContentRoot}}
        />
      </Snackbar>
    </React.Fragment>
  )
}

export default IrrigEffTermsConditions
