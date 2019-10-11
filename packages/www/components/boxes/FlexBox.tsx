import React from 'react'
import {Box, Theme} from '@material-ui/core'
import {createStyles, makeStyles} from '@material-ui/styles'
import {BoxProps} from '@material-ui/core/Box'
import clsx from 'clsx'

type Props = {flexSpacing?: number; children?: React.ReactNode} & BoxProps
type UseStylesProps = {flexSpacing?: number}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    respRowBox: ({flexSpacing}: UseStylesProps) => ({
      [theme.breakpoints.only('xs')]: {
        '& > .useFlexSpacing:not(:first-child)': {
          marginTop: theme.spacing(flexSpacing || 0)
        }
      },
      [theme.breakpoints.up('sm')]: {
        '& > .useFlexSpacing:not(:first-child)': {
          marginLeft: theme.spacing(flexSpacing || 0)
        }
      }
    }),
    rowBox: ({flexSpacing}: UseStylesProps) => ({
      '&:not(.wrap) > .useFlexSpacing:not(:first-child)': {
        marginLeft: theme.spacing(flexSpacing || 0)
      },
      '&.wrap > .useFlexSpacing': {
        marginLeft: theme.spacing(flexSpacing || 0)
      }
    }),
    colBox: ({flexSpacing}: UseStylesProps) => ({
      '&:not(.wrap) > .useFlexSpacing:not(:first-child)': {
        marginTop: theme.spacing(flexSpacing || 0)
      },
      '&.wrap > .useFlexSpacing': {
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
  flexWrap: flexWrapProp,
  ...rest
}: Props) => {
  const classes = useStyles({flexSpacing})
  // Always apply spacing if flex-wrap is set to wrap, since first-child items will appear when wrapping items.
  return (
    <Box
      display="flex"
      flexDirection="row"
      className={clsx([
        {wrap: flexWrapProp === 'wrap' || flexWrapProp === 'wrap-reverse'},
        classes.rowBox,
        classNameProp
      ])}
      flexWrap={flexWrapProp}
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
  flexWrap: flexWrapProp,
  ...rest
}: Props) => {
  const classes = useStyles({flexSpacing})
  // Always apply spacing if flex-wrap is set to wrap, since first-child items will appear when wrapping items.
  return (
    <Box
      display="flex"
      flexDirection="column"
      className={clsx([
        {wrap: flexWrapProp === 'wrap' || flexWrapProp === 'wrap-reverse'},
        classes.colBox,
        classNameProp
      ])}
      flexWrap={flexWrapProp}
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
      className={clsx([classes.respRowBox, classNameProp])}
      {...rest}
    >
      {children}
    </Box>
  )
}

const ChildBox = ({
  children,
  className: classNameProp,
  m,
  mx,
  my,
  mr,
  ml,
  mt,
  mb,
  ...rest
}: ChildBoxProps) => {
  // Don't add 'useFlexSpacing' class if any type of margin was explicitly added so that the margin can be overridden.
  // The order in which the margin props are added matters! I believe this is the best order due to granularity.
  const hasMarginProp = Boolean(m || mx || my || mr || ml || mb || mt)
  return (
    <Box
      className={clsx([{['useFlexSpacing']: !hasMarginProp}, classNameProp])}
      m={m}
      mx={mx}
      my={my}
      mr={mr}
      ml={ml}
      mt={mt}
      mb={mb}
      {...rest}
    >
      {children}
    </Box>
  )
}

export {RowBox, RespRowBox, ColumnBox, ChildBox}
