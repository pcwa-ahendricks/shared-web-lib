import React, {useCallback} from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {RowBox, ChildBox} from 'mui-sleazebox'
import {
  Typography as Type,
  Box,
  makeStyles,
  createStyles,
  TypographyProps,
  Theme
} from '@material-ui/core'
import StrongEmphasis from '@components/typography/StrongEmphasis/StrongEmphasis'
import Spacing from '@components/boxes/Spacing'
import MainPhone from '@components/links/MainPhone'
import ResponsiveYouTubePlayer from '@components/ResponsiveYouTubePlayer/ResponsiveYouTubePlayer'
import imgixLoader from '@lib/imageLoader'
import Image from 'next/image'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bulletLi: {
      listStyleType: 'disc',
      marginBottom: theme.spacing(1)
    }
  })
)

const ClearingWaterMeterPage = () => {
  const classes = useStyles()
  const TypeBullet = useCallback(
    ({children, ...rest}: TypographyProps<'li'>) => {
      return (
        <Type component="li" className={classes.bulletLi} {...rest}>
          {children}
        </Type>
      )
    },
    [classes]
  )

  return (
    <PageLayout title="Clearing Your Water Meter" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle
            title="Please Keep Your Water Meter Clear"
            subtitle="Smart Water Use"
          />
          <StrongEmphasis variant="subtitle1" color="secondary" paragraph>
            PCWA requires clear access to water meters at all times!
          </StrongEmphasis>
          <Type paragraph>
            Parked vehicles, overgrown plants, yard debris and construction
            materials prevent meter readers and maintenance crews from doing
            their jobs.
          </Type>
          <Spacing />
          <RowBox responsive flexSpacing={6}>
            <ChildBox flex="55%">
              <Type paragraph>Please keep your meter clear:</Type>
              <ul>
                <TypeBullet>
                  Keep bushes and grass trimmed to the edge of the meter box.
                </TypeBullet>
                <TypeBullet>
                  Remove all branches hanging lower than six feet over the box.
                </TypeBullet>
                <TypeBullet>
                  Keep everything off the meter box, including trash cans and
                  recycling bins.
                </TypeBullet>
              </ul>

              <Spacing />
              <Type paragraph>
                Questions? Call Customer Services at <MainPhone />.
              </Type>
              <Type paragraph>Thank you for your help!</Type>
            </ChildBox>
            <ChildBox flex="45%" display="flex">
              <Box
                mx="auto"
                width={{xs: '60vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
              >
                <Image
                  loader={imgixLoader}
                  src="e6eb9890-8330-11ea-a5d4-3b7865d7bc61-Meter-Clear-Graphic.JPG"
                  alt="Illustration showing how to clear your water meter"
                  layout="responsive"
                  sizes="(max-width: 600px) 60vw, 45vw"
                  width={1080}
                  height={1714}
                />
              </Box>
            </ChildBox>
          </RowBox>

          <Spacing size="x-large" />

          <Box mx="auto" width="100%">
            <ResponsiveYouTubePlayer
              controls
              url="https://www.youtube.com/watch?v=5Z6ClHaOV9E"
              config={{
                youtube: {
                  playerVars: {showinfo: 1}
                }
              }}
            />
          </Box>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default ClearingWaterMeterPage
