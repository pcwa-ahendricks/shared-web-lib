import React from 'react'
import clsx from 'clsx'
import Head from 'next/head'
import {Box, BoxProps, createStyles, makeStyles} from '@material-ui/core'

type Props = {
  children?: React.ReactNode
  animate?: boolean
  name: string
  hideUntilAnimate?: boolean
  speed?: 'slow' | 'slower' | 'fast' | 'faster'
  delay?: boolean | 1 | 2 | 3 | 4 | 5
  repeat?: boolean | 1 | 2 | 3
  infinite?: boolean
} & BoxProps

const useStyles = makeStyles(() =>
  createStyles({
    hidden: {
      visibility: 'hidden'
    }
  })
)

const prefix = 'animate__'

export default function Animate({
  children,
  className: classNameProp,
  animate = true,
  name,
  hideUntilAnimate = false,
  speed,
  infinite,
  delay: delayProp = false,
  repeat: repeatProp = false,
  ...rest
}: Props) {
  const classes = useStyles()
  // Use animate value to determine when the element should be visible
  const hidden = hideUntilAnimate ? !animate : false
  const delay = delayProp === true ? 1 : delayProp
  const repeat = repeatProp === true ? 1 : repeatProp

  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
          key="animate.css"
        />
      </Head>
      <Box
        className={clsx([
          {
            [`${prefix}animated`]: animate,
            [`${prefix}${name}`]: animate && name,
            [`${prefix}${speed}`]: animate && speed,
            [`${prefix}infinite`]: animate && infinite,
            [`${prefix}repeat-${repeat}`]: animate && repeat,
            [`${prefix}delay-${delay}s`]: animate && delay,
            [classes.hidden]: hidden
          },
          classNameProp
        ])}
        {...rest}
      >
        {children}
      </Box>
    </div>
  )
}

export type {Props as AnimateProps}
