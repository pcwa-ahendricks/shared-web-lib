import React from 'react'
import {Box, Theme, createStyles, makeStyles} from '@material-ui/core'
import {BoxProps} from '@material-ui/core/Box'
import clsx from 'clsx'

type Props = {flexSpacing?: number; children?: React.ReactNode} & BoxProps
type UseStylesProps = {flexSpacing?: number}

/*
  Note, using a dynamic className such as useFlexSpacing did not work when applying specificity with a selector such as '&$useFlexSpacing'. Note sure why, but the workaround is to simply apply the className as a string.

  [TODO] Using flexSpacing with <RespRowBox/> is very opinionated with it's current setup. It assumes the same top and left margin will be used with Flex Column and Flex Row layouts respectively. In addition, generally, using flexWrap with <RespRowBox/> will be avoided due to use of top margin's with <ChildBox/>. The workaround in both cases is to simply not use <RespRowBox/> and use
   <RowBox flexDirection={{xs: 'column', sm: 'row'}} /> with custom top margins passed in as props while using the flexSpacing prop to control left margins.
*/

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    respRowBox: ({flexSpacing}: UseStylesProps) => ({
      [theme.breakpoints.only('xs')]: {
        '&.useFlexSpacing': {
          marginTop: theme.spacing(flexSpacing ?? 0) * -1,
          '& > .childBox': {
            marginTop: theme.spacing(flexSpacing ?? 0)
          }
        }
      },
      [theme.breakpoints.up('sm')]: {
        '&.useFlexSpacing': {
          marginLeft: theme.spacing(flexSpacing ?? 0) * -1,
          '& > .childBox': {
            marginLeft: theme.spacing(flexSpacing ?? 0)
          }
        }
      }
    }),
    rowBox: ({flexSpacing}: UseStylesProps) => ({
      '&.useFlexSpacing': {
        marginLeft: theme.spacing(flexSpacing ?? 0) * -1,
        '& > .childBox': {
          marginLeft: theme.spacing(flexSpacing ?? 0)
        }
      }
    }),
    colBox: ({flexSpacing}: UseStylesProps) => ({
      '&.useFlexSpacing': {
        marginTop: theme.spacing(flexSpacing ?? 0) * -1,
        '& > .childBox': {
          marginTop: theme.spacing(flexSpacing ?? 0)
        }
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

const FlexBox = ({
  children,
  flexSpacing,
  className: classNameProp,
  ...rest
}: Props) => {
  return (
    <Box
      display="flex"
      className={clsx([
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

const RowBox = ({
  children,
  flexSpacing,
  className: classNameProp,
  ...rest
}: Props) => {
  const classes = useStyles({flexSpacing})
  return (
    <FlexBox
      flexDirection="row"
      className={clsx([classes.rowBox, classNameProp])}
      flexSpacing={flexSpacing}
      {...rest}
    >
      {children}
    </FlexBox>
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
    <FlexBox
      flexDirection="column"
      className={clsx([classes.colBox, classNameProp])}
      flexSpacing={flexSpacing}
      {...rest}
    >
      {children}
    </FlexBox>
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
    <FlexBox
      flexDirection={{xs: 'column', sm: 'row'}}
      className={clsx([classes.respRowBox, classNameProp])}
      flexSpacing={flexSpacing}
      {...rest}
    >
      {children}
    </FlexBox>
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

export {RowBox, RespRowBox, ColumnBox, ChildBox, FlexBox}
export default FlexBox
