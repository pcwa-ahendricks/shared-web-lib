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

export default function GoldenrodAccordion({
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
        <Type variant="h4">California goldenrod</Type>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <Grid container spacing={{xs: 4, sm: 6}}>
            <Grid xs={12} sm={4}>
              <MediaDialogOnClick
                mediaUrl="https://pcwa.imgix.net/pcwa-net/water-efficiency/summer-strong/california.goldenrod-1.jpeg"
                mediaName="California goldenrod"
                MediaPreviewDialogProps={{
                  // original dimensions
                  ImageProps: {
                    width: 680,
                    height: 820
                  }
                }}
              >
                <ImageFancier
                  alt="California goldenrod"
                  src={`https://pcwa.imgix.net/pcwa-net/water-efficiency/summer-strong/california.goldenrod-1.jpeg${imgixArParams}`}
                  // 5/4 image aspect ratio dimensions (?ar=5%3A4&fit=crop&crop=top)
                  width={680}
                  height={544}
                  defaultGrey
                  sizes="(max-width: 600px) 100vw, 33vw"
                  objectFit="cover"
                />
              </MediaDialogOnClick>
            </Grid>
          </Grid>
          <Spacing size="x-large" />
          <Type variant="h4">California goldenrod</Type>
          <Type variant="subtitle1" gutterBottom color="textSecondary">
            <em>Solidago velutina ssp. californica</em>
          </Type>
          <Spacing size="small" />
          <Type variant="subtitle1" gutterBottom>
            <em>By Debbie Arrington, Sacramento Digs Gardening</em>
          </Type>
          <Spacing size="x-small" />
          <Type paragraph>
            Not all California wildflowers tolerate “captivity.” But California
            goldenrod would love a place in your Placer County garden. Local
            wildlife would appreciate it, too.
          </Type>
          <Type paragraph>
            Our native goldenrod (Solidago velutina ssp. californica) is easy to
            spot in valley and foothill meadows. In the grasslands surrounding
            oaks, this native perennial blooms when few other wildflowers can be
            seen—July through November.
          </Type>
          <Type paragraph>
            California goldenrod is well adapted to our climate; it needs winter
            rain but little summer water. It dependably comes back year after
            year.
          </Type>
          <Type paragraph>
            A sunflower cousin, goldenrod lives up to its name. Covering the
            tips of 3-foot-tall stalks, the flowerheads are made up of dozens,
            sometimes hundreds, of tiny yellow blooms. The clusters get so
            heavy, their weight eventually curves the stalks into crooks.
            Surrounded by native grasses, the stalks look like golden
            exclamation points and question marks.
          </Type>
          <Type paragraph>
            Besides its attractive looks, goldenrod supports wildlife for
            months. Bees and other beneficial insects love its pollen and nectar
            in late summer and fall. Birds gobble its seeds throughout fall and
            winter.
          </Type>
          <Type paragraph>
            See California goldenrod in the hedgerow at the UC Master Gardeners
            of Placer County Demonstration Garden at the Loomis Library and
            Community Learning Center.
          </Type>

          <Type paragraph>
            <StrongGrey>Bloom</StrongGrey>: California goldenrod produces tall
            stalks covered with tiny, bright yellow flowers from late summer
            through fall.
          </Type>
          <Type paragraph>
            <StrongGrey>Water needs</StrongGrey>: Low to very low, once
            established. Irrigate deeply once or twice a month.
          </Type>
          <Type paragraph>
            <StrongGrey>Sun</StrongGrey>: Prefers full sun or an open spot near
            an oak tree.
          </Type>
          <Type paragraph>
            <StrongGrey>Size</StrongGrey>: California goldenrod generally
            reaches 2 to 3 feet tall in summer, then dies back to the ground. It
            spreads by underground roots (and can become a garden thug), so make
            sure it has plenty of room.
          </Type>
          <Type paragraph>
            <StrongGrey>Care</StrongGrey>: Low to very low water requirements
            after the first year, once the roots are well established.
            California goldenrod needs little care; cut stalks to the ground
            after the plant dies back in winter to control the spread of seeds
            (or leave them for the birds). Goldenrod prefers a mostly dry
            summer, but can tolerate extra water – as well as poor soil.
          </Type>
          <Type paragraph>
            <StrongGrey>Availability</StrongGrey>: Native plant nurseries offer
            California goldenrod including the SacValley CNPS Nursery at Soil
            Born Farms in Rancho Cordova, Cornflower Farms in Elk Grove and
            Nevada County Native Plants in Nevada City.
          </Type>
          <Type paragraph>
            <StrongGrey>Bonus plants</StrongGrey>: California goldenrod thrives
            with other low-water natives such as deergrass (Muhlenbergia
            rigens), manzanita (Arctostaphylos sp.), Cleveland sage (Salvia
            clevelandii) and local oaks – valley oak (Quercus lobata) , blue oak
            (Q. douglasii) and interior live oak (Q. wislizeni).
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
                href="https://www.sacvalleycnps.org/product/solidago-velutina-ssp-californica"
              >
                SacValley CNPS, California goldenrod:
                (https://www.sacvalleycnps.org)
              </Link>
            </Type>
            <Type>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                variant="body1"
                href="https://calscape.org/Solidago-velutina-ssp.-californica-(California-Goldenrod)"
              >
                Calscape, California goldenrod: (https://calscape.org)
              </Link>
            </Type>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}
