// cspell:ignore Subheader
import React from 'react'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Slide
} from '@material-ui/core'
import {withStyles, createStyles, Theme} from '@material-ui/core/styles'
import {IRRIGATION_METHODS} from '@components/formFields/IrrigationMethodSelect'
import WaitToGrow from '@components/WaitToGrow/WaitToGrow'
import {Field, connect, FormikProps, FieldProps} from 'formik'

type Props = {
  open: boolean
  onClose: () => void
  fullWidth?: boolean
  classes: any
  formik?: FormikProps<any>
}

// Text importance dialog. Eliminate opacity used by Paper by default (theme.palette.background.paper, "rgba(242, 242, 242, 0.9)")
const styles = (theme: Theme) =>
  createStyles({
    paper: {
      backgroundColor: theme.palette.grey[200]
    },
    qualifyMsg: {
      marginTop: theme.spacing.unit * 3
    }
  })

const IrrigationMethodDialog = ({
  open = false,
  onClose,
  classes,
  formik
}: Props) => {
  const eligibleFieldsTouched =
    formik && [formik.touched.irrigMethod].every(Boolean)

  return (
    <Dialog
      open={open}
      disableBackdropClick={true}
      maxWidth="sm"
      fullWidth
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      TransitionComponent={Transition}
      classes={{
        paper: classes.paper
      }}
    >
      <DialogTitle id="form-dialog-title">Check Rebate Eligibility</DialogTitle>
      <DialogContent>
        <DialogContentText variant="h3" color="primary" gutterBottom>
          How is your landscape currently irrigated?
        </DialogContentText>
        <Field name="irrigMethod">
          {({field, form}: FieldProps<any>) => {
            const {setFieldValue, errors, setFieldTouched, touched} = form
            const {name} = field
            const currentError = errors[name]
            const fieldHasError = Boolean(currentError)
            const fieldWasTouched = Boolean(touched[name])
            const fieldIsTouchedWithError = fieldHasError && fieldWasTouched

            const clickHandler = (irrigMethod: string) => () => {
              setFieldValue(name, irrigMethod, true)
              setFieldTouched(name, true)
            }

            return (
              <div>
                <List
                  subheader={
                    <ListSubheader component="div">
                      Choose one of the following
                    </ListSubheader>
                  }
                >
                  {IRRIGATION_METHODS.map((method) => (
                    <ListItem
                      key={method}
                      button
                      divider
                      disabled={fieldIsTouchedWithError}
                      onClick={clickHandler(method)}
                    >
                      <ListItemText primary={method} />
                    </ListItem>
                  ))}
                </List>
                <WaitToGrow isIn={fieldHasError}>
                  <DialogContentText
                    variant="body1"
                    color="textPrimary"
                    className={classes.qualifyMsg}
                  >
                    {/* // GO-LIVE - We need to re-word last sentence after GO LIVE date. */}
                    Unfortunately you do not qualify for the Irrigation
                    Efficiencies Rebate. The Irrigation Efficiencies Rebates are
                    only available to improve existing in-ground irrigation
                    systems. Please close this web browser tab to go back to the{' '}
                    <a href="https://www.pcwa.net">PCWA.net</a> website.
                  </DialogContentText>
                </WaitToGrow>
                <WaitToGrow isIn={!fieldHasError && fieldWasTouched}>
                  <DialogContentText
                    variant="body1"
                    color="textPrimary"
                    className={classes.qualifyMsg}
                  >
                    Excellent. You qualify for the Irrigation Efficiencies
                    Rebate. Please close this message now to continue the rebate
                    application process.
                  </DialogContentText>
                </WaitToGrow>
              </div>
            )
          }}
        </Field>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          color="primary"
          disabled={!eligibleFieldsTouched}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withStyles(styles)(connect(IrrigationMethodDialog))

function Transition(props: any) {
  return <Slide direction="up" {...props} />
}
