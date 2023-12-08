import React, {useCallback, useMemo} from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import Spacing from '@components/boxes/Spacing'
import {
  List,
  Typography as Type,
  ListItemText,
  ListItemTextProps,
  Divider,
  useMediaQuery
} from '@mui/material'
import ListBulletItem, {
  ListBulletItemProps
} from '@components/lists/ListBulletItem'
import ImageBlur, {getImgixBlurHashes} from '@components/imageBlur/ImageBlur'
import {Placeholders} from '@components/imageBlur/ImageBlurStore'
import usePlaceholders from '@components/imageBlur/usePlaceholders'
import imgixLoader, {imgixUrlLoader} from '@lib/imageLoader'
import WideContainer from '@components/containers/WideContainer'
import {ChildBox, RowBox} from '@components/MuiSleazebox'
import useTheme from '@hooks/useTheme'
import Link from '@components/Link'

const imgixImages = [
  'f4451c70-0207-11ed-b7be-d956591ad437-Median-grass.jpg',
  'f08db9c0-0207-11ed-b7be-d956591ad437-Business-decorative-grass.jpg',
  'f44df610-0207-11ed-b7be-d956591ad437-Playground-with-grass.jpg',
  'f44a4c90-0207-11ed-b7be-d956591ad437-Soccer-field-grass.jpg'
]

export default function CiiConservationRegulationsPage({
  placeholders
}: {
  placeholders?: Placeholders
}) {
  const theme = useTheme()
  const style = useMemo(
    () => ({
      listItemBullet: {
        minWidth: theme.spacing(5)
      },
      noTopBottomMargin: {
        marginBottom: 0,
        marginTop: 0
      },
      noBottomPadding: {
        paddingBottom: 0
      }
    }),
    [theme]
  )
  usePlaceholders(placeholders)

  const Li = useCallback(
    ({children, ...rest}: ListBulletItemProps) => (
      <ListBulletItem sx={{...style.noBottomPadding}} {...rest}>
        {children}
      </ListBulletItem>
    ),
    [style]
  )

  const LiBody = useCallback(
    ({children, ...rest}: ListItemTextProps) => (
      <ListItemText sx={{...style.noTopBottomMargin}} {...rest}>
        {children}
      </ListItemText>
    ),
    [style]
  )
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))

  return (
    <PageLayout title="Commercial Conservation Regulations" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle
            titleProps={{variant: 'h2'}}
            title="Emergency Conservation Regulations for Commercial, Industrial and Institutional Properties"
          />
          <Spacing />
          <Type paragraph>
            To address California's severe drought, the State Water Resources
            Control Board (SWRCB) recently adopted emergency water conservation
            regulations that prohibit the irrigation of non-functional turf at
            commercial, industrial, and institutional (CII) properties.
          </Type>
          <Type paragraph>
            Non-functional turf is defined in the regulation as{' '}
            <Type component="em" sx={{fontSize: '1.21rem'}}>
              "Turf that is solely ornamental and not regularly used for human
              recreational purposes or for civic or community events."
            </Type>
          </Type>
          <Type>
            There are several exemptions to this definition, including:
          </Type>
          <List disablePadding>
            <Li>
              <LiBody primary="Turf used for human recreation, civic purposes, sports or play." />
            </Li>
            <Li>
              <LiBody primary="Turf irrigated with canal water (water that is not permitted for use as drinking water)." />
            </Li>
            <Li>
              <LiBody primary="Turf on the same valve as at least one tree or perennial non-turf plantings." />
            </Li>
            <Li>
              <LiBody primary="Residential turf unless it is a common area of a Homeowners Association." />
            </Li>
          </List>
          <Spacing />
          <Type paragraph>
            The prohibition is expected to remain in effect for one year
            beginning in June 2022, unless rescinded earlier or extended by the
            SWRCB.
          </Type>
          <Type paragraph>
            Customers are responsible for determining if their turf is
            functional or non-functional, and we've provided several examples
            below. You can also learn more about the state's regulation at{' '}
            <Link
              href="https://bit.ly/conservationreg"
              rel="noopener noreferrer"
              target="_blank"
              noWrap
              underline="hover"
            >
              bit.ly/conservationreg
            </Link>
            .
          </Type>
          <Type variant="subtitle1">Rebates are Available to Help!</Type>
          <Type paragraph>
            PCWA offers services and rebates to help our customers use water
            more efficiently, including rebates for replacing turf with a
            low-water landscape. You can learn more on our{' '}
            <Link underline="always" href="/smart-water-use/rebate-programs">
              Rebates page
            </Link>
            .
          </Type>
          <Spacing />
          {/* <Type variant="subtitle1">Learn More</Type>
          <OpenInNewLink
            pdf
            href="https://cdn.cosmicjs.com/00b905f0-0223-11ed-b7be-d956591ad437-CII-letterFINAL61722.pdf"
          >
            Letter to PCWA CII customers regarding the Emergency Conservation
            Regulations
          </OpenInNewLink> */}
          <Spacing size="x-large">
            <Divider />
          </Spacing>
          <Type variant="h3" color="primary">
            Functional vs. Non-Functional Turf—What's the Difference
          </Type>
          <Spacing />
          <Type variant="subtitle1" gutterBottom>
            Non-Functional Turf
          </Type>
          <Type paragraph>
            Non-functional turf is defined in the regulation as "Turf that is
            solely ornamental and not regularly used for human recreational
            purposes or for civic or community events."
          </Type>
        </NarrowContainer>
        <Spacing />
        <WideContainer>
          <RowBox responsive flexSpacing={6} pt={2}>
            <ChildBox
              flex="50%"
              maxWidth={isXs ? '75vw' : '100vw'}
              width="100%"
              alignSelf="center"
            >
              <ImageBlur
                src="f4451c70-0207-11ed-b7be-d956591ad437-Median-grass.jpg"
                loader={imgixLoader}
                layout="responsive"
                width={533}
                height={800}
                alt="Non-Functional Turf Example photo, 1 of 2 photos"
              />
            </ChildBox>
            <ChildBox flex="50%">
              <ImageBlur
                src="f08db9c0-0207-11ed-b7be-d956591ad437-Business-decorative-grass.jpg"
                loader={imgixLoader}
                layout="responsive"
                height={534}
                width={800}
                alt="Non-Functional Turf Example photo, 2 of 2 photos"
              />
            </ChildBox>
          </RowBox>
        </WideContainer>
        <NarrowContainer>
          <Spacing size="large" factor={2} />
          <Type variant="subtitle1" gutterBottom>
            Functional Turf
          </Type>
          <Type>
            There are several exemptions to non-functional turf definition,
            including:
          </Type>
          <List disablePadding>
            <Li>
              <LiBody primary="Turf used for human recreation, civic purposes, sports or play." />
            </Li>
            <Li>
              <LiBody primary="Turf irrigated with canal water (water that is not permitted for use as drinking water)." />
            </Li>
            <Li>
              <LiBody primary="Turf on the same valve as at least one tree or perennial non-turf plantings." />
            </Li>
            <Li>
              <LiBody primary="Residential turf unless it is a common area of a Homeowners Association." />
            </Li>
          </List>
        </NarrowContainer>
        <Spacing />
        <WideContainer>
          <RowBox responsive flexSpacing={6} pt={2}>
            <ChildBox
              flex="50%"
              maxWidth={isXs ? '80vw' : '100vw'}
              width="100%"
              alignSelf="center"
            >
              <ImageBlur
                src="f44df610-0207-11ed-b7be-d956591ad437-Playground-with-grass.jpg"
                loader={imgixLoader}
                layout="responsive"
                width={800}
                height={531}
                alt="Functional Turf Example photo, 1 of 2 photos"
              />
            </ChildBox>
            <ChildBox flex="50%">
              <ImageBlur
                src="https://imgix.cosmicjs.com/f44a4c90-0207-11ed-b7be-d956591ad437-Soccer-field-grass.jpg?fit=crop&ar=800:531"
                loader={imgixUrlLoader}
                layout="responsive"
                width={800}
                height={531}
                alt="Functional Turf Example photo, 2 of 2 photos"
              />
            </ChildBox>
          </RowBox>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export const getStaticProps = async () => {
  try {
    const placeholders = await getImgixBlurHashes(imgixImages, {
      urlPrefix: 'https://imgix.cosmicjs.com/'
    })
    return {
      props: {placeholders}
    }
  } catch (error) {
    console.log(error)
    return {props: {}}
  }
}
