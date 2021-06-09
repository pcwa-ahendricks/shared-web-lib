import React, {useCallback} from 'react'
import imgixLoader from '@lib/imageLoader'
import {
  Box,
  Fab,
  makeStyles,
  // Paper,
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
      marginTop={2}
      position="relative"
      // zIndex={2}
    >
      {/* <Paper elevation={4}> */}
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
                src="1938eb70-c941-11eb-ba89-e7f98c8c358b-PayBill.png"
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
                  src="2795ba30-c951-11eb-ba89-e7f98c8c358b-Outage.png"
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
                  src="5662a7f0-c943-11eb-ba89-e7f98c8c358b-BoardAgenda.png"
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
                src="e7a5cf40-c942-11eb-ba89-e7f98c8c358b-Careers.png"
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
                src="c14e4d00-c946-11eb-ba89-e7f98c8c358b-Start-StopServiceicon.png"
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
                src="4184fba0-c946-11eb-ba89-e7f98c8c358b-Chat.png"
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
      {/* </Paper> */}
    </Box>
  )
}
