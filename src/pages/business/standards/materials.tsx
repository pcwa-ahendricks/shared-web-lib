import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import PageTitle from '@components/PageTitle/PageTitle'
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn'
import {
  Typography as Type,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Breadcrumbs,
  Box,
  useTheme
} from '@material-ui/core'
import {RowBox, ChildBox, RespRowBox} from '@components/boxes/FlexBox'
import Spacing from '@components/boxes/Spacing'
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import {format} from 'date-fns'
import MuiNextLink from '@components/NextLink/NextLink'
import NarrowContainer from '@components/containers/NarrowContainer'

interface Material {
  id: number
  title: string
  // revision: string
  url: string
  approved: Date
}

const materials: Material[] = [
  {
    id: 1,
    title: 'Appendix D - Pre-Approved Materials list',
    approved: new Date('2020-10-08T17:00:00'),
    // revision: '1',
    url:
      'https://cdn.cosmicjs.com/07146070-097d-11eb-8384-23ea516820cc-Appendix-D---Pre-Approved-Materials.pdf'
  }
]

const MaterialsListUpdatesPage = () => {
  const theme = useTheme()
  const MaterialListItem = ({title, approved}: Material) => {
    return (
      <RespRowBox alignItems="center">
        {/* minWidth aides with ellipsis display with noWrap prop. */}
        <ChildBox flex="45%" minWidth={0}>
          {/* Inheriting variant will break ellipsis display with <Typography/>. */}
          <Type variant="body1" noWrap>
            {title}
          </Type>
        </ChildBox>
        {/* <ChildBox flex="20%" minWidth={0}>
          <Type variant="body2" noWrap>
            {revision}
          </Type>
        </ChildBox> */}
        <ChildBox flex="35%" minWidth={0}>
          <Type variant="body2" noWrap>
            Approved {format(approved, 'MM/dd/yyyy')}
          </Type>
        </ChildBox>
      </RespRowBox>
    )
  }
  return (
    <PageLayout title="Approved Materials List Updates" waterSurface>
      <Box bgcolor={theme.palette.grey['100']}>
        <NarrowContainer>
          <Breadcrumbs
            aria-label="breadcrumb"
            separator={<NavigateNextIcon fontSize="small" />}
          >
            <MuiNextLink color="inherit" href="/business">
              {' '}
              Business with PCWA{' '}
            </MuiNextLink>{' '}
            <MuiNextLink color="inherit" href="/business/standards">
              Improvement Standards
            </MuiNextLink>
            <Type color="textPrimary">Updated Approved Materials List</Type>
          </Breadcrumbs>
        </NarrowContainer>
      </Box>
      <Spacing size="x-large" />
      <MainBox>
        <NarrowContainer>
          <PageTitle
            title="Updated Approved Materials List"
            subtitle="Improvement Standards"
            hideDivider
          />
          <Spacing size="x-large" />
          <RowBox alignItems="center" flexSpacing={1}>
            <ChildBox flex="1 1 auto">
              <Divider />
            </ChildBox>
            <ChildBox
              flexGrow={0}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <AssignmentTurnedInIcon color="secondary" />
            </ChildBox>
            <ChildBox flexGrow={0}>
              <Type variant="h5">Approved Materials List</Type>
            </ChildBox>
            <ChildBox flex="1 1 auto">
              <Divider />
            </ChildBox>
          </RowBox>
          <Spacing />
          <List>
            {materials.length <= 0 ? (
              <Type variant="body1">
                <em>No updates at this time</em>{' '}
              </Type>
            ) : null}
            {materials.map((material) => (
              <ListItem
                key={material.id}
                button
                component="a"
                href={material.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                <ListItemIcon>
                  <DescriptionOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={<MaterialListItem {...material} />} />
              </ListItem>
            ))}
          </List>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default MaterialsListUpdatesPage
