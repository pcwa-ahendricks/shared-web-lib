import React, {useMemo, useCallback} from 'react'
import {PropTypes, StandardProps} from '@material-ui/core'
import Box, {BoxProps} from '@material-ui/core/Box'
import {createStyles, WithStyles, withStyles} from '@material-ui/styles'
import clsx from 'clsx'
import PageButton, {PageButtonClassKey, PageVariant} from './PageButton'

export type PaginationClassKey = PageButtonClassKey

export enum Position {
  Current,
  LowEllipsis,
  HighEllipsis,
  LowEnd,
  HighEnd,
  Standard
}

export interface PagePosition {
  page: number
  position: Position
}

const styles = createStyles<PaginationClassKey, {}>({
  root: {},
  rootCurrent: {},
  rootEllipsis: {},
  rootEnd: {},
  rootStandard: {},
  label: {},
  text: {},
  textPrimary: {},
  textSecondary: {},
  colorInherit: {},
  colorInheritCurrent: {},
  colorInheritOther: {},
  disabled: {},
  sizeSmall: {},
  sizeSmallCurrent: {},
  sizeSmallEllipsis: {},
  sizeSmallEnd: {},
  sizeSmallStandard: {},
  sizeLarge: {},
  sizeLargeCurrent: {},
  sizeLargeEllipsis: {},
  sizeLargeEnd: {},
  sizeLargeStandard: {},
  fullWidth: {}
})

export type PaginationProps = Omit<BoxProps, 'onClick'> &
  StandardProps<
    React.HTMLAttributes<HTMLDivElement>,
    PaginationClassKey,
    'onClick'
  > & {
    limit: number
    offset: number
    total: number
    centerRipple?: boolean
    component?: string | React.ComponentType<Partial<PaginationProps>>
    currentPageColor?: PropTypes.Color
    disabled?: boolean
    disableFocusRipple?: boolean
    disableRipple?: boolean
    fullWidth?: boolean
    innerButtonCount?: number
    nextPageLabel?: React.ReactNode
    onClick?: (
      ev: React.MouseEvent<HTMLElement>,
      offset: number,
      page: number
    ) => void
    otherPageColor?: PropTypes.Color
    outerButtonCount?: number
    previousPageLabel?: React.ReactNode
    reduced?: boolean
    size?: 'small' | 'medium' | 'large'
  }

const Pagination: React.FunctionComponent<
  PaginationProps & WithStyles<PaginationClassKey>
> = (props) => {
  const {
    limit = 1,
    offset = 0,
    total = 0,
    centerRipple = false,
    classes,
    className: classNameProp,
    currentPageColor = 'secondary',
    disabled = false,
    disableFocusRipple = false,
    disableRipple = false,
    fullWidth = false,
    nextPageLabel = '>',
    innerButtonCount: innerButtonCountProp = 2,
    onClick,
    otherPageColor = 'primary',
    outerButtonCount: outerButtonCountProp = 2,
    previousPageLabel = '<',
    reduced = false,
    size = 'medium',
    ...other
  } = props

  const {root, ...buttonClasses} = classes

  const className = clsx(root, classNameProp)

  const innerButtonCount = useMemo(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    () => (reduced ? 1 : innerButtonCountProp!),
    [innerButtonCountProp, reduced]
  )
  const outerButtonCount = useMemo(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    () => (reduced ? 1 : outerButtonCountProp!),
    [outerButtonCountProp, reduced]
  )

  const createPagePosition = useCallback(
    (position: Position, page: number = 0): PagePosition => {
      return {
        page,
        position
      }
    },
    []
  )

  const computePages = useCallback(
    (
      limitProp: number,
      offsetProp: number,
      totalProp: number,
      innerButtonCountProp: number,
      outerButtonCountProp: number
    ): PagePosition[] => {
      const limit = limitProp >= 1 ? limitProp : 1
      const offset = offsetProp >= 0 ? offsetProp : 0
      const total = totalProp >= 0 ? totalProp : 0
      const innerButtonCount =
        innerButtonCountProp >= 0 ? innerButtonCountProp : 0
      const outerButtonCount =
        outerButtonCountProp >= 1 ? outerButtonCountProp : 1

      const minPage = 1
      const maxPage = Math.floor(total / limit) + (total % limit === 0 ? 0 : 1)
      const currentPage = Math.floor(offset / limit) + 1
      const previousPage = currentPage <= minPage ? 0 : currentPage - 1
      const nextPage = currentPage >= maxPage ? 0 : currentPage + 1

      const pages: PagePosition[] = []

      // previous
      pages.push(createPagePosition(Position.LowEnd, previousPage))

      // low
      const lowInnerReservedButtonCount = Math.max(
        innerButtonCount + currentPage - maxPage,
        0
      )
      const lowInnerEllipsisPage =
        currentPage - innerButtonCount - lowInnerReservedButtonCount - 1
      const lowOuterEllipsisPage = minPage + outerButtonCount
      for (let i = minPage; i < currentPage; i++) {
        if (i < lowOuterEllipsisPage) {
          pages.push(createPagePosition(Position.Standard, i))
        } else {
          pages.push(
            i === lowOuterEllipsisPage && i < lowInnerEllipsisPage
              ? createPagePosition(Position.LowEllipsis)
              : createPagePosition(Position.Standard, i)
          )
          for (
            let j = Math.max(i, lowInnerEllipsisPage) + 1;
            j < currentPage;
            j++
          ) {
            pages.push(createPagePosition(Position.Standard, j))
          }
          break
        }
      }

      // current
      pages.push(createPagePosition(Position.Current, currentPage))

      // high
      const highInnerReservedButtonCount = Math.max(
        innerButtonCount - currentPage + minPage,
        0
      )
      const highInnerEllipsisPage =
        currentPage + innerButtonCount + highInnerReservedButtonCount + 1
      const highOuterEllipsisPage = maxPage - outerButtonCount
      for (let i = currentPage + 1; i <= maxPage; i++) {
        if (i < highInnerEllipsisPage) {
          pages.push(createPagePosition(Position.Standard, i))
        } else {
          pages.push(
            i === highInnerEllipsisPage && i < highOuterEllipsisPage
              ? createPagePosition(Position.HighEllipsis)
              : createPagePosition(Position.Standard, i)
          )
          for (
            let j = Math.max(i, highOuterEllipsisPage) + 1;
            j <= maxPage;
            j++
          ) {
            pages.push(createPagePosition(Position.Standard, j))
          }
          break
        }
      }

      // next
      pages.push(createPagePosition(Position.HighEnd, nextPage))

      return pages
    },
    [createPagePosition]
  )

  return (
    <Box className={className} {...other}>
      {computePages(
        limit,
        offset,
        total,
        innerButtonCount,
        outerButtonCount
      ).map((pp: PagePosition) => {
        const {position, page} = pp
        let key: React.Attributes['key']
        let children: React.ReactNode
        let pageVariant: PageVariant
        switch (position) {
          case Position.Current:
            key = position
            children = page
            pageVariant = 'current'
            break
          case Position.LowEllipsis:
          case Position.HighEllipsis:
            key = -position
            children = '...'
            pageVariant = 'ellipsis'
            break
          case Position.LowEnd:
          case Position.HighEnd:
            key = -position
            children =
              position === Position.LowEnd ? previousPageLabel : nextPageLabel
            pageVariant = 'end'
            break
          default:
            key = page
            children = page
            pageVariant = 'standard'
            break
        }

        return (
          <PageButton
            limit={limit}
            page={page}
            total={total}
            centerRipple={centerRipple}
            classes={buttonClasses}
            currentPageColor={currentPageColor}
            disabled={disabled}
            disableFocusRipple={disableFocusRipple}
            disableRipple={disableRipple}
            fullWidth={fullWidth}
            key={key}
            onClick={onClick}
            otherPageColor={otherPageColor}
            pageVariant={pageVariant}
            size={size}
          >
            {children}
          </PageButton>
        )
      })}
    </Box>
  )
}

const PaginationWithStyles: React.ComponentType<PaginationProps> = withStyles(
  styles,
  {
    name: 'MuiFlatPagination'
  }
)(Pagination)

export default PaginationWithStyles
