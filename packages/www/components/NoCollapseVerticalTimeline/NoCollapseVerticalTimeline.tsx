import React from 'react'
import {
  VerticalTimeline,
  VerticalTimelineProps
} from 'react-vertical-timeline-component'
import './NoCollapseVerticalTimeline.module.css'

// See NoCollapseVerticalTimeline.module.css for notes.

const NoCollapseVerticalTimeline = ({
  children,
  ...rest
}: {
  children: React.ReactNode
} & VerticalTimelineProps) => {
  return (
    <VerticalTimeline layout="2-columns" {...rest}>
      {children}
    </VerticalTimeline>
  )
}

export default NoCollapseVerticalTimeline
