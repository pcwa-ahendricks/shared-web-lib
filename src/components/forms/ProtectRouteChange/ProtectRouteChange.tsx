import React, {useEffect, useState} from 'react'
import {useFormikContext} from 'formik'
import ConfirmPageLeaveLayout from '@components/ConfirmPageLeaveLayout/ConfirmPageLeaveLayout'

type Props = {
  children: React.ReactNode
}

const ProtectRouteChange = ({children}: Props) => {
  const {dirty} = useFormikContext<any>()
  const [shouldConfirmRouteChange, setShouldConfirmRouteChange] = useState<
    boolean
  >(false)

  useEffect(() => {
    setShouldConfirmRouteChange(Boolean(dirty))
  }, [dirty])

  return (
    <ConfirmPageLeaveLayout
      onDialogCancel={() => setShouldConfirmRouteChange(true)}
      onDialogLeave={() => setShouldConfirmRouteChange(false)}
      shouldConfirmRouteChange={shouldConfirmRouteChange}
    >
      {children}
    </ConfirmPageLeaveLayout>
  )
}

export default ProtectRouteChange
