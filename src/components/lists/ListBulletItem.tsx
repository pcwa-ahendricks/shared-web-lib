import {Theme} from '@lib/material-theme'
import {
  ListItem,
  ListItemIcon,
  ListItemProps,
  ListItemIconProps,
  SvgIconProps,
  useTheme
} from '@mui/material'
import BulletIcon from 'mdi-material-ui/CircleSmall'

type ListBulletItemIconProps = {
  IconProps?: SvgIconProps
} & ListItemIconProps

type ListBulletItemProps = {
  ListBulletItemIconProps?: ListBulletItemIconProps
} & Omit<ListItemProps, 'button'>

const ListBulletItemIcon = ({
  children,
  IconProps,
  sx,
  ...rest
}: ListBulletItemIconProps) => {
  const theme = useTheme<Theme>()
  const style = {
    listItemBullet: {
      minWidth: theme.spacing(5)
    }
  }
  return (
    <ListItemIcon
      sx={{
        ...style.listItemBullet,
        ...sx
      }}
      {...rest}
    >
      <BulletIcon fontSize="large" {...IconProps} />
    </ListItemIcon>
  )
}

const ListBulletItem = ({
  children,
  ListBulletItemIconProps,
  classes: classesProp,
  sx,
  ...rest
}: ListBulletItemProps) => {
  const style = {
    listItem: {
      alignItems: 'flex-start'
    }
  }
  return (
    <ListItem
      sx={{
        ...style.listItem,
        ...sx
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
