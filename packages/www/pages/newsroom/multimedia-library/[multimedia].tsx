import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import Link, {LinkProps} from 'next/link'
import {AppBar, Box, Tabs, Tab, Typography as Type} from '@material-ui/core'
import {createStyles, makeStyles} from '@material-ui/core/styles'
import {NextPageContext} from 'next'
import queryParamToStr from '@lib/services/queryParamToStr'
import ErrorPage from '@pages/_error'

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

interface LinkTabProps {
  href: string
  label: string
}

type Props = {
  tabIndex: number
  err?: {statusCode: number}
}

const useStyles = makeStyles(() =>
  createStyles({
    appBar: {
      zIndex: 1 // Defaults to a higher level appearing over mega menu.
    }
  })
)

const MultimediaLibraryPage = ({tabIndex, err}: Props) => {
  const classes = useStyles()

  function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props

    return (
      <Type
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`nav-tabpanel-${index}`}
        aria-labelledby={`nav-tab-${index}`}
        {...other}
      >
        <Box p={3}>{children}</Box>
      </Type>
    )
  }

  function a11yProps(index: any) {
    return {
      id: `nav-tab-${index}`,
      'aria-controls': `nav-tabpanel-${index}`
    }
  }

  function LinkTab({href, as, ...rest}: LinkTabProps & LinkProps) {
    return (
      <Link passHref href={href} as={as}>
        <Tab component="a" {...rest} />
      </Link>
    )
  }

  // const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
  // setValue(newValue)
  // }

  if (err) {
    return <ErrorPage statusCode={err.statusCode} />
  }

  return (
    <PageLayout title="Multimedia Library" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle
            title="Multimedia Library"
            subtitle="Newsroom"
            hideDivider
          />
          <AppBar
            position="static"
            color="default"
            classes={{root: classes.appBar}}
            elevation={2}
            square={false}
          >
            <Tabs
              variant="fullWidth"
              value={tabIndex}
              // onChange={handleChange} // onChange is not needed.
              aria-label="navigation tabs"
            >
              <LinkTab
                label="Photos"
                href="/newsroom/multimedia-library/[multimedia]"
                as="/newsroom/multimedia-library/photos"
                {...a11yProps(0)}
              />
              <LinkTab
                label="Videos"
                href="/newsroom/multimedia-library/[multimedia]"
                as="/newsroom/multimedia-library/videos"
                {...a11yProps(1)}
              />
            </Tabs>
          </AppBar>
          <TabPanel value={tabIndex} index={0}>
            photos here...
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            videos here...
          </TabPanel>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

MultimediaLibraryPage.getInitialProps = async ({query}: NextPageContext) => {
  const multimedia = queryParamToStr(query['multimedia'])
  let tabIndex: number
  let err: {statusCode: number} | null = null
  switch (multimedia.toLowerCase()) {
    case 'photos': {
      tabIndex = 0
      break
    }
    case 'videos': {
      tabIndex = 1
      break
    }
    default: {
      tabIndex = -1
      err = {statusCode: 404}
    }
  }
  return {err, tabIndex}
}

export default MultimediaLibraryPage
