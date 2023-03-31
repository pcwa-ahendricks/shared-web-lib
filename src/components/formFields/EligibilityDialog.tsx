// cspell:ignore subheader USBR
import React from 'react'

import {
  Box,
  Dialog,
  MobileStepper,
  Stepper,
  Slide,
  Theme,
  useMediaQuery,
  useTheme,
  MobileStepperProps,
  StepperProps,
  DialogProps
} from '@mui/material'

import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mobileStepper: {
      width: '100%'
    },
    mobileStepperPaper: {
      backgroundColor: 'transparent',
      padding: 0
    },
    stepperPaper: {
      backgroundColor: 'transparent',
      [theme.breakpoints.down('sm')]: {
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

// Intercept onClose so it's not spread into the <Dialog/> component overwriting the onClose method
const EligibilityDialog = ({
  children,
  onClose: onCloseProp,
  ...rest
}: EligibilityDialogProps) => {
  const theme = useTheme<Theme>()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      fullScreen={fullScreen}
      TransitionComponent={Slide}
      onClose={(event, reason) => {
        console.log(reason)
        if (reason !== 'backdropClick') {
          onCloseProp?.(event, reason)
        }
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
