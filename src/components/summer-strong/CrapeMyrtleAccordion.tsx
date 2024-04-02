import {ChildBox, RowBox} from '@components/MuiSleazebox'
import Spacing from '@components/boxes/Spacing'
import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  Box,
  Link,
  Typography as Type,
  AccordionSummaryProps
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import React from 'react'
import ImageFancier from '@components/ImageFancier/ImageFancier'
import MediaDialogOnClick from '@components/MediaDialogOnClick/MediaDialogOnClick'
import {StrongGrey} from '../../pages/smart-water-use/summer-strong'

export default function CrapeMyrtleAccordion({
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
        <RowBox justifyContent="space-between" width="100%">
          <ChildBox flex="grow">
            <Type variant="h4">Crape Myrtle hybrids and cultivars</Type>
          </ChildBox>
        </RowBox>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <RowBox flexSpacing={6} responsive>
            <ChildBox flex="0 1 33%">
              <MediaDialogOnClick
                mediaUrl="https://imgix.cosmicjs.com/98712ae0-33b3-11ee-9ab5-815d9b73ff1f-T-Lagerstroemia-Tuscarora-8-26.JPG"
                mediaName="Crape Myrtle"
                MediaPreviewDialogProps={{
                  ImageProps: {
                    width: 3648,
                    height: 2736
                  }
                }}
              >
                <ImageFancier
                  alt="Crape Myrtle"
                  src={`https://imgix.cosmicjs.com/98712ae0-33b3-11ee-9ab5-815d9b73ff1f-T-Lagerstroemia-Tuscarora-8-26.JPG${imgixArParams}`}
                  // 5/4 image aspect ration
                  width={1975}
                  height={1580}
                  defaultGrey
                  sizes="(max-width: 600px) 100vw, 33vw"
                  objectFit="contain"
                />
              </MediaDialogOnClick>
            </ChildBox>
          </RowBox>
          <Spacing size="x-large" />
          <Type variant="h4">Crape Myrtle</Type>
          <Type variant="subtitle1" gutterBottom color="textSecondary">
            <em>Lagerstoemia</em> hybrids and cultivars
          </Type>
          <Spacing size="small" />
          <Type variant="subtitle1" gutterBottom>
            <em>By Laurie Meyerpeter, Master Gardener</em>
          </Type>
          <Spacing size="x-small" />
          <Type paragraph>
            Nothing says “Summer Strong” more than crape myrtle. Crape myrtle is
            one tough tree. When conditions get rough, crape myrtle is there,
            shouting its hot pink, red, white or lavender blooms while the rest
            of the region melts during our hot summers. When other plants wilt
            in the heat and the drought, crape myrtle growls, “Here, hold my
            beer,” steps up, and then knocks our socks off with its brilliantly
            colored flowers, throwing a party every summer with its
            crepe-paper-like blooms that just cover the tree for weeks. It
            doesn’t matter how you take care of them, whether you painstakingly
            prune them or ignore them, whether you water them weekly or forget
            most of the time, whether they you coddle them or give them tough
            love, Crape Myrtles bloom.
          </Type>
          <Type paragraph>
            And if summer blooms aren’t enough, it goes on to have an autumn
            encore with brilliant fall color. Mature trees have gorgeous
            ornamental bark.
          </Type>
          <Type paragraph>
            Crape myrtle cultivars come in many sizes, from trees to small
            shrubs. Choose cultivars that best fit your location, space, and
            color choice.
          </Type>
          <Type paragraph>
            The hybrids are more resistant to powdery mildew.
          </Type>
          <Type paragraph>This plant is an Arboretum All Star.</Type>
          <Type paragraph>
            <StrongGrey>Bloom</StrongGrey>: Pink, lavender, red and white
            cultivars available. Peak bloom is during the hottest months of July
            and August.
          </Type>
          <Type paragraph>
            <StrongGrey>Water needs</StrongGrey>: Low once established.
          </Type>
          <Type paragraph>
            <StrongGrey>Sun</StrongGrey>: Full sun. Without full sun, it may
            flower slightly less and some flower colors like red will be muted.
          </Type>
          <Type paragraph>
            <StrongGrey>Size</StrongGrey>: Size varies depending on the
            cultivar.
          </Type>
          <Type paragraph>
            <StrongGrey>Care</StrongGrey>: Low water requirements. Needs little
            pruning or care. Excessive pruning is discouraged.
          </Type>
          <Type paragraph>
            <StrongGrey>Availability</StrongGrey>: Crape Myrtles are widely
            available year-round.
          </Type>
          <Type paragraph>
            <StrongGrey>Bonus plants</StrongGrey>: Supporting cast includes
            Lantanas <em>(Lantana montevidensis. L. sellowiana, L. hybrids)</em>{' '}
            which bloom profusely throughout the summer and fall. The flower
            colors often overlaps Crape Myrtle as well, for example ‘Muskogee’
            Crape Myrtle shares a similar lavender color as{' '}
            <em>Lantana montevidensis</em> for a soft lavender effect, and
            ‘Natchez’ Crape Myrtle can be matched with white lantana hybrids for
            a “full moon” garden of “summer whites in the night”
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
                href="https://arboretum.ucdavis.edu/plant/crape-myrtle"
              >
                UC Davis Arboretum All Stars: (https://arboretum.ucdavis.edu)
              </Link>
            </Type>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}
