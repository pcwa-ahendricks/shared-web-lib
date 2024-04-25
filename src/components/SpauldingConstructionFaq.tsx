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
import MainPhone from './links/MainPhone'
import CustomerServicesEmail from './links/CustomerServicesEmail'

const SpauldingConstructionFaq = () => {
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
          Frequently Asked Questions
        </Type>
      </Box>
      <Accordion
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
          <Type variant="subtitle2">What happened?</Type>
        </AccordionSummary>
        <AccordionDetails>
          <ColumnBox>
            <Type variant="body2" paragraph>
              PCWA is facing a water delivery problem caused by a failure in
              Pacific Gas & Electric’s (PG&E) Drum-Spaulding hydroelectric
              system. Corrosion and cavitation have caused leakage in a large
              pipe inside PG&E’s Spaulding #1 Powerhouse. This pipe needs to be
              repaired, but that can only be done by forcing an “outage” to stop
              the flow of water through this powerhouse. The problem is that
              about 85% of the water we provide comes from this source.
            </Type>
            <Type variant="body2" paragraph>
              The leaking pipe is part of PG&E’s hydroelectric system that moves
              water from Lake Spaulding, through a series of tunnels and
              conduits, into Rollins Reservoir. From here, it is delivered to
              PCWA’s delivery points along the Bear River Canal and to the
              Nevada Irrigation District (NID).
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
          <Type variant="subtitle2">How does this outage affect PCWA?</Type>
        </AccordionSummary>
        <AccordionDetails>
          <ColumnBox>
            <Type variant="body2" paragraph>
              At the moment, with no ability to move water from Lake Spaulding
              to Rollins Reservoir, while PG&E repairs their powerhouse, PCWA
              and NID must rely on the water currently sitting in Rollins
              Reservoir to serve both Agencies' needs. But Rollins Reservoir is
              relatively small.
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
            How does this outage affect PCWA’s customers?
          </Type>
        </AccordionSummary>
        <AccordionDetails>
          <ColumnBox>
            <Type variant="body2" paragraph>
              We do not anticipate treated water customers will be affected by
              this.
            </Type>
          </ColumnBox>
        </AccordionDetails>
      </Accordion>

      <Accordion
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
            How will this affect our irrigation water?
          </Type>
        </AccordionSummary>
        <AccordionDetails>
          <ColumnBox>
            <Type variant="body2" paragraph>
              We do not anticipate irrigation water customers will be affected
              by this. However, to help us all get through this period, we’re
              asking for voluntary reductions or temporary suspension in canal
              water deliveries now, while it’s still cool.
            </Type>
            <Type variant="body2" paragraph>
              Customers who want to discuss their options to temporarily reduce
              or suspend raw water deliveries are encouraged to contact our
              Customer Services Department at <MainPhone /> or{' '}
              <CustomerServicesEmail />.
            </Type>
          </ColumnBox>
        </AccordionDetails>
      </Accordion>

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
            Does PCWA have other sources of water?
          </Type>
        </AccordionSummary>
        <AccordionDetails>
          <ColumnBox>
            <Type variant="body2" paragraph>
              Thankfully, PCWA’s proactive planning for scenarios like this will
              play a huge role in getting us by. PCWA has backup supplies from
              the American River and groundwater, and interties with neighboring
              water providers.
            </Type>
            <Type paragraph variant="body2">
              So, while we have plans to make up for much of the lost water
              supply, we need your help to ensure that the water currently
              available in Rollins Reservoir lasts through the duration of this
              outage.
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
          <Type variant="subtitle2">How long will this last?</Type>
        </AccordionSummary>
        <AccordionDetails>
          <ColumnBox>
            <Type variant="body2" paragraph>
              PG&E is moving forward with a plan to partially restore water
              deliveries in mid-June, but full repair of the failed
              infrastructure isn’t expected until the end of the summer,
              delaying the full restoration of water supply into late fall,
              which means that PG&E’s water delivery problem will likely persist
              through the hot summer months.
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
          <Type variant="subtitle2">Do we have to conserve water?</Type>
        </AccordionSummary>
        <AccordionDetails>
          <ColumnBox>
            <Type variant="body2" paragraph>
              To help us all get through this period, we’re asking for voluntary
              reductions or temporary suspension in canal water deliveries now,
              while it’s still cool. We also ask all customers to be mindful of
              their water use and conservation in general, to preserve what we
              have, keeping demand under control now, to avoid facing a serious
              shortage later in the summer.
            </Type>
            <Type variant="body2" paragraph>
              Customers who want to discuss their options to temporarily reduce
              or suspend raw water deliveries are encouraged to contact our
              Customer Services Department at <MainPhone /> or{' '}
              <CustomerServicesEmail />.
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
            How will you notify customers of future updates?
          </Type>
        </AccordionSummary>
        <AccordionDetails>
          <ColumnBox>
            <Type variant="body2" paragraph>
              We encourage our customers to check back periodically for updates
              on the ongoing situation and any necessary actions they may need
              to take.
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
            What is the history of the Drum-Spaulding System?
          </Type>
        </AccordionSummary>
        <AccordionDetails>
          <ColumnBox>
            <Type variant="body2" paragraph>
              The Drum-Spaulding system is the primary water supply for parts of
              west Placer County. This water is delivered from a historic canal
              system that begins at a reservoir in the Yuba watershed and
              meanders through Placer County.
            </Type>
            <Type variant="body2" paragraph>
              From the time PG&E purchased the gold rush-era reservoirs on the
              South Yuba River in the early 1900s, until 1967, PG&E was the
              primary water retailer in Placer County. During that time, the
              Placer County region was one of the leading producers of tree
              fruits in the nation. The same canals that were originally used to
              transport water to the productive lands of the county also became
              part of PG&E’s Drum-Spaulding hydroelectric facilities.
            </Type>
            <Type variant="body2" paragraph>
              In 1967, PG&E decided to exit the retail water business, and PCWA
              purchased its western water system with overwhelming support from
              voters. We did this to bring more affordable water to our
              customers and to ensure the water system received the best
              possible operation and maintenance.
            </Type>
            <Type variant="body2" paragraph>
              Then, in 1983, PG&E sold the upper portion of their retail system,
              from Alta to Auburn, to PCWA. By this time, PG&E had exited the
              retail water business, and PCWA took over the duty to continue
              delivering water to the people of Placer County.
            </Type>
            <Type variant="body2" paragraph>
              Importantly, through both of these water system sales, PG&E has
              been bound by long-term contracts to ensure the continued delivery
              of water from the Drum-Spaulding system to PCWA, in order to
              supply the same customers and lands historically served by PG&E.
            </Type>
          </ColumnBox>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}
export default SpauldingConstructionFaq
