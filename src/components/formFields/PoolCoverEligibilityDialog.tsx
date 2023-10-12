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
import {
  Field,
  connect,
  FormikProps,
  FieldProps,
  useFormikContext,
  FormikTouched
} from 'formik'
import {addedDiff} from 'deep-object-diff'
import {useDebounce} from 'use-debounce'
import {
  EligibilityDialog,
  EligibilityMobileStepper,
  EligibilityStepper
} from '@components/formFields/EligibilityDialog'
import {PoolCoverRebateFormData} from '@lib/services/formService'
import useTheme from '@hooks/useTheme'
import {Theme} from '@lib/material-theme'
type PoolCoverRebateFormDataProp = keyof PoolCoverRebateFormData

type Props = {
  open: boolean
  onClose: () => void
  fullWidth?: boolean
  formik?: FormikProps<any>
}

const PoolCoverEligibilityDialog = ({open = false, onClose}: Props) => {
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
  const steps = useMemo(() => getSteps(), [])
  const maxSteps = useMemo(() => getSteps().length, [])
  const prevTouched = useRef<FormikTouched<any>>()
  const prevLastTouchedIndex = useRef<number>()

  const {touched, errors} = useFormikContext<PoolCoverRebateFormData>()

  const eligibleFieldsTouched = useMemo(
    () => [touched.treatedCustomer].every(Boolean),
    [touched]
  )

  const eligibleFieldsHaveError = useMemo(
    () =>
      [errors.treatedCustomer]
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
      const stepIndex = newProp && getStepIndex(newProp)
      // Don't use Boolean(nextStepIndex) cause 0 is false.
      const nextStepIndex = typeof stepIndex === 'number' && stepIndex + 1
      if (nextStepIndex) {
        setLastTouchedIndex(nextStepIndex)
      }
    },
    []
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
    (name: PoolCoverRebateFormDataProp) => {
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
    (name: PoolCoverRebateFormDataProp) => {
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
                    '.MuiStepLabel-iconContainer': {
                      ...style.stepLabelIcon
                    },
                    '.MuiStepLabel-labelContainer': {
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
                <StepContent>{getStepContent(index)}</StepContent>
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

export default connect(PoolCoverEligibilityDialog)

function getStepContent(stepNo: number) {
  const found = getSteps().find((step) => step.index === stepNo)
  return found ? found.content : null
}

function getStepIndex(name: string) {
  const found = getSteps().find((step) => step.name === name)
  return found ? found.index : null
}

const useQuestionStyles = (theme: Theme) => ({
  qualifyMsg: {
    marginTop: theme.spacing(3)
  }
})

const QuestionOne = () => {
  const theme = useTheme()
  const style = useQuestionStyles(theme)
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
            <WaitToGrow isIn={hasApplicableError && fieldTouched}>
              <DialogContentText
                variant="body1"
                color="textPrimary"
                sx={{...style.qualifyMsg}}
              >
                Unfortunately, you do not qualify for the PCWA Pool Cover
                Rebate. You must be a current Placer County Water Agency treated
                water customer.
              </DialogContentText>
            </WaitToGrow>
          </div>
        )
      }}
    </Field>
  )
}

function getSteps(): {
  index: number
  label: string
  name: PoolCoverRebateFormDataProp
  content: JSX.Element
}[] {
  return [
    {
      index: 0,
      label: 'Are you a Placer County Water Agency treated water customer?',
      name: 'treatedCustomer',
      content: <QuestionOne />
    }
  ]
}
