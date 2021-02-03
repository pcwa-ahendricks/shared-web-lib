// cspell:ignore Barholdt Brodie Julia Ruccione Barnholdt Cuellar
import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {Typography as Type, Link} from '@material-ui/core'
import Spacing from '@components/boxes/Spacing'
import {RowBox, ChildBox} from '@components/boxes/FlexBox'
import ResponsiveYouTubePlayer from '@components/ResponsiveYouTubePlayer/ResponsiveYouTubePlayer'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import StrongEmphasis from '@components/typography/StrongEmphasis/StrongEmphasis'

const WaterSpots2020Page = () => {
  return (
    <PageLayout
      title="2020 Water Spots Video Contest Winners Announced"
      waterSurface
    >
      <MainBox>
        <NarrowContainer>
          <PageTitle
            title="2020 Water Spots Video Contest Winners Announced"
            subtitle="Newsroom"
            titleProps={{variant: 'h2'}}
          />
          <Type paragraph>
            The Regional Water Authority has announced the winners of the 2020
            Water Spots Video Contest! Winning videos were among the 90
            submitted by middle and high school students from throughout the
            Sacramento region. Students were invited to 'Be a Leak Detective',
            the contest’s 2020 theme.
          </Type>
          <Type paragraph>
            PCWA is pleased to announce that the <em>top 3</em> video winners
            were from our service area! Congratulations to Whitney High School
            students and teacher, Ben Barholdt, on your winning videos and
            prizes!
          </Type>

          <Spacing size="large" />
          <RowBox flexSpacing={3}>
            <ChildBox flex="1 1 60%">
              <Type variant="h4" gutterBottom color="primary">
                Judge’s Choice First Place And Grand Prize
              </Type>
              <Type variant="h5" gutterBottom>
                “The Great Goggle Inspector: G.G.I.” by Aaryan Midha and Karina
                Salerno
              </Type>
              <Type paragraph>
                Earns $500 split 50/50 between student and sponsoring teacher
                and a premiere and screening at local movie theaters this
                summer.
              </Type>
            </ChildBox>
            <ChildBox flex="1 0 40%" maxWidth={700} mx="auto">
              <ResponsiveYouTubePlayer
                controls
                url="https://www.youtube.com/watch?v=wb3AslzO1Vc"
                config={{
                  youtube: {
                    playerVars: {showinfo: 1}
                  }
                }}
              />
            </ChildBox>
          </RowBox>

          <Spacing />
          <RowBox flexSpacing={3}>
            <ChildBox flex="1 1 60%">
              <Type variant="h4" gutterBottom color="primary">
                Judge’s Choice Second Place
              </Type>
              <Type variant="h5" gutterBottom>
                “TO THE STREETS!” by Maggie Brodie and Julia Ruccione
              </Type>
              <Type paragraph>
                Earns $300 split 50/50 between students and sponsoring teacher.
              </Type>
            </ChildBox>
            <ChildBox flex="1 0 40%" maxWidth={700} mx="auto">
              <ResponsiveYouTubePlayer
                controls
                url="https://www.youtube.com/watch?v=Aad4Yz-0geE"
                config={{
                  youtube: {
                    playerVars: {showinfo: 1}
                  }
                }}
              />
            </ChildBox>
          </RowBox>
          <Spacing />
          <RowBox flexSpacing={3}>
            <ChildBox flex="1 1 60%">
              <Type variant="h4" gutterBottom color="primary">
                Judge’s Choice Third Place
              </Type>
              <Type variant="h5" gutterBottom>
                “Case 007” by Lena Tang and Sam Berg
              </Type>
              <Type paragraph>
                Earns $200 split 50/50 between students and sponsoring teacher.
              </Type>
            </ChildBox>
            <ChildBox flex="1 0 40%" maxWidth={700} mx="auto">
              <ResponsiveYouTubePlayer
                controls
                url="https://www.youtube.com/watch?v=F9w97XlXbFM"
                config={{
                  youtube: {
                    playerVars: {showinfo: 1}
                  }
                }}
              />
            </ChildBox>
          </RowBox>

          <Spacing size="x-large" />
          <Type paragraph>
            Expert judges narrowed videos down to 10 finalists and then selected
            the top three winners for "Judge's Choice" awards.
          </Type>
          <Type paragraph>
            The public then voted for their favorite to receive the "People's
            Choice" award. More than 1,023 votes were cast this year. Also
            notable and among the top vote-getters, from Whitney High School,
            was “The Conservation Interrogation” by Sarah Young and Madison
            McAdam at 190 votes.
          </Type>
          <Type paragraph>
            Expert judges included: <strong>Monica Woods</strong>, Chief
            Meteorologist at ABC10, <strong>Kathleen Dodge</strong>, Executive
            Director of the El Dorado Lake Tahoe Film & Media Office, and{' '}
            <strong>Lisa Cuellar</strong>, Program Manager at the California
            Water Efficiency Partnership. Their selections were based on
            creativity, entertainment value, accuracy, originality and
            incorporation of the 2020 water efficiency message.
          </Type>

          <Spacing />
          <Type variant="h3" gutterBottom>
            Teacher Participation Prizes
          </Type>
          <Type paragraph>
            In addition, teachers that submitted the most eligible videos will
            be presented with Amazon gift cards. These include Ben Barnholdt of
            Whitney High School in Rocklin, who submitted 11 eligible videos.
          </Type>

          <Type paragraph>
            The Water Spots Video Contest is sponsored by the Regional Water
            Authority and local water providers. Now in its ninth year, the
            contest challenges students to create videos focused on a select
            water efficiency theme. Learn more about the Water Spots Video
            Contest, water-wise tips and information about free water-efficiency
            services and rebates at{' '}
            <Link
              href="https://bewatersmart.info/"
              target="_blank"
              rel="noopener noreferrer"
            >
              BeWaterSmart.info
            </Link>
            .
          </Type>

          <Type paragraph>
            All of the top scoring videos can be viewed on Be Water Smart's
            YouTube channel at{' '}
            <Link
              href="https://www.youtube.com/user/BeWaterSmartinfo"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube.com/BeWaterSmartinfo
            </Link>
            .
          </Type>

          <Spacing size="large" />
          <LazyImgix
            src="https://imgix.cosmicjs.com/6eafed10-9c88-11ea-b70c-0f94f7372f5f-WaterSpotsLogo.jpg"
            htmlAttributes={{
              alt: 'Water Spots Contest Logo'
            }}
          />

          <Spacing size="large" />

          <Type paragraph>
            <em>
              <StrongEmphasis>
                About the Regional Water Authority
              </StrongEmphasis>{' '}
              : RWA is a joint powers authority representing two dozen water
              providers and affiliates in the greater Sacramento area. Its
              primary mission is to help its members protect and enhance the
              reliability, availability, affordability and quality of water
              resources.
            </em>
          </Type>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default WaterSpots2020Page
