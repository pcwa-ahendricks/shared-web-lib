// cspell:ignore expy
import React, {useState} from 'react'
import {Box, Theme, Typography as Type, useMediaQuery} from '@material-ui/core'
import ImgixFancy from '@components/ImgixFancy/ImgixFancy'
import {useTheme, createStyles, makeStyles} from '@material-ui/styles'
import {ColumnBox, ChildBox} from '@components/boxes/FlexBox'
import {CosmicMediaMeta} from '@lib/services/cosmicService'
import {format} from 'date-fns'
import clsx from 'clsx'
import Link from 'next/link'

type Props = {
  minutes: CosmicMediaMeta
  topMargin?: number
}

type UseStylesProps = {
  isHover: boolean
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    caption: {
      fontStyle: 'italic',
      lineHeight: 1.2
    },
    dateCaption: ({isHover}: UseStylesProps) => ({
      color: !isHover ? theme.palette.text.primary : theme.palette.primary.main
    }),
    titleCaption: ({isHover}: UseStylesProps) => ({
      color: !isHover
        ? theme.palette.text.secondary
        : theme.palette.primary.main
    }),
    link: {
      textDecoration: 'none',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    thumbnailContainer: ({isHover}: UseStylesProps) => ({
      boxShadow: '1px 1px 4px #ccc',
      border: !isHover
        ? '1px solid transparent'
        : '1px solid rgba(180, 191, 205, 0.7)'
    })
  })
)

const BoardMinutesLink = ({minutes, topMargin = 0}: Props) => {
  const theme = useTheme<Theme>()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))
  const isSm = useMediaQuery(theme.breakpoints.only('sm'))
  const imageWidth = isXs ? 70 : isSm ? 75 : 85
  const [isHover, setIsHover] = useState<boolean>(false)
  const classes = useStyles({isHover})

  const url = `/about-pcwa/board-minutes/[meeting-date]`
  const as = `/about-pcwa/board-minutes/${minutes.derivedFilenameAttr.date}`

  return (
    <ChildBox mt={topMargin}>
      <Link href={url} passHref as={as}>
        <a
          className={classes.link}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <Box width={imageWidth} className={classes.thumbnailContainer}>
            <ImgixFancy
              paddingPercent="129.412%"
              height={100}
              lqipWidth={20}
              src={minutes.imgix_url}
              alt="Board Minutes Thumbnail"
              htmlAttributesProps={{
                style: {
                  backgroundColor: theme.palette.common.white
                }
              }}
            />
          </Box>
          <ColumnBox textAlign="center" mt={1}>
            <Type
              variant="body2"
              className={clsx([classes.caption, classes.dateCaption])}
            >
              {format(minutes.derivedFilenameAttr.publishedDate, 'MM-dd-yyyy')}
            </Type>
            <Type
              variant="body2"
              className={clsx([classes.caption, classes.titleCaption])}
            >
              {minutes.derivedFilenameAttr.title}
            </Type>
          </ColumnBox>
        </a>
      </Link>
    </ChildBox>
  )
}

export default BoardMinutesLink
