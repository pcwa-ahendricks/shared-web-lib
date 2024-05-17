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
  // console.log(
  //   `https://pcwa.imgix.net/pcwa-net/water-efficiency/summer-strong/N%20Penstemon%20Margarita%20BOP%204-17.JPG${imgixArParams}`
  // )
  return (
    <Accordion {...rest}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        {...AccordionSummaryProps}
      >
        <RowBox justifyContent="space-between" width="100%">
          <ChildBox flex="grow">
            <Type variant="h4">Margarita BOP Foothill Penstemon</Type>
          </ChildBox>
        </RowBox>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <RowBox flexSpacing={6} responsive>
            <ChildBox flex="0 1 33%">
              <MediaDialogOnClick
                mediaUrl="https://pcwa.imgix.net/pcwa-net/water-efficiency/summer-strong/N%20Penstemon%20Margarita%20BOP%204-17.JPG"
                mediaName="Margarita BOP Foothill Penstemon"
                MediaPreviewDialogProps={{
                  ImageProps: {
                    width: 5184,
                    height: 3456
                  }
                }}
              >
                <ImageFancier
                  alt="Margarita BOP Foothill Penstemon"
                  src={`https://pcwa.imgix.net/pcwa-net/water-efficiency/summer-strong/N%20Penstemon%20Margarita%20BOP%204-17.JPG${imgixArParams}`}
                  // 5/4 image aspect ration
                  width={4320}
                  height={3456}
                  defaultGrey
                  sizes="(max-width: 600px) 100vw, 33vw"
                  objectFit="cover"
                />
              </MediaDialogOnClick>
            </ChildBox>
          </RowBox>
          <Spacing size="x-large" />
          <Type variant="h4">
            ‘Margarita BOP’ Penstemon or ‘Margarita BOP’ Foothill Penstemon
          </Type>
          <Type variant="subtitle1" gutterBottom color="textSecondary">
            <em>Penstemon heterophyllus ‘Margarita BOP’</em>
          </Type>
          <Spacing size="small" />
          <Type variant="subtitle1" gutterBottom>
            <em>By Laurie Meyerpeter, Master Gardener</em>
          </Type>
          <Spacing size="x-small" />
          <Type paragraph>
            What's with that name? Margarita BOP? …BOP??!?!! The “BOP” is short
            for “Bottom Of the Porch”! It's a natural hybrid from Las Pilitas
            Nursery and it was growing at the “bottom of the porch,” hence the
            BOP part of its name. The nursery took note of what a heavy bloomer
            it was and how tough the plant was (despite getting run over by
            bicycles, skateboards and dogs) and began to propagate it.
          </Type>
          <Type paragraph>
            It's a California native. It's actually a hybrid of probably two
            native penstemons. One parent is our own local Foothill Penstemon,
            and it is thought that one grandparent may be{' '}
            <em>Penstemon laetus</em>, also a California native. Because it’s a
            hybrid, it exhibits a trait called hybrid vigor and the plant is
            extremely floriferous. The Placer County Master Gardeners were
            testing it in their Demo Garden a few years back, alongside a
            standard Foothill Penstemon, comparing how many pollinators each
            plant attracted and Margarita BOP Penstemon won hands down, simply
            because it had more flowers than its more ordinary sibling.
          </Type>
          <Type paragraph>
            <StrongGrey>Bloom</StrongGrey>: A spring bloomer, ‘Margarita BOP’
            Penstemon has stalks of clear, sky blue blossoms that change to a
            stunning purple as they begin to fade. Swoon! If you keep the dead
            flowers clipped off, it will bloom again.
          </Type>
          <Type paragraph>
            <StrongGrey>Water needs</StrongGrey>: Low to very low, once
            established.
          </Type>
          <Type paragraph>
            <StrongGrey>Sun</StrongGrey>: Full sun, part shade.
          </Type>
          <Type paragraph>
            <StrongGrey>Size</StrongGrey>: ‘Margarita BOP’ is roughly 1-2’ tall
            with a 2-3’ spread, depending on location.
          </Type>
          <Type paragraph>
            <StrongGrey>Care</StrongGrey>: Low water requirements. Snip the dead
            flowers and you may get a second and third bloom.
          </Type>
          <Type paragraph>
            <StrongGrey>Availability</StrongGrey>: ‘Margarita BOP’ Penstemon is
            seasonally available just about everywhere in the spring. Other
            penstemons include the native Foothill Penstemon, often available at
            native plant nurseries and native plant sales, and other hybrid
            penstemons and cultivars like <em>'Electric Blue'</em>,{' '}
            <em>'Blue Spring'</em> and
            <em>'Catherine De La Mare'</em>, also available at seasonally at
            select local nurseries. Collect them all!
          </Type>
          <Type paragraph>
            <StrongGrey>Bonus plants</StrongGrey>: For your own spring
            superbloom, combine ‘Margarita BOP’ Penstemon with California native
            wildflowers. Toss some California poppy seeds around ‘Margarita BOP’
            in the fall or early spring for a stunning combination. ‘Island
            Pink’ Yarrow, <em>Achillea millefolium ‘Island Pink’</em> is another
            native cultivar (and a UC Davis Arboretum All Star) and ‘Margarita
            BOP’s blue blossoms combine well with the pink yarrow flowers,
            blooming at roughly the same time. Various yarrows are widely
            available at local nurseries.
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
                href="https://arboretum.ucdavis.edu/plant/Santa-Margarita-foothill-penstemon"
              >
                UC Davis Arboretum All Star, Santa Margarita Foothill Penstemon:
                (https://arboretum.ucdavis.edu)
              </Link>
            </Type>
            <Type>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                variant="body1"
                href="https://arboretum.ucdavis.edu/plant/island-pink-yarrow"
              >
                UC Davis Arboretum All Star, Island Pink Yarrow:
                (https://arboretum.ucdavis.edu)
              </Link>
            </Type>
            <Type>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                variant="body1"
                href="https://calscape.org/Penstemon-heterophyllus-'Margarita-BOP'-(Margarita-BOP-Penstemon)?srchcr=sc65e8e23d04376 https://calscape.org/Achillea-millefolium-'Island-Pink'-(Island-Pink-Yarrow)?srchcr=sc65e9319279554"
              >
                CalScape, Margarita Bop Penstemon: (https://calscape.org)
              </Link>
            </Type>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}
