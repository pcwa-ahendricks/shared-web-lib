// cspell:ignore agendized
import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {Typography as Type} from '@material-ui/core'
import MuiNextLink from '@components/NextLink/NextLink'
import ClerkToBoardEmail from '@components/links/ClerkToBoardEmail'
import ClerkToBoardPhone from '@components/links/ClerkToBoardPhone'

const BoardOfDirectorsQualificationsPage = () => {
  return (
    <PageLayout title="Board of Directors Qualifications" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle
            title="Board of Directors Qualifications"
            subtitle="Board of Directors"
          />
          <article>
            <Type variant="h3" gutterBottom>
              Board of Directors' Compensation, Benefits and Expense Information
            </Type>
            <Type paragraph>
              Each Director receives a fixed compensation of $950 per month to
              attend meetings, seminars, conferences or events on behalf of the
              Agency. The Agency provides dental and vision insurance for each
              Director. Cost for dependent coverage, if any, is the Director’s
              responsibility to pay.
            </Type>
            <Type paragraph>
              The Agency provides $24,000 life insurance policy for each
              Director.
            </Type>
            <Type paragraph>
              Each Director is eligible to receive the same Agency travel or
              business allowances and expenses that are provided to Agency
              management employees. All Director expense reimbursement claims
              are agendized for the Board’s consideration and only paid if the
              Board approves the reimbursement.
            </Type>
            <Type variant="h3" gutterBottom>
              Board Meetings
            </Type>
            <Type paragraph>
              The Board of Directors meet in regular session on the first and
              third Thursday of each month at 2:00 p.m. at the Placer County
              Water Agency Business Center,{' '}
              <MuiNextLink href="/about-pcwa/directions">
                144 Ferguson Road, Auburn, California
              </MuiNextLink>
              . All Board meetings are open to the public. See{' '}
              <MuiNextLink href="/board-of-directors/board-agenda">
                Upcoming Meetings
              </MuiNextLink>{' '}
              for more information.
            </Type>
            <Type paragraph>
              Contact Board of Directors through the Agency Secretary/Clerk to
              the Board at <ClerkToBoardEmail /> or <ClerkToBoardPhone />.
            </Type>
            <Type variant="h3" gutterBottom>
              Director Qualifications
            </Type>
            <Type paragraph>
              Directors must reside within their elected district, be a
              registered voter in Placer County, be at least 18 years of age and
              a United States citizen.
            </Type>
          </article>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default BoardOfDirectorsQualificationsPage
