import React, {useEffect, useCallback, useState, useMemo} from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {
  getMedia,
  fileNameUtil,
  CosmicMediaMeta,
  CosmicMediaResponse
} from '@lib/services/cosmicService'
import {compareDesc, parseISO} from 'date-fns'
import Link, {LinkProps} from 'next/link'
import groupBy from '@lib/groupBy'
import {AppBar, Box, Tabs, Tab, Typography as Type} from '@material-ui/core'
import {createStyles, makeStyles} from '@material-ui/core/styles'
import {NextPageContext} from 'next'
import queryParamToStr from '@lib/services/queryParamToStr'
import {useRouter} from 'next/router'
import ErrorPage from '../../../pages/_error'

const DATE_FNS_FORMAT = 'yyyy-MM-dd'

type GroupedNewsletters = Array<{
  year: number
  values: Pick<
    CosmicMediaMeta,
    '_id' | 'original_name' | 'imgix_url' | 'derivedFilenameAttr'
  >[]
}>

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
  publication: string // getInitialProps.
}

const cosmicGetMediaProps = {
  props: '_id,original_name,imgix_url'
}

const useStyles = makeStyles(() =>
  createStyles({
    appBar: {
      zIndex: 1 // Defaults to a higher level appearing over mega menu.
    }
  })
)

const PublicationsPage = ({publication}: Props) => {
  const [newsletters, setNewsletters] = useState<GroupedNewsletters>([])
  const [value, setValue] = useState(0)
  const router = useRouter()
  const [notFound, setNotFound] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    console.log('publication changed', publication)
    switch (publication.toLowerCase()) {
      case 'newsletters': {
        setValue(0)
        break
      }
      case 'fire-and-water': {
        setValue(1)
        break
      }
      case 'year-end': {
        setValue(2)
        break
      }
      case 'enews': {
        setValue(3)
        break
      }
      default: {
        setNotFound(true)
      }
    }
  }, [publication, router])

  const fetchNewsletters = useCallback(async () => {
    const bma = await getMedia<CosmicMediaResponse>({
      folder: 'newsletters',
      ...cosmicGetMediaProps
    })
    if (!bma) {
      return
    }
    const bmaEx = bma.map((bm) => ({
      ...bm,
      derivedFilenameAttr: fileNameUtil(bm.original_name, DATE_FNS_FORMAT)
    }))
    // Group News Releases by derived Year into JS Map.
    const grouped = groupBy<CosmicMediaMeta, number>(
      bmaEx,
      (mbm) => mbm.derivedFilenameAttr.publishedYear
    )
    // Transform JS Map into a usable Array of Objects.
    const tmpSortedGroups = [] as GroupedNewsletters
    for (const [k, v] of grouped) {
      // Sort individual News Releases by published date property.
      tmpSortedGroups.push({
        year: k,
        values: [...v].sort((a, b) =>
          compareDesc(
            parseISO(a.derivedFilenameAttr.publishedDate),
            parseISO(b.derivedFilenameAttr.publishedDate)
          )
        )
      })
    }
    // Sort grouped database by Year.
    const sortedGroups = tmpSortedGroups.sort((a, b) => b.year - a.year)

    setNewsletters(sortedGroups)
  }, [])

  const maxYear = useMemo(
    () =>
      newsletters
        .reduce(
          (prevValue, grp) => (grp.year > prevValue ? grp.year : prevValue),
          2000
        )
        .toString(),
    [newsletters]
  )

  useEffect(() => {
    fetchNewsletters()
  }, [fetchNewsletters])

  console.log(maxYear, newsletters)

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

  if (notFound) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <PageLayout title="Publications" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle title="Publications" subtitle="Newsroom" hideDivider />
          <AppBar
            position="static"
            color="default"
            classes={{root: classes.appBar}}
            elevation={2}
            square={false}
          >
            <Tabs
              variant="fullWidth"
              value={value}
              // onChange={handleChange} // onChange is not needed.
              aria-label="nav tabs example"
            >
              <LinkTab
                label="Newsletters"
                href="/newsroom/publications/[publication]"
                as="/newsroom/publications/newsletters"
                {...a11yProps(0)}
              />
              <LinkTab
                label="Fire & Water"
                href="/newsroom/publications/[publication]"
                as="/newsroom/publications/fire-and-water"
                {...a11yProps(1)}
              />
              <LinkTab
                label="Year End Reports"
                href="/newsroom/publications/[publication]"
                as="/newsroom/publications/year-end"
                {...a11yProps(2)}
              />
              <LinkTab
                label="E-News"
                href="/newsroom/publications/[publication]"
                as="/newsroom/publications/enews"
                {...a11yProps(3)}
              />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            newsletters here...
          </TabPanel>
          <TabPanel value={value} index={1}>
            fire & water here...
          </TabPanel>
          <TabPanel value={value} index={2}>
            year end here...
          </TabPanel>
          <TabPanel value={value} index={3}>
            Enews here...
          </TabPanel>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

PublicationsPage.getInitialProps = async ({query}: NextPageContext) => {
  const publication = queryParamToStr(query['publication'])
  return {publication}
}

export default PublicationsPage
