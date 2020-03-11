// cspell:ignore
import React from 'react'
import {Box, Typography as Type, Divider, Link} from '@material-ui/core'
import {
  useTheme
  // makeStyles,
  // createStyles,
  // Theme
} from '@material-ui/core/styles'
import Spacing from '@components/boxes/Spacing'

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({

//   })
// )

const NewsroomSidebar = () => {
  const theme = useTheme()
  // const classes = useStyles()

  return (
    <Box
      width={{xs: '100%', sm: 175}}
      p={2}
      bgcolor={theme.palette.grey['100']}
      borderColor={theme.palette.grey['300']}
      borderRadius={1}
      border={1}
      minWidth={{xs: 0, sm: 210}}
    >
      <Box color={theme.palette.primary.light}>
        <Type variant="subtitle1" color="textPrimary">
          Contacts
        </Type>
        <Spacing size="small" />
        <Type variant="subtitle2" color="primary">
          Public Relations / Press
        </Type>
        <Spacing size="x-small" />
        <Type variant="body1" color="textPrimary">
          Ross Branch
        </Type>
        <Box>
          <Link href="tel:530-823-1937" variant="body2" noWrap>
            (530) 823-1937
          </Link>
        </Box>
        <Box>
          <Link href="mailto:rbranch@pcwa.net" variant="body2">
            rbranch@pcwa.net
          </Link>
        </Box>
        <Spacing>
          <Divider />
        </Spacing>
        <Type variant="subtitle2" color="primary">
          Multimedia
        </Type>
        <Spacing size="x-small" />
        <Type variant="body1" color="textPrimary">
          Brie Coleman
        </Type>
        <Box>
          <Link href="tel:530-863-2883" variant="body2" noWrap>
            (530) 863-2883
          </Link>
        </Box>
        <Box>
          <Link href="mailto:bcoleman@pcwa.net" variant="body2">
            bcoleman@pcwa.net
          </Link>
        </Box>
        <Spacing>
          <Divider />
        </Spacing>
        <Type variant="subtitle2" color="primary">
          Website
        </Type>
        <Spacing size="x-small" />
        <Type variant="body1" color="textPrimary">
          Abe Hendricks
        </Type>
        <Box>
          <Link href="tel:530-906-5998" variant="body2" noWrap>
            (530) 906-5998
          </Link>
        </Box>
        <Box>
          <Link href="mailto:ahendricks@pcwa.net" variant="body2">
            ahendricks@pcwa.net
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export default NewsroomSidebar