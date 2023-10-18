import React from 'react'
import {
  Box,
  BoxProps
  // Paper,
} from '@mui/material'
import {RowBox} from '@components/MuiSleazebox'
import QuickLinkButton from './QuickLinkButton'

export default function QuickLinksBar(props: BoxProps) {
  return (
    <Box
      maxWidth={{xs: '100vw', sm: '90vw', md: '85vw', lg: '80vw', xl: '65vw'}}
      m="auto"
      marginTop={2}
      position="relative"
      {...props}
      // zIndex={2}
    >
      {/* <Paper elevation={4}> */}
      <RowBox justifyContent="space-around" alignItems="center" height={150}>
        <QuickLinkButton
          href="https://ipn.paymentus.com/cp/plco"
          target="_blank"
          imageAlt="Bill Pay quick link icon"
          imageSrc="1938eb70-c941-11eb-ba89-e7f98c8c358b-PayBill.png"
          caption="Pay My Bill"
        />
        {/* <QuickLinkButton
          href="#"
          imageAlt="Start/Stop Service quick link icon"
          imageSrc="c14e4d00-c946-11eb-ba89-e7f98c8c358b-Start-StopServiceicon.png"
          caption="Start/Stop Service"
        /> */}
        <QuickLinkButton
          href="/services/outage"
          imageAlt="Outages link icon"
          imageSrc="2795ba30-c951-11eb-ba89-e7f98c8c358b-Outage.png"
          caption="Outages"
        />
        <QuickLinkButton
          href="/smart-water-use/rebate-programs"
          imageAlt="Rebates link icon"
          imageSrc="7e4b1440-ca0c-11eb-ba89-e7f98c8c358b-Rebateicon.png"
          caption="Rebates"
        />
        <QuickLinkButton
          href="https://careers.pcwa.net/"
          target="_blank"
          imageAlt="Careers quick link icon"
          imageSrc="e7a5cf40-c942-11eb-ba89-e7f98c8c358b-Careers.png"
          caption="Careers"
        />
        <QuickLinkButton
          href="/board-of-directors/meeting-agendas"
          imageAlt="PCWA Board Meetings and Agendas link icon"
          imageSrc="5662a7f0-c943-11eb-ba89-e7f98c8c358b-BoardAgenda.png"
          caption="Board Meetings"
        />
        {/* <QuickLinkButton
          href="#"
          imageAlt="Chat quick link icon"
          imageSrc="4184fba0-c946-11eb-ba89-e7f98c8c358b-Chat.png"
          caption="Chat"
        /> */}
      </RowBox>
      {/* </Paper> */}
    </Box>
  )
}
