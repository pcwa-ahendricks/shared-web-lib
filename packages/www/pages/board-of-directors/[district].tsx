// cspell:ignore Santini dugan
import React, {useEffect, useState, useCallback} from 'react'
import {Typography as Type, Link, Box, Divider} from '@material-ui/core'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import PageTitle from '@components/PageTitle/PageTitle'
import WideContainer from '@components/containers/WideContainer'
import {ChildBox, RespRowBox, RowBox} from '@components/boxes/FlexBox'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import Spacing from '@components/boxes/Spacing'
import SectionBox from '@components/boxes/SectionBox'
import DistrictBoundariesMap from '@components/DistrictBoundariesMap/DistrictBoundariesMap'
import BoardMemberCard from '@components/BoardMemberCard/BoardMemberCard'
import {directors, Director} from '@lib/directors'
import {
  useTheme,
  Theme,
  makeStyles,
  createStyles
} from '@material-ui/core/styles'
import WaitToGrow from '@components/WaitToGrow/WaitToGrow'
import ClickOrTap from '@components/ClickOrTap/ClickOrTap'
import {NextPageContext} from 'next'
import queryParamToStr from '@lib/services/queryParamToStr'
import MuiNextLink from '@components/NextLink/NextLink'
import ErrorPage from '@pages/_error'
const isDev = process.env.NODE_ENV === 'development'

type Props = {
  district?: number
  err?: {statusCode: number}
}

function getMaxDistrict() {
  return directors.reduce(
    (max, director) => (director.district > max ? director.district : max),
    directors[0].district
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bulletLi: {
      listStyleType: 'none',
      marginBottom: theme.spacing(1 / 2),
      marginLeft: '-1em'
    }
  })
)

const BoardOfDirectorsDynamicPage = ({district: districtProp, err}: Props) => {
  const classes = useStyles()
  const theme = useTheme()
  const margin = theme.spacing(1) // Used with left and top margin of flexWrap items.
  const [activeDirector, setActiveDirector] = useState<Director | null>()

  const setDirector = useCallback((district: number) => {
    const director = directors.find((d) => d.district === district)
    if (director) {
      setActiveDirector(director)
    }
  }, [])

  useEffect(() => {
    districtProp ? setDirector(districtProp) : setActiveDirector(null)
  }, [districtProp, setDirector])

  const LinkItem = ({
    children,
    ...rest
  }: React.HTMLAttributes<HTMLLIElement>) => {
    return (
      <li className={classes.bulletLi} {...rest}>
        {children}
      </li>
    )
  }

  if (err) {
    return <ErrorPage statusCode={err.statusCode} />
  }

  return (
    <PageLayout title="Board of Directors" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle title="PCWA Board of Directors" />
          <RespRowBox flexSpacing={4}>
            <ChildBox flex="60%">
              <Type paragraph>
                The five member Board of Directors comprise the governing body
                of Placer County Water Agency. Each Director is elected to a
                four-year term by the registered voters in five geographic
                districts of Placer County. Boundaries of each district coincide
                with Placer County supervisorial districts. Each Director
                represents the members of the public within their respective
                district, as well as the general public within the Agency's
                1,500 square mile county-wide jurisdiction of Placer County.
              </Type>
              <Type paragraph>
                Election Procedure and Deadlines: Elections are held bi-annually
                (even years). More information can be found at the{' '}
                <Link
                  noWrap
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.placerelections.com/"
                >
                  Placer County Elections Office.
                </Link>
              </Type>
              <Spacing />
              <Type variant="h4">Directors - General Information</Type>
              <ul>
                <LinkItem>
                  <MuiNextLink href="/board-of-directors/board-agenda">
                    Board Meeting Agendas
                  </MuiNextLink>
                </LinkItem>
                <LinkItem>
                  <MuiNextLink href="/board-of-directors/board-minutes">
                    Board Meeting Minutes
                  </MuiNextLink>
                </LinkItem>
                <LinkItem>
                  <MuiNextLink href="/board-of-directors/qualifications">
                    Compensation, Benefits, and Qualifications
                  </MuiNextLink>
                </LinkItem>
              </ul>
            </ChildBox>
            <ChildBox
              flex="40%"
              display="flex"
              flexDirection="column"
              alignItems="center"
              textAlign="center"
            >
              <Box mx="auto" mb={1} width="100%">
                <LazyImgix
                  src="https://cosmic-s3.imgix.net/832f55a0-0fb7-11e9-84fa-73d0760cdc5c-PCWA_2019_Board_Members.jpg"
                  htmlAttributes={{
                    alt: 'PCWA Board of Directors - December 2019',
                    style: {width: '100%'}
                  }}
                />
              </Box>
              <Type variant="caption">
                PCWA Board of Directors, from left: <br />
                Gray Allen, District 1; Primo Santini, District 2; Robert Dugan
                (Vice Chair), District 4; Mike Lee (Chair), District 3; and
                Joshua Alpine, District 5
              </Type>
            </ChildBox>
          </RespRowBox>
          <Spacing size="large" />
          <SectionBox>
            <Type>
              <ClickOrTap titlecase /> on a director below to view a short
              biography below.
            </Type>
            <Spacing />
            <RowBox flexWrap="wrap" flexSpacing={margin} mt={-margin}>
              {directors
                .sort((l, r) => l.district - r.district)
                .map((director, idx) => (
                  <ChildBox key={idx} mt={margin}>
                    <BoardMemberCard
                      name={director.name}
                      district={director.district}
                      imageSrc={director.imgSrc}
                    />
                  </ChildBox>
                ))}
            </RowBox>
            <Spacing />
            <WaitToGrow isIn={Boolean(activeDirector)}>
              <Box
                bgcolor={theme.palette.common.white}
                boxShadow={3}
                p={4}
                borderRadius={3}
              >
                <RespRowBox flexSpacing={4}>
                  <ChildBox flex="80%">
                    <Box textAlign="center">
                      <Type variant="h3" color="primary" gutterBottom>
                        {activeDirector && activeDirector.name}, District{' '}
                        {activeDirector && activeDirector.district}
                      </Type>
                    </Box>
                    <Type gutterBottom>
                      <Link
                        href={`mailto:${(activeDirector &&
                          activeDirector.email) ||
                          ''}`}
                      >
                        {/* Prevent "The prop `children` is marked as required..." in in console w/ Logical Or.  */}
                        {(activeDirector && activeDirector.email) || ''}
                      </Link>
                    </Type>
                    <Type variant="subtitle2" gutterBottom>
                      {`Term of office expires in ${activeDirector &&
                        activeDirector.termExp}`}
                    </Type>
                    <Type paragraph>
                      {activeDirector && activeDirector.bio}
                    </Type>
                  </ChildBox>
                  <ChildBox flex="20%">
                    <Box
                      mx="auto"
                      width={{xs: '60vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
                    >
                      <LazyImgix
                        src={(activeDirector && activeDirector.imgSrc) || ''}
                        height={350}
                        htmlAttributes={{
                          alt: `Photo of District ${activeDirector &&
                            activeDirector.district} Director`
                          // style: {width: '100%'}
                        }}
                      />
                    </Box>
                  </ChildBox>
                </RespRowBox>
              </Box>
            </WaitToGrow>
          </SectionBox>
          <Spacing size="x-large">
            <Divider />
          </Spacing>
          <SectionBox>
            <Type variant="h3" gutterBottom>
              PCWA Board of Directors' Boundaries
            </Type>
            <Type paragraph>
              The PCWA Board of Directors' district boundaries were approved by
              the Placer County Board of Supervisors on October 11, 2011 via
              Ordinance Number 5655-B. These boundaries are coterminous with the
              Placer County Board of Supervisors' district boundaries. Pursuant
              to the Placer County Water Agency Act, the Agency consists of all
              of the territory within the exterior boundaries of the County of
              Placer.
            </Type>
            <Type paragraph>
              <strong>Find Your Director </strong>on the map below. You may also
              search for an address.
            </Type>
            <Spacing />
            <DistrictBoundariesMap />
          </SectionBox>

          <Spacing size="large" />
          <Type variant="h4">District Boundary Maps</Type>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

BoardOfDirectorsDynamicPage.getInitialProps = ({query}: NextPageContext) => {
  isDev && console.log(JSON.stringify(query))
  // Use last character of query param. If that character is not a valid district simply show the index page by setting active director to null.
  const district = queryParamToStr(query['district'])
  const districtNoStrProp = district.substr(-1)
  const districtNoProp = parseInt(districtNoStrProp, 10)
  const noOfDistricts = getMaxDistrict()
  const arrayForTest = Array.from(
    {length: noOfDistricts},
    (_el, index) => index + 1
  )
  if (arrayForTest.indexOf(districtNoProp) >= 0) {
    return {district: districtNoProp}
  } else if (districtNoStrProp.length > 0) {
    return {err: {statusCode: 404}}
  } else {
    return {district: null}
  }
}

export default BoardOfDirectorsDynamicPage
