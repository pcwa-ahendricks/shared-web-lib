import React, {useMemo} from 'react'
import {Box, Theme, createStyles, makeStyles, useTheme} from '@material-ui/core'
import {BoxProps} from '@material-ui/core/Box'
import clsx from 'clsx'
import {
  Breakpoint,
  BreakpointValues
} from '@material-ui/core/styles/createBreakpoints'

type EnhancedFlexProp =
  | BoxProps['flex']
  | boolean
  | 'grow'
  | 'nogrow'
  | 'noshrink'

type Props = {
  flexSpacing?: number
  wrapSpacing?: number
  children?: React.ReactNode
  child?: boolean
  flex?: EnhancedFlexProp
} & Omit<BoxProps, 'flex'>

type RowBoxUseStylesProps = {
  flexSpacing?: number
  wrapSpacing?: number
  respBreakAt: Breakpoint
  respElseAt: Breakpoint
}
type ColBoxUseStylesProps = {flexSpacing?: number}
export type RowBoxProps = Props & {responsive?: boolean | Breakpoint}
export type ChildBoxProps = {
  children?: React.ReactNode
  flex?: EnhancedFlexProp
} & BoxProps
export type {Props as FlexBoxProps}
export type {Props as ColumnBoxProps}

/*
  Note, using a dynamic className such as useFlexSpacing did not work when applying specificity with a selector such as '&$useFlexSpacing'. Note sure why, but the workaround is to simply apply the className as a string.

  [TODO] Using flexSpacing with <RowBox responsive/> is very opinionated with it's current setup. It assumes the same top and left margin will be used with Flex Column and Flex Row layouts respectively. In addition, generally, using flexWrap with <RowBox responsive/> will be avoided due to use of top margin's with <ChildBox/>. The workaround in both cases is to simply not use <RowBox responsive/> and use
   <RowBox flexDirection={{xs: 'column', sm: 'row'}} /> with custom top margins passed in as props while using the flexSpacing prop to control left margins.
*/

/*
  See links for more info:
  https://www.w3schools.com/cssref/css3_pr_flex.asp
  Useful terminology/abbreviations from https://github.com/angular/flex-layout/wiki/fxFlex-API
  alias 	    Equivalent CSS:
  initial 	  flex: 0 1 auto
  auto 	      flex: <grow> <shrink> 100%
  none 	      flex: 0 0 auto
  grow 	      flex: 1 1 100%
  nogrow 	    flex: 0 1 auto
  noshrink 	  flex: 1 0 auto
*/

const useEnhancedFlexProp = (flexProp: EnhancedFlexProp): BoxProps['flex'] => {
  const flex = useMemo(() => {
    switch (flexProp) {
      case true:
        return 'auto' // Or '1 1 auto'
      case false:
        return '0 0 auto' // Or 'none'
      case 'grow':
        return '1 1 100%'
      case 'nogrow':
        return '0 1 auto' // Or 'initial'
      case 'noshrink':
        return '1 0 auto'
      default:
        return flexProp
    }
  }, [flexProp])

  return flex
}

const useRowBoxStyles = makeStyles((theme: Theme) =>
  createStyles({
    respRowBox: ({
      flexSpacing,
      wrapSpacing,
      respBreakAt,
      respElseAt
    }: RowBoxUseStylesProps) => ({
      [theme.breakpoints.down(respBreakAt)]: {
        ...(typeof flexSpacing === 'number' && {
          marginTop: theme.spacing(flexSpacing) * -1,
          '& > .flexBox__child': {
            marginTop: theme.spacing(flexSpacing)
            // This bit is redundant with Column layout
            // ...(flexWrap && {
            //   marginTop: theme.spacing(flexSpacing)
            // })
          }
        })
      },
      [theme.breakpoints.up(respElseAt)]: {
        ...(typeof flexSpacing === 'number' && {
          marginLeft: theme.spacing(flexSpacing) * -1
        }),
        ...(typeof wrapSpacing === 'number' && {
          marginTop: theme.spacing(wrapSpacing * -1)
        }),
        '& > .flexBox__child': {
          ...(typeof flexSpacing === 'number' && {
            marginLeft: theme.spacing(flexSpacing)
          }),
          ...(typeof wrapSpacing === 'number' && {
            marginTop: theme.spacing(wrapSpacing)
          })
        }
      }
    }),
    rowBox: ({flexSpacing, wrapSpacing}: RowBoxUseStylesProps) => ({
      ...(typeof flexSpacing === 'number' && {
        marginLeft: theme.spacing(flexSpacing) * -1
      }),
      ...(typeof wrapSpacing === 'number' && {
        marginTop: theme.spacing(wrapSpacing * -1)
      }),
      '& > .flexBox__child': {
        ...(typeof flexSpacing === 'number' && {
          marginLeft: theme.spacing(flexSpacing)
        }),
        ...(typeof wrapSpacing === 'number' && {
          marginTop: theme.spacing(wrapSpacing)
        })
      }
    })
  })
)

const useColBoxStyles = makeStyles((theme: Theme) =>
  createStyles({
    colBox: ({flexSpacing}: ColBoxUseStylesProps) => ({
      ...(typeof flexSpacing === 'number' && {
        marginTop: theme.spacing(flexSpacing) * -1,
        '& > .flexBox__child': {
          marginTop: theme.spacing(flexSpacing)
        }
      })
    })
  })
)

const EnhancedBox = ({children, flex: flexProp, ...rest}: Props) => {
  const flex = useEnhancedFlexProp(flexProp)
  return (
    <Box flex={flex} {...rest}>
      {children}
    </Box>
  )
}

const FlexBox = ({
  children,
  child = false,
  className: classNameProp,
  ...rest
}: Props) => {
  return (
    <EnhancedBox
      display="flex"
      className={clsx([{['flexBox__child']: child}, classNameProp])}
      {...rest}
    >
      {children}
    </EnhancedBox>
  )
}

const RowBox = ({
  children,
  flexSpacing,
  className: classNameProp,
  responsive = false,
  flexWrap,
  wrapSpacing: wrapSpacingProp,
  ...rest
}: RowBoxProps) => {
  const respBreakAt = useMemo(
    () => (!responsive || responsive === true ? 'xs' : responsive),
    [responsive]
  )
  const theme = useTheme()
  const breakpoints = useMemo(
    () =>
      // For typescript reference see https://fettblog.eu/typescript-better-object-keys
      Object.keys(theme.breakpoints.values)
        .map((k) => ({
          key: k as keyof BreakpointValues,
          value: theme.breakpoints.values[k as keyof BreakpointValues]
        }))
        .sort((a, b) => a.value - b.value),
    [theme]
  )
  const respElseAt = useMemo(() => {
    const idx = breakpoints.findIndex((a) => a.key === respBreakAt)
    return breakpoints[idx + 1].key
  }, [breakpoints, respBreakAt])

  const isFlexWrap = flexWrap === 'wrap'
  const wrapSpacing = !isFlexWrap
    ? undefined
    : typeof wrapSpacingProp === 'number'
    ? wrapSpacingProp
    : flexSpacing
  const classes = useRowBoxStyles({
    flexSpacing,
    respBreakAt,
    respElseAt,
    wrapSpacing
  })

  const flexDirection = useMemo(() => {
    switch (responsive) {
      case false:
        return 'row'
      case true:
      case 'xs':
        return {xs: 'column', sm: 'row'}
      case 'sm':
        return {xs: 'column', md: 'row'}
      case 'md':
        return {xs: 'column', lg: 'row'}
      case 'lg':
        return {xs: 'column', xl: 'row'}
      default:
        return 'row'
    }
  }, [responsive])

  return (
    <FlexBox
      flexDirection={flexDirection}
      className={clsx([
        {
          [classes.respRowBox]: responsive,
          [classes.rowBox]: !responsive
        },
        classNameProp
      ])}
      flexWrap={flexWrap}
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
  const classes = useColBoxStyles({flexSpacing})
  return (
    <FlexBox
      flexDirection="column"
      className={clsx([classes.colBox, classNameProp])}
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
    <EnhancedBox className={clsx(['flexBox__child', classNameProp])} {...rest}>
      {children}
    </EnhancedBox>
  )
}

export {RowBox, ColumnBox, ChildBox, FlexBox}
export default FlexBox
