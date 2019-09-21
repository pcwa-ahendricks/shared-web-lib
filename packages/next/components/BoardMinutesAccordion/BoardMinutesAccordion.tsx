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
  year: string
  minutes: CosmicMediaMeta[]
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
    <ExpansionPanel
      key={year}
      expanded={expanded === year}
      onChange={onChange(year)}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${year}-board-minutes-panel-content`}
        id={`${year}-board-minutes-panel-header`}
      >
        <Type variant="inherit">{year}</Type>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {wasExpanded ? (
          <RowBox flexWrap="wrap" mt={-4}>
            {minutes.map((m) => {
              return <BoardMinutesLink key={m._id} agenda={m} />
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
