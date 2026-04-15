import {ListItem, ListItemButton, type ListItemButtonProps} from '@mui/material'

export default function ListButtonItem(props: ListItemButtonProps) {
  return (
    <ListItem disablePadding>
      <ListItemButton {...props} />
    </ListItem>
  )
}
