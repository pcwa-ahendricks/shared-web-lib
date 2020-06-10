// cspell:ignore Rickards brickards Arlan usbr anickel Ankur Bhattacharya
import React, {useCallback} from 'react'
import {
  Box,
  Typography as Type,
  Divider,
  Link,
  LinkProps,
  useTheme,
  makeStyles,
  createStyles,
  Theme
} from '@material-ui/core'
import Spacing from '@components/boxes/Spacing'
import MuiNextLink, {MuiNextLinkProps} from '@components/NextLink/NextLink'
import NavBox from '@components/boxes/NavBox'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      marginBottom: theme.spacing(1)
    },
    noIndexList: {
      paddingInlineStart: `${theme.spacing(3)}px`
    },
    safeLink: {
      '&:not(:last-child)': {
        marginBottom: theme.spacing(1) / 2
      }
    },
    wrapText: {
      wordBreak: 'break-word'
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

  const SafeLink = useCallback(
    ({href, children, ...rest}: {children: React.ReactNode} & LinkProps) => {
      return (
        <Link href={href} target="_blank" rel="noopener noreferrer" {...rest}>
          {children}
        </Link>
      )
    },
    []
  )

  const Li = useCallback(
    ({
      children,
      ...rest
    }: {children: React.ReactNode} & React.HTMLAttributes<HTMLLIElement>) => {
      return (
        <li className={classes.safeLink} {...rest}>
          {children}
        </li>
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

        <Spacing>
          <Divider />
        </Spacing>
        <Type variant="subtitle2" color="primary">
          Documents
        </Type>
        {/* <Spacing size="x-small" /> */}
        <ul className={classes.noIndexList}>
          <Li>
            <SafeLink href="https://cdn.cosmicjs.com/a0e68070-3273-11ea-bfe8-5b62c3bdf959-ARBSPlanofStudy20170113-1.pdf">
              Plan Of Study
            </SafeLink>
          </Li>
          <Li>
            <SafeLink href="https://cdn.cosmicjs.com/a1d944e0-3273-11ea-bfe8-5b62c3bdf959-2016LetterProposalAmericanRiverBasinStudy-1.pdf">
              Letter of Proposal
            </SafeLink>
          </Li>
          <Li>
            <SafeLink href="https://cdn.cosmicjs.com/a1202e10-3273-11ea-96a7-8146ec741192-MOAARBS-signed.pdf">
              Memorandum of Agreement
            </SafeLink>
          </Li>
        </ul>

        <Spacing>
          <Divider />
        </Spacing>
        <Type variant="subtitle2" color="primary">
          Contacts
        </Type>
        <Spacing size="x-small" />
        <Type variant="body2" color="textSecondary">
          Brian Rickards
        </Type>
        <Link
          href="mailto:brickards@pcwa.net"
          variant="body2"
          classes={{root: classes.wrapText}}
        >
          brickards@pcwa.net
        </Link>
        {/* <Spacing size="x-small" />
        <Type variant="body2" color="textSecondary">
          Arlan Nickel
        </Type> */}
        {/* <Link href="mailto:anickel@usbr.gov">anickel@usbr.gov</Link> */}
        <Spacing size="x-small" />
        <Type variant="body2" color="textSecondary">
          Ankur Bhattacharya
        </Type>
        <Link
          href="mailto:ankurbhattacharya@usbr.gov"
          variant="body2"
          classes={{root: classes.wrapText}}
        >
          ankurbhattacharya@usbr.gov
        </Link>
      </NavBox>
    </Box>
  )
}

export default ARBSSidebar
