//cspell:ignore Merced usfs covid
import React, {useCallback} from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {
  Typography as Type,
  List,
  ListItem,
  ListItemText,
  ListItemProps
} from '@material-ui/core'
import Spacing from '@components/boxes/Spacing'
import MainPhone from '@components/links/MainPhone'
import CustomerServicesEmail from '@components/links/CustomerServicesEmail'
const useNgIFrame = process.env.NEXT_USE_NG_IFRAME === 'yes'

const COVID19FaqsPage = () => {
  const MoreInfoItem = useCallback(
    ({
      children,
      ...rest
    }: {
      children: React.ReactNode
    } & ListItemProps<'a', {button?: true}>) => {
      return (
        <ListItem
          component="a"
          button
          target="_blank"
          rel="noopener noreferrer"
          {...rest}
        >
          {children}
        </ListItem>
      )
    },
    []
  )
  const Main = useCallback(() => {
    return (
      <MainBox>
        <NarrowContainer>
          <PageTitle title="Water Supply & COVID-19 FAQs" subtitle="Newsroom" />
          <Type variant="h3" gutterBottom>
            Is my tap water safe to drink?
          </Type>
          <Type paragraph>
            Yes. The Environmental Protection Agency (EPA) recommends that
            Americans continue to use and drink tap water as usual. Further,
            EPA’s drinking water regulations require treatment at public water
            systems, which includes PCWA, to remove or kill pathogens, including
            viruses.
          </Type>
          <Spacing size="large" />
          <Type variant="h3" gutterBottom>
            Will PCWA water service be affected by COVID-19 response efforts?
          </Type>
          <Type paragraph>
            No. Deliveries of drinking water and canal water will not be
            impacted by PCWA’s response to COVID-19. While wait times may be
            longer than normal, Customer Services staff are still available to
            assist customers by phone <MainPhone /> or email (
            <CustomerServicesEmail />) between 8:00am and 5:00pm, Monday –
            Friday.
          </Type>
          <Spacing size="large" />
          <Type variant="h3" gutterBottom>
            What is PCWA doing to respond to the COVID-19 emergency?
          </Type>
          <Type paragraph>
            PCWA is modifying its operations in accordance with local health
            advisories. Our lobbies are currently closed to until further
            notice, and PCWA is implementing “social distancing” practices for
            staff. The health and of safety of staff and customers remains
            PCWA’s highest priority and the Agency will continue to modify
            operations in accordance with changing circumstances.
          </Type>
          <Spacing size="large" />
          <Type variant="h3" gutterBottom>
            I’m experiencing a hardship due to the economic downturn. What if
            I’m having trouble paying my bill?
          </Type>
          <Type paragraph>
            If you are having trouble paying your water bill, please contact
            Customer Services.
          </Type>
          <Spacing size="large" />
          <Type variant="h3" gutterBottom>
            Where can I get more information?
          </Type>
          <Type>
            The Centers for Disease Control (CDC) and Environmental Protection
            Agency (EPA) have more information.
          </Type>
          <List>
            <MoreInfoItem href="https://www.cdc.gov/coronavirus/2019-ncov/php/water.html">
              <ListItemText
                primary="CDC: https://www.cdc.gov/coronavirus/2019-ncov/php/water.html"
                primaryTypographyProps={{
                  color: 'primary'
                }}
              />
            </MoreInfoItem>
            <MoreInfoItem href="https://www.epa.gov/coronavirus/coronavirus-and-drinking-water-and-wastewater#tapwater">
              <ListItemText
                primary="EPA: https://www.epa.gov/coronavirus/coronavirus-and-drinking-water-and-wastewater#tapwater"
                primaryTypographyProps={{
                  color: 'primary'
                }}
              />
            </MoreInfoItem>
          </List>
        </NarrowContainer>
      </MainBox>
    )
  }, [])

  return useNgIFrame ? (
    <Main />
  ) : (
    <PageLayout title="COVID-19 FAQs" waterSurface>
      <Main />
    </PageLayout>
  )
}

export default COVID19FaqsPage
