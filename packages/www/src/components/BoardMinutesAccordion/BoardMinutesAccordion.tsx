import React from 'react'
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography as Type
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {RowBox} from '@components/boxes/FlexBox'
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
    <ExpansionPanel expanded={expanded === year} onChange={onChange(year)}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${year}-board-minutes-panel-content`}
        id={`${year}-board-minutes-panel-header`}
      >
        <Type variant="inherit">{year}</Type>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {wasExpanded ? (
          <RowBox flexWrap="wrap" flexSpacing={margin} mt={-margin}>
            {minutes.map((m) => {
              /* eslint-disable @typescript-eslint/camelcase */
              const {derivedFilenameAttr, imgix_url} = m
              const {title = '', publishedDate = '', date = ''} =
                derivedFilenameAttr ?? {}
              return (
                <BoardMinutesLink
                  key={m._id}
                  imgixUrl={imgix_url}
                  title={title}
                  publishedDate={publishedDate}
                  date={date}
                  topMargin={margin}
                />
              )
            })}
          </RowBox>
        ) : (
          <div />
        )}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default BoardMinutesAccordion
