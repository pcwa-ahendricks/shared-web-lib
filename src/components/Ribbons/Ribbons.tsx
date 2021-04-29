import React from 'react'
import PropTypes from 'prop-types'
import {Box, BoxProps} from '@material-ui/core'
import styles from './Ribbons.module.css'

export const RibbonContainer = ({children, className}: BoxProps) => {
  return (
    <Box className={`${styles.ribbonContainer} ${className || ''}`}>
      {children}
    </Box>
  )
}

type Props = {backgroundColor: BoxProps['bgcolor']} & Partial<BoxProps>

export const RightCornerRibbon = ({
  children,
  backgroundColor,
  color,
  fontFamily
}: Props) => {
  return (
    <Box className={styles.rightCornerRibbon}>
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
      <span
        style={{color, fontFamily}}
        className={styles.rightCornerRibbonText}
      >
        {children}
      </span>
    </Box>
  )
}

RightCornerRibbon.propTypes = {
  children: PropTypes.any.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  fontFamily: PropTypes.string
}

RightCornerRibbon.defaultProps = {
  fontFamily: 'Arial'
}

export const RightCornerLargeRibbon = ({
  children,
  backgroundColor,
  color,
  fontFamily
}: Props) => {
  return (
    <Box className={styles.rightCornerLargeRibbon}>
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
      <span
        style={{color, fontFamily}}
        className={styles.rightCornerLargeRibbonText}
      >
        {children}
      </span>
    </Box>
  )
}

RightCornerLargeRibbon.propTypes = {
  children: PropTypes.any.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  fontFamily: PropTypes.string
}

RightCornerLargeRibbon.defaultProps = {
  fontFamily: 'Arial'
}

export const LeftCornerRibbon = ({
  children,
  backgroundColor,
  color,
  fontFamily
}: Props) => {
  return (
    <Box className={styles.leftCornerRibbon}>
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
      <span style={{color, fontFamily}} className={styles.leftCornerRibbonText}>
        {children}
      </span>
    </Box>
  )
}

LeftCornerRibbon.propTypes = {
  children: PropTypes.any.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  fontFamily: PropTypes.string
}

LeftCornerRibbon.defaultProps = {
  fontFamily: 'Arial'
}

export const LeftCornerLargeRibbon = ({
  children,
  backgroundColor,
  color,
  fontFamily
}: Props) => {
  return (
    <Box className={styles.leftCornerLargeRibbon}>
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
      <span
        style={{color, fontFamily}}
        className={styles.leftCornerLargeRibbonText}
      >
        {children}
      </span>
    </Box>
  )
}

LeftCornerLargeRibbon.propTypes = {
  children: PropTypes.any.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  fontFamily: PropTypes.string
}

LeftCornerLargeRibbon.defaultProps = {
  fontFamily: 'Arial'
}

export const RightRibbon = ({
  children,
  backgroundColor,
  color,
  fontFamily,
  ...rest
}: Props) => {
  return (
    <Box className={styles.rightRibbon} {...rest}>
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
      <span style={{color, fontFamily}} className={styles.rightRibbonText}>
        {children}
      </span>
    </Box>
  )
}

RightRibbon.propTypes = {
  children: PropTypes.any.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  fontFamily: PropTypes.string
}

RightRibbon.defaultProps = {
  fontFamily: 'Arial'
}

export const RightLargeRibbon = ({
  children,
  backgroundColor,
  color,
  fontFamily
}: Props) => {
  return (
    <Box className={styles.rightLargeRibbon}>
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
      <span style={{color, fontFamily}} className={styles.rightLargeRibbonText}>
        {children}
      </span>
    </Box>
  )
}

RightLargeRibbon.propTypes = {
  children: PropTypes.any.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  fontFamily: PropTypes.string
}

RightLargeRibbon.defaultProps = {
  fontFamily: 'Arial'
}

export const LeftRibbon = ({
  children,
  backgroundColor,
  color,
  fontFamily
}: Props) => {
  return (
    <Box className={styles.leftRibbon}>
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
      <span style={{color, fontFamily}} className={styles.leftRibbonText}>
        {children}
      </span>
    </Box>
  )
}

LeftRibbon.propTypes = {
  children: PropTypes.any.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  fontFamily: PropTypes.string
}

LeftRibbon.defaultProps = {
  fontFamily: 'Arial'
}

export const LeftLargeRibbon = ({
  children,
  backgroundColor,
  color,
  fontFamily
}: Props) => {
  return (
    <Box className={styles.leftLargeRibbon}>
      <svg height="60" width="90">
        <g transform="scale(-1,1) translate(-90, 0)">
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
        </g>
      </svg>
      <span style={{color, fontFamily}} className={styles.leftLargeRibbonText}>
        {children}
      </span>
    </Box>
  )
}

LeftLargeRibbon.propTypes = {
  children: PropTypes.any.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  fontFamily: PropTypes.string
}

LeftLargeRibbon.defaultProps = {
  fontFamily: 'Arial'
}
