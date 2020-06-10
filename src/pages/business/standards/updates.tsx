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
import {format, parse} from 'date-fns'
import MuiNextLink from '@components/NextLink/NextLink'
import NarrowContainer from '@components/containers/NarrowContainer'

interface Standard {
  id: number
  title: string
  revision: string
  url: string
  approved: Date
}

const standards: Standard[] = [
  {
    id: 1,
    title: 'S 103',
    revision: 'Revision 1',
    url:
      'https://cdn.cosmicjs.com/22ba93d0-68bd-11e7-9a78-c5ed605d4ef5-S103-R.pdf',
    approved: parse('07/13/2017', 'MM/dd/yyyy', new Date())
  },
  {
    id: 2,
    title: 'S 104',
    revision: 'Revision 1',
    url:
      'https://cdn.cosmicjs.com/22c9d610-68bd-11e7-9a78-c5ed605d4ef5-S104-R.pdf',
    approved: parse('07/13/2017', 'MM/dd/yyyy', new Date())
  }
]

const StandardDrawingsUpdatesPage = () => {
  const theme = useTheme()
  const DrawingItem = ({title, revision, approved}: Standard) => {
    return (
      <RespRowBox alignItems="center">
        {/* minWidth aides with ellipsis display with noWrap prop. */}
        <ChildBox flex="45%" minWidth={0}>
          {/* Inheriting variant will break ellipsis display with <Typography/>. */}
          <Type variant="body1" noWrap>
            {title}
          </Type>
        </ChildBox>
        <ChildBox flex="20%" minWidth={0}>
          <Type variant="body2" noWrap>
            {revision}
          </Type>
        </ChildBox>
        <ChildBox flex="35%" minWidth={0}>
          <Type variant="body2" noWrap>
            Approved {format(approved, 'MM/dd/yyyy')}
          </Type>
        </ChildBox>
      </RespRowBox>
    )
  }
  return (
    <PageLayout title="Standard Drawing Updates" waterSurface>
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
            <Type color="textPrimary">Standard Drawing Updates</Type>
          </Breadcrumbs>
        </NarrowContainer>
      </Box>
      <Spacing size="x-large" />
      <MainBox>
        <NarrowContainer>
          <PageTitle
            title="Standard Drawing Updates"
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
              <Type variant="h5">Standards</Type>
            </ChildBox>
            <ChildBox flex="1 1 auto">
              <Divider />
            </ChildBox>
          </RowBox>
          <Spacing />
          <List>
            {standards.map((standard) => (
              <ListItem
                key={standard.id}
                button
                component="a"
                href={standard.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                <ListItemIcon>
                  <DescriptionOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={<DrawingItem {...standard} />} />
              </ListItem>
            ))}
          </List>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default StandardDrawingsUpdatesPage
