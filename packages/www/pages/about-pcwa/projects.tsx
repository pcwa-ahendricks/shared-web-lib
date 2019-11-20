// cspell:ignore Bonnynook
import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import PageTitle from '@components/PageTitle/PageTitle'
import WideContainer from '@components/containers/WideContainer'
import {RowBox, ChildBox} from '@components/boxes/FlexBox'
import {useTheme} from '@material-ui/core/styles'
import {Typography as Type, Divider} from '@material-ui/core'
import ConstructionProject from '@components/ConstructionProject/ConstructionProject'
import Spacing from '@components/boxes/Spacing'

const ProjectsPage = () => {
  const margin = 4 // Used with left and top margin of flexWrap items.
  const theme = useTheme()

  const itemFlex = `1 0 calc(50% - ${theme.spacing(4)}px)`

  return (
    <PageLayout title="Construction Projects" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle title="Construction Projects" subtitle="General" />
          <RowBox flexWrap="wrap" flexSpacing={margin} mt={-margin}>
            <ChildBox mt={margin} flex={itemFlex}>
              <ConstructionProject>
                <Type variant="h3" gutterBottom color="primary">
                  Alta Loop Pipeline – Cable And Powerhouse Rd
                </Type>
                <Spacing>
                  <Divider />
                </Spacing>
                <article>
                  <Type variant="subtitle1" gutterBottom>
                    Project Description
                  </Type>
                  <Type paragraph>
                    The project will consist of replacing the existing 4” steel
                    distribution water main within Cable Road, Alta Power House
                    Road, and Timber (red line). The main has experienced
                    several breaks throughout the years and is at the end of its
                    useful life. The pipe that goes from Brown Road south east
                    through several properties to Alta Bonnynook Road may be
                    replaced by installing a main in Alta Power House Road
                    (yellow line). All existing services will be replaced and/or
                    reconnected.
                  </Type>
                  <Type paragraph>
                    A new water main (green) will also be installed along Cable
                    Road beginning at the intersection of Cable Road and Timber
                    Lane going east connecting to the existing 10” distribution
                    main at the east end of Cable Road. A pressure reducing
                    station (PRS) will be included to connect two distinct
                    pressure zones. The purpose of the new line is to increase
                    the reliability of service by providing redundancy to a
                    portion of the system.
                  </Type>
                </article>
              </ConstructionProject>
            </ChildBox>
            <ChildBox mt={margin} flex={itemFlex}>
              bar
            </ChildBox>
            <ChildBox mt={margin} flex={itemFlex}>
              baz
            </ChildBox>
          </RowBox>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export default ProjectsPage
