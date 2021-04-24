import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import Image from 'next/image'
import MediaDialogOnClick from '@components/MediaDialogOnClick/MediaDialogOnClick'
import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  Typography
} from '@material-ui/core'
import Spacing from '@components/boxes/Spacing'
import {RowBox} from 'mui-sleazebox'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mediaDialogImg: {
      borderWidth: '1px !important',
      borderColor: `${theme.palette.grey[300]} !important`,
      borderStyle: 'solid !important',
      [theme.breakpoints.up('sm')]: {
        cursor: 'pointer'
      }
    }
  })
)

export default function WaterWiseHomePage() {
  const classes = useStyles()
  return (
    <PageLayout title="Water-Wise Home" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle title="Water-Wise Home" subtitle="Smart Water Use" />
          <MediaDialogOnClick
            mediaDialogOpen
            mediaName="Water-Wise Home"
            mediaUrl="https://imgix.cosmicjs.com/465fed20-5c21-11eb-afa6-e9412ba0a77c-WaterSaver-Home-Infographic.JPG"
          >
            <Image
              alt="Water-Wise Home brochure"
              priority
              src="https://imgix.cosmicjs.com/465fed20-5c21-11eb-afa6-e9412ba0a77c-WaterSaver-Home-Infographic.JPG"
              layout="responsive"
              sizes="(max-width: 1127px) 100vw, 1127px"
              width={1817}
              height={842}
              className={classes.mediaDialogImg}
            />
          </MediaDialogOnClick>
          <Spacing size="small" />
          <RowBox justifyContent="flex-end">
            <Typography variant="caption">
              Originally featured in PCWA's Fire & Water (2020)
            </Typography>
          </RowBox>
          <Spacing />
          <Button href="https://imgix.cosmicjs.com/465fed20-5c21-11eb-afa6-e9412ba0a77c-WaterSaver-Home-Infographic.JPG?dl=waterwise-home.jpg">
            Download Water-Wise Home Brochure
          </Button>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}
