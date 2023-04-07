import React, {useRef, useCallback} from 'react'
import {Box, Theme, Typography as Type} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import clsx from 'clsx'
import Overline from '@components/Overline/Overline'
import {ColumnBox} from '@components/MuiSleazebox'

type Props = {
  typographyClass?: any
  onLinkClick: (event: any) => any
  onLinkEnter: (e: any, target: any) => any
  onLinkLeave: () => any
  onBottomBunEnter: () => any
  children: React.ReactNode
  linkMargin?: string | number
  describedbyId?: string
  parentActiveEl?: HTMLElement | null
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      flex: '0 0 auto',
      color: theme.palette.primary.main,
      cursor: 'pointer',
      '&:hover,&:focus,&.linkActive': {
        color: theme.palette.primary.dark
      }
    }
  })
)
const MegaMenuLink = ({
  children,
  describedbyId,
  onLinkClick,
  onLinkEnter,
  onLinkLeave,
  onBottomBunEnter,
  parentActiveEl,
  typographyClass,
  linkMargin,
  ...rest
}: Props) => {
  const classes = useStyles()
  const typeRef = useRef(null)
  // Prevent null === null validity, resulting with a flash of Overline during initial page load.
  const isActive = Boolean(
    parentActiveEl === typeRef.current && parentActiveEl !== null
  )

  const handleLinkEnter = useCallback(
    (evt) => {
      onLinkEnter(evt, typeRef.current)
    },
    [onLinkEnter, typeRef]
  )

  return (
    <Overline
      useFullHeight
      visible={isActive}
      transitionDuration="200ms"
      lineMargin={linkMargin}
    >
      <ColumnBox justifyContent="center" height="100%">
        <Box flex="1 0 auto" />
        <Type
          ref={typeRef}
          className={clsx(classes.typography, typographyClass, {
            linkActive: isActive
          })}
          // Use padding over margin to prevent mega menu popover from closing when cursor moves between links. Should likely match <Overline/> margin.
          style={{paddingLeft: linkMargin, paddingRight: linkMargin}}
          aria-describedby={describedbyId}
          onClick={onLinkClick}
          onBlur={onLinkLeave}
          onMouseLeave={onLinkLeave}
          onFocus={handleLinkEnter}
          onMouseEnter={handleLinkEnter}
          variant="button"
        >
          <Type color="inherit" variant="inherit" {...rest}>
            {children}
          </Type>
        </Type>
        <Box
          flex="1 0 auto"
          onMouseEnter={onBottomBunEnter}
          onFocus={onBottomBunEnter}
          onMouseLeave={onLinkLeave}
          onBlur={onLinkLeave}
        />
      </ColumnBox>
    </Overline>
  )
}

export default MegaMenuLink
