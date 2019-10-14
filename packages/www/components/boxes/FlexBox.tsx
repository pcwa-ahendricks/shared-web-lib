import React from 'react'
import {Box, Theme} from '@material-ui/core'
import {createStyles, makeStyles} from '@material-ui/core/styles'
import {BoxProps} from '@material-ui/core/Box'
import clsx from 'clsx'

type Props = {flexSpacing?: number; children?: React.ReactNode} & BoxProps
type UseStylesProps = {flexSpacing?: number}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    respRowBox: ({flexSpacing}: UseStylesProps) => ({
      [theme.breakpoints.only('xs')]: {
        '&.useFlexSpacing': {
          marginTop: theme.spacing(flexSpacing || 0) * -1
        },
        '& > .childBox': {
          marginTop: theme.spacing(flexSpacing || 0)
        }
      },
      [theme.breakpoints.up('sm')]: {
        '&.useFlexSpacing': {
          marginLeft: theme.spacing(flexSpacing || 0) * -1
        },
        '& > .childBox': {
          marginLeft: theme.spacing(flexSpacing || 0)
        }
      }
    }),
    rowBox: ({flexSpacing}: UseStylesProps) => ({
      '&.useFlexSpacing': {
        marginLeft: theme.spacing(flexSpacing || 0) * -1
      },
      '& > .childBox': {
        marginLeft: theme.spacing(flexSpacing || 0)
      }
    }),
    colBox: ({flexSpacing}: UseStylesProps) => ({
      '&..seFlexSpacing': {
        marginTop: theme.spacing(flexSpacing || 0) * -1
      },
      '& > .childBox': {
        marginTop: theme.spacing(flexSpacing || 0)
      }
    })
  })
)

export type ChildBoxProps = {
  children?: React.ReactNode
} & BoxProps

/*
  Useful terminology/abbreviations from https://github.com/angular/flex-layout/wiki/fxFlex-API
  alias 	    Equivalent CSS
  grow 	      flex: 1 1 100%
  initial 	  flex: 0 1 auto
  auto 	      flex: <grow> <shrink> 100%
  none 	      flex: 0 0 auto
  nogrow 	    flex: 0 1 auto
  noshrink 	  flex: 1 0 auto
*/

const RowBox = ({
  children,
  flexSpacing,
  className: classNameProp,
  ...rest
}: Props) => {
  const classes = useStyles({flexSpacing})
  return (
    <Box
      display="flex"
      flexDirection="row"
      className={clsx([
        classes.rowBox,
        classNameProp,
        {
          ['useFlexSpacing']: flexSpacing
        }
      ])}
      {...rest}
    >
      {children}
    </Box>
  )
}

const ColumnBox = ({
  children,
  flexSpacing,
  className: classNameProp,
  ...rest
}: Props) => {
  const classes = useStyles({flexSpacing})
  return (
    <Box
      display="flex"
      flexDirection="column"
      className={clsx([
        classes.colBox,
        classNameProp,
        {['useFlexSpacing']: flexSpacing}
      ])}
      {...rest}
    >
      {children}
    </Box>
  )
}

const RespRowBox = ({
  children,
  flexSpacing,
  className: classNameProp,
  ...rest
}: Props) => {
  const classes = useStyles({flexSpacing})
  return (
    <Box
      display="flex"
      flexDirection={{xs: 'column', sm: 'row'}}
      className={clsx([
        classes.respRowBox,
        classNameProp,
        {['useFlexSpacing']: flexSpacing}
      ])}
      {...rest}
    >
      {children}
    </Box>
  )
}

const ChildBox = ({
  children,
  className: classNameProp,
  ...rest
}: ChildBoxProps) => {
  return (
    <Box className={clsx(['childBox', classNameProp])} {...rest}>
      {children}
    </Box>
  )
}

export {RowBox, RespRowBox, ColumnBox, ChildBox}
