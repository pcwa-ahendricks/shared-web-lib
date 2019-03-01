// @flow
import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import {Typography as Type} from '@material-ui/core'
import MegaMenuContentContainer from '../megaMenu/MegaMenuContentContainer/MegaMenuContentContainer'
import MMNavLink from '../MMNavLink/MMNavLink'

type Props = {
  classes: any,
  contentKey: number
}

const styles = (theme) => ({
  text: {
    color: theme.palette.grey[50],
    opacity: '0.85',
    '&.navlink': {
      cursor: 'pointer'
    }
  }
})

const MMContent = ({classes, contentKey}: Props) => {
  return (
    <MegaMenuContentContainer elKey={contentKey}>
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
        <nav key={contentKey}>
          <MMNavLink href="/services/irrigation-canal">
            Irrigation Canal Information
          </MMNavLink>
          <MMNavLink href="/forms/rebate">Rebate Form</MMNavLink>
        </nav>
      )}
    </MegaMenuContentContainer>
  )
}

MMContent.defaultProps = {
  contentKey: 1
}
export default withStyles(styles)(MMContent)
