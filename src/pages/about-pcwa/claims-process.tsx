import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {Typography as Type, Box} from '@material-ui/core'
import Spacing from '@components/boxes/Spacing'
import MainPhone from '@components/links/MainPhone'
export default function BasicTemplatePage() {
  return (
    <PageLayout title="Claims Process" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle title="Claims Process" subtitle="Risk Management" />
          <Type paragraph>
            Risk Management is responsible for investigating and settling all
            liability claims against the Agency. The information below will help
            you if you believe you have experienced one of the following:
          </Type>
          <Box component="ul">
            <Type component="li">
              Property damage resulting from a leak from PCWA infrastructure or
              from certain PCWA work or construction activities.
            </Type>
            <Type component="li">
              A motor vehicle accident involving a PCWA vehicle or equipment.
            </Type>
            <Type component="li">
              Bodily injury you believe was caused by PCWA.
            </Type>
          </Box>
          <Type paragraph>
            <strong>
              Please note that the person making a claim and/or the owner has a
              duty to mitigate their damages. It is the owner’s responsibility
              to keep damages from getting any worse than they already are (for
              example, removing your personal belongings from an area
              experiencing a water intrusion).
            </strong>
          </Type>
          <Spacing />
          <Type variant="h3" gutterBottom>
            Determining if a Claim Exists
          </Type>
          <Type paragraph>
            PCWA is not responsible for damages related to failure of the
            property owner’s plumbing, service interruption caused by
            maintenance and repair of PCWA’s system, or changes to water
            pressure caused by PCWA.
          </Type>
          <Spacing />
          <Type variant="h3" gutterBottom>
            Time Limits for Filing a Claim
          </Type>
          <Type paragraph>
            Submit your claim as soon as possible. The California Tort Claims
            Act puts forth strict timelines that you must follow when filing a
            claim against PCWA.
          </Type>
          <Box component="ul">
            <Type component="li">
              You have 12 months after an occurrence to file a claim for damage
              to “real property”, meaning your home, land, and fixed property.
            </Type>
            <Type component="li">
              You have 6 months after an occurrence to file a claim for personal
              injury, death, or loss or damage to personal property.
            </Type>
          </Box>
          <Type paragraph>
            Claims received after these deadlines will be rejected. PCWA has 45
            days to respond after you file your claim.
          </Type>
          <Spacing />
          <Type variant="h3" gutterBottom>
            Submitting a Claim
          </Type>
          <Type paragraph>
            While you can submit your claim and all supporting documentation
            directly to PCWA, submitting your claim to your insurance company
            may result in reimbursement for the loss without an investigation.
            Depending on your policy, your insurer may pay the replacement value
            for damaged items. Afterwards, your insurer and PCWA can determine
            responsibility for the damages and agree on an amount due from PCWA,
            if any.
          </Type>
          <Spacing />
          <Type variant="h3" gutterBottom>
            Filing a Claim Directly With PCWA
          </Type>
          <Type>
            Call PCWA at <MainPhone /> Monday-Friday during business hours to
            discuss your loss and request a claim form.
          </Type>
          <Spacing />
          <Type variant="h3" gutterBottom>
            Information Required to File a Claim
          </Type>
          <Type paragraph>
            Your claim form will need to include as much of the following
            information as possible, including:
          </Type>
          <Box component="ul">
            <Type component="li">
              Name of the person filing the claim, address, phone number, email
              address (if available) and date of birth (for all bodily injury
              claims, motor vehicle accidents and/or any claim involving a
              minor).
            </Type>
            <Type component="li">
              Date, time, place, and circumstances of the incident/claim.
            </Type>
            <Type component="li">
              General description of the incident/claim, injury, damage, or loss
              as it may be known at the time of the submission of the claim.
            </Type>
            <Type component="li">
              Known or estimated amount of the claim. For example, how much
              money did the repair cost?
            </Type>
            <Type component="li">
              Name(s) of PCWA employee(s) involved in the incident, if known or
              applicable.
            </Type>
            <Type component="li">
              Witness(es) name, address, and phone number.
            </Type>
            <Type component="li">
              Signature of the Claimant or by some person on their behalf.
            </Type>
            <Type component="li">
              Copies of the invoices, receipts, or bid estimates to substantiate
              the costs you are claiming.
            </Type>
          </Box>
          <Type paragraph>
            Additional examples of information needed to substantiate your claim
            (depending on the type of a claim) includes the following:
          </Type>
          <Box component="ul">
            <Type component="li">
              Property damage claim: Purchase records, photographs of the damage
              to the item(s).
            </Type>
            <Type component="li">
              Auto claim: Proof of registration, detailed estimate, photographs
              of the damage to the vehicle.
            </Type>
            <Type component="li">
              Personal injury claim: Copy of medical records and receipts.
            </Type>
            <Type component="li">
              Lost wages: The amount of time you were unable to work due to a
              claimed injury; verification of lost time from your employer and
              payroll stubs showing your hourly or daily pay rate.
            </Type>
            <Type component="li">
              Loss of business revenue: Tax records and/or bank statements,
              payroll records, revenue and expense statements and sales
              receipts.
            </Type>
          </Box>
          <Spacing />
          <Type variant="h3" gutterBottom>
            Payment for Reasonable Costs
          </Type>
          <Type paragraph>
            If liable, PCWA pays reasonable costs for repair but does not make
            repairs. You may choose any contractor or service professional of
            your choice; PCWA does not make referrals, recommendations, or
            provide endorsements. If you have trouble locating a qualified
            contractor, you can contact your insurer to request a list of
            locally preferred contractors or browse online directories such as
            the Diamond Certified List. Time spent pursuing your claim is not
            reimbursable.
          </Type>
          <Spacing />
          <Type variant="h3">Claim Review Process</Type>
          <Type paragraph>
            Once you have submitted your claim, Risk Management will start the
            claim review process based on the information you have provided.
            This process typically includes the following:
          </Type>
          <Box component="ul">
            <Type component="li">
              PCWA will determine if there is clear evidence of liability based
              on the information provided (e.g., reviewing records, interviewing
              employees, or witnesses, and completing a technical/expert
              evaluation).
            </Type>
            <Type component="li">
              If PCWA is liable, PCWA will determine the percentage of the
              damage or cost that is directly related to PCWA’s actions. The
              value of the damages or loss will be based on insurance industry
              standards, using actual cash value (depreciation applies).
            </Type>
          </Box>
          <Type paragraph>
            PCWA’s goal is to reach a decision on your claim promptly (typically
            within 90 days of receipt of all supporting documentation). However,
            complex claims (e.g., those requiring outside technical
            review/expertise) may take longer.
          </Type>
          <Spacing />
          <Type variant="h3">Rejected Claims</Type>
          <Type paragraph>
            All claims are fairly evaluated. If your claim is rejected, you will
            be notified by mail, and PCWA will attempt to contact you by
            telephone to explain the reason for the rejection.
          </Type>
          <Spacing />
          <Type variant="h3">Time Limits on Filing Court Action</Type>
          <Type paragraph>
            If PCWA rejects your claim in whole or in part, you have six months
            from the date the notification is mailed to file a lawsuit (see
            Government Code sections 913, 945.6(a)(2)).
          </Type>
          <Type paragraph>
            Note: Risk Management does not process complaints about employees,
            customer bill adjustments or emergency dispatchings.
          </Type>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}
