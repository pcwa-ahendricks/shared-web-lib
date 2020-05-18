import React, {useCallback} from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {RespRowBox, ChildBox} from '@components/boxes/FlexBox'
import {
  Typography as Type,
  Box,
  TypographyProps,
  createStyles,
  Link,
  makeStyles,
  Theme
} from '@material-ui/core'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import MuiNextLink from '@components/NextLink/NextLink'
import Spacing from '@components/boxes/Spacing'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ul: {
      listStyleType: 'none',
      margin: 0,
      // marginLeft: theme.spacing(2),
      padding: 0
    },
    li: {
      marginBottom: theme.spacing(1) / 2
    }
  })
)

const CampgroundsPage = () => {
  const classes = useStyles()

  const TypeLi = useCallback(
    ({children, ...rest}: TypographyProps<'li'>) => (
      <Type component="li" variant="body2" className={classes.li} {...rest}>
        {children}
      </Type>
    ),
    [classes]
  )

  const Ul = useCallback(
    ({children, ...rest}: React.HTMLAttributes<HTMLUListElement>) => (
      <ul className={classes.ul} {...rest}>
        {children}
      </ul>
    ),
    [classes]
  )

  return (
    <PageLayout title="Campgrounds" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle title="Campgrounds" subtitle="Recreation" />
          <RespRowBox flexSpacing={4}>
            <ChildBox flex="60%">
              <Type paragraph>
                High on the western slope of the Sierra, near the headwaters of
                the American and Rubicon Rivers, lies a pristine, relatively
                undiscovered area;{' '}
                <MuiNextLink href="/recreation/french-meadows">
                  French Meadows Reservoir{' '}
                </MuiNextLink>
                and{' '}
                <MuiNextLink href="/recreation/hell-hole">
                  Hell Hole Reservoir,
                </MuiNextLink>{' '}
                owned and operated by PCWA, attract outdoor enthusiasts who want
                to get away to enjoy uncrowded natural beauty. Snowbound in the
                winter, the reservoirs and surrounding area are generally
                accessible from Memorial Day weekend through early October.
              </Type>
            </ChildBox>
            <ChildBox flex="40%" display="flex">
              <Box
                mx="auto"
                width={{xs: '60vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
              >
                <LazyImgix
                  src="https://cosmicjs.imgix.net/16d575a0-6b3b-11e7-b4b0-738ba83d40d7-campground-picnic-table.jpg"
                  htmlAttributes={{
                    alt: 'Lake View Campsite at French Meadows Reservoir'
                  }}
                />
              </Box>
            </ChildBox>
          </RespRowBox>
          <Spacing />
          <Box>
            <Type variant="h3" gutterBottom>
              Directions
            </Type>
            <Type paragraph>
              French Meadows Reservoir is located 50 miles east of Auburn, via
              the twisting, turning Mosquito Ridge Road. It’s another 10 miles
              to Hell Hole Reservoir. The reservoirs date to 1963-66 when they
              were built as part of the Middle Fork American River Hydroelectric
              Project, which created additional water supplies and a valuable
              hydroelectric power generation system for Placer County.
            </Type>
            <Type paragraph>
              French Meadows Reservoir, near the headwaters of the Middle Fork
              American River, is a large 1,408 acre reservoir. Campground and
              boat launch facilities are located around the lake and along the
              Middle Fork American River upstream from the reservoir.
            </Type>
          </Box>
          <Spacing />
          <RespRowBox justifyContent="space-between" flexSpacing={3}>
            <ChildBox>
              <Type variant="subtitle1" color="primary">
                French Meadows Area Campgrounds:
              </Type>
              <Ul>
                <TypeLi>French Meadows Family Campground</TypeLi>
                <TypeLi>Lewis Family Campground</TypeLi>
                <TypeLi>Gates Group Campground</TypeLi>
                <TypeLi>Coyote Group Campground</TypeLi>
              </Ul>
            </ChildBox>
            <ChildBox>
              <Type variant="subtitle1" color="primary">
                French Meadows Remote Sites:
              </Type>
              <Ul>
                <TypeLi>Ahart Campground (one mile upstream)</TypeLi>
                <TypeLi>Talbot Campground (three miles upstream)</TypeLi>
                <TypeLi>
                  Poppy Campground (north shore hike or boat access)
                </TypeLi>
              </Ul>
            </ChildBox>
          </RespRowBox>
          <Spacing />
          <Box>
            <Type paragraph>
              For current fees and/or more information contact the U.S. Forest
              District at 530-367-2224 or visit online at{' '}
              <Link
                title="www.fs.usda.gov/r5"
                href="https://www.fs.usda.gov/r5"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.fs.fed.us
              </Link>
              . For reservations, call the National Forest Reservation System at
              1-800-280-CAMP or visit them online at{' '}
              <Link
                title="www.reserveusa.com"
                href="https://www.reserveamerica.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.reserveusa.com
              </Link>
              .
            </Type>
          </Box>

          <Spacing size="large" />
          <RespRowBox justifyContent="space-between" flexSpacing={3}>
            <ChildBox>
              <Type variant="subtitle1" color="primary">
                Hell Hole Area Campgrounds:
              </Type>
              <Ul>
                <TypeLi>Big Meadows Campground (4 miles from reservoir)</TypeLi>
                <TypeLi>Hell Hole Campground (1 mile from reservoir)</TypeLi>
                <TypeLi>Middle Meadows Group Campground</TypeLi>
              </Ul>
            </ChildBox>
            <ChildBox>
              <Type variant="subtitle1" color="primary">
                Hell Hole Remote Site:
              </Type>
              <Ul>
                <TypeLi>Upper Hell Hole Campground (5 mile hike)</TypeLi>
              </Ul>
            </ChildBox>
          </RespRowBox>
          <Spacing />
          <Box>
            <Type paragraph>
              For current fees and/or more information, contact the U.S. Forest
              Service Georgetown Ranger District at (530) 622-5061 or visit
              online at{' '}
              <Link
                title="www.fs.fed.us"
                href="https://www.fs.usda.gov/eldorado/"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.fs.fed.us
              </Link>
              .
            </Type>
          </Box>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default CampgroundsPage
