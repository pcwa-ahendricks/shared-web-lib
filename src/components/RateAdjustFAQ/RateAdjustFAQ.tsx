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
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {ChildBox, ColumnBox, RowBox} from 'mui-sleazebox'
import MainPhone from '@components/links/MainPhone'
import Spacing from '@components/boxes/Spacing'
import Image from 'next/image'
import {imgixUrlLoader} from '@lib/imageLoader'
import MediaDialogOnClick from '@components/MediaDialogOnClick/MediaDialogOnClick'
import {stringify} from 'querystringify'

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
  const costFrmt = useCallback(
    (cost: number) =>
      cost.toLocaleString(undefined, {style: 'currency', currency: 'USD'}),
    []
  )

  const theme = useTheme<Theme>()

  // const [show, setShow] = useState<String | null>()

  // const handleShowChange = (
  //   _event: React.MouseEvent<HTMLElement>,
  //   newShow: String | null
  // ) => {
  //   setShow(newShow)
  // }
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
          <Type variant="subtitle2">Why is PCWA adjusting rates?</Type>
        </AccordionSummary>
        <AccordionDetails>
          <ColumnBox>
            <Type variant="body2" paragraph>
              PCWA recently completed a comprehensive long-range financial plan
              and cost of service study to ensure PCWA has adequate revenue to
              continue to maintain safe and reliable service for years to come.
              The proposed rates are also designed to align costs with the
              benefitting customer classes, meet the revenue requirements
              necessary to recover current and projected costs of operations, to
              avoid deficits, and to minimize the use of reserves. The Agency
              completed a separate analysis which provided a 25-year outlook of
              Renewal and Replacement (R&R) costs which was incorporated into
              the long-range financial plan. The R&R Study projected the Agency
              requires $17 million annually, before inflation impacts, to
              maintain or replace its water infrastructure; the Agency's current
              water rates provide $10-11 million annually for R&R capital
              projects.
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
          <Type variant="subtitle2">
            If approved, when would the new rates take effect?
          </Type>
        </AccordionSummary>
        <AccordionDetails>
          <ColumnBox>
            <Type variant="body2" paragraph>
              The new rates would take effect January 1, 2023.
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
          <Type variant="subtitle2">
            If approved, how much will my bill increase?
          </Type>
        </AccordionSummary>
        <AccordionDetails>
          <ColumnBox>
            <Type variant="body2" paragraph>
              On average, customers can expect monthly water bills to increase
              $6 to $7 in 2023 (compared to 2022).
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
          <Type variant="subtitle2">When did PCWA last adjust rates?</Type>
        </AccordionSummary>
        <AccordionDetails>
          <ColumnBox>
            <Type variant="body2" paragraph>
              PCWA last adopted new rates in 2017 as a part of multiyear rate
              adjustment effective 2018 through 2022.
            </Type>
            {/* <Type variant="body2">Zone 1 in 2017</Type>
            <Type variant="body2">Zone 2 in 2008</Type>
            <Type variant="body2">Zone 3 in 2009</Type> */}
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
          <Type variant="subtitle2">
            What are some of the capital improvement projects PCWA plans to
            complete over the next five years?
          </Type>
        </AccordionSummary>
        <AccordionDetails>
          <ColumnBox flexSpacing={2}>
            <ChildBox>
              <Type variant="subtitle2" gutterBottom color="primary">
                Water Treatment
              </Type>
              <Type variant="body2" gutterBottom>
                PCWA operates eight water treatment plants producing 14 billion
                gallons of water per year. Projects slated in the next five
                years include:
              </Type>
              <Type variant="body2" style={{fontSize: '1.1rem'}}>
                <em>Colfax Water Treatment Plant Replacement</em>
              </Type>
              <Type variant="body2" style={{fontSize: '1.1rem'}}>
                <em>Foothill Water Treatment Plant Grit Screen Replacement</em>
              </Type>
            </ChildBox>
            {/* <ChildBox>
              <ToggleButtonGroup
                color="primary"
                value={show}
                exclusive
                onChange={handleShowChange}
                aria-label="Photo Button Toggle"
                size="small"
              >
                <ToggleButton
                  value="foothill"
                  aria-label="Foothill WTP Grit Screen Replacement"
                >
                  <ImageIcon style={{paddingRight: 6}} />
                  Foothill WTP Grit Screen Replacement
                </ToggleButton>
                <ToggleButton
                  value="colfax"
                  aria-label="Colfax WTP Replacement"
                >
                  <ImageIcon style={{paddingRight: 6}} />
                  Colfax WTP Replacement
                </ToggleButton>
              </ToggleButtonGroup>
            </ChildBox>
            <ChildBox
              sx={{
                ...(show !== 'foothill' && {display: 'none'})
              }}
            >
              <Image
                src="0b299d30-9976-11ec-8bb7-91577e4f4933-Slide2.jpeg"
                alt="Foothill WTP Grit Screen Replacement"
                loader={imgixLoader}
                layout="responsive"
                height={810}
                width={1440}
              />
            </ChildBox>

            <ChildBox
              sx={{
                ...(show !== 'colfax' && {display: 'none'})
              }}
            >
              <Image
                src="0b2b4ae0-9976-11ec-8bb7-91577e4f4933-Slide1.jpeg"
                alt="Colfax WTP Replacement"
                loader={imgixLoader}
                layout="responsive"
                height={810}
                width={1440}
              />
            </ChildBox> */}
            <ChildBox pt={1}>
              <RowBox responsive flexSpacing={4}>
                <ChildBox flex={{xs: 'auto', sm: '0 1 20%'}}>
                  <MediaDialogOnClick
                    mediaUrl="https://imgix.cosmicjs.com/0b2b4ae0-9976-11ec-8bb7-91577e4f4933-Slide1.jpeg"
                    mediaName="Colfax WTP"
                    mediaPreviewDialogProps={{
                      width: 1440,
                      height: 810,
                      children: (
                        <Box p={2}>
                          <Type variant="body1">
                            The existing WTP was first constructed in the 1930's
                            and has reached the end of its operational life.
                          </Type>
                        </Box>
                      )
                    }}
                  >
                    <Image
                      loader={imgixUrlLoader}
                      width={1440}
                      height={810}
                      alt="Colfax WTP"
                      src={`https://imgix.cosmicjs.com/cbf71be0-9a85-11ec-b3ab-81ba91f54050-Slide1.jpg${stringify(
                        {border: '1,AAAAAA'},
                        true
                      )}`}
                      layout="responsive"
                      sizes="(max-width: 600px) 100vw, 75vw"
                    />
                  </MediaDialogOnClick>
                  <ColumnBox alignItems="center">
                    <Box mt={1}>
                      <Type variant="caption">Colfax WTP Replacement</Type>
                    </Box>
                  </ColumnBox>
                </ChildBox>
                <ChildBox flex={{xs: 'auto', sm: '0 1 20%'}}>
                  <MediaDialogOnClick
                    mediaUrl="https://imgix.cosmicjs.com/0b299d30-9976-11ec-8bb7-91577e4f4933-Slide2.jpeg"
                    mediaName="Foothill Water Treatment Plant Grit Screen Replacement"
                    mediaPreviewDialogProps={{
                      width: 1440,
                      height: 810,
                      children: (
                        <Box p={2}>
                          <Type variant="body1">
                            Grit screens at Foothill WTP installed in 2001 and
                            have reached the end of their operational life.
                            Replacement of screens will occur 2022-2023.
                          </Type>
                        </Box>
                      )
                    }}
                  >
                    <Image
                      loader={imgixUrlLoader}
                      width={1440}
                      height={810}
                      alt="Foothill Water Treatment Plant Grit Screen Replacement"
                      src={`https://imgix.cosmicjs.com/ec51e280-9a85-11ec-b3ab-81ba91f54050-Slide2.jpg${stringify(
                        {border: '1,AAAAAA'},
                        true
                      )}`}
                      layout="responsive"
                      sizes="(max-width: 600px) 100vw, 75vw"
                    />
                  </MediaDialogOnClick>
                  <ColumnBox alignItems="center">
                    <Box mt={1}>
                      <Type variant="caption">
                        Foothill WTP Grit Screen Replacement
                      </Type>
                    </Box>
                  </ColumnBox>
                </ChildBox>
              </RowBox>
            </ChildBox>
            <ChildBox pt={2}>
              <Type variant="subtitle2" gutterBottom color="primary">
                Water Transmission & Distribution
              </Type>
              <Type variant="body2" gutterBottom>
                PCWA maintains over 600 miles of pipeline and 167 miles of raw
                water canals. Projects slated in the next five years include:
              </Type>
              <Type variant="body2" style={{fontSize: '1.1rem'}}>
                <em>High Street Water Main Replacement, Auburn</em>
              </Type>
              <Type variant="body2" style={{fontSize: '1.1rem'}}>
                <em>Midas Avenue Water Main Replacement, Rocklin</em>
              </Type>
              <Type variant="body2" style={{fontSize: '1.1rem'}}>
                <em>Interstate 80 Water Crossing Improvement Program</em>
              </Type>
              <Type variant="body2" style={{fontSize: '1.1rem'}}>
                <em>Kilmer Siphon Replacement, Colfax</em>
              </Type>
            </ChildBox>
            <ChildBox pt={1}>
              <RowBox responsive flexSpacing={4}>
                <ChildBox flex={{xs: 'auto', sm: '0 1 20%'}}>
                  <MediaDialogOnClick
                    mediaUrl="https://imgix.cosmicjs.com/0b3e5db0-9976-11ec-8bb7-91577e4f4933-Slide3.jpeg"
                    mediaName="High Street Water Main Replacement, Auburn"
                    mediaPreviewDialogProps={{
                      width: 1440,
                      height: 810,
                      children: (
                        <Box p={2}>
                          <Type variant="body1">
                            Pipe install date 1919. Provides domestic and fire
                            water to neighborhood and businesses in downtown
                            Auburn (photographs are of similar project recently
                            completed on Commercial Street in old town Auburn).
                          </Type>
                        </Box>
                      )
                    }}
                  >
                    <Image
                      loader={imgixUrlLoader}
                      width={1440}
                      height={810}
                      alt="High Street Water Main Replacement, Auburn"
                      src={`https://imgix.cosmicjs.com/c83ae1c0-9a86-11ec-bb50-8d698cd1c3f3-Slide3.jpg${stringify(
                        {border: '1,AAAAAA'},
                        true
                      )}`}
                      layout="responsive"
                      sizes="(max-width: 600px) 100vw, 75vw"
                    />
                  </MediaDialogOnClick>
                  <ColumnBox alignItems="center">
                    <Box mt={1}>
                      <Type variant="caption">High Street, Auburn</Type>
                    </Box>
                  </ColumnBox>
                </ChildBox>
                <ChildBox flex={{xs: 'auto', sm: '0 1 20%'}}>
                  <MediaDialogOnClick
                    mediaUrl="https://imgix.cosmicjs.com/0b3b7780-9976-11ec-8bb7-91577e4f4933-Slide4.jpeg"
                    mediaName="Midas Avenue Water Main Replacement, Rocklin"
                    mediaPreviewDialogProps={{
                      width: 1440,
                      height: 810,
                      children: (
                        <Box p={2}>
                          <Type variant="body1">
                            Part of a larger Rocklin pipeline replacement
                            program for pipe installed in 1963. While the pipe
                            cylinder is in good condition, service taps and
                            valves have reached the end of useful operational
                            life.
                          </Type>
                        </Box>
                      )
                    }}
                  >
                    <Image
                      loader={imgixUrlLoader}
                      width={1440}
                      height={810}
                      alt="Midas Avenue Water Main Replacement, Rocklin"
                      src={`https://imgix.cosmicjs.com/efcaa3a0-9a87-11ec-bb50-8d698cd1c3f3-Slide4.jpg${stringify(
                        {border: '1,AAAAAA'},
                        true
                      )}`}
                      layout="responsive"
                      sizes="(max-width: 600px) 100vw, 75vw"
                    />
                  </MediaDialogOnClick>
                  <ColumnBox alignItems="center">
                    <Box mt={1}>
                      <Type variant="caption">Midas Avenue, Rocklin</Type>
                    </Box>
                  </ColumnBox>
                </ChildBox>
                <ChildBox flex={{xs: 'auto', sm: '0 1 20%'}}>
                  <MediaDialogOnClick
                    mediaUrl="https://imgix.cosmicjs.com/0b400b60-9976-11ec-8bb7-91577e4f4933-Slide6.jpeg"
                    mediaName="Interstate 80 Water Crossing Improvement Program"
                    mediaPreviewDialogProps={{
                      width: 1440,
                      height: 810,
                      children: (
                        <Box p={2}>
                          <Type variant="body1">
                            PCWA has 22 treated water and 30 raw water crossings
                            of I-80. All were installed in the early 1960's as
                            I-80 was constructed and are at the end of their
                            operational life.
                          </Type>
                        </Box>
                      )
                    }}
                  >
                    <Image
                      loader={imgixUrlLoader}
                      width={1440}
                      height={810}
                      alt="Interstate 80 Water Crossing Improvement Program"
                      src={`https://imgix.cosmicjs.com/a572f2d0-9b22-11ec-8e3f-657e6f5f8486-Slide6.jpg${stringify(
                        {border: '1,AAAAAA'},
                        true
                      )}`}
                      layout="responsive"
                      sizes="(max-width: 600px) 100vw, 75vw"
                    />
                  </MediaDialogOnClick>
                  <ColumnBox alignItems="center">
                    <Box mt={1}>
                      <Type variant="caption">I-80 Crossing Program</Type>
                    </Box>
                  </ColumnBox>
                </ChildBox>
                <ChildBox flex={{xs: 'auto', sm: '0 1 20%'}}>
                  <MediaDialogOnClick
                    mediaUrl="https://imgix.cosmicjs.com/0b40f5c0-9976-11ec-8bb7-91577e4f4933-Slide5.jpeg"
                    mediaName="Kilmer Siphon Replacement, Colfax"
                    mediaPreviewDialogProps={{
                      width: 1440,
                      height: 810,
                      children: (
                        <Box p={2}>
                          <Type variant="body1">
                            Age of Kilmer siphon is unknown but is of similar
                            vintage to Long Ravine and Hayford Siphons, dating
                            from the late 1800's or early 1900's. These siphons
                            are critical elements of PCWA's Boardman Canal.
                          </Type>
                        </Box>
                      )
                    }}
                  >
                    <Image
                      loader={imgixUrlLoader}
                      width={1440}
                      height={810}
                      alt="Kilmer Siphon Replacement, Colfax"
                      src={`https://imgix.cosmicjs.com/f47f4740-9b25-11ec-8e3f-657e6f5f8486-Slide5.jpg${stringify(
                        {border: '1,AAAAAA'},
                        true
                      )}`}
                      layout="responsive"
                      sizes="(max-width: 600px) 100vw, 75vw"
                    />
                  </MediaDialogOnClick>
                  <ColumnBox alignItems="center">
                    <Box mt={1}>
                      <Type variant="caption">
                        Kilmer Siphon Replacement, Colfax
                      </Type>
                    </Box>
                  </ColumnBox>
                </ChildBox>
              </RowBox>
            </ChildBox>

            <ChildBox pt={2}>
              <Type variant="subtitle2" gutterBottom color="primary">
                Water Tank Upgrades & Replacement
              </Type>
              <Type variant="body2" gutterBottom>
                PCWA maintains 34 water storage tanks from Alta to Rocklin.
                Projects slated in the next five years include:
              </Type>
              <Type variant="body2" style={{fontSize: '1.1rem'}}>
                <em>Alta Tank</em>
              </Type>
              <Type variant="body2" style={{fontSize: '1.1rem'}}>
                <em>Monte Vista Tank</em>
              </Type>
              <Type variant="body2" style={{fontSize: '1.1rem'}}>
                <em>Stanford Ranch Tank</em>
              </Type>
              <Type variant="body2" style={{fontSize: '1.1rem'}}>
                <em>Bella Tuscany Tank</em>
              </Type>
            </ChildBox>
            <ChildBox pt={1}>
              <RowBox responsive flexSpacing={4}>
                <ChildBox flex={{xs: 'auto', sm: '0 1 20%'}}>
                  <MediaDialogOnClick
                    mediaUrl="https://imgix.cosmicjs.com/0b425550-9976-11ec-8bb7-91577e4f4933-Slide7.jpeg"
                    mediaName="Tank Renewal and Replacement"
                    mediaPreviewDialogProps={{
                      width: 1440,
                      height: 810,
                      children: (
                        <Box p={2}>
                          <Type variant="body1">
                            Alta and Monte Vista are redwood tanks than need
                            replacing. Construction of Monte Vista tank is
                            planned for 2022/2023 and Alta tank is planned for
                            2024/2025. Stanford Ranch tank scheduled for 2022,
                            Bella Tuscany in 2024.
                          </Type>
                        </Box>
                      )
                    }}
                  >
                    <Image
                      loader={imgixUrlLoader}
                      width={1440}
                      height={810}
                      alt="Tank Renewal and Replacement"
                      src={`https://imgix.cosmicjs.com/116b2d40-9b23-11ec-8e3f-657e6f5f8486-Slide7.jpg${stringify(
                        {border: '1,AAAAAA'},
                        true
                      )}`}
                      layout="responsive"
                      sizes="(max-width: 600px) 100vw, 75vw"
                    />
                  </MediaDialogOnClick>
                  <ColumnBox alignItems="center">
                    <Box mt={1} position="relative" width="100%" height={25}>
                      <Box
                        style={{
                          position: 'absolute'
                        }}
                      >
                        <Type variant="caption" noWrap>
                          Tank Renewal and Replacement
                        </Type>
                      </Box>
                    </Box>
                  </ColumnBox>
                </ChildBox>
              </RowBox>
            </ChildBox>
            <ChildBox pt={2}>
              <Type variant="subtitle2" gutterBottom color="primary">
                Pump Station Upgrades & Replacement
              </Type>
              <Type variant="body2" gutterBottom>
                PCWA operates treated water pumps and raw water pumps across
                several locations. Projects slated in the next five years
                include:
              </Type>
              <Type variant="body2" style={{fontSize: '1.1rem'}}>
                <em>Northstar Road, Rocklin</em>
              </Type>
              <Type variant="body2" style={{fontSize: '1.1rem'}}>
                <em>Ophir Pump Station including Auburn Tunnel Pumps 2 & 3</em>
              </Type>
            </ChildBox>
            <ChildBox pt={1}>
              <RowBox responsive flexSpacing={4}>
                <ChildBox flex={{xs: 'auto', sm: '0 1 20%'}}>
                  <MediaDialogOnClick
                    mediaUrl="https://imgix.cosmicjs.com/0b381c20-9976-11ec-8bb7-91577e4f4933-Slide8.jpeg"
                    mediaName="Pump Station Renewal and Replacement"
                    mediaPreviewDialogProps={{
                      width: 1440,
                      height: 810,
                      children: (
                        <Box p={2}>
                          <Type variant="body1">
                            Starting in 2022, every two years, rebuilding a
                            total of 19 water pumps throughout PCWA's system.
                          </Type>
                        </Box>
                      )
                    }}
                  >
                    <Image
                      loader={imgixUrlLoader}
                      width={1440}
                      height={810}
                      alt="Pump Station Renewal and Replacement"
                      src={`https://imgix.cosmicjs.com/251bb1f0-9b25-11ec-8e3f-657e6f5f8486-Slide8.jpg${stringify(
                        {border: '1,AAAAAA'},
                        true
                      )}`}
                      layout="responsive"
                      sizes="(max-width: 600px) 100vw, 75vw"
                    />
                  </MediaDialogOnClick>
                  <ColumnBox alignItems="center">
                    <Box mt={1} position="relative" width="100%" height={25}>
                      <Box
                        style={{
                          position: 'absolute'
                        }}
                      >
                        <Type variant="caption" noWrap>
                          Pump Station Renewal and Replacement
                        </Type>
                      </Box>
                    </Box>
                  </ColumnBox>
                </ChildBox>
              </RowBox>
            </ChildBox>
            <Spacing size="x-small" />
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
            Can revenue from the Agency's Middle Fork Hydroelectric Project be
            used to offset the rate increase?
          </Type>
        </AccordionSummary>
        <AccordionDetails>
          <ColumnBox>
            <Type variant="body2" paragraph>
              Because the Middle Fork Project is a county-wide asset (the
              revenue bonds for construction were passed by all voters in Placer
              County), net Project revenue cannot be allocated to only PCWA rate
              payers. Middle Fork Project hydro-electric generation does support
              the PCWA water system by funding the operation and maintenance of
              French Meadows and Hell Hole Reservoirs, which provide significant
              water supplies to our customers.
            </Type>
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
            What programs are available to help with my bill?
          </Type>
        </AccordionSummary>
        <AccordionDetails>
          <ColumnBox>
            <Type variant="body2" paragraph>
              PCWA makes every accommodation possible for customers who
              demonstrate difficulty paying their water bill. The State of
              California is also considering the creation of a statewide
              assistance program. For more information on payment plans, please
              contact Customer Services at <MainPhone />.
            </Type>
          </ColumnBox>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === 'panel8'}
        onChange={handleChange('panel8')}
        classes={{root: classes.expansionPanel}}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel8bh-content"
          id="panel8bh-header"
        >
          <Type variant="subtitle2">
            What is the biggest driver of the rate adjustment?
          </Type>
        </AccordionSummary>
        <AccordionDetails>
          <ColumnBox>
            <Type variant="body2" paragraph>
              Currently, the biggest driver of the rate adjustment is
              historically high levels of inflation. The operation and
              maintenance of our community owned water system is heavily reliant
              on goods and services that continue to experience dramatic price
              increases. These include items like iron and plastic pipe, lumber,
              concrete, asphalt, electricity and diesel fuel. PCWA's rate
              adjustment factors in persistent price inflation of approximately
              five percent (5%) over the coming five years. Below is a breakdown
              of materials commonly used in water infrastructure projects
              showing the increase in costs from the last rate adjustment in
              2017.
            </Type>
            <Box>
              <Table
                aria-label="Fixed Rates Fixed Charges Table"
                aria-labelledby="fixedChargeTableTitle"
                size="small"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>January</TableCell>
                    <TableCell align="right">2017</TableCell>
                    <TableCell align="right">2022</TableCell>
                    <TableCell colSpan={1} />
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={1} />
                    <TableCell colSpan={2} align="center">
                      Index Value
                    </TableCell>
                    <TableCell align="center">
                      % Increase in Material Cost
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Material Cost
                    </TableCell>
                    <TableCell align="right">{costFrmt(3153.32)}</TableCell>
                    <TableCell align="right">{costFrmt(5073.87)}</TableCell>
                    <TableCell align="right">60.91%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Cement $/Ton
                    </TableCell>
                    <TableCell align="right">{costFrmt(109.05)}</TableCell>
                    <TableCell align="right">{costFrmt(151.44)}</TableCell>
                    <TableCell align="right">38.87%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Steel $/CWT
                    </TableCell>
                    <TableCell align="right">{costFrmt(49.89)}</TableCell>
                    <TableCell align="right">{costFrmt(79.47)}</TableCell>
                    <TableCell align="right">59.29%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Lumber $/MBF
                    </TableCell>
                    <TableCell align="right">{costFrmt(522.6)}</TableCell>
                    <TableCell align="right">{costFrmt(949.7)}</TableCell>
                    <TableCell align="right">81.73%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </ColumnBox>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}
export default RateAdjustFAQ
