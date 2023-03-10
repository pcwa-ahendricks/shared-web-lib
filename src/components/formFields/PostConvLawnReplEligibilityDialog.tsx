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
  Step,
  StepLabel,
  StepContent,
  Theme,
  makeStyles,
  createStyles,
  useTheme
} from '@material-ui/core'
import WaitToGrow from '@components/WaitToGrow/WaitToGrow'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import {Field, connect, FormikProps, FieldProps} from 'formik'
import clsx from 'clsx'
import {addedDiff} from 'deep-object-diff'
import {useDebounce} from 'use-debounce'
import {ANSWERS as yesNoAnswers} from '@components/formFields/YesNoSelectField'
import {
  EligibilityDialog,
  EligibilityMobileStepper,
  EligibilityStepper
} from '@components/formFields/EligibilityDialog'
import RebatesEmail from '@components/links/RebatesEmail'

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

const PostConvLawnReplEligibilityDialog = ({
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
    () =>
      [
        touched.rebateCustomer,
        touched.projectCompleted,
        touched.worksheetCompleted,
        touched.photosTaken,
        touched.partsReceipts
      ].every(Boolean),
    [touched]
  )

  const eligibleFieldsHaveError = useMemo(
    () =>
      [
        errors.rebateCustomer,
        errors.projectCompleted,
        errors.worksheetCompleted,
        errors.photosTaken,
        errors.partsReceipts
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
      const hasError =
        Boolean(error) &&
        typeof error === 'string' &&
        !/is a required field/i.test(error)
      return hasError
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
      <DialogTitle id="form-dialog-title">
        Check Application Eligibility
      </DialogTitle>
      <DialogContent>
        <div>
          <EligibilityStepper activeStep={activeStep}>
            {steps.map(({label, index, fieldName}) => {
              const hasError = stepHasError(fieldName)
              return (
                <Step key={label} completed={stepCompleted(fieldName)}>
                  {/* <StepLabel>{label}</StepLabel> */}
                  <StepLabel
                    error={hasError}
                    classes={{
                      iconContainer: classes.stepLabelIcon,
                      labelContainer: classes.stepLabelLabel
                    }}
                    optional={
                      <DialogContentText
                        variant="h4"
                        color="textSecondary"
                        className={clsx({
                          [classes.stepLabelError]: hasError,
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
              )
            })}
          </EligibilityStepper>
          <WaitToGrow isIn={rebateEligibility}>
            <DialogContentText
              variant="body1"
              color="textPrimary"
              className={classes.qualifyMsg}
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

export default connect(PostConvLawnReplEligibilityDialog)

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
                This application is only to be submitted by customers that are
                currently participating in the Lawn Replacement Rebate Program.
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
  const classes = useQuestionStyles()
  return (
    <Field name="worksheetCompleted">
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
                <ListItem
                  key={answer}
                  button
                  divider
                  selected={answer === value}
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
                Plant Coverage Worksheet is required in order to submit
                application. Please contact <RebatesEmail /> and request the
                Plant Coverage Worksheet.
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
                Post Conversion photographs (5) are required. Please refer to
                Lawn Replacement terms and conditions, section, VI.
              </DialogContentText>
            </WaitToGrow>
          </div>
        )
      }}
    </Field>
  )
}

const QuestionFive = () => {
  const classes = useQuestionStyles()
  return (
    <Field name="partsReceipts">
      {({field, form}: FieldProps<any>) => {
        const {setFieldValue, setFieldTouched, touched} = form
        const {name, value} = field
        // const currentError = errors[name]

        const clickHandler = (newValue: string) => () => {
          setFieldValue(name, newValue, true)
          setFieldTouched(name, true)
        }

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
            <WaitToGrow isIn={fieldTouched && value?.toLowerCase() === 'no'}>
              <DialogContentText
                variant="body1"
                color="textPrimary"
                className={classes.qualifyMsg}
              >
                Note, if you are unable to obtain itemized receipts you cannot
                participate in our irrigation efficiencies rebate. Receipts are
                not required for Lawn Replacement Rebate.
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
        'Are you currently participating in the PCWA Lawn Replacement Rebate Program?',
      fieldName: 'rebateCustomer',
      content: <QuestionOne />
    },
    {
      index: 1,
      label: 'Is your project completed?',
      fieldName: 'projectCompleted',
      content: <QuestionTwo />
    },
    {
      index: 2,
      label: "Have you completed the '50% Plant Coverage worksheet'?",
      fieldName: 'worksheetCompleted',
      content: <QuestionThree />
    },
    {
      index: 3,
      label:
        'Have you taken 5 post conversion photographs following requirements stated in terms and conditions?',
      fieldName: 'photosTaken',
      content: <QuestionFour />
    },
    {
      index: 4,
      label:
        'Do you have clear pictures of itemized receipts for irrigation parts installed?',
      fieldName: 'partsReceipts',
      content: <QuestionFive />
    }
  ]
}
