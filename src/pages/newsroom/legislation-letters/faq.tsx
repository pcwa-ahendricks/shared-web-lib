// cspell:ignore Hertzberg
import React, {useCallback} from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import Spacing from '@components/boxes/Spacing'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {
  Typography as Type,
  Paper,
  Box,
  TypographyProps,
  makeStyles,
  createStyles,
  Theme,
  PaperProps,
  BoxProps
} from '@material-ui/core'
import {FormatQuoteRounded} from '@material-ui/icons'
import clsx from 'clsx'
import MainPhone from '@components/links/MainPhone'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    questionCloseIcon: {
      paddingLeft: theme.spacing(1)
    },
    questionOpenIcon: {
      marginRight: 2, // Fine tune spacing
      marginLeft: theme.spacing(-2), // Shift question heading to the back (left) a bit
      paddingRight: theme.spacing(1),
      transform: 'scaleX(-1)'
    },
    question: {
      fontStyle: 'italic',
      padding: theme.spacing(1)
    }
  })
)

type FaqProps = {
  paperProps?: PaperProps
  boxProps?: BoxProps
  body: React.ReactNode | string
  question: React.ReactNode | string
}

export default function LegislationAndLettersPage() {
  const classes = useStyles()

  const Faq = useCallback(
    ({paperProps, boxProps, body, question}: FaqProps) => (
      <Paper {...paperProps}>
        <Box p={2} {...boxProps}>
          <Type variant="h4" gutterBottom classes={{root: classes.question}}>
            <FormatQuoteRounded
              color="disabled"
              classes={{
                root: clsx([classes.questionOpenIcon])
              }}
            />
            {question}
            <FormatQuoteRounded
              color="disabled"
              classes={{
                root: clsx([classes.questionCloseIcon])
              }}
            />
          </Type>
          <Spacing size="small" />
          <Type paragraph>{body}</Type>
        </Box>
      </Paper>
    ),
    [classes]
  )

  const BodyParagraph = useCallback(
    ({children, ...props}: TypographyProps) => (
      <Type paragraph variant="inherit" color="inherit" {...props}>
        {children}
      </Type>
    ),
    []
  )

  return (
    <PageLayout title="Water Legislation FAQs" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle title="Water Legislation FAQs" subtitle="Newsroom" />
          <Spacing />
          <Type paragraph>
            On May 31, 2018 Gov. Jerry Brown enacted into law two new bills that
            require urban water providers throughout California to set new
            permanent water use targets for their service areas by 2022. Senate
            Bill 606 (Hertzberg) and Assembly Bill 1668 (Friedman) provide a
            framework for setting water use targets, as well as implementing and
            enforcing the new water use requirements.
          </Type>
          <Type paragraph>
            Many of the specifics have yet to be developed, and will take years
            to implement. Below are some Frequently Asked Questions:
          </Type>

          <Spacing />
          <Faq
            question="How does the new law impact customers?"
            body={`There are no immediate impacts to customers. Over the next several years, specific water use targets will be established for each water provider’s overall service area based upon the standards outlined in the law. The water use targets must be established by 2022 and
            implemented in 2023. PCWA will continue to work with individual households and businesses to increase their water efficiency through rebates and education, like our water-wise program.`}
          />
          <Spacing size="large" />
          <Faq
            question="I heard it is now illegal to take a shower and wash clothes on the same day, is this true?"
            body={
              <>
                <BodyParagraph>
                  No. There is nothing in the law that specifies when or how
                  often a person may shower, do laundry, or use water for any
                  other purpose. The law does set an indoor residential standard
                  of 55 gallons per capita per day (GPCD) starting in 2023,
                  dropping to 50 GPCD by 2030; however, this amount applies to
                  the aggregate water use of PCWA’s entire water system.
                </BodyParagraph>
                <BodyParagraph>
                  The amount of water that a clothes water uses can vary widely,
                  and if you own an old one your home could easily go well over
                  the new state residential standard on laundry day. Older
                  washers use 29 to 45 gallons per load; most high-efficiency
                  washers use 15 to 30 gallons per load; and, the most efficient
                  washers use less than 5 gallons per load. Encouraging
                  customers to replace old machines as they wear out with
                  high-efficiency models will be one of the best ways for PCWA
                  to meet this new standard.
                </BodyParagraph>
              </>
            }
          />
          <Spacing size="large" />
          <Faq
            question="Will water providers be monitoring and evaluating individual water
            use as part of the new law?"
            body={
              <>
                <BodyParagraph>
                  There is no requirement in the new law that individual
                  households must meet a specific target. The new law provides a
                  framework for setting targets, but those will be applied on a
                  system-wide basis. Each water purveyor will determine the best
                  way to meet the target. PCWA encourages its customers to
                  continue using water efficiently and understands that water
                  savings are best achieved through customer education and
                  awareness.
                </BodyParagraph>
                <BodyParagraph>
                  PCWA will remain engaged, in an attempt to protect the
                  reasonable and efficient use of water by our customers, as the
                  state develops regulations to implement the new law. The
                  outcome of those negotiations will determine how aggressive
                  PCWA must be with its highest water use customers in order to
                  comply.
                </BodyParagraph>
              </>
            }
          />
          <Spacing size="large" />
          <Faq
            question="Will individual residents and businesses be fined for not meeting
            water use targets?"
            body={
              <>
                <BodyParagraph>
                  For several years, the law has allowed local water purveyors
                  to fine individual customers up to $500 per day for certain
                  defined unreasonable water use practices. To date, PCWA has
                  not fined any of its customers. When we find or get a report
                  of wasteful water use we work with the customer to identify
                  solutions to meet legitimate needs but avoid wasting water. We
                  intend to continue this approach of cooperative education with
                  our customers in order to reach compliance with these new
                  state mandates.
                </BodyParagraph>
                <BodyParagraph>
                  Fines established by this new law apply solely to water
                  purveyors (up to $1,000 per day for failure to meet water use
                  targets).
                </BodyParagraph>
              </>
            }
          />
          <Spacing size="large" />
          <Faq
            question="Why did PCWA oppose the legislation?"
            body={
              <>
                <BodyParagraph>
                  PCWA opposed to the legislation, on principle, because we do
                  not have a water supply problem in our service area. However,
                  because the majority of Californians live in the south part of
                  the state, where limited water supplies have made aggressive
                  conservation necessary for more than 20 years, the Governor
                  and the Legislature made it the rule for everyone, regardless
                  of local water supply conditions.
                </BodyParagraph>
                <BodyParagraph>
                  Also, it is worth noting that this measure does very little to
                  solve any real problems. 50% of the developed surface water
                  supply in California is already dedicated to the environment;
                  40% goes to agriculture; and, all urban demands combined use
                  only 10%. More specifically, northern California urban demands
                  use only 2-3% of the available surface water. This means
                  conserving an extra 15%, throughout all of northern
                  Californian’s urban areas, yields a net increase of only about
                  0.5% in the overall statewide water supply. This law was more
                  about the enforcement of correct thinking, rather than problem
                  solving.
                </BodyParagraph>
              </>
            }
          />
          <Spacing size="large" />
          <Faq
            question="What’s the Bottom Line?"
            body={`Water is precious and should never be wasted. Our customers
                  have made great strides to become more efficient with their
                  water use over the past 10 years. We expect that reasonable
                  people will win out in the final regulations and that PCWA’s
                  water system will be able to comply with the continued help
                  and cooperation of our customers. PCWA will continue to defend
                  our customer’s right to all of the water they need, so long as
                  the use is efficient and beneficial.`}
          />

          <Spacing size="x-large">
            <Type paragraph variant="body2">
              For any other questions, please contact PCWA Customer Services at{' '}
              <MainPhone />
            </Type>
          </Spacing>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}
