import React from 'react'
import {Box, Divider, Typography as Type} from '@mui/material'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import {ColumnBox} from '@components/MuiSleazebox'
import {useRouter} from 'next/router'
import {useEffect} from 'react'
import Spacing from '@components/boxes/Spacing'

const TypographyPage = () => {
  const router = useRouter()

  useEffect(() => {
    if (process.env.VERCEL_ENV === 'production') {
      // Redirect to 404 or any other page if not in development mode
      router.replace('/404')
    }
  }, [router])

  if (process.env.VERCEL_ENV === 'production') {
    // Return null to render nothing if not in development mode
    return null
  }

  return (
    <PageLayout title="Typography Test">
      <NarrowContainer>
        <MainBox>
          <ColumnBox>
            <Type variant="h3" gutterBottom>
              Variants
            </Type>
            <Spacing size="x-small" />
            <Type variant="caption">Caption</Type>
            <Spacing size="x-small" />
            <Type variant="button">Button</Type>
            <Spacing size="x-small" />
            <Type variant="overline">Overline</Type>
            <Spacing size="x-small" />
            <Type variant="body1">Body1</Type>
            <Spacing size="x-small" />
            <Type variant="body2">Body2</Type>
            <Spacing size="x-small" />
            <Type variant="subtitle1">Subtitle1</Type>
            <Spacing size="x-small" />
            <Type variant="subtitle2">Subtitle2</Type>
            <Spacing size="x-small" />
            <Type variant="h1">H1 Primary Header</Type>
            <Spacing size="x-small" />
            <Type variant="h2">H2 Secondary Header</Type>
            <Spacing size="x-small" />
            <Type variant="h3">H3 Tertiary Header</Type>
            <Spacing size="x-small" />
            <Type variant="h4">H4 Fourth Header</Type>
            <Spacing size="x-small" />
            <Type variant="h5">H5 Fifth Header</Type>
            <Spacing size="x-small" />
            <Type variant="h6">H6 Sixth Header</Type>
          </ColumnBox>

          <Spacing size="x-large">
            <Divider />
          </Spacing>

          <Type variant="h3" gutterBottom>
            Spacing without Paragraph tags
          </Type>
          <Type>
            <strong>No Spacing</strong> - Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Nulla vitae elit libero, a pharetra
            augue. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
          </Type>

          <Type>
            <strong>X-Small Spacing</strong> - Maecenas sed diam eget risus
            varius blandit sit amet non magna. Nullam quis risus eget urna
            mollis ornare vel eu leo. Etiam porta sem malesuada magna mollis
            euismod. Vivamus sagittis lacus vel augue laoreet rutrum faucibus
            dolor auctor.
          </Type>
          <Spacing size="x-small" />

          <Type>
            <strong>Small Spacing</strong> - Donec ullamcorper nulla non metus
            auctor fringilla. Nulla vitae elit libero, a pharetra augue.
            Curabitur blandit tempus porttitor. Sed posuere consectetur est at
            lobortis. Integer posuere erat a ante venenatis dapibus posuere
            velit aliquet.
          </Type>
          <Spacing size="small" />

          <Type>
            <strong>Default Spacing</strong> - Vestibulum id ligula porta felis
            euismod semper. Integer posuere erat a ante venenatis dapibus
            posuere velit aliquet. Curabitur blandit tempus porttitor. Aenean
            lacinia bibendum nulla sed consectetur.
          </Type>
          <Spacing />

          <Type>
            <strong>Large Spacing</strong> - Cras mattis consectetur purus sit
            amet fermentum. Donec id elit non mi porta gravida at eget metus.
            Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
          </Type>
          <Spacing size="large" />

          <Type>
            <strong>X-large Spacing</strong> - Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Nulla vitae elit libero, a pharetra
            augue. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
          </Type>
          <Spacing size="x-large" />
          <Type>
            <strong>End</strong> - Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl
            consectetur et. Nulla vitae elit libero, a pharetra augue. Cras
            justo odio, dapibus ac facilisis in, egestas eget quam.
          </Type>

          <Spacing size="x-large">
            <Divider />
          </Spacing>

          <Type variant="h3" gutterBottom>
            Spacing with Paragraph tags
          </Type>
          <Type paragraph>
            <strong>No Spacing</strong> - Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Nulla vitae elit libero, a pharetra
            augue. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
          </Type>

          <Type paragraph>
            <strong>X-Small Spacing</strong> - Maecenas sed diam eget risus
            varius blandit sit amet non magna. Nullam quis risus eget urna
            mollis ornare vel eu leo. Etiam porta sem malesuada magna mollis
            euismod. Vivamus sagittis lacus vel augue laoreet rutrum faucibus
            dolor auctor.
          </Type>
          <Spacing size="x-small" />

          <Type paragraph>
            <strong>Small Spacing</strong> - Donec ullamcorper nulla non metus
            auctor fringilla. Nulla vitae elit libero, a pharetra augue.
            Curabitur blandit tempus porttitor. Sed posuere consectetur est at
            lobortis. Integer posuere erat a ante venenatis dapibus posuere
            velit aliquet.
          </Type>
          <Spacing size="small" />

          <Type paragraph>
            <strong>Default Spacing</strong> - Vestibulum id ligula porta felis
            euismod semper. Integer posuere erat a ante venenatis dapibus
            posuere velit aliquet. Curabitur blandit tempus porttitor. Aenean
            lacinia bibendum nulla sed consectetur.
          </Type>
          <Spacing />

          <Type paragraph>
            <strong>Large Spacing</strong> - Cras mattis consectetur purus sit
            amet fermentum. Donec id elit non mi porta gravida at eget metus.
            Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
          </Type>
          <Spacing size="large" />

          <Type paragraph>
            <strong>X-large Spacing</strong> - Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Nulla vitae elit libero, a pharetra
            augue. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
          </Type>
          <Spacing size="x-large" />

          <Type paragraph>
            <strong>End</strong> - Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl
            consectetur et. Nulla vitae elit libero, a pharetra augue. Cras
            justo odio, dapibus ac facilisis in, egestas eget quam.
          </Type>
        </MainBox>
      </NarrowContainer>
    </PageLayout>
  )
}

export default TypographyPage
