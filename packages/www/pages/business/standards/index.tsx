import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {RespRowBox, ChildBox} from '@components/boxes/FlexBox'
import {Typography as Type, Box, Link, Divider} from '@material-ui/core'
import ImgixThumbLink from '@components/ImgixThumbLink/ImgixThumbLink'
import Spacing from '@components/boxes/Spacing'
import MuiNextLink from '@components/NextLink/NextLink'
import EngineeringPhone from '@components/links/EngineeringPhone'

const ImprovementStandardsPage = () => {
  return (
    <PageLayout title="Improvement Standards" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle
            title="Improvement Standards"
            subtitle="Business with PCWA"
          />
          <RespRowBox flexSpacing={4}>
            <ChildBox flex="25%" display="flex">
              <Box
                mx="auto"
                width={{xs: '50vw', sm: '100%'}} // Don't let portrait image get too big in small layouts.
              >
                <ImgixThumbLink
                  imageWidth="100%"
                  filename="PCWA_Improvement_Standards_2017"
                  url="https://cosmic-s3.imgix.net/f0b37df0-68af-11e7-93e2-c90edc3b7006-PCWA_Improvement_Standards.pdf"
                  anchorHref="https://cdn.cosmicjs.com/f0b37df0-68af-11e7-93e2-c90edc3b7006-PCWA_Improvement_Standards.pdf"
                  alt="2017 PCWA Improvement Standards"
                />
                <Box textAlign="center">
                  <Type variant="caption">
                    <em>click to view pdf</em>
                  </Type>
                </Box>
              </Box>
            </ChildBox>
            <ChildBox flex="75%">
              <Type variant="h3">
                <Link
                  href="https://cdn.cosmicjs.com/f0b37df0-68af-11e7-93e2-c90edc3b7006-PCWA_Improvement_Standards.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Improvement Standards – Standard Specifications, Standard
                  Drawings
                </Link>
              </Type>
              <Type variant="caption">Complete, 2017</Type>
              <Spacing size="x-small" />
              <Type paragraph>
                This document is the complete set of approved standard
                specifications, approved materials list and standard drawings.
                Interim updates to this document will be made from time to time.
                It is the responsibility of the User, Engineer, Contractor,
                and/or Developer to verify they are using the latest approved;
                specifications, standard drawings or approved materials list by
                checking the latest updates below.
              </Type>
            </ChildBox>
          </RespRowBox>
          <Spacing>
            <Divider />
          </Spacing>
          <Type variant="h4" gutterBottom>
            <MuiNextLink href="/business/standards/specs">
              Specification Updates
            </MuiNextLink>
          </Type>
          <Type paragraph>
            The specification documents provided here in, are specific edits,
            changes and/or updates and supersede the current Improvement
            Standards - Standard Specifications document above.
          </Type>
          <Spacing>
            <Divider />
          </Spacing>
          <Type variant="h4" gutterBottom>
            <MuiNextLink href="/business/standards/updates">
              Standard Drawing Updates
            </MuiNextLink>
          </Type>
          <Type paragraph>
            The standard drawings provided here in, are specific edits, changes
            and/or updates and supersede the current Improvement Standards –
            Standard Drawings document above.
          </Type>
          <Spacing>
            <Divider />
          </Spacing>
          <Type variant="h4" gutterBottom>
            <MuiNextLink href="/business/standards/materials">
              Updated Approved Materials List
            </MuiNextLink>
          </Type>
          <Type paragraph>
            This includes a complete list of Approved Materials and supersedes
            the current Improvement Standards – Approved Materials List above.
          </Type>
          <Spacing size="x-large" />
          <Type variant="h5" gutterBottom>
            Comments or Suggestions
          </Type>
          <Type paragraph>
            If you have any comments, corrections or additions you would like
            considered for inclusion in future updates, please call{' '}
            <EngineeringPhone />, or{' '}
            <MuiNextLink href="/contact-us">
              submit your question or suggestion online
            </MuiNextLink>
            .
          </Type>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default ImprovementStandardsPage
