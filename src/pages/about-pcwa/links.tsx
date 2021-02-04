// cspell:ignore MCWRA CUWCC rcrc
import React from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import NarrowContainer from '@components/containers/NarrowContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {
  List,
  Typography as Type,
  Box,
  Link,
  ListItem,
  ListItemText,
  ListSubheader,
  createStyles,
  makeStyles,
  ListItemProps,
  Divider
  // Theme
} from '@material-ui/core'
import {ChildBox, RowBox} from 'mui-sleazebox'
import LazyImgix from '@components/LazyImgix/LazyImgix'

const useStyles = makeStyles(() =>
  createStyles({
    listItemText: {
      margin: 0
    }
  })
)

const LinksPage = () => {
  const classes = useStyles()

  // const ExtLink = ({children, ...rest}: LinkProps) => {
  //   return (
  //     <Link {...rest} target="_blank" rel="noopener noreferrer">
  //       {children}
  //     </Link>
  //   )
  // }

  const ExtLinkListItem = ({
    children,
    href,
    ...rest
  }: ListItemProps<'a', {button?: true}>) => {
    return (
      <ListItem
        button
        component="a"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {/* <ExtLink >{children}</ExtLink> */}
        <ListItemText
          primary={children}
          classes={{root: classes.listItemText}}
        />
        {/* {children} */}
      </ListItem>
    )
  }

  return (
    <PageLayout title="Links" waterSurface>
      <MainBox>
        <NarrowContainer>
          <PageTitle title="Links" subtitle="General" />
          <RowBox responsive flexSpacing={4}>
            <ChildBox
              flex="auto"
              m={{xs: 'auto', sm: 0}} // Center image in small layouts.
              ml={{xs: 'auto', sm: 0}} // xs: auto will center image in small layouts.
              maxWidth={{xs: '60vw', sm: 'inherit'}} // Don't let portrait image get too big in small layouts.
            >
              <LazyImgix
                src="https://cosmicjs.imgix.net/fda930b0-6b32-11e7-b4b0-738ba83d40d7-links.jpg"
                htmlAttributes={{
                  alt: 'Photo of Duncan Creek'
                }}
              />
            </ChildBox>
            <ChildBox flex={{xs: '100%', sm: '50%'}}>
              <Type paragraph>
                Partnering with many local, regional, state and national
                associations, PCWA contributes to the communities it serves in a
                variety of ways, such as sponsoring educational programs, rebate
                programs, in-home or business water efficiency surveys and
                providing outstanding leadership and stewardship of the County’s
                water resources.
              </Type>
              <Box mt={6}>
                <Type variant="h4" gutterBottom>
                  To Report Environmental Crimes
                </Type>
                <Type paragraph>
                  Please Contact Jane Crew <br />
                  Placer County DA Environmental
                  <br />
                  (916) 543-8021 <br />
                  <Link
                    href="https://www.placer.ca.gov/3331/Consumer-Fraud-Environmental-Crimes-Unit"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Consumer Fraud and Environmental Crimes Unit
                  </Link>
                </Type>
              </Box>
            </ChildBox>
          </RowBox>
          <Box mt={3}>
            <RowBox justifyContent="space-between">
              <ChildBox flex="1 1 45%">
                <Box mt={4}>
                  <List
                    disablePadding
                    aria-labelledby="placer-county-subheader"
                    subheader={
                      <ListSubheader component="div">
                        <Type
                          color="textPrimary"
                          variant="subtitle1"
                          gutterBottom
                          id="placer-county-subheader"
                        >
                          Placer County
                        </Type>
                        <Divider style={{width: '90%'}} />
                      </ListSubheader>
                    }
                  >
                    <ExtLinkListItem href="http://www.auburnchamber.net/">
                      Auburn Chamber of Commerce
                    </ExtLinkListItem>
                    <ExtLinkListItem href="http://www.auburn.ca.gov/">
                      City of Auburn
                    </ExtLinkListItem>
                    <ExtLinkListItem href="http://www.colfax-ca.gov/">
                      City of Colfax
                    </ExtLinkListItem>
                    <ExtLinkListItem href="http://www.ci.lincoln.ca.us/">
                      City of Lincoln
                    </ExtLinkListItem>
                    <ExtLinkListItem href="http://www.rocklin.ca.gov/">
                      City of Rocklin
                    </ExtLinkListItem>
                    <ExtLinkListItem href="http://www.roseville.ca.us/">
                      City of Roseville
                    </ExtLinkListItem>
                    <ExtLinkListItem href="http://www.colfaxarea.com/">
                      Colfax Area Chamber of Commerce
                    </ExtLinkListItem>
                    <ExtLinkListItem href="http://www.placer.ca.gov/">
                      County of Placer
                    </ExtLinkListItem>
                    <ExtLinkListItem href="http://foresthillchamber.org/">
                      Foresthill Divide Chamber of Commerce
                    </ExtLinkListItem>
                    <ExtLinkListItem href="http://lincolnchamber.com/">
                      Lincoln Area Chamber of Commerce
                    </ExtLinkListItem>
                    <ExtLinkListItem href="http://loomischamber.com/">
                      Loomis Basin Chamber of Commerce
                    </ExtLinkListItem>
                    <ExtLinkListItem href="http://www.placercfb.com/">
                      Placer County Farm Bureau
                    </ExtLinkListItem>
                    <ExtLinkListItem href="http://www.placergrown.org/">
                      Placer GROWN
                    </ExtLinkListItem>
                    <ExtLinkListItem href="http://www.placerlandtrust.org/">
                      Placer Land Trust
                    </ExtLinkListItem>
                    <ExtLinkListItem href="http://www.rocklinchamber.com/">
                      Rocklin Area Chamber of Commerce
                    </ExtLinkListItem>
                    <ExtLinkListItem href="http://www.rosevillechamber.com/Index.asp?page=1">
                      Roseville Chamber of Commerce
                    </ExtLinkListItem>
                    <ExtLinkListItem href="http://metrochamber.org/">
                      Sacramento Metropolitan Chamber of Commerce
                    </ExtLinkListItem>
                    <ExtLinkListItem href="http://www.sacriver.org/">
                      Sacramento River Watershed Program
                    </ExtLinkListItem>
                    <ExtLinkListItem href="http://www.loomis.ca.gov/">
                      Town of Loomis
                    </ExtLinkListItem>
                  </List>
                </Box>
                <Box mt={4}>
                  <List
                    disablePadding
                    aria-labelledby="how-to-save-water-subheader"
                    subheader={
                      <ListSubheader component="div">
                        <Type
                          color="textPrimary"
                          variant="subtitle1"
                          gutterBottom
                          id="how-to-save-water-subheader"
                        >
                          How to Save Water
                        </Type>
                        <Divider style={{width: '90%'}} />
                      </ListSubheader>
                    }
                  >
                    <ExtLinkListItem href="http://bewatersmart.info/">
                      Be Water Smart
                    </ExtLinkListItem>
                    <ExtLinkListItem href="http://www.h2ouse.org/">
                      California Urban Water Conservation Council (CUWCC)
                    </ExtLinkListItem>
                    <ExtLinkListItem href="http://www.healthyauburnwaters.org/">
                      Healthy Auburn Waters
                    </ExtLinkListItem>
                    <ExtLinkListItem href="http://saveourwater.com/">
                      Save Our Water
                    </ExtLinkListItem>
                    <ExtLinkListItem href="http://www.improvenet.com/a/water-conservation-at-home">
                      Water Conservation At Home
                    </ExtLinkListItem>
                    <ExtLinkListItem href="http://www.watereducation.org/">
                      Water Education Foundation
                    </ExtLinkListItem>
                    <ExtLinkListItem href="http://www.waterwiser.org/">
                      Water Wiser
                    </ExtLinkListItem>
                  </List>
                </Box>
                <Box mt={4}>
                  <List
                    disablePadding
                    aria-labelledby="recreational-subheader"
                    subheader={
                      <ListSubheader component="div">
                        <Type
                          color="textPrimary"
                          variant="subtitle1"
                          gutterBottom
                          id="recreational-subheader"
                        >
                          Recreational
                        </Type>
                        <Divider style={{width: '90%'}} />
                      </ListSubheader>
                    }
                  >
                    <ExtLinkListItem href="https://www.theamericanriver.com">
                      The American River
                    </ExtLinkListItem>
                  </List>
                </Box>
              </ChildBox>
              <ChildBox flex="1 1 45%">
                <Box mt={4}>
                  <List
                    disablePadding
                    aria-labelledby="water-districts-subheader"
                    subheader={
                      <ListSubheader component="div">
                        <Type
                          color="textPrimary"
                          variant="subtitle1"
                          gutterBottom
                          id="water-districts-subheader"
                        >
                          Water Districts
                        </Type>
                        <Divider style={{width: '90%'}} />
                      </ListSubheader>
                    }
                  >
                    <ExtLinkListItem href="https://nidwater.com">
                      Nevada Irrigation District (NID)
                    </ExtLinkListItem>
                    <ExtLinkListItem href="https://sswd.org">
                      Sacramento Suburban Water District
                    </ExtLinkListItem>
                    <ExtLinkListItem href="https://www.sjwd.org">
                      San Juan Water District
                    </ExtLinkListItem>
                  </List>
                </Box>
                <Box mt={4}>
                  <List
                    disablePadding
                    aria-labelledby="regional-subheader"
                    subheader={
                      <ListSubheader component="div">
                        <Type
                          color="textPrimary"
                          variant="subtitle1"
                          gutterBottom
                          id="regional-subheader"
                        >
                          Regional
                        </Type>
                        <Divider style={{width: '90%'}} />
                      </ListSubheader>
                    }
                  >
                    <ExtLinkListItem href="https://www.mountaincountieswater.com">
                      Mountain Counties Water Resources Association (MCWRA)
                    </ExtLinkListItem>
                    <ExtLinkListItem href="https://www.norcalwater.org">
                      Northern California Water Association (NCWA)
                    </ExtLinkListItem>
                    <ExtLinkListItem href="https://rwah2o.org">
                      Regional Water Authority (RWA)
                    </ExtLinkListItem>
                    <ExtLinkListItem href="https://www.rcrcnet.org">
                      Rural County Representative of California (RCRC)
                    </ExtLinkListItem>
                    <ExtLinkListItem href="https://www.waterforum.org">
                      Water Forum
                    </ExtLinkListItem>
                    <ExtLinkListItem href="https://westplacergroundwater.com">
                      West Placer Groundwater Sustainability Agency
                    </ExtLinkListItem>
                  </List>
                </Box>
                <Box mt={4}>
                  <List
                    disablePadding
                    aria-labelledby="state-subheader"
                    subheader={
                      <ListSubheader component="div">
                        <Type
                          color="textPrimary"
                          variant="subtitle1"
                          gutterBottom
                          id="state-subheader"
                        >
                          State
                        </Type>
                        <Divider style={{width: '90%'}} />
                      </ListSubheader>
                    }
                  >
                    <ExtLinkListItem href="http://www.acwa.com/">
                      Association of California Water Agencies (ACWA)
                    </ExtLinkListItem>
                    <ExtLinkListItem href="https://water.ca.gov/">
                      California Department of Water Resources
                    </ExtLinkListItem>
                    <ExtLinkListItem href="https://www.cmua.org/">
                      California Municipal Utilities Association (CMUA)
                    </ExtLinkListItem>
                    <ExtLinkListItem href="https://www.csda.net">
                      California Special Districts Association (CSDA)
                    </ExtLinkListItem>
                    <ExtLinkListItem href="https://calwep.org/">
                      California Water Efficiency Partnership (formerly the
                      California Urban Water Conservation Council)
                    </ExtLinkListItem>
                    <ExtLinkListItem href="http://www.ca.gov">
                      State of California
                    </ExtLinkListItem>
                  </List>
                </Box>
                <Box mt={4}>
                  <List
                    disablePadding
                    aria-labelledby="national-subheader"
                    subheader={
                      <ListSubheader component="div">
                        <Type
                          color="textPrimary"
                          variant="subtitle1"
                          gutterBottom
                          id="national-subheader"
                        >
                          National
                        </Type>
                        <Divider style={{width: '90%'}} />
                      </ListSubheader>
                    }
                  >
                    <ExtLinkListItem href="https://www.publicpower.org">
                      American Public Power Association (APPA)
                    </ExtLinkListItem>
                    <ExtLinkListItem href="https://www.awwa.org">
                      American Water Works Association (AWWA)
                    </ExtLinkListItem>
                    <ExtLinkListItem href="https://www.hydro.org">
                      National Hydropower Association (NHA)
                    </ExtLinkListItem>
                    <ExtLinkListItem href="https://www.nwppa.org">
                      Northwest Public Power Association (NWPPA)
                    </ExtLinkListItem>
                    <ExtLinkListItem href="http://www.nwra.org">
                      National Water Resources Association (NWRA)
                    </ExtLinkListItem>
                    <ExtLinkListItem href="https://www.usbr.gov">
                      U.S. Bureau of Reclamation
                    </ExtLinkListItem>
                    <ExtLinkListItem href="https://www.fs.fed.us">
                      U.S. Forest Service
                    </ExtLinkListItem>
                    <ExtLinkListItem href="https://www.countyoffice.org">
                      County Office
                    </ExtLinkListItem>
                  </List>
                </Box>
              </ChildBox>
            </RowBox>
          </Box>
        </NarrowContainer>
      </MainBox>
    </PageLayout>
  )
}

export default LinksPage
