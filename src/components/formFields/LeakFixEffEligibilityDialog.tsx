// cspell:ignore subheader USBR
import React, {useState, useMemo, useCallback, useRef, useEffect} from 'react'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import {useFormikContext, useField, Field} from 'formik'
import clsx from 'clsx'
import {addedDiff} from 'deep-object-diff'
import {useDebounce} from 'use-debounce'
import {
  EligibilityDialog,
  EligibilityMobileStepper,
  EligibilityStepper
} from '@components/formFields/EligibilityDialog'
import {WaterLeakFormData} from '@lib/services/formService'
import WaterLeakRequireCheckboxes from './WaterLeakRequireCheckboxes'

type WaterLeakFormDataProp = keyof WaterLeakFormData

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

const LeakFixEffEligibilityDialog = ({
  open = false,
  onClose,
  ...rest
}: Props) => {
  const classes = useStyles()
  const theme = useTheme<Theme>()
  const [activeStep, setActiveStep] = useState<number>(0)
  const [lastTouchedIndex, setLastTouchedIndex] = useState<number>(0)
  const [debouncedLastTouchedIndex] = useDebounce(lastTouchedIndex, 800)
  const steps = useMemo(() => getSteps({...rest}), [rest])
  const prevTouched = useRef<Record<string, unknown>>()
  const prevLastTouchedIndex = useRef<number>()
  const maxSteps = useMemo(() => getSteps({...rest}).length, [rest])

  const {touched, errors} = useFormikContext<WaterLeakFormData>()

  const eligibleFieldsTouched = useMemo(
    () => [touched.eligibilityRequirements].every(Boolean),
    [touched]
  )

  const [submitBtnClicked, setSubmitBtnClicked] = useState(false)

  const eligibleFieldsHaveError = useMemo(
    () =>
      [errors.eligibilityRequirements]
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
    (fieldName: WaterLeakFormDataProp) => {
      const error = errors[fieldName]
      return (
        submitBtnClicked &&
        Boolean(error) &&
        typeof error === 'string' &&
        !/is a required field/i.test(error)
      )
    },
    [errors, submitBtnClicked]
  )

  const submitClickHandler = useCallback(() => {
    setSubmitBtnClicked(true)
    onClose()
  }, [onClose])

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
              <Step key={label} completed>
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
                  {getStepContent(index, {
                    name,
                    label,
                    submitBtnClicked,
                    ...rest
                  })}
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
            onClick={submitClickHandler}
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

export default LeakFixEffEligibilityDialog

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

const QuestionOneField = ({submitBtnClicked, ...props}: any) => {
  const classes = useQuestionStyles()
  const [field, meta, _helpers] = useField(props)
  const {error, touched} = meta
  // const {value} = field
  // const {setTouched, setValue} = helpers

  // Field Required Error will cause a quick jump/flash in height of <WaitToGrow/> once a value is selected unless we filter out those errors.
  const hasApplicableError =
    submitBtnClicked &&
    Boolean(error) &&
    typeof error === 'string' &&
    !/is a required field/i.test(error)

  return (
    <>
      <input {...field} {...props} />

      <Field
        name="eligibilityRequirements"
        component={WaterLeakRequireCheckboxes}
      />
      <WaitToGrow isIn={hasApplicableError && touched && submitBtnClicked}>
        <DialogContentText
          variant="body1"
          color="textPrimary"
          className={classes.qualifyMsg}
        >
          Unfortunately, you do not qualify for the Treated Leak Rebate.
        </DialogContentText>
      </WaitToGrow>
    </>
  )
}

function getSteps(props: any) {
  return [
    {
      index: 0,
      label:
        'In order to apply for the Treated Water Leak Rebate you will need to meet the following requirements.',
      name: 'eligibilityRequirements' as WaterLeakFormDataProp,
      content: <QuestionOneField type="hidden" {...props} />
    }
  ]
}
