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

export default function VerbenaAccordion({
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
            <Type variant="h4">
              De La Mina Verbena or Cedros Island Verbena
            </Type>
          </ChildBox>
        </RowBox>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <RowBox flexSpacing={6} responsive>
            <ChildBox flex="0 1 33%">
              <MediaDialogOnClick
                mediaUrl="https://imgix.cosmicjs.com/6d0cb510-1c1e-11ee-8805-5d9e4358a1d4-IMG6411.JPG"
                mediaName="De La Mina Verbena or Cedros Island Verbena"
                MediaPreviewDialogProps={{
                  ImageProps: {
                    width: 3024,
                    height: 4032
                  }
                }}
              >
                <ImageFancier
                  alt="De La Mina Verbena or Cedros Island Verbena"
                  src={`https://imgix.cosmicjs.com/6d0cb510-1c1e-11ee-8805-5d9e4358a1d4-IMG6411.JPG${imgixArParams}`}
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
          <Type variant="h4">De La Mina Verbena or Cedros Island Verbena</Type>
          <Type variant="subtitle1" gutterBottom color="textSecondary">
            <em>Verbena lilacina 'De La Mina', Glandularia lilacina.</em>
          </Type>
          <Spacing size="small" />
          <Type variant="subtitle1" gutterBottom>
            <em>By Laurie Meyerpeter, Master Gardener</em>
          </Type>
          <Spacing size="x-small" />
          <Type paragraph>
            Just say it. <em>Verbena lilacina 'De La Mina'</em>. Fun, fun, fun!
            It just skips off the tongue like a nursery rhyme. Or if you're
            short on time, De La Mina Verbena is almost as fun to say. Either
            one is so rhyme-y and joyful. <em>Glandularia lilacina</em> is a
            newer name but many nurseries continue to use to the older name for
            this plant.
          </Type>
          <Type paragraph>
            Everything about this plant is joyful. This charming perennial or
            small shrub has lovely fern-like green foliage and tiny purple
            flowers in profuse numbers. Its heaviest bloom is in the spring but
            it has profuse flowers in the summer and fall as well. In some
            climates, it can bloom nearly year round, although in this region,
            it seems to take a slight break during the cold season. It’s a
            selection from Cedros Island off Baja California and is hardy to
            about 25 degrees (similar to citrus). Butterflies love it.{' '}
          </Type>
          <Type paragraph>
            This plant is a favorite of master gardeners and is a staff favorite
            at the UC Arboretum in Davis.
          </Type>
          <Type paragraph>
            <StrongGrey>Bloom</StrongGrey>: ‘De La Mina’ Verbena blooms in
            spring, summer, and fall, and sometimes into winter during warmer
            years. The diminutive purple flowers are shades of purple and
            although small, the plant is usually covered in the tiny blooms. The
            flowers are butterfly favorites and have a light, spicy fragrance.
          </Type>
          <Type paragraph>
            <StrongGrey>Water needs</StrongGrey>: Low, once established.
          </Type>
          <Type paragraph>
            <StrongGrey>Sun</StrongGrey>: Full sun, part shade.
          </Type>
          <Type paragraph>
            <StrongGrey>Size</StrongGrey>: This plant is 2-3’ tall, and 3-4’
            wide with a rounded form.
          </Type>
          <Type paragraph>
            <StrongGrey>Care</StrongGrey>: Low water requirements. Lightly prune
            in late fall to maintain compact form.
          </Type>
          <Type paragraph>
            <StrongGrey>Availability</StrongGrey>: 'De La Mina' Verbena is
            available during the warmer months at local nurseries, sometimes
            sporadically. If not in stock, it’s worth asking when it will be
            re-stocked or check back in a few weeks.
          </Type>
          <Type paragraph>
            <StrongGrey>Bonus plants</StrongGrey>: Many other low and very low
            water plants are butterfly favorites as well. Besides De La Mina
            Verbena, consider yarrows like ‘Island Pink’ Yarrow (Achillea
            millefolium ‘Island Pink’, an Arboretum All-Star) and other yarrows,
            Santa Barbara Daisy (Erigeron karvinsianus, an Arboretum All-Star),
            and Catmint (Nepeta x faassenii, an Arboretum All-Star). All bloom
            profusely in early and mid-summer with repeated blooms throughout
            summer, and make a nice combination. Yarrows, Santa Barbara Daisy,
            and Catmint are all readily available in local nurseries.
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
                href="https://calscape.org/Verbena-lilacina-'De-La-Mina'-(De-La-Mina-Verbena)?srchcr=sc5e4b2b6ca32ac"
              >
                CalScape, De La Mina Verbena: (https://calscape.org)
              </Link>
            </Type>
            <Type>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                variant="body1"
                href="https://calscape.org/Achillea-millefolium-%27Island-Pink%27-(Island-Pink-Yarrow)"
              >
                CalScape, Island Pink Yarrow (https://calscape.org)
              </Link>
            </Type>
            <Type>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                variant="body1"
                href="https://arboretum.ucdavis.edu/plant/island-pink-yarrow"
              >
                UC Davis Arboretum All Stars, Island Pink Yarrow:
                (https://arboretum.ucdavis.edu)
              </Link>
            </Type>
            <Type>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                variant="body1"
                href="https://arboretum.ucdavis.edu/plant/Santa-Barbara-daisy"
              >
                UC Davis Arboretum All Stars, Santa Barbara Daisy:
                (https://arboretum.ucdavis.edu)
              </Link>
            </Type>
            <Type>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                variant="body1"
                href="https://arboretum.ucdavis.edu/plant/hybrid-catmint"
              >
                UC Davis Arboretum All Stars, Hybrid Catmint:
                (https://arboretum.ucdavis.edu)
              </Link>
            </Type>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}
