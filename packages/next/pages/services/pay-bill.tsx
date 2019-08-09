// cspell:ignore bgcolor
import React from 'react'
import {Box, Typography as Type, Theme} from '@material-ui/core'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import WaterSurfaceImg from '@components/WaterSurfaceImg/WaterSurfaceImg'
import PageTitle from '@components/PageTitle/PageTitle'
import {RespRowBox, RespChildBox} from '@components/boxes/FlexBox'
import Imgix from 'react-imgix'
import clsx from 'clsx'
import {useTheme} from '@material-ui/styles'

const PayBillPage = () => {
  const theme = useTheme<Theme>()

  return (
    <PageLayout title="Bill Payment Options">
      <WaterSurfaceImg />
      <NarrowContainer>
        <MainBox>
          <PageTitle title="Bill Payment Options" subtitle="Services" />
          <RespRowBox>
            <RespChildBox first flex={{xs: '100%', sm: '60%'}}>
              <Type paragraph>
                There are several ways that you can pay your PCWA water bill.
                Our electronic and automated options are
                <span style={{fontSize: '1.2rem'}}>
                  <strong>
                    {' '}
                    <em>secure, free and easy to use!</em>
                  </strong>
                </span>
              </Type>
            </RespChildBox>
            <RespChildBox
              flexSpacing={4}
              flex="auto"
              m={{xs: 'auto', sm: 0}} // Center image in small layouts.
              ml={{xs: 'auto', sm: 4}} // xs: auto will center image in small layouts.
              maxWidth={{xs: '60vw', sm: 'inherit'}} // Don't let image get too big in small layouts.
            >
              <Imgix
                className={clsx({['lazyload']: true})}
                sizes="auto"
                src="//cosmicjs.imgix.net/7dbe2de0-6b2f-11e7-b8ae-eb2280fc8c40-bill-pay-aside.jpg"
                htmlAttributes={{
                  alt: 'Customer Service Representative Photo',
                  style: {width: '100%'}
                }}
                attributeConfig={{
                  src: 'data-src',
                  srcSet: 'data-srcset',
                  sizes: 'data-sizes'
                }}
              ></Imgix>
            </RespChildBox>
          </RespRowBox>
          <Box mt={4} boxShadow={1} bgcolor={theme.palette.common.white} p={2}>
            <Type variant="h5" gutterBottom>
              Refund Policy
            </Type>
            <Type paragraph>
              After applying deposits &amp; credit balances to any amounts owed
              by a customer, the Agency refunds remaining credit balances via an
              Agency check issued to the name and mailing address on the final
              account, usually within 30 days of the final statement.
            </Type>
          </Box>
        </MainBox>
      </NarrowContainer>
    </PageLayout>
  )
}

export default PayBillPage
