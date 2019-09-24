import React, {useMemo} from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import PageTitle from '@components/PageTitle/PageTitle'
import WaterSurfaceImg from '@components/WaterSurfaceImg/WaterSurfaceImg'
import {
  Box,
  Typography as Type,
  Link,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
  // Divider
} from '@material-ui/core'
import UnclaimedPropertyTable from '@components/UnclaimedPropertyTable/UnclaimedPropertyTable'
import NarrowContainer from '@components/containers/NarrowContainer'
import SectionBox from '@components/boxes/SectionBox'
import {format, isBefore} from 'date-fns'
import CheckIcon from '@material-ui/icons/Check'
import {green} from '@material-ui/core/colors'
import {createStyles, makeStyles} from '@material-ui/styles'
import {RowBox} from '@components/boxes/FlexBox'
import UnclaimedPropertyEmail from '@components/links/UnclaimedPropertyEmail'

const useStyles = makeStyles(() =>
  createStyles({
    checkIcon: {
      color: green[500]
    }
  })
)

const SalarySchedulePage = () => {
  const classes = useStyles()
  const deadlineDate = new Date('2019-07-12T17:00:00')

  const deadlinePassedEl = useMemo(
    () =>
      isBefore(deadlineDate, new Date()) ? (
        <strong>(Deadline Passed)</strong>
      ) : null,
    [deadlineDate]
  )

  // const MiddleDivider = () => {
  //   return (
  //     <Box mb={1}>
  //       <Divider variant="middle" />
  //     </Box>
  //   )
  // }

  return (
    <PageLayout title="Unclaimed Property">
      <WaterSurfaceImg />
      <MainBox>
        <NarrowContainer>
          <PageTitle title="Unclaimed Property" subtitle="About PCWA" />
          {/* 5:00 p.m. on Friday July 12, 2019 */}
          <SectionBox>
            <Type paragraph>
              Placer County Water Agency hereby provides notice to owners of
              record of unclaimed money in the Agency's possession that any
              unclaimed money from the 2015 Calendar Year will escheat to the
              Agency by operation of law if not claimed by{' '}
              <em>
                {format(deadlineDate, "h':'mm aaaa 'on' cccc MMMM do',' yyyy")}
              </em>
              . {deadlinePassedEl}
            </Type>

            <Type paragraph>
              California Government Code Sections 50050 through 50057 provides
              authority for the proper disposition and accounting for unclaimed
              money.
            </Type>

            <Type paragraph>
              Funds which are not the property of the Placer County Water Agency
              that remain unclaimed for a period of more than three (3) years
              will become the property of the Placer County Water Agency, if not
              claimed or if no verified complaint is filed and served, on or
              before the specific date stated in the published public notice.
            </Type>

            <Type paragraph>
              Unclaimed funds over three years old and over $15.00 will be
              identified on an annual basis.
            </Type>

            <Type paragraph>
              A notice for the unclaimed property will be published once a week
              for two consecutive weeks in a newspaper of general circulation.
              The notice shall state the individual or business name, the amount
              of money, and that the money will become the property of the
              Placer County Water Agency on a specific date (not less than 45
              nor more than 60 days after the first publication).
            </Type>

            <Type paragraph>
              Upon or prior to publication, a party of interest may file a claim
              for the unclaimed property.
            </Type>
          </SectionBox>

          <Box mt={3}>
            <Type variant="subtitle1" gutterBottom>
              For A Full List Of Unclaimed Property See Below
            </Type>
            <Link href="#unclaimedPropertyList" variant="body1">
              See Full Unclaimed Property List
            </Link>
          </Box>

          <Box mt={3}>
            <Type variant="h3" gutterBottom>
              Procedures For Claiming Unclaimed Property
            </Type>
            <Type variant="subtitle1">
              To file a claim for unclaimed property:
            </Type>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckIcon classes={{root: classes.checkIcon}} />
                </ListItemIcon>
                <ListItemText>
                  The owner of record, or any other person who has a legal right
                  to ownership interest in the property, may file a claim for
                  the property.
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckIcon classes={{root: classes.checkIcon}} />
                </ListItemIcon>
                <ListItemText>
                  Claimants must complete the Agency’s{' '}
                  <Link
                    href="https://cosmicjs.com/uploads/171150a0-adeb-11e7-ae97-05d188137947-PCWA Unclaimed Property Form 2017.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Claim Form
                  </Link>{' '}
                  in accordance with the{' '}
                  <Link
                    href="https://cosmicjs.com/uploads/6d63beb0-adec-11e7-b53b-17f51103f11d-Instructions to Claim Form Unclaimed Property.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Form Instructions
                  </Link>
                  .
                </ListItemText>
              </ListItem>
            </List>
          </Box>

          <Box mt={3}>
            <Type variant="h3" gutterBottom>
              Claim Submission and Review
            </Type>
            <Type paragraph>
              Please be sure to include ALL required information with your claim
              in accordance with the instructions. Failure to submit a claim
              with the required information may result in your claim being
              denied.
            </Type>
            <Type paragraph>
              The completed claim form and required information should be mailed
              or delivered to the following address.
            </Type>
            <RowBox justifyContent="space-around">
              <Box flex="0 1 40%" textAlign="center">
                <Type variant="subtitle2" color="textSecondary">
                  US Mail:
                </Type>
                {/* <MiddleDivider /> */}
                <Type variant="body2">
                  Placer County Water Agency <br />
                  Department of Finance <br />
                  Attn: Unclaimed Property <br />
                  PO Box 6570 <br />
                  Auburn CA, 95604
                </Type>
              </Box>
              <Box flex="0 1 40%" textAlign="center">
                <Type variant="subtitle2" color="textSecondary">
                  Courier/In Person:
                </Type>
                {/* <MiddleDivider /> */}
                <Type variant="body2">
                  Placer County Water Agency <br />
                  Department of Finance <br />
                  Attn: Unclaimed Property <br />
                  144 Ferguson Rd <br />
                  Auburn CA 95603
                </Type>
              </Box>
            </RowBox>
          </Box>
          <Box mt={6}>
            <Type paragraph>
              If you have any questions, please email <UnclaimedPropertyEmail />{' '}
              or mail questions to the above address.
            </Type>
          </Box>

          <UnclaimedPropertyTable />
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default SalarySchedulePage
