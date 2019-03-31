// @flow
import React, {useState, useCallback} from 'react'
import {Button, Slide, Snackbar, withWidth} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
// import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import MediaPreviewDialog from '@components/MediaPreviewDialog/MediaPreviewDialog'
import {stringify} from 'querystringify'
import classNames from 'classnames'

type Props = {
  classes: any,
  width: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const styles = (theme) => ({
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

const fileName = 'Irrigation-Efficiency-Terms-and-Conditions.pdf'
const termsConditionsUrl =
  'https://cosmic-s3.imgix.net/003f0ec0-5273-11e9-bcdc-03bbac853653-Irrigation-Efficiency-Terms-and-Conditions.pdf'

const baseOpts = {
  fm: 'jpg',
  w: 1400
}

const qs1 = stringify(
  {
    ...baseOpts,
    page: 1
  },
  true
)
const qs2 = stringify(
  {
    ...baseOpts,
    page: 2
  },
  true
)
const qs3 = stringify(
  {
    ...baseOpts,
    page: 3
  },
  true
)

const qsDl = stringify(
  {
    dl: fileName
  },
  true
)

const IrrigEffTermsConditions = ({classes, width}: Props) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const [scrollSnackOpen, setScrollSnackOpen] = useState<boolean>(false)

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

  const smDown = ['xs', 'sm'].indexOf(width) >= 0
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
          url={[
            `${termsConditionsUrl}${qs1}`,
            `${termsConditionsUrl}${qs2}`,
            `${termsConditionsUrl}${qs3}`
          ]}
          ext="jpg"
          scroll="body"
          fullWidth={false}
          maxWidth="lg"
          showActions
          dlUrl={`${termsConditionsUrl}${qsDl}`}
          onEntered={() => setScrollSnackOpen(true)}
          onExiting={() => setScrollSnackOpen(false)}
        />
      </div>
      <Snackbar
        className={classNames(classes.snackbar, {
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

function TransitionUp(props) {
  return <Slide {...props} direction="up" />
}
