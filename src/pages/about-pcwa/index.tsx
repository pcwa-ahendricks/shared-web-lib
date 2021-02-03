// cspell:ignore Einar Maisch
import React from 'react'
import {
  Box,
  Divider,
  Typography as Type,
  List,
  ListItem
} from '@material-ui/core'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import ShowMore from '@components/ShowMore/ShowMore'
import MainPhone from '@components/links/MainPhone'
import {ChildBox, RowBox} from '@components/boxes/FlexBox'
import PageTitle from '@components/PageTitle/PageTitle'
import NarrowContainer from '@components/containers/NarrowContainer'
import {blueGrey} from '@material-ui/core/colors'
import ImgixFancyParallaxBanner from '@components/ImgixFancyParallaxBanner/ImgixFancyParallaxBanner'
import GeneralManagerEmail from '@components/links/GeneralManagerEmail'
import PublicAffairsEmail from '@components/links/PublicAffairsEmail'
import ResponsiveYouTubePlayer from '@components/ResponsiveYouTubePlayer/ResponsiveYouTubePlayer'
import ClerkToBoardPhone from '@components/links/ClerkToBoardPhone'
import PublicAffairsPhone from '@components/links/PublicAffairsPhone'

const images = [
  'https://cosmicjs.imgix.net/85146240-6cdc-11e7-9add-5dda20e48e6e-HH_Vista_-_EL.jpg'
] as const
const [bannerImgSrc] = images

// const useStyles = makeStyles(() =>
//   createStyles({
//   })
// )

const GeneralInfoPage = () => {
  // const classes = useStyles()
  // const theme = useTheme<Theme>()

  return (
    <PageLayout title="About PCWA" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle title="About PCWA" subtitle="General" />
        </WideContainer>

        <NarrowContainer
          // pl={{xs: 3, sm: 6, md: 12}}
          // pr={{xs: 3, sm: 6, md: 12}}
          pt={{xs: 2, sm: 4, md: 6}}
          pb={{xs: 2, sm: 4, md: 6}}
          containerProps={{mt: 4, mb: 4, bgcolor: blueGrey[50]}}
        >
          <Type variant="h4">
            <span style={{lineHeight: '1.5', color: '#334850'}}>
              Placer County Water Agency (PCWA) is the primary water resource
              agency for Placer County, California, with a broad range of
              responsibilities including water resource planning and management,
              retail and wholesale supply of drinking water and irrigation
              water, and production of hydroelectric energy.
            </span>
          </Type>
        </NarrowContainer>

        <WideContainer>
          <RowBox responsive alignItems="center" mt={4} flexSpacing={4}>
            <ChildBox
              flex="1 1 50%"
              pl={{xs: 2, sm: 4, md: 8, lg: 12}}
              pr={{xs: 2, sm: 4, md: 8, lg: 12}}
            >
              <Type variant="subtitle1" align="center" color="primary">
                <span style={{fontWeight: 500}}>
                  Watch "Where Does Our Water Come From? Part 1" featured on the
                  PCWA YouTube Channel
                </span>
              </Type>
            </ChildBox>
            <ChildBox flex="1 1 50%" display="flex">
              <Box maxWidth={400} mx="auto" width="100%">
                <ResponsiveYouTubePlayer
                  controls
                  url="https://www.youtube.com/watch?v=QXPtUgeWnc4"
                  config={{
                    youtube: {
                      playerVars: {showinfo: 1}
                    }
                  }}
                />
              </Box>
            </ChildBox>
          </RowBox>
        </WideContainer>

        <RowBox justifyContent="space-around">
          <Box mt={12} maxWidth={1400} flex="1 1 auto">
            <ImgixFancyParallaxBanner
              amount={0.1}
              ImageProps={{
                width: 800,
                height: 533,
                priority: true,
                src: bannerImgSrc,
                alt: 'Photo of Hell Hole Reservoir'
              }}
              style={{
                height: '50vw',
                maxHeight: '55vh'
              }}
            />
          </Box>
        </RowBox>

        <WideContainer>
          <Box mt={10}>
            <ShowMore
              inMaxHeight={400}
              outMaxHeight={7000}
              inShowMoreTitle="Click to read more"
              outShowMoreTitle="Click to read less"
            >
              <article>
                <Type variant="h2" color="primary" gutterBottom>
                  Overview Of The Placer County Water Agency
                </Type>
                <Box mt={3} mb={3}>
                  <Divider />
                </Box>
                <Type paragraph>
                  Placer County Water Agency (PCWA) was created through an Act
                  of the California State Legislature in 1957. PCWA’s
                  jurisdiction encompasses the entire County of Placer, and it
                  is governed by an elected five-member Board of Directors.
                </Type>
                <Type variant="h4" gutterBottom>
                  History of PCWA Energy and Water Development - Development of
                  the Middle Fork American River Project:
                </Type>
                <Type paragraph>
                  The immediate objective for the formation of the Agency was to
                  preserve Placer County’s rich water resources for our future
                  generations and protect these local benefits from development
                  and exportation by other interests, as was occurring elsewhere
                  in the state. It was at this time that San Francisco, Oakland,
                  Los Angeles, and the federal and state governments, were
                  building reservoirs in water-rich areas of California and
                  aqueducts to move that water to supply new farmlands and
                  growing coastal cities.
                </Type>
                <Type paragraph>
                  A bond measure to fund construction of the proposed Middle
                  Fork American River Hydroelectric Project (MFP), backed by a
                  50-year PG&E contract for the energy output, passed by a vote
                  of 25 to 1 and within 10 years of its formation, PCWA
                  completed construction. The MFP’s reservoirs can store up to
                  340,000 acre-feet of water and its generators produce an
                  average of 1.1 million megawatt hours of energy per year -
                  enough clean energy to supply 240,000 homes.
                </Type>
                <Type variant="h4" gutterBottom>
                  The Gold Rush Water Supply:
                </Type>
                <Type paragraph>
                  By 1855, just 7 years after gold was discovered at Sutter’s
                  Mill, miners had built over 175 miles of canals in Placer
                  County to provide the water needed for hydraulic mining. But
                  hydraulic mining was soon outlawed and by 1910, PG&E had
                  purchased the system that brought water from the South Fork
                  Yuba River across western Placer County and began installing
                  hydroelectric generators to power a new system of
                  electrification.
                </Type>
                <Type paragraph>
                  PG&E also found a growing market supplying water to west
                  Placer agriculture. Because of its developed water supply,
                  Placer County was the richest agricultural producing county in
                  the state in the 1920-40s, supplying fresh fruit to New York
                  over the continental railroad.
                </Type>
                <Type paragraph>
                  Gradually there was growing recognition that communities
                  needed to treat their drinking water to prevent disease. The
                  earliest systems, which consisted of settling ponds and
                  chlorination, using PG&E supplied water, were installed by
                  Lincoln and Roseville to supply their cities’ residents. By
                  the late 1940s, PG&E built more modern filtered water systems
                  to supply its retail customers in Rocklin, Loomis, Penryn, and
                  Auburn.
                </Type>
                <Type variant="h4" gutterBottom>
                  PCWA Takes Over the PG&E Water System:
                </Type>
                <Type paragraph>
                  The 1950-60s brought growing mutual dissatisfaction between
                  PG&E and its water customers. PG&E was far more interested in
                  its profitable energy businesses, while increasing water
                  safety regulations were adding costs and liability to their
                  water enterprises. PG&E decided it wanted out of the retail
                  water business, and PCWA was asked by the community to take
                  over the responsibility.
                </Type>
                <Type paragraph>
                  In August 1967, a special election within PCWA’s newly formed
                  Zone 1 to authorize the sale of $2 million in revenue bonds
                  for the purchase of PG&E’s water system passed with 65% of the
                  vote.
                </Type>
                <Type paragraph>
                  Then in 1975, the voters in Zone 1 authorized additional debt
                  of $6 million to fund the construction of the Foothill Water
                  Treatment Plant (WTP) along with transmission lines that
                  permitted the Agency to interconnect the Foothill WTP with the
                  existing Sunset WTP, to extend wholesale treated water service
                  to the City of Lincoln, and to decommission Lincoln’s pond
                  treatment system and outdated water treatment plants in
                  Penryn, Loomis and Rocklin.
                </Type>
                <Type variant="h4" gutterBottom>
                  PCWA - Today
                </Type>
                <Type variant="h5" gutterBottom>
                  Water:
                </Type>
                <Type paragraph>
                  PCWA is the largest water purveyor in the county, serving more
                  than 41,000 retail treated water customers in its Western
                  Water System, which includes the original Zone 1 and extends
                  east from Auburn to the communities of Applegate, Colfax, and
                  Alta. PCWA continues to provide treated water on a wholesale
                  basis to the City of Lincoln – a service it has also extended
                  to California American Water Company for delivery west of
                  Roseville, and to several historic community systems in the
                  Loomis Basin. In addition, PCWA supplies water from its MFP to
                  the City of Roseville and San Juan Water District, which
                  operate their own treatment facilities. And PCWA continues to
                  operate 165 miles of canals, serving irrigation water for
                  pastures, orchards, rice fields, farms, ranches, golf courses,
                  and landscaping – continuing the heritage of Placer County’s
                  historic water delivery.
                </Type>
                <Type variant="h5" gutterBottom>
                  Energy:
                </Type>
                <Type paragraph>
                  PCWA’s MFP is the eighth largest public power project in
                  California. It has five interconnected hydroelectric power
                  plants, two major storage reservoirs (French Meadows and Hell
                  Hole) and twenty-four miles of tunnels. The MFP can generate,
                  at peak power, 224 megawatts.
                </Type>
                <Type paragraph>
                  The MFP is a workhorse of the real time California energy
                  management system. The California Independent System Operator
                  uses the flexible generation capacity of the MFP to help
                  regulate grid frequency as electric demand and solar output
                  changes throughout the day. And revenue from MFP generation
                  enables PCWA to supply reliable American River water to Placer
                  County residents at low cost.
                </Type>
                <Type paragraph>
                  The MFP also supports a wide range of recreational
                  opportunities including camping, fishing and boating
                  facilities at our mountain reservoirs, and whitewater sports
                  downstream of the project.
                </Type>
                <Type variant="h5" gutterBottom>
                  Stewardship:
                </Type>
                <Type paragraph>
                  The old cliché, “Whisky’s for drinking, and water’s for
                  fighting” is still true today. Southern California exhausted
                  its available water supply over 20 years ago. Since then they
                  have relied on stringent conservation requirements and
                  expensive recycling programs to continue to meet the water
                  needs of new development. In contrast, PCWA still has
                  sufficient reserved water supplies in its MFP system to meet
                  all of the county’s projected growth in demand for the next 30
                  years. This disparity in supply makes protecting Placer
                  County’s resources challenging.
                </Type>
                <Type paragraph>
                  Challenges include drought and increasing state-wide water
                  conservation requirements; climate change, with rising sea
                  levels threatening delta ecosystems and the proposed twin
                  delta tunnels to move Southern California intakes upstream and
                  increase water exports; new state-wide groundwater
                  sustainability requirements; and a proposed water tax to
                  improve water to disadvantaged San Joaquin Valley communities.
                  The list of real-time water issues in California today that
                  threaten our finances and local water supply reliability are
                  significant, and growing.
                </Type>
                <Type paragraph>
                  Plus, we have real needs right here in Placer County, where
                  several small mountain communities are struggling to keep
                  water supplies safe, reliable and affordable.
                </Type>
                <Type paragraph>
                  PCWA officials understand the complexities, interrelationships
                  and importance of sustaining reliable and affordable water and
                  energy for Placer County’s present and future needs. The
                  Agency is actively involved in numerous collaborative
                  partnerships, watershed stewardship, surface and groundwater
                  management, integrated water resource planning, and regional
                  infrastructure projects. Advocacy for Agency water
                  entitlements and energy resources for Placer County are at the
                  forefront of Agency-wide interests and activities.
                </Type>
                <Type paragraph>
                  Inquiries may be referred to the PCWA Customer Service Center
                  at <MainPhone />.
                </Type>
              </article>
            </ShowMore>
          </Box>

          <Box mt={6} mb={6}>
            <Divider />
          </Box>
          <Box mt={3}>
            <Type variant="h5">Key PCWA Contacts</Type>
            <List>
              <ListItem>
                <Type>
                  General Manager, Andy Fecko - <GeneralManagerEmail />
                </Type>
                <Type>
                  , <ClerkToBoardPhone />
                </Type>
              </ListItem>
              <ListItem>
                <Type>
                  Public Affairs Manager, Ross Branch - <PublicAffairsEmail />
                </Type>
                <Type>
                  , <PublicAffairsPhone />
                </Type>
              </ListItem>
            </List>
          </Box>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export default GeneralInfoPage
