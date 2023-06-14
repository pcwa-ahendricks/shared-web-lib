// cspell:ignore Rickards brickards Arlan usbr anickel Ankur Bhattacharya
import React, {useCallback, useMemo} from 'react'
import {Box, Typography as Type, Divider, useTheme} from '@mui/material'
import Spacing from '@components/boxes/Spacing'
import NavBox from '@components/boxes/NavBox'
import {Theme} from '@lib/material-theme'
import Link, {LinkProps} from '@components/Link'

const ARBSSidebar = () => {
  const theme = useTheme<Theme>()
  const style = useMemo(
    () => ({
      link: {
        marginBottom: theme.spacing(1)
      },
      noIndexList: {
        paddingInlineStart: theme.spacing(3)
      },
      safeLink: {
        '&:not(:last-child)': {
          marginBottom: theme.spacing(0.5)
        }
      },
      wrapText: {
        wordBreak: 'break-word'
      }
    }),
    [theme]
  )
  const PageLink = useCallback(
    ({href, children, ...rest}: {children: React.ReactNode} & LinkProps) => {
      return (
        <Link
          href={href}
          underline="hover"
          color="inherit"
          variant="body2"
          sx={(theme) => ({...style.link, color: theme.palette.primary.dark})}
          {...rest}
        >
          {children}
        </Link>
      )
    },
    [style]
  )

  const SafeLink = useCallback(
    ({href, children, ...rest}: {children: React.ReactNode} & LinkProps) => {
      return (
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          color="inherit"
          variant="body2"
          sx={(theme) => ({
            display: 'inherit',
            color: theme.palette.primary.dark
          })}
          {...rest}
        >
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
        <Box component="li" sx={{...style.safeLink}} {...rest}>
          {children}
        </Box>
      )
    },
    [style]
  )

  return (
    <Box
      sx={{
        width: {xs: '100%', sm: 175},
        padding: 2,
        bgcolor: theme.palette.grey['100'],
        borderWidth: 1,
        borderRadius: 1,
        borderColor: theme.palette.grey['300'],
        borderStyle: 'solid'
      }}
    >
      <NavBox color={theme.palette.primary.light}>
        <Type variant="subtitle2" color="primary">
          Table of Contents
        </Type>
        <Spacing size="x-small" />
        <PageLink href="#report">
          Report
          <br />
        </PageLink>
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
        {/* <PageLink href="#timeline">
          Timeline
          <br />
        </PageLink> */}
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
        <Box component="ul" sx={{...style.noIndexList}}>
          <Li>
            <SafeLink href="https://docs.pcwa.net/american-river-basin-study-2022_08.pdf">
              American River Basin Study
            </SafeLink>
          </Li>
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
        </Box>

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
          sx={(theme) => ({
            ...style.wrapText,
            color: theme.palette.primary.dark
          })}
          underline="hover"
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
          Mike Dietl
        </Type>
        <Link
          href="mailto:mdietl@usbr.gov"
          variant="body2"
          underline="hover"
          sx={(theme) => ({
            ...style.wrapText,
            color: theme.palette.primary.dark
          })}
        >
          mdietl@usbr.gov
        </Link>
      </NavBox>
    </Box>
  )
}

export default ARBSSidebar
