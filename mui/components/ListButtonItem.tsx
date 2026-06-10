import type {ElementType, JSX} from 'react'
import {
  ListItem,
  ListItemButton,
  type ListItemButtonProps
} from '@mui/material'

type ListButtonItemProps<
  RootComponent extends ElementType = 'div',
  AdditionalProps = {}
> = ListItemButtonProps<RootComponent, AdditionalProps> & {
  disablePadding?: boolean
}

export default function ListButtonItem<
  RootComponent extends ElementType = 'div',
  AdditionalProps = {}
>({
  disablePadding = true,
  ...props
}: ListButtonItemProps<RootComponent, AdditionalProps>): JSX.Element {
  return (
    <ListItem disablePadding={disablePadding}>
      <ListItemButton {...props} />
    </ListItem>
  )
}
