// cspell:ignore expy
import React from 'react'
import {Box, Theme, Typography as Type, useMediaQuery} from '@material-ui/core'
import ImgixFancy from '@components/ImgixFancy/ImgixFancy'
import {useTheme, createStyles, makeStyles} from '@material-ui/styles'
import {RowBox, ColumnBox} from '@components/boxes/FlexBox'
import {CosmicMediaMeta} from '@lib/services/cosmicService'
import {format} from 'date-fns'

type Props = {
  agenda: CosmicMediaMeta
}

const useStyles = makeStyles(() =>
  createStyles({
    caption: {
      fontStyle: 'italic',
      lineHeight: 1.2
    },
    link: {
      textDecoration: 'none',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    thumbnailContainer: {
      boxShadow: '1px 1px 4px #ccc',
      border: '1px solid transparent',
      '&:hover': {
        border: '1px solid rgba(180, 191, 205, 0.7)'
      }
    }
  })
)

const BoardMinutesLink = ({agenda}: Props) => {
  const classes = useStyles()
  const theme = useTheme<Theme>()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))
  const isSm = useMediaQuery(theme.breakpoints.only('sm'))
  const isMd = useMediaQuery(theme.breakpoints.only('md'))
  const boxWidth = isXs ? '50%' : isSm ? '33.33%' : isMd ? '25%' : '20%'
  const imageWidth = isXs ? 70 : isSm ? 75 : 85

  return (
    <RowBox flex="0 0 auto" width={boxWidth} justifyContent="center" mt={4}>
      <a
        href={agenda.url}
        rel="noopener noreferrer"
        target="_blank"
        className={classes.link}
      >
        <Box width={imageWidth} className={classes.thumbnailContainer}>
          <ImgixFancy
            paddingPercent="129.412%"
            height={200}
            src={agenda.imgix_url}
            alt="Board Minutes Thumbnail"
            htmlAttributesProps={{
              style: {
                backgroundColor: theme.palette.common.white
              }
            }}
          />
        </Box>
        <ColumnBox textAlign="center" mt={1}>
          <Type variant="body2" color="textPrimary" className={classes.caption}>
            {format(agenda.derivedFilenameAttr.publishedDate, 'MM-dd-yyyy')}
          </Type>
          <Type
            variant="body2"
            color="textSecondary"
            className={classes.caption}
          >
            {agenda.derivedFilenameAttr.title}
          </Type>
        </ColumnBox>
      </a>
    </RowBox>
  )
}

export default BoardMinutesLink
