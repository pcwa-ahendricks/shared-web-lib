// cspell:ignore subheader USBR
import React, {useState, useMemo, useCallback, useRef, useEffect} from 'react'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItemText,
  ListSubheader,
  Step,
  StepLabel,
  StepContent,
  ListItemButton
} from '@mui/material'
import {ANSWERS as yesNoAnswers} from '@components/formFields/YesNoSelectField'
import WaitToGrow from '@components/WaitToGrow/WaitToGrow'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import {useFormikContext, useField, FormikTouched} from 'formik'
import {addedDiff} from 'deep-object-diff'
import {useDebounce} from 'use-debounce'
import {
  EligibilityDialog,
  EligibilityMobileStepper,
  EligibilityStepper
} from '@components/formFields/EligibilityDialog'
import {ToiletRebateFormData} from '@lib/services/formService'
import useTheme from '@hooks/useTheme'
import {Theme} from '@lib/material-theme'

type ToiletRebateFormDataProp = keyof ToiletRebateFormData

type Props = {
  open: boolean
  onClose: () => void
  fullWidth?: boolean
}

const ToiletEffEligibilityDialog = ({
  open = false,
  onClose,
  ...rest
}: Props) => {
  const theme = useTheme()
  const style = {
    qualifyMsg: {
      marginTop: theme.spacing(3)
    },
    stepLabelLabel: {
      marginLeft: theme.spacing(1),
      cursor: 'pointer'
    },
    stepLabelIcon: {
      cursor: 'pointer'
    }
  }
  const [activeStep, setActiveStep] = useState<number>(0)
  const [lastTouchedIndex, setLastTouchedIndex] = useState<number>(0)
  const [debouncedLastTouchedIndex] = useDebounce(lastTouchedIndex, 800)
  const steps = useMemo(() => getSteps({...rest}), [rest])
  const prevTouched = useRef<FormikTouched<any>>()
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
            error &&
            typeof error === 'string' &&
            !/is a required field/i.test(error)
        )
        .some(Boolean),
    [errors]
  )

  const touchedChangedHandler = useCallback(
    (prev: FormikTouched<any>, curr: FormikTouched<any>) => {
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
    (name: ToiletRebateFormDataProp) => {
      const error = errors[name]
      return (
        Boolean(error) &&
        typeof error === 'string' &&
        !/is a required field/i.test(error)
      )
    },
    [errors]
  )

  const stepCompleted = useCallback(
    (name: ToiletRebateFormDataProp) => {
      const fieldTouched = Boolean(touched[name])
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
                  sx={{
                    '& .MuiStepLabel-iconContainer': {
                      ...style.stepLabelIcon
                    },
                    '& .MuiStepLabel-labelContainer': {
                      ...style.stepLabelLabel
                    }
                  }}
                  optional={
                    <DialogContentText
                      variant="h4"
                      color="textSecondary"
                      sx={{
                        ...(stepHasError(name) && {
                          color: theme.palette.error.main
                        }),
                        ...(activeStep === index &&
                          !stepHasError(name) && {
                            color: theme.palette.primary.main
                          })
                      }}
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
              sx={{...style.qualifyMsg}}
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

function getStepContent(stepNo: number, props: any) {
  const found = getSteps({...props}).find((step) => step.index === stepNo)
  return found ? found.content : null
}

function getStepIndex(name: string, props: any) {
  const found = getSteps({...props}).find((step) => step.name === name)
  return found ? found.index : null
}

const useQuestionStyles = (theme: Theme) => ({
  qualifyMsg: {
    marginTop: theme.spacing(3)
  }
})

const QuestionOne = (props: any) => {
  const theme = useTheme()
  const style = useQuestionStyles(theme)
  const [field, meta, helpers] = useField(props)
  const {error, touched} = meta
  const {value} = field
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
    !/is a required field/i.test(error)

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
          <ListItemButton
            key={answer}
            divider
            selected={answer === value}
            // disabled={fieldTouched}
            onClick={clickHandler(answer)}
          >
            <ListItemText primary={answer} />
          </ListItemButton>
        ))}
      </List>
      <WaitToGrow isIn={hasApplicableError && touched}>
        <DialogContentText
          variant="body1"
          color="textPrimary"
          sx={{...style.qualifyMsg}}
        >
          Unfortunately, you do not qualify for the High Efficiency
          Toilet/Urinal Rebate. You must be a current Placer County Water Agency
          treated water customer.
        </DialogContentText>
      </WaitToGrow>
    </>
  )
}

const QuestionTwo = (props: any) => {
  const theme = useTheme()
  const style = useQuestionStyles(theme)
  const [field, meta, helpers] = useField(props)
  const {error, touched} = meta
  const {value} = field
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
    !/is a required field/i.test(error)

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
          <ListItemButton
            key={answer}
            divider
            selected={answer === value}
            // disabled={fieldTouched}
            onClick={clickHandler(answer)}
          >
            <ListItemText primary={answer} />
          </ListItemButton>
        ))}
      </List>
      <WaitToGrow isIn={hasApplicableError && touched}>
        <DialogContentText
          variant="body1"
          color="textPrimary"
          sx={{...style.qualifyMsg}}
        >
          Unfortunately, you do not qualify for the High Efficiency Toilet
          Rebate. Old toilets replaced must be rated at 3.0 (GPF) or more. Most
          qualifying models were installed in homes built prior to 1994.
        </DialogContentText>
      </WaitToGrow>
    </>
  )
}

function getSteps(props: any) {
  return [
    {
      index: 0,
      label: 'Are you a Placer County Water Agency treated water customer?',
      name: 'treatedCustomer' as ToiletRebateFormDataProp,
      content: <QuestionOne type="hidden" {...props} />
    },
    {
      index: 1,
      label: 'Was your building(s) built prior to 1994?',
      name: 'builtPriorCutoff' as ToiletRebateFormDataProp,
      content: <QuestionTwo type="hidden" {...props} />
    }
  ]
}
