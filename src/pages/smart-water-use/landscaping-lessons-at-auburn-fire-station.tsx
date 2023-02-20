import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {Typography as Type, Link, Box, Paper} from '@material-ui/core'
import NextLink from 'next/link'
import {ChildBox, RowBox} from 'mui-sleazebox'

export default function BasicTemplatePage() {
  return (
    <PageLayout title="Page Template" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle
            title="Problem Lawn Turns into Visible Lesson in Fire-Wise, Water-Wise Landscaping at Auburn Fire Station"
            subtitle="Smart Water Use"
          />
          <RowBox responsive flexSpacing={12}>
            <ChildBox flex="70%">
              <Type paragraph>
                A problematic lawn at an old Auburn fire station is becoming a
                visible lesson in fire-wise landscaping. Not only will the newly
                planted shrubs and ground covers save water and money, they'll
                also directly help the firefighters.
              </Type>
              <Type paragraph>
                Using{' '}
                <NextLink passHref href="/smart-water-use/rebate-programs">
                  <Link>rebates offered by the Placer County Water Agency</Link>
                </NextLink>{' '}
                to help cover costs, the fire station makeover serves as an
                example of how businesses and residents can use their
                landscaping to help protect their property from fire danger
                while also illustrating the beautiful benefits of water-wise
                plants.
              </Type>
            </ChildBox>
            <ChildBox flex="30%" marginBottom={4}>
              <Paper>
                <Box p={2}>
                  <Type variant="subtitle2" gutterBottom>
                    WaterWise & FireWise Plant List
                  </Type>
                  <Type variant="body2">
                    See the{' '}
                    <Link
                      href="https://docs.pcwa.net/maidu-fire-station-landscape-plants.pdf"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Landscape Plan and Plant List
                    </Link>{' '}
                    for the Auburn Fire Department makeover
                  </Type>
                </Box>
              </Paper>
            </ChildBox>
          </RowBox>
          <Type paragraph>
            On a high-profile corner just off Highway 49, Auburn Fire Station
            No. 1 at 485 High St. is no longer staffed. Instead, it serves as a
            meeting center for departmental training and special events.
          </Type>
          <Type paragraph>
            With an eye out for fire danger, the new landscape “hardens” the
            building, helping protect it from embers that can travel miles. In
            the Sierra foothills, any structure can be threatened by wildfire –
            especially during times of drought.
          </Type>
          <Type paragraph>
            In addition, the new landscape will save the Auburn firefighters
            many hours every month. Firefighters are responsible for mowing
            their station's lawns.
          </Type>
          <Type paragraph>
            “That's another benefit for our firefighters—no lawn maintenance,”
            says Battalion Chief Robert Zaucha of the Auburn Fire Department.
            “We're custodians of our stations and responsible for their upkeep.
            Before (the conversion), they were out there once a week, mowing a
            mostly dead lawn.”
          </Type>
          <Type paragraph>
            The new landscape will be easy care. “It’s all low-water vegetation,
            set up on drip irrigation with a smart controller,” Zaucha says.
            “It’s so much easier (than lawn maintenance) and it’s going to look
            better than the old grass. For years down the road, it will look
            nice.”
          </Type>
          <Type paragraph>
            Across from a pizza parlor, the High Street station gets many
            passersby. “Its location is very visible with a lot of traffic,”
            Zaucha notes. “It was surrounded by all grass and, with the drought,
            it was very brown. The green sections were crabgrass or
            Bermudagrass. That was the only thing growing; everything else was
            dead.”
          </Type>
          <Type paragraph>
            This is the Auburn Fire Department’s second station makeover. A 2019
            fire-wise/water-wise{' '}
            <NextLink
              passHref
              href="/smart-water-use/maidu-fire-station-makeover"
            >
              <Link>landscape conversion of the Auburn Maidu Fire Station</Link>
            </NextLink>{' '}
            provided both inspiration to the department and Auburn residents.
            The old thirsty lawn that surrounded that station was replaced with
            more than 100 flowering shrubs and ground covers in a project
            spearheaded by two Boy Scouts.
          </Type>
          <Type paragraph>
            Supporting birds and bees, the flower-filled landscape also
            demonstrated the basics of “firescaping”—landscaping with an eye out
            for fire prevention. While no plant is “fire proof,” some species
            are less likely to burn or provide fuel for wildfires. For example,
            plants with waxy leaves can resist hot embers. Succulents don’t
            burn; they turn to mush. In firescaping, it’s not only the plant
            varieties but where they’re planted. At both locations, the fire
            station makeovers followed the basics of firescaping.
          </Type>
          <Type paragraph>
            To help harden the building against hot embers, no plants or
            flammable material (such as wood fencing) is allowed within 5 feet
            of structures. Instead, buildings are ringed by gravel, decomposed
            granite or hardscape. “A grapestake fence is like a row of kindling
            attached to your house,” notes Zaucha.
          </Type>
          <Type paragraph>
            Rather than in straight rows, low-growing plants are grouped into
            well-spaced islands with walkways or more gravel separating the
            beds. Those walkways form fire breaks between the beds and help
            create what’s known as “defensible space.”
          </Type>
          <Type paragraph>
            A rebate reminder to PCWA customers got the fire department thinking
            about the High Street station.
          </Type>
          <Type paragraph>
            “We said, ‘Let’s get rid of the lawn and do something water wise,’”
            Zaucha says. “It really is a win-win. We’re reducing our water use
            significantly. For us, we’re showcasing fire-wise landscaping. It
            shows fire-wise doesn’t mean barren but can be beautiful. And it’s
            less work.”
          </Type>
          <Type paragraph>
            <Link
              href="https://www.yamasaki-la.com/about"
              rel="noopener noreferrer"
              target="_blank"
            >
              Jeff Ambrosia of Yamasaki Landscape Architecture
            </Link>{' '}
            in Auburn handled the conversions at both fire stations. The hardest
            part? Removing the weedy old lawn.
          </Type>
          <Type paragraph>
            “It takes a lot of effort to make sure you eradicate it,” Ambrosia
            explains. “Bermudagrass roots grow 6 feet deep. You can’t just till
            it; you’ve got to kill it.”
          </Type>
          <Type paragraph>
            While a more natural method using{' '}
            <Link
              href="https://www.lawntogarden.org/how-to-sheet-mulch"
              rel="noopener noreferrer"
              target="_blank"
            >
              sheet mulching
            </Link>{' '}
            is preferred, sometimes herbicides are the only option. Otherwise,
            the Bermudagrass will overwhelm the new landscaping before it can
            become established. Over five weeks, Ambrosia used three
            applications of herbicide, irrigating the weeds between each
            application so the plants would absorb it.
          </Type>
          <Type paragraph>
            Once the Bermudagrass was really dead, it could be rototilled under.
            Before planting the new landscape, Ambrosia amended the soil with
            nutrient-rich compost and installed drip irrigation.
          </Type>
          <Type paragraph>
            The High Street fire station site is small, so the landscaping is
            relatively simple. Decomposed granite and gravel will separate the
            newly transplanted shrubs.
          </Type>
          <Type paragraph>
            The same concept can be converted to other business or home
            landscapes. Ambrosia’s picks for fire-wise, water-wise landscaping
            include such flower-filled shrubs as butterfly bush, rockrose,
            cotoneaster, mahonia, nandina, Russian sage, spiraea and lilac.
            Yarrow, daylilies, lupines and salvias also work well.
          </Type>
          <Type paragraph>
            “This was an opportunity to show the community that you can plant
            something that’s still beautiful that’s water wise and fire wise,”
            Ambrosia says. “Defendable space is a really important concept.
            People are starting to take it seriously.”
          </Type>
          <Type paragraph>
            Says PCWA Deputy Director of Customer Services Linda Higgins, “We’re
            excited to share the Maidu and now the Auburn Fire stations as
            examples of Fire- Wise, Water-Wise landscaping, which is so critical
            for residents and businesses, as we continue to rebuild after last
            year’s Mosquito Fire.”
          </Type>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}
