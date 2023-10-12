import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import PageTitle from '@components/PageTitle/PageTitle'
import {
  Box,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Toolbar,
  Typography as Type,
  Link,
  TypographyProps
} from '@mui/material'
import NarrowContainer from '@components/containers/NarrowContainer'
import SectionBox from '@components/boxes/SectionBox'
import WideContainer from '@components/containers/WideContainer'
import StorageRoundedIcon from '@mui/icons-material/StorageRounded'
import {RowBox} from '@components/MuiSleazebox'
import useTheme from '@hooks/useTheme'

const Sb272Page = () => {
  const theme = useTheme()
  const style = {
    headerIcon: {
      marginRight: theme.spacing(1),
      verticalAlign: 'middle'
    },
    tableContainer: {
      overflowX: 'auto'
    },
    bulletLi: {
      listStyleType: 'none',
      marginBottom: '4px'
      // '&::marker': {
      //   fontSize: '1rem'
      // }
    }
  }

  const lastReviewDate = 'January, 2023'

  const TypeBullet = ({children, ...rest}: TypographyProps<'li'>) => {
    return (
      <Type component="li" sx={{...style.bulletLi}} {...rest}>
        {children}
      </Type>
    )
  }

  const rows = [
    {
      vendor: 'Central Square',
      product: 'Naviline',
      purpose: 'Enterprise Resource Planning (ERP)',
      dataType: 'AS400',
      custodian: 'Information Technology',
      modified: 'Daily',
      updated: 'Bi-annually'
    },
    {
      vendor: 'E.S.R.I',
      product: 'ArcGIS',
      purpose: 'Geographic Information Systems',
      dataType: 'MS SQL Server',
      custodian: 'Technical Services',
      modified: 'Daily',
      updated: 'Monthly'
    },
    {
      vendor: 'Questys Solutions',
      product: 'Questys',
      purpose: 'Document Imaging / Management',
      dataType: 'PDF',
      custodian: 'Information Technology',
      modified: 'Daily',
      updated: 'Monthly'
    },
    {
      vendor: 'NovusAgenda',
      product: 'Granicus',
      purpose: 'Meeting Agendas',
      dataType: 'PDF/web',
      custodian: 'Information Technology',
      modified: 'Daily',
      updated: 'Annually'
    }
  ]

  return (
    <PageLayout title="Enterprise System Disclosure" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle title="SB-272" subtitle="General" />
          <SectionBox>
            <Type variant="h2" gutterBottom>
              Disclosure of Enterprise System Information
            </Type>
            <Type variant="subtitle1" gutterBottom>
              <abbr title="Senate Bill">SB</abbr> 272 (2015) / Government Code
              6270.5, relating to public records
            </Type>
            <Type paragraph>
              On October 11, 2015, Governor Brown signed Senate Bill No. 272
              into law. This bill requires local agencies to create a publicly
              available catalog of enterprise systems. These are software
              systems of record that are used across multiple departments, or
              systems that contain information collected about the public used
              by the agency.
            </Type>
            <Type paragraph>
              Certain systems are exempt from disclosure, including:
            </Type>
            <ul>
              <TypeBullet>Emergency services systems</TypeBullet>
              <TypeBullet>Information technology security</TypeBullet>
              <TypeBullet>Building access</TypeBullet>
              <TypeBullet>Mechanical controls</TypeBullet>
            </ul>
            <Type paragraph>
              The following catalog will be reviewed and updated on an annual
              basis by July 1 of each year, and has been updated as recently as{' '}
              <strong>{lastReviewDate}</strong>.
            </Type>
            <Type>
              To learn more, see{' '}
              <Link
                href="https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201520160SB272"
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
              >
                full text of <abbr title="senate bill">SB</abbr> 272
              </Link>
            </Type>
          </SectionBox>
        </NarrowContainer>
        <WideContainer>
          <Box
            mt={6}
            boxShadow={2}
            width="100%"
            bgcolor={theme.palette.common.white}
          >
            <Toolbar>
              <RowBox alignItems="center">
                <StorageRoundedIcon sx={{...style.headerIcon}} />
                <Type variant="h6" id="tableTitle">
                  Enterprise Systems
                </Type>
              </RowBox>
            </Toolbar>
            <Box sx={{...style.tableContainer}}>
              <Table
                aria-label="enterprise-systems-table"
                aria-labelledby="tableTitle"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Vendor</TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell>Purpose</TableCell>
                    <TableCell>Data Type</TableCell>
                    <TableCell>Custodian</TableCell>
                    <TableCell>Modified</TableCell>
                    <TableCell>Updated</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.vendor}>
                      <TableCell component="th" scope="row">
                        {row.vendor}
                      </TableCell>
                      <TableCell>{row.product}</TableCell>
                      <TableCell>{row.purpose}</TableCell>
                      <TableCell>{row.dataType}</TableCell>
                      <TableCell>{row.custodian}</TableCell>
                      <TableCell>{row.modified}</TableCell>
                      <TableCell>{row.updated}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Box>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export default Sb272Page
