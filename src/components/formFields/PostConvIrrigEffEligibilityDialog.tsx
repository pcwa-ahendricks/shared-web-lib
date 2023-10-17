// cspell:ignore Subheader
import React, {useState, useMemo, useCallback, useRef, useEffect} from 'react'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItemText,
  Step,
  StepLabel,
  StepContent,
  ListItemButton
} from '@mui/material'
import WaitToGrow from '@components/WaitToGrow/WaitToGrow'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import {Field, connect, FormikProps, FieldProps, FormikTouched} from 'formik'
import {addedDiff} from 'deep-object-diff'
import {useDebounce} from 'use-debounce'
import {ANSWERS as yesNoAnswers} from '@components/formFields/YesNoSelectField'
import {
  EligibilityDialog,
  EligibilityMobileStepper,
  EligibilityStepper
} from '@components/formFields/EligibilityDialog'
import useTheme from '@hooks/useTheme'
import {Theme} from '@lib/material-theme'

type Props = {
  open: boolean
  onClose: () => void
  fullWidth?: boolean
  formik?: FormikProps<any>
}

const PostConvIrrigEffEligibilityDialog = ({
  open = false,
  onClose,
  formik
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
  const steps = useMemo(() => getSteps(), [])
  const maxSteps = useMemo(() => getSteps().length, [])
  const prevTouched = useRef<FormikTouched<any>>()
  const prevLastTouchedIndex = useRef<number>()

  const {touched = {}, errors = {}} = formik || {}

  const eligibleFieldsTouched = useMemo(
    () =>
      [
        touched.rebateCustomer,
        touched.projectCompleted,
        touched.partsReceipts,
        touched.photosTaken
      ].every(Boolean),
    [touched]
  )

  const eligibleFieldsHaveError = useMemo(
    () =>
      [
        errors.rebateCustomer,
        errors.projectCompleted,
        errors.partsReceipts,
        errors.photosTaken
      ]
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
    (name: string) => {
      const error = errors[name]
      const hasError =
        Boolean(error) &&
        typeof error === 'string' &&
        !/is a required field/i.test(error)
      return hasError
    },
    [errors]
  )

  const stepCompleted = useCallback(
    (name: string) => {
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
      <DialogTitle id="form-dialog-title">
        Check Application Eligibility
      </DialogTitle>
      <DialogContent>
        <div>
          <EligibilityStepper activeStep={activeStep}>
            {steps.map(({label, index, name}) => {
              return (
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
                  <StepContent>{getStepContent(index)}</StepContent>
                </Step>
              )
            })}
          </EligibilityStepper>
          <WaitToGrow isIn={rebateEligibility}>
            <DialogContentText
              variant="body1"
              color="textPrimary"
              sx={{...style.qualifyMsg}}
            >
              Excellent. You meet the requirements for submitting this
              application. Please close this message now to continue the
              application process.
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

export default connect(PostConvIrrigEffEligibilityDialog)

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
    <Field name="rebateCustomer">
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
            // subheader={
            //   <ListSubheader component="div">
            //     Choose one of the following
            //   </ListSubheader>
            // }
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
                This application is only to be submitted by customers that are
                currently participating in the Irrigation Efficiencies Rebate
                Program.
              </DialogContentText>
            </WaitToGrow>
          </div>
        )
      }}
    </Field>
  )
}

const QuestionTwo = () => {
  const theme = useTheme()
  const style = useQuestionStyles(theme)
  return (
    <Field name="projectCompleted">
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
            // subheader={
            //   <ListSubheader component="div">
            //     Choose one of the following
            //   </ListSubheader>
            // }
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
                Project must be completed in order to submit application.
              </DialogContentText>
            </WaitToGrow>
          </div>
        )
      }}
    </Field>
  )
}

const QuestionThree = () => {
  const theme = useTheme()
  const style = useQuestionStyles(theme)
  return (
    <Field name="partsReceipts">
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
            // subheader={
            //   <ListSubheader component="div">
            //     Choose one of the following
            //   </ListSubheader>
            // }
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
                To receive a rebate for irrigation efficiencies you must have
                itemized receipts or invoices.
              </DialogContentText>
            </WaitToGrow>
          </div>
        )
      }}
    </Field>
  )
}

const QuestionFour = () => {
  const theme = useTheme()
  const style = useQuestionStyles(theme)
  return (
    <Field name="photosTaken">
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
            // subheader={
            //   <ListSubheader component="div">
            //     Choose one of the following
            //   </ListSubheader>
            // }
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
                Post Conversion photographs (5) are required. Please refer to
                Irrigation Efficiencies terms and conditions, section, VII.
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
      label:
        'Are you currently participating in the PCWA Irrigation Efficiencies Rebate Program?',
      name: 'rebateCustomer',
      content: <QuestionOne />
    },
    {
      index: 1,
      label: 'Is your project completed?',
      name: 'projectCompleted',
      content: <QuestionTwo />
    },
    {
      index: 2,
      label:
        'Do you have itemized receipts or invoices for irrigation parts installed?',
      name: 'partsReceipts',
      content: <QuestionThree />
    },
    {
      index: 3,
      label:
        'Have you taken 5 post conversion photographs following requirements stated in terms and conditions?',
      name: 'photosTaken',
      content: <QuestionFour />
    }
  ]
}
