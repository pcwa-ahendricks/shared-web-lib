// cspell:ignore subheader USBR
import React from 'react'

import {
  Box,
  Dialog,
  MobileStepper,
  Stepper,
  Theme,
  useMediaQuery
} from '@material-ui/core'
import {MobileStepperProps} from '@material-ui/core/MobileStepper'
import {StepperProps} from '@material-ui/core/Stepper'
import {DialogProps} from '@material-ui/core/Dialog'
import {makeStyles, createStyles, useTheme} from '@material-ui/styles'
import {SlideTransition as Transition} from '@components/Transition/Transition'

// Text importance dialog. Eliminate opacity used by Paper by default (theme.palette.background.paper, "rgba(242, 242, 242, 0.9)")
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      backgroundColor: theme.palette.grey[200]
    },
    mobileStepper: {
      width: '100%'
    },
    mobileStepperPaper: {
      backgroundColor: 'transparent',
      padding: 0
    },
    stepperPaper: {
      backgroundColor: 'transparent',
      [theme.breakpoints.down('xs')]: {
        padding: 0
      },
      [theme.breakpoints.only('sm')]: {
        padding: theme.spacing(2) // defaults to 24px
      }
    }
  })
)

type EligibilityDialogProps = {
  children: React.ReactNode
} & DialogProps
const EligibilityDialog = ({children, ...rest}: EligibilityDialogProps) => {
  const classes = useStyles()
  const theme = useTheme<Theme>()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <Dialog
      disableBackdropClick={true}
      maxWidth="sm"
      fullWidth
      fullScreen={fullScreen}
      TransitionComponent={Transition}
      classes={{
        paper: classes.paper
      }}
      {...rest}
    >
      {children}
    </Dialog>
  )
}

type EligibilityMobileStepperProps = MobileStepperProps

const EligibilityMobileStepper = ({...rest}: EligibilityMobileStepperProps) => {
  const classes = useStyles()
  return (
    <MobileStepper
      position="static"
      className={classes.mobileStepper}
      classes={{root: classes.mobileStepperPaper}}
      {...rest}
    />
  )
}

type EligibilityStepperProps = {children: React.ReactNode} & StepperProps

const EligibilityStepper = ({children, ...rest}: EligibilityStepperProps) => {
  const classes = useStyles()
  return (
    <Box width={{xs: '95%', sm: '90%'}}>
      <Stepper
        orientation="vertical"
        classes={{root: classes.stepperPaper}}
        {...rest}
      >
        {children}
      </Stepper>
    </Box>
  )
}

export {EligibilityDialog, EligibilityMobileStepper, EligibilityStepper}
