import React, {useCallback} from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import Spacing from '@components/boxes/Spacing'
import {
  createStyles,
  List,
  makeStyles,
  Typography as Type,
  ListItemText,
  ListItemTextProps,
  Link,
  Box
} from '@material-ui/core'
import ListBulletItem, {
  ListBulletItemProps
} from '@components/lists/ListBulletItem'
import MuiNextLink from '@components/NextLink/NextLink'
import OpenInNewLink from '@components/OpenInNewLink/OpenInNewLink'
import ImageBlur, {getImgixBlurHashes} from '@components/imageBlur/ImageBlur'
import {Placeholders} from '@components/imageBlur/ImageBlurStore'
import usePlaceholders from '@components/imageBlur/usePlaceholders'
import imgixLoader from '@lib/imageLoader'

const imgixImages = [
  'f4451c70-0207-11ed-b7be-d956591ad437-Median-grass.jpg',
  'f08db9c0-0207-11ed-b7be-d956591ad437-Business-decorative-grass.jpg'
]

const useStyles = makeStyles((theme) =>
  createStyles({
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
  })
)

export default function CiiConservationRegulationsPage({
  placeholders
}: {
  placeholders?: Placeholders
}) {
  const classes = useStyles()
  usePlaceholders(placeholders)

  const Li = useCallback(
    ({children, ...rest}: ListBulletItemProps) => (
      <ListBulletItem classes={{root: classes.noBottomPadding}} {...rest}>
        {children}
      </ListBulletItem>
    ),
    [classes]
  )

  const LiBody = useCallback(
    ({children, ...rest}: ListItemTextProps) => (
      <ListItemText classes={{root: classes.noTopBottomMargin}} {...rest}>
        {children}
      </ListItemText>
    ),
    [classes]
  )

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
            <em style={{fontSize: '1.21rem'}}>
              "Turf that is solely ornamental and not regularly used for human
              recreational purposes or for civic or community events."
            </em>
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
            <MuiNextLink
              underline="always"
              href="/smart-water-use/rebate-programs"
            >
              Rebates page
            </MuiNextLink>
            .
          </Type>
          <Spacing />
          <Type variant="subtitle1">Learn More</Type>
          <OpenInNewLink
            pdf
            href="https://cdn.cosmicjs.com/00b905f0-0223-11ed-b7be-d956591ad437-CII-letterFINAL61722.pdf"
          >
            Letter to PCWA CII customers regarding the Emergency Conservation
            Regulations
          </OpenInNewLink>
          <Spacing size="large" />
          <Type variant="h3" color="primary">
            Functional vs. Non-Functional Turf—What's the Difference
          </Type>
          <Spacing />
          <Type variant="subtitle1">Non-Functional Turf</Type>
          <Type paragraph>
            Non-functional turf is defined in the regulation as "Turf that is
            solely ornamental and not regularly used for human recreational
            purposes or for civic or community events."
          </Type>
          <Box maxWidth="80%" m="auto" pt={2}>
            <ImageBlur
              src="f4451c70-0207-11ed-b7be-d956591ad437-Median-grass.jpg"
              loader={imgixLoader}
              layout="responsive"
              width={533}
              height={800}
              alt="Non-Functional Turf Example photo, 1 of 2 photos"
            />
          </Box>
          <Spacing factor={2} />
          <ImageBlur
            src="f08db9c0-0207-11ed-b7be-d956591ad437-Business-decorative-grass.jpg"
            loader={imgixLoader}
            layout="responsive"
            height={534}
            width={800}
            alt="Non-Functional Turf Example photo, 1 of 2 photos"
          />
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export const getStaticProps = async () => {
  try {
    const placeholders = await getImgixBlurHashes(imgixImages)
    return {
      props: {placeholders}
    }
  } catch (error) {
    console.log(error)
    return {props: {}}
  }
}
