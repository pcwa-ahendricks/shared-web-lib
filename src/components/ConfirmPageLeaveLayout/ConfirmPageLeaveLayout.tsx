import React, {useState, useEffect, useCallback} from 'react'
import ConfirmPageLeaveDialog from '@components/ConfirmPageLeaveDialog/ConfirmPageLeaveDialog'
import {useRouter} from 'next/router'

type Props = {
  shouldConfirmRouteChange?: boolean
  onDialogLeave: () => void
  onDialogCancel: () => void
  children: React.ReactNode
}

const ConfirmPageLeaveLayout = ({
  shouldConfirmRouteChange = false,
  children,
  onDialogCancel,
  onDialogLeave
}: Props) => {
  const router = useRouter()
  const [confirmPgLeaveDialogOpen, setConfirmPgLeaveDialogOpen] =
    useState<boolean>(false)
  const [lastRouteChange, setLastRouteChange] = useState<string>('')

  const handleRouteChange = useCallback(
    (route: string) => {
      console.log('routeChangeStart: ', route)
      setLastRouteChange(route)
      if (shouldConfirmRouteChange) {
        setConfirmPgLeaveDialogOpen(true)
        throw "Can't change route while form is active"
      }
    },
    [shouldConfirmRouteChange]
  )

  const confirmPgLeaveDialogLeaveHandler = useCallback(() => {
    setConfirmPgLeaveDialogOpen(false)
    onDialogLeave && onDialogLeave()
  }, [onDialogLeave])

  // Need to wait for shouldConfirmRouteChange to change before attempting to change route, hence this useEffect hook. This will effectively fire after handleRouteChange() fires FOLLOWED by shouldConfirmRouteChange becoming "false"
  useEffect(() => {
    if (lastRouteChange && shouldConfirmRouteChange === false) {
      router.push(lastRouteChange)
    }
  }, [shouldConfirmRouteChange, router, lastRouteChange])

  const confirmPgLeaveDialogCancelHandler = useCallback(() => {
    // Clearing out lastRouteChange is necessary to prevent an immediate route change when shouldConfirmRouteChange become false later and lastRouteChange is still set. This could happen when form becomes clean (not dirty).
    setLastRouteChange('')
    setConfirmPgLeaveDialogOpen(false)
    onDialogCancel && onDialogCancel()
  }, [onDialogCancel])

  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChange)
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router, handleRouteChange])

  return (
    <>
      {children}
      <ConfirmPageLeaveDialog
        open={confirmPgLeaveDialogOpen}
        onCancel={confirmPgLeaveDialogCancelHandler}
        onLeave={confirmPgLeaveDialogLeaveHandler}
      />
    </>
  )
}

export default ConfirmPageLeaveLayout
