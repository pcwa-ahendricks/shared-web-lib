// cspell:ignore bgcolor
import React, {useCallback, useState, useMemo} from 'react'
import {Box, Fab, Fade, Theme, useMediaQuery} from '@material-ui/core'
import {FabProps} from '@material-ui/core/Fab'
import {IconProps} from '@material-ui/core/Icon'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp'
import useWindowScroll from '@hooks/useWindowScroll'
import {useTheme} from '@material-ui/styles'

const ScrollToTop = () => {
  const theme = useTheme<Theme>()
  const [hide, setHide] = useState<boolean>(true)
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))

  const scrollHandler = useCallback(() => {
    if (window.pageYOffset > 200) {
      setHide(false)
    } else {
      setHide(true)
    }
  }, [])

  const fabSize: FabProps['size'] = useMemo(() => (isXs ? 'small' : 'medium'), [
    isXs
  ])
  const iconFontSize: IconProps['fontSize'] = useMemo(
    () => (isXs ? 'default' : 'large'),
    [isXs]
  )

  useWindowScroll(scrollHandler, 50)

  const clickHandler = useCallback(() => {
    window.scroll({top: 0, left: 0, behavior: 'smooth'})
  }, [])

  return (
    <Fade in={!hide} timeout={400}>
      <Box position="fixed" right={20} bottom={20}>
        <Fab
          size={fabSize}
          color="secondary"
          aria-label="Scroll To Top"
          onClick={clickHandler}
        >
          <KeyboardArrowUp fontSize={iconFontSize} />
        </Fab>
      </Box>
    </Fade>
  )
}

export default ScrollToTop
