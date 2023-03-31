import React from 'react'
import {Button} from '@mui/material'
import {ButtonProps} from '@mui/material/Button'
import {saveAs} from 'file-saver'

type Props = {
  children?: React.ReactNode
  data?: string
  fileName?: string
  onClick?: (evt: any) => void
  onError?: (error: any) => void
} & ButtonProps

const DlSalaryScheduleCsvButton = ({
  data = '',
  children,
  onClick,
  onError,
  fileName = 'salary-schedule.csv',
  ...rest
}: Props) => {
  const clickHandler = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onClick && onClick(event)
    try {
      !!new Blob()
      // Dynamic import stopped working
      // try {
      // const {saveAs} = await import('file-saver')
      const csvBlob = new Blob([data], {type: 'text/csv;charset=utf-8;'})
      saveAs(csvBlob, fileName)
      // } catch (e) {
      // onError && onError(new Error('Error dynamically importing libraries.'))
      // }
    } catch (e) {
      onError &&
        onError(new Error('File saving not supported by this web browser.'))
    }
  }

  return (
    <Button {...rest} onClick={clickHandler} disabled={data.length <= 0}>
      {children}
    </Button>
  )
}

export default DlSalaryScheduleCsvButton
