// cspell:ignore bgcolor
import React, {useCallback} from 'react'
import {
  Typography as Type,
  Box,
  Divider,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow
} from '@material-ui/core'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {RespRowBox, ChildBox, RowBox} from '@components/boxes/FlexBox'
// import {useTheme} from '@material-ui/core/styles'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme
} from '@material-ui/core/styles'
import {BoxProps} from '@material-ui/core/Box'

function createData(tier: string, cost: number) {
  return {tier, cost}
}

const fixedRows = [
  createData('5/8-inch', 18.55),
  createData('3/4-inch', 26.02),
  createData('1-inch', 40.97),
  createData('1-1/2-inch', 78.33),
  createData('2-inch', 123.17),
  createData('3-inch', 265.15),
  createData('4-inch', 451.96),
  createData('6-inch', 1012.42),
  createData('8-inch', 1199.23)
]

const renewAndReplacementRows = [
  createData('5/8-inch', 18.36),
  createData('3/4-inch', 27.54),
  createData('1-inch', 45.9),
  createData('1-1/2-inch', 91.8),
  createData('2-inch', 146.89),
  createData('3-inch', 321.32),
  createData('4-inch', 550.83),
  createData('6-inch', 1239.36),
  createData('8-inch', 1468.87)
]

const commodityResidentialRows = [
  createData('First 900 CF (per 100 CF)', 1.52),
  createData('Next 1,900 CF (per 100 CF)', 1.72),
  createData('Next 2,800 CF (per 100 CF)', 1.84)
]

const commodityNonResidentialRows = [
  createData('Commercial (per 100 CF)', 1.62),
  createData('Landscape (per 100 CF)', 1.72),
  createData('Industrial / Resale (per 100 CF)', 0.4)
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
        mt={flexTopMargin}
        {...rest}
      >
        {children}
      </ChildBox>
    )
  }

  const TableLayoutRow = ({children, ...rest}: BoxProps) => {
    return (
      <RowBox
        flexSpacing={flexLeftMargin}
        flexWrap="wrap"
        mt={-flexTopMargin}
        flexDirection={{xs: 'column', sm: 'row'}}
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
          <RespRowBox flexSpacing={8}>
            <ChildBox flex={{xs: '100%', sm: '60%'}}>
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
            <ChildBox
              flex="auto"
              m={{xs: 'auto', sm: 0}} // Center image in small layouts.
              ml={{xs: 'auto', sm: 4}} // xs: auto will center image in small layouts.
              maxWidth={{xs: '60vw', sm: 'inherit'}} // Don't let portrait image get too big in small layouts.
            >
              <LazyImgix
                src="https://cosmicjs.imgix.net/ad139f00-6b41-11e7-b267-0b654f5c65d5-water-rates.jpg"
                htmlAttributes={{
                  alt: 'A photo of plants receiving water from a watering can',
                  style: {width: '100%'}
                }}
              />
            </ChildBox>
          </RespRowBox>
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
              <Type variant="h3" gutterBottom>
                Rates
              </Type>
              <Type paragraph>
                Applicable rates for metered treated water service includes a
                monthly Fixed Charge which is based upon the size of the
                customer’s meter, a monthly Renewal and Replacement Charge which
                is based upon the size of the customer’s meter up to 8-inch or
                the number of Units of Capacity delivered on peak day for resale
                customer’s with meters 8-inches and larger, and a Commodity
                Charge based upon the volume of water delivered. A Unit of
                Capacity, formerly known as an equivalent dwelling unit, shall
                be a 5/8-inch meter with a peak day demand of 1,150 gallons.
              </Type>
            </article>
            <Box mt={3}>
              <Type variant="h4">Fixed Rates</Type>
            </Box>
            <Box mt={4} mb={6}>
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

            <Box mt={3}>
              <Type variant="h4">Commodity Rates</Type>
            </Box>
            <Box mt={4} mb={6}>
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
                      id="renewAndReplacementChargeTableTitle"
                      className={classes.tableTitle}
                    >
                      Metered Non-Residential Service
                    </Type>
                    <Box className={classes.tableWrapper}>
                      <Table
                        aria-label="Commodity Rates - Metered Non-Residential Service Charges Table"
                        aria-labelledby="renewAndReplacementChargeTableTitle"
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
                      id="renewAndReplacementChargeTableTitle"
                      className={classes.tableTitle}
                    >
                      Customers Involuntarily Deprived of Untreated Water
                      Service
                    </Type>
                    <Box className={classes.tableWrapper}>
                      <Table
                        aria-label="Commodity Rates - Metered Non-Residential Service Charges Table"
                        aria-labelledby="renewAndReplacementChargeTableTitle"
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
              </TableLayoutRow>
            </Box>
          </Box>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export default WaterRatesPage
