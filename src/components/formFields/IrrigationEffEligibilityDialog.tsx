// cspell:ignore subheader USBR
import React, {useState, useMemo, useCallback, useRef, useEffect} from 'react'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Step,
  StepLabel,
  StepContent,
  Theme,
  makeStyles,
  createStyles,
  useTheme
} from '@material-ui/core'
import {ANSWERS as yesNoAnswers} from '@components/formFields/YesNoSelectField'
import WaitToGrow from '@components/WaitToGrow/WaitToGrow'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import {Field, connect, FormikProps, FieldProps} from 'formik'
import clsx from 'clsx'
import {addedDiff} from 'deep-object-diff'
import {useDebounce} from 'use-debounce'
import {IRRIGATION_METHODS} from '@components/formFields/IrrigationMethodSelect'
import {
  EligibilityDialog,
  EligibilityMobileStepper,
  EligibilityStepper
} from '@components/formFields/EligibilityDialog'

type Props = {
  open: boolean
  onClose: () => void
  fullWidth?: boolean
  formik?: FormikProps<any>
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    qualifyMsg: {
      marginTop: theme.spacing(3)
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

const IrrigationEffEligibilityDialog = ({
  open = false,
  onClose,
  formik
}: Props) => {
  const classes = useStyles()
  const theme = useTheme<Theme>()
  const [activeStep, setActiveStep] = useState<number>(0)
  const [lastTouchedIndex, setLastTouchedIndex] = useState<number>(0)
  const [debouncedLastTouchedIndex] = useDebounce(lastTouchedIndex, 800)
  const steps = useMemo(() => getSteps(), [])
  const maxSteps = useMemo(() => getSteps().length, [])
  const prevTouched = useRef<Record<string, unknown>>()
  const prevLastTouchedIndex = useRef<number>()

  const {touched = {}, errors = {}} = formik || {}

  const eligibleFieldsTouched = useMemo(
    () => [touched.treatedCustomer, touched.irrigMethod].every(Boolean),
    [touched]
  )

  const eligibleFieldsHaveError = useMemo(
    () =>
      [errors.treatedCustomer, errors.irrigMethod]
        .filter(
          (error) =>
            error &&
            typeof error === 'string' &&
            !/is a required field/i.test(error)
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
        Boolean(error) &&
        typeof error === 'string' &&
        !/is a required field/i.test(error)
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
    <EligibilityDialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Check Rebate Eligibility</DialogTitle>
      <DialogContent>
        <div>
          <EligibilityStepper activeStep={activeStep}>
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
          </EligibilityStepper>
          <WaitToGrow isIn={rebateEligibility}>
            <DialogContentText
              variant="body1"
              color="textPrimary"
              className={classes.qualifyMsg}
            >
              Excellent. You may now submit your application for the Irrigation
              Efficiencies Rebate. Please close this message now to continue the
              rebate application process.
            </DialogContentText>
          </WaitToGrow>
        </div>
      </DialogContent>
      <DialogActions>
        <WaitToGrow
          isIn={rebateEligibilityIncomplete}
          style={{width: '100%'}} // style property will be passed to <Grow /> thanks to spread operator.
        >
          <EligibilityMobileStepper
            steps={maxSteps}
            activeStep={activeStep}
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
    </EligibilityDialog>
  )
}

export default connect(IrrigationEffEligibilityDialog)

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
          !/is a required field/i.test(currentError)

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
                Unfortunately, you do not qualify for the Irrigation
                Efficiencies Rebate. Irrigation Efficiencies Rebates are only
                available for PCWA treated water customers.
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
    <Field name="irrigMethod">
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
          !/is a required field/i.test(currentError)

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
              {IRRIGATION_METHODS.map((answer) => (
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
                Unfortunately, you do not qualify for the Irrigation
                Efficiencies Rebate. Irrigation Efficiencies Rebates are only
                available to improve existing in-ground irrigation systems
                and/or to install EPA WaterSense approved weather based
                irrigation controllers. New irrigation system installations are
                not eligible.
              </DialogContentText>
            </WaitToGrow>
          </div>
        )
      }}
    </Field>
  )
}

function getSteps() {
  return [
    {
      index: 0,
      label: 'Are you a Placer County Water Agency treated water customer? ',
      fieldName: 'treatedCustomer',
      content: <QuestionOne />
    },
    {
      index: 1,
      label: 'How is your landscape currently irrigated?',
      fieldName: 'irrigMethod',
      content: <QuestionTwo />
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
