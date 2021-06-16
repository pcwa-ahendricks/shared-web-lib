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
  useTheme
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {ColumnBox} from 'mui-sleazebox'
import MainPhone from '@components/links/MainPhone'

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

const RateAdjustFAQ = () => {
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
          <Type variant="subtitle2">Why the increase?</Type>
        </AccordionSummary>
        <AccordionDetails>
          <ColumnBox>
            <Type variant="body2" paragraph>
              There are two reasons for the proposed adjustment in rates. The
              first reason is to maintain compliance with current law. In 2015,
              a California appellate court ruled that tiered water rates must be
              based on the actual cost of providing water service to each
              customer, rather than an escalating scale based on the quantity of
              water used. To comply with this legal interpretation of
              Proposition 218, PCWA is collapsing its seven-tier structure to
              three tiers.
            </Type>
            <Type paragraph>
              The second reason is related to capital improvement projects. For
              the past 4 years, PCWA has been using reserves to complete needed
              renewal and replacement projects. In addition, operating costs
              continue to increase annually as the cost of materials and
              supplies increase. The new rates reflect the increased cost of
              updating, operating, and maintaining PCWA’s water system.
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
          <Type variant="subtitle2">When did PCWA last raise rates?</Type>
        </AccordionSummary>
        <AccordionDetails>
          <ColumnBox>
            <Type variant="body2" paragraph>
              Prior to the creation of the Zone 6, PCWA conducted rate increases
              on a zone-by-zone basis. The last rate increase for each zone is
              as follows:
            </Type>
            <Type variant="body2">Zone 1 in 2017</Type>
            <Type variant="body2">Zone 2 in 2008</Type>
            <Type variant="body2">Zone 3 in 2009</Type>
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
          <Type variant="subtitle2">
            Are there any programs to help with my bill?
          </Type>
        </AccordionSummary>
        <AccordionDetails>
          <ColumnBox>
            <Type variant="body2" paragraph>
              PCWA makes every accommodation possible for customers who
              demonstrate difficulty paying their water bill. For more
              information on payment plans, please contact Customer Services at{' '}
              <MainPhone />.
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
            Can revenue from the Agency’s Middle Fork Hydroelectric Project be
            used to offset some of the rate increase?
          </Type>
        </AccordionSummary>
        <AccordionDetails>
          <ColumnBox>
            <Type variant="body2" paragraph>
              Because the Middle Fork Project is a county-wide asset (the
              revenue bonds for construction were passed by all of the voters in
              the County), the net revenue cannot be allocated to only PCWA rate
              payers. The first priority for net revenue from energy sales is to
              build up reserves to protect against highly variable hydrology
              (drought means less energy production) and for unexpected repairs,
              which may take several years. Then the net revenues must be split
              with the County under requirements in the Placer County Water
              Agency Act.
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
          <Type variant="subtitle2">When will the new rates take effect?</Type>
        </AccordionSummary>
        <AccordionDetails>
          <ColumnBox>
            <Type variant="body2" paragraph>
              The new rates will take effect January 1, 2018.
            </Type>
          </ColumnBox>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}
export default RateAdjustFAQ
