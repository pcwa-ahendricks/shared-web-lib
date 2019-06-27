// cspell:ignore subheader USBR
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
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Theme,
  useMediaQuery
} from '@material-ui/core'
import {makeStyles, createStyles, useTheme} from '@material-ui/styles'
import {ANSWERS as yesNoAnswers} from '@components/formFields/YesNoSelectField'
import WaitToGrow from '@components/WaitToGrow/WaitToGrow'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import {Field, connect, FormikProps, FieldProps} from 'formik'
import clsx from 'clsx'
import {addedDiff} from 'deep-object-diff'
import useDebounce from '@hooks/useDebounce'
import {SlideTransition as Transition} from '@components/Transition/Transition'

type Props = {
  open: boolean
  onClose: () => void
  fullWidth?: boolean
  formik?: FormikProps<any>
}

// Text importance dialog. Eliminate opacity used by Paper by default (theme.palette.background.paper, "rgba(242, 242, 242, 0.9)")
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      backgroundColor: theme.palette.grey[200]
    },
    qualifyMsg: {
      marginTop: theme.spacing(3)
    },
    stepperContainer: {
      width: '90%'
    },
    mobileStepper: {
      width: '100%'
    },
    mobileStepperPaper: {
      backgroundColor: 'unset',
      padding: 0
    },
    stepperPaper: {
      backgroundColor: 'unset',
      [theme.breakpoints.down('xs')]: {
        padding: 0
      },
      [theme.breakpoints.only('sm')]: {
        padding: theme.spacing(2) // defaults to 24px
      }
    },
    stepLabelLabel: {
      marginLeft: theme.spacing(1),
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
)

const WashEffEligibilityDialog = ({open = false, onClose, formik}: Props) => {
  const classes = useStyles()
  const theme = useTheme<Theme>()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))
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
        touched.treatedCustomer,
        touched.existingHigh,
        touched.newConstruction
      ].every(Boolean),
    [touched]
  )

  const eligibleFieldsHaveError = useMemo(
    () =>
      [errors.treatedCustomer, errors.existingHigh, errors.newConstruction]
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
      fullScreen={fullScreen}
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
                        className={clsx({
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
              Excellent, you may continue to apply for the rebate. Please close
              this message to continue to the rebate application.
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

export default connect(WashEffEligibilityDialog)

function getSteps() {
  return [
    {
      index: 0,
      label: 'Are you a Placer County Water Agency treated water customer?',
      fieldName: 'treatedCustomer',
      content: <QuestionOne />
    },
    {
      index: 1,
      label:
        'Are you replacing an existing high efficiency clothes washing machine with another new high efficiency clothes washing machine?',
      fieldName: 'existingHigh',
      content: <QuestionTwo />
    },
    {
      index: 2,
      label: 'Is your house New Construction?',
      fieldName: 'newConstruction',
      content: <QuestionThree />
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

const useQuestionStyles = makeStyles((theme: Theme) =>
  createStyles({
    qualifyMsg: {
      marginTop: theme.spacing(3)
    }
  })
)

const QuestionOne = () => {
  const classes = useQuestionStyles()
  return (
    <Field name="treatedCustomer">
      {({field, form}: FieldProps<any>) => {
        const {setFieldValue, errors, setFieldTouched, touched} = form
        const {name, value} = field
        const currentError = errors[name]

        const clickHandler = (alreadyStarted: string) => () => {
          setFieldValue(name, alreadyStarted, true)
          setFieldTouched(name, true)
        }

        // Field Required Error will cause a quick jump/flash in height of <WaitToGrow/> once a value is selected unless we filter out those errors.
        const hasApplicableError =
          Boolean(currentError) &&
          typeof currentError === 'string' &&
          !/required field/i.test(currentError)

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
              {yesNoAnswers.map((answer) => (
                <ListItem
                  key={answer}
                  button
                  divider
                  selected={answer === value}
                  // disabled={fieldTouched}
                  onClick={clickHandler(answer)}
                >
                  <ListItemText primary={answer} />
                </ListItem>
              ))}
            </List>
            <WaitToGrow isIn={hasApplicableError && fieldTouched}>
              <DialogContentText
                variant="body1"
                color="textPrimary"
                className={classes.qualifyMsg}
              >
                {/* // GO-LIVE - We need to re-word last sentence after GO LIVE date. */}
                Unfortunately, you do not qualify for the PCWA/USBR Energy Star®
                Residential/Multi Family Water-Efficient Clothes Washing Machine
                Rebate. You must be a current Placer County Water Agency treated
                water customer. Please close this web browser tab to go back to
                the <a href="https://www.pcwa.net">PCWA.net</a> website.
              </DialogContentText>
            </WaitToGrow>
          </div>
        )
      }}
    </Field>
  )
}

const QuestionTwo = () => {
  const classes = useQuestionStyles()
  return (
    <Field name="existingHigh">
      {({field, form}: FieldProps<any>) => {
        const {setFieldValue, errors, setFieldTouched, touched} = form
        const {name, value} = field
        const currentError = errors[name]

        const clickHandler = (newValue: string) => () => {
          setFieldValue(name, newValue, true)
          setFieldTouched(name, true)
        }

        // Field Required Error will cause a quick jump/flash in height of <WaitToGrow/> once a value is selected unless we filter out those errors.
        const hasApplicableError =
          Boolean(currentError) &&
          typeof currentError === 'string' &&
          !/required field/i.test(currentError)

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
              {yesNoAnswers.map((answer) => (
                <ListItem
                  key={answer}
                  button
                  divider
                  selected={answer === value}
                  // disabled={fieldTouched}
                  onClick={clickHandler(answer)}
                >
                  <ListItemText primary={answer} />
                </ListItem>
              ))}
            </List>
            <WaitToGrow isIn={hasApplicableError && fieldTouched}>
              <DialogContentText
                variant="body1"
                color="textPrimary"
                className={classes.qualifyMsg}
              >
                {/* // GO-LIVE - We need to re-word last sentence after GO LIVE date. */}
                Unfortunately, you do not qualify for the PCWA/USBR Energy Star®
                Residential/Multi Family Water-Efficient Clothes Washing Machine
                Rebate. Rebates are not available for the replacement of an
                existing high efficiency clothes washing machine with another
                new high efficiency clothes washing machine. Please close this
                web browser tab to go back to the{' '}
                <a href="https://www.pcwa.net">PCWA.net</a> website.
              </DialogContentText>
            </WaitToGrow>
          </div>
        )
      }}
    </Field>
  )
}

const QuestionThree = () => {
  const classes = useQuestionStyles()
  return (
    <Field name="newConstruction">
      {({field, form}: FieldProps<any>) => {
        const {setFieldValue, errors, setFieldTouched, touched} = form
        const {name, value} = field
        const currentError = errors[name]

        const clickHandler = (newValue: string) => () => {
          setFieldValue(name, newValue, true)
          setFieldTouched(name, true)
        }

        // Field Required Error will cause a quick jump/flash in height of <WaitToGrow/> once a value is selected unless we filter out those errors.
        const hasApplicableError =
          Boolean(currentError) &&
          typeof currentError === 'string' &&
          !/required field/i.test(currentError)

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
              {yesNoAnswers.map((answer) => (
                <ListItem
                  key={answer}
                  button
                  divider
                  selected={answer === value}
                  // disabled={fieldTouched}
                  onClick={clickHandler(answer)}
                >
                  <ListItemText primary={answer} />
                </ListItem>
              ))}
            </List>
            <WaitToGrow isIn={hasApplicableError && fieldTouched}>
              <DialogContentText
                variant="body1"
                color="textPrimary"
                className={classes.qualifyMsg}
              >
                {/* // GO-LIVE - We need to re-word last sentence after GO LIVE date. */}
                Unfortunately, you do not qualify for the PCWA/USBR Energy Star®
                Residential/Multi Family Water-Efficient Clothes Washing Machine
                Rebate. New construction is not eligible for a rebate under this
                program. Please close this web browser tab to go back to the{' '}
                <a href="https://www.pcwa.net">PCWA.net</a> website.
              </DialogContentText>
            </WaitToGrow>
          </div>
        )
      }}
    </Field>
  )
}
