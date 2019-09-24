import React, {useMemo} from 'react'
import {useRouter} from 'next/router'
import MainBox from '@components/boxes/MainBox'
import PageLayout from '@components/PageLayout/PageLayout'
import {Box, Typography as Type, Hidden} from '@material-ui/core'
import PiNavigationList from '@components/pi/PiNavigationList/PiNavigationList'
import {NextPageContext} from 'next'
import {ParsedUrlQuery} from 'querystring'
import {RowBox} from '@components/boxes/FlexBox'
import PiNavigationSelect from '@components/pi/PiNavigationSelect/PiNavigationSelect'
const isDev = process.env.NODE_ENV === 'development'

type Props = {
  query: ParsedUrlQuery // getInitialProps
}

const DynamicPiPage = ({query}: Props) => {
  const router = useRouter()
  // console.log(router)

  const pid = useMemo(() => {
    const {pid} = router.query
    let queryPid = pid || query.pid
    if (Array.isArray(queryPid)) {
      queryPid = queryPid[0]
    }
    return queryPid || ''
  }, [query, router])

  return (
    <PageLayout title="Reservoir & Stream Flows">
      <MainBox>
        {/* <PageTitle title="..." subtitle="..." /> */}
        <RowBox>
          <Hidden smDown>
            <Box width={350}>
              <PiNavigationList pid={pid} />
            </Box>
          </Hidden>
          <Box flex="auto">
            <Hidden mdUp>
              <Box m={3}>
                <PiNavigationSelect pid={pid} />
              </Box>
            </Hidden>
            <Type variant="subtitle1">Post: {pid}</Type>
          </Box>
        </RowBox>
      </MainBox>
    </PageLayout>
  )
}
DynamicPiPage.getInitialProps = ({query}: NextPageContext) => {
  isDev && console.log(JSON.stringify(query))
  return {query}
}

export default DynamicPiPage
