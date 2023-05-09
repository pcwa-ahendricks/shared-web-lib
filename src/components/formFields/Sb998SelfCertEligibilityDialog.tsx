// cspell:ignore subheader USBR assis
import React, {useState, useMemo, useCallback, useRef, useEffect} from 'react'
import BulletIcon from 'mdi-material-ui/CircleSmall'
import {
  alpha,
  Typography as Type,
  TypographyProps,
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
  useTheme,
  Box,
  ListItemIcon,
  ListItemIconProps,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import {ANSWERS as yesNoAnswers} from '@components/formFields/YesNoSelectField'
import WaitToGrow from '@components/WaitToGrow/WaitToGrow'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import {connect, FormikProps, useFormikContext, useField} from 'formik'
import clsx from 'clsx'
import {addedDiff} from 'deep-object-diff'
import {useDebounce} from 'use-debounce'
import {
  EligibilityDialog,
  EligibilityMobileStepper,
  EligibilityStepper
} from '@components/formFields/EligibilityDialog'
import {Sb998SelfCertFormData} from '@lib/services/formService'
import MainPhone from '@components/links/MainPhone'
import Spacing from '@components/boxes/Spacing'
import {blueGrey, yellow} from '@mui/material/colors'
import CollectionsPhone from '@components/links/CollectionsPhone'
import MuiNextLink from '@components/NextLink/NextLink'

type Sb998SelfCertFormDataProp = keyof Sb998SelfCertFormData

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
      '& .stepLabelActive': {
        color: theme.palette.primary.main
      },
      '& .stepLabelError': {
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
  const prevTouched = useRef<Record<string, unknown>>()
  const prevLastTouchedIndex = useRef<number>()

  const {touched, errors, values} = useFormikContext<Sb998SelfCertFormData>()

  const reducedCnctChrgCondition = useMemo(
    () => values.primaryCareCert === 'No',
    [values]
  )
  const paymentPlanCondition = useMemo(
    () => values.paymentPlan === 'Yes',
    [values]
  )
  const householdAssisCondition = useMemo(
    () => values.householdAssist === 'Yes',
    [values]
  )

  const steps = useMemo(
    () =>
      getSteps()
        .filter((step) => {
          return (
            !(step.name === 'paymentPlan' && reducedCnctChrgCondition) &&
            !(step.name === 'householdIncome' && householdAssisCondition)
          )
        })
        .map((step, index) => ({...step, index})),
    [reducedCnctChrgCondition, householdAssisCondition]
  )

  const getStepContent = useCallback(
    (stepNo: number) => {
      const found = steps.find((step) => step.index === stepNo)
      return found ? found.content : null
    },
    [steps]
  )

  const getStepIndex = useCallback(
    (fieldName: string) => {
      const found = steps.find((step) => step.name === fieldName)
      return found ? found.index : null
    },
    [steps]
  )

  const maxSteps = useMemo(() => steps.length, [steps])

  const eligibleFieldsTouched = useMemo(
    () =>
      [
        touched.treatedCustomer,
        touched.householdAssist,
        touched.householdIncome || householdAssisCondition,
        touched.primaryCareCert,
        touched.paymentPlan || reducedCnctChrgCondition
      ].every(Boolean),
    [touched, reducedCnctChrgCondition, householdAssisCondition]
  )

  const eligibleFieldsHaveError = useMemo(
    () =>
      [
        errors.treatedCustomer,
        errors.householdAssist,
        errors.householdIncome,
        errors.primaryCareCert,
        errors.paymentPlan
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
    (prev, curr) => {
      const diff = addedDiff(prev, curr) || {}
      const newProp = Object.keys({...diff})[0]
      const stepIndex = newProp && getStepIndex(newProp)
      // Don't use Boolean(nextStepIndex) cause 0 is false.
      const nextStepIndex = typeof stepIndex === 'number' && stepIndex + 1
      if (nextStepIndex) {
        setLastTouchedIndex(nextStepIndex)
      }
    },
    [getStepIndex]
  )

  useEffect(() => {
    touchedChangedHandler({...prevTouched.current}, {...touched})
    // and lastly...
    prevTouched.current = {...touched}
  }, [touched, touchedChangedHandler, prevTouched])

  const eligibility: boolean = !eligibleFieldsHaveError && eligibleFieldsTouched

  const eligibilityIncomplete: boolean =
    !eligibleFieldsHaveError && !eligibleFieldsTouched

  const eligibilityComplete: boolean =
    eligibleFieldsHaveError || eligibleFieldsTouched

  const setActiveStepIf = useCallback(
    (stepNo: number) => {
      // Don't allow changing of questions/steps if there are any relevant errors, or, if step index doesn't exist (maxSteps starts at 1, stpNo at 0).
      if (stepNo > maxSteps - 1 || eligibilityComplete) {
        return
      }
      setActiveStep(stepNo)
    },
    [eligibilityComplete, maxSteps]
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
    (fieldName: Sb998SelfCertFormDataProp) => {
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
    (fieldName: Sb998SelfCertFormDataProp) => {
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
      <DialogTitle id="form-dialog-title">
        Water Shutoff Protection Act Self Certification
      </DialogTitle>
      <DialogContent>
        <div>
          <WaitToGrow isIn={activeStep === 0}>
            <Intro />
          </WaitToGrow>
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
          <WaitToGrow isIn={eligibility}>
            <DialogContentText
              variant="body1"
              color="textPrimary"
              className={classes.qualifyMsg}
            >
              <Box bgcolor={blueGrey[50]} paddingY={2} paddingX={4}>
                {reducedCnctChrgCondition ? (
                  <>
                    <Type paragraph>
                      Per WSPA if a residential customer demonstrates, to the
                      Agency, that the customer's household income is below 200%
                      of the federal poverty line, the Agency shall charge no
                      more than $52.00 for reconnection of service during
                      business hours or no more than $157.00 for after-hours
                      reconnection. Health & Safety code 116910.
                    </Type>
                    <Type paragraph>
                      As a condition and requirement for receiving a reduced
                      reconnection fee from PCWA, I hereby declare that my
                      household income is below 200 percent of the federal
                      poverty line. This form is valid for 12 months from the
                      date of signature. I understand that by signing this form
                      I agree that the information listed is true and correct. I
                      declare that I meet the above requirements of the
                      WSPA/Water Shutoff Protection Act.
                    </Type>
                    <Type>Please close this dialog to continue.</Type>
                  </>
                ) : null}
                {paymentPlanCondition ? (
                  <>
                    <Type paragraph>
                      Pursuant to Section 116900 of the Health and Safety Code,
                      PCWA will not terminate residential service for nonpayment
                      as long as all 3 specific conditions are met.
                    </Type>
                    <Type paragraph>
                      Completion of this form does not guarantee a payment
                      arrangement. I understand by meeting the above conditions,
                      my service may still be terminated if I fail to comply
                      with a payment arrangement. The Agency shall charge no
                      more than $52.00 for reconnection of service during
                      business hours or no more than $157.00 for after-hours
                      reconnection. Documentation may need to be provided upon
                      request by PCWA. This form is valid for 12 months from
                      date of signature. I understand that by signing this form
                      I agree that the information listed is true and correct. I
                      declare that I meet the above requirements of the Water
                      Shutoff Protection Act.
                    </Type>
                    <Type>Please close this dialog to continue.</Type>
                  </>
                ) : null}
              </Box>
            </DialogContentText>
          </WaitToGrow>
        </div>
      </DialogContent>
      <DialogActions>
        <WaitToGrow
          isIn={eligibilityIncomplete}
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
        <WaitToGrow isIn={eligibilityComplete}>
          <Button
            onClick={onClose}
            color="primary"
            // disabled={eligibilityIncomplete}
          >
            Close
          </Button>
        </WaitToGrow>
      </DialogActions>
    </EligibilityDialog>
  )
}

export default connect(Sb998SelfCertEligibilityDialog)

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
      {/* <Type variant="subtitle1" gutterBottom>
        Water Shutoff Protection Act
      </Type> */}
      <Type>
        Pursuant to Section 116900 of the Health and Safety Code, Placer County
        Water Agency (PCWA, the Agency) will not terminate residential service
        for nonpayment when specific conditions are met. The written policy is
        available online on our{' '}
        <MuiNextLink href="/services/shutoff-protection">
          Water Shutoff Protection
        </MuiNextLink>{' '}
        page or by calling the Customer Services department at <MainPhone />.
      </Type>
      <Spacing />
      <Type align="center" variant="subtitle2">
        The Water Shutoff Protection Act (WSPA) prohibits discontinuation of
        water service if <em>all</em> the following conditions are met:
      </Type>
      <List disablePadding>
        <ListItem classes={{root: classes.tightListItem}}>
          <ListItemBullet>
            <BulletIcon fontSize="large" />
          </ListItemBullet>
          <ListItemText
            classes={{root: classes.tightListItemText}}
            primary="A primary care provider certifies that discontinuation will be life-threatening or poses a serious threat to the health and safety of a resident on the premises where service is provided; and"
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
            primary="A customer is willing to enter an amortization agreement, alternative payment schedule, or plan for a deferred or reduced payment."
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

const QuestionOne = ({fieldName}: {fieldName: Sb998SelfCertFormDataProp}) => {
  const classes = useQuestionStyles()

  const {setFieldValue, errors, setFieldTouched, touched} =
    useFormikContext<any>()
  const [field, _meta] = useField(fieldName)

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
          <Box bgcolor={alpha(yellow[50], 0.5)} paddingY={2} paddingX={4}>
            You must be a current PCWA treated water customer, WSPA does not
            apply to untreated water. To inquire about payment options to avoid
            discontinuation of irrigation water services, please contact
            Customer Services at <CollectionsPhone />.
          </Box>
        </DialogContentText>
      </WaitToGrow>
    </div>
  )
}

const AssisType = ({children, ...rest}: TypographyProps) => {
  return (
    <Type component="span" {...rest}>
      {children}
    </Type>
  )
}

const QuestionTwo = ({fieldName}: {fieldName: Sb998SelfCertFormDataProp}) => {
  const classes = useQuestionStyles()

  const {setFieldValue, errors, setFieldTouched, touched} =
    useFormikContext<any>()
  const [field, _meta] = useField(fieldName)

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
      <AssisType>MEDI-CAL, </AssisType>
      <AssisType>SSI/SSP, </AssisType>
      <AssisType>Cal WORKS, </AssisType>
      <AssisType>CalFresh, </AssisType>
      <AssisType>General Assistance, </AssisType>
      <AssisType>or WIC</AssisType>

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
          An error has occurred
        </DialogContentText>
      </WaitToGrow>
    </div>
  )
}

const QuestionThree = ({fieldName}: {fieldName: Sb998SelfCertFormDataProp}) => {
  const classes = useQuestionStyles()

  const {setFieldValue, errors, setFieldTouched, touched} =
    useFormikContext<any>()
  const [field, _meta] = useField(fieldName)

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
      <IncomeTable />

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
          <Box bgcolor={alpha(yellow[50], 0.5)} paddingY={2} paddingX={4}>
            Specific income conditions must be met to avoid service interruption
            under the Water Shutoff Protection Act. A customer who is unable to
            pay for water service within the normal payment period may request
            an alternative payment plan to avoid disruption of service. Please
            contact Customer Services at <CollectionsPhone /> to discuss
            Alternate Payment Options.
          </Box>
        </DialogContentText>
      </WaitToGrow>
    </div>
  )
}

const QuestionFour = ({fieldName}: {fieldName: Sb998SelfCertFormDataProp}) => {
  const classes = useQuestionStyles()

  const {setFieldValue, errors, setFieldTouched, touched} =
    useFormikContext<any>()
  const [field, _meta] = useField(fieldName)

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
          An error has occurred.
        </DialogContentText>
      </WaitToGrow>
    </div>
  )
}

const QuestionFive = ({fieldName}: {fieldName: Sb998SelfCertFormDataProp}) => {
  const classes = useQuestionStyles()

  const {setFieldValue, errors, setFieldTouched, touched} =
    useFormikContext<any>()
  const [field, _meta] = useField(fieldName)

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
          <Box bgcolor={alpha(yellow[50], 0.5)} paddingY={2} paddingX={4}>
            WSPA requires a customer be willing to enter an amortization
            agreement, alternative payment schedule, or plan for a deferred or
            reduced payment.
          </Box>
        </DialogContentText>
      </WaitToGrow>
    </div>
  )
}

function getSteps(): {
  index: number
  label: string
  name: Sb998SelfCertFormDataProp
  content: JSX.Element
}[] {
  return [
    {
      index: 0,
      label: 'Are you a Placer Country Water Agency Treated Water customer?',
      name: 'treatedCustomer',
      content: <QuestionOne fieldName="treatedCustomer" />
    },
    {
      index: 1,
      label:
        'Are you (or someone in your household) enrolled in any of the following assistance programs?',
      name: 'householdAssist',
      content: <QuestionTwo fieldName="householdAssist" />
    },
    {
      index: 2,
      label:
        "Is the household's annual income less than 200 percent the federal poverty level?",
      name: 'householdIncome',
      content: <QuestionThree fieldName="householdIncome" />
    },
    {
      index: 3,
      label:
        'I can submit certification of a primary care provider, that discontinuation of residential service will be life-threatening to or pose a serious threat to the health and safety of a resident of the premises where service is provided.',
      name: 'primaryCareCert',
      content: <QuestionFour fieldName="primaryCareCert" />
    },
    {
      index: 4,
      label:
        "I am willing to enter an amortization agreement, alternative payment schedule, or plan for a deferred or reduced payment. Requests are reviewed on a case-by-case basis, taking in consideration payment history and the outstanding balance, based on the policy set forth in PCWA's Rules and Regulations.",
      name: 'paymentPlan',
      content: <QuestionFive fieldName="paymentPlan" />
    }
  ]
}

function createData(size: number, incomeLimit: number) {
  return {size, incomeLimit}
}
const rows = [
  createData(1, 25760),
  createData(2, 34840),
  createData(3, 43920),
  createData(4, 53000),
  createData(5, 62080),
  createData(6, 71160),
  createData(7, 80240),
  createData(8, 89320)
]

const IncomeTable = () => {
  return (
    <Box maxWidth={300}>
      <TableContainer>
        <Table aria-label="household annual income table" size="small">
          {/* <caption></caption> */}
          <TableHead>
            <TableRow>
              <TableCell>Household Size</TableCell>
              <TableCell align="right">
                200% of HHS Poverty Guidelines*
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.size}>
                <TableCell component="th" scope="row">
                  {row.size}
                </TableCell>
                <TableCell align="right">
                  {row.incomeLimit.toLocaleString(undefined, {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Spacing size="small" />
    </Box>
  )
}
