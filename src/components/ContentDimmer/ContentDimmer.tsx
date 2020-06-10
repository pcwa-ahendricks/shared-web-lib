import React, {useState} from 'react'
import {
  Box,
  Theme,
  Typography as Type,
  createStyles,
  makeStyles,
  BoxProps
} from '@material-ui/core'

type Props = {
  title: string
  subtitle?: string
} & BoxProps

type UseStylesProps = {
  dimmerActive: boolean
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dimmer: ({dimmerActive}: UseStylesProps) => ({
      userSelect: 'none',
      pointerEvents: 'none',
      transition: 'background-color 300ms cubic-bezier(0.4, 0.0, 0.2, 1)',
      backgroundColor: dimmerActive ? 'rgba(0, 0, 0, .7)' : 'rgba(0,0,0, 0.0)',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    }),
    container: {},
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
    title: ({dimmerActive}: UseStylesProps) => ({
      color: theme.palette.common.white,
      fontWeight: 500,
      transition: 'opacity 400ms ease',
      opacity: dimmerActive ? 1 : 0
    }),
    subtitle: ({dimmerActive}: UseStylesProps) => ({
      marginTop: '1rem',
      color: theme.palette.common.white,
      fontStyle: 'italic',
      fontWeight: 400,
      transition: 'opacity 400ms ease',
      opacity: dimmerActive ? 1 : 0
    })
  })
)

const ContentDimmer = ({title, subtitle = '', children, ...rest}: Props) => {
  const [dimmerActive, setDimmerActive] = useState<boolean>(true)
  const classes = useStyles({dimmerActive})

  return (
    <Box
      className={classes.container}
      position="relative"
      onClick={() => setDimmerActive(false)}
      overflow="hidden"
      {...rest}
    >
      {children}
      <Box
        className={classes.dimmer}
        zIndex={2} // Mapbox geocoder is set to 1, so this should float above such elements.
      />

      <Box className={classes.typeContainer} zIndex={3}>
        <Type variant="h3" className={classes.title}>
          {title}
        </Type>
        <Type variant="h6" className={classes.subtitle}>
          {subtitle}
        </Type>
      </Box>
    </Box>
  )
}

export default ContentDimmer
