// cspell:ignore
import React from 'react'
import {Box, Typography as Type, Divider, Link} from '@mui/material'
import Spacing from '@components/boxes/Spacing'

const NewsroomSidebar = () => {
  return (
    <Box
      sx={(theme) => ({
        minWidth: {
          xs: 0,
          sm: 210
        },
        width: {
          xs: '100%',
          sm: 210
        },
        padding: 2,
        bgcolor: theme.palette.grey[100],
        borderColor: theme.palette.grey[300],
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 1
      })}
    >
      <Box color="primary.light">
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
          <Link
            href="tel:530-823-1937"
            variant="body2"
            noWrap
            underline="hover"
          >
            (530) 823-1937
          </Link>
        </Box>
        <Box>
          <Link
            href="mailto:rbranch@pcwa.net"
            variant="body2"
            underline="hover"
          >
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
          <Link
            href="tel:530-863-2883"
            variant="body2"
            noWrap
            underline="hover"
          >
            (530) 863-2883
          </Link>
        </Box>
        <Box>
          <Link
            href="mailto:bcoleman@pcwa.net"
            variant="body2"
            underline="hover"
          >
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
          <Link
            href="tel:530-906-5998"
            variant="body2"
            noWrap
            underline="hover"
          >
            (530) 906-5998
          </Link>
        </Box>
        <Box>
          <Link
            href="mailto:ahendricks@pcwa.net"
            variant="body2"
            underline="hover"
          >
            ahendricks@pcwa.net
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export default NewsroomSidebar
