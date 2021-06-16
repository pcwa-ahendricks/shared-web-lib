import React from 'react'
import {
  Accordion,
  Typography as Type,
  AccordionSummary,
  AccordionDetails
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {RowBox, ChildBox} from 'mui-sleazebox'
import {CosmicMediaMeta} from '@lib/services/cosmicService'
import BoardMinutesLink from './BoardMinutesLink'

type Props = {
  minutes: Pick<
    CosmicMediaMeta,
    'id' | 'original_name' | 'imgix_url' | 'derivedFilenameAttr'
  >[]
  year: string
  expanded: boolean | string
  onChange: (panel: string) => any
  wasExpanded?: boolean
}

const BoardMinutesAccordion = ({
  year,
  minutes,
  expanded,
  onChange,
  wasExpanded = false
}: Props) => {
  return (
    <Accordion
      expanded={expanded === year}
      onChange={onChange(year)}
      TransitionProps={{unmountOnExit: true}} // May help with performance
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${year}-board-minutes-panel-content`}
        id={`${year}-board-minutes-panel-header`}
      >
        <Type variant="inherit">{year}</Type>
      </AccordionSummary>
      <AccordionDetails>
        {wasExpanded ? (
          <RowBox flexWrap="wrap" flexSpacing={4}>
            {minutes.map((m) => {
              const {derivedFilenameAttr, imgix_url} = m
              const {
                title = '',
                publishedDate = '',
                date = ''
              } = derivedFilenameAttr ?? {}
              return (
                <ChildBox key={m.id}>
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
