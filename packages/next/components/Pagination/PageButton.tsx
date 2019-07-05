import React, {useCallback, useMemo} from 'react'
import {PropTypes, StandardProps, Theme} from '@material-ui/core'
import Button, {ButtonProps} from '@material-ui/core/Button'
import {createStyles, makeStyles} from '@material-ui/styles'
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

const useStyles = makeStyles((theme: Theme) =>
  // createStyles<PageButtonClassKey>({
  createStyles({
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
)

export type PageVariant = 'current' | 'ellipsis' | 'end' | 'standard'

export type PageButtonProps = {
  limit?: number
  page?: number
  total?: number
  pageVariant: PageVariant
  currentPageColor?: PropTypes.Color
  onClick?: (
    ev: React.MouseEvent<HTMLElement>,
    offset: number,
    page: number
  ) => void
  otherPageColor?: PropTypes.Color
} & StandardProps<ButtonProps, PageButtonClassKey, 'onClick'>

// const PageButton: React.FunctionComponent<
//   PageButtonProps & WithStyles<PageButtonClassKey>
// > = (props) => {
const PageButton = ({
  limit = 1,
  page = 0,
  total = 0,
  pageVariant = 'standard',
  currentPageColor,
  disabled = false,
  disableRipple = false,
  onClick: onClickProp,
  otherPageColor,
  size,
  ...other
}: PageButtonProps) => {
  const classes = useStyles()

  const isCurrent = useMemo(() => pageVariant === 'current', [pageVariant])
  const isEllipsis = useMemo(() => pageVariant === 'ellipsis', [pageVariant])
  const isEnd = useMemo(() => pageVariant === 'end', [pageVariant])
  const isStandard = useMemo(() => pageVariant === 'standard', [pageVariant])

  const isSmall = useMemo(() => size === 'small', [size])
  const isLarge = useMemo(() => size === 'large', [size])

  classes.root = clsx(classes.root, {
    [classes.rootCurrent]: isCurrent,
    [classes.rootEllipsis]: isEllipsis,
    [classes.rootEnd]: isEnd,
    [classes.rootStandard]: isStandard
  })

  classes.colorInherit = clsx(classes.colorInherit, {
    [classes.colorInheritCurrent]: isCurrent,
    [classes.colorInheritOther]: !isCurrent
  })

  classes.sizeSmall = clsx(classes.sizeSmall, {
    [classes.sizeSmallCurrent]: isCurrent && isSmall,
    [classes.sizeSmallEllipsis]: isEllipsis && isSmall,
    [classes.sizeSmallEnd]: isEnd && isSmall,
    [classes.sizeSmallStandard]: isStandard && isSmall
  })

  classes.sizeLarge = clsx(classes.sizeLarge, {
    [classes.sizeLargeCurrent]: isCurrent && isLarge,
    [classes.sizeLargeEllipsis]: isEllipsis && isLarge,
    [classes.sizeLargeEnd]: isEnd && isLarge,
    [classes.sizeLargeStandard]: isStandard && isLarge
  })

  const getOffset = useCallback((page: number, limit: number): number => {
    const offset = (page - 1) * limit
    return offset < 0 ? 0 : offset
  }, [])

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

  const color = isCurrent ? currentPageColor : otherPageColor
  const buttonDisabled = disabled || isEllipsis || page <= 0 || total <= 0
  const buttonDisableRipple = disableRipple || disabled || isCurrent
  let onClick: ((ev: React.MouseEvent<HTMLElement>) => void) | undefined
  if (onClickProp && !disabled && (isEnd || isStandard)) {
    onClick = handleClick(page, limit, onClickProp)
  }

  return (
    <Button
      classes={classes}
      color={color}
      disabled={buttonDisabled}
      disableRipple={buttonDisableRipple}
      onClick={onClick}
      size={size}
      {...other}
    />
  )
}

export default PageButton
