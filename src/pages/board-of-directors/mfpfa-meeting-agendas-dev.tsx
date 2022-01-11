// cspell:ignore mfpfa novus
import React from 'react'
import Image from 'next/image'
import {Typography as Type, Link} from '@material-ui/core'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import Spacing from '@components/boxes/Spacing'
import NovusIframe from '@components/NovusIframe/NovusIframe'
import {ChildBox, RowBox} from 'mui-sleazebox'
import imgixLoader from '@lib/imageLoader'

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
            <RowBox responsive flexSpacing={2}>
              <ChildBox flex="60%">
                <Type paragraph>
                  View current agendas for all Middle Fork Project Finance
                  Authority Meeting. Previous years' agendas and minutes can be
                  found online on the County of Placer's website at{' '}
                  <Link
                    href="https://www.placer.ca.gov/AgendaCenter/Search/?term=&CIDs=4"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://www.placer.ca.gov
                  </Link>
                </Type>
              </ChildBox>
              <ChildBox
                flex="40%"
                mx="auto"
                width={{xs: '60vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
              >
                <Image
                  src="80a6e6f0-7273-11ec-ad57-f92dc76de18c-mfpfa-logo-trans.png"
                  alt="Middle Fork Project Finance Authority logo"
                  loader={imgixLoader}
                  layout="responsive"
                  sizes="(max-width: 600px) 60vw, 40vw"
                  width={1080}
                  height={314}
                />
              </ChildBox>
            </RowBox>
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
