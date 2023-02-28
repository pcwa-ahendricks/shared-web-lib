import React, {useState, useCallback} from 'react'
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
  Link
} from '@material-ui/core'
import Image from 'next/image'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {ChildBox, ColumnBox} from 'mui-sleazebox'
import Spacing from '@components/boxes/Spacing'
import imgixLoader from '@lib/imageLoader'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    expansionPanel: {
      backgroundColor: theme.palette.common.white
    },
    heading: {
      fontSize: theme.typography.pxToRem(18)
    }
  })
)

export default function IrrigSvcAgreeFAQ() {
  const classes = useStyles()
  const [expanded, setExpanded] = useState<string | false>('panel1')

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
          FAQs for Untreated Water Rules & Regulations
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
          <Type variant="subtitle2" color="primary">
            Why is PCWA requiring I sign an agreement for untreated water
            service?
          </Type>
        </AccordionSummary>
        <AccordionDetails>
          <ColumnBox>
            <Type variant="body2" paragraph>
              PCWA requires all untreated water customers to sign an untreated
              water application. Following recent updates to the Agency's Rules
              & Regulations related to untreated water service, PCWA updated its
              agreement. Customers must sign the updated agreement for continued
              untreated water deliveries. The agreement includes important
              changes that customers need to be aware of as a condition of
              service.
            </Type>
          </ColumnBox>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
        classes={{root: classes.expansionPanel}}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Type variant="subtitle2" color="primary">
            What are my options if I need to make a private repair to an
            untreated water leak on my property?
          </Type>
        </AccordionSummary>
        <AccordionDetails>
          <ColumnBox>
            <Type variant="body2" paragraph>
              All leaks on private property are the responsibility of the
              customer. To assist, PCWA may temporarily suspend service for up
              to 48 hours to allow the customer to install an isolation valve
              between the Agency’s delivery point and the private delivery point
              or a shared delivery point. The customer can either complete the
              repair in 48 hours or install an isolation valve within the
              48-hour time period. Staff recommends that customers install a
              valve in the event more time is needed to complete the repair. The
              Agency does not temporarily suspend service for other private side
              issues.
            </Type>
          </ColumnBox>
        </AccordionDetails>
      </Accordion>
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
          <Type variant="subtitle2" color="primary">
            Can PCWA employees access my property?
          </Type>
        </AccordionSummary>
        <AccordionDetails>
          <ColumnBox>
            <Type variant="body2" paragraph>
              Yes. It is the customer's responsibility to provide safe access to
              the Agency's facilities within the customer's property at all
              reasonable times, and in the event of an emergency. If access is
              restricted, the customer will be notified to correct the
              condition(s) within 14 days. Failure to address the access issues
              within 14 days will result in remediation of the condition by
              Agency crews, to be billed to the customer on a time and materials
              basis, and/or termination of service, at the Agency's sole
              discretion.
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
          <Type variant="subtitle2" color="primary">
            Are there any changes for customers on a party line?
          </Type>
        </AccordionSummary>
        <AccordionDetails>
          <ColumnBox>
            <Type variant="body2" paragraph>
              While customers on existing party lines are not required to make
              any changes, they now have the option to form an association and
              consolidate billing to one account. In doing so, the association
              becomes PCWA's customer, not the individual parcel owners.
              Additionally, should existing party lines want to increase their
              deliveries to accommodate requests from adjacent parcels there
              must (1) be capacity on the PCWA canal and the PCWA pipeline
              serving the customer(s), and (2) an isolation valve must be
              installed after the Agency's canal turnout, with the ability to
              isolate the entire party line. The increase in deliveries will be
              reflected on the bills of existing party line customers or through
              a single point of contact in the case of newly formed association.
            </Type>
            <Type variant="body2" paragraph>
              For new party lines, the Agency will only authorize the
              installation of one canal turnout and the customers on that party
              line will be required to setup one account (i.e. association) as
              the PCWA customer. Isolation valves are required on all new
              untreated water connections.
            </Type>
            <Type variant="body2" paragraph>
              The same requirements for new party lines applies to lot splits.
              The landowner would have to install an isolation valve after the
              Agency's canal turnout, and setup one account (for all lots) as
              the PCWA customer.
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
          <Type variant="subtitle2" color="primary">
            I am currently on a waitlist for untreated water service. How will
            the new prioritization for allocations affect me?
          </Type>
        </AccordionSummary>
        <AccordionDetails>
          <ColumnBox flexSpacing={2}>
            <ChildBox>
              <Type variant="subtitle2" gutterBottom color="primary">
                The methodology for allocating new untreated water deliveries is
                now based upon the following categories:
              </Type>
              <Type variant="body2" gutterBottom>
                1. Commercial scale agriculture/livestock - adjacent to an
                Agency canal
              </Type>
              <Type variant="body2" gutterBottom>
                2. Commercial scale agriculture/livestock - <em>not</em>{' '}
                adjacent to an Agency canal
              </Type>
              <Type variant="body2" gutterBottom>
                3. Water used to grow food for personal consumption and
                non-commercial livestock
              </Type>
              <Type variant="body2" gutterBottom>
                4. General use/landscaping
              </Type>
            </ChildBox>
          </ColumnBox>
        </AccordionDetails>
      </Accordion>
      <Spacing size="x-large" factor={2} />
      <ColumnBox child flex="30%">
        <ChildBox flex width="100%">
          <a
            href="https://survey123.arcgis.com/share/eb6a26325a6840b69c5460d97306e7bb"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Box mx="auto" width="60%">
              <Image
                role="link"
                src="2662b390-b79b-11ed-a33c-958e5b2068f9-QR-Code-for-Ag-Acknowledgementbg.png"
                alt="QR Code for PCWA Irrigation Customer Acknowledgement Form"
                loader={imgixLoader}
                layout="responsive"
                sizes="60vw"
                width={1116}
                height={1116}
              />
            </Box>
          </a>
        </ChildBox>
        <Spacing size="x-small" />
        <ChildBox textAlign="center">
          <Link
            variant="subtitle1"
            href="https://survey123.arcgis.com/share/eb6a26325a6840b69c5460d97306e7bb"
            target="_blank"
            rel="noopener noreferrer"
          >
            <em>
              Complete the Customer Acknowledgement Online Today by using the QR
              code above, or simply click the link
            </em>
          </Link>
        </ChildBox>
      </ColumnBox>
    </Box>
  )
}
