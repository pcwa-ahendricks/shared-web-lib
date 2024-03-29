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
import {StrongGrey} from '../summer-strong'

export default function LionsTailAccordion({
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
            <Type variant="h4">Lion's Tail</Type>
          </ChildBox>
        </RowBox>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <RowBox flexSpacing={6} responsive>
            <ChildBox flex="0 1 33%">
              <MediaDialogOnClick
                mediaUrl="https://imgix.cosmicjs.com/e27e0eb0-491f-11ee-89ab-17371fc03105-FL-Lionstail-2391.JPG"
                mediaName="Lion's Tail, a hummingbird magnet"
                MediaPreviewDialogProps={{
                  ImageProps: {
                    width: 2448,
                    height: 3264
                  }
                }}
              >
                <ImageFancier
                  alt="Lion's Tail, a hummingbird magnet"
                  src={`https://imgix.cosmicjs.com/e27e0eb0-491f-11ee-89ab-17371fc03105-FL-Lionstail-2391.JPG${imgixArParams}`}
                  // 5/4 image aspect ration
                  width={1975}
                  height={1580}
                  defaultGrey
                  sizes="(max-width: 600px) 100vw, 33vw"
                  objectFit="contain"
                />
              </MediaDialogOnClick>
            </ChildBox>
            <ChildBox flex="0 1 33%">
              <MediaDialogOnClick
                mediaUrl="https://imgix.cosmicjs.com/e1ea3320-491f-11ee-bfb7-cfc5e4366a0b-FL-Leonitis-Lions-Tail.JPG"
                mediaName="Lion's Tail flower closeup"
                MediaPreviewDialogProps={{
                  ImageProps: {
                    width: 3456,
                    height: 5184
                  }
                }}
              >
                <ImageFancier
                  alt="Lion's Tail flower closeup"
                  src={`https://imgix.cosmicjs.com/e1ea3320-491f-11ee-bfb7-cfc5e4366a0b-FL-Leonitis-Lions-Tail.JPG${imgixArParams}`}
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
          <Type variant="h4">Lion's Tail</Type>
          <Type variant="subtitle1" gutterBottom color="textSecondary">
            <em>Leonotis leonurus</em>
          </Type>
          <Spacing size="small" />
          <Type variant="subtitle1" gutterBottom>
            <em>By Laurie Meyerpeter, Master Gardener</em>
          </Type>
          <Spacing size="x-small" />
          <Type paragraph>
            Lion's Tail blooms throughout the summer and fall. The orange
            flowers bloom in whorls up the stem. This plant is a hummingbird
            magnet! The leaves are a surprisingly lush green for such a low
            water plant. The blooms make good cut flowers.
          </Type>
          <Type paragraph>
            Its common name is Lion’s Tail but the scientific name Leonotis
            translates to “Lion’s Ear” and leonurus “lion-colored”.
          </Type>
          <Type paragraph>
            <StrongGrey>Bloom</StrongGrey>: Orange tubular flowers arranged in
            whorls up the stem of the plant, it blooms throughout the summer and
            fall.
          </Type>
          <Type paragraph>
            <StrongGrey>Water needs</StrongGrey>: Low once established.
          </Type>
          <Type paragraph>
            <StrongGrey>Sun</StrongGrey>: Full sun.
          </Type>
          <Type paragraph>
            <StrongGrey>Size</StrongGrey>: 4-6’ tall and wide.
          </Type>
          <Type paragraph>
            <StrongGrey>Care</StrongGrey>: Low water requirements. Can be cut
            back in late fall after bloom for best appearance next season.
          </Type>
          <Type paragraph>
            <StrongGrey>Availability</StrongGrey>: Lion’s Tail is readily
            available seasonally.
          </Type>
          <Type paragraph>
            <StrongGrey>Bonus plants</StrongGrey>: Nice companion plants include
            many of the low water, ornamental grasses that shine in late summer
            and fall. Here are two: Karl Foerster Reed Grass (Calamagrostis x
            acutiflora ‘Karl Foerster’) and our native Deer Grass (Muhlenbergia
            rigens). Both are Arboretum All Stars.
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
            {/*<Type>
    <Link
      target="_blank"
      rel="noopener noreferrer"
      variant="body1"
      href="https://arboretum.ucdavis.edu/plant/Karl-Foerster-feather-reed-grass"
    >
      UC Davis Arboretum All Star, Karl Foerster Feather Reed Grasss:
      (https://arboretum.ucdavis.edu)
    </Link>
  </Type>
  <Type>
    <Link
      target="_blank"
      rel="noopener noreferrer"
      variant="body1"
      href="https://arboretum.ucdavis.edu/plant/deergrass"
    >
      UC Davis Arboretum All Stars, Deergrass:
      (https://arboretum.ucdavis.edu)
    </Link>
  </Type>
  <Type>
    <Link
      target="_blank"
      rel="noopener noreferrer"
      variant="body1"
      href="https://calscape.org/Muhlenbergia-rigens-(Deergrass)"
    >
      CalScape: (https://calscape.org)
    </Link>
  </Type> */}
            <Type>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                variant="body1"
                href="https://ucanr.edu/blogs/blogcore/postdetail.cfm?postnum=44250 "
              >
                UCANR: (https://ucanr.edu)
              </Link>
            </Type>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}
