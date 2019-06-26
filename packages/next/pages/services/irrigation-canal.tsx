import React from 'react'
import {Typography as Type} from '@material-ui/core'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'

const IrrigationCanal = () => {
  return (
    <PageLayout title="Irrigation Canal Information">
      <MainBox>
        <Type>
          PCWA's primary source of water is delivered through canals operated by
          Pacific Gas & Electric Company's (PG&E). After the irrigation season
          (October/November), PG&E shuts down various canals for routine
          maintenance. This annual maintenance affects delivery to PCWA
          customers. During this time, PCWA schedules irrigation canal outages
          and spreads remaining water supplies to mitigate the impact on its
          customers.
        </Type>
      </MainBox>
    </PageLayout>
  )
}

export default IrrigationCanal
