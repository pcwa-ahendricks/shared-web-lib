// cspell:ignore subheader USBR
import React from 'react'
import {
  Box,
  Dialog,
  MobileStepper,
  Stepper,
  Slide,
  useMediaQuery,
  useTheme,
  MobileStepperProps,
  StepperProps,
  DialogProps
} from '@mui/material'
import {Theme} from '@lib/material-theme'

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
  const style = {
    mobileStepper: {
      width: '100%',
      backgroundColor: 'transparent',
      padding: 0
    }
  }
  return (
    <MobileStepper
      position="static"
      sx={{
        ...style.mobileStepper
      }}
      {...rest}
    />
  )
}

type EligibilityStepperProps = {children: React.ReactNode} & StepperProps

const EligibilityStepper = ({children, ...rest}: EligibilityStepperProps) => {
  const theme = useTheme<Theme>()
  const style = {
    stepper: {
      backgroundColor: 'transparent',
      [theme.breakpoints.down('sm')]: {
        padding: 0
      },
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(2) // defaults to 24px
      }
    }
  }
  return (
    <Box width={{xs: '95%', sm: '90%'}}>
      <Stepper
        orientation="vertical"
        sx={{
          ...style.stepper
        }}
        {...rest}
      >
        {children}
      </Stepper>
    </Box>
  )
}

export {EligibilityDialog, EligibilityMobileStepper, EligibilityStepper}
