// cspell:ignore maptype
import React, {useEffect, useCallback, useState} from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import WaterSurfaceImg from '@components/WaterSurfaceImg/WaterSurfaceImg'
import {
  getMedia,
  fileNameUtil,
  CosmicMediaMeta
} from '@lib/services/cosmicService'
import {compareDesc, format} from 'date-fns'
import groupBy from '@lib/groupBy'
import {
  RespRowBox,
  RespChildBox,
  RowBox,
  ColumnBox
} from '@components/boxes/FlexBox'
import LazyImgix from '@components/LazyImgix/LazyImgix'
const DATE_FNS_FORMAT = 'MM-dd-yyyy'
const DATE_FNS_FORMAT_2012 = 'MM-dd-yy' // [todo] These should be renamed and re-uploaded to Cosmic.

import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography as Type,
  Box,
  Theme,
  useMediaQuery
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ImgixFancy from '@components/ImgixFancy/ImgixFancy'
import {useTheme, createStyles, makeStyles} from '@material-ui/styles'

type groupedBoardMinutes = Array<{
  year: number
  values: CosmicMediaMeta[]
}>

const useStyles = makeStyles(() =>
  createStyles({
    caption: {
      fontStyle: 'italic',
      lineHeight: 1.2
    },
    link: {
      textDecoration: 'none'
    },
    thumbnailContainer: {
      boxShadow: '1px 1px 4px #ccc',
      marginBottom: '0.7em',
      marginLeft: 'auto', // helps center align image in mobile
      marginRight: 'auto', // helps center align image in mobile
      border: '1px solid white',
      '&:hover': {
        border: '1px solid rgba(180, 191, 205, 0.7)'
      }
    }
  })
)

const BoardMinutesPage = () => {
  const classes = useStyles()
  const theme = useTheme<Theme>()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))
  const isSm = useMediaQuery(theme.breakpoints.only('sm'))
  const isMd = useMediaQuery(theme.breakpoints.only('md'))

  const [boardMinutes, setBoardMinutes] = useState<groupedBoardMinutes>([])
  const [expanded, setExpanded] = useState<boolean | string>(false)
  const [expandedYears, setExpandedYears] = useState<{[year: string]: boolean}>(
    {}
  )

  const handleChange = (panel: string) => (
    _event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false)
    setExpandedYears((expy) => ({
      ...expy,
      [panel]: isExpanded ? true : expy[panel]
    }))
  }

  const fetchBoardMinutes = useCallback(async () => {
    const bma = await getMedia({folder: 'board-minutes'})
    if (!bma) {
      return
    }
    const bmaEx = bma.map((bm) => ({
      ...bm,
      derivedFilenameAttr: fileNameUtil(
        bm.original_name,
        (((bm.original_name || '').match(/^[^_]*/) || [])[0] || []).length === 8
          ? DATE_FNS_FORMAT_2012
          : DATE_FNS_FORMAT
      )
    }))
    // Group Board Minutes by derived Year into JS Map.
    const grouped = groupBy<CosmicMediaMeta, number>(
      bmaEx,
      (mbm) => mbm.derivedFilenameAttr.publishedYear
    )
    // Transform JS Map into a usable Array of Objects.
    const tmpSortedGroups = [] as groupedBoardMinutes
    for (const [k, v] of grouped) {
      // Sort individual Board Minutes by published date property.
      tmpSortedGroups.push({
        year: k,
        values: [...v].sort((a, b) =>
          compareDesc(
            a.derivedFilenameAttr.publishedDate,
            b.derivedFilenameAttr.publishedDate
          )
        )
      })
    }
    // Sort grouped database by Year.
    const sortedGroups = tmpSortedGroups.sort((a, b) => b.year - a.year)
    setBoardMinutes(sortedGroups)
  }, [])

  useEffect(() => {
    fetchBoardMinutes()
  }, [fetchBoardMinutes])

  console.log(boardMinutes)

  const boxWidth = isXs ? '50%' : isSm ? '33.33%' : isMd ? '25%' : '20%'
  const imageWidth = isXs ? 70 : isSm ? 75 : 85

  return (
    <PageLayout title="Board of Directors' Minutes">
      <WaterSurfaceImg />
      <MainBox>
        <WideContainer>
          <PageTitle
            title="Board of Directors' Minutes"
            subtitle="About PCWA"
          />
          <RespRowBox>
            <RespChildBox first flex={{xs: '100%', sm: '65%'}}>
              {boardMinutes.map((v) => {
                const year = v.year.toString()
                const minutes = [...v.values]
                return (
                  <ExpansionPanel
                    key={year}
                    expanded={expanded === year}
                    onChange={handleChange(year)}
                  >
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`${year}-board-minutes-panel-content`}
                      id={`${year}-board-minutes-panel-header`}
                    >
                      <Type variant="inherit">{year}</Type>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      {expandedYears[year] === true ? (
                        <RowBox flexWrap="wrap" mt={-4}>
                          {minutes.map((m) => {
                            return (
                              <RowBox
                                key={m._id}
                                flex="0 0 auto"
                                width={boxWidth}
                                justifyContent="center"
                                mt={4}
                              >
                                <a
                                  href={m.url}
                                  rel="noopener noreferrer"
                                  target="_blank"
                                  className={classes.link}
                                >
                                  <Box
                                    width={imageWidth}
                                    className={classes.thumbnailContainer}
                                  >
                                    <ImgixFancy
                                      paddingPercent="129.412%"
                                      height={200}
                                      src={m.imgix_url}
                                      alt="Board Minutes Thumbnail"
                                      htmlAttributesProps={{
                                        style: {
                                          backgroundColor:
                                            theme.palette.common.white
                                        }
                                      }}
                                    />
                                  </Box>
                                  <ColumnBox textAlign="center" mt={1}>
                                    <Type
                                      variant="body2"
                                      color="textPrimary"
                                      className={classes.caption}
                                    >
                                      {format(
                                        m.derivedFilenameAttr.publishedDate,
                                        'MM-dd-yyyy'
                                      )}
                                    </Type>
                                    <Type
                                      variant="body2"
                                      color="textSecondary"
                                      className={classes.caption}
                                    >
                                      {m.derivedFilenameAttr.title}
                                    </Type>
                                  </ColumnBox>
                                </a>
                              </RowBox>
                            )
                          })}
                        </RowBox>
                      ) : (
                        <div />
                      )}
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                )
              })}
            </RespChildBox>
            <RespChildBox
              flexSpacing={4}
              flex="auto"
              m={{xs: 'auto', sm: 0}} // Center image in small layouts.
              ml={{xs: 'auto', sm: 4}} // xs: auto will center image in small layouts.
            >
              <LazyImgix
                src="https://cosmicjs.imgix.net/dc58efe0-6b19-11e7-9040-ddfa5350c930-board-minutes-aside.jpg"
                htmlAttributes={{
                  alt: 'Photo of past PCWA Board Members',
                  style: {width: '100%'}
                }}
              />
            </RespChildBox>
          </RespRowBox>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export default BoardMinutesPage
