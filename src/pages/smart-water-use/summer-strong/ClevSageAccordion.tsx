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

export default function ClevSageAccordion({
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
              Cleveland Sage (and other Salvias)
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
            <ChildBox flex="33%">
              <MediaDialogOnClick
                mediaUrl="https://imgix.cosmicjs.com/29536a10-f4d4-11ed-bb44-790a83f99a24-FL-Salvia-clevelandii-State-Fair-7-24.JPG"
                mediaName="'Winnifred Gilman' Cleveland Sage, Salvia clevelandii 'Winnifred Gilman'"
                MediaPreviewDialogProps={{
                  ImageProps: {
                    width: 1975,
                    height: 2688
                  }
                }}
              >
                <ImageFancier
                  alt="'Winnifred Gilman' Cleveland Sage, Salvia clevelandii 'Winnifred Gilman'"
                  src={`https://imgix.cosmicjs.com/29536a10-f4d4-11ed-bb44-790a83f99a24-FL-Salvia-clevelandii-State-Fair-7-24.JPG${imgixArParams}`}
                  width={1975}
                  height={1580}
                  defaultGrey
                  sizes="(max-width: 600px) 100vw, 33vw"
                  objectFit="contain"
                />
              </MediaDialogOnClick>
            </ChildBox>
            <ChildBox flex="33%">
              <MediaDialogOnClick
                mediaUrl="https://imgix.cosmicjs.com/297bb290-f4d4-11ed-bb44-790a83f99a24-N-Salvia-clevelandii-8-23.JPG"
                mediaName="'Winnifred Gilman' Cleveland Sage, Salvia clevelandii 'Winnifred Gilman'"
                MediaPreviewDialogProps={{
                  ImageProps: {
                    width: 3939,
                    height: 3456
                  }
                }}
              >
                <ImageFancier
                  alt="'Winnifred Gilman' Cleveland Sage, Salvia clevelandii 'Winnifred Gilman'"
                  src={`https://imgix.cosmicjs.com/297bb290-f4d4-11ed-bb44-790a83f99a24-N-Salvia-clevelandii-8-23.JPG${imgixArParams}`}
                  width={3939}
                  height={3151}
                  defaultGrey
                  sizes="(max-width: 600px) 100vw, 33vw"
                  objectFit="contain"
                />
              </MediaDialogOnClick>
            </ChildBox>
            <ChildBox flex="33%">
              <MediaDialogOnClick
                // transPaper={0.2}
                mediaUrl="https://imgix.cosmicjs.com/296878b0-f4d4-11ed-bb44-790a83f99a24-N-Salvia-clevelandii-5-16-3.JPG"
                mediaName="'Winnifred Gilman' Cleveland Sage, Salvia clevelandii 'Winnifred Gilman'"
                MediaPreviewDialogProps={{
                  ImageProps: {
                    width: 5167,
                    height: 3445
                  }
                }}
              >
                <ImageFancier
                  alt="'Winnifred Gilman' Cleveland Sage, Salvia clevelandii 'Winnifred Gilman'"
                  src={`https://imgix.cosmicjs.com/296878b0-f4d4-11ed-bb44-790a83f99a24-N-Salvia-clevelandii-5-16-3.JPG${imgixArParams}`}
                  width={4306}
                  height={3445}
                  defaultGrey
                  sizes="(max-width: 600px) 100vw, 33vw"
                  objectFit="contain"
                />
              </MediaDialogOnClick>
            </ChildBox>
          </RowBox>
          <Spacing size="x-large" />
          <Type variant="h4">'Winnifred Gilman' Cleveland Sage</Type>
          <Type variant="subtitle1" gutterBottom color="textSecondary">
            <em>Salvia clevelandii 'Winnifred Gilman'</em>
          </Type>
          <Spacing size="small" />
          <Type variant="subtitle1" gutterBottom>
            <em>By Laurie Meyerpeter, Master Gardener</em>
          </Type>
          <Spacing size="x-small" />
          <Type paragraph>
            Along with gorgeous flowers, the leaves of 'Winnifred Gilman' and
            other Cleveland sage cultivars are highly aromatic. When the Placer
            County Master Gardeners teach a propagation class at Del Oro High
            School, this plant is a huge favorite of the teens because of its
            beautiful aroma and the unique flowers.
          </Type>
          <Type paragraph>
            'Winnifred Gilman' is one cultivar of Cleveland sage but local
            nurseries may stock similar and interchangeable Cleveland sage
            cultivars such as 'Allen Chickering'. And the terms "salvia" and
            “sage” are both used interchangeably to describe this very large
            family of plants. Many of them are California natives. Salvias are
            beloved by hummingbirds, bees, and butterflies.
          </Type>
          <Type paragraph>
            <StrongGrey>Bloom</StrongGrey>: 'Winnifred Gilman' blooms in late
            spring into early summer, with a light bloom later in the summer.
            The distinctive whorled flowers are shades of blue and violet. When
            not in bloom, the plant forms a mound of gray-green leaves that are
            very aromatic on warm summer days.
          </Type>
          <Type paragraph>
            <StrongGrey>Water needs</StrongGrey>: Low to Very Low once
            established.
          </Type>
          <Type paragraph>
            <StrongGrey>Sun</StrongGrey>: Full sun, part shade.
          </Type>
          <Type paragraph>
            <StrongGrey>Size</StrongGrey>: 'Winnifred Gilman' Cleveland sage
            grows 3-4' x 3-4' mounded shrub if unpruned. Other cultivars may be
            slightly larger and wider if unpruned.
          </Type>
          <Type paragraph>
            <StrongGrey>Care</StrongGrey>: Low water requirements. Lightly prune
            in late fall to maintain compact form.
          </Type>
          <Type paragraph>
            <StrongGrey>Availability</StrongGrey>: Cleveland sage is seasonally
            available. Local nurseries typically stock either 'Winnifred Gilman'
            Cleveland Sage or 'Allan Chickering' Cleveland Sage throughout the
            spring and summer months.
          </Type>
          <Type paragraph>
            <StrongGrey>Bonus plants</StrongGrey>: Many other salvias or sages
            are Summer Strong plants with low water requirements and good summer
            looks. Besides 'Winnifred Gilman', 'Allen Chickering', and other
            Cleveland sages and cultivars, check out these readily available
            salvias: 'Bee's Bliss' Sage (Salvia 'Bees Bliss'), White Sage
            (Salvia apiana), and Hummingbird Sage (Salvia spathacea). A
            fantastic and popular family of plants! Available seasonally at
            local nurseries.
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
                href="https://arboretum.ucdavis.edu/plant/Winnifred-Gilman-Cleveland-sage"
              >
                UC Davis Arboretum All Stars: (https://arboretum.ucdavis.edu)
              </Link>
            </Type>
            <Type>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                variant="body1"
                href="https://calscape.org/Salvia-clevelandii-'Winnifred-Gilman'-(Winnifred-Gilman-Cleveland-Sage)?srchcr=sc646565c122cdb"
              >
                CalScape (https://calscape.org)
              </Link>
            </Type>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}
