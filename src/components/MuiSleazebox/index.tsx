import React, {useMemo} from 'react'
import {Box, useTheme, BoxProps, Breakpoint, Breakpoints} from '@mui/material'
import clsx from 'clsx'

type EnhancedFlexProp =
  | BoxProps['flex']
  | boolean
  | 'grow'
  | 'nogrow'
  | 'noshrink'

type Props = {
  flexSpacing?: number
  wrapSpacing?: number
  child?: boolean
  flex?: EnhancedFlexProp
} & Omit<BoxProps, 'flex'>

type BreakpointValues = Breakpoints['values']

export type RowBoxProps = Props & {
  responsive?: boolean | Breakpoint
  halfRespSpacing?: boolean
}
export type ChildBoxProps = {
  flex?: EnhancedFlexProp
} & Omit<BoxProps, 'flex'>
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

const EnhancedBox = ({children, flex: flexProp, sx, ...rest}: Props) => {
  const flex = useEnhancedFlexProp(flexProp)
  return (
    <Box sx={{flex, ...sx}} {...rest}>
      {children}
    </Box>
  )
}

const FlexBox = ({
  children,
  child = false,
  className: classNameProp,
  sx,
  ...rest
}: Props) => {
  return (
    <EnhancedBox
      sx={{display: 'flex', ...sx}}
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
  halfRespSpacing = true,
  responsive = false,
  flexWrap,
  flexDirection: flexDirectionProp, // swallow prop
  wrapSpacing: wrapSpacingProp,
  sx,
  className: classNameProp,
  ...rest
}: RowBoxProps) => {
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
  const respBreakAt: Breakpoint = useMemo(() => {
    const useBreakPoint = !responsive || responsive === true ? 'xs' : responsive

    const idx = breakpoints.findIndex((a) => a.key === useBreakPoint)
    return breakpoints[idx + 1].key as Breakpoint
  }, [responsive, breakpoints])

  const isFlexWrap = flexWrap === 'wrap'
  const wrapSpacing = !isFlexWrap
    ? undefined
    : typeof wrapSpacingProp === 'number'
      ? wrapSpacingProp
      : flexSpacing

  return (
    <FlexBox
      sx={{
        flexWrap,
        ...(responsive && {
          [theme.breakpoints.down(respBreakAt)]: {
            flexDirection: 'column',
            flexWrap,
            ...(typeof flexSpacing === 'number' && {
              marginTop: theme.spacing(
                flexSpacing * -1 * (halfRespSpacing ? 0.5 : 1)
              ),
              '& > .flexBox__child': {
                marginTop: theme.spacing(
                  flexSpacing * (halfRespSpacing ? 0.5 : 1)
                )
                // This bit is redundant with Column layout
                // ...(flexWrap && {
                //   marginTop: theme.spacing(flexSpacing)
                // })
              }
            })
          },
          [theme.breakpoints.up(respBreakAt)]: {
            // see note above regarding flexDirection and media query
            flexDirection: flexDirectionProp || 'row',
            flexWrap,
            ...(typeof flexSpacing === 'number' && {
              marginLeft: theme.spacing(flexSpacing * -1)
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
        ...(!responsive && {
          flexDirection: flexDirectionProp || 'row',
          ...(typeof flexSpacing === 'number' && {
            marginLeft: theme.spacing(flexSpacing * -1)
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
        }),
        ...sx
      }}
      {...rest}
    >
      {children}
    </FlexBox>
  )
}

const ColumnBox = ({
  children,
  flexSpacing,
  flexDirection: flexDirectionProp, // swallow prop
  sx,
  ...rest
}: Props) => {
  const theme = useTheme()
  return (
    <FlexBox
      sx={{
        flexDirection: 'column',
        ...(typeof flexSpacing === 'number' && {
          marginTop: theme.spacing(flexSpacing * -1),
          '& > .flexBox__child': {
            marginTop: theme.spacing(flexSpacing)
          }
        }),
        ...sx
      }}
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
