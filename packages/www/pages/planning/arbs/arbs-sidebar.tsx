import React, {useCallback} from 'react'
import {Box, Typography as Type, Divider} from '@material-ui/core'
import {
  useTheme,
  makeStyles,
  createStyles,
  Theme
} from '@material-ui/core/styles'
import Spacing from '@components/boxes/Spacing'
import MuiNextLink, {MuiNextLinkProps} from '@components/NextLink/NextLink'
import NavBox from '@components/boxes/NavBox'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      marginBottom: theme.spacing(1)
    }
  })
)

const ARBSSidebar = () => {
  const theme = useTheme()
  const classes = useStyles()

  const PageLink = useCallback(
    ({
      href,
      children,
      ...rest
    }: {children: React.ReactNode} & MuiNextLinkProps) => {
      return (
        <MuiNextLink
          href={href}
          color="inherit"
          className={classes.link}
          {...rest}
        >
          {children}
        </MuiNextLink>
      )
    },
    [classes]
  )

  return (
    <Box
      width={{xs: '100%', sm: 175}}
      p={2}
      bgcolor={theme.palette.grey['100']}
      borderColor={theme.palette.grey['300']}
      borderRadius={1}
      border={1}
    >
      <NavBox color={theme.palette.primary.light}>
        <Type variant="subtitle2" color="primary">
          Table of Contents
        </Type>
        <Spacing size="x-small" />
        <PageLink href="#background">
          Background
          <br />
        </PageLink>
        <PageLink href="#objectives">
          Objectives
          <br />
        </PageLink>
        <PageLink href="#study-area">
          Study Area
          <br />
        </PageLink>
        <PageLink href="#partners">
          Partners
          <br />
        </PageLink>
        <PageLink href="#participation">
          Participation
          <br />
        </PageLink>
        <PageLink href="#timeline">
          Timeline
          <br />
        </PageLink>
        <Spacing>
          <Divider />
        </Spacing>
        <Type variant="subtitle2" color="primary">
          Meetings
        </Type>
        <Spacing size="x-small" />
        <PageLink href="/planning/arbs/meetings">
          Agendas & Meeting Materials
        </PageLink>
      </NavBox>
    </Box>
  )
}

export default ARBSSidebar
