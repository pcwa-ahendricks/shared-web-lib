import {
  createStyles,
  ListItem,
  makeStyles,
  ListItemIcon,
  ListItemProps,
  ListItemIconProps,
  IconProps
} from '@material-ui/core'
import BulletIcon from 'mdi-material-ui/CircleSmall'

type ListBulletItemIconProps = {IconProps?: IconProps} & ListItemIconProps

const useStyles = makeStyles((theme) =>
  createStyles({
    listItem: {
      alignItems: 'flex-start'
    },
    listItemBullet: {
      minWidth: theme.spacing(5)
    },
    noBottomMargin: {
      marginBottom: 0
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
      <BulletIcon fontSize="large" />
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
