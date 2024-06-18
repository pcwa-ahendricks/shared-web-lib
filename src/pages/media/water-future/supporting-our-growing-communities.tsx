import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {Box, Divider, Typography as Type} from '@mui/material'
import {FadeInToTopIntersect} from '.'
import Spacing from '@components/boxes/Spacing'

export default function SupportingOurGrowingFuturePage() {
  return (
    <PageLayout title="Supporting Our Growing Communities" waterSurface>
      <MainBox>
        <NarrowContainer>
          {/* <PageTitle
            titleProps={{
              variant: 'h2'
            }}
            title="Empowering Our Water Future: PCWA's Role in Supporting our Growing
            Communities"
          /> */}
          <PageTitle title="Empowering Our Water Future" hideDivider />
          <Type sx={{mt: 1}} variant="h3" color="primary">
            PCWA's Role in Supporting our Growing Communities
          </Type>
          <Box sx={{my: 4}}>
            <Divider />
          </Box>
          <Type variant="h4">
            General Manager's Report
            <br /> By Andrew Fecko
          </Type>
          <Spacing />

          <FadeInToTopIntersect animateKey="water-future-txt1">
            <Type paragraph>
              Recent polling of Placer County residents revealed something that
              surprised me: A majority of the county’s residents think we don’t
              have enough water to meet future needs. So, I want to set the
              record straight.
            </Type>
            <Type paragraph>
              We have plenty of water to serve both existing customers and
              future planned growth — there’s enough water to meet all the
              general needs of the residents and businesses we serve. This is
              thanks to PCWA’s high-priority water rights on the American River
              and our careful stewardship of that precious resource.
            </Type>
            <Type paragraph>
              What we do need more of, however, is more treatment capacity and
              the pipelines to deliver water where it’s needed by the homes and
              businesses under construction in our communities.
            </Type>

            <Type paragraph>
              Thankfully, there are vital, new water infrastructure projects
              already in the works. Our planning experts at PCWA are constantly
              assessing expected growth in the county and adjusting our
              infrastructure plan to ensure we have the budget, materials, and
              people to get them done. I’ll tell you more about a few big
              projects.
            </Type>
            <Type paragraph>
              First, it’s important to make two things clear. PCWA is not a land
              management agency. We don’t have any role in approving or denying
              new development in the county. Our only role is to ensure there’s
              enough water to serve planned growth, and then to deliver that
              water where it’s needed.
            </Type>
          </FadeInToTopIntersect>
          <FadeInToTopIntersect animateKey="water-future-txt2">
            <Type paragraph>
              Second, our existing customers pay nothing for the new water
              infrastructure that serves new residents. Instead, those new
              residents pay one-time connection charges to fund the new
              facilities that serve future water needs. This connection charge
              varies according to many factors, including lot size, location,
              and necessary infrastructure.
            </Type>
            <Type paragraph>
              Monthly water rates paid by our customers are strictly to fund
              ongoing operations and maintenance for existing customers, plus
              the amount of water delivered through their connections.{' '}
            </Type>
            <Type paragraph>
              The communities of West Placer County are growing rapidly,
              including Roseville, Rocklin, Loomis, and Lincoln. This presents
              challenges, of course, but also opportunities. It feeds the demand
              for housing, creates jobs, and inspires opportunity among people
              young and old who see Placer County as we do--a great place to
              live and work. PCWA has a vital role to play in supporting those
              dreams.
            </Type>
            <Type paragraph>
              One of the big projects we’re working on to serve that growth is a
              new water treatment plant. This plant, part of a larger program
              we’re calling the Ophir Project, will be located on the western
              flank of the city of Auburn, close to our existing American River
              canyon raw-water pump and pipeline infrastructure. The Ophir
              Project has been in the works for decades, and the Ophir Water
              Treatment Plant is the final step to bringing our American River
              water to customers’ homes.
            </Type>
          </FadeInToTopIntersect>
          <FadeInToTopIntersect animateKey="water-future-txt3">
            <Type paragraph>
              The Ophir plant is in its planning phase and construction is
              expected to start in 2025. Initially, the plant will have a
              capacity to treat 10 million gallons of water per day (MGD) and is
              designed to be enlarged in two steps, eventually reaching full
              capacity at 30 MGD.
            </Type>
            <Type paragraph>
              But a new plant like this can’t contribute to the system without
              pipelines to deliver its water where it’s needed. So those
              projects are in the works, too. We’ve completed a cornerstone
              pipeline, which will link the new Ophir plant with our existing
              Foothill plant, and the plumbing network it serves.
            </Type>
            <Type paragraph>
              Additional new pipelines are planned to deliver Ophir’s treated
              water to the developing Bickford Ranch community near Lincoln, the
              Placer One community near Roseville, and other new communities in
              between. Our plan includes new water storage tanks along these
              pipeline routes to ensure adequate pressure and supply.
            </Type>
            <Type paragraph>
              These projects are just part of our long-range infrastructure
              plan. We continue to build upon the foundation for reliability
              today while anticipating the needs for tomorrow.
            </Type>
            <Type paragraph>
              In summary: Yes, we have water to serve the growth that’s coming.
              And we’re working diligently to get that water where it’s needed.
              It’s a big job, and it’s a job we take seriously to maintain the
              quality of life current and future generations can enjoy.
            </Type>
          </FadeInToTopIntersect>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}
