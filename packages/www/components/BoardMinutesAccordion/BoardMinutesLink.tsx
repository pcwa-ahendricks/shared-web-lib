// cspell:ignore expy
import React, {useState, useMemo} from 'react'
import {Box, Theme, Typography as Type, useMediaQuery} from '@material-ui/core'
import ImgixFancy from '@components/ImgixFancy/ImgixFancy'
import {useTheme, createStyles, makeStyles} from '@material-ui/core/styles'
import {ColumnBox, ChildBox} from '@components/boxes/FlexBox'
import {CosmicMediaMeta} from '@lib/services/cosmicService'
import {format, parseJSON} from 'date-fns'
import clsx from 'clsx'
import Link from 'next/link'

const MAX_IMAGE_WIDTH = 85

type Props = {
  date: CosmicMediaMeta['derivedFilenameAttr']['date']
  publishedDate: CosmicMediaMeta['derivedFilenameAttr']['publishedDate']
  title: CosmicMediaMeta['derivedFilenameAttr']['title']
  imgixUrl: CosmicMediaMeta['imgix_url']
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
      maxWidth: MAX_IMAGE_WIDTH, // Force break on white-space.
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

const BoardMinutesLink = ({
  date,
  publishedDate,
  imgixUrl,
  title,
  topMargin = 0
}: Props) => {
  const theme = useTheme<Theme>()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))
  const isSm = useMediaQuery(theme.breakpoints.only('sm'))
  const imageWidth = isXs ? 70 : isSm ? 75 : MAX_IMAGE_WIDTH
  const [isHover, setIsHover] = useState<boolean>(false)
  const classes = useStyles({isHover})

  const url = `/board-of-directors/board-minutes/[meeting-date]`
  const as = `/board-of-directors/board-minutes/${date}`

  const boardMeetingDate = useMemo(() => parseJSON(publishedDate), [
    publishedDate
  ])

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
              // height={100} // Don't specify height since it will break 'data-optimumx' LazySizes plugin.
              lqipWidth={20}
              src={imgixUrl}
              alt="Board Minutes Thumbnail"
              htmlAttributesProps={{
                'data-optimumx': 1, // Don't need retrieve high-dpr/retina images.
                'data-lowsrc': '/static/images/minutes-placeholder.jpg', // Use static asset so we are not making a bunch of silly LQIP requests for a small blurry image that usually looks very similar.
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
              {format(boardMeetingDate, 'MM-dd-yyyy')}
            </Type>
            <Type
              variant="body2"
              className={clsx([classes.caption, classes.titleCaption])}
            >
              {title}
            </Type>
          </ColumnBox>
        </a>
      </Link>
    </ChildBox>
  )
}

export default BoardMinutesLink
