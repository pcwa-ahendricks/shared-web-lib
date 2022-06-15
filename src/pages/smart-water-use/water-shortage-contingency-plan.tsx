import React from 'react'
import {Typography as Type, Link, Box} from '@material-ui/core'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import Spacing from '@components/boxes/Spacing'

const WaterShortageContingencyPlan = () => {
  // const classes = useStyles()
  // const theme = useTheme()
  // const isMDUp = useMediaQuery(theme.breakpoints.up('md'))

  // const TypeBullet = ({children, ...rest}: TypographyProps<'li'>) => {
  //   return (
  //     <Type component="li" className={classes.bulletLi} {...rest}>
  //       {children}
  //     </Type>
  //   )
  // }

  return (
    <PageLayout title="Water Shortage Contingency Plan">
      <MainBox>
        <NarrowContainer>
          <PageTitle
            title="Water Shortage Contingency Plan"
            subtitle="Smart Water Use"
          />
          <Spacing />
          <Type variant="h4" color="primary" gutterBottom>
            PCWA's Water Shortage Contingency Plan outlines actions the agency
            and customers should take during drought or a water shortage
            emergency.
          </Type>
          <Type paragraph>
            You can find the full plan{' '}
            <Link
              aria-label="link to PCWA's Water Shortage Contingency Plan document"
              variant="inherit"
              href="https://docs.pcwa.net/pcwa-water-shortage-contingency-plan"
              rel="noopener noreferrer"
              target="_blank"
            >
              here
            </Link>
            .
          </Type>
          <Type paragraph>
            Per the State Water Resources Control Board's emergency regulations
            adopted on May 24, 2022, PCWA has moved to Stage 2 of its Water
            Shortage Contingency Plan.
          </Type>
          <Type paragraph>
            Stage 1 “Heighten Water Use Efficiency” - 10% Conservation -The
            following best practices are voluntary and will be reinforced
            through local and regional public education and awareness measures
            that may be funded in part by PCWA.
          </Type>
          <Spacing />
          <Box component="ol">
            <Type component="li">
              Wash only full loads when washing dishes or clothes.
            </Type>
            <Type component="li">Use pool covers to minimize evaporation.</Type>
            <Type component="li">
              Upgrade to water efficient indoor and outdoor fixtures when
              possible.
            </Type>
            <Type component="li">
              Fix leaks or faulty sprinklers within 72 hours of occurrence or
              time of discovery.
            </Type>
            <Type component="li">
              Decorative water features must recirculate and shall be leak
              proof.
            </Type>
            <Type component="li">
              Water shall be confined to the customer's property and shall not
              be allowed to run off to adjoining property, roadside,
              non-irrigated areas, private and public walkways, roadways,
              parking lots, ditch or gutter or any other impervious service.
              Care shall be taken not to water past the point of soil
              saturation.
            </Type>
            <Type component="li">
              No landscape watering shall occur during rain/snow events or
              within 48 hours after a ¼” or more of rainfall/snowfall.
            </Type>
            <Type component="li">
              Automatic shut-off devices shall be installed on any hose or
              filling apparatus in use.
            </Type>
            <Type component="li">
              Unauthorized use of hydrants shall be prohibited. Authorization
              for use must be obtained from PCWA.
            </Type>
            <Type component="li">
              Commercial, industrial, institutional equipment must be properly
              maintained and in proper working order.
            </Type>
            <Type component="li">
              Hotels and motels shall provide guests with the option of choosing
              not to have towels and linens laundered. The hotel or motel shall
              prominently display notice of this option in each bathroom using
              clear and easily understood language.
            </Type>
            <Type component="li">
              Restaurants shall serve water to customers only upon request.
            </Type>
            <Type component="li">
              All new landscaping shall, at a minimum, adhere to the
              specifications outlined in the State's Model Water Efficient
              Landscape Ordinance adopted by the California Department of Water
              Resources or specifications of any land use jurisdiction in
              effect. Link to ordinance here: Model Water Efficient Landscape
              Ordinance.
            </Type>
          </Box>
          <Type paragraph>
            Stage 2 - “Water Conservation”, up to 20% Conservation - In addition
            to the above, the following actions are mandatory during Stage 2.
          </Type>
          <Spacing />
          <Box component="ol">
            <Type component="li">
              Resale water suppliers to which PCWA provides water are advised to
              implement conservation measures comparable to those adopted by
              PCWA, to achieve the same level conservation. Coordinated
              messaging will be important to achieve regional requirements
              imposed by the state.
            </Type>
            <Type component="li">
              Landscapes shall only be watered between the hours of 7:00 p.m.
              and 7:00 a.m. to reduce evaporation. Plant containers, trees,
              shrubs, and vegetable gardens may be watered outside of this
              watering timeframe if using only drip irrigation, hand watering,
              or smart controller systems.
            </Type>
            <Type component="li">
              Turf watering shall be limited to a maximum of three days per week
              during the months of July, August, and September, a maximum of two
              days per week in April, May, June, October and November, and shall
              not be watered during the remaining winter months unless PCWA
              notifies customers that watering is allowed due to unseasonably
              and extended dry conditions. Plant containers, trees, shrubs and
              vegetable gardens may be watered any day when using drip
              irrigation, hand watering or smart controller systems.
            </Type>
            <Type component="li">
              Washing down impervious surfaces such as driveways and sidewalks
              shall be prohibited unless necessary for public health and safety
              purposes.
            </Type>
            <Type component="li">
              Non-essential flushing of mains and fire hydrants shall be
              prohibited.
            </Type>
          </Box>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default WaterShortageContingencyPlan
