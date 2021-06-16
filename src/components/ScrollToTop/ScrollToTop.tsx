// cspell:ignore bgcolor
import React, {useMemo} from 'react'
import {
  Box,
  Fab,
  Zoom,
  Theme,
  useMediaQuery,
  useTheme,
  useScrollTrigger,
  IconProps,
  FabProps
} from '@material-ui/core'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp'
import {backToTopAnchorId} from '@components/PageLayout/PageLayout'

/*
  See https://material-ui.com/components/app-bar/#back-to-top for example.
  Previous version of this component used custom useWindowScroll hook.
*/

const ScrollToTop = () => {
  const theme = useTheme<Theme>()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))

  const fabSize: FabProps['size'] = useMemo(
    () => (isXs ? 'small' : 'medium'),
    [isXs]
  )

  const iconFontSize: IconProps['fontSize'] = useMemo(
    () => (isXs ? 'default' : 'large'),
    [isXs]
  )

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 200
  })

  // const clickHandler = useCallback(() => {
  //   window.scroll({top: 0, left: 0, behavior: 'smooth'})
  // }, [])

  const clickHandler = (event: any) => {
    const anchor = (
      (event.target && event.target.ownerDocument) ||
      document
    ).querySelector(`#${backToTopAnchorId}`)

    if (anchor) {
      anchor.scrollIntoView({behavior: 'smooth', block: 'center'})
    }
  }

  return (
    <Zoom in={trigger}>
      <Box
        position="fixed"
        right={20}
        bottom={20}
        role="presentation"
        onClick={clickHandler}
      >
        <Fab size={fabSize} color="secondary" aria-label="Scroll To Top">
          <KeyboardArrowUp fontSize={iconFontSize} />
        </Fab>
      </Box>
    </Zoom>
  )
}

export default ScrollToTop
