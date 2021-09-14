// cspell:ignore subheader USBR
import React, {useState, useMemo, useCallback, useRef, useEffect} from 'react'
import BulletIcon from 'mdi-material-ui/CircleSmall'
import {
  Typography as Type,
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
  useTheme,
  Box,
  Link,
  ListItemIcon,
  ListItemIconProps
} from '@material-ui/core'
import {ANSWERS as yesNoAnswers} from '@components/formFields/YesNoSelectField'
import WaitToGrow from '@components/WaitToGrow/WaitToGrow'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import {Field, connect, FormikProps, FieldProps, useFormikContext} from 'formik'
import clsx from 'clsx'
import {addedDiff} from 'deep-object-diff'
import {useDebounce} from 'use-debounce'
import {
  EligibilityDialog,
  EligibilityMobileStepper,
  EligibilityStepper
} from '@components/formFields/EligibilityDialog'
import {PoolCoverRebateFormData} from '@lib/services/formService'
import MainPhone from '@components/links/MainPhone'
import Spacing from '@components/boxes/Spacing'
import {blueGrey} from '@material-ui/core/colors'
import CollectionsPhone from '@components/links/CollectionsPhone'

type PoolCoverRebateFormDataProp = keyof PoolCoverRebateFormData

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

const Sb998SelfCertEligibilityDialog = ({open = false, onClose}: Props) => {
  const classes = useStyles()
  const theme = useTheme<Theme>()
  const [activeStep, setActiveStep] = useState<number>(0)
  const [lastTouchedIndex, setLastTouchedIndex] = useState<number>(0)
  const [debouncedLastTouchedIndex] = useDebounce(lastTouchedIndex, 800)
  const steps = useMemo(() => getSteps(), [])
  const maxSteps = useMemo(() => getSteps().length, [])
  const prevTouched = useRef<Record<string, unknown>>()
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
    (fieldName: PoolCoverRebateFormDataProp) => {
      const error = errors[fieldName]
      return (
        Boolean(error) && typeof error === 'string' && !/required/i.test(error)
      )
    },
    [errors]
  )

  const stepCompleted = useCallback(
    (fieldName: PoolCoverRebateFormDataProp) => {
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
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">SB998 Self Certification</DialogTitle>
      <DialogContent>
        <div>
          <Intro />
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

export default connect(Sb998SelfCertEligibilityDialog)

function getStepContent(stepNo: number) {
  const found = getSteps().find((step) => step.index === stepNo)
  return found ? found.content : null
}

function getStepIndex(fieldName: string) {
  const found = getSteps().find((step) => step.name === fieldName)
  return found ? found.index : null
}

const useQuestionStyles = makeStyles((theme: Theme) =>
  createStyles({
    qualifyMsg: {
      marginTop: theme.spacing(3)
    }
  })
)

const useIntroStyles = makeStyles((theme) => ({
  listItemBullet: {
    minWidth: theme.spacing(5)
  },
  tightListItem: {
    paddingTop: 2,
    paddingBottom: 2
  },
  tightListItemText: {
    paddingTop: 2,
    paddingBottom: 2,
    marginTop: 0,
    marginBottom: 0
  }
}))
const Intro = () => {
  // const classes = useQuestionStyles()
  const classes = useIntroStyles()
  const ListItemBullet = useCallback(
    ({children, ...rest}: ListItemIconProps) => {
      return (
        <ListItemIcon classes={{root: classes.listItemBullet}} {...rest}>
          {children}
        </ListItemIcon>
      )
    },
    [classes]
  )
  // const theme = useTheme()

  return (
    <Box>
      <Type variant="subtitle1" gutterBottom>
        Water Shutoff Protection Act
      </Type>
      <Type>
        Pursuant to Section 116900 of the Health and Safety Code, Placer County
        Water Agency (PCWA) will not terminate residential service for
        nonpayment when specific conditions are met. The written policy is
        available at <Link href="#">(insert link to policy in PDF?)</Link> or by
        calling the Customer Services department at <MainPhone />.
      </Type>
      <Spacing />
      <Type align="center" variant="subtitle2">
        Senate Bill 998 prohibits discontinuation of water service if{' '}
        <em>all</em> the following conditions are met:
      </Type>
      <List disablePadding>
        <ListItem classes={{root: classes.tightListItem}}>
          <ListItemBullet>
            <BulletIcon fontSize="large" />
          </ListItemBullet>
          <ListItemText
            classes={{root: classes.tightListItemText}}
            primary="A primary care provider certifies that discontinuation will be
        life-threatening or poses a serious threat to the health and safety of a
        resident on the premises where service is provided; and"
          />
        </ListItem>
        <ListItem classes={{root: classes.tightListItem}}>
          <ListItemBullet>
            <BulletIcon fontSize="large" />
          </ListItemBullet>
          <ListItemText
            classes={{root: classes.tightListItemText}}
            primary="A customer demonstrates he or she is financially unable to pay; and"
          />
        </ListItem>
        <ListItem classes={{root: classes.tightListItem}}>
          <ListItemBullet>
            <BulletIcon fontSize="large" />
          </ListItemBullet>
          <ListItemText
            classes={{root: classes.tightListItemText}}
            primary="A customer is willing to enter an amortization agreement, alternative
        payment schedule, or plan for a deferred or reduced payment."
          />
        </ListItem>
      </List>
      <Spacing size="small" />
      <Box bgcolor={blueGrey[50]} paddingY={2} paddingX={4}>
        <Type>
          <strong>
            This form is a declaration of financial need and is required for
            receiving reduced reconnection fees and to avoid disruption of water
            service. Completion of this form does not guarantee a payment
            arrangement.
          </strong>
        </Type>
      </Box>
    </Box>
  )
}

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
                You must be a current Placer County Water Agency treated water
                customer. SB998 relates to water adequate for human consumption,
                cooking, and sanitary purposes. To inquire about payment options
                to avoid discontinuation of irrigation water services, please
                contact Customer Services at <CollectionsPhone />.
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
      label: 'Are you a Placer Country Water Agency Treated Water customer?',
      name: 'treatedCustomer',
      content: <QuestionOne />
    }
  ]
}
