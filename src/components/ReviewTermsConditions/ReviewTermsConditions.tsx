import React, {useState, useCallback, useMemo} from 'react'
import {Button, Snackbar, SnackbarContent, Slide, useTheme} from '@mui/material'
// import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import MediaPreviewDialog from '@components/MediaPreviewDialog/MediaPreviewDialog'
import {stringify} from 'querystringify'
import {Theme} from '@lib/material-theme'
// import {SlideTransition as Transition} from '@components/Transition/Transition'

type Props = {
  fileName: string
  pageCount: number
  termsConditionsUrl: string
  caption?: string
}

// Imgix API query parameters.
const baseOpts = {
  fm: 'jpg',
  w: 1400
}

const ReviewTermsConditions = ({
  pageCount,
  termsConditionsUrl,
  fileName,
  caption = 'Review Terms & Conditions'
}: Props) => {
  const theme = useTheme<Theme>()
  const style = {
    snackbar: {
      marginBottom: theme.spacing(2)
    },
    snackbarContentRoot: {
      justifyContent: 'center'
    }
  }
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
    (evt: any) => {
      if (scrollSnackOpen && evt?.target?.scrollTop > 100) {
        setScrollSnackOpen(false)
      }
    },
    [scrollSnackOpen]
  )

  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        // target="_blank"
        // rel="noopener noreferrer"
        // href={termsConditionsUrl}
        onClick={buttonClickHandler}
      >
        {caption}
        {/* <OpenInNewIcon className={classes.rightIcon} /> */}
      </Button>
      <div onScroll={scrollHandler}>
        <MediaPreviewDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          name={fileName}
          url={usePreviewUrls}
          scroll="body"
          fullWidth={false}
          maxWidth="xl"
          showActions
          dlUrl={`${termsConditionsUrl}${qsDownloadUrl}`}
          TransitionProps={{
            onEntered: () => setScrollSnackOpen(true),
            onExiting: () => setScrollSnackOpen(false)
          }}
          ImageProps={{width: 3840, height: 4969}}
        />
      </div>
      <Snackbar
        sx={{
          ...style.snackbar
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={scrollSnackOpen}
        // autoHideDuration={6000}
        onClose={() => setScrollSnackOpen(false)}
        TransitionComponent={Slide}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
      >
        <SnackbarContent
          message={<span id="message-id">Scroll down to continue</span>}
          sx={{
            ...style.snackbarContentRoot
          }}
        />
      </Snackbar>
    </>
  )
}

export default ReviewTermsConditions
