// cspell:ignore expy
import React, {useState, useMemo, forwardRef} from 'react'
import {
  Box,
  Theme,
  Typography as Type,
  useMediaQuery,
  useTheme,
  createStyles,
  makeStyles,
  BoxProps
} from '@material-ui/core'
import {ColumnBox} from 'mui-sleazebox'
import {CosmicMediaMeta} from '@lib/services/cosmicService'
import {format, parseJSON} from 'date-fns'
import clsx from 'clsx'
import Link from 'next/link'
import Image from 'next/image'
import {imgixUrlLoader} from '@lib/imageLoader'

const MAX_IMAGE_WIDTH = 85

type Props = {
  // These stopped working when derivedFilenameAttr became optional.
  // date: CosmicMediaMeta['derivedFilenameAttr']['date']
  // publishedDate: CosmicMediaMeta['derivedFilenameAttr']['publishedDate']
  // title: CosmicMediaMeta['derivedFilenameAttr']['title']
  date: string
  publishedDate: string
  title: string
  imgixUrl: CosmicMediaMeta['imgix_url']
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
      cursor: 'pointer'
    },
    thumbnailContainer: ({isHover}: UseStylesProps) => ({
      backgroundColor: theme.palette.common.white,
      boxShadow: '1px 1px 4px #ccc',
      border: !isHover
        ? '1px solid transparent'
        : '1px solid rgba(180, 191, 205, 0.7)'
    })
  })
)

const ColumnBoxEx = forwardRef(({children, ...props}: BoxProps, ref) => (
  <ColumnBox {...props} {...ref}>
    {children}
  </ColumnBox>
))
ColumnBoxEx.displayName = 'ColumnBoxEx'

const BoardMinutesLink = ({date, publishedDate, imgixUrl, title}: Props) => {
  const theme = useTheme<Theme>()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))
  const isSm = useMediaQuery(theme.breakpoints.only('sm'))
  const imageWidth = isXs ? 70 : isSm ? 75 : MAX_IMAGE_WIDTH
  const [isHover, setIsHover] = useState<boolean>(false)
  const classes = useStyles({isHover})

  const url = `/board-of-directors/meeting-minutes/[meeting-date]`
  const as = `/board-of-directors/meeting-minutes/${date}`

  const boardMeetingDate = useMemo(() => parseJSON(publishedDate), [
    publishedDate
  ])

  return (
    <Link href={url} as={as}>
      <ColumnBoxEx
        alignItems="center"
        className={classes.link}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <Box width={imageWidth} className={classes.thumbnailContainer}>
          <Image
            loader={imgixUrlLoader}
            src={imgixUrl}
            layout="responsive"
            alt="Board Minutes Thumbnail"
            width={90}
            height={116}
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
      </ColumnBoxEx>
    </Link>
  )
}

export default BoardMinutesLink
