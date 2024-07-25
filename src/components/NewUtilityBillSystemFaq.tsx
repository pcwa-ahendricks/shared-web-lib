import React, {useState, useCallback, SyntheticEvent} from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography as Type,
  Box,
  useTheme
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {ColumnBox} from '@components/MuiSleazebox'
import {Theme} from '@lib/material-theme'

const NewUtilityBillSystemFaq = () => {
  const theme = useTheme<Theme>()
  const style = {
    expansionPanel: {
      backgroundColor: theme.palette.common.white
    },
    heading: {
      fontSize: theme.typography.pxToRem(18)
      // flexBasis: '33.33%',
      // flexShrink: 0
    }
  }
  const [expanded, setExpanded] = useState<string | false>('panel1')

  const handleChange = useCallback(
    (panel: string) =>
      (_event: SyntheticEvent<Element, Event>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false)
      },
    []
  )

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
          Frequently Asked Questions About PCWA's New Utility Billing System
        </Type>
      </Box>
      {/* <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
        sx={{
          ...style.expansionPanel
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Type variant="subtitle2">
            What is the new utility billing system?
          </Type>
        </AccordionSummary>
        <AccordionDetails>
          <ColumnBox>
            <Type variant="body2" paragraph>
              The new utility billing system is a modern software platform that
              integrates various business processes into a digital, real-time
              system, improving operational efficiency and customer service.
            </Type>
          </ColumnBox>
        </AccordionDetails>
      </Accordion> */}

      {/* <Accordion
        expanded={expanded === 'panel4'}
        onChange={handleChange('panel4')}
        sx={{
          ...style.expansionPanel
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Type variant="subtitle2">
            When will the new utility billing system be implemented?
          </Type>
        </AccordionSummary>
        <AccordionDetails>
          <ColumnBox>
            <Type variant="body2" gutterBottom>
              Key dates for the transition include:
            </Type>
            <Type variant="body2" paragraph>
              <strong>August 2024</strong>: New account numbers will be mailed
              to all customers.
            </Type>
            <Type variant="body2" paragraph>
              <strong>September 2024</strong>: New account numbers will take
              effect, and the new customer portal will go live. The old payment
              system interface will no longer be available. More details will be
              provided once we get closer to the launch of the new system.
            </Type>
          </ColumnBox>
        </AccordionDetails>
      </Accordion> */}

      <Accordion
        expanded={expanded === 'panel5'}
        onChange={handleChange('panel5')}
        sx={{
          ...style.expansionPanel
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5bh-content"
          id="panel5bh-header"
        >
          <Type variant="subtitle2">
            Will my current account number change?
          </Type>
        </AccordionSummary>
        <AccordionDetails>
          <ColumnBox>
            <Type variant="body2" paragraph>
              Yes, all PCWA account numbers will change. You will receive your
              new account number in the mail in September 2024. Your new account
              number will also appear on your first bill after we transition to
              the new system in September.
            </Type>
          </ColumnBox>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === 'panel6'}
        onChange={handleChange('panel6')}
        sx={{
          ...style.expansionPanel
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel6bh-content"
          id="panel6bh-header"
        >
          <Type variant="subtitle2">
            What actions should I take as a customer?
          </Type>
        </AccordionSummary>
        <AccordionDetails>
          <ColumnBox>
            {/* <Type variant="body2" paragraph>
              September 2024:Look for your new account number in the mail and
              follow any instructions that apply to your chosen payment method.
            </Type> */}
            <Type variant="body2" paragraph>
              In September 2024, look for your new account number in the mail
              and follow any instructions that apply to your chosen payment
              method. Use your new account number to make payments and access
              your account in the new customer portal once it goes live. You
              will be able to access the portal through the “Pay My Bill” link
              at pcwa.net. Sign up for autopay and update any bank bill pay
              services with your new account number, if applicable. More updates
              will be provided once we get closer to the launch date for the new
              system.
            </Type>
          </ColumnBox>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === 'panel7'}
        onChange={handleChange('panel7')}
        sx={{
          ...style.expansionPanel
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel7bh-content"
          id="panel7bh-header"
        >
          <Type variant="subtitle2">
            What will happen to my autopay settings?
          </Type>
        </AccordionSummary>
        <AccordionDetails>
          <ColumnBox>
            <Type variant="body2" paragraph>
              If you are currently on autopay, your current autopay will be
              cancelled once we transfer to the new system. You will need to
              re-register in the new customer portal once it goes live in
              September 2024 to resume autopay settings. To do this, you will go
              to the new customer portal once it goes live, and login with your
              new account number.
            </Type>
          </ColumnBox>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === 'panel8'}
        onChange={handleChange('panel8')}
        sx={{
          ...style.expansionPanel
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel8bh-content"
          id="panel8bh-header"
        >
          <Type variant="subtitle2">
            Will I need to update my bank bill pay service?
          </Type>
        </AccordionSummary>
        <AccordionDetails>
          <ColumnBox>
            <Type variant="body2" paragraph>
              Yes. Once we go live in September you will need to update any
              third-party bill pay services you use to ensure seamless payment
              processing.
            </Type>
          </ColumnBox>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === 'panel3'}
        onChange={handleChange('panel3')}
        sx={{
          ...style.expansionPanel
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Type variant="subtitle2">
            How will the new utility billing system benefit me as a customer?
          </Type>
        </AccordionSummary>
        <AccordionDetails>
          <ColumnBox>
            <Type variant="body2" paragraph>
              You will experience easier account access with a simplified
              interface, the new customer portal. The new system will offer 24/7
              access to self-service features, allowing you to review water
              usage, receive and pay bills, sign up for autopay, request new
              service or transfer service, and submit rebate requests—all from
              one portal.
            </Type>
            <Type variant="body2" paragraph>
              In addition, all PCWA account numbers will change. You will
              receive your new account number in the mail in September 2024.
              Your new account number will also appear on your first bill after
              we transition to the new system in September. The system will also
              generate a new bill statement design, which we think you'll find
              easier to read.
            </Type>
          </ColumnBox>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
        sx={{
          ...style.expansionPanel
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Type variant="subtitle2">
            Why is PCWA transitioning to a new utility billing system?
          </Type>
        </AccordionSummary>
        <AccordionDetails>
          <ColumnBox>
            <Type variant="body2" paragraph>
              The new system will streamline operations, enhance data
              management, and provide a more intuitive and user-friendly
              customer experience.
            </Type>
          </ColumnBox>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === 'panel9'}
        onChange={handleChange('panel9')}
        sx={{
          ...style.expansionPanel
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel9bh-content"
          id="panel9bh-header"
        >
          <Type variant="subtitle2">
            What are the benefits of the new utility billing system for PCWA’s
            internal operations?
          </Type>
        </AccordionSummary>
        <AccordionDetails>
          <Type gutterBottom>
            The new utility billing system will significantly enhance PCWA's
            internal operations in several key ways:
          </Type>
          <Box component="ul" sx={{marginTop: 1}}>
            <Type component="li">
              <strong>Streamlined Operations</strong>: By integrating functions
              like billing, customer service, maintenance, and financials into a
              single platform, the new system reduces redundancy and improves
              coordination. Routine tasks such as billing and reporting will be
              automated, saving time and reducing human error.
            </Type>
            <Type component="li">
              <strong>Real-Time Data Management</strong>: With real-time access
              to data, PCWA can make more timely and informed decisions, helping
              to ensure faster and more accurate responses to customer needs.
            </Type>
            <Type component="li">
              <strong>Improved Coordination</strong>: The integration of
              different functions enhances communication and coordination
              between departments, leading to a more cohesive and productive
              operation.
            </Type>
            <Type component="li">
              <strong>Scalability and Flexibility</strong>: The new system is
              designed to accommodate PCWA's growing customer base and service
              area. It can also adapt swiftly to evolving business needs and
              integrate with emerging technologies like Advanced Metering
              Infrastructure (AMI) and Automated Meter Reading (AMR).
            </Type>
            <Type component="li">
              <strong>Enhanced Customer Service</strong>: Better coordination
              and real-time data management will enable our customer service
              team to address inquiries and issues more promptly and accurately,
              improving overall customer satisfaction.
            </Type>
            <Type component="li">
              <strong>Increased Efficiency</strong>: Automating routine tasks
              reduces the risk of human error and frees up staff time for more
              critical activities, leading to higher efficiency and better
              service delivery.
            </Type>
            <Type component="li">
              <strong>Data Security and Compliance</strong>: The new ERP system
              includes advanced security features to protect critical data and
              ensure compliance with regulations, safeguarding both PCWA and its
              customers from potential security breaches and legal issues.
            </Type>
          </Box>
          <Type paragraph>
            If you have any other questions, please feel free to reach out to
            our customer service team. We're here to ensure a smooth transition
            and to help you make the most of the new system.
          </Type>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}
export default NewUtilityBillSystemFaq
