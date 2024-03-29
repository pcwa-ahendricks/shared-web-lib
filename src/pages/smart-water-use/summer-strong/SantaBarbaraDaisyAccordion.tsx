import {ChildBox, RowBox} from '@components/MuiSleazebox'
import Spacing from '@components/boxes/Spacing'
import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  AccordionSummaryProps,
  Box,
  Link,
  Typography as Type
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import React from 'react'
import ImageFancier from '@components/ImageFancier/ImageFancier'
import MediaDialogOnClick from '@components/MediaDialogOnClick/MediaDialogOnClick'
import {StrongGrey} from '../summer-strong'

export default function SantaBarbaraDaisyAccordion({
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
            {/* <AcctCancelIcon
          sx={{
            fontSize: '32px',
            color: red[400],
            paddingRight: '8px'
          }}
        /> */}
            <Type variant="h4">Santa Barbara Daisy</Type>
          </ChildBox>
        </RowBox>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <RowBox flexSpacing={6} responsive>
            <ChildBox flex="0 1 33%">
              <MediaDialogOnClick
                mediaUrl="https://imgix.cosmicjs.com/c12deaa0-0199-11ee-9c26-15fefb4eeda0-FL-Erigeron.JPG"
                mediaName="Santa Barbara Daisy"
                MediaPreviewDialogProps={{
                  ImageProps: {
                    width: 2448,
                    height: 3264
                  }
                }}
              >
                <ImageFancier
                  alt="Santa Barbara Daisy"
                  src={`https://imgix.cosmicjs.com/c12deaa0-0199-11ee-9c26-15fefb4eeda0-FL-Erigeron.JPG${imgixArParams}`}
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
          <Type variant="h4">Santa Barbara Daisy</Type>
          <Type variant="subtitle1" gutterBottom color="textSecondary">
            <em>Erigeron karvinskianus</em>
          </Type>
          <Spacing size="small" />
          <Type variant="subtitle1" gutterBottom>
            <em>By Laurie Meyerpeter, Master Gardener</em>
          </Type>
          <Spacing size="x-small" />
          <Type paragraph>
            This is a tough plant with nearly continual bloom. It begins
            flowering about the time you pull out the shorts and sandals in
            spring and flowers until you get out a sweater in the fall. It may
            briefly shut down during an intense heat wave but will quickly
            resume once the swelter stops. If you're out in the heat, this plant
            is blooming.
          </Type>
          <Type paragraph>
            Santa Barbara Daisy is lovely trailing over a wall or used in a
            container. It can stand on its own but it also shines as a
            supporting plant tucked in among other water conserving plants and
            flowers, where it flowers prolifically without stealing the show.
            It’s an underappreciated workhorse in the garden and it’s a
            wonderful plant for this region.
          </Type>
          <Type paragraph>
            This plant is an Arboretum All Star, a group of water-conserving,
            heat-tolerant ornamental plants that thrive in this region. The
            plants have low maintenance needs and have value to birds and
            pollinators. Here is more information about the All Star program:{' '}
            <Link
              rel="noopener noreferrer"
              target="_blank"
              href="https://ccuh.ucdavis.edu/arboretum-all-stars#:~:text=The%20All%2DStars%20program%2C%20an,insects%2C%20and%20other%20native%20pollinators"
            >
              https://ccuh.ucdavis.edu/arboretum-all-stars
            </Link>
            .
          </Type>
          <Type paragraph>
            <StrongGrey>Bloom</StrongGrey>: Santa Barbara Daisy blooms from
            spring through fall. It may shut down bloom briefly during an
            intense heat wave but soon after, it will resume its floriferous
            habit.
          </Type>
          <Type paragraph>
            <StrongGrey>Water needs</StrongGrey>: Low once established.
          </Type>
          <Type paragraph>
            <StrongGrey>Sun</StrongGrey>: Full sun, part shade.
          </Type>
          <Type paragraph>
            <StrongGrey>Size</StrongGrey>: Santa Barbara Daisy is a spreading or
            trailing groundcover-type perennial that grows 1-2' tall and can
            spreads 3-5'.
          </Type>
          <Type paragraph>
            <StrongGrey>Care</StrongGrey>: Low water requirements. Can be cut
            nearly to the ground to renew if it gets too big or rangy.
          </Type>
          <Type paragraph>
            <StrongGrey>Availability</StrongGrey>: Santa Barbara Daisy is
            readily available at local nurseries throughout the growing season.
          </Type>
          <Type paragraph>
            <StrongGrey>Bonus plants</StrongGrey>: Other low-water,
            complimentary floriferous Arboretum All Stars include ‘Island Pink’
            Yarrow (Yarrow (Achillea millefolium ‘Island Pink) and other yarrow
            varieties, Cape Balsam (Bulbine frutescens), several Lavenders like
            ‘Goodwin Creek’ (Lavendula x ginginsii ‘Goodwin Creek’) and ‘Otto
            Quast’ (Lavandula stoechas ‘Otto Quast’) , and Santa Margarita
            Foothill Penstemon (Penstemon heterophyllus ‘Margarita BOP’). Most
            are available at local nurseries on a seasonal basis.
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
                href="https://arboretum.ucdavis.edu/plant/Santa-Barbara-daisy"
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
