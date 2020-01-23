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
  Theme
} from '@material-ui/core'
import {makeStyles, createStyles, useTheme} from '@material-ui/core/styles'
import {ANSWERS as yesNoAnswers} from '@components/formFields/YesNoSelectField'
import WaitToGrow from '@components/WaitToGrow/WaitToGrow'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import {useFormikContext, useField} from 'formik'
import clsx from 'clsx'
import {addedDiff} from 'deep-object-diff'
import useDebounce from '@hooks/useDebounce'
import {
  EligibilityDialog,
  EligibilityMobileStepper,
  EligibilityStepper
} from '@components/formFields/EligibilityDialog'
import {ToiletRebateFormData} from '@lib/services/formService'

type ToiletRebateFormDataProp = keyof ToiletRebateFormData

type Props = {
  open: boolean
  onClose: () => void
  fullWidth?: boolean
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

const ToiletEffEligibilityDialog = ({
  open = false,
  onClose,
  ...rest
}: Props) => {
  const classes = useStyles()
  const theme = useTheme<Theme>()
  const [activeStep, setActiveStep] = useState<number>(0)
  const [lastTouchedIndex, setLastTouchedIndex] = useState<number>(0)
  const debouncedLastTouchedIndex = useDebounce(lastTouchedIndex, 800)
  const steps = useMemo(() => getSteps({...rest}), [rest])
  const prevTouched = useRef<{}>()
  const prevLastTouchedIndex = useRef<number>()
  const maxSteps = useMemo(() => getSteps({...rest}).length, [rest])

  const {touched, errors} = useFormikContext<ToiletRebateFormData>()

  const eligibleFieldsTouched = useMemo(
    () => [touched.treatedCustomer, touched.builtPriorCutoff].every(Boolean),
    [touched]
  )

  const eligibleFieldsHaveError = useMemo(
    () =>
      [errors.treatedCustomer, errors.builtPriorCutoff]
        .filter(
          (error) =>
            error && typeof error === 'string' && !/required/i.test(error)
        )
        .some(Boolean),
    [errors]
  )

  const touchedChangedHandler = useCallback(
    (prev, curr) => {
      const diff = addedDiff(prev, curr) || {}
      const newProp = Object.keys({...diff})[0]
      const stepIndex = newProp && getStepIndex(newProp, rest)
      // Don't use Boolean(nextStepIndex) cause 0 is false.
      const nextStepIndex = typeof stepIndex === 'number' && stepIndex + 1
      if (nextStepIndex) {
        setLastTouchedIndex(nextStepIndex)
      }
    },
    [rest]
  )

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
    (fieldName: ToiletRebateFormDataProp) => {
      const error = errors[fieldName]
      return (
        Boolean(error) && typeof error === 'string' && !/required/i.test(error)
      )
    },
    [errors]
  )

  const stepCompleted = useCallback(
    (fieldName: ToiletRebateFormDataProp) => {
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
            {steps.map(({label, index, name}) => (
              <Step key={label} completed={stepCompleted(name)}>
                {/* <StepLabel>{label}</StepLabel> */}
                <StepLabel
                  error={stepHasError(name)}
                  classes={{
                    iconContainer: classes.stepLabelIcon,
                    labelContainer: classes.stepLabelLabel
                  }}
                  optional={
                    <DialogContentText
                      variant="h4"
                      color="textSecondary"
                      className={clsx({
                        [classes.stepLabelError]: stepHasError(name),
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
                <StepContent>
                  {getStepContent(index, {name, label, ...rest})}
                </StepContent>
              </Step>
            ))}
          </EligibilityStepper>
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

export default ToiletEffEligibilityDialog

function getSteps(props: any) {
  return [
    {
      index: 0,
      label: 'Are you a Placer County Water Agency treated water customer?',
      name: 'treatedCustomer' as ToiletRebateFormDataProp,
      content: <QuestionOneField type="hidden" {...props} />
    },
    {
      index: 1,
      label: 'Was your building(s) built prior to 1994?',
      name: 'builtPriorCutoff' as ToiletRebateFormDataProp,
      content: <QuestionTwoField type="hidden" {...props} />
    }
  ]
}

function getStepContent(stepNo: number, props: any) {
  const found = getSteps({...props}).find((step) => step.index === stepNo)
  return found ? found.content : null
}

function getStepIndex(fieldName: string, props: any) {
  const found = getSteps({...props}).find((step) => step.name === fieldName)
  return found ? found.index : null
}

const useQuestionStyles = makeStyles((theme: Theme) =>
  createStyles({
    qualifyMsg: {
      marginTop: theme.spacing(3)
    }
  })
)

const QuestionOneField = (props: any) => {
  const classes = useQuestionStyles()
  const [field, meta, helpers] = useField(props)
  const {error, touched, value} = meta
  const {setTouched, setValue} = helpers

  const clickHandler = useCallback(
    (alreadyStarted: string) => () => {
      setValue(alreadyStarted)
      setTouched(true)
    },
    [setTouched, setValue]
  )

  // Field Required Error will cause a quick jump/flash in height of <WaitToGrow/> once a value is selected unless we filter out those errors.
  const hasApplicableError =
    Boolean(error) &&
    typeof error === 'string' &&
    !/required field/i.test(error)

  return (
    <>
      <input {...field} {...props} />
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
      <WaitToGrow isIn={hasApplicableError && touched}>
        <DialogContentText
          variant="body1"
          color="textPrimary"
          className={classes.qualifyMsg}
        >
          {/* // GO-LIVE - We need to re-word last sentence after GO LIVE date. */}
          Unfortunately, you do not qualify for the High Efficiency
          Toilet/Urinal Rebate. You must be a current Placer County Water Agency
          treated water customer. Please close this web browser tab to go back
          to the <a href="https://www.pcwa.net">PCWA.net</a> website.
        </DialogContentText>
      </WaitToGrow>
    </>
  )
}

const QuestionTwoField = (props: any) => {
  const classes = useQuestionStyles()
  const [field, meta, helpers] = useField(props)
  const {error, touched, value} = meta
  const {setTouched, setValue} = helpers

  const clickHandler = useCallback(
    (newValue: string) => () => {
      setValue(newValue)
      setTouched(true)
    },
    [setTouched, setValue]
  )

  // Field Required Error will cause a quick jump/flash in height of <WaitToGrow/> once a value is selected unless we filter out those errors.
  const hasApplicableError =
    Boolean(error) &&
    typeof error === 'string' &&
    !/required field/i.test(error)

  return (
    <>
      <input {...field} {...props} />
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
      <WaitToGrow isIn={hasApplicableError && touched}>
        <DialogContentText
          variant="body1"
          color="textPrimary"
          className={classes.qualifyMsg}
        >
          {/* // GO-LIVE - We need to re-word last sentence after GO LIVE date. */}
          Unfortunately, you do not qualify for the High Efficiency Toilet
          Rebate. Old toilets replaced must be rated at 3.0 (GPF) or more. Most
          qualifying models were installed in homes built prior to 1994. Please
          close this web browser tab to go back to the{' '}
          <a href="https://www.pcwa.net">PCWA.net</a> website.
        </DialogContentText>
      </WaitToGrow>
    </>
  )
}
