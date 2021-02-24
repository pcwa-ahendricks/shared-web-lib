// cspell:ignore unparse
import React from 'react'
import Button, {ButtonProps} from '@material-ui/core/Button'
import {unparse} from 'papaparse'
import {saveAs} from 'file-saver'

type Props = {
  data?: any[]
  header?: string
  footer?: string
  fileName?: string
  onError?: (error: any) => void
} & Partial<ButtonProps>

const DlCsvButton = ({
  data = [],
  children,
  onClick,
  onError,
  fileName = 'my_file.csv',
  header = '',
  footer = '',
  ...rest
}: Props) => {
  const clickHandler = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onClick?.(event)
    try {
      !!new Blob()
      try {
        // [TODO] Dynamic importing stopped working with Typescript 3.7 update. "Property 'unparse' does not exist on type..." Error was only visible during Now deploy.
        // const [{unparse}, {saveAs}] = await Promise.all([
        //   import('papaparse'),
        //   import('file-saver')
        // ])
        const parsed = unparse(data)
        const csvBlob = new Blob(
          [header, header ? '\n' : '', parsed, footer ? '\n' : '', footer],
          {
            type: 'text/csv;charset=utf-8;'
          }
        )
        saveAs(csvBlob, fileName)
      } catch (e) {
        onError?.(new Error('Error dynamically importing libraries.'))
      }
    } catch (e) {
      onError?.(new Error('File saving not supported by this web browser.'))
    }
  }

  return (
    <Button onClick={clickHandler} disabled={data.length <= 0} {...rest}>
      {children}
    </Button>
  )
}

export default DlCsvButton
