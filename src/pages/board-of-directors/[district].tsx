// cspell:ignore Santini dugan
import React, {useEffect, useState, useCallback} from 'react'
import {
  useTheme,
  Theme,
  makeStyles,
  createStyles,
  Typography as Type,
  Link,
  Box,
  Divider,
  Badge
} from '@material-ui/core'
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
import WaitToGrow from '@components/WaitToGrow/WaitToGrow'
import ClickOrTap from '@components/ClickOrTap/ClickOrTap'
import {GetStaticPaths, GetStaticProps} from 'next'
import {paramToStr} from '@lib/queryParamToStr'
import MuiNextLink from '@components/NextLink/NextLink'
import ErrorPage from '@pages/_error'
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded'
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
    },
    badgeIcon: {
      backgroundColor: theme.palette.common.white,
      borderRadius: 16
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
              <Type variant="h4" gutterBottom>
                Directors - General Information
              </Type>
              <ul>
                <LinkItem>
                  <MuiNextLink href="/board-of-directors/meeting-agendas">
                    Board Meeting Agendas
                  </MuiNextLink>
                </LinkItem>
                <LinkItem>
                  <MuiNextLink href="/board-of-directors/meeting-minutes">
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
                  src="https://cosmic-s3.imgix.net/6396ea70-2da5-11ea-a6d4-f90f4871ce6f-Board-of-Directors-2020.jpg"
                  htmlAttributes={{
                    alt: 'PCWA Board of Directors - December 2020'
                  }}
                />
              </Box>
              <Type variant="caption">
                PCWA Board of Directors, from left:
                <br />
                Gray Allen, District 1; Robert Dugan, District 4; Primo Santini,
                District 2; Joshua Alpine (Chair), District 5; and Mike Lee
                (Vice Chair), District 3
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
              {directors.map((director, idx) => (
                <ChildBox key={idx} mt={margin}>
                  <Badge
                    invisible={director.district !== activeDirector?.district}
                    badgeContent={
                      <CheckCircleRoundedIcon
                        color="secondary"
                        className={classes.badgeIcon}
                      />
                    }
                  >
                    <BoardMemberCard
                      name={director.name}
                      district={director.district}
                      imageSrc={director.imgSrc}
                      chair={director.chair}
                      viceChair={director.viceChair}
                    />
                  </Badge>
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
                  <ChildBox flex="auto">
                    <Box textAlign="center">
                      <Type variant="h3" color="primary" gutterBottom>
                        {activeDirector?.name}, District{' '}
                        {activeDirector?.district}
                        {activeDirector?.chair ? ' (Chair)' : null}
                        {activeDirector?.viceChair ? ' (Vice Chair)' : null}
                      </Type>
                    </Box>
                    <Type gutterBottom>
                      <Link href={`mailto:${activeDirector?.email ?? ''}`}>
                        {/* Prevent "The prop `children` is marked as required..." in in console w/ Logical Or.  */}
                        {activeDirector?.email ?? ''}
                      </Link>
                    </Type>
                    <Type variant="subtitle2" gutterBottom>
                      {`Term of office expires in ${activeDirector?.termExp}`}
                    </Type>
                    <Type paragraph>{activeDirector?.bio}</Type>
                  </ChildBox>
                  <ChildBox flex="1 0 auto">
                    <Box
                      mx="auto"
                      width={{xs: '50vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
                    >
                      <LazyImgix
                        src={activeDirector?.imgSrc ?? ''}
                        width={225}
                        htmlAttributes={{
                          alt: `Photo of District ${activeDirector?.district} Director`
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

          <Spacing size="x-large" />
          <Type variant="h4" gutterBottom>
            District Boundary Maps (printable)
          </Type>
          <ul>
            <LinkItem>
              <Link
                href="https://cdn.cosmicjs.com/42610260-1dc8-11ea-a594-a170ead8b2cb-SupDist.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Board of Directors' District Boundary Map
              </Link>
            </LinkItem>
          </ul>
          <Type variant="subtitle2" gutterBottom>
            Individual District Maps (shaded area represents district):
          </Type>
          <ul>
            <LinkItem>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://cdn.cosmicjs.com/425394e0-1dc8-11ea-a594-a170ead8b2cb-1stSupDist.pdf"
              >
                District 1 - Board Member Gray Allen
              </Link>
            </LinkItem>
            <LinkItem>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://cdn.cosmicjs.com/425569a0-1dc8-11ea-a8c4-6b69c807b1d7-2ndSupDist.pdf"
              >
                District 2 - Board Member Primo Santini
              </Link>
            </LinkItem>
            <LinkItem>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://cdn.cosmicjs.com/4252d190-1dc8-11ea-a8c4-6b69c807b1d7-3rdSupDist.pdf"
              >
                District 3 - Board Member Mike Lee
              </Link>
            </LinkItem>
            <LinkItem>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://cdn.cosmicjs.com/425e4340-1dc8-11ea-a8c4-6b69c807b1d7-4thSupDist.pdf"
              >
                District 4 - Board Member Robert Dugan
              </Link>
            </LinkItem>
            <LinkItem>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://cdn.cosmicjs.com/425605e0-1dc8-11ea-a594-a170ead8b2cb-5thSupDist.pdf"
              >
                District 5 - Board Member Joshua Alpine
              </Link>
            </LinkItem>
          </ul>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  isDev && console.log('query params: ', JSON.stringify(params))
  // Use last character of query param. If that character is not a valid district simply show the index page by setting active director to null.
  const district = paramToStr(params?.district)
  const districtNoStrProp = district.substr(-1)
  const districtNoProp = parseInt(districtNoStrProp, 10)
  const noOfDistricts = getMaxDistrict()
  const arrayForTest = Array.from(
    {length: noOfDistricts},
    (_el, index) => index + 1
  )
  if (arrayForTest.indexOf(districtNoProp) >= 0) {
    return {props: {district: districtNoProp}}
  } else if (districtNoStrProp.length > 0) {
    return {props: {err: {statusCode: 404}}}
  } else {
    return {props: {district: null}}
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {params: {district: 'district-1'}},
      {params: {district: 'district-2'}},
      {params: {district: 'district-3'}},
      {params: {district: 'district-4'}},
      {params: {district: 'district-5'}}
    ],
    fallback: false
  }
}

export default BoardOfDirectorsDynamicPage
