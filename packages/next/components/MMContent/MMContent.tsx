import React from 'react'
import {makeStyles, createStyles} from '@material-ui/styles'
import {Theme, Typography as Type} from '@material-ui/core'
import MegaMenuContentContainer from '../megaMenu/MegaMenuContentContainer/MegaMenuContentContainer'
import MMNavLink from '../MMNavLink/MMNavLink'

type Props = {
  contentKey?: number | null
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      color: theme.palette.grey[50],
      opacity: 0.85,
      '&.navlink': {
        cursor: 'pointer'
      }
    }
  })
)

const MMContent = ({contentKey = 1}: Props) => {
  const classes = useStyles()
  return (
    <MegaMenuContentContainer>
      {contentKey === 1 ? (
        <Type key={contentKey} className={classes.text}>
          "At vero eos et accusamus et iusto odio dignissimos ducimus qui
          blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
          et quas molestias excepturi sint occaecati cupiditate non provident,
          similique sunt in culpa qui officia deserunt mollitia animi, id est
          laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
          distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
          cumque nihil impedit quo minus id quod maxime placeat facere possimus,
          omnis voluptas assumenda est, omnis dolor repellendus. Temporibus
          autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe
          eveniet ut et voluptates repudiandae sint et molestiae non recusandae.
          Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis
          voluptatibus maiores alias consequatur aut perferendis doloribus
          asperiores repellat."
        </Type>
      ) : (
        // Logical Or operator for type checking only.
        <nav key={contentKey || undefined}>
          <MMNavLink href="/services/irrigation-canal">
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
        </nav>
      )}
    </MegaMenuContentContainer>
  )
}

export default MMContent
