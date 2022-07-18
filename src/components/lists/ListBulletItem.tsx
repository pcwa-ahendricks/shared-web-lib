import {
  createStyles,
  ListItem,
  makeStyles,
  ListItemIcon,
  ListItemProps,
  ListItemIconProps,
  SvgIconProps
} from '@material-ui/core'
import BulletIcon from 'mdi-material-ui/CircleSmall'

type ListBulletItemIconProps = {
  IconProps?: SvgIconProps
} & ListItemIconProps

type ListBulletItemProps = {
  ListBulletItemIconProps?: ListBulletItemIconProps
} & Omit<ListItemProps, 'button'>

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
}: ListBulletItemProps) => {
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
export type {ListBulletItemProps, ListBulletItemIconProps}
