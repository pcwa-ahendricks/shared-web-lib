import React from 'react'
import {
  Accordion,
  Typography as Type,
  AccordionSummary,
  Unstable_Grid2 as Grid,
  AccordionDetails
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
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
          <Grid container spacing={4}>
            {minutes.map((m) => {
              const {derivedFilenameAttr, imgix_url} = m
              const {
                title = '',
                publishedDate = '',
                date = ''
              } = derivedFilenameAttr ?? {}
              return (
                <Grid xs="auto" key={m.id}>
                  <BoardMinutesLink
                    imgixUrl={imgix_url}
                    title={title}
                    publishedDate={publishedDate}
                    date={date}
                  />
                </Grid>
              )
            })}
          </Grid>
        ) : (
          <div />
        )}
      </AccordionDetails>
    </Accordion>
  )
}

export default BoardMinutesAccordion
