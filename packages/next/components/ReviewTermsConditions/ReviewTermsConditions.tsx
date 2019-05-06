import React, {useState, useCallback, useMemo} from 'react'
import {Button, Slide, Snackbar, withWidth} from '@material-ui/core'
import {withStyles, createStyles, Theme} from '@material-ui/core/styles'
// import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import MediaPreviewDialog from '@components/MediaPreviewDialog/MediaPreviewDialog'
import {stringify} from 'querystringify'
import clsx from 'clsx'

type Props = {
  fileName: string
  pageCount: number
  termsConditionsUrl: string
  classes: any
  width: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const styles = (theme: Theme) =>
  createStyles({
    snackbar: {
      marginBottom: theme.spacing.unit * 2,
      '&$fullWidth': {
        marginBottom: 0
      }
    },
    fullWidth: {}
    // rightIcon: {
    //   marginLeft: theme.spacing.unit
    // }
  })

// const termsConditionsUrl =
//   'https://s3-us-west-2.amazonaws.com/cosmicjs/003f0ec0-5273-11e9-bcdc-03bbac853653-Irrigation-Efficiency-Terms-and-Conditions.pdf'

// const termsConditionsUrl =
//   '/static/docs/Irrigation Efficiency Terms and Conditions.pdf'

const baseOpts = {
  fm: 'jpg',
  w: 1400
}

const IrrigEffTermsConditions = ({
  classes,
  pageCount,
  width,
  termsConditionsUrl,
  fileName
}: Props) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const [scrollSnackOpen, setScrollSnackOpen] = useState<boolean>(false)

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

  const smDown = new Set(['xs', 'sm']).has(width)
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
        className={clsx(classes.snackbar, {
          [classes.fullWidth]: smDown
        })}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={scrollSnackOpen}
        // autoHideDuration={6000}
        onClose={() => setScrollSnackOpen(false)}
        TransitionComponent={TransitionUp}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id="message-id">Scroll down to continue</span>}
      />
    </React.Fragment>
  )
}

export default withWidth()(withStyles(styles)(IrrigEffTermsConditions))

function TransitionUp(props: any) {
  return <Slide {...props} direction="up" />
}
