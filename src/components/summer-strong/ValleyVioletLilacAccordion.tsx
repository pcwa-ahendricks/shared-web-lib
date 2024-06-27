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

export default function ValleyVioletLilacAccordion({
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
        <Type variant="h4">Valley Violet California lilac</Type>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <Grid container spacing={{xs: 4, sm: 6}}>
            <Grid xs={12} sm={4}>
              {/* <MediaDialogOnClick
                mediaUrl="https://pcwa.imgix.net/pcwa-net/water-efficiency/summer-strong/Ceanothus%20maritimus%20%E2%80%98Valley%20Violet%E2%80%99.jpg"
                mediaName="Valley Violet California lilac"
                MediaPreviewDialogProps={{
                  // original dimensions
                  ImageProps: {
                    width: *,
                    height: *
                  }
                }}
              >*/}
              <ImageFancier
                alt="Valley Violet California lilac"
                src={`https://pcwa.imgix.net/pcwa-net/water-efficiency/summer-strong/Ceanothus%20maritimus%20%E2%80%98Valley%20Violet%E2%80%99.jpg${imgixArParams}`}
                // 5/4 image aspect ratio dimensions (?ar=5%3A4&fit=crop&crop=top)
                width={300}
                height={240}
                defaultGrey
                sizes="(max-width: 600px) 100vw, 33vw"
                objectFit="cover"
              />
              {/* </MediaDialogOnClick> */}
            </Grid>
            <Grid xs={12} sm={4}>
              <MediaDialogOnClick
                mediaUrl="https://pcwa.imgix.net/pcwa-net/water-efficiency/summer-strong/1000_F_435874585_H4ui8yCFHnprmInZvYmj7NnnOLstT6Mb.jpg"
                mediaName="Valley Violet California lilac close-up"
                MediaPreviewDialogProps={{
                  // orig dimensions
                  ImageProps: {
                    width: 1000,
                    height: 662
                  }
                }}
              >
                <ImageFancier
                  alt="Valley Violet California lilac close-up"
                  src={`https://pcwa.imgix.net/pcwa-net/water-efficiency/summer-strong/1000_F_435874585_H4ui8yCFHnprmInZvYmj7NnnOLstT6Mb.jpg${imgixArParams}`}
                  // 5/4 image aspect ratio dimensions (?ar=5%3A4&fit=crop&crop=top)
                  width={828}
                  height={662}
                  defaultGrey
                  sizes="(max-width: 600px) 100vw, 33vw"
                  objectFit="cover"
                />
              </MediaDialogOnClick>
            </Grid>
          </Grid>
          <Spacing size="x-large" />
          <Type variant="h4">Valley Violet California lilac</Type>
          <Type variant="subtitle1" gutterBottom color="textSecondary">
            <em>Ceanothus maritimus</em>
          </Type>
          <Spacing size="small" />
          <Type variant="subtitle1" gutterBottom>
            <em>By Debbie Arrington, Sacramento Digs Gardening</em>
          </Type>
          <Spacing size="x-small" />
          <Type paragraph>
            Want happy native bees? Plant California lilacs. As bees wake from
            winter, their fragrant blooms offer a nectar pick-me-up. Butterflies
            and moths adore them too. Growing wild throughout our state,
            California lilacs (Ceanothus spp.) are not true lilacs (Syringa
            spp.), but their fragrant spring flowers reminded pioneers of lilacs
            back home.
          </Type>
          <Type paragraph>
            Also known as “mountain lilac,” ‘Valley Violet’ forms low round
            evergreen mounds. HOA-friendly and a UC Davis Arboretum All-Star,
            this native shrub is considered the best small ceanothus for Central
            Valley and foothill gardens, according to water-wise gardening
            experts, because of its adaptability, compact growth and easy care.
            It tolerates almost any soil type including clay.
          </Type>
          <Type paragraph>
            The UC Master Gardeners of Placer County Demonstration Garden at the
            Loomis Library and Community Learning Center features ‘Valley
            Violet’ as well as three other popular ceanothus: ‘Concha’
            (Ceanothus ‘Concha’), one of the oldest ceanothus cultivars with
            intense bright blue flowers; ‘Dark Star’ (Ceanothus ‘Dark Star’), a
            tough hybrid with small dark green leaves and blue flower clusters;
            and buckbrush (Ceanothus cuneatus), a pollinator favorite with
            lavender-tinged white flowers.
          </Type>
          <Type paragraph>
            <StrongGrey>Bloom</StrongGrey>: Ceanothus comes in many blue or
            purple shades (and a few pinks). 'Valley Violet' produces abundant
            clusters of - you guessed it - dark-violet flowers in late winter or
            early spring.
          </Type>
          <Type paragraph>
            <StrongGrey>Water needs</StrongGrey>: Low, once established. Needs
            irrigation once or twice a month. While most ceanothus loathe extra
            water, ‘Valley Violet’ is unique in that it can withstand weekly
            irrigation in the home landscape.
          </Type>
          <Type paragraph>
            <StrongGrey>Sun</StrongGrey>: Can take full sun in the foothills,
            but prefers partial shade, especially at lower elevations. A
            location with morning sun is ideal.
          </Type>
          <Type paragraph>
            <StrongGrey>Size</StrongGrey>: ‘Valley Violet’ stays compact – 2
            feet tall and 3 to 4 feet wide at maturity. Other California lilac
            varieties can reach 6 to 9 feet tall and 8 to 10 feet wide.
          </Type>
          <Type paragraph>
            <StrongGrey>Care</StrongGrey>: Low water requirements after the
            first two years, once the roots are well established. Too much water
            and poor drainage kills these plants. They can’t take “normal”
            landscape irrigation, especially in summer; they’ll rot. Ceanothus
            is best planted in the fall in order to take advantage of winter
            growth. California lilacs need little pruning; remove any dead wood
            and gently prune to shape after spring blooms fade.
          </Type>
          <Type paragraph>
            <StrongGrey>Availability</StrongGrey>: More nurseries are offering
            California lilacs especially those that specialize in low-water
            shrubs. Find ‘Valley Violet’ at the UC Davis Arboretum Teaching
            Nursery and other nurseries that specialize in natives.
          </Type>
          <Type paragraph>
            <StrongGrey>Bonus plants</StrongGrey>: California lilacs love
            growing with other low-water California natives such as California
            fuchsia (Epilobium canum), deer grass (Muhlenbergia rigens), island
            alum root (Heuchera maxima) or Cleveland sage (Salvia clevelandii).
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
                href="https://arboretum.ucdavis.edu/plant/valley-violet-maritime-ceanothus"
              >
                UC Davis Arboretum All-Star, ‘Valley Violet’ maritime ceanothus:
                (https://arboretum.ucdavis.edu)
              </Link>
            </Type>
            {/* <Type>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                variant="body1"
                href="https://arboretum.ucdavis.edu/plant/island-pink-yarrow"
              >
                UC Davis Arboretum All Star, Island Pink Yarrow:
                (https://arboretum.ucdavis.edu)
              </Link>
            </Type> */}
            <Type>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                variant="body1"
                href="https://calscape.org/Ceanothus-maritimus-%27Valley-Violet%27-(Valley-Violet-Mountain-Lilac)?srchcr=sc5eaa16b978ac6"
              >
                Calscape, ‘Valley Violet’ mountain lilac: (https://calscape.org)
              </Link>
            </Type>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}
