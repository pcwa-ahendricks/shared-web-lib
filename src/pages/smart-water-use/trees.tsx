// cspell:ignore ondemand Infographic
import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {RowBox, ChildBox, ColumnBox} from 'mui-sleazebox'
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography as Type
} from '@mui/material'
import Image from 'next/legacy/image'
import imgixLoader from '@lib/imageLoader'
import {blueGrey} from '@mui/material/colors'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideoOutlined'
import DescriptionIcon from '@mui/icons-material/DescriptionOutlined'
// import PhotoIcon from '@mui/icons-material/PhotoOutlined'
import LanguageIcon from '@mui/icons-material/LanguageOutlined'
import ResponsiveYouTubePlayer from '@components/ResponsiveYouTubePlayer/ResponsiveYouTubePlayer'
import Spacing from '@components/boxes/Spacing'

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
    <PageLayout title="Tree Care" waterSurface>
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
              <ColumnBox flexSpacing={6}>
                <ChildBox>
                  <Image
                    // src="d5a80e50-52e2-11ec-9aff-3d50541531a0-drought-is-back.jpg"
                    // alt="Drought is back, water your trees, stress your lawn"
                    src="93013b20-e5dc-11ec-9447-f98173199613-Young-tree-in-landscape.jpg"
                    alt="Young tree in new water-wise yard"
                    loader={imgixLoader}
                    layout="responsive"
                    sizes="(max-width: 600px) 60vw, 40vw"
                    width={1250}
                    height={903}
                    /* width={300}
                height={250} */
                  />
                </ChildBox>
                <ChildBox>
                  <Paper elevation={1}>
                    <Box p={2}>
                      <ResponsiveYouTubePlayer
                        controls
                        url="https://www.youtube.com/watch?v=Bs7FEr14zZU"
                        config={{
                          youtube: {
                            playerVars: {showinfo: 1}
                          }
                        }}
                      />
                      <Spacing size="small" />
                      <Type paragraph variant="caption">
                        PCWA is proud to partner with the Colfax High School
                        “Bucket Band” to produce a public service video on
                        efficiently watering young trees.
                      </Type>
                      <Type paragraph variant="caption">
                        The 12-member bucket band, which was drawn from students
                        in the high school's music program, created an original
                        composition for the video.
                      </Type>
                      <Type paragraph variant="caption">
                        <em>
                          A special thanks to Colfax High School's Principal
                          Paul Lundberg, Music Teacher Todd Wilkinson and
                          student musicians for participating, and Green Acres
                          Nursery & Supply for donating the 5-gallon buckets
                          used in the public service video!
                        </em>
                      </Type>
                      <Type paragraph variant="caption">
                        <strong>
                          Warning: Children can fall into buckets and drown.
                          Keep children away from buckets with even a small
                          amount of liquid.
                        </strong>
                      </Type>
                    </Box>
                  </Paper>
                </ChildBox>
              </ColumnBox>
            </ChildBox>
          </RowBox>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}
