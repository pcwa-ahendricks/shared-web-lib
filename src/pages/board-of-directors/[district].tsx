// cspell:ignore Santini dugan
import React, {useEffect, useState, useCallback} from 'react'
import {
  useTheme,
  Theme,
  Typography as Type,
  Link,
  Box,
  Divider,
  Badge,
  Button
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import Image from 'next/image'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import PageTitle from '@components/PageTitle/PageTitle'
import WideContainer from '@components/containers/WideContainer'
import {ChildBox, ColumnBox, RowBox} from 'mui-sleazebox'
import Spacing from '@components/boxes/Spacing'
import SectionBox from '@components/boxes/SectionBox'
// import DistrictBoundariesMap from '@components/DistrictBoundariesMap/DistrictBoundariesMap'
import BoardMemberCard from '@components/BoardMemberCard/BoardMemberCard'
import {directors, Director} from '@lib/directors'
import WaitToGrow from '@components/WaitToGrow/WaitToGrow'
import ClickOrTap from '@components/ClickOrTap/ClickOrTap'
import {GetStaticPaths, GetStaticProps} from 'next'
import {paramToStr} from '@lib/queryParamToStr'
import MuiNextLink from '@components/NextLink/NextLink'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import imgixLoader, {imgixUrlLoader} from '@lib/imageLoader'
import {stringify} from 'querystringify'
import OpenInNewLink from '@components/OpenInNewLink/OpenInNewLink'
const isDev = process.env.NODE_ENV === 'development'

type Props = {
  district?: number
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

const BoardOfDirectorsDynamicPage = ({district: districtProp}: Props) => {
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

  return (
    <PageLayout title="Board of Directors" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle title="PCWA Board of Directors" />
          <RowBox responsive flexSpacing={4}>
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
            <ColumnBox child flex="40%" alignItems="center" textAlign="center">
              <Box mx="auto" mb={1} width="100%">
                <Image
                  layout="responsive"
                  loader={imgixLoader}
                  sizes="(max-width: 600px) 100vw, 40vw"
                  src="6e8caa50-7596-11ed-8951-b39aeeb44ac4-PCWA-Board-of-Directors-2023.jpg"
                  alt="PCWA Board of Directors - 2022"
                  width={6400}
                  height={4480}
                />
              </Box>
              <Type variant="caption">
                PCWA Board of Directors, from left:
                <br />
                Primo Santini, District 2; Joshua Alpine, District 5; Mike Lee,
                District 3; Gray Allen (Vice Chair), District 1; and Robert
                Dugan (Chair), District 4
              </Type>
            </ColumnBox>
          </RowBox>
          <Spacing size="large" />
          <SectionBox>
            <Type>
              <ClickOrTap titlecase /> on a director below to view a short
              biography below.
            </Type>
            <Spacing />
            <RowBox flexWrap="wrap" flexSpacing={margin}>
              {directors.map((director, idx) => (
                <ChildBox key={idx}>
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
                borderRadius="3px"
              >
                <RowBox responsive flexSpacing={6}>
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
                  <ChildBox minWidth={250} maxWidth="100vw">
                    <Box
                      mx="auto"
                      width={{xs: '50vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
                    >
                      <Image
                        loader={imgixUrlLoader}
                        src={activeDirector?.imgSrc ?? ''}
                        layout="intrinsic"
                        objectFit="cover"
                        sizes="(max-width: 600px) 50vw, 25vw"
                        width={256}
                        height={337}
                        alt={`Photo of District ${activeDirector?.district} Director`}
                      />
                    </Box>
                  </ChildBox>
                </RowBox>
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
              The PCWA Board of Directors' district boundaries are coterminous
              with the Placer County Board of Supervisors' district boundaries.
              Pursuant to the Placer County Water Agency Act, the Agency
              consists of all of the territory within the exterior boundaries of
              the County of Placer.
            </Type>

            <Type paragraph>
              <strong>Find Your PCWA Director District </strong>using our
              interactive map viewer to search for your address. Click the
              following link to open the map viewer in a new tab.
            </Type>
            <Spacing />
            <Button
              href="https://experience.arcgis.com/experience/35747f7eb6804a35bc56ab668a7471fa/"
              rel="noopener"
              variant="contained"
              color="secondary"
              target="_blank"
            >
              Find Your District with our interactive map
            </Button>
            <Spacing size="large" />
            {/* <DistrictBoundariesMap /> */}
            <Box>
              {/* <MediaDialogOnClick
                mediaUrl="https://imgix.cosmicjs.com/296efa40-647a-11ed-ac6e-953bfe2b7aee-DirectorDistricts.pdf"
                mediaName="PCWA Board of Directors' District Boundaries Map"
                mediaPreviewDialogProps={{
                  width: 700,
                  height: 505
                }}
              > */}
              <Image
                loader={imgixUrlLoader}
                width={3300}
                height={2550}
                alt="PCWA Board of Directors' District Boundaries Map"
                src={`https://imgix.cosmicjs.com/296efa40-647a-11ed-ac6e-953bfe2b7aee-DirectorDistricts.pdf${stringify(
                  {border: '1,AAAAAA'},
                  true
                )}`}
                layout="responsive"
                sizes="100vw"
              />
              {/* </MediaDialogOnClick> */}
              <ColumnBox alignItems="center">
                <Box mt={1}>
                  <Type variant="caption">
                    PCWA Board of Directors' District Boundaries
                  </Type>
                </Box>
              </ColumnBox>
            </Box>
          </SectionBox>

          <Spacing size="x-large" />
          <Type variant="h4" gutterBottom>
            District Boundary Maps (printable)
          </Type>
          {/* <ul> */}
          <OpenInNewLink
            pdf
            href="https://docs.pcwa.net/pcwa-bod-district-boundary-map"
          >
            PCWA Board of Directors' District Boundary Map
          </OpenInNewLink>
          {/* <LinkItem>
              <Link
                href="https://cdn.cosmicjs.com/5d7773d0-8ebf-11ec-8eb7-31ef43f419bf-DirectorDistricts.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Board of Directors' District Boundary Map
              </Link>
            </LinkItem> */}
          {/* </ul> */}
          {/* <Type variant="subtitle2" gutterBottom>
            Individual District Maps (shaded area represents district):
          </Type> */}
          {/* <ul>
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
          </ul> */}
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
    return {
      notFound: true
    }
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
