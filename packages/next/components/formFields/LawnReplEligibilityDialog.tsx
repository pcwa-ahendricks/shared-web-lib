// cspell:ignore Subheader
import React, {useState, useMemo, useCallback, useRef, useEffect} from 'react'

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
  MobileStepper,
  Slide,
  Stepper,
  Step,
  StepLabel,
  StepContent
  // Typography as Type
} from '@material-ui/core'
import {withStyles, createStyles, Theme} from '@material-ui/core/styles'
import {IRRIGATION_METHODS} from '@components/formFields/IrrigationMethodSelect'
import {ANSWERS as q1Answers} from '@components/formFields/AlreadyStartedSelect'
import {ANSWERS as q2Answers} from '@components/formFields/ArtTurfSelect'
import LawnApproxSqFootField from '@components/formFields/LawnApproxSqFootField'
import WaitToGrow from '@components/WaitToGrow/WaitToGrow'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import {Field, connect, FormikProps, FieldProps} from 'formik'
import classNames from 'classnames'
import {addedDiff} from 'deep-object-diff'
import useDebounce from '@hooks/useDebounce'

type Props = {
  open: boolean
  onClose: () => void
  fullWidth?: boolean
  classes: any
  theme: Theme
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
    },
    stepperContainer: {
      width: '90%'
    },
    mobileStepper: {
      width: '100%'
    },
    mobileStepperPaper: {
      backgroundColor: 'unset'
    },
    stepperPaper: {
      backgroundColor: 'unset'
    },
    stepLabelLabel: {
      marginLeft: theme.spacing.unit * 1,
      cursor: 'pointer',
      '& $stepLabelActive': {
        color: theme.palette.primary.main
      },
      '& $stepLabelError': {
        color: theme.palette.error.main
      }
    },
    stepLabelError: {},
    stepLabelActive: {},
    stepLabelIcon: {
      cursor: 'pointer'
    }
  })

const LawnReplEligibilityDialog = ({
  open = false,
  onClose,
  classes,
  theme,
  formik
}: Props) => {
  const [activeStep, setActiveStep] = useState<number>(0)
  const [lastTouchedIndex, setLastTouchedIndex] = useState<number>(0)
  const debouncedLastTouchedIndex = useDebounce(lastTouchedIndex, 800)
  const steps = useMemo(() => getSteps(), [])
  const maxSteps = useMemo(() => getSteps().length, [])
  const prevTouched = useRef<{}>()
  const prevLastTouchedIndex = useRef<number>()

  const {touched = {}, errors = {}} = formik || {}

  const eligibleFieldsTouched = useMemo(
    () =>
      [
        touched.alreadyStarted,
        touched.useArtTurf,
        touched.approxSqFeet,
        touched.irrigMethod
      ].every(Boolean),
    [touched]
  )

  const eligibleFieldsHaveError = useMemo(
    () =>
      [
        errors.alreadyStarted,
        errors.useArtTurf,
        errors.approxSqFeet,
        errors.irrigMethod
      ]
        .filter(
          (error) =>
            error && typeof error === 'string' && !/required/i.test(error)
        )
        .some(Boolean),
    [errors]
  )

  const touchedChangedHandler = useCallback((prev, curr) => {
    const diff = addedDiff(prev, curr) || {}
    const newProp = Object.keys({...diff})[0]
    const stepIndex = newProp && getStepIndex(newProp)
    // Don't use Boolean(nextStepIndex) cause 0 is false.
    const nextStepIndex = typeof stepIndex === 'number' && stepIndex + 1
    if (nextStepIndex) {
      setLastTouchedIndex(nextStepIndex)
    }
  }, [])

  useEffect(() => {
    touchedChangedHandler({...prevTouched.current}, {...touched})
    // and lastly...
    prevTouched.current = {...touched}
  }, [touched, touchedChangedHandler, prevTouched])

  const rebateEligibility: boolean =
    !eligibleFieldsHaveError && eligibleFieldsTouched

  const rebateEligibilityIncomplete: boolean =
    !eligibleFieldsHaveError && !eligibleFieldsTouched

  const rebateEligibilityComplete: boolean =
    eligibleFieldsHaveError || eligibleFieldsTouched

  const setActiveStepIf = useCallback(
    (stepNo: number) => {
      // Don't allow changing of questions/steps if there are any relevant errors, or, if step index doesn't exist (maxSteps starts at 1, stpNo at 0).
      if (stepNo > maxSteps - 1 || rebateEligibilityComplete) {
        return
      }
      setActiveStep(stepNo)
    },
    [rebateEligibilityComplete, maxSteps]
  )

  useEffect(() => {
    // Don't set active step if setActiveStepIf merely changed, only when lastTouchedIndex changes.
    if (prevLastTouchedIndex.current !== debouncedLastTouchedIndex) {
      setActiveStepIf(debouncedLastTouchedIndex)
    }
    prevLastTouchedIndex.current = debouncedLastTouchedIndex
  }, [debouncedLastTouchedIndex, setActiveStepIf])

  const handleNext = useCallback(() => {
    setActiveStepIf(activeStep + 1)
  }, [activeStep, setActiveStepIf])

  const handleBack = useCallback(() => {
    setActiveStepIf(activeStep - 1)
  }, [activeStep, setActiveStepIf])

  const stepLabelClickHandler = useCallback(
    (stepIndex: number) => () => {
      setActiveStepIf(stepIndex)
    },
    [setActiveStepIf]
  )

  const stepHasError = useCallback(
    (fieldName: string) => {
      const error = errors[fieldName]
      return (
        Boolean(error) && typeof error === 'string' && !/required/i.test(error)
      )
    },
    [errors]
  )

  const stepCompleted = useCallback(
    (fieldName: string) => {
      const fieldTouched = Boolean(touched[fieldName])
      if (fieldTouched) {
        return true
      }
    },
    [touched]
  )

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
        <div>
          <div className={classes.stepperContainer}>
            <Stepper
              activeStep={activeStep}
              orientation="vertical"
              classes={{root: classes.stepperPaper}}
            >
              {steps.map(({label, index, fieldName}) => (
                <Step key={label} completed={stepCompleted(fieldName)}>
                  {/* <StepLabel>{label}</StepLabel> */}
                  <StepLabel
                    error={stepHasError(fieldName)}
                    classes={{
                      iconContainer: classes.stepLabelIcon,
                      labelContainer: classes.stepLabelLabel
                    }}
                    optional={
                      <DialogContentText
                        variant="h4"
                        color="textSecondary"
                        className={classNames({
                          [classes.stepLabelError]: stepHasError(fieldName),
                          [classes.stepLabelActive]: activeStep === index
                        })}
                      >
                        {label}
                      </DialogContentText>
                    }
                    onClick={stepLabelClickHandler(index)}
                  >
                    {''}
                  </StepLabel>
                  <StepContent>{getStepContent(index)}</StepContent>
                </Step>
              ))}
            </Stepper>
          </div>
          <WaitToGrow isIn={rebateEligibility}>
            <DialogContentText
              variant="body1"
              color="textPrimary"
              className={classes.qualifyMsg}
            >
              Excellent. You qualify for the Lawn Replacement Rebate. Please
              close this message now to continue the rebate application process.
            </DialogContentText>
          </WaitToGrow>
        </div>
      </DialogContent>
      <DialogActions>
        <WaitToGrow
          isIn={rebateEligibilityIncomplete}
          style={{width: '100%'}} // style property will be passed to <Grow /> thanks to spread operator.
        >
          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            className={classes.mobileStepper}
            classes={{root: classes.mobileStepperPaper}}
            nextButton={
              <Button
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                Next
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button onClick={handleBack} disabled={activeStep === 0}>
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        </WaitToGrow>
        <WaitToGrow isIn={rebateEligibilityComplete}>
          <Button
            onClick={onClose}
            color="primary"
            // disabled={rebateEligibilityIncomplete}
          >
            Close
          </Button>
        </WaitToGrow>
      </DialogActions>
    </Dialog>
  )
}

export default withStyles(styles, {withTheme: true})(
  connect(LawnReplEligibilityDialog)
)

function Transition(props: any) {
  return <Slide direction="up" {...props} />
}

function getSteps() {
  return [
    {
      index: 0,
      label: 'Have you already started the Lawn Replacement project?',
      fieldName: 'alreadyStarted',
      content: <QuestionOne />
    },
    {
      index: 1,
      label: 'Do you plan on replacing your lawn with artificial turf?',
      fieldName: 'useArtTurf',
      content: <QuestionTwo />
    },
    {
      index: 2,
      label: 'What is the approximate square footage of existing lawn?',
      fieldName: 'approxSqFeet',
      content: <QuestionThree />
    },
    {
      index: 3,
      label: 'How is the existing lawn currently irrigated?',
      fieldName: 'irrigMethod',
      content: <QuestionFour />
    }
  ]
}

function getStepContent(stepNo: number) {
  const found = getSteps().find((step) => step.index === stepNo)
  return found ? found.content : null
}

function getStepIndex(fieldName: string) {
  const found = getSteps().find((step) => step.fieldName === fieldName)
  return found ? found.index : null
}

const questionStyles = (theme: Theme) =>
  createStyles({
    qualifyMsg: {
      marginTop: theme.spacing.unit * 3
    }
  })

const QuestionOne = withStyles(questionStyles)(({classes}: {classes: any}) => {
  return (
    <Field name="alreadyStarted">
      {({field, form}: FieldProps<any>) => {
        const {setFieldValue, errors, setFieldTouched, touched} = form
        const {name} = field
        const currentError = errors[name]

        const clickHandler = (alreadyStarted: boolean) => () => {
          setFieldValue(name, alreadyStarted, true)
          setFieldTouched(name, true)
        }

        const hasError = Boolean(currentError)
        const fieldTouched = Boolean(touched[name])
        return (
          <div>
            <List
              subheader={
                <ListSubheader component="div">
                  Choose one of the following
                </ListSubheader>
              }
            >
              {q1Answers.map(({caption, value}) => (
                <ListItem
                  key={caption}
                  button
                  divider
                  disabled={fieldTouched}
                  onClick={clickHandler(value)}
                >
                  <ListItemText primary={caption} />
                </ListItem>
              ))}
            </List>
            <WaitToGrow isIn={hasError && fieldTouched}>
              <DialogContentText
                variant="body1"
                color="textPrimary"
                className={classes.qualifyMsg}
              >
                {/* // GO-LIVE - We need to re-word last sentence after GO LIVE date. */}
                Unfortunately you do not qualify for the lawn replacement
                rebate. Conversions that are initiated prior to PCWA's approval
                are ineligible. No exceptions will be made. Please close this
                web browser tab to go back to the{' '}
                <a href="https://www.pcwa.net">PCWA.net</a> website.
              </DialogContentText>
            </WaitToGrow>
          </div>
        )
      }}
    </Field>
  )
})

const QuestionTwo = withStyles(questionStyles)(({classes}: {classes: any}) => {
  return (
    <Field name="useArtTurf">
      {({field, form}: FieldProps<any>) => {
        const {setFieldValue, errors, setFieldTouched, touched} = form
        const {name} = field
        const currentError = errors[name]

        const clickHandler = (useArtTurf: boolean) => () => {
          setFieldValue(name, useArtTurf, true)
          setFieldTouched(name, true)
        }

        const hasError = Boolean(currentError)
        const fieldTouched = Boolean(touched[name])
        return (
          <div>
            <List
              subheader={
                <ListSubheader component="div">
                  Choose one of the following
                </ListSubheader>
              }
            >
              {q2Answers.map(({caption, value}) => (
                <ListItem
                  key={caption}
                  button
                  divider
                  disabled={fieldTouched}
                  onClick={clickHandler(value)}
                >
                  <ListItemText primary={caption} />
                </ListItem>
              ))}
            </List>
            <WaitToGrow isIn={hasError && fieldTouched}>
              <DialogContentText
                variant="body1"
                color="textPrimary"
                className={classes.qualifyMsg}
              >
                {/* // GO-LIVE - We need to re-word last sentence after GO LIVE date. */}
                Unfortunately you do not qualify for the lawn replacement
                rebate. Artificial grass is not allowed in the rebated portion
                of the converted landscape. Please close this web browser tab to
                go back to the <a href="https://www.pcwa.net">PCWA.net</a>{' '}
                website.
              </DialogContentText>
            </WaitToGrow>
          </div>
        )
      }}
    </Field>
  )
})

const QuestionThree = withStyles(questionStyles)(
  ({classes}: {classes: any}) => {
    return (
      <Field name="approxSqFeet">
        {({field, form}: FieldProps<any>) => {
          const {touched, errors} = form
          const {name} = field
          const currentError = errors[name]

          const hasError = Boolean(currentError)
          const fieldTouched = Boolean(touched[name])
          return (
            <div>
              <LawnApproxSqFootField form={form} field={field} />
              <WaitToGrow isIn={hasError && fieldTouched}>
                <DialogContentText
                  variant="body1"
                  color="textPrimary"
                  className={classes.qualifyMsg}
                >
                  {/* // GO-LIVE - We need to re-word last sentence after GO LIVE date. */}
                  Unfortunately you do not qualify for the lawn replacement
                  rebate. A minimum of 300 square feet of lawn must be
                  converted. Please close this web browser tab to go back to the{' '}
                  <a href="https://www.pcwa.net">PCWA.net</a> website.
                </DialogContentText>
              </WaitToGrow>
            </div>
          )
        }}
      </Field>
    )
  }
)

const QuestionFour = withStyles(questionStyles)(({classes}: {classes: any}) => {
  return (
    <Field name="irrigMethod">
      {({field, form}: FieldProps<any>) => {
        const {setFieldValue, touched, errors, setFieldTouched} = form
        const {name} = field
        const currentError = errors[name]

        const clickHandler = (irrigMethod: string) => () => {
          setFieldValue(name, irrigMethod, true)
          setFieldTouched(name, true)
        }

        const hasError = Boolean(currentError)
        const fieldTouched = Boolean(touched[name])
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
                  disabled={fieldTouched}
                  onClick={clickHandler(method)}
                >
                  <ListItemText primary={method} />
                </ListItem>
              ))}
            </List>
            <WaitToGrow isIn={hasError && fieldTouched}>
              <DialogContentText
                variant="body1"
                color="textPrimary"
                className={classes.qualifyMsg}
              >
                {/* // GO-LIVE - We need to re-word last sentence after GO LIVE date. */}
                Unfortunately you do not qualify for the lawn replacement
                rebate. Lawn areas to be converted must be currently maintained
                and irrigated by an operating sprinkler system. Please close
                this web browser tab to go back to the{' '}
                <a href="https://www.pcwa.net">PCWA.net</a> website.
              </DialogContentText>
            </WaitToGrow>
          </div>
        )
      }}
    </Field>
  )
})
