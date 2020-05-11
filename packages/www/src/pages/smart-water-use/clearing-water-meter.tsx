import React, {useCallback} from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {RespRowBox, ChildBox} from '@components/boxes/FlexBox'
import {
  Typography as Type,
  Box,
  makeStyles,
  createStyles,
  TypographyProps,
  Theme
} from '@material-ui/core'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import StrongEmphasis from '@components/typography/StrongEmphasis/StrongEmphasis'
import Spacing from '@components/boxes/Spacing'
import MainPhone from '@components/links/MainPhone'
import Head from 'next/head'
const useNgIFrame = process.env.NEXT_USE_NG_IFRAME === 'true'

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

  const Main = useCallback(() => {
    return (
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
          <RespRowBox flexSpacing={6}>
            <ChildBox flex="50%">
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
            <ChildBox flex="50%" display="flex">
              <Box
                mx="auto"
                width={{xs: '60vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
              >
                <LazyImgix
                  src="https://cosmic-s3.imgix.net/e6eb9890-8330-11ea-a5d4-3b7865d7bc61-Meter-Clear-Graphic.JPG"
                  htmlAttributes={{
                    alt: 'Illustration showing how to clear your water meter'
                  }}
                />
              </Box>
            </ChildBox>
          </RespRowBox>
        </NarrowContainer>
      </MainBox>
    )
  }, [])

  return useNgIFrame ? (
    <>
      <Head>
        <script src="/static/scripts/iframeResizerOpts.js" defer />
        <script
          src="/static/scripts/iframeResizer.contentWindow.min.js"
          defer
        />
      </Head>
      <Main />
    </>
  ) : (
    <PageLayout title="Clearing Your Water Meter" waterSurface>
      <Main />
    </PageLayout>
  )
}

export default ClearingWaterMeterPage