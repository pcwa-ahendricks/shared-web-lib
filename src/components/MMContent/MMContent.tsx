import React, {useMemo} from 'react'
import {Box, Typography as Type, Theme, Divider} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import MegaMenuContentContainer from '../megaMenu/MegaMenuContentContainer/MegaMenuContentContainer'
import MMNavLink from '../MMNavLink/MMNavLink'
import menuConfig from '@lib/menuConfig'
import {RowBox, ColumnBox} from 'mui-sleazebox'

type Props = {
  contentKey?: number | null
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    groupName: {
      color: theme.palette.primary.dark,
      // color: theme.palette.grey[100]
      paddingLeft: 8 // Match NavLink buttonText class and this divider class.
    },
    divider: {
      backgroundColor: theme.palette.grey[600],
      // backgroundColor: theme.palette.primary.dark,
      opacity: 0.3,
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      marginLeft: 8 // Match NavLink buttonText class and this groupName class.
    }
  })
)

const MMContent = ({contentKey = 1}: Props) => {
  const classes = useStyles()

  const menuItem = useMemo(
    () => menuConfig.find((entry) => entry.key === contentKey),
    [contentKey]
  )

  const groups =
    menuItem && Object.keys(menuItem).length > 0 ? menuItem.groups : []

  return (
    <MegaMenuContentContainer>
      {/* Operator for type checking only. */}
      <nav key={contentKey ?? undefined}>
        <RowBox justifyContent="flex-end" pl="5vw" pr="5vw">
          {groups.map((menuGroup, groupIdx) => (
            <ColumnBox flex="0 1 auto" key={groupIdx} m={2}>
              <Type
                variant="overline"
                noWrap={true}
                className={classes.groupName}
              >
                {menuGroup.groupName}
              </Type>
              <Divider variant="fullWidth" className={classes.divider} />
              {menuGroup.items.map((item, itemIdx) => (
                <Box key={itemIdx}>
                  {item.nextLink ? (
                    <MMNavLink href={item.nextLink} as={item.as}>
                      {item.title}
                    </MMNavLink>
                  ) : item.href ? (
                    <MMNavLink href={item.href} isNextLink={false}>
                      {item.title}
                    </MMNavLink>
                  ) : null}
                </Box>
              ))}
            </ColumnBox>
          ))}
          {/* <MMNavLink href="/services/irrigation-canal">
            Irrigation Canal Information
          </MMNavLink>
          <MMNavLink href="/forms/rebates/irrigation-controller">
            Weather Based Irrigation Controller Rebate Form
          </MMNavLink>
          <MMNavLink href="/forms/rebates/irrigation-efficiencies">
            Irrigation Efficiencies Rebate Form
          </MMNavLink>
          <MMNavLink href="/forms/rebates/lawn-replacement">
            Lawn Replacement Rebate Form
          </MMNavLink>
          <MMNavLink href="/forms/rebates/washing-machine">
            Washing Machine Rebate Form
          </MMNavLink>
          <MMNavLink href="/forms/rebates/toilet">Toilet Rebate Form</MMNavLink>
          <MMNavLink href="/stewardship">Smart Water Use</MMNavLink>
          <MMNavLink href="/forms/account/contact-info">Contact Info</MMNavLink> */}
        </RowBox>
      </nav>
    </MegaMenuContentContainer>
  )
}

export default MMContent
