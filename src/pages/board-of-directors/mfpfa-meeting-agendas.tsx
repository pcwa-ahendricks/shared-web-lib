// cspell:ignore mfpfa novus
import React from 'react'
import {Typography as Type, Link} from '@material-ui/core'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import Spacing from '@components/boxes/Spacing'
import NovusIframe from '@components/NovusIframe/NovusIframe'

export default function MfpfaMeetingAgendaPage() {
  return (
    <PageLayout title="MFPFA Meetings" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle
            title="Middle Fork Project Finance Authority Meetings"
            subtitle="Board of Directors"
          />
          <Spacing />
          <section>
            <Type paragraph>
              View current agendas for all Middle Fork Project Finance Authority
              Meeting. Previous years' agendas and minutes can be found online
              on the County of Placer's website at{' '}
              <Link
                href="https://www.placer.ca.gov/AgendaCenter/Search/?term=&CIDs=4"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.placer.ca.gov
              </Link>
            </Type>
            <Spacing size="large" />
            <Type gutterBottom variant="h2" color="primary">
              Board Meeting Agendas
            </Type>
            <NovusIframe mfpfa />
          </section>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}
