import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import {Box, Typography as Type} from '@mui/material'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import AccountsPayableEmail from '@components/links/AccountsPayableEmail'
import Spacing from '@components/boxes/Spacing'
// import {yellow} from '@mui/material/colors'
// import AlertIcon from '@mui/icons-material/ErrorOutlineOutlined'

export default function CheckFraudAlert() {
  return (
    <PageLayout title="Check Fraud Alert" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle title="Fraudulent Check Alert" />
          <Box>
            {/* <Box display="flex" justifyContent="center">
              <AlertIcon sx={{fontSize: 58, color: yellow[700]}} />
            </Box> */}
            <Spacing />
            <Type paragraph>
              Placer County Water Agency (PCWA) has been alerted to fraudulent
              checks being delivered to members of the public at random, almost
              exclusively outside of PCWA's service area, yet purported as
              legitimate checks of the Agency. These checks which are drawn on a
              US Bank account ending in 5799 are not legitimate and are not PCWA
              checks. PCWA recommends the public{' '}
              <strong>not attempt to cash these checks</strong> as doing so
              could cause you to be vulnerable to fraud by providing personal
              information such as account number or social security number as
              well as banking fees for the returned check charges. Instances of
              this illegitimate check scheme have occurred on social media as
              payment to “advertise on behalf of commercial beverage companies”
              or some other request for services in exchange for payment. PCWA
              will never contact customers via social media for such services.
              If you receive a check from PCWA without understanding the reason
              for the payment and specifically if you are not an established
              customer or vendor of PCWA, it is highly recommended that you do
              not deposit or attempt to cash this unsolicited payment.
            </Type>
            <Type paragraph>
              If you receive a check and have a question about its legitimacy
              you may contact the Placer County Water Agency at{' '}
              <AccountsPayableEmail /> to verify.{' '}
              <strong>
                If you suspect fraud, or if you have deposited a payment you
                suspect to be fraudulent, contact your local Police Department.
              </strong>
            </Type>
          </Box>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}
