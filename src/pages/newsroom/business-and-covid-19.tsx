//cspell:ignore Merced usfs covid SWRCB CMUA Legionella
import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {Typography as Type, Link} from '@material-ui/core'
import Spacing from '@components/boxes/Spacing'
import LazyImgix from '@components/LazyImgix/LazyImgix'

const BusinessAndCovid19Page = () => {
  return (
    <PageLayout title="Business Re-opening and COVID-19" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle
            title="Special Notice for Businesses Regarding Re-opening"
            subtitle="Newsroom"
            titleProps={{variant: 'h2'}}
          />
          <Type variant="h3" gutterBottom>
            Special Notice for Owners and Managers of Buildings Which Have Been
            Shut Down Due to COVID-19 Concerns
          </Type>
          <Type paragraph>
            As we look toward the future of re-opening our businesses and
            buildings, PCWA feels it is of utmost importance to inform owners
            and managers of buildings which have been closed for weeks or months
            due to COVID-19 concerns of the best practices to help ensure the
            health and safety of the occupants of your buildings. While PCWA
            continually tests the quality of our water throughout our
            distribution system, there is no way, aside from outreach and
            education, to ensure that the quality is maintained beyond your
            water meter due to the complexities and unknowns under your
            ownership. The plans and tips contained in the guide from the
            Centers for Disease Control (CDC) we are linking you to are very
            good for general management of your building water systems, and even
            more so now that these buildings have been on forced closure for
            prolonged periods. The shortest way to convey this message is to say
            that every part of your building’s water system needs to be flushed
            thoroughly until you are sure every part of the system is receiving
            fresh water from the main. You can find the full guide to the
            document titled{' '}
            <em>
              Developing a Water Management Program to Reduce Legionella Growth
              & Spread in Buildings
            </em>{' '}
            here:{' '}
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.cdc.gov/legionella/downloads/toolkit.pdf"
            >
              https://www.cdc.gov/legionella/downloads/toolkit.pdf
            </Link>
          </Type>
          <Spacing size="large" factor={2} />
          <LazyImgix
            src="https://cosmic-s3.imgix.net/6e6c3700-962a-11ea-b04e-734185112560-PCWA-Sign-2019.jpg"
            htmlAttributes={{alt: 'PCWA Business Center'}}
          />
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default BusinessAndCovid19Page
