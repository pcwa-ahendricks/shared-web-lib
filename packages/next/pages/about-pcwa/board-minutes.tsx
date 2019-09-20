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
import {compareDesc} from 'date-fns'
import groupBy from '@lib/groupBy'
import {RespRowBox, RespChildBox, RowBox} from '@components/boxes/FlexBox'
import LazyImgix from '@components/LazyImgix/LazyImgix'
const DATE_FNS_FORMAT = 'MM-dd-yyyy'
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography as Type,
  Box,
  Theme
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ImgixFancy from '@components/ImgixFancy/ImgixFancy'
import {useTheme} from '@material-ui/styles'

type groupedBoardMinutes = Array<{
  year: number
  values: CosmicMediaMeta[]
}>

const BoardMinutesPage = () => {
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

  console.log(expandedYears)

  const fetchBoardMinutes = useCallback(async () => {
    const bma = await getMedia({folder: 'board-minutes'})
    if (!bma) {
      return
    }
    const bmaEx = bma.map((bm) => ({
      ...bm,
      derivedFilenameAttr: fileNameUtil(bm.original_name, DATE_FNS_FORMAT)
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

  const theme = useTheme<Theme>()

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
              {boardMinutes.map((v, idx) => {
                const year = v.year.toString()
                const minutes = [...v.values]
                return (
                  <ExpansionPanel
                    key={idx}
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
                        <RowBox flexWrap="wrap">
                          {minutes.map((m) => {
                            return (
                              <Box key={m._id} width={85} mr={4} mt={4}>
                                <ImgixFancy
                                  paddingPercent="129.412%"
                                  height={100}
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
