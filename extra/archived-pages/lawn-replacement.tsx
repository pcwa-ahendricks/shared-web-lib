// cspell:ignore addtl mnfg watersense Formik's
import React from 'react'
import {Typography as Type} from '@material-ui/core'
import MainBox from '@components/boxes/MainBox'
import PageLayout from '@components/PageLayout/PageLayout'
import PageTitle from '@components/PageTitle/PageTitle'
import NarrowContainer from '@components/containers/NarrowContainer'
import Link from 'next/link'

export default function SmartController() {
  return (
    <PageLayout title="Smart Controller Rebate Form" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle title="Rebate Currently Unavailable" />
          <Type>
            We are no longer accepting applications in 2022 for this rebate.
            Please check back in 2023. Click{' '}
            <Link href="/smart-water-use/rebate-programs">here</Link> to return
            to rebates page.
          </Type>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}
