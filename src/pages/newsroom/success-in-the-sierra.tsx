//cspell:ignore Merced usfs
import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import {stringify} from 'querystringify'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {
  Typography as Type,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Box
} from '@mui/material'
import Spacing from '@components/boxes/Spacing'
import {FlexBox} from 'mui-sleazebox'
import Blockquote from '@components/typography/Blockquote'
import Image from 'next/image'
import imgixLoader, {imgixUrlLoader} from '@lib/imageLoader'

const SuccessInTheSierraPage = () => {
  return (
    <PageLayout title="Success in the Sierra" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle title="Success in the Sierra" subtitle="Newsroom" />
          <Image
            priority
            loader={imgixLoader}
            layout="responsive"
            sizes="100vw"
            width={1080}
            height={720}
            src="c6e4fd40-30ae-11ea-96a7-8146ec741192-French-Meadows-Forest-Restoration-Project002.jpg"
            alt="French Meadows Forest Restoration Project in action"
          />
          <Spacing />

          <Type variant="h2" gutterBottom>
            French Meadows Partnership Completes its First Season of Work
          </Type>
          <article>
            <Type paragraph>
              After six months of strategic forest treatments near French
              Meadows Reservoir, partners of the French Meadows Forest
              Restoration Project (Project) are wrapping up their first season
              of implementation work. Located in the headwaters of the Middle
              Fork American River, in the Tahoe National Forest, the Project is
              one of the first instances of private and public interests coming
              together to fund and implement active forest management on public
              land.
            </Type>
            <Type paragraph>
              While completion of the Project is slated to take several more
              years, the conclusion of work this season is the culmination of
              years of planning, preparation, and partnership.
            </Type>
            <Spacing />
            <FlexBox>
              <Box
                m="auto"
                width="100%" // Setting width makes the image re-expand when window width resizes to a larger width from a smaller narrow width.
                height={{xs: 300, sm: 450}}
                overflow="hidden"
                position="relative"
              >
                <Image
                  src="c2f41400-30ae-11ea-96a7-8146ec741192-French-Meadows-ReservoirPCWA004.jpg"
                  alt="Aerial view of French Meadows Reservoir"
                  objectPosition="center top"
                  objectFit="none"
                  width={1080}
                  height={1166}
                  loader={imgixLoader}
                  layout="responsive"
                  sizes="100vw"
                />
              </Box>
            </FlexBox>
            <Spacing />

            <List dense disablePadding>
              <ListSubheader>2019 Highlights Include:</ListSubheader>
              <ListItem>
                <ListItemText primary="Over 1,000 acres of forest treated" />
              </ListItem>
              <ListItem>
                <ListItemText primary="More than 3 million board feet of timber to a local mill" />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Greater than 4,000 tons of biomass to local
            renewable energy facilities"
                />
              </ListItem>
              <ListItem>
                <ListItemText primary="80-plus local contractors hired" />
              </ListItem>
            </List>
            <Spacing />
            <Type paragraph>
              The catalyst of the Project was the 2014 King Fire, which burned
              over 97,000 acres in the American River watershed, much of it at
              high intensity. Eager to reduce the risk to hydroelectric assets,
              water quality, and biodiversity from future fires, Placer County
              Water Agency (PCWA) joined with Placer County, The Nature
              Conservancy (TNC), the United States Forest Service (USFS),
              American River Conservancy (ARC), Sierra Nevada Conservancy (SNC),
              and the Sierra Nevada Research Institute at the University of
              California, Merced, to form the French Meadows Partnership. The
              Partnership is working to restore forest health to reduce the risk
              of high-severity fire, and to study the effects of forest
              treatments on watershed health. The Project spans over 22,000
              acres of federal land and is a test case for the partnership’s
              effectiveness in improving fire resilience.
            </Type>
            <Type paragraph>
              By most any measure, 2019 was a success. Under a master
              stewardship agreement between Placer County and the Tahoe National
              Forest, over 1000 acres of federal land was treated, bringing more
              than 3 million board feet to a local mill and over 4000 tons of
              biomass to local renewable energy facilities to help offset
              restoration costs. The work employed over 80 local contractors.
              Strategically selected to start in the most fire prone areas, work
              will move its way out from heavily trafficked areas into the upper
              reaches of the watershed in succeeding years. On the adjacent
              private land, the ARC funded its own treatment of 445 acres, as a
              collaborative aspect of the all-lands approach.
            </Type>
            <Blockquote>
              "I want to express my gratitude to work on such a monumental
              project," said Amanda Godon of Volcano Creek Logging, one of the
              Project’s contractors. "This project is the leader and forerunner,
              I believe, in the way we do business. It’s a win for the entities
              involved, a win for the community, and a win for the forest."
            </Blockquote>
            <Type paragraph>
              The success of this season’s work is based on a number of factors.
              First is the unique public-private partnership. As Tahoe National
              Forest Supervisor Eli Ilano noted when approving the Project, “The
              only way to accomplish this monumental task is through
              collaborative stewardship.” The second factor is innovative
              funding, also a first of its kind. With a total estimated price
              tag of $17 million, funding has come from local, state, and
              federal entities, including PCWA, Placer County, CAL FIRE, SNC,
              the USFS, and the National Fish and Wildlife Foundation, and
              private entities such as MillerCoors, Dr. Pepper Snapple Group,
              and TNC. The final factor leading to the Project’s success is the
              implementation of ecological forest management. The goal of
              ecological management is to promote healthier, more resilient
              forest conditions utilizing a variety of treatments to remove
              unnecessary fuels, restore wildlife habitat, and reduce the risk
              of high-severity wildfire. Once the desired conditions are
              achieved, the Project is designed to maintain a healthy forest
              through planned maintenance treatments including prescribed fire.
              This season, the USFS and TNC, the two entities managing the
              prescribed fire component, prepared 600 acres of forest for
              prescribed burning by clearing six miles of control line. The
              prescribed burning will progress next field season when weather
              conditions are favorable.
            </Type>
            <Type paragraph>
              Through the tangible work of the French Meadows Forest Restoration
              Project, partners hope to not only moderate future wildfire
              behavior, but also create a new model for advancing forest and
              watershed restoration. In fact, since the Project’s inception,
              stakeholders are replicating this approach in other Sierra
              watersheds including the North Yuba River watershed. As the threat
              of intense wildfires grow each year in California, the French
              Meadows Forest Restoration Project demonstrates that important
              forest restoration work is possible through innovation,
              partnership, and shared stewardship.
            </Type>
          </article>
          <FlexBox>
            <Box
              m="auto"
              width="100%" // Setting width makes the image re-expand when window width resizes to a larger width from a smaller narrow width.
              height={{xs: 300, sm: 450}}
              overflow="hidden"
              position="relative"
            >
              <Image
                loader={imgixUrlLoader}
                src={`https://imgix.cosmicjs.com/cba9b140-30ae-11ea-96a7-8146ec741192-French-Meadows-Partnersgroup1.jpg${stringify(
                  {fit: 'crop', crop: 'bottom', ar: '3:2'},
                  true
                )}`}
                alt="Group photo of French Meadows Partners Group"
                layout="responsive"
                sizes="100vw"
                // objectPosition="center bottom"
                // objectFit="contain"
                width={1236} // w & h should match the resulting cropped image returned from imgix
                height={824}
              />
            </Box>
          </FlexBox>
          <Spacing size="large" />

          <Image
            loader={imgixLoader}
            src="01072cd0-30b6-11ea-bfe8-5b62c3bdf959-Success-in-the-Sierra-Partnership-Logos.png"
            alt="Partnership and Affiliation logos"
            layout="responsive"
            sizes="100vw"
            width={1080}
            height={385}
          />
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default SuccessInTheSierraPage
