import React, {useCallback} from 'react'
import imgixLoader from '@lib/imageLoader'
import {
  Box,
  Fab,
  makeStyles,
  Paper,
  Typography,
  useMediaQuery,
  useTheme
} from '@material-ui/core'
import {ChildBox, ColumnBox, RowBox} from 'mui-sleazebox'
import Image, {ImageProps} from 'next/image'
import Link from 'next/link'

const useStyles = makeStyles({
  fabRoot: ({width, height}: {width: number; height: number}) => ({
    height,
    width
  })
})

export default function QuickLinksBar() {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))
  const height = isXs ? 40 : 90
  const width = isXs ? 40 : 90
  const classes = useStyles({height, width})
  const FabImage = useCallback(
    (props: Pick<ImageProps, 'src' | 'alt'>) => {
      return (
        <Image loader={imgixLoader} width={width} height={height} {...props} />
      )
    },
    [height, width]
  )

  return (
    <Box
      maxWidth={{xs: '100vw', sm: '90vw', md: '85vw', lg: '80vw', xl: '65vw'}}
      m="auto"
      marginTop={-7}
      position="relative"
      zIndex={2}
    >
      <Paper elevation={4}>
        <RowBox justifyContent="space-around" alignItems="center" height={150}>
          <ColumnBox child alignItems="center">
            <ChildBox>
              <Fab
                classes={{root: classes.fabRoot}}
                href="https://ipn.paymentus.com/cp/plco"
                target="_blank"
              >
                <FabImage
                  alt="Bill Pay quick link icon"
                  src="7d481a60-b97d-11eb-9b4d-19bb36ed9e4c-PayBill.png"
                />
              </Fab>
            </ChildBox>
            <ChildBox mt={1}>
              <Typography variant="h6" color="primary" align="center">
                Pay My Bill
              </Typography>
            </ChildBox>
          </ColumnBox>
          <ColumnBox child alignItems="center">
            <ChildBox>
              <Link href="/services/outage" passHref>
                <Fab classes={{root: classes.fabRoot}}>
                  <FabImage
                    alt="Outages link icon"
                    src="7db66c90-b97d-11eb-9b4d-19bb36ed9e4c-Outages.png"
                  />
                </Fab>
              </Link>
            </ChildBox>
            <ChildBox mt={1}>
              <Typography variant="h6" color="primary" align="center">
                Outages
              </Typography>
            </ChildBox>
          </ColumnBox>
          <ColumnBox child alignItems="center">
            <ChildBox>
              <Link href="/board-of-directors/meeting-agendas" passHref>
                <Fab classes={{root: classes.fabRoot}}>
                  <FabImage
                    alt="PCWA Board Meetings and Agendas link icon"
                    src="7d5d01f0-b97d-11eb-9b4d-19bb36ed9e4c-BoardAgenda.png"
                  />
                </Fab>
              </Link>
            </ChildBox>
            <ChildBox mt={1}>
              <Typography variant="h6" color="primary" align="center">
                Board Meetings
              </Typography>
            </ChildBox>
          </ColumnBox>

          <ColumnBox child alignItems="center">
            <ChildBox>
              <Fab
                classes={{root: classes.fabRoot}}
                href="https://careers.pcwa.net/"
                target="_blank"
              >
                <FabImage
                  alt="Careers quick link icon"
                  src="81e39b80-b97d-11eb-9b4d-19bb36ed9e4c-Careers.png"
                />
              </Fab>
            </ChildBox>
            <ChildBox mt={1}>
              <Typography variant="h6" color="primary" align="center">
                Careers
              </Typography>
            </ChildBox>
          </ColumnBox>
          <ColumnBox child alignItems="center">
            <ChildBox>
              <Fab classes={{root: classes.fabRoot}} href="">
                <FabImage
                  alt="Start/Stop Service quick link icon"
                  src="7d6b0bb0-b97d-11eb-9b4d-19bb36ed9e4c-Start-StopService.png"
                />
              </Fab>
            </ChildBox>
            <ChildBox mt={1}>
              <Typography variant="h6" color="primary" align="center">
                Start/Stop Service
              </Typography>
            </ChildBox>
          </ColumnBox>
          <ColumnBox child alignItems="center">
            <ChildBox>
              <Fab classes={{root: classes.fabRoot}} href="">
                <FabImage
                  alt="Chat quick link icon"
                  src="7d91cd90-b97d-11eb-9b4d-19bb36ed9e4c-Chat.png"
                />
              </Fab>
            </ChildBox>
            <ChildBox mt={1}>
              <Typography variant="h6" color="primary" align="center">
                Chat
              </Typography>
            </ChildBox>
          </ColumnBox>
        </RowBox>
      </Paper>
    </Box>
  )
}
