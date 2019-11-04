import React, {useCallback} from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import {Typography as Type, Box, useTheme} from '@material-ui/core'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import {ChildBox, RespRowBox, ColumnBox} from '@components/boxes/FlexBox'
import Spacing from '@components/boxes/Spacing'
import {BoxProps} from '@material-ui/core/Box'
import FancyButton from '@components/FancyButton/FancyButton'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import './rebate-programs.css'
import {useRouter} from 'next/router'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    annotate: {
      textTransform: 'capitalize',
      verticalAlign: 'super',
      fontStyle: 'italic',
      fontWeight: 500,
      paddingRight: theme.spacing(1),
      color: theme.palette.secondary.main
    }
  })
)

const RebateProgramsPage = () => {
  const classes = useStyles()
  const theme = useTheme()
  const RebateCard = ({children, ...rest}: BoxProps) => {
    return (
      <Box p={3} boxShadow={2} bgcolor={theme.palette.common.white} {...rest}>
        {children}
      </Box>
    )
  }

  const router = useRouter()

  const applyEffRebateHandler = useCallback(() => {
    router.push('/forms/rebates/irrigation-efficiencies')
  }, [router])

  return (
    <PageLayout title="Rebate Programs" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle title="Rebate Programs" subtitle="Smart Water Use" />
          <RespRowBox flexSpacing={4}>
            <ChildBox flex="45%">
              <Type paragraph>
                PCWA is proud to offer a variety of rebate programs which help
                its customers upgrade to beautiful, low-maintenance, and
                water-wise landscapes, as well as to incorporate new and more
                water-efficient household appliances. Water conservation
                incentives and services can make your home or business require
                lower water, energy, and landscape maintenance costs, saving you
                money! Not to mention, increased water efficiency helps to
                reduce waste, pollution from irrigation runoff, and greenhouse
                gas emissions from water pumping and heating. Apply today and
                let PCWA help you upgrade your home and become more
                water-efficient!
              </Type>
            </ChildBox>
            <ChildBox flex="55%">
              <LazyImgix
                src="https://cosmic-s3.imgix.net/2b569170-af32-11e9-90f6-45e304c90a10-untitled.png"
                htmlAttributes={{
                  alt: 'Water Efficient Garden',
                  style: {width: '100%'}
                }}
              />
            </ChildBox>
          </RespRowBox>
          <Spacing size="large" />
          <RespRowBox flexSpacing={8}>
            <ChildBox flex="50%">
              <Type variant="h2" color="primary">
                Residential Rebate Programs
              </Type>
              <Spacing />
              <ColumnBox flexSpacing={3}>
                <ChildBox>
                  <RebateCard>
                    <Type paragraph>
                      <Type variant="h6" component="span">
                        Irrigation Efficiencies Rebate -
                      </Type>{' '}
                      Receive up to a $500 rebate for upgrading existing
                      in-ground irrigation systems with new high efficiency
                      equipment and/or installing an EPA Water Sense approved
                      weather based irrigation controller. See{' '}
                      <Type component="em" variant="inherit">
                        program terms &amp; conditions
                      </Type>{' '}
                      for additional information.
                    </Type>
                    <ColumnBox>
                      <FancyButton
                        color="primary"
                        href="https://cdn.cosmicjs.com/04619250-943d-11e9-9403-e5c0f69b7f31-Irrigation-Efficiency-Terms-and-Conditions.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Irrigation Efficiencies Rebate Terms and Conditions"
                        hoverText="View PDF"
                      >
                        Terms &amp; Conditions
                      </FancyButton>
                      <FancyButton
                        color="primary"
                        aria-label="Apply for Efficiencies Rebate Terms and Conditions"
                        hoverText="ApplyNow"
                        onClick={applyEffRebateHandler}
                      >
                        <Type
                          color="secondary"
                          component="span"
                          className={classes.annotate}
                        >
                          *New
                        </Type>
                        Apply Now
                      </FancyButton>
                    </ColumnBox>
                  </RebateCard>
                </ChildBox>
                <ChildBox>
                  <RebateCard>bar</RebateCard>
                </ChildBox>
                <ChildBox>
                  <RebateCard>baz</RebateCard>
                </ChildBox>
              </ColumnBox>
            </ChildBox>
            <ChildBox flex="50%">
              <Type variant="h2" color="primary">
                Commercial Rebate Programs*
              </Type>
            </ChildBox>
          </RespRowBox>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export default RebateProgramsPage
