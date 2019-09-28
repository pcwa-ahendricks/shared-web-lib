// cspell:ignore unparse
import React from 'react'
import Button, {ButtonProps} from '@material-ui/core/Button'

type Props = {
  children?: React.ReactNode
  data?: any[]
  header?: string
  footer?: string
  fileName?: string
  onClick?: (evt: any) => void
  onError?: (error: any) => void
} & ButtonProps

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
    onClick && onClick(event)
    try {
      !!new Blob()
      try {
        const [{unparse}, {saveAs}] = await Promise.all([
          import('papaparse'),
          import('file-saver')
        ])
        const parsed = unparse(data)
        const csvBlob = new Blob([header, parsed, footer], {
          type: 'text/csv;charset=utf-8;'
        })
        saveAs(csvBlob, fileName)
      } catch (e) {
        onError && onError(new Error('Error dynamically importing libraries.'))
      }
    } catch (e) {
      onError &&
        onError(new Error('File saving not supported by this web browser.'))
    }
  }

  return (
    <Button onClick={clickHandler} disabled={data.length <= 0} {...rest}>
      {children}
    </Button>
  )
}

export default DlCsvButton
