import React from 'react'
import {Box, Typography, Button} from '@mui/material'
import {ColumnBox, RowBox} from '@components/MuiSleazebox'
import useTheme from '@hooks/useTheme'

export default function QuickLinksMobileBar() {
  const theme = useTheme()
  const style = {
    button: {
      marginBottom: theme.spacing(1)
    }
  }

  return (
    <Box mx={3} my={3}>
      <RowBox flexSpacing={4}>
        <ColumnBox
          child
          flex="50%"
          // justifyContent="flex-start"
          // alignItems="center"
        >
          <Button
            href="/board-of-directors/meeting-agendas"
            color="primary"
            variant="outlined"
            // imageAlt="PCWA Board Meetings and Agendas link icon"
            // imageSrc="5662a7f0-c943-11eb-ba89-e7f98c8c358b-BoardAgenda.png"
            // caption="Board Meetings"
            sx={{
              ...style.button
            }}
          >
            <Typography noWrap variant="inherit">
              Board Meetings
            </Typography>
          </Button>
          <Button
            href="https://careers.pcwa.net/"
            target="_blank"
            color="primary"
            variant="outlined"
            // imageAlt="Careers quick link icon"
            // imageSrc="e7a5cf40-c942-11eb-ba89-e7f98c8c358b-Careers.png"
            // caption="Careers"
            sx={{
              ...style.button
            }}
          >
            Careers
          </Button>
          {/* <Button
          href="#"
          imageAlt="Start/Stop Service quick link icon"
          imageSrc="c14e4d00-c946-11eb-ba89-e7f98c8c358b-Start-StopServiceicon.png"
          caption="Start/Stop Service"
        /> */}
          <Button
            href="/services/outage"
            color="primary"
            variant="outlined"
            // imageAlt="Outages link icon"
            // imageSrc="2795ba30-c951-11eb-ba89-e7f98c8c358b-Outage.png"
            // caption="Outages"
            sx={{
              ...style.button
            }}
          >
            Outages
          </Button>
        </ColumnBox>
        <ColumnBox
          child
          flex="50%"
          // justifyContent="flex-start"
          // alignItems="center"
        >
          <Button
            href="https://ipn.paymentus.com/cp/plco"
            target="_blank"
            color="primary"
            variant="outlined"
            // imageAlt="Bill Pay quick link icon"
            // imageSrc="1938eb70-c941-11eb-ba89-e7f98c8c358b-PayBill.png"
            // caption="Pay My Bill"
            sx={{
              ...style.button
            }}
          >
            <Typography noWrap variant="inherit">
              Pay My Bill
            </Typography>
          </Button>
          <Button
            href="/smart-water-use/rebate-programs"
            // imageAlt="Rebates link icon"
            // imageSrc="7e4b1440-ca0c-11eb-ba89-e7f98c8c358b-Rebateicon.png"
            // caption="Rebates"
            color="primary"
            variant="outlined"
            sx={{
              ...style.button
            }}
          >
            Rebates
          </Button>

          {/* <Button
          href="#"
          imageAlt="Chat quick link icon"
          imageSrc="4184fba0-c946-11eb-ba89-e7f98c8c358b-Chat.png"
          caption="Chat"
        /> */}
        </ColumnBox>
      </RowBox>
    </Box>
  )
}
