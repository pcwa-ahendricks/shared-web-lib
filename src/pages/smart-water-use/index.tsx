// cspell:ignore Eisley Normac watersavingplants
import React, {useState, useCallback} from 'react'
import {
  Typography as Type,
  Box,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  useMediaQuery,
  createStyles,
  makeStyles,
  useTheme,
  Theme
} from '@material-ui/core'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import WideContainer from '@components/containers/WideContainer'
import PageTitle from '@components/PageTitle/PageTitle'
import {
  RespRowBox,
  ChildBox,
  RowBox,
  ColumnBox
} from '@components/boxes/FlexBox'
import LazyImgix from '@components/LazyImgix/LazyImgix'
import Spacing from '@components/boxes/Spacing'
import MuiNextLink from '@components/NextLink/NextLink'
import SectionBox from '@components/boxes/SectionBox'
import FeedbackIcon from '@material-ui/icons/Feedback'
import BuildIcon from '@material-ui/icons/BuildOutlined'
import GaugeIcon from 'mdi-material-ui/Gauge'
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined'
import DripSystemIcon from '@material-ui/icons/AccountTreeOutlined'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import NextButton from '@components/NextButton/NextButton'
import WebsiteIcon from '@material-ui/icons/Language'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headingIcon: {
      paddingRight: theme.spacing(1)
    },
    expansionPanel: {
      backgroundColor: theme.palette.common.white
    },
    cardMedia: {
      height: 200
    }
  })
)

const SmartWaterUsePage = () => {
  const classes = useStyles()
  const theme = useTheme()
  const [expanded, setExpanded] = useState<string | false>(false)

  const handleChange = useCallback(
    (panel: string) => (
      _event: React.ChangeEvent<Record<string, unknown>>,
      isExpanded: boolean
    ) => {
      setExpanded(isExpanded ? panel : false)
    },
    []
  )

  const isSMDown = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <PageLayout title="Smart Water Use" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle title="Smart Water Use" />
          <RespRowBox flexSpacing={4}>
            <ChildBox flex="60%">
              <Type variant="h3" color="primary">
                Lay the Groundwork for Water Savings and Healthy Plants
              </Type>
              <Spacing />
              <Type paragraph>
                <strong>Get growing this fall:</strong> Fall is the ideal time
                to transform your yard into a beautiful low-water use landscape.
                The soil is still warm in fall, which helps encourage root
                growth, but the days are shorter and cooler, so your plants
                require less water than they do in the spring when temperatures
                are getting warmer.
              </Type>
              <Type paragraph>
                <strong>Upgrade your sprinkler system:</strong> Before you begin
                planting, review your sprinkler system to make sure it can
                properly water your new additions. Consider replacing older
                sprinklers with efficient rotator sprinklers for lawn, drip
                irrigation for plants and a WaterSense-labeled weather-based
                sprinkler timer to deliver just the right amount of water for
                healthy plants.
              </Type>
              <Type paragraph>
                <strong>Prepare your soil to soak in the rain:</strong> Add
                plenty of compost and amendments to the soil to increase the
                nutrients available to plants and help the soil retain water.
                Spread a couple of inches of compost over the planting area and
                then work it into the top 6 inches.
              </Type>
              <Type paragraph>
                <strong>Add low-water flowers and plants:</strong> Select
                low-water and native plants that are suited to our region,
                planting them together according to their water needs. There are
                hundreds of plants available that vary in color, texture, form
                and function.
              </Type>
              <Type paragraph>
                <strong>Finish off with a layer of mulch: </strong> Add a layer
                of mulch around new plants and trees. The mulch will help to
                moderate the soil temperature and add more nutrients to the soil
                as it breaks down. Remember to keep the mulch away from the base
                of your plants and trees.
              </Type>
            </ChildBox>
            <ChildBox flex="33.3%">
              <ColumnBox
                display="flex"
                flexDirection="column"
                alignItems="center"
                flexSpacing={4}
              >
                <ChildBox width={{xs: '70%', sm: '100%'}}>
                  <LazyImgix
                    src="https://cosmic-s3.imgix.net/b723a570-d80a-11e9-9893-0b20c17bb46f-Lay-the-Groundwork.JPG"
                    htmlAttributes={{
                      alt:
                        'Lay the ground work for water saving and healthy plants. Fall is a great time to add water-wise plants and upgrade your irrigation.'
                    }}
                  />
                </ChildBox>

                <ChildBox>
                  <Box
                    bgcolor={theme.palette.grey['100']}
                    p={2}
                    boxShadow={2}
                    color={theme.palette.grey['700']}
                  >
                    <Type variant="subtitle2" color="textPrimary">
                      Look for the label
                    </Type>
                    <Spacing size="x-small" />
                    <Type variant="body2" paragraph color="inherit">
                      Look for the WaterSense label when searching for new
                      irrigation equipment. WaterSense products are
                      independently certified to use less water and work as well
                      or better than regular models. Read more about WaterSense{' '}
                      <MuiNextLink href="/smart-water-use/watersense">
                        on our website by clicking here
                      </MuiNextLink>
                      .
                    </Type>
                    <ChildBox width={100} m="auto">
                      <LazyImgix
                        src="https://cosmic-s3.imgix.net/80a20d10-9909-11e9-b1da-a39cf63c183d-watersense-logo2x.png"
                        htmlAttributes={{
                          alt: 'WaterSense logo'
                        }}
                      />
                    </ChildBox>
                  </Box>
                </ChildBox>
              </ColumnBox>
            </ChildBox>
          </RespRowBox>
          <Spacing />
          <SectionBox>
            <Type paragraph>
              <strong>Rebates are available! </strong> PCWA offers rebates on
              efficient irrigation equipment and timers. Learn more{' '}
              <MuiNextLink href="/smart-water-use/rebate-programs">
                here by clicking this link
              </MuiNextLink>
              .
            </Type>
            <Type paragraph>
              A special "thank you" to our partners who are helping us spread
              the word about laying the groundwork for water savings and healthy
              plants!
            </Type>
            <Type paragraph>
              Anderson’s Sierra Pipe Company
              <br />
              Eisley Nursery
              <br />
              Green Acres Nursery & Supply
              <br />
              High Hand Nursery
              <br />
              Normac Irrigation
              <br />
              SiteOne Landscape Supply
              <br />
            </Type>
            <Type paragraph>
              You can find out more about them on our{' '}
              <MuiNextLink href="/stewardship/landscape-resources">
                Landscaping Resources page
              </MuiNextLink>
              .
            </Type>
          </SectionBox>
          <Spacing size="large" factor={2} />
          <SectionBox>
            <Type variant="h3" gutterBottom color="primary">
              Water Efficiency
            </Type>
            <RespRowBox flexSpacing={1} justifyContent="space-between">
              <ChildBox flex="0 1 60%">
                <Type paragraph>
                  We in Placer County are fortunate to be surrounded by
                  beautiful waterways and natural resources that make our
                  community unique. As stewards of these resources, we all have
                  a responsibility to do our part to use water efficiently and
                  to not waste water.
                </Type>
              </ChildBox>
              <ChildBox flex="0 1 30%">
                <Box
                  bgcolor={theme.palette.grey['100']}
                  p={2}
                  boxShadow={2}
                  color={theme.palette.grey['700']}
                >
                  <RowBox>
                    <ColumnBox justifyContent="center">
                      <FeedbackIcon
                        className={classes.headingIcon}
                        color="inherit"
                      />
                    </ColumnBox>
                    <Type variant="subtitle2" color="textPrimary">
                      Did you know…?
                    </Type>
                  </RowBox>
                  <Spacing size="x-small" />
                  <Type variant="body2" paragraph color="inherit">
                    Most household water use occurs outdoors, and that’s where
                    you can make the biggest difference in overall water use.
                  </Type>
                </Box>
              </ChildBox>
            </RespRowBox>
            <Spacing />
            <Box bgcolor={theme.palette.common.white} p={3} boxShadow={1}>
              <Type variant="h4" gutterBottom>
                Rethink Your Yard
              </Type>
              <Type paragraph>
                For many people, the drought gave them an opportunity to rethink
                the way they view and use their landscape and to consider
                whether it’s time for a change.
              </Type>
              <Type paragraph>
                For example, if the only time you walk on your lawn is to mow
                it, maybe you’d be better served by exchanging your lawn for a
                beautiful, low-water use garden or low-water lawn alternative.
              </Type>
              <Type paragraph>
                Or, instead of watering your landscape more this summer, look
                for ways to water it better. For example, you can:
              </Type>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <GaugeIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Install a weather-based sprinkler controller (look for the
                WaterSense label). These controllers act as a thermostat for
                your sprinkler system, automatically adjusting the amount of
                water delivered to plants according to local weather rather than
                on a pre-programmed schedule."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <BuildIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Replace older spray sprinklers with high-efficiency rotary
                    sprinklers. Rotary sprinklers can improve your sprinkler
                    system’s efficiency by 25 to 30 percent by slowly and uniformly
                    applying water low to the ground at a rate soil easily absorbs."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <DripSystemIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Install a drip irrigation system for your trees, shrubs, ground
                    cover and flowers. Drip irrigation is a low-volume system that
                    emits water directly to a plant’s roots, leading to less runoff
                    and loss to evaporation."
                  />
                </ListItem>
              </List>
            </Box>
            <Spacing size="large" />
            <ColumnBox alignItems="center">
              <ThumbUpOutlinedIcon />
              <Box mt={1}>
                <Type variant="h3">
                  Here are some of our other top tips for saving water!
                </Type>
              </Box>
              <Type variant="caption">Click on a tip for more info.</Type>
            </ColumnBox>
            <Spacing />
            <Type variant="h4">Outdoor Tips</Type>
            <Spacing size="small" />
            <Accordion
              expanded={expanded === 'panel1'}
              onChange={handleChange('panel1')}
              classes={{root: classes.expansionPanel}}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Type variant="subtitle2">
                  Don’t wash your driveway and sidewalk with water; use a broom
                  instead
                </Type>
              </AccordionSummary>
              <AccordionDetails>
                <ColumnBox>
                  <Type variant="body1" paragraph>
                    Saves 5 gallons per minute.
                  </Type>
                  <Type variant="body2" paragraph>
                    If you wash your car at home, use an automatic shut-off
                    nozzle on your hose. Better yet, take your car to a{' '}
                    <Link
                      href="https://bewatersmart.info/be-water-smart-dirtiest-car-contest"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Be Water Smart-certified carwash
                    </Link>
                    , which use less water than washing your car at home (and
                    prevents pollutants from washing into the gutter, down the
                    storm drain and into our waterways).
                  </Type>
                </ColumnBox>
              </AccordionDetails>
              <AccordionActions>
                <Button
                  fullWidth
                  color="secondary"
                  href="https://bewatersmart.info"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Be Water Smart Website
                </Button>
              </AccordionActions>
            </Accordion>

            <Accordion
              expanded={expanded === 'panel2'}
              onChange={handleChange('panel2')}
              classes={{root: classes.expansionPanel}}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <Type variant="subtitle2">
                  Use low-water use native and drought-tolerant plants in your
                  yard or garden
                </Type>
              </AccordionSummary>
              <AccordionDetails>
                <ColumnBox>
                  <Type variant="body1" paragraph>
                    Saves 90 gallons per 1,000 square feet each time you water.
                  </Type>
                  <Type variant="body2" paragraph>
                    Consider making a longer-term investment in water efficiency
                    by transforming your landscape. Replacing thirsty lawn with
                    low-water use plants and efficient drip irrigation can
                    provide significant water savings. A new landscape that
                    includes low-water use plants, efficient drip irrigation and
                    a water-wise controller typically uses LESS water than
                    required to maintain a green lawn.
                  </Type>
                  <Type variant="body2" paragraph>
                    PCWA offers rebates for replacing lawn with low-water use
                    plants and upgrading inefficient irrigation equipment.
                  </Type>
                </ColumnBox>
              </AccordionDetails>
              <AccordionActions>
                <NextButton
                  href="/smart-water-use/rebate-programs"
                  color="secondary"
                  fullWidth
                >
                  Learn More About Rebates
                </NextButton>
              </AccordionActions>
            </Accordion>

            <Accordion
              expanded={expanded === 'panel3'}
              onChange={handleChange('panel3')}
              classes={{root: classes.expansionPanel}}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
              >
                <Type variant="subtitle2">
                  Add two to three inches of organic mulch around trees and
                  plants to reduce evaporation
                </Type>
              </AccordionSummary>
              <AccordionDetails>
                <ColumnBox>
                  <Type variant="body1" paragraph>
                    Saves 30 gallons per 1,000 square feet each time you water.
                  </Type>
                  <Type variant="body2" paragraph>
                    Mulch is like icing on a cake, because it keeps the soil
                    moist the way icing keeps a cake moist. Mulch slows
                    evaporation, allowing water to sink into the soil, moderates
                    soil temperature and breaks down into nutrients for plants.
                  </Type>
                </ColumnBox>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === 'panel4'}
              onChange={handleChange('panel4')}
              classes={{root: classes.expansionPanel}}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Type variant="subtitle2">
                  Water your yard early in the morning or later at night
                </Type>
              </AccordionSummary>
              <AccordionDetails>
                <ColumnBox>
                  <Type variant="body1" paragraph>
                    Saves 50 gallons each time you water.
                  </Type>
                  <Type variant="body2" paragraph>
                    Water before 9 a.m. or after 9 p.m. Watering early in the
                    day or later at night--particularly on hot summer
                    days--conserves water by allowing water to soak into the
                    soil before evaporation can whisk it away. Just watering in
                    the morning instead of the hot afternoon, a typical suburban
                    landscape can save 50 gallons every time you water.
                  </Type>
                </ColumnBox>
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expanded === 'panel5'}
              onChange={handleChange('panel5')}
              classes={{root: classes.expansionPanel}}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel5bh-content"
                id="panel5bh-header"
              >
                <Type variant="subtitle2">
                  Adjust sprinklers to avoid overspray and runoff
                </Type>
              </AccordionSummary>
              <AccordionDetails>
                <ColumnBox>
                  <Type variant="body1" paragraph>
                    Saves more than 40 gallons every time you water.
                  </Type>
                  <Type variant="body2" paragraph>
                    Overspray is water from sprinklers that lands outside the
                    planted area. Runoff may come from overspray or over
                    saturating the landscape. Adjust misdirected and tilted
                    sprinklers to water the lawn and not the sidewalk. Stop
                    runoff by dividing your watering cycle into multiple shorter
                    periods to allow better absorption.
                  </Type>
                </ColumnBox>
              </AccordionDetails>
            </Accordion>

            <Spacing />
            <Type variant="h4">Indoor Tips</Type>
            <Spacing size="small" />
            <Accordion
              expanded={expanded === 'panel6'}
              onChange={handleChange('panel6')}
              classes={{root: classes.expansionPanel}}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel6bh-content"
                id="panel6bh-header"
              >
                <Type variant="subtitle2">
                  Turn off the water when rinsing dishes, soaping hands,
                  brushing teeth or shaving
                </Type>
              </AccordionSummary>
              <AccordionDetails>
                <ColumnBox>
                  <Type variant="body1" paragraph>
                    Saves 2.5 gallons per minute or about 10 gallons per day.
                  </Type>
                  <Type variant="body2" paragraph>
                    It may not seem like much to let the water run, but faucets
                    in the kitchen and bath account for 16 percent of water use
                    in the average household. Multiply that by the number of
                    times you turn on the tap--to rinse dishes, wash hands,
                    brush teeth or shave. Then factor in all of the members of
                    your family, and it all adds up. Cut down on tap time, and
                    you will automatically save water--about 10 gallons a day
                    (or more than 3,650 gallons a year).
                  </Type>
                </ColumnBox>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === 'panel7'}
              onChange={handleChange('panel7')}
              classes={{root: classes.expansionPanel}}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel7bh-content"
                id="panel7bh-header"
              >
                <Type variant="subtitle2">
                  Check plumbing and appliances for leaks and fix them within 48
                  hours
                </Type>
              </AccordionSummary>
              <AccordionDetails>
                <ColumnBox>
                  <Type variant="body1" paragraph>
                    Fixing leaky faucets saves 15-20 gallons per day per leak,
                    and fixing leaky toilets saves 30-50 gallons per day per
                    toilet.
                  </Type>
                  <Type variant="body2" paragraph>
                    Steady faucet drips and running toilets are common sources
                    of leaks that can waste thousands of gallons of water each
                    month. Fixing them can be as simple as replacing a washer or
                    toilet flapper. When you find leaks, be sure to turn off
                    water to the problem area until it can be repaired.
                  </Type>
                </ColumnBox>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === 'panel8'}
              onChange={handleChange('panel8')}
              classes={{root: classes.expansionPanel}}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel8bh-content"
                id="panel8bh-header"
              >
                <Type variant="subtitle2">
                  Install a high-efficiency WaterSense labeled toilet (1.28
                  gallons per flush)
                </Type>
              </AccordionSummary>
              <AccordionDetails>
                <ColumnBox>
                  <Type variant="body1" paragraph>
                    Saves 19 gallons per person/day.
                  </Type>
                  <Type variant="body2" paragraph>
                    Toilets consume far more water than any other indoor
                    fixture. By replacing old, inefficient toilets with
                    WaterSense-labeled models, the average family can reduce
                    water used for toilets by 20 to 60 percent—that’s nearly
                    13,000 gallons of water savings for your home every year!
                  </Type>
                  <Type variant="body2" paragraph>
                    PCWA offers rebates for replacing older toilets with
                    high-efficiency models.
                  </Type>
                </ColumnBox>
              </AccordionDetails>
              <AccordionActions>
                <Button
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.epa.gov/WaterSense/products"
                  color="secondary"
                  fullWidth
                >
                  Discover WaterSense Products
                </Button>
                <NextButton
                  href="/smart-water-use/rebate-programs"
                  color="secondary"
                  fullWidth
                >
                  Learn More About Rebates
                </NextButton>
              </AccordionActions>
            </Accordion>

            <Accordion
              expanded={expanded === 'panel9'}
              onChange={handleChange('panel9')}
              classes={{root: classes.expansionPanel}}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel9bh-content"
                id="panel9bh-header"
              >
                <Type variant="subtitle2">Wash only full loads of clothes</Type>
              </AccordionSummary>
              <AccordionDetails>
                <ColumnBox>
                  <Type variant="body1" paragraph>
                    Saves 15 to 45 gallons per load.
                  </Type>
                  <Type variant="body2" paragraph>
                    This is another common-sense way to save. Depending on the
                    efficiency of your clothes washer, you can save 15 to 45
                    gallons a load. If you have a less efficient washer, cutting
                    out just one load a week adds up to more than 2,300 gallons
                    of water savings a year.
                  </Type>
                  <Type variant="body2" paragraph>
                    PCWA offers rebates for replacing older clothes washers with
                    high-efficiency models.
                  </Type>
                </ColumnBox>
              </AccordionDetails>
              <AccordionActions>
                <NextButton
                  href="/smart-water-use/rebate-programs"
                  color="secondary"
                  fullWidth
                >
                  Learn More About Rebates
                </NextButton>
              </AccordionActions>
            </Accordion>
          </SectionBox>
          <Spacing size="large" factor={2} />
          <SectionBox>
            <Type variant="h3" color="primary">
              Water-Wise Landscape Resources
            </Type>
            <Spacing />
            <RespRowBox
              flexSpacing={isSMDown ? 4 : 6}
              justifyContent={{xs: 'flex-start', sm: 'center'}}
              alignItems={{xs: 'center', sm: 'stretch'}}
            >
              {/* <ChildBox maxWidth={300}>
                <Card>
                  <CardActionArea
                    href="http://www.ecolandscape.org/new-ca/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CardMedia
                      className={classes.cardMedia}
                      component="img"
                      src="https://cosmicjs.imgix.net/169e7430-6b48-11e7-80fa-8bf0863a196c-Screen_Shot_2016-08-12_at_4.26.00_PM_ttbpsa.jpg?h=400"
                      alt="Design for the New California Landscape"
                    />
                    <CardContent>
                      <Type gutterBottom variant="h5">
                        Design for the New California Landscape
                      </Type>
                      <Type variant="body2" color="textSecondary" paragraph>
                        Eco-Friendly Design for the New California Landscape
                        promotes a balance between urban landscapes and the
                        environment, includes diverse and beautiful aesthetic
                        qualities, and facilitates the efficient use and
                        management of resources, especially water.
                      </Type>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      size="small"
                      startIcon={<WebsiteIcon color="action" />}
                      href="http://www.ecolandscape.org"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Type variant="inherit" color="textSecondary">
                        EcoLandscape.org
                      </Type>
                    </Button>
                  </CardActions>
                </Card>
              </ChildBox> */}

              <ChildBox maxWidth={300}>
                <Card>
                  <CardActionArea
                    href="https://cdn.cosmicjs.com/69900400-6b49-11e7-8970-3b688d290373-Landscape_Survival_Tips_w0slls.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CardMedia
                      className={classes.cardMedia}
                      component="img"
                      src="https://cosmicjs.imgix.net/69900400-6b49-11e7-8970-3b688d290373-Landscape_Survival_Tips_w0slls.pdf?auto=format&w=600&h=300&fit=crop&crop=top"
                      alt="Design for the New California Landscape"
                    />
                    <CardContent>
                      <Type gutterBottom variant="h5">
                        Landscape Survival
                      </Type>
                      <Type variant="body2" color="textSecondary" paragraph>
                        Tips for a hot, dry summer when landscape water is
                        limited.
                      </Type>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <NextButton
                      size="small"
                      startIcon={<WebsiteIcon color="action" />}
                      href="/"
                    >
                      <Type variant="inherit" color="textSecondary">
                        PCWA.net
                      </Type>
                    </NextButton>
                  </CardActions>
                </Card>
              </ChildBox>

              <ChildBox maxWidth={300}>
                <Card>
                  <CardActionArea
                    href="https://www.rwa.watersavingplants.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CardMedia
                      className={classes.cardMedia}
                      component="img"
                      src="https://cosmicjs.imgix.net/0bf5f5b0-6b4a-11e7-b3a3-fbbc226e29f5-Openingscreen_kqywly.jpg?w=600&h=400&fit=crop"
                      alt="Design for the New California Landscape"
                    />
                    <CardContent>
                      <Type gutterBottom variant="h5">
                        Water-Wise Gardening in the Gold Country
                      </Type>
                      <Type variant="body2" color="textSecondary" paragraph>
                        A guide for water conservation in the home landscape.
                        This site offers many sample water-efficient gardens to
                        view as well as the ability to identify and learn more
                        about the plants within these gardens.
                      </Type>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      size="small"
                      startIcon={<WebsiteIcon color="action" />}
                      href="https://www.rwa.watersavingplants.com"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Type variant="inherit" color="textSecondary">
                        RWA.watersavingplants.com
                      </Type>
                    </Button>
                  </CardActions>
                </Card>
              </ChildBox>
            </RespRowBox>
          </SectionBox>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

export default SmartWaterUsePage
