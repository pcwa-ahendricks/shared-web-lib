// cspell:ignore Subheader
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
  // Typography as Type
} from '@material-ui/core'
import {makeStyles, createStyles, useTheme} from '@material-ui/core/styles'
import {IRRIGATION_METHODS} from '@components/formFields/IrrigationMethodSelect'
// import {ANSWERS as q2Answers} from '@components/formFields/AlreadyStartedSelect'
import {ANSWERS as q2Answers} from '@components/formFields/ArtTurfSelect'
import LawnApproxSqFootField from '@components/formFields/LawnApproxSqFootField'
import WaitToGrow from '@components/WaitToGrow/WaitToGrow'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import {Field, connect, FormikProps, FieldProps} from 'formik'
import clsx from 'clsx'
import {addedDiff} from 'deep-object-diff'
import useDebounce from '@hooks/useDebounce'
import {ANSWERS as yesNoAnswers} from '@components/formFields/YesNoSelectField'
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

const LawnReplEligibilityDialog = ({open = false, onClose, formik}: Props) => {
  const classes = useStyles()
  const theme = useTheme<Theme>()
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
                Unfortunately, you do not qualify for the Lawn Replacement
                Rebate. Lawn Replacement Rebates are only available for PCWA
                treated water customers. Please close this web browser tab to go
                back to the <a href="https://www.pcwa.net">PCWA.net</a> website.
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
//           !/required field/i.test(currentError)

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
//                 {/* // GO-LIVE - We need to re-word last sentence after GO LIVE date. */}
//                 Unfortunately you do not qualify for the Lawn Replacement
//                 Rebate. Conversions that are initiated prior to PCWA's approval
//                 are ineligible. No exceptions will be made. Please close this
//                 web browser tab to go back to the{' '}
//                 <a href="https://www.pcwa.net">PCWA.net</a> website.
//               </DialogContentText>
//             </WaitToGrow>
//           </div>
//         )
//       }}
//     </Field>
//   )
// }

const QuestionTwo = () => {
  const classes = useQuestionStyles()
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
              {q2Answers.map((answer) => (
                <ListItem
                  key={answer.caption}
                  button
                  divider
                  selected={answer.value === value}
                  // disabled={fieldTouched}
                  onClick={clickHandler(answer.value)}
                >
                  <ListItemText primary={answer.caption} />
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
                Unfortunately you do not qualify for the lawn replacement
                rebate. To qualify, you must have at least 300 square feet of
                lawn being replaced by water efficient landscape as defined in
                the program’s terms and conditions. Please close this web
                browser tab to go back to the{' '}
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
    <Field name="approxSqFeet">
      {({field, form}: FieldProps<any>) => {
        const {touched, errors} = form
        const {name} = field
        const currentError = errors[name]

        // Field Required Error will cause a quick jump/flash in height of <WaitToGrow/> once a value is selected unless we filter out those errors.
        const hasApplicableError =
          Boolean(currentError) &&
          typeof currentError === 'string' &&
          !/required field/i.test(currentError)

        const fieldTouched = Boolean(touched[name])
        return (
          <div>
            <LawnApproxSqFootField form={form} field={field} />
            <WaitToGrow isIn={hasApplicableError && fieldTouched}>
              <DialogContentText
                variant="body1"
                color="textPrimary"
                className={classes.qualifyMsg}
              >
                {/* // GO-LIVE - We need to re-word last sentence after GO LIVE date. */}
                Unfortunately you do not qualify for the Lawn Replacement
                Rebate. A minimum of 300 square feet of lawn must be converted.
                Please close this web browser tab to go back to the{' '}
                <a href="https://www.pcwa.net">PCWA.net</a> website.
              </DialogContentText>
            </WaitToGrow>
          </div>
        )
      }}
    </Field>
  )
}

const QuestionFour = () => {
  const classes = useQuestionStyles()
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
              {IRRIGATION_METHODS.map((method) => (
                <ListItem
                  key={method}
                  button
                  divider
                  selected={method === value}
                  // disabled={fieldTouched}
                  onClick={clickHandler(method)}
                >
                  <ListItemText primary={method} />
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
                Unfortunately you do not qualify for the Lawn Replacement
                Rebate. Lawn areas to be converted must be currently maintained
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
}
