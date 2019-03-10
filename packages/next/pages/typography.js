// @flow
import React from 'react'
import {Typography as Type} from '@material-ui/core'
import PageLayout from '@components/PageLayout/PageLayout'

const Typography = () => {
  return (
    <PageLayout title="Typography Test">
      <main>
        <div style={{padding: '10vmin'}}>
          <Type variant="caption">Caption</Type>
          <Type variant="button">Button</Type>
          <Type variant="overline">Overline</Type>
          <Type variant="body1">Body1</Type>
          <Type variant="body2">Body2</Type>
          <Type variant="subtitle1">Subtitle1</Type>
          <Type variant="subtitle2">Subtitle2</Type>
          <Type variant="h1">H1 Primary</Type>
          <Type variant="h2">H2 Secondary</Type>
          <Type variant="h3">H3 Tertiary</Type>
          <Type variant="h4">H4 Four</Type>
          <Type variant="h5">H5 Five</Type>
          <Type variant="h6">H6 Six</Type>
        </div>
      </main>
    </PageLayout>
  )
}

export default Typography
