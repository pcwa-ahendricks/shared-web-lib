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
  ListSubheader,
  Step,
  StepLabel,
  StepContent,
  Box,
  useTheme,
  ListItemButton
} from '@mui/material'
import {IRRIGATION_METHODS} from '@components/formFields/IrrigationMethodSelect'
// import {ANSWERS as q2Answers} from '@components/formFields/AlreadyStartedSelect'
import {ANSWERS as q2Answers} from '@components/formFields/ArtTurfSelect'
import LawnApproxSqFootField from '@components/formFields/LawnApproxSqFootField'
import WaitToGrow from '@components/WaitToGrow/WaitToGrow'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import {addedDiff} from 'deep-object-diff'
import {useDebounce} from 'use-debounce'
import {ANSWERS as yesNoAnswers} from '@components/formFields/YesNoSelectField'
import {
  EligibilityDialog,
  EligibilityMobileStepper,
  EligibilityStepper
} from '@components/formFields/EligibilityDialog'
import {LawnReplacementRebateFormData} from '@lib/services/formService'
import {Theme} from '@lib/material-theme'
import {
  useFormikContext,
  FormikProps,
  connect,
  Field,
  FieldProps,
  FormikTouched
} from 'formik'

type Props = {
  open: boolean
  onClose: () => void
  fullWidth?: boolean
  formik?: FormikProps<any>
}

const LawnReplEligibilityDialog = ({open = false, onClose, formik}: Props) => {
  const theme = useTheme<Theme>()
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
        touched.treatedCustomer,
        touched.useArtTurf,
        touched.approxSqFeet,
        touched.irrigMethod
      ].every(Boolean),
    [touched]
  )

  const eligibleFieldsHaveError = useMemo(
    () =>
      [
        errors.treatedCustomer,
        errors.useArtTurf,
        errors.approxSqFeet,
        errors.irrigMethod
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
                        ...(stepHasError(fieldName) && {
                          color: theme.palette.error.main
                        }),
                        ...(activeStep === index &&
                          !stepHasError(fieldName) && {
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
              Excellent. You may now submit your application for the Lawn
              Replacement Rebate. Please close this message now to continue the
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

export default connect(LawnReplEligibilityDialog)

function getStepContent(stepNo: number) {
  const found = getSteps().find((step) => step.index === stepNo)
  return found ? found.content : null
}

function getStepIndex(fieldName: string) {
  const found = getSteps().find((step) => step.fieldName === fieldName)
  return found ? found.index : null
}

const useQuestionStyles = (theme: Theme) => ({
  qualifyMsg: {
    marginTop: theme.spacing(3)
  }
})

const QuestionOne = () => {
  const theme = useTheme<Theme>()
  const style = useQuestionStyles(theme)
  return (
    <Field name="treatedCustomer">
      {({field, form}: FieldProps<any>) => {
        const {setFieldValue, errors, setFieldTouched, touched} = form
        const {name, value} = field
        const currentError = errors[name]

        const clickHandler = (isTreatedCustomer: string) => () => {
          setFieldValue(name, isTreatedCustomer, true)
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
                Unfortunately, you do not qualify for the Lawn Replacement
                Rebate. Lawn Replacement Rebates are only available for PCWA
                treated water customers.
              </DialogContentText>
            </WaitToGrow>
          </div>
        )
      }}
    </Field>
  )
}

// const QuestionTwo = () => {
//   const classes = useQuestionStyles()
//   return (
//     <Field name="alreadyStarted">
//       {({field, form}: FieldProps<any>) => {
//         const {setFieldValue, errors, setFieldTouched, touched} = form
//         const {name, value} = field
//         const currentError = errors[name]

//         const clickHandler = (newValue: string) => () => {
//           setFieldValue(name, newValue, true)
//           setFieldTouched(name, true)
//         }

//         // Field Required Error will cause a quick jump/flash in height of <WaitToGrow/> once a value is selected unless we filter out those errors.
//         const hasApplicableError =
//           Boolean(currentError) &&
//           typeof currentError === 'string' &&
//           !/is a required field/i.test(currentError)

//         const fieldTouched = Boolean(touched[name])
//         return (
//           <div>
//             <List
//               subheader={
//                 <ListSubheader component="div">
//                   Choose one of the following
//                 </ListSubheader>
//               }
//             >
//               {q2Answers.map((answer) => (
//                 <ListItem
//                   key={answer.caption}
//                   button
//                   divider
//                   selected={answer.value === value}
//                   // disabled={fieldTouched}
//                   onClick={clickHandler(answer.value)}
//                 >
//                   <ListItemText primary={answer.caption} />
//                 </ListItem>
//               ))}
//             </List>
//             <WaitToGrow isIn={hasApplicableError && fieldTouched}>
//               <DialogContentText
//                 variant="body1"
//                 color="textPrimary"
//                 className={classes.qualifyMsg}
//               >
//                 Unfortunately you do not qualify for the Lawn Replacement
//                 Rebate. Conversions that are initiated prior to PCWA's approval
//                 are ineligible. No exceptions will be made.
//               </DialogContentText>
//             </WaitToGrow>
//           </div>
//         )
//       }}
//     </Field>
//   )
// }

const QuestionTwo = () => {
  const theme = useTheme<Theme>()
  const style = useQuestionStyles(theme)
  return (
    <Field name="useArtTurf">
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
              {q2Answers.map((answer) => (
                <ListItemButton
                  key={answer.caption}
                  divider
                  selected={answer.value === value}
                  // disabled={fieldTouched}
                  onClick={clickHandler(answer.value)}
                >
                  <ListItemText primary={answer.caption} />
                </ListItemButton>
              ))}
            </List>
            <WaitToGrow isIn={hasApplicableError && fieldTouched}>
              <DialogContentText
                variant="body1"
                color="textPrimary"
                sx={{...style.qualifyMsg}}
              >
                Unfortunately you do not qualify for the lawn replacement
                rebate. To qualify, you must have at least 300 square feet of
                lawn being replaced by water efficient landscape as defined in
                the program's terms and conditions.
              </DialogContentText>
            </WaitToGrow>
          </div>
        )
      }}
    </Field>
  )
}

const QuestionThree = () => {
  const theme = useTheme<Theme>()
  const style = useQuestionStyles(theme)
  const {touched, errors} = useFormikContext<LawnReplacementRebateFormData>()
  const fieldName = 'approxSqFeet'
  const fieldError = errors[fieldName]

  // Field Required Error will cause a quick jump/flash in height of <WaitToGrow/> once a value is selected unless we filter out those errors.
  const hasApplicableError =
    Boolean(fieldError) &&
    typeof fieldError === 'string' &&
    !/is a required field/i.test(fieldError)

  const fieldTouched = Boolean(touched[fieldName])
  return (
    <Box>
      <LawnApproxSqFootField name={fieldName} />
      <WaitToGrow isIn={hasApplicableError && fieldTouched}>
        <DialogContentText
          variant="body1"
          color="textPrimary"
          sx={{...style.qualifyMsg}}
        >
          Unfortunately you do not qualify for the Lawn Replacement Rebate. A
          minimum of 300 square feet of lawn must be converted.
        </DialogContentText>
      </WaitToGrow>
    </Box>
  )
}

const QuestionFour = () => {
  const theme = useTheme<Theme>()
  const style = useQuestionStyles(theme)
  return (
    <Field name="irrigMethod">
      {({field, form}: FieldProps<any>) => {
        const {setFieldValue, touched, errors, setFieldTouched} = form
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
              {IRRIGATION_METHODS.map((method) => (
                <ListItemButton
                  key={method}
                  divider
                  selected={method === value}
                  // disabled={fieldTouched}
                  onClick={clickHandler(method)}
                >
                  <ListItemText primary={method} />
                </ListItemButton>
              ))}
            </List>
            <WaitToGrow isIn={hasApplicableError && fieldTouched}>
              <DialogContentText
                variant="body1"
                color="textPrimary"
                sx={{...style.qualifyMsg}}
              >
                Unfortunately you do not qualify for the Lawn Replacement
                Rebate. Lawn areas to be converted must be currently maintained
                and irrigated by an operating sprinkler system.
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
    // {
    //   index: 1,
    //   label: 'Have you already started the Lawn Replacement project?',
    //   fieldName: 'alreadyStarted',
    //   content: <QuestionTwo />
    // },
    {
      index: 1,
      label: 'Do you plan on replacing your ENTIRE lawn with artificial turf?',
      fieldName: 'useArtTurf',
      content: <QuestionTwo />
    },
    {
      index: 2,
      label:
        'What is the approximate square footage of existing lawn being replaced? Please note that any area that will be replaced with artificial turf does not qualify towards the rebate.',
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
