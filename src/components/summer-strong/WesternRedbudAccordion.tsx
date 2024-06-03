import Spacing from '@components/boxes/Spacing'
import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  Box,
  Link,
  Typography as Type,
  AccordionSummaryProps,
  Unstable_Grid2 as Grid
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import React from 'react'
import ImageFancier from '@components/ImageFancier/ImageFancier'
import MediaDialogOnClick from '@components/MediaDialogOnClick/MediaDialogOnClick'
import {StrongGrey} from '../../pages/smart-water-use/summer-strong'

export default function WesternRedbudAccordion({
  imgixArParams,
  AccordionSummaryProps,
  ...rest
}: {
  imgixArParams: string
  AccordionSummaryProps?: Partial<AccordionSummaryProps>
} & Partial<AccordionProps>) {
  return (
    <Accordion {...rest}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        {...AccordionSummaryProps}
      >
        <Type variant="h4">Western Redbud</Type>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <Grid container spacing={{xs: 4, sm: 6}}>
            <Grid xs={12} sm={4}>
              <MediaDialogOnClick
                mediaUrl="https://pcwa.imgix.net/pcwa-net/water-efficiency/summer-strong/western_redbud.jpg"
                mediaName="Western Redbud"
                MediaPreviewDialogProps={{
                  // original dimensions
                  ImageProps: {
                    width: 1193,
                    height: 1536
                  }
                }}
              >
                <ImageFancier
                  alt="Western Redbud"
                  src={`https://pcwa.imgix.net/pcwa-net/water-efficiency/summer-strong/western_redbud.jpg${imgixArParams}`}
                  // 5/4 image aspect ratio dimensions (?ar=5%3A4&fit=crop&crop=top)
                  width={1193}
                  height={954}
                  defaultGrey
                  sizes="(max-width: 600px) 100vw, 33vw"
                  objectFit="cover"
                />
              </MediaDialogOnClick>
            </Grid>
            <Grid xs={12} sm={4}>
              <MediaDialogOnClick
                mediaUrl="https://pcwa.imgix.net/pcwa-net/water-efficiency/summer-strong/western_redbud_bee.jpg"
                mediaName="Western Redbud with bee"
                MediaPreviewDialogProps={{
                  // orig dimensions
                  ImageProps: {
                    width: 5044,
                    height: 3363
                  }
                }}
              >
                <ImageFancier
                  alt="Western Redbud with bee"
                  src={`https://pcwa.imgix.net/pcwa-net/water-efficiency/summer-strong/western_redbud_bee.jpg${imgixArParams}`}
                  // 5/4 image aspect ratio dimensions (?ar=5%3A4&fit=crop&crop=top)
                  width={4204}
                  height={3363}
                  defaultGrey
                  sizes="(max-width: 600px) 100vw, 33vw"
                  objectFit="cover"
                />
              </MediaDialogOnClick>
            </Grid>
          </Grid>
          <Spacing size="x-large" />
          <Type variant="h4">Western redbud</Type>
          <Type variant="subtitle1" gutterBottom color="textSecondary">
            <em>Cercis occidentalis</em>
          </Type>
          <Spacing size="small" />
          <Type variant="subtitle1" gutterBottom>
            <em>By Debbie Arrington, Sacramento Digs Gardening</em>
          </Type>
          <Spacing size="x-small" />
          <Type paragraph>
            See purple? Think redbud. Native to the Sierra foothills, the
            Western redbud (Cercis occidentalis) is the ultimate right plant in
            the right place for Placer County. With its abundant early spring
            flowers in shades of pink-purple, it supports native bees,
            especially leafcutter bees that love its leaves, too. (They line
            their nests with circles of foliage.)
          </Type>
          <Type paragraph>
            Related to peas and legumes, Western redbud is among California’s
            most popular and showy native shrubs or small trees, offering
            year-round garden interest. They’re a natural for low-water foothill
            gardens and often among the first plants to bloom, signaling the
            coming of spring. Much appreciated by hungry bees, redbud flowers
            pop before the season’s first robin chirps.
          </Type>
          <Type paragraph>
            Bright-green heart-shaped leaves emerge after that eye-catching
            flush of flowers. In fall, rusty red-brown decorative seed pods
            dangle from the branches, adding more garden flair. Even the bare
            brown branches are attractive in winter.
          </Type>
          <Type paragraph>
            Once established, Western redbud is as tough as nails, needing only
            monthly (if any) summer irrigation. They do their best with good
            drainage—a spot where water doesn’t accumulate or stand, especially
            in winter—and tolerate both clay and rocky soils.
          </Type>
          <Type paragraph>
            Although they love Placer County, redbuds aren’t for all of
            California. All redbud varieties need four distinct seasons and a
            little winter chill to be successful; this plant can’t cope on the
            coast.
          </Type>

          <Type paragraph>
            <StrongGrey>Bloom</StrongGrey>: With vibrant pink-purple blooms,
            redbuds flower in big clusters directly on their smooth brown bark
            in late winter through early spring, February-April.
          </Type>
          <Type paragraph>
            <StrongGrey>Water needs</StrongGrey>: Low to very low, once
            established.
          </Type>
          <Type paragraph>
            <StrongGrey>Sun</StrongGrey>:Full sun; some hybrids can take partial
            shade.
          </Type>
          <Type paragraph>
            <StrongGrey>Size</StrongGrey>: Western redbud grows as a large
            deciduous shrub (with multiple trunks); other redbuds such as
            Oklahoma redbud (C. reniformis) can be shaped into a small tree
            (with a single trunk). Western redbuds can reach 20 feet tall (with
            too much water) but usually stay 7 to 10 feet.
          </Type>
          <Type paragraph>
            <StrongGrey>Care</StrongGrey>: Low water requirements after the
            first two years, once the roots are well established. During winter
            dormancy after it loses its leaves, prune the tree gently to shape
            as it matures, removing any dead or diseased wood.
          </Type>
          <Type paragraph>
            <StrongGrey>Availability</StrongGrey>: Western redbud is widely sold
            at local nurseries such as Green Acres Nursery & Supply. Big-box
            stores tend to carry other redbud cultivars such as Oklahoma and
            Eastern redbud hybrids (C. Canadensis), which need more irrigation.
            All redbuds like Placer County.
          </Type>
          <Type paragraph>
            <StrongGrey>Bonus plants</StrongGrey>: Western redbud makes a good
            accent tree or shrub among other low-water California natives such
            as California lilacs (Ceanothus), California fuchsia (Epilobium
            canum), or Cleveland sage (Salvia clevelandii).
          </Type>
          <Spacing size="large" />
          <Box>
            <Type variant="subtitle1" gutterBottom>
              Information:
            </Type>
            <Type>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                variant="body1"
                href="https://ucanr.edu/sites/WUCOLS/files/183488.pdf"
              >
                WUCOLS (https://ucanr.edu)
              </Link>
            </Type>
            <Type>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                variant="body1"
                href="https://arboretum.ucdavis.edu/plant/western-redbud"
              >
                UC Davis Arboretum All-Star, Western Redbud:
                (https://arboretum.ucdavis.edu)
              </Link>
            </Type>
            <Type>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                variant="body1"
                href="https://calscape.org/Cercis-occidentalis-(Western-Redbud)?srchcr=sc662c008b9b052"
              >
                CalScape, Western Redbud: (https://calscape.org)
              </Link>
            </Type>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}
