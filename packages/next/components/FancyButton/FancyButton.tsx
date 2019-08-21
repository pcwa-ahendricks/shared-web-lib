import React, {useState} from 'react'
import {Box, Button} from '@material-ui/core'
import {createStyles, makeStyles} from '@material-ui/styles'
import {ButtonProps} from '@material-ui/core/Button'

type Props = {
  children: React.ReactNode
  hoverText?: string
  transition?: 'fade' | 'slideUp'
  transitionDuration?: string
} & ButtonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement>

type UseStylesProps = {
  isHovering: boolean
  transition: Props['transition']
  transitionDuration: Props['transitionDuration']
}

const useStyles = makeStyles(() =>
  createStyles({
    root: ({transition}: UseStylesProps) => ({
      overflow: transition === 'slideUp' ? 'hidden' : 'visible' // Hide translated content with slideUp button.
    }),
    hoverText: ({
      isHovering,
      transition,
      transitionDuration
    }: UseStylesProps) => ({
      opacity: transition !== 'fade' ? 1 : isHovering ? 1 : 0,
      transform:
        transition !== 'slideUp'
          ? 'none'
          : isHovering
          ? 'translateY(0)'
          : 'translateY(50px)',
      transition: `all ${transitionDuration} ease`,
      transitionProperty: 'opacity, transform'
    }),
    children: ({
      isHovering,
      transition,
      transitionDuration
    }: UseStylesProps) => ({
      opacity: transition !== 'fade' ? 1 : isHovering ? 0 : 1,
      transform:
        transition !== 'slideUp'
          ? 'none'
          : isHovering
          ? 'translateY(-50px)'
          : 'translateY(0)',
      transition: `all ${transitionDuration} ease`,
      transitionProperty: 'opacity, transform'
    })
  })
)

const FancyButton = ({
  hoverText,
  transition = 'slideUp',
  children,
  transitionDuration = '150ms',
  ...rest
}: Props) => {
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const classes = useStyles({isHovering, transition, transitionDuration})
  return (
    <Button
      {...rest}
      className={classes.root}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Box
        component="span"
        position="absolute"
        zIndex="2"
        className={classes.hoverText}
      >
        {hoverText}
      </Box>
      <Box component="span" zIndex="1" className={classes.children}>
        {children}
      </Box>
    </Button>
  )
}

export default FancyButton
