// cspell:ignore flowrate
import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import FlexBox, {ColumnBox, RowBox} from '@components/boxes/FlexBox'
import {Box, useMediaQuery, Typography as Type, Link} from '@material-ui/core'
import {
  useTheme,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined'
import AssignmentLateOutlinedIcon from '@material-ui/icons/AssignmentLateOutlined'
import Spacing from '@components/boxes/Spacing'
import {TypographyProps} from '@material-ui/core/Typography'
import {BoxProps} from '@material-ui/core/Box'
import {LinkProps} from '@material-ui/core/Link'
import EngineeringPhone from '@components/links/EngineeringPhone'
import EngineeringEmail from '@components/links/EngineeringEmail'
import GisDeptEmail from '@components/links/GisDeptEmail'
import MuiNextLink from '@components/NextLink/NextLink'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tightBulletLi: {
      listStyleType: 'none',
      marginBottom: theme.spacing(1)
    },
    disc: {
      display: 'inline-block',
      width: '1em',
      marginLeft: '-1em',
      color: theme.palette.grey['800']
    },
    linkItem: {
      display: 'inline-flex',
      alignItems: 'center'
    },
    linkItemIcon: {
      paddingLeft: 5
      // marginRight: theme.spacing(1)
    }
  })
)

const NewDevelopmentPage = () => {
  const theme = useTheme()
  const isMDUp = useMediaQuery(theme.breakpoints.up('md'))
  const classes = useStyles()

  const Disc = ({...rest}: BoxProps) => (
    <Box className={classes.disc} {...rest}>
      •
    </Box>
  )

  const TightBullet = ({children, ...rest}: TypographyProps<'li'>) => {
    return (
      <Type component="li" className={classes.tightBulletLi} {...rest}>
        <Disc />
        {children}
      </Type>
    )
  }

  const TightListItem = ({
    description,
    title,
    url
  }: {
    description: string
    title: string
    url: string
  }) => {
    return (
      <TightBullet>
        <LinkItem noWrap href={url}>
          {title}
          <ColumnBox component="span" justifyContent="center">
            <DescriptionOutlinedIcon className={classes.linkItemIcon} />
          </ColumnBox>
        </LinkItem>
        <Type component="span" color="textPrimary">
          {' '}
          – {description}
        </Type>
      </TightBullet>
    )
  }

  // const LinkButton = ({children, href, ...rest}: ButtonProps<'a'>) => {
  //   return (
  //     <Button
  //       rel="noopener noreferrer"
  //       target="_blank"
  //       color="primary"
  //       endIcon={<DescriptionOutlinedIcon />}
  //       component="a"
  //       href={href}
  //       {...rest}
  //     >
  //       {children}
  //     </Button>
  //   )
  // }

  const LinkItem = ({children, href, ...rest}: LinkProps) => {
    return (
      <Link
        rel="noopener noreferrer"
        target="_blank"
        color="primary"
        href={href}
        className={classes.linkItem}
        {...rest}
      >
        {children}
      </Link>
    )
  }

  return (
    <PageLayout
      title="New Development Process"
      bannerComponent={
        // Setting flex basis/flex shrink here is required by Safari.
        <FlexBox flex="1 0 auto">
          <Box
            m="auto"
            width="100%" // Setting width makes the image re-expand when window width resizes to a larger width from a smaller narrow width.
            maxWidth={1400}
            height={{xs: 250, sm: 350}} // Original Photo is not very tall, so special treatment is given on smaller devices. 'objectFit' is also toggled to help with image display.
            overflow="hidden"
            position="relative"
          >
            <LazyImgix
              src="https://cosmicjs.imgix.net/5b81b990-6cdd-11e7-aa00-c3930981f23b-drafting_table.jpg"
              htmlAttributes={{
                alt: 'PCWA Water Efficiency Team',
                style: {
                  objectPosition: 'center 30%',
                  objectFit: isMDUp ? 'none' : 'cover', // Original Photo is not very tall, so special treatment is given on smaller devices. Container height is also toggled to help with image display.
                  width: '100%',
                  height: '100%'
                }
              }}
            />
          </Box>
        </FlexBox>
      }
    >
      <MainBox>
        <NarrowContainer>
          <PageTitle
            title="New Development Process"
            subtitle="Business with PCWA"
          />
          <Type paragraph>
            This section is for Developers and Contractors and provides
            information that you will need for your project.
          </Type>
          <Type paragraph>
            If your residential, commercial, or industrial project requires
            constructing new or modifying public water facilities including
            service connections, PCWA has specific requirements. Please refer to
            the following documents:
          </Type>
          <Box mt={1}>
            <Type component="span">
              <LinkItem href="https://cdn.cosmicjs.com/a73534d0-064a-11ea-95fe-01afbd7f5f3b-Facilities-Agreement-Process.pdf">
                Facilities Agreement Process
                <DescriptionOutlinedIcon className={classes.linkItemIcon} />
              </LinkItem>{' '}
              - Describes the current development agreement process.
            </Type>
          </Box>
          <Box mt={1}>
            <Type component="span">
              <LinkItem href="https://cdn.cosmicjs.com/557ac2f0-fff1-11e8-909e-b5d93bc6be8f-_PCWA-Project-Plans-Checklist.pdf">
                Project Plans Checklist
                <DescriptionOutlinedIcon className={classes.linkItemIcon} />
              </LinkItem>{' '}
              - Basic checklist highlighting expectations of development plan
              sets.
            </Type>
          </Box>
          <Box mt={1}>
            <Type component="span">
              <MuiNextLink href="/business/standards" passHref color="primary">
                Improvement Standards, Standard Specifications, and Standard
                Drawings
              </MuiNextLink>{' '}
              - The Agency’s standard specifications for water system design.
            </Type>
          </Box>
          <Spacing />
          <Box>
            <Type paragraph>
              The Water Connection Charge (WCC) for Residential services is
              assessed based on lot size. Non-residential services WCCs are
              assessed based on maximum day demand and flowrate. Refer to one of
              the the following schedules depending on your project's location:
            </Type>
          </Box>
          <Type variant="subtitle1" gutterBottom>
            Current Schedule:
          </Type>
          <ul>
            <TightListItem
              url="https://cdn.cosmicjs.com/082bcbc0-1ddc-11ea-a594-a170ead8b2cb-PCWA-2020-WCC-Lower-Z6.pdf"
              title="Lower Zone 6"
              description="From Rocklin to Auburn"
            />
            <TightListItem
              url="https://cdn.cosmicjs.com/080976b0-1ddc-11ea-a594-a170ead8b2cb-PCWA-2020-WCC-Upper-Z6.pdf"
              title="Upper Zone 6"
              description="Applegate, Colfax, Monte Vista, & Alta"
            />
          </ul>
          <Type variant="subtitle1" gutterBottom>
            Wholesale (reference only):
          </Type>
          <Type paragraph>
            These WCC rate charts are for reference only and is intended to show
            fees as described in the PCWA supply contracts. Please contact the
            City of Lincoln or California American Water Company for all
            development fees and processes.
          </Type>
          <ul>
            <TightListItem
              url="https://cdn.cosmicjs.com/082ba4b0-1ddc-11ea-a8c4-6b69c807b1d7-PCWA-2020-WCC-CAW.pdf"
              title="Zone 6 California American Water Company"
              description="South of Roseville"
            />
            <TightListItem
              url="https://cdn.cosmicjs.com/080509e0-1ddc-11ea-a8c4-6b69c807b1d7-PCWA-2020-WCC-Lincoln.pdf"
              title="Zone 6 Lincoln"
              description="City of Lincoln"
            />
          </ul>

          <Spacing size="x-large" />
          <Type variant="h3" gutterBottom>
            Project Submittal Requirements
          </Type>
          <Spacing />
          <RowBox
            boxShadow={2}
            bgcolor={theme.palette.grey['100']}
            p={3}
            alignItems="center"
          >
            <AssignmentLateOutlinedIcon
              fontSize="large"
              style={{
                marginRight: theme.spacing(2),
                color: theme.palette.grey['600']
              }}
            />
            <Type>
              <em>
                Please provide all of the documents below with your initial
                project submittal.
              </em>
            </Type>
          </RowBox>
          <Spacing />
          <ul>
            <TightListItem
              url="https://cdn.cosmicjs.com/b109af90-064a-11ea-944c-cfd32d7bf8a6-PCWA-Project-Review-Form.pdf"
              title="Project Application"
              description="A required application for project submittal to be completed and
              signed by the Applicant, and local fire protection district."
            />
            <TightBullet>
              <Type component="span" color="textPrimary">
                Supplemental Service Information Forms – For projects with
                residential services, please fill out one{' '}
              </Type>
              <LinkItem
                noWrap
                href="https://cdn.cosmicjs.com/9ada4ec0-0675-11ea-944c-cfd32d7bf8a6-PCWA-Supplemental-Res-Service-Form.pdf"
              >
                Supplemental Information for Residential Services Form
                <ColumnBox component="span" justifyContent="center">
                  <DescriptionOutlinedIcon className={classes.linkItemIcon} />
                </ColumnBox>
              </LinkItem>
              <Type component="span" color="textPrimary">
                {' '}
                summarizing the lot sizes. For projects with
                commercial/industrial or landscape services, please fill out the{' '}
              </Type>
              <LinkItem
                noWrap
                href="https://cdn.cosmicjs.com/9ae10580-0675-11ea-95fe-01afbd7f5f3b-PCWA-Supplemental-Non-Res-Service-Form.pdf"
              >
                Supplemental Information for Non-residential Services Form
                <ColumnBox component="span" justifyContent="center">
                  <DescriptionOutlinedIcon className={classes.linkItemIcon} />
                </ColumnBox>
              </LinkItem>
              <Type component="span" color="textPrimary">
                . One Non-residential form is required for each size and type of
                meter to provide information about the meter(s) requested. This
                is be completed and signed by the Applicant.
              </Type>
            </TightBullet>
            <TightBullet>
              <Type component="span" color="textPrimary">
                $140 Application Fee to open a project account and $2,500
                initial deposit for plan checking, a total of $2,640.
              </Type>
            </TightBullet>
            <TightBullet>
              <Type component="span" color="textPrimary">
                Three (3) sets of plans including landscaping plans, if
                applicable.
              </Type>
            </TightBullet>
            <TightBullet>
              <Type component="span" color="textPrimary">
                Approved Tentative Map or Preliminary Final/Parcel Map.
              </Type>
            </TightBullet>
          </ul>
          <Type paragraph>
            Should you have questions regarding new development projects, please
            contact the Engineering Division at <EngineeringPhone /> or{' '}
            <EngineeringEmail />.
          </Type>

          <Spacing size="x-large" />
          <Type variant="h3" gutterBottom>
            Right – Of – Way/Easement Information
          </Type>
          <Type paragraph>
            Facilities proposed for conveyance to the Agency will require
            rights-of-way acceptable to the Agency to ensure the ability to
            access, maintain, repair, and replace those facilities. The{' '}
            <LinkItem href="https://cdn.cosmicjs.com/389aa5d0-0679-11ea-944c-cfd32d7bf8a6-PCWA-Checklist---Right-of-Way-Requirements.pdf">
              Right-of-Way Requirements Checklist{' '}
              <DescriptionOutlinedIcon className={classes.linkItemIcon} />
            </LinkItem>{' '}
            provides information on what you will be required to submit so that
            staff may ensure all facilities are in an acceptable right-of-way
            and additional requirements should fee title or dedicated easements
            be required.
          </Type>
          <Type paragraph>
            When a grant of easement or fee title is necessary, the{' '}
            <LinkItem href="https://cdn.cosmicjs.com/0d075ed0-0701-11ea-944c-cfd32d7bf8a6-PCWA-Checklist---Signing-Authority.pdf">
              Signing Authority Checklist{' '}
              <DescriptionOutlinedIcon className={classes.linkItemIcon} />
            </LinkItem>{' '}
            provides helpful guidance on the documentation required for
            submission so staff can verify the person or persons signing the
            grant have the authority to transfer title or encumber the project
            property. This signing authority documentation will be in addition
            to the requirement of providing a current preliminary title report
            and lien-holder consent.
          </Type>
          <Type paragraph>
            Should you have questions regarding right-of-way matters pertaining
            to your project you can contact the Right of Way Technician at{' '}
            <EngineeringPhone />.
          </Type>
          <Spacing size="x-large" />
          <Type variant="h3" gutterBottom>
            Distribution Maps and As-Built Drawings
          </Type>
          <Type paragraph>
            For more information or to obtain distribution maps and as-built
            drawings, please contact the Agency’s GIS Department at{' '}
            <EngineeringPhone /> or email at <GisDeptEmail />.
          </Type>
          <Spacing size="x-large" />
          <Type variant="h3" gutterBottom>
            Fire Flow Data Request
          </Type>
          <Type paragraph>
            Fill out the{' '}
            <LinkItem href="https://cdn.cosmicjs.com/0029f460-0702-11ea-95fe-01afbd7f5f3b-PCWA-Fire-Flow-Request-Form-rev.2014.pdf">
              Fire Flow Data Request{' '}
              <DescriptionOutlinedIcon className={classes.linkItemIcon} />
            </LinkItem>{' '}
            to obtain fire flow data. For more information, please contact the
            Engineering Division at <EngineeringPhone /> during business hours.
          </Type>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default NewDevelopmentPage
