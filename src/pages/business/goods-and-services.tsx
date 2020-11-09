// cspell:ignore frameborder publicpurchase accountspayable
import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {
  Typography as Type,
  Divider,
  Link,
  createStyles,
  TypographyProps,
  makeStyles
} from '@material-ui/core'
import Spacing from '@components/boxes/Spacing'
import OpenInNewLink from '@components/OpenInNewLink/OpenInNewLink'
import PurchasingEmail from '@components/links/PurchasingEmail'
import AccountsPayableEmail from '@components/links/AccountsPayableEmail'
import PublicPurchaseIframe from '@components/PublicPurchaseIframe/PublicPurchaseIframe'

const useStyles = makeStyles(() =>
  createStyles({
    leakItem: {
      listStyleType: 'none',
      marginBottom: 10
    }
  })
)

const GoodsAndServicesPage = () => {
  const classes = useStyles()

  const RegStepItem = ({children, ...rest}: TypographyProps<'li'>) => {
    return (
      <Type component="li" className={classes.leakItem} {...rest}>
        {children}
      </Type>
    )
  }

  return (
    <PageLayout title="Goods and Services" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle title="Goods and Services" subtitle="Business with PCWA" />
          <Type paragraph>
            Thank you for your interest in doing business with Placer County
            Water Agency (PCWA). This guide should assist potential vendors in
            understanding PCWA’s procurement process.
          </Type>
          <Spacing />
          <PublicPurchaseIframe />

          <Spacing />
          <OpenInNewLink
            href="https://www.publicsurplus.com/sms/pcwa,ca/list/current?orgid=86896"
            variant="h5"
            noWrap={false}
          >
            Click Here to see PCWA Public Surplus auctions
          </OpenInNewLink>
          <Spacing size="x-large">
            <Divider />
          </Spacing>
          <Type variant="h3" gutterBottom color="primary">
            How to do Business with PCWA
          </Type>
          <Spacing />
          <Type variant="h4" gutterBottom>
            Register to Become a Vendor
          </Type>
          <Type paragraph>
            PCWA welcomes new vendors and encourages full participation to
            ensure open and fair competition. PCWA utilizes an online
            eProcurement system to manage bids and request for proposals called
            Public Purchase. Register with Public Purchase if you want to do
            business with PCWA.
          </Type>
          <OpenInNewLink
            href="https://www.publicpurchase.com/gems/register/vendor/register?actionbtn=Register"
            variant="body1"
          >
            Register with Public Purchase Here
          </OpenInNewLink>

          <Spacing />
          <Type variant="h4" gutterBottom>
            Why Register?
          </Type>
          <Type paragraph>
            By registering with Public Purchase, you will automatically be
            notified when bid opportunities become available. As a registered
            user you will have access to all documentation, information and will
            have the ability to respond to bids electronically.
          </Type>
          <Spacing />
          <Type variant="h4" gutterBottom>
            How to Register
          </Type>
          <Type paragraph>Registration is a two-step Process.</Type>
          <ul>
            <RegStepItem>
              <strong>Step One:</strong> Create an account for your organization
              with Public Purchase. If you are already registered to use Public
              Purchase, proceed to Step Two.
            </RegStepItem>
            <RegStepItem>
              <strong>Step Two:</strong> Link your Public Purchase account to
              the Placer County Water Agency. Please note that it is important
              to complete this second step of the registration or you will not
              receive notifications of upcoming bid opportunities from the
              Placer County Water Agency.
            </RegStepItem>
            <RegStepItem>
              <strong>Confirming Email:</strong> When your registration with
              Public Purchase is activated, you will receive a confirmation
              email from Public Purchase. Using the link provided in the email,
              accept the terms and conditions of use and log in using your
              username and password, then click on the <em>"Tools"</em> tab.
              Type in <em>"Placer County Water Agency"</em> and click on search.
              Then click <em>"Register with Agency"</em> located on the right
              hand side of the Placer County Water Agency logo.
            </RegStepItem>
          </ul>
          <Spacing />
          <Type variant="h4" gutterBottom>
            Problems Registering?
          </Type>
          <Type paragraph>
            If you have any problems with this process please contact Public
            Purchase at{' '}
            <Link href="mailto:support@publicpurchase.com">
              support@publicpurchase.com
            </Link>
          </Type>
          <Spacing size="large" />
          <article>
            <Type variant="h3" gutterBottom color="primary">
              Additional Information
            </Type>
            <Type variant="h4" gutterBottom>
              Purchase Order Terms and Conditions
            </Type>
            <Type paragraph>
              PCWA has standard Purchase Order Terms and Conditions that apply
              to transactions that do not have a written agreement, duly
              executed by both parties. Use the provided link to review these
              terms and conditions.
            </Type>
            <OpenInNewLink
              pdf
              href="https://cdn.cosmicjs.com/f57a9a30-034d-11eb-9528-f5a6da2be217-Purchase-Order-Terms-and-Conditions.pdf"
              variant="body1"
            >
              Purchase Order Terms and Conditions
            </OpenInNewLink>
            <Type variant="h4" gutterBottom>
              Payment Terms
            </Type>
            <Type paragraph>
              PCWA’s payment terms are net 30 days from the date PCWA accepts
              the service/product in accordance with the terms and conditions
              set forth in the purchase order. To facilitate prompt payment,
              invoices should include the purchase order number, order date,
              PCWA personnel contact, delivery address, applicable discounts,
              and any other special order information.
            </Type>
            <Type variant="h4" gutterBottom>
              EFT Payments
            </Type>
            <Type paragraph>
              PCWA offers Electronic Funds Transfer (direct deposit) payments to
              vendors. To request an application contact{' '}
              <AccountsPayableEmail />.
            </Type>
            <Type variant="h4" gutterBottom>
              Delivery and Inspections
            </Type>
            <Type paragraph>
              PCWA has many locations and deliveries are typically FOB
              Destination, inside delivery. Inspection and acceptance for
              products and services are subject to PCWA’s terms and conditions.
              Failure to deliver, or delivery of nonconforming goods and/or
              services, may be cause for cancellation, postponed payment, or
              appropriate remedies agreed to or otherwise allowed by law.
            </Type>
            <Type variant="h4" gutterBottom>
              Insurance, Bonding & Licenses
            </Type>
            <Type paragraph>
              In conducting business with PCWA it is important to be mindful of
              insurance, bonding, and licensing requirements.
            </Type>
            <Type paragraph>
              PCWA is a public entity that must adhere to specific government
              codes and regulations. It is prudent for vendors to become
              familiar with the regulations and requirements incurred while
              doing business with a government entity including, but not limited
              to, prevailing wage laws, complying with sealed bidding procedures
              and consenting to non-collusion agreements.
            </Type>
            <Type paragraph>
              Vendors will be required to satisfy all current legal requirements
              applicable to the scope of work, including and without limitation
              to other requirements, compliance with the Title VI of the Civil
              Rights Act of 1964, the California Labor code Section 1735
              provision barring discrimination, the Copeland (Anti-kickback)
              Act, the Contract Work Hours and Safety Standards Act, the State
              Apprenticeship Requirements in the California Labor Code Section
              1777.5, and the California Department of Industrial Relations
              requirements to register with, pay prevailing wages, and to
              maintain and furnish weekly certified payrolls.
            </Type>
            <Type paragraph>
              Further, to be considered a responsible vendor, current licensure
              must be maintained in accordance with the California Contractors
              State Licensing Board or appropriate professional certifying
              authority for the services requested. Before award of a bid,
              licenses, references and experience will be queried, verified, and
              substantiated as part of the determination of responsibility.
            </Type>
            <Type variant="h4" gutterBottom>
              Typical Insurance Requirements for Purchases of Good and/or
              Services
            </Type>
            <Type paragraph>
              PCWA utilizes a third-party insurance compliance service to
              collect and verify that all insurance requirements are met. No
              work will be performed by any vendor on PCWA property prior to
              100% compliance with the insurance requirements. The information
              listed below are the typical requirements. Best rating of A-7 or
              better.
            </Type>
            <Type paragraph>
              <strong>Commercial General Liability*</strong> - Not less than
              $2,000,000 combined single limit per occurrence coverage for
              bodily and personal injury and property.
            </Type>
            <Type paragraph>
              <strong>Automobile Liability* </strong> - Not less than $1,000,000
              per occurrence, all vehicles.
            </Type>
            <Type paragraph>
              <strong>Workers’ Compensation and Employers Liability </strong> -
              Type and amount in strict compliance with State and Federal
              statuses, with employer’s liability limits to be not less than
              $1,000,000 per accident.
            </Type>
            <Type paragraph variant="body2">
              <strong>
                * Additional Insured endorsement language for GL and Auto
                required
              </strong>
              : Placer County Water Agency, its officials, officers, employees
              and designated volunteers are covered as additional insureds with
              respect to the vendor’s Commercial General Liability and Auto
              Liability insurance policies.
            </Type>
            <Type variant="h4" gutterBottom>
              Questions?
            </Type>
            <Type paragraph>
              For all goods and services related questions, please contact the
              PCWA Procurement Division at <PurchasingEmail />.
            </Type>
          </article>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default GoodsAndServicesPage
