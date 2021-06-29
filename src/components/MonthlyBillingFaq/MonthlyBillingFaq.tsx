import React, {useState, useCallback} from 'react'
import BulletIcon from 'mdi-material-ui/CircleSmall'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography as Type,
  Theme,
  Box,
  makeStyles,
  createStyles,
  useTheme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {ColumnBox} from 'mui-sleazebox'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    expansionPanel: {
      backgroundColor: theme.palette.common.white
    },
    heading: {
      fontSize: theme.typography.pxToRem(18)
      // flexBasis: '33.33%',
      // flexShrink: 0
    }
  })
)

const MonthlyBillingFaq = () => {
  const classes = useStyles()
  const [expanded, setExpanded] = useState<string | false>(false)

  const handleChange = useCallback(
    (panel: string) =>
      (
        _event: React.ChangeEvent<Record<string, unknown>>,
        isExpanded: boolean
      ) => {
        setExpanded(isExpanded ? panel : false)
      },
    []
  )

  const theme = useTheme<Theme>()

  return (
    <Box>
      <Box
        bgcolor={theme.palette.primary.light}
        color={theme.palette.common.white}
        p={2}
        pl={3}
        borderRadius="4px 4px 0px 0px"
      >
        <Type variant="subtitle1" color="inherit">
          Frequently Asked Questions
        </Type>
      </Box>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
        classes={{root: classes.expansionPanel}}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Type variant="subtitle2">
            Why is PCWA moving to monthly billing?
          </Type>
        </AccordionSummary>
        <AccordionDetails>
          <ColumnBox>
            <Type variant="body2" paragraph>
              Monthly billing offers customers smaller, more manageable payments
              and better aligns with other monthly expenses, making it easier
              for you to manage household budgets. A monthly bill is also a
              better tool to help you understand consumption habits, because it
              provides more timely information about water use and more frequent
              opportunities to identify and repair leaks that might otherwise go
              undetected.{' '}
            </Type>
          </ColumnBox>
        </AccordionDetails>
      </Accordion>
      {/* <Accordion
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
        classes={{root: classes.expansionPanel}}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Type variant="subtitle2">When will monthly billing begin?</Type>
        </AccordionSummary>
        <AccordionDetails>
          <ColumnBox>
            <Type variant="body2" paragraph>
              The transition will begin this summer and take two to four months
              depending on your current billing cycle. During the transition
              period, some bi-monthly bills may reflect more or less than 60
              days of service, and some monthly bills may reflect more or less
              than 30 days of service. (Customers in several PCWA service areas,
              including Bianchi Estates, Alta, Colfax, Monte Vista and
              Applegate, transitioned to monthly billing in 2017. Their billing
              schedule will remain unchanged).
            </Type>
          </ColumnBox>
        </AccordionDetails>
      </Accordion> */}

      <Accordion
        expanded={expanded === 'panel3'}
        onChange={handleChange('panel3')}
        classes={{root: classes.expansionPanel}}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Type variant="subtitle2">
            Will I still be able to pay my bill online?
          </Type>
        </AccordionSummary>
        <AccordionDetails>
          <ColumnBox>
            <Type variant="body2" paragraph>
              Yes, you will be able to view and pay your monthly bills online.
              PCWA also plans to present a paperless (e-bill) option this year.
            </Type>
          </ColumnBox>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === 'panel4'}
        onChange={handleChange('panel4')}
        classes={{root: classes.expansionPanel}}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Type variant="subtitle2">
            If I set up recurring payments (i.e. bill paid automatically from
            your checking account), do I need to change anything?
          </Type>
        </AccordionSummary>
        <AccordionDetails>
          <ColumnBox>
            <Type variant="body2" paragraph>
              If your recurring payments are set up through PCWA Automatic Bill
              Payments, you do not need to change anything – your payments will
              automatically adjust. However, if you established recurring
              payments through your personal banking website, you will likely
              need to adjust the payment per the monthly due date reflected on
              your bill.
            </Type>
          </ColumnBox>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === 'panel5'}
        onChange={handleChange('panel5')}
        classes={{root: classes.expansionPanel}}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5bh-content"
          id="panel5bh-header"
        >
          <Type variant="subtitle2">What changes can I expect on my bill?</Type>
        </AccordionSummary>
        <AccordionDetails>
          <ColumnBox>
            <Type variant="body2" paragraph>
              Your water charges cover a period of one month instead of two, and
              bill payment is now due monthly rather than bi-monthly (check the
              top right corner of your bill for the due date).
            </Type>
            <Type paragraph variant="body2">
              The meter reading and the consumption history show approximately
              30 days. However, depending on the read date, your new bill will
              typically reflect usage in a range of 28 to 32 days of service.
              (Note that during the transition to monthly billing, bills will
              likely include more or even fewer days than this range until the
              billing cycles and readings are entirely transitioned over to the
              30-day billing period.)
            </Type>
          </ColumnBox>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel6'}
        onChange={handleChange('panel6')}
        classes={{root: classes.expansionPanel}}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel6bh-content"
          id="panel6bh-header"
        >
          <Type variant="subtitle2">
            What are the benefits of monthly billing?
          </Type>
        </AccordionSummary>
        <AccordionDetails>
          <ColumnBox>
            <Type variant="body2" paragraph>
              Benefits of monthly billing include:
            </Type>
            <List dense disablePadding>
              <ListItem>
                <ListItemIcon>
                  <BulletIcon />
                </ListItemIcon>
                <ListItemText primary="Smaller, manageable payments." />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <BulletIcon />
                </ListItemIcon>
                <ListItemText primary="More efficient household budgeting: Your water bill will now arrive at a similar frequency with most other utility bills such as gas and electric, making your monthly budget that much simpler." />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <BulletIcon />
                </ListItemIcon>
                <ListItemText primary="Timely water use information: Monitoring your water use can help you understand consumption habits and manage water costs." />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <BulletIcon />
                </ListItemIcon>
                <ListItemText primary="Detect possible water leaks quickly: With more timely information, you’ll easily notice if your water use is different from normal. This allows for the early detection and prompt repair of leaks, reducing the possibility of a high water bill." />
              </ListItem>
            </List>
          </ColumnBox>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel7'}
        onChange={handleChange('panel7')}
        classes={{root: classes.expansionPanel}}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel7bh-content"
          id="panel7bh-header"
        >
          <Type variant="subtitle2">
            How is PCWA making sure customers are notified about the transition
            to monthly billing?
          </Type>
        </AccordionSummary>
        <AccordionDetails>
          <ColumnBox>
            <Type variant="body2" paragraph>
              PCWA is posting information on our website and social media, and
              reaching out to customers via newsletter, e-mail, bill messages,
              and postcards to our canal water customers.
            </Type>
          </ColumnBox>
        </AccordionDetails>
      </Accordion>
      {/* <Accordion
        expanded={expanded === 'panel8'}
        onChange={handleChange('panel8')}
        classes={{root: classes.expansionPanel}}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel8bh-content"
          id="panel8bh-header"
        >
          <Type variant="subtitle2">Can I pick the date my bill is due?</Type>
        </AccordionSummary>
        <AccordionDetails>
          <ColumnBox>
            <Type variant="body2" paragraph>
              No, you cannot pick the date that your bill is due. Check the top
              right corner of your bill for the due date.
            </Type>
          </ColumnBox>
        </AccordionDetails>
      </Accordion> */}
    </Box>
  )
}
export default MonthlyBillingFaq
