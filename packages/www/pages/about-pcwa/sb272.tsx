import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import PageTitle from '@components/PageTitle/PageTitle'
import {Typography as Type, Link} from '@material-ui/core'
import {TypographyProps} from '@material-ui/core/Typography'
import NarrowContainer from '@components/containers/NarrowContainer'
import SectionBox from '@components/boxes/SectionBox'
import {createStyles, makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
    bulletLi: {
      listStyleType: 'none',
      marginBottom: 4
      // '&::marker': {
      //   fontSize: '1rem'
      // }
    }
  })
)

const Sb272Page = () => {
  const classes = useStyles()

  const lastReviewDate = 'July 1, 2019'

  const TypeBullet = ({children}: TypographyProps) => {
    return (
      <Type component="li" className={classes.bulletLi}>
        {children}
      </Type>
    )
  }

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
              >
                full text of <abbr title="senate bill">SB</abbr> 272
              </Link>
            </Type>
          </SectionBox>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default Sb272Page
