// cspell:ignore Doortag
import React, {useMemo} from 'react'
// GO-LIVE - We need to un-comment this after GO LIVE date. *
// import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {
  useMediaQuery,
  Typography as Type,
  Link,
  Box,
  Divider
} from '@material-ui/core'
import {useTheme} from '@material-ui/core/styles'
import Spacing from '@components/boxes/Spacing'
import {RowBox} from '@components/boxes/FlexBox'
import ImgixThumbLink from '@components/ImgixThumbLink/ImgixThumbLink'

const ShutoffProtectionPage = () => {
  const theme = useTheme()
  const isSMUp = useMediaQuery(theme.breakpoints.up('sm'))
  const marginTop = useMemo(() => (isSMUp ? 4 : 2), [isSMUp])
  const marginBottom = useMemo(() => (isSMUp ? 10 : 5), [isSMUp])
  return (
    <Box flex="1 0 auto" mt={marginTop} mb={marginBottom}>
      {/* GO-LIVE - We need to un-comment this after GO LIVE date. */}
      {/* <PageLayout title="Customer Shutoff Protection" waterSurface> */}
      <MainBox>
        <NarrowContainer>
          <PageTitle title="Customer Shutoff Protection" subtitle="Services" />
          <Type variant="h2" gutterBottom color="secondary">
            The Page is Currently Under Development
          </Type>
          <Spacing />
          <Type paragraph>
            PCWA will comply with California Senate Bill No. 998 and use this
            page to provide information and documentation regarding our Water
            Shutoff Policy and discontinuation of water services for
            non-payment. More information about this new California Senate Bill
            can be found on the{' '}
            <Link
              href="https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201720180SB998"
              target="_blank"
              rel="noopener noreferrer"
            >
              California Legislative Information website
            </Link>
            .
          </Type>
          <Type paragraph>
            Check back here for further updates and information on our Water
            Shutoff Policy. This policy will be finalized and effective by Feb.
            1, 2020.
          </Type>
          <Spacing />
          <Type variant="h3">Documents</Type>
          <Box bgcolor={theme.palette.background.paper} pt={3} pb={1} mt={3}>
            <RowBox justifyContent="space-around">
              <ImgixThumbLink
                url="https://cosmic-s3.imgix.net/ca825860-2e76-11ea-a6d4-f90f4871ce6f-WaterShutoffProtectionActPolicyENbc123019.pdf"
                anchorProps={{
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  href:
                    'https://cdn.cosmicjs.com/ca825860-2e76-11ea-a6d4-f90f4871ce6f-WaterShutoffProtectionActPolicyENbc123019.pdf'
                }}
                caption="Water Shutoff Protection Act Policy"
                alt="Thumbnail and link for Water Shutoff Protection Act Policy PDF"
              />
              <ImgixThumbLink
                url="https://cosmic-s3.imgix.net/ca8390e0-2e76-11ea-bfe8-5b62c3bdf959-Doortag-Eglishbc010220.pdf"
                anchorProps={{
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  href:
                    'https://cdn.cosmicjs.com/ca8390e0-2e76-11ea-bfe8-5b62c3bdf959-Doortag-Eglishbc010220.pdf'
                }}
                caption="Standard PCWA Doortag"
                alt="Thumbnail and link for Door Tag Sample PDF"
              />
            </RowBox>
          </Box>
          {/*  */}
          {/* cspell:disable */}
          <Spacing size="x-large">
            <Divider />
          </Spacing>
          <Type variant="h3">Documentos</Type>
          <Type variant="subtitle1" color="textSecondary">
            <em>Spanish</em>
          </Type>
          <Box bgcolor={theme.palette.background.paper} pt={3} pb={1} mt={3}>
            <RowBox justifyContent="space-around">
              <ImgixThumbLink
                url="https://cosmic-s3.imgix.net/caaf82e0-2e76-11ea-bfe8-5b62c3bdf959-WaterShutoffProtectionActPolicySPbc123019.pdf"
                anchorProps={{
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  href:
                    'https://cdn.cosmicjs.com/caaf82e0-2e76-11ea-bfe8-5b62c3bdf959-WaterShutoffProtectionActPolicySPbc123019.pdf'
                }}
                caption="Política de la Ley de Protección de Cierre de Agua"
                alt="Miniatura y enlace para PDF de la Política de la Ley de Protección contra el Cierre del Agua"
              />
              <ImgixThumbLink
                url="https://cosmic-s3.imgix.net/caaaef00-2e76-11ea-bfe8-5b62c3bdf959-Doortag-SPbc123019.pdf"
                anchorProps={{
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  href:
                    'https://cdn.cosmicjs.com/caaaef00-2e76-11ea-bfe8-5b62c3bdf959-Doortag-SPbc123019.pdf'
                }}
                caption="Etiqueta de Puerta PCWA Estándar"
                alt="Miniatura y enlace para el PDF de muestra de etiqueta de puerta"
              />
            </RowBox>
          </Box>
          <Spacing size="x-large" />
          <Type variant="h3">서류</Type>
          <Type variant="subtitle1" color="textSecondary">
            <em>Korean</em>
          </Type>
          <Box bgcolor={theme.palette.background.paper} pt={3} pb={1} mt={3}>
            <RowBox justifyContent="space-around">
              <ImgixThumbLink
                url="https://cosmic-s3.imgix.net/ca8cdfb0-2e76-11ea-bfe8-5b62c3bdf959-WaterShutoffProtectionActPolicyKObc123019.pdf"
                anchorProps={{
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  href:
                    'https://cdn.cosmicjs.com/ca8cdfb0-2e76-11ea-bfe8-5b62c3bdf959-WaterShutoffProtectionActPolicyKObc123019.pdf'
                }}
                caption="물 차단 보호법 정책"
                alt="Thumbnail and link for Water Shutoff Protection Act Policy PDF"
              />
              <ImgixThumbLink
                url="https://cosmic-s3.imgix.net/ca84c960-2e76-11ea-a6d4-f90f4871ce6f-Doortag-KObc010220.pdf"
                anchorProps={{
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  href:
                    'https://cdn.cosmicjs.com/ca84c960-2e76-11ea-a6d4-f90f4871ce6f-Doortag-KObc010220.pdf'
                }}
                caption="표준 PCWA 도어 태그"
                alt="Thumbnail and link for Door Tag Sample PDF"
              />
            </RowBox>
          </Box>

          <Spacing size="x-large" />
          <Type variant="h3">文件资料</Type>
          <Type variant="subtitle1" color="textSecondary">
            <em>Chinese</em>
          </Type>
          <Box bgcolor={theme.palette.background.paper} pt={3} pb={1} mt={3}>
            <RowBox justifyContent="space-around">
              <ImgixThumbLink
                url="https://cosmic-s3.imgix.net/ca8b0af0-2e76-11ea-a6d4-f90f4871ce6f-WaterShutoffProtectionActPolicyCHbc123019.pdf"
                anchorProps={{
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  href:
                    'https://cdn.cosmicjs.com/ca8b0af0-2e76-11ea-a6d4-f90f4871ce6f-WaterShutoffProtectionActPolicyCHbc123019.pdf'
                }}
                caption="断水保护法政策"
                alt="Thumbnail and link for Water Shutoff Protection Act Policy PDF"
              />
              <ImgixThumbLink
                url="https://cosmic-s3.imgix.net/ca8565a0-2e76-11ea-bfe8-5b62c3bdf959-Doortag-CHbc123019.pdf"
                anchorProps={{
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  href:
                    'https://cdn.cosmicjs.com/ca8565a0-2e76-11ea-bfe8-5b62c3bdf959-Doortag-CHbc123019.pdf'
                }}
                caption="标准PCWA门标签"
                alt="Thumbnail and link for Door Tag Sample PDF"
              />
            </RowBox>
          </Box>

          <Spacing size="x-large" />
          <Type variant="h3">Các tài liệu</Type>
          <Type variant="subtitle1" color="textSecondary">
            <em>Vietnamese</em>
          </Type>
          <Box bgcolor={theme.palette.background.paper} pt={3} pb={1} mt={3}>
            <RowBox justifyContent="space-around">
              <ImgixThumbLink
                url="https://cosmic-s3.imgix.net/cabe28e0-2e76-11ea-bfe8-5b62c3bdf959-WaterShutoffProtectionActPolicyVIbc123019.pdf"
                anchorProps={{
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  href:
                    'https://cdn.cosmicjs.com/cabe28e0-2e76-11ea-bfe8-5b62c3bdf959-WaterShutoffProtectionActPolicyVIbc123019.pdf'
                }}
                caption="Chính sách Đạo luật Bảo vệ Tắt nước"
                alt="Thumbnail and link for Water Shutoff Protection Act Policy PDF"
              />
              <ImgixThumbLink
                url="https://cosmic-s3.imgix.net/cab9bc10-2e76-11ea-a6d4-f90f4871ce6f-Doortag-VIbc123019.pdf"
                anchorProps={{
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  href:
                    'https://cdn.cosmicjs.com/cab9bc10-2e76-11ea-a6d4-f90f4871ce6f-Doortag-VIbc123019.pdf'
                }}
                caption="Thẻ cửa PCWA tiêu chuẩn"
                alt="Thumbnail and link for Door Tag Sample PDF"
              />
            </RowBox>
          </Box>

          <Spacing size="x-large" />
          <Type variant="h3">Mga dokumento</Type>
          <Type variant="subtitle1" color="textSecondary">
            <em>Tagalog / Filipino</em>
          </Type>
          <Box bgcolor={theme.palette.background.paper} pt={3} pb={1} mt={3}>
            <RowBox justifyContent="space-around">
              <ImgixThumbLink
                url="https://cosmic-s3.imgix.net/cabacd80-2e76-11ea-bfe8-5b62c3bdf959-WaterShutoffProtectionActPolicyTAbc123019.pdf"
                anchorProps={{
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  href:
                    'https://cdn.cosmicjs.com/cabacd80-2e76-11ea-bfe8-5b62c3bdf959-WaterShutoffProtectionActPolicyTAbc123019.pdf'
                }}
                caption="Patakaran sa Proteksyon ng Sarhan ng tubig"
                alt="Thumbnail and link for Water Shutoff Protection Act Policy PDF"
              />
              <ImgixThumbLink
                url="https://cosmic-s3.imgix.net/cabc0600-2e76-11ea-a6d4-f90f4871ce6f-Doortag-TAbc123019.pdf"
                anchorProps={{
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  href:
                    'https://cdn.cosmicjs.com/cabc0600-2e76-11ea-a6d4-f90f4871ce6f-Doortag-TAbc123019.pdf'
                }}
                caption="Pamantayan PCWA Tag ng Door"
                alt="Thumbnail and link for Door Tag Sample PDF"
              />
            </RowBox>
          </Box>
        </NarrowContainer>
      </MainBox>
    </Box>
  )
}
/*
    GO-LIVE - We need to un-comment this after GO LIVE date. 
    </PageLayout> 
*/

export default ShutoffProtectionPage
