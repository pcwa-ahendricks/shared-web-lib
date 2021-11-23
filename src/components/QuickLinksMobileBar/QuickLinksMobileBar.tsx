import React from 'react'
import {Box, makeStyles, Typography} from '@material-ui/core'
import {ColumnBox, RowBox} from 'mui-sleazebox'
import FlexButton from '@components/FlexButton/FlexButton'

const useStyles = makeStyles({
  button: {
    marginBottom: '8px'
  }
})

export default function QuickLinksMobileBar() {
  const classes = useStyles()
  return (
    <Box mx={4}>
      <RowBox flexSpacing={4}>
        <ColumnBox
          child
          flex="50%"
          // justifyContent="flex-start"
          // alignItems="center"
        >
          <FlexButton
            href="/board-of-directors/meeting-agendas"
            color="primary"
            variant="outlined"
            // imageAlt="PCWA Board Meetings and Agendas link icon"
            // imageSrc="5662a7f0-c943-11eb-ba89-e7f98c8c358b-BoardAgenda.png"
            // caption="Board Meetings"
            isNextLink
            className={classes.button}
          >
            <Typography noWrap variant="inherit">
              Board Meetings
            </Typography>
          </FlexButton>
          <FlexButton
            href="https://careers.pcwa.net/"
            target="_blank"
            color="primary"
            variant="outlined"
            // imageAlt="Careers quick link icon"
            // imageSrc="e7a5cf40-c942-11eb-ba89-e7f98c8c358b-Careers.png"
            // caption="Careers"
            isNextLink={false}
            className={classes.button}
          >
            Careers
          </FlexButton>
          {/* <Button
          href="#"
          imageAlt="Start/Stop Service quick link icon"
          imageSrc="c14e4d00-c946-11eb-ba89-e7f98c8c358b-Start-StopServiceicon.png"
          caption="Start/Stop Service"
        /> */}
          <FlexButton
            href="/services/outage"
            isNextLink
            color="primary"
            variant="outlined"
            // imageAlt="Outages link icon"
            // imageSrc="2795ba30-c951-11eb-ba89-e7f98c8c358b-Outage.png"
            // caption="Outages"
            className={classes.button}
          >
            Outages
          </FlexButton>
        </ColumnBox>
        <ColumnBox
          child
          flex="50%"
          // justifyContent="flex-start"
          // alignItems="center"
        >
          <FlexButton
            href="https://ipn.paymentus.com/cp/plco"
            target="_blank"
            color="primary"
            variant="outlined"
            // imageAlt="Bill Pay quick link icon"
            // imageSrc="1938eb70-c941-11eb-ba89-e7f98c8c358b-PayBill.png"
            // caption="Pay My Bill"
            isNextLink={false}
            className={classes.button}
          >
            <Typography noWrap variant="inherit">
              Pay My Bill
            </Typography>
          </FlexButton>
          <FlexButton
            href="/smart-water-use/rebate-programs"
            // imageAlt="Rebates link icon"
            // imageSrc="7e4b1440-ca0c-11eb-ba89-e7f98c8c358b-Rebateicon.png"
            // caption="Rebates"
            isNextLink
            color="primary"
            variant="outlined"
            className={classes.button}
          >
            Rebates
          </FlexButton>

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
