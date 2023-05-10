// cspell:ignore bgcolor frmt
import React, {useCallback} from 'react'
import {
  Typography as Type,
  Box,
  Divider,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  createStyles,
  makeStyles,
  useTheme,
  Theme,
  BoxProps
} from '@material-ui/core'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {ChildBox, RowBox} from 'mui-sleazebox'
import FancyButton from '@components/FancyButton/FancyButton'
import Image from 'next/image'
import imgixLoader from '@lib/imageLoader'

function createData(tier: string, cost: number) {
  return {tier, cost}
}

const fixedRows = [
  createData('5/8-inch', 22.87),
  createData('3/4-inch', 32.65),
  createData('1-inch', 52.2),
  createData('1-1/2-inch', 101.08),
  createData('2-inch', 159.74),
  createData('3-inch', 345.49),
  createData('4-inch', 589.9),
  createData('6-inch', 1323.12),
  createData('8-inch', 1567.53)
]

// const fixedChargeMDU = [
// createData('Per Dwelling Unit Charge', 16.23),
// createData('Per Meter Component Charge', 3.91)
// ]

const renewAndReplacementRows = [
  createData('5/8-inch', 20.41),
  createData('3/4-inch', 30.61),
  createData('1-inch', 51.01),
  createData('1-1/2-inch', 102.01),
  createData('2-inch', 163.22),
  createData('3-inch', 357.04),
  createData('4-inch', 612.06),
  createData('6-inch', 1377.13),
  createData('8-inch', 1632.16)
]

const commodityResidentialRows = [
  createData('First 900 CF (per 100 CF)', 1.82),
  createData('Next 1,900 CF (per 100 CF)', 2.19),
  createData('Next 2,800 CF (per 100 CF)', 2.38)
]

const commodityNonResidentialRows = [
  createData('Commercial (per 100 CF)', 1.94),
  createData('Landscape (per 100 CF)', 2.23),
  createData('Industrial / Resale (per 100 CF)', 0.47)
]

const commodityDeprivedRows = [
  createData('First 900 CF (per 100 CF)', 1.82),
  createData('Next 1,900 CF (per 100 CF)', 2.19),
  createData('Next 2,800 CF (per 100 CF)', 0.23)
]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableWrapper: {
      overflowX: 'auto'
    },
    tableTitle: {
      padding: theme.spacing(2)
    }
  })
)

const WaterRatesPage = () => {
  const theme = useTheme<Theme>()
  const classes = useStyles()

  const costFrmt = useCallback(
    (cost: number) =>
      cost.toLocaleString(undefined, {style: 'currency', currency: 'USD'}),
    []
  )

  const TableContainer = ({children, ...rest}: BoxProps) => {
    return (
      <Box bgcolor={theme.palette.common.white} boxShadow={3} {...rest}>
        {children}
      </Box>
    )
  }

  const flexLeftMargin = 8
  const flexTopMargin = 4

  const TableLayoutBox = ({children, ...rest}: BoxProps) => {
    return (
      <ChildBox
        flex={`0 1 calc(50% - ${theme.spacing(flexLeftMargin)}px)`}
        {...rest}
      >
        {children}
      </ChildBox>
    )
  }

  const TableLayoutRow = ({children, ...rest}: BoxProps) => {
    return (
      <RowBox
        responsive
        flexSpacing={flexLeftMargin}
        flexWrap="wrap"
        wrapSpacing={flexTopMargin}
        {...rest}
      >
        {children}
      </RowBox>
    )
  }

  return (
    <PageLayout title="Water Rates" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle title="Water Rates" subtitle="Services" />
          <RowBox responsive flexSpacing={8}>
            <ChildBox flex="70%">
              <Type variant="h3" gutterBottom>
                Overview of Treated Water Billing Components
              </Type>
              <Type paragraph>
                PCWA sets rates and charges to recover the cost of providing
                service. PCWA is required to maintain the treatment,
                transmission, storage, and distribution facilities necessary to
                serve each property that has paid Water Connection Charges,
                regardless of how much water is used by a customer. PCWA's
                treated water rate structure has two fixed charges (Monthly
                Fixed Charge and the Renewal and Replacement Charge) and a
                commodity charge (water tier rates based on water use). The
                fixed charges are billed and payable whether or not any water is
                used and are prorated based on the number of days in the billing
                period.
              </Type>
              <Type paragraph>
                The Monthly Fixed Charge and Water Tiered Rates fund PCWA
                operations including personnel, supplies, services, state and
                federal mandates, purchased water, insurance, legal and
                consulting services, utilities, routine capital and other
                operation expenses.
              </Type>
              <Type paragraph>
                The Renewal and Replacement Charge funds construction projects
                to improve aging water infrastructure, including water treatment
                plants, pipelines, canals or other water system facilities.
              </Type>
            </ChildBox>
            <ChildBox flex="30%">
              <Box
                mx="auto"
                width={{xs: '60vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
              >
                <Image
                  loader={imgixLoader}
                  layout="responsive"
                  sizes="(max-width: 600px) 60vw, 30vw"
                  src="ad139f00-6b41-11e7-b267-0b654f5c65d5-water-rates.jpg"
                  alt="A photo of plants receiving water from a watering can"
                  width={1080}
                  height={1438}
                />
              </Box>
            </ChildBox>
          </RowBox>
          <Box mt={6}>
            <Type variant="h2" gutterBottom>
              Zone 6 Treated Water Rates
            </Type>
            <Box my={3}>
              <Divider />
            </Box>
            <article>
              <Type variant="h3" gutterBottom>
                Applicability
              </Type>
              <Type paragraph>
                Applicable to all metered water service throughout Zone 6 or
                those not covered by special contract as described in special
                condition number 2 of this schedule.
              </Type>
              <Type variant="h3" gutterBottom>
                Territory
              </Type>
              <Type paragraph>
                Within the Western Water System within Zone 6.
              </Type>
              {/* <RowBox justifyContent="space-between"> */}
              <Type variant="h3" gutterBottom>
                Rates
              </Type>
              {/* <Type variant="caption" gutterBottom>
                  <em>last updated : {'time'}</em>
                </Type> */}
              {/* </RowBox> */}
              <Type paragraph>
                Applicable rates for metered treated water service includes a
                monthly Fixed Charge which is based upon the size of the
                customer's meter, a monthly Renewal and Replacement Charge which
                is based upon the size of the customer's meter up to 8-inch or
                the number of Units of Capacity delivered on peak day for resale
                customer's with meters 8-inches and larger, and a Commodity
                Charge based upon the volume of water delivered. A Unit of
                Capacity, formerly known as an equivalent dwelling unit, shall
                be a 5/8-inch meter with a peak day demand of 1,150 gallons.
              </Type>
              <Type paragraph>
                These rates below are based on a perfect 30 days, each billing
                cycle can range from 25-35 days
              </Type>
            </article>
            <Box mt={3}>
              <Type variant="h4">Fixed Rates</Type>
            </Box>
            <Box mt={3} mb={6}>
              <TableLayoutRow>
                <TableLayoutBox>
                  <TableContainer>
                    <Type
                      variant="h6"
                      id="fixedChargeTableTitle"
                      className={classes.tableTitle}
                    >
                      Fixed Charge
                    </Type>
                    <Box className={classes.tableWrapper}>
                      <Table
                        aria-label="Fixed Rates Fixed Charges Table"
                        aria-labelledby="fixedChargeTableTitle"
                        size="small"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell>Meter Size</TableCell>
                            <TableCell align="right">
                              Per Meter Per Month
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {fixedRows.map((row) => (
                            <TableRow key={row.tier}>
                              <TableCell component="th" scope="row">
                                {row.tier}
                              </TableCell>
                              <TableCell align="right">
                                {costFrmt(row.cost)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </TableContainer>
                </TableLayoutBox>
                <TableLayoutBox>
                  <TableContainer>
                    <Type
                      variant="h6"
                      id="renewAndReplacementChargeTableTitle"
                      className={classes.tableTitle}
                    >
                      Renewal and Replacement Charge
                    </Type>
                    <Box className={classes.tableWrapper}>
                      <Table
                        aria-label="Fixed Rates Renewal and Replacement Charges Table"
                        aria-labelledby="renewAndReplacementChargeTableTitle"
                        size="small"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell>Meter Size</TableCell>
                            <TableCell align="right">
                              Per Meter Per Month
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {renewAndReplacementRows.map((row) => (
                            <TableRow key={row.tier}>
                              <TableCell component="th" scope="row">
                                {row.tier}
                              </TableCell>
                              <TableCell align="right">
                                {costFrmt(row.cost)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </TableContainer>
                </TableLayoutBox>
              </TableLayoutRow>
            </Box>

            {/* <Box mt={3} mb={6}>
              <Type variant="h4" gutterBottom>
                Multiple Dwelling Units
              </Type>
              <Box
                bgcolor={theme.palette.common.white}
                p={3}
                boxShadow={3}
                mt={3}
              >
                <Type paragraph variant="body2">
                  For Multiple Dwelling Unit Service, (e.g. apartments and
                  mobile home parks) the Monthly Fixed Charge shall be based on
                  number of dwelling units served, plus a fixed per meter
                  charge:
                </Type>
                <Box width={{xs: '100%', sm: '53%', md: '40%'}}>
                  <RowBox justifyContent="space-between">
                    <ChildBox>{fixedChargeMDU[0].tier}:</ChildBox>
                    <ChildBox>{costFrmt(fixedChargeMDU[0].cost)}</ChildBox>
                  </RowBox>
                  <RowBox justifyContent="space-between">
                    <ChildBox>{fixedChargeMDU[1].tier}:</ChildBox>
                    <ChildBox>{costFrmt(fixedChargeMDU[1].cost)}</ChildBox>
                  </RowBox>
                </Box>
              </Box>
                  </Box> */}

            <Box mt={3}>
              <Type variant="h4">Commodity Rates</Type>
            </Box>
            <Box mt={3} mb={6}>
              <TableLayoutRow>
                <TableLayoutBox>
                  <TableContainer>
                    <Type
                      variant="h6"
                      id="commodityResidentialChargeTableTitle"
                      className={classes.tableTitle}
                    >
                      Metered Residential Service
                    </Type>
                    <Box className={classes.tableWrapper}>
                      <Table
                        aria-label="Commodity Rates - Metered Residential Service Charges Table"
                        aria-labelledby="commodityResidentialChargeTableTitle"
                        size="small"
                      >
                        <caption>Commodity in Cubic Feet</caption>
                        <TableHead>
                          <TableRow>
                            <TableCell>Tier</TableCell>
                            <TableCell align="right">Cost</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {commodityResidentialRows.map((row) => (
                            <TableRow key={row.tier}>
                              <TableCell component="th" scope="row">
                                {row.tier}
                              </TableCell>
                              <TableCell align="right">
                                {costFrmt(row.cost)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </TableContainer>
                </TableLayoutBox>
                <TableLayoutBox>
                  <TableContainer>
                    <Type
                      variant="h6"
                      id="commodityNonResidentialChargeTableTitle"
                      className={classes.tableTitle}
                    >
                      Metered Non-Residential Service
                    </Type>
                    <Box className={classes.tableWrapper}>
                      <Table
                        aria-label="Commodity Rates - Metered Non-Residential Service Charges Table"
                        aria-labelledby="commodityNonResidentialChargeTableTitle"
                        size="small"
                      >
                        <caption>Commodity in Cubic Feet</caption>
                        <TableHead>
                          <TableRow>
                            <TableCell>Tier</TableCell>
                            <TableCell align="right">Cost</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {commodityNonResidentialRows.map((row) => (
                            <TableRow key={row.tier}>
                              <TableCell component="th" scope="row">
                                {row.tier}
                              </TableCell>
                              <TableCell align="right">
                                {costFrmt(row.cost)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </TableContainer>
                </TableLayoutBox>
                <TableLayoutBox>
                  <TableContainer>
                    <Type
                      variant="h6"
                      id="commodityDeprivedChargeTableTitle"
                      className={classes.tableTitle}
                    >
                      Customers Involuntarily Deprived of Untreated Water
                      Service
                    </Type>
                    <Box className={classes.tableWrapper}>
                      <Table
                        aria-label="Commodity Rates - Customers Involuntarily Deprived of Untreated Water Service Charges Table"
                        aria-labelledby="commodityDeprivedChargeTableTitle"
                        size="small"
                      >
                        <caption>Commodity in Cubic Feet</caption>
                        <TableHead>
                          <TableRow>
                            <TableCell>Tier</TableCell>
                            <TableCell align="right">Cost</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {commodityDeprivedRows.map((row) => (
                            <TableRow key={row.tier}>
                              <TableCell component="th" scope="row">
                                {row.tier}
                              </TableCell>
                              <TableCell align="right">
                                {costFrmt(row.cost)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </TableContainer>
                </TableLayoutBox>
              </TableLayoutRow>

              <Box mt={6}>
                <FancyButton
                  variant="contained"
                  hoverText="View PDF"
                  target="_blank"
                  color="secondary"
                  rel="noopener noreferrer"
                  href="https://docs.pcwa.net/pcwa-rules-and-regs.pdf"
                >
                  2023 Rules and Regulations
                </FancyButton>
              </Box>
            </Box>
          </Box>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export default WaterRatesPage
