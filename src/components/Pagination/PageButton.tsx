import React, {useMemo, useCallback} from 'react'
import {
  Button,
  ButtonProps,
  PropTypes,
  StandardProps,
  Theme,
  createStyles,
  WithStyles,
  withStyles
} from '@material-ui/core'
import clsx from 'clsx'

export type PageButtonClassKey =
  | 'root'
  | 'rootCurrent'
  | 'rootEllipsis'
  | 'rootEnd'
  | 'rootStandard'
  | 'label'
  | 'text'
  | 'textPrimary'
  | 'textSecondary'
  | 'colorInherit'
  | 'colorInheritCurrent'
  | 'colorInheritOther'
  | 'disabled'
  | 'sizeSmall'
  | 'sizeSmallCurrent'
  | 'sizeSmallEllipsis'
  | 'sizeSmallEnd'
  | 'sizeSmallStandard'
  | 'sizeLarge'
  | 'sizeLargeCurrent'
  | 'sizeLargeEllipsis'
  | 'sizeLargeEnd'
  | 'sizeLargeStandard'
  | 'fullWidth'

const styles = (theme: Theme) =>
  createStyles<PageButtonClassKey, any>({
    root: {
      minWidth: 16
    },
    rootCurrent: {
      paddingLeft: theme.spacing(1.5),
      paddingRight: theme.spacing(1.5)
    },
    rootEllipsis: {
      paddingLeft: theme.spacing(0.5),
      paddingRight: theme.spacing(0.5)
    },
    rootEnd: {
      paddingLeft: theme.spacing(1.5),
      paddingRight: theme.spacing(1.5)
    },
    rootStandard: {
      paddingLeft: theme.spacing(1.5),
      paddingRight: theme.spacing(1.5)
    },
    label: {},
    text: {},
    textPrimary: {},
    textSecondary: {},
    colorInherit: {},
    colorInheritCurrent: {},
    colorInheritOther: {},
    disabled: {},
    sizeSmall: {
      minWidth: 8
    },
    sizeSmallCurrent: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    },
    sizeSmallEllipsis: {
      paddingLeft: theme.spacing(0.25),
      paddingRight: theme.spacing(0.25)
    },
    sizeSmallEnd: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    },
    sizeSmallStandard: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    },
    sizeLarge: {
      minWidth: 24
    },
    sizeLargeCurrent: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    },
    sizeLargeEllipsis: {
      paddingLeft: theme.spacing(0.75),
      paddingRight: theme.spacing(0.75)
    },
    sizeLargeEnd: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    },
    sizeLargeStandard: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    },
    fullWidth: {}
  })

export type PageVariant = 'current' | 'ellipsis' | 'end' | 'standard'

export type PageButtonProps = {
  limit: number
  page: number
  total: number
  pageVariant: PageVariant
  currentPageColor?: PropTypes.Color
  onClick?: (
    ev: React.MouseEvent<HTMLElement>,
    offset: number,
    page: number
  ) => void
  otherPageColor?: PropTypes.Color
} & StandardProps<ButtonProps, PageButtonClassKey, 'onClick'>

const PageButton: React.FunctionComponent<
  PageButtonProps & WithStyles<PageButtonClassKey>
> = (props) => {
  const {
    limit = 1,
    page = 0,
    total = 0,
    pageVariant = 'standard',
    classes: classesProp,
    currentPageColor,
    disabled: disabledProp = false,
    disableRipple: disableRippleProp = false,
    onClick: onClickProp,
    otherPageColor,
    size,
    ...other
  } = props

  const isCurrent = useMemo(() => pageVariant === 'current', [pageVariant])

  const isEllipsis = useMemo(() => pageVariant === 'ellipsis', [pageVariant])
  const isEnd = useMemo(() => pageVariant === 'end', [pageVariant])
  const isStandard = useMemo(() => pageVariant === 'standard', [pageVariant])

  const isSmall = useMemo(() => size === 'small', [size])
  const isLarge = useMemo(() => size === 'large', [size])

  const {
    rootCurrent,
    rootEllipsis,
    rootEnd,
    rootStandard,
    colorInheritCurrent,
    colorInheritOther,
    sizeSmallCurrent,
    sizeSmallEllipsis,
    sizeSmallEnd,
    sizeSmallStandard,
    sizeLargeCurrent,
    sizeLargeEllipsis,
    sizeLargeEnd,
    sizeLargeStandard,
    ...classes
  } = classesProp

  classes.root = clsx(classes.root, {
    [rootCurrent]: isCurrent,
    [rootEllipsis]: isEllipsis,
    [rootEnd]: isEnd,
    [rootStandard]: isStandard
  })
  classes.colorInherit = clsx(classes.colorInherit, {
    [colorInheritCurrent]: isCurrent,
    [colorInheritOther]: !isCurrent
  })
  classes.sizeSmall = clsx(classes.sizeSmall, {
    [sizeSmallCurrent]: isCurrent && isSmall,
    [sizeSmallEllipsis]: isEllipsis && isSmall,
    [sizeSmallEnd]: isEnd && isSmall,
    [sizeSmallStandard]: isStandard && isSmall
  })
  classes.sizeLarge = clsx(classes.sizeLarge, {
    [sizeLargeCurrent]: isCurrent && isLarge,
    [sizeLargeEllipsis]: isEllipsis && isLarge,
    [sizeLargeEnd]: isEnd && isLarge,
    [sizeLargeStandard]: isStandard && isLarge
  })

  const getOffset = useCallback((page: number, limit: number): number => {
    const offset = (page - 1) * limit
    return offset < 0 ? 0 : offset
  }, [])

  const color = useMemo(() => (isCurrent ? currentPageColor : otherPageColor), [
    isCurrent,
    currentPageColor,
    otherPageColor
  ])

  const disabled = useMemo(
    () => disabledProp || isEllipsis || page <= 0 || total <= 0,
    [disabledProp, isEllipsis, page, total]
  )

  const disableRipple = useMemo(
    () => disableRippleProp || disabled || isCurrent,
    [disableRippleProp, disabled, isCurrent]
  )

  const handleClick = useCallback(
    (
      page: number,
      limit: number,
      onClick: (
        ev: React.MouseEvent<HTMLElement>,
        offset: number,
        page: number
      ) => void
    ) => (ev: React.MouseEvent<HTMLElement>): void => {
      onClick(ev, getOffset(page, limit), page)
    },
    [getOffset]
  )

  const onClick:
    | ((ev: React.MouseEvent<HTMLElement>) => void)
    | undefined = useMemo(
    () =>
      onClickProp && !disabled && (isEnd || isStandard)
        ? handleClick(page, limit, onClickProp)
        : undefined,
    [handleClick, disabled, isEnd, isStandard, onClickProp, page, limit]
  )

  return (
    <Button
      classes={classes}
      color={color}
      disabled={disabled}
      disableRipple={disableRipple}
      onClick={onClick}
      size={size}
      {...other}
    />
  )
}

const PageButtonWithStyles: React.ComponentType<PageButtonProps> = withStyles(
  styles,
  {
    name: 'MuiFlatPageButton'
  }
)(PageButton)

export default PageButtonWithStyles
