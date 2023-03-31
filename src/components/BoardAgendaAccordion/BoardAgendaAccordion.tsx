import React from 'react'
import {
  Accordion,
  Typography as Type,
  AccordionSummary,
  AccordionDetails
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {RowBox, ChildBox} from 'mui-sleazebox'
import {CosmicMediaMeta} from '@lib/services/cosmicService'
import BoardAgendaLink from './BoardAgendaLink'

type Props = {
  agendas: Pick<
    CosmicMediaMeta,
    'id' | 'original_name' | 'imgix_url' | 'derivedFilenameAttr'
  >[]
  year: string
  expanded: boolean | string
  onChange: (panel: string) => any
  wasExpanded?: boolean
}

const BoardAgendaAccordion = ({
  year,
  agendas,
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
        aria-controls={`${year}-board-agenda-panel-content`}
        id={`${year}-board-agenda-panel-header`}
      >
        <Type variant="inherit">{year}</Type>
      </AccordionSummary>
      <AccordionDetails>
        {wasExpanded ? (
          <RowBox flexWrap="wrap" flexSpacing={4}>
            {agendas.map((m) => {
              const {derivedFilenameAttr, imgix_url} = m
              const {
                title = '',
                publishedDate = '',
                date = ''
              } = derivedFilenameAttr ?? {}
              return (
                <ChildBox key={m.id}>
                  <BoardAgendaLink
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

export default BoardAgendaAccordion
