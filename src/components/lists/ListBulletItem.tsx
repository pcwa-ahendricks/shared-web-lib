import {
  ListItem,
  ListItemIcon,
  ListItemProps,
  ListItemIconProps,
  SvgIconProps
} from '@mui/material'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import clsx from 'clsx'
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
  classes: classesProp,
  ...rest
}: ListBulletItemProps) => {
  const classes = useStyles()
  return (
    <ListItem
      classes={{
        ...classesProp,
        root: clsx([classes.listItem, classesProp?.root])
      }}
      {...rest}
    >
      <ListBulletItemIcon {...ListBulletItemIconProps} />
      {children}
    </ListItem>
  )
}

export default ListBulletItem
export {ListBulletItemIcon, ListBulletItem}
export type {ListBulletItemProps, ListBulletItemIconProps}
