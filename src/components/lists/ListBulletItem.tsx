import {
  createStyles,
  ListItem,
  makeStyles,
  ListItemIcon,
  ListItemProps,
  ListItemIconProps,
  SvgIconTypeMap
} from '@material-ui/core'
import {OverridableComponent} from '@material-ui/core/OverridableComponent'
import BulletIcon from 'mdi-material-ui/CircleSmall'

type ListBulletItemIconProps = {
  IconProps?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>
} & ListItemIconProps

const useStyles = makeStyles((theme) =>
  createStyles({
    listItem: {
      alignItems: 'flex-start'
    },
    listItemBullet: {
      minWidth: theme.spacing(5)
    }
  })
)

const ListBulletItemIcon = ({
  children,
  IconProps,
  ...rest
}: ListBulletItemIconProps) => {
  const classes = useStyles()
  return (
    <ListItemIcon classes={{root: classes.listItemBullet}} {...rest}>
      <BulletIcon fontSize="large" {...IconProps} />
    </ListItemIcon>
  )
}

const ListBulletItem = ({
  children,
  ListBulletItemIconProps,
  ...rest
}: {ListBulletItemIconProps?: ListBulletItemIconProps} & Omit<
  ListItemProps,
  'button'
>) => {
  const classes = useStyles()
  return (
    <ListItem classes={{root: classes.listItem}} {...rest}>
      <ListBulletItemIcon {...ListBulletItemIconProps} />
      {children}
    </ListItem>
  )
}

export default ListBulletItem
export {ListBulletItemIcon, ListBulletItem}
