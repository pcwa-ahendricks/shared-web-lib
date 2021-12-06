import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {RowBox, ChildBox} from 'mui-sleazebox'
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography as Type
} from '@material-ui/core'
import Image from 'next/image'
import imgixLoader from '@lib/imageLoader'
import {blueGrey} from '@material-ui/core/colors'
import OndemandVideoIcon from '@material-ui/icons/OndemandVideoOutlined'
import DescriptionIcon from '@material-ui/icons/DescriptionOutlined'
// import PhotoIcon from '@material-ui/icons/PhotoOutlined'
import LanguageIcon from '@material-ui/icons/LanguageOutlined'

export default function TreesPage() {
  const ListItemLink = (props: any) => {
    return (
      <ListItem
        button
        component="a"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    )
  }
  return (
    <PageLayout title="Page Template" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle title="Trees Need Extra Care, Especially During Drought" />
          <RowBox responsive flexSpacing={8}>
            <ChildBox flex="55%" order={{xs: 2, sm: 1}}>
              <Type paragraph>
                California is experiencing a severe drought. As we all work
                together to conserve water, remember to take special care of
                your trees. Lawn can recover, but trees can be lost forever when
                the weather stays dry for extended periods.
              </Type>
              <Type paragraph>
                Here are some of our favorite resources for helping your trees
                survive the drought.
              </Type>
              <Box>
                <Box p={2} bgcolor={blueGrey[50]}>
                  <List>
                    <ListItemLink href="https://bewatersmart.info/wp-content/uploads/2021/07/Drought-tree-care-tips.pdf">
                      <ListItemIcon>
                        <DescriptionIcon />
                      </ListItemIcon>
                      <ListItemText>
                        Tip Sheet: We Need Trees, and Trees Need Water from the
                        Sacramento Tree Foundation
                      </ListItemText>
                    </ListItemLink>
                    <ListItemLink href="https://bewatersmart.info/wp-content/uploads/2014/06/Drought-Tips-Infographic.pdf">
                      <ListItemIcon>
                        <DescriptionIcon />
                      </ListItemIcon>
                      <ListItemText>
                        Tip Sheet: Tips for Tree Care During Drought from the
                        Sacramento Tree Foundation
                      </ListItemText>
                    </ListItemLink>
                    <ListItemLink href="https://bewatersmart.info/wp-content/uploads/2014/10/CalFire_IFGU_Drought_infographic.pdf">
                      <ListItemIcon>
                        <DescriptionIcon />
                      </ListItemIcon>
                      <ListItemText>
                        Infographic: Help Your Trees Survive the Drought from
                        the California Urban Forests Council
                      </ListItemText>
                    </ListItemLink>
                    <ListItemLink href="https://www.youtube.com/watch?v=tN4DguyQn2s&t=2s">
                      <ListItemIcon>
                        <OndemandVideoIcon />
                      </ListItemIcon>
                      <ListItemText>
                        Video: How to Use the “Bucket Method” to give young
                        trees the water they need from the Regional Water
                        Authority and Sacramento Tree Foundation
                      </ListItemText>
                    </ListItemLink>
                    <ListItemLink href="https://bewatersmart.info/wp-content/uploads/2021/08/Tree-Watering-Guidelines-2.pdf">
                      <ListItemIcon>
                        <DescriptionIcon />
                      </ListItemIcon>
                      <ListItemText>
                        Tip Sheet: Tree Watering Guidelines – The bucket method
                        from the Sacramento Tree Foundation
                      </ListItemText>
                    </ListItemLink>
                    <ListItemLink href="https://bewatersmart.info/how-to-water-your-mature-trees/">
                      <ListItemIcon>
                        <OndemandVideoIcon />
                      </ListItemIcon>
                      <ListItemText>
                        Video: How to Help Mature Trees Survive the Dry Months
                        from the Regional Water Authority and Sacramento Tree
                        Foundation
                      </ListItemText>
                    </ListItemLink>
                    <ListItemLink href="https://pcmg.ucanr.org/Drought_Advice/">
                      <ListItemIcon>
                        <LanguageIcon />
                      </ListItemIcon>
                      <ListItemText>
                        UC Master Gardeners of Placer County Drought Advice
                      </ListItemText>
                    </ListItemLink>
                  </List>
                </Box>
              </Box>
            </ChildBox>
            <ChildBox order={{xs: 1, sm: 2}} flex="45%" mx="auto" width="100%">
              <Image
                src="e8094190-52e2-11ec-9aff-3d50541531a0-your-yard-needs-less-water.jpg"
                alt="Drought is back, water your trees, stress your lawn"
                loader={imgixLoader}
                layout="responsive"
                sizes="(max-width: 600px) 60vw, 40vw"
                width={960}
                height={960}
              />
            </ChildBox>
          </RowBox>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}
