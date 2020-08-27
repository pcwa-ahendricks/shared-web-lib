import React from 'react'
import {
  Accordion,
  Typography as Type,
  AccordionSummary,
  AccordionDetails
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {RowBox, ChildBox} from '@components/boxes/FlexBox'
import {CosmicMediaMeta} from '@lib/services/cosmicService'
import BoardMinutesLink from './BoardMinutesLink'

type Props = {
  minutes: Pick<
    CosmicMediaMeta,
    '_id' | 'original_name' | 'imgix_url' | 'derivedFilenameAttr'
  >[]
  year: string
  expanded: boolean | string
  onChange: (panel: string) => any
  wasExpanded?: boolean
}

const margin = 4 // Used with left and top margin of flexWrap items.

const BoardMinutesAccordion = ({
  year,
  minutes,
  expanded,
  onChange,
  wasExpanded = false
}: Props) => {
  return (
    <Accordion expanded={expanded === year} onChange={onChange(year)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${year}-board-minutes-panel-content`}
        id={`${year}-board-minutes-panel-header`}
      >
        <Type variant="inherit">{year}</Type>
      </AccordionSummary>
      <AccordionDetails>
        {wasExpanded ? (
          <RowBox flexWrap="wrap" flexSpacing={margin} mt={-margin}>
            {minutes.map((m) => {
              const {derivedFilenameAttr, imgix_url} = m
              const {title = '', publishedDate = '', date = ''} =
                derivedFilenameAttr ?? {}
              return (
                <ChildBox key={m._id} mt={margin}>
                  <BoardMinutesLink
                    imgixUrl={imgix_url}
                    title={title}
                    publishedDate={publishedDate}
                    date={date}
                  />
                </ChildBox>
              )
            })}
          </RowBox>
        ) : (
          <div />
        )}
      </AccordionDetails>
    </Accordion>
  )
}

export default BoardMinutesAccordion
