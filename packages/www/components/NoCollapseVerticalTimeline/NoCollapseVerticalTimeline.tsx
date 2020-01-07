import React from 'react'
import {
  VerticalTimeline,
  VerticalTimelineProps
} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import './NoCollapseVerticalTimeline.css'

// See NoCollapseVerticalTimeline.css for notes.

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
