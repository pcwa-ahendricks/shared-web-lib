import React, {useState} from 'react'
import {Box, Typography as Type, BoxProps} from '@mui/material'

type Props = {
  title: string
  subtitle?: string
} & BoxProps

const ContentDimmer = ({
  title,
  subtitle = '',
  children,
  sx,
  ...rest
}: Props) => {
  const [dimmerActive, setDimmerActive] = useState<boolean>(true)
  const style = {
    dimmer: {
      userSelect: 'none',
      pointerEvents: 'none',
      transition: 'background-color 300ms cubic-bezier(0.4, 0.0, 0.2, 1)',
      backgroundColor: dimmerActive ? 'rgba(0, 0, 0, .7)' : 'rgba(0,0,0, 0.0)',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    },
    typeContainer: {
      userSelect: 'none',
      pointerEvents: 'none',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: 'auto',
      width: '90%',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
      // lineHeight: '1.5rem',
    },
    title: {
      color: 'common.white',
      fontWeight: 500,
      transition: 'opacity 400ms ease',
      opacity: dimmerActive ? 1 : 0
    },
    subtitle: {
      marginTop: '1rem',
      color: 'common.white',
      fontStyle: 'italic',
      fontWeight: 400,
      transition: 'opacity 400ms ease',
      opacity: dimmerActive ? 1 : 0
    }
  }

  return (
    <Box
      sx={{...sx}}
      position="relative"
      onClick={() => setDimmerActive(false)}
      overflow="hidden"
      {...rest}
    >
      {children}
      <Box
        sx={{...style.dimmer}}
        zIndex={2} // Mapbox geocoder is set to 1, so this should float above such elements.
      />

      <Box sx={{...style.typeContainer}} zIndex={3}>
        <Type variant="h3" sx={{...style.title}}>
          {title}
        </Type>
        <Type variant="h6" sx={{...style.subtitle}}>
          {subtitle}
        </Type>
      </Box>
    </Box>
  )
}

export default ContentDimmer
