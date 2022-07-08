import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import Spacing from '@components/boxes/Spacing'
import {
  createStyles,
  List,
  makeStyles,
  Typography as Type,
  ListItemText
} from '@material-ui/core'
import ListBulletItem from '@components/lists/ListBulletItem'

const useStyles = makeStyles((theme) =>
  createStyles({
    listItemBullet: {
      minWidth: theme.spacing(5)
    },
    noBottomMargin: {
      marginBottom: 0
    }
  })
)

export default function CiiConservationRegulationsPage() {
  const classes = useStyles()

  return (
    <PageLayout title="Commercial Conservation Regulations" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle
            titleProps={{variant: 'h2'}}
            title="Emergency Conservation Regulations for Commercial, Industrial and Institutional Properties"
          />
          <Spacing />
          <Type paragraph>
            To address California's severe drought, the State Water Resources
            Control Board (SWRCB) recently adopted emergency water conservation
            regulations that prohibit the irrigation of non-functional turf at
            commercial, industrial, and institutional (CII) properties.
          </Type>
          <Type paragraph>
            Non-functional turf is defined in the regulation as{' '}
            <em style={{fontSize: '1.21rem'}}>
              "Turf that is solely ornamental and not regularly used for human
              recreational purposes or for civic or community events."
            </em>
          </Type>
          <Type>
            There are several exemptions to this definition, including:
          </Type>
          <List>
            <ListBulletItem>
              <ListItemText
                classes={{root: classes.noBottomMargin}}
                primary="Turf used for human recreation, civic purposes, sports or play."
              />
            </ListBulletItem>
          </List>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}
