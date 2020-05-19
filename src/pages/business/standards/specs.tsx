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
  Box
} from '@material-ui/core'
import {useTheme} from '@material-ui/core/styles'
import {RowBox, ChildBox, RespRowBox} from '@components/boxes/FlexBox'
import Spacing from '@components/boxes/Spacing'
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import {format, parse} from 'date-fns'
import WideContainer from '@components/containers/WideContainer'
import MuiNextLink from '@components/NextLink/NextLink'

interface Spec {
  id: number
  title: string
  section: string
  revision: string
  url: string
  approved: Date
}

const specs: Spec[] = [
  {
    id: 1,
    title: 'Pipeline Layout and Clearances',
    section: 'Div. 2 - Sec. 1, Page 24',
    revision: 'Revision 1',
    url:
      'https://cdn.cosmicjs.com/22aab550-68bd-11e7-9a78-c5ed605d4ef5-Final-Appr-Spec-Rev-1-2017.pdf',
    approved: parse('07/13/2017', 'MM/dd/yyyy', new Date())
  }
]

const SpecificationUpdatesPage = () => {
  const theme = useTheme()
  const SpecItem = ({title, section, revision, approved}: Spec) => {
    return (
      <RespRowBox alignItems="center">
        {/* minWidth aides with ellipsis display with noWrap prop. */}
        <ChildBox flex="35%" minWidth={0}>
          {/* Inheriting variant will break ellipsis display with <Typography/>. */}
          <Type variant="body1" noWrap>
            {title}
          </Type>
        </ChildBox>
        <ChildBox flex="25%" minWidth={0}>
          <Type variant="body2" noWrap>
            {section}
          </Type>
        </ChildBox>
        <ChildBox flex="20%" minWidth={0}>
          <Type variant="body2" noWrap>
            {revision}
          </Type>
        </ChildBox>
        <ChildBox flex="20%" minWidth={0}>
          <Type variant="body2" noWrap>
            Approved {format(approved, 'MM/dd/yyyy')}
          </Type>
        </ChildBox>
      </RespRowBox>
    )
  }
  return (
    <PageLayout title="Standard Specification Updates" waterSurface>
      <Box bgcolor={theme.palette.grey['100']}>
        <WideContainer>
          <Breadcrumbs
            aria-label="breadcrumb"
            separator={<NavigateNextIcon fontSize="small" />}
          >
            <MuiNextLink color="inherit" href="/business">
              Business with PCWA
            </MuiNextLink>
            <MuiNextLink color="inherit" href="/business/standards">
              Improvement Standards
            </MuiNextLink>
            <Type color="textPrimary">Specification Updates</Type>
          </Breadcrumbs>
        </WideContainer>
      </Box>
      <Spacing size="x-large" />
      <MainBox>
        <WideContainer>
          <PageTitle
            title="Specification Updates"
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
              <Type variant="h5">Specifications</Type>
            </ChildBox>
            <ChildBox flex="1 1 auto">
              <Divider />
            </ChildBox>
          </RowBox>
          <Spacing />
          <List>
            {specs.map((spec) => (
              <ListItem
                key={spec.id}
                button
                component="a"
                href={spec.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                <ListItemIcon>
                  <DescriptionOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={<SpecItem {...spec} />} />
              </ListItem>
            ))}
          </List>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export default SpecificationUpdatesPage