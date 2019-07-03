import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext
} from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
  // Slide
} from '@material-ui/core'
// import {TransitionProps} from '@material-ui/core/transitions'
import {UiContext} from '@components/ui/UiStore'

export type ErrorDialogError = {
  title?: string
  message?: string
  stack?: any
  MessageComponent?: any
}

type Props = {
  onClose?: (event: any) => void
  onExited?: (event: any) => void
}

// const Transition = React.forwardRef<unknown, TransitionProps>(
//   function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />
//   }
// )
// Transition.displayName = 'Transition'

const ErrorDialog = ({onClose, onExited}: Props) => {
  const [open, setOpen] = useState<boolean>(false)

  const uiContext = useContext(UiContext)
  const uiState = uiContext.state
  const {error} = uiState

  const prevErrorRef = useRef<ErrorDialogError | null>()

  const openHandler = useCallback(() => {
    setOpen(true)
  }, [])

  /**
   * To prevent the dialog from remaining open we need to use a previous error reference and check that
   * against the incoming error. Without this the close handler will do nothing. Using the dialogs onExited
   * vs onClose handlers have to effect on this behavior.
   */
  useEffect(() => {
    // Only open dialog if an error was passed down as props,
    // and only if the dialog is open,
    // and only if there is no previous error that is identical or if the previous error is actually different than the incoming error.
    if (
      (!prevErrorRef.current || prevErrorRef.current !== error) &&
      error &&
      !open
    ) {
      openHandler()
    }
    prevErrorRef.current = error
  }, [open, error, openHandler])

  const closeHandler = useCallback(
    (event: React.SyntheticEvent<any>) => {
      // The dismissError action is not dispatched here. Just setting "open" to "false" which will likely close the dialog. It would be good practice to dispatch dismissError action in onExited() handler for cleanup, though, not on onClose since the error dialog contents may change for a very brief period of time while the dialog closes (transitions out).
      setOpen(false)
      onClose && onClose(event)
    },
    [onClose]
  )

  const exitedHandler = useCallback(
    (event: any) => {
      onExited && onExited(event)
    },
    [onExited]
  )

  return (
    <Dialog
      aria-labelledby="error-dialog-title"
      aria-describedby="error-dialog-description"
      open={open}
      onClose={closeHandler}
      onExited={exitedHandler}
      // TransitionComponent={Transition}
    >
      <DialogTitle id="error-dialog-title">
        {error && error.title ? error.title : 'Something went wrong!'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          variant="subtitle1"
          id="error-dialog-description"
          paragraph
        >
          {error && error.MessageComponent ? error.MessageComponent : null}
        </DialogContentText>
        <DialogContentText variant="subtitle1" id="error-dialog-description">
          {error && error.message ? error.message : ''}
        </DialogContentText>
        <DialogContentText variant="body1" paragraph={true}>
          {error && error.stack ? JSON.stringify(error.stack, null, 2) : ''}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={closeHandler}>
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ErrorDialog
