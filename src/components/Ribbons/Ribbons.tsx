import React from 'react'
import {Box, BoxProps} from '@mui/material'
import styles from './Ribbons.module.css'

export const RibbonContainer = ({children, className, ...rest}: BoxProps) => {
  return (
    <Box className={`${styles.ribbonContainer} ${className || ''}`} {...rest}>
      {children}
    </Box>
  )
}

type Props = {
  backgroundColor?: string
  svgWidth?: string | number
} & Partial<BoxProps>

export const RightCornerRibbon = ({
  children,
  backgroundColor,
  color,
  fontFamily,
  sx
}: Props) => {
  return (
    <Box className={styles.rightCornerRibbon} sx={{...sx}}>
      <svg height="70" width="70">
        <polygon
          points="0 0, 0 10, 10 10"
          fill={`${backgroundColor}77`}
          strokeWidth="0"
        />
        <polygon
          points="0 0, 70 70, 70 40, 30 0"
          fill={backgroundColor}
          strokeWidth="0"
        />
        <polygon
          points="60 60, 60 70, 70 70"
          fill={`${backgroundColor}77`}
          strokeWidth="0"
        />
      </svg>
      <Box
        component="span"
        sx={{color, fontFamily}}
        className={styles.rightCornerRibbonText}
      >
        {children}
      </Box>
    </Box>
  )
}

export const RightCornerLargeRibbon = ({
  children,
  backgroundColor,
  color,
  fontFamily,
  sx
}: Props) => {
  return (
    <Box className={styles.rightCornerLargeRibbon} sx={{...sx}}>
      <svg height="84" width="84">
        <polygon
          points="0 0, 0 12, 12 12"
          fill={`${backgroundColor}77`}
          strokeWidth="0"
        />
        <polygon
          points="0 0, 84 84, 84 48, 36 0"
          fill={backgroundColor}
          strokeWidth="0"
        />
        <polygon
          points="72 72, 72 84, 84 84"
          fill={`${backgroundColor}77`}
          strokeWidth="0"
        />
      </svg>
      <Box
        component="span"
        sx={{color, fontFamily}}
        className={styles.rightCornerLargeRibbonText}
      >
        {children}
      </Box>
    </Box>
  )
}

export const LeftCornerRibbon = ({
  children,
  backgroundColor,
  color,
  fontFamily,
  sx
}: Props) => {
  return (
    <Box className={styles.leftCornerRibbon} sx={{...sx}}>
      <svg height="70" width="70">
        <g transform="rotate(-90, 35, 35)">
          <polygon
            points="0 0, 0 10, 10 10"
            fill={`${backgroundColor}77`}
            strokeWidth="0"
          />
          <polygon
            points="0 0, 70 70, 70 40, 30 0"
            fill={backgroundColor}
            strokeWidth="0"
          />
          <polygon
            points="60 60, 60 70, 70 70"
            fill={`${backgroundColor}77`}
            strokeWidth="0"
          />
        </g>
      </svg>
      <Box
        component="span"
        sx={{color, fontFamily}}
        className={styles.leftCornerRibbonText}
      >
        {children}
      </Box>
    </Box>
  )
}

export const LeftCornerLargeRibbon = ({
  children,
  backgroundColor,
  color,
  fontFamily,
  sx
}: Props) => {
  return (
    <Box className={styles.leftCornerLargeRibbon} sx={{...sx}}>
      <svg height="84" width="84">
        <g transform="rotate(-90, 42, 42)">
          <polygon
            points="0 0, 0 12, 12 12"
            fill={`${backgroundColor}77`}
            strokeWidth="0"
          />
          <polygon
            points="0 0, 84 84, 84 48, 36 0"
            fill={backgroundColor}
            strokeWidth="0"
          />
          <polygon
            points="72 72, 72 84, 84 84"
            fill={`${backgroundColor}77`}
            strokeWidth="0"
          />
        </g>
      </svg>
      <Box
        component="span"
        sx={{color, fontFamily}}
        className={styles.leftCornerLargeRibbonText}
      >
        {children}
      </Box>
    </Box>
  )
}

export const RightRibbon = ({
  children,
  backgroundColor,
  color,
  fontFamily,
  sx
}: Props) => {
  return (
    <Box className={styles.rightRibbon} sx={{...sx}}>
      <svg height="40" width="70">
        <polygon
          points="0 10, 10 20, 0 30, 70 30, 70 10"
          fill={backgroundColor}
          strokeWidth="0"
        />
        <polygon
          points="60 40, 60 30, 70 30"
          fill={`${backgroundColor}77`}
          strokeWidth="0"
        />
      </svg>
      <Box
        component="span"
        sx={{color, fontFamily}}
        className={styles.rightRibbonText}
      >
        {children}
      </Box>
    </Box>
  )
}

export const RightLargeRibbon = ({
  children,
  backgroundColor,
  color,
  fontFamily,
  sx
}: Props) => {
  return (
    <Box className={styles.rightLargeRibbon} sx={{...sx}}>
      <svg height="60" width="90">
        <polygon
          points="0 15, 15 30, 0 45, 90 45, 90 15"
          fill={backgroundColor}
          strokeWidth="0"
        />
        <polygon
          points="75 60, 75 40, 90 45"
          fill={`${backgroundColor}77`}
          strokeWidth="0"
        />
      </svg>
      <Box
        component="span"
        sx={{color, fontFamily}}
        className={styles.rightLargeRibbonText}
      >
        {children}
      </Box>
    </Box>
  )
}

export const LeftRibbon = ({
  children,
  backgroundColor,
  color,
  fontFamily,
  sx
}: Props) => {
  return (
    <Box className={styles.leftRibbon} sx={{...sx}}>
      <svg height="40" width="70">
        <g transform="scale(-1,1) translate(-70, 0)">
          <polygon
            points="0 10, 10 20, 0 30, 70 30, 70 10"
            fill={backgroundColor}
            strokeWidth="0"
          />
          <polygon
            points="60 40, 60 30, 70 30"
            fill={`${backgroundColor}77`}
            strokeWidth="0"
          />
        </g>
      </svg>
      <Box
        component="span"
        sx={{color, fontFamily}}
        className={styles.leftRibbonText}
      >
        {children}
      </Box>
    </Box>
  )
}

// Original Version
// export const LeftLargeRibbon = ({
//   children,
//   backgroundColor,
//   color,
//   fontFamily,
//   sx
// }: Props) => {
//   return (
//     <Box className={styles.leftLargeRibbon} sx={{...sx}}>
//       <svg height="60" width="90">
//         <g transform="scale(-1,1) translate(-90, 0)">
//           <polygon
//             points="0 15, 15 30, 0 45, 90 45, 90 15"
//             fill={backgroundColor}
//             strokeWidth="0"
//           />
//           <polygon
//             points="75 60, 75 40, 90 45"
//             fill={`${backgroundColor}77`}
//             strokeWidth="0"
//           />
//         </g>
//       </svg>
//       <Box
//         component="span"
//         sx={{color, fontFamily}}
//         className={styles.leftLargeRibbonText}
//       >
//         {children}
//       </Box>
//     </Box>
//   )
// }

export const LeftLargeRibbon = ({
  children,
  backgroundColor,
  color,
  fontFamily,
  svgWidth: svgWidthProp = 90,
  sx
}: Props) => {
  let svgWidth1 = svgWidthProp.toString()
  let svgWidth2 = (parseInt(svgWidth1, 10) - 15).toString()

  return (
    <Box className={styles.leftLargeRibbon} sx={{...sx}}>
      <svg height="60" width={svgWidth1}>
        <g transform={`scale(-1,1) translate(-${svgWidth1}, 0)`}>
          <polygon
            points={`0 15, 15 30, 0 45, ${svgWidth1} 45, ${svgWidth1} 15`}
            fill={backgroundColor}
            strokeWidth="0"
          />
          <polygon
            points={`${svgWidth2} 60, ${svgWidth2} 40, ${svgWidth1} 45`}
            fill={`${backgroundColor}77`}
            strokeWidth="0"
          />
        </g>
      </svg>
      <Box
        component="span"
        sx={{color, fontFamily}}
        className={styles.leftLargeRibbonText}
      >
        {children}
      </Box>
    </Box>
  )
}
