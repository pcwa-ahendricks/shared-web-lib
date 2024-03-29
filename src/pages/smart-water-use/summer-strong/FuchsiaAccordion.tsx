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

export default function FuchsiaAccordion({
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
              {/* Hello Hummingbirds! Cleveland Sage (and other Salvias) */}
              California Fuchsia
            </Type>
          </ChildBox>
          {/* <ChildBox flex="nogrow" width={150}>
			  <Image
				alt="'Winnifred Gilman' Cleveland Sage, Salvia clevelandii 'Winnifred Gilman'"
				src={`https://imgix.cosmicjs.com/297bb290-f4d4-11ed-bb44-790a83f99a24-N-Salvia-clevelandii-8-23.JPG${imgixArParams}`}
				width={3939}
				height={3151}
				loader={imgixUrlLoader}
				layout="responsive"
				sizes="(max-width: 600px) 100vw, 33vw"
				objectFit="cover"
			  />
			</ChildBox> */}
        </RowBox>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <RowBox flexSpacing={6} responsive>
            <ChildBox flex="0 1 33%">
              <MediaDialogOnClick
                mediaUrl="https://imgix.cosmicjs.com/4b4381a0-5e1a-11ee-b975-cb0cfadd93ad-N-Zaushneria-0856-Test-Garden.JPG"
                mediaName="California Fuchsia wide angle"
                MediaPreviewDialogProps={{
                  ImageProps: {
                    width: 2262,
                    height: 2472
                  }
                }}
              >
                <ImageFancier
                  alt="California Fuchsia wide angle"
                  src={`https://imgix.cosmicjs.com/4b4381a0-5e1a-11ee-b975-cb0cfadd93ad-N-Zaushneria-0856-Test-Garden.JPG${imgixArParams}`}
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
                mediaUrl="https://imgix.cosmicjs.com/dfdbf900-5e1a-11ee-b975-cb0cfadd93ad-3093a-Credit-Garden-Soft.jpg"
                mediaName="California Fuchsia close-up"
                MediaPreviewDialogProps={{
                  ImageProps: {
                    width: 2100,
                    height: 1389
                  }
                }}
              >
                <ImageFancier
                  alt="California Fuchsia close-up"
                  src={`https://imgix.cosmicjs.com/dfdbf900-5e1a-11ee-b975-cb0cfadd93ad-3093a-Credit-Garden-Soft.jpg${imgixArParams}`}
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
          <Type variant="h4">California Fuchsia</Type>
          <Type variant="subtitle1" gutterBottom color="textSecondary">
            <em>Epilobium canum </em>(or <em>Zauschneria cana</em>.)
          </Type>
          <Spacing size="small" />
          <Type variant="subtitle1" gutterBottom>
            <em>By Laurie Meyerpeter, Master Gardener</em>
          </Type>
          <Spacing size="x-small" />
          <Type paragraph>
            This plant is one of our California natives and one of the few
            natives that blooms in late summer and fall. It looks good as a
            foliage plant throughout the summer and then after Labor Day, it’s
            SHOWTIME! Hummingbirds love this plant! A tough, low maintenance
            plant that looks good throughout our hot summers.
          </Type>
          <Type paragraph>
            <StrongGrey>Bloom</StrongGrey>: Red to red-orange blooms resemble
            fuchsia flowers in late summer and fall.
          </Type>
          <Type paragraph>
            <StrongGrey>Water needs</StrongGrey>: Low to very low, once
            established.
          </Type>
          <Type paragraph>
            <StrongGrey>Sun</StrongGrey>: Full sun, part shade.
          </Type>
          <Type paragraph>
            <StrongGrey>Size</StrongGrey>: Different cultivars have different
            heights from low ground cover to 1.5’ high and to 2-3’ wide. Low
            varieties spread more than others.
          </Type>
          <Type paragraph>
            <StrongGrey>Care</StrongGrey>: Low to very low water requirements.
            After bloom, it should be cut back to the ground every year for best
            looks. Easy, once a year maintenance; low varieties are so forgiving
            that they can be mowed once a year after bloom.
          </Type>
          <Type paragraph>
            <StrongGrey>Availability</StrongGrey>: Various cultivars are
            available seasonally.
          </Type>
          <Type paragraph>
            <StrongGrey>Bonus plants</StrongGrey>: De La Mina Verbena (Verbena
            lilacina 'De La Mina' or Glandularia lilacina. This plant often has
            fall flowers.
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
                href="https://arboretum.ucdavis.edu/plant/California-fuchsia"
              >
                UC Davis Arboretum All Star, California Fuchsia:
                (https://arboretum.ucdavis.edu)
              </Link>
            </Type>
            <Type>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                variant="body1"
                href="https://calscape.org/Epilobium-canum-(California-Fuchsia)"
              >
                CalScape, California Fuchsia: (https://calscape.org)
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
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}
