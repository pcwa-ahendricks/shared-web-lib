import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import PageTitle from '@components/PageTitle/PageTitle'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
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
} from '@mui/material'
import {RowBox, ChildBox, ColumnBox} from 'mui-sleazebox'
import Spacing from '@components/boxes/Spacing'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
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
    title: 'S 112',
    revision: 'Revision 2',
    url: 'https://cdn.cosmicjs.com/59642df0-b019-11ea-bbb7-b70da071f778-S112.R1.pdf',
    approved: parse('06/12/2020', 'MM/dd/yyyy', new Date())
  },
  {
    id: 2,
    title: 'S 113',
    revision: 'Revision 2',
    url: 'https://cdn.cosmicjs.com/5928d2a0-b019-11ea-bbb7-b70da071f778-S113.R1.pdf',
    approved: parse('06/12/2020', 'MM/dd/yyyy', new Date())
  },
  {
    id: 3,
    title: 'S 201',
    revision: 'Revision 2',
    url: 'https://cdn.cosmicjs.com/595f7300-b019-11ea-bbb7-b70da071f778-S201.R1.pdf',
    approved: parse('06/12/2020', 'MM/dd/yyyy', new Date())
  },
  {
    id: 4,
    title: 'S 202',
    revision: 'Revision 2',
    url: 'https://cdn.cosmicjs.com/59682590-b019-11ea-bbb7-b70da071f778-S202.R1.pdf',
    approved: parse('06/12/2020', 'MM/dd/yyyy', new Date())
  },
  {
    id: 5,
    title: 'S 203',
    revision: 'Revision 2',
    url: 'https://cdn.cosmicjs.com/5962f570-b019-11ea-bbb7-b70da071f778-S203.R1.pdf',
    approved: parse('06/12/2020', 'MM/dd/yyyy', new Date())
  },
  {
    id: 6,
    title: 'S 207',
    revision: 'Revision 2',
    url: 'https://cdn.cosmicjs.com/593b2220-b019-11ea-bbb7-b70da071f778-S207.R1.pdf',
    approved: parse('06/12/2020', 'MM/dd/yyyy', new Date())
  },
  {
    id: 7,
    title: 'S 301',
    revision: 'Revision 2',
    url: 'https://cdn.cosmicjs.com/591b1700-b019-11ea-bbb7-b70da071f778-S301.R1.pdf',
    approved: parse('06/12/2020', 'MM/dd/yyyy', new Date())
  },
  {
    id: 8,
    title: 'S 304',
    revision: 'Revision 2',
    url: 'https://cdn.cosmicjs.com/593f40d0-b019-11ea-bbb7-b70da071f778-S304R1.pdf',
    approved: parse('06/12/2020', 'MM/dd/yyyy', new Date())
  },
  {
    id: 9,
    title: 'S 305',
    revision: 'Revision 2',
    url: 'https://cdn.cosmicjs.com/59511b20-b019-11ea-bbb7-b70da071f778-S305.R1.pdf',
    approved: parse('06/12/2020', 'MM/dd/yyyy', new Date())
  },
  {
    id: 10,
    title: 'S 306',
    revision: 'Revision 2',
    url: 'https://cdn.cosmicjs.com/594cd560-b019-11ea-bbb7-b70da071f778-S306.R1.pdf',
    approved: parse('06/12/2020', 'MM/dd/yyyy', new Date())
  },
  {
    id: 11,
    title: 'S 103',
    revision: 'Revision 1',
    url: 'https://cdn.cosmicjs.com/22ba93d0-68bd-11e7-9a78-c5ed605d4ef5-S103-R.pdf',
    approved: parse('07/13/2017', 'MM/dd/yyyy', new Date())
  },
  {
    id: 12,
    title: 'S 104',
    revision: 'Revision 1',
    url: 'https://cdn.cosmicjs.com/22c9d610-68bd-11e7-9a78-c5ed605d4ef5-S104-R.pdf',
    approved: parse('07/13/2017', 'MM/dd/yyyy', new Date())
  }
]

const StandardDrawingsUpdatesPage = () => {
  const theme = useTheme()
  const DrawingItem = ({title, revision, approved}: Standard) => {
    return (
      <RowBox responsive alignItems="center">
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
      </RowBox>
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
            <ColumnBox child flexGrow={0} alignItems="center">
              <AssignmentTurnedInIcon color="secondary" />
            </ColumnBox>
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
