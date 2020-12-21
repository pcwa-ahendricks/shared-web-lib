import React from 'react'
import {createStyles, makeStyles} from '@material-ui/core'
import {orange} from '@material-ui/core/colors'

type Props = {
  size: number
}

type UseStylesProps = {
  size: Props['size']
}

// const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
//   c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
//   C20.1,15.8,20.2,15.8,20.2,15.7z`

const useStyles = makeStyles(() =>
  createStyles({
    pin: ({size}: UseStylesProps) => ({
      // cursor: 'pointer',
      // fill: theme.palette.primary.main,
      stroke: 'none',
      transform: `translate(${-size / 2}px,${-size * 1.3}px)` // Translating Y the full height (eg. -size * 1.4) seem overkill; Cutting that back down a bit looks better.
    })
  })
)

const PiMapMarker = ({size = 10}: Props) => {
  const classes = useStyles({size})
  return (
    <svg
      width={size}
      height={size * 1.4}
      // viewBox="0 0 24 24"
      // onClick={onClick}
      viewBox="0 0 51 70"
      className={classes.pin}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlSpace="preserve"
      style={{fillRule: 'evenodd', clipRule: 'evenodd', strokeMiterlimit: 10}}
    >
      <g transform="matrix(1,0,0,1,-73.4875,1.51247)">
        <g id="Blue-Marker">
          <path
            d="M76.516,27.283C76.198,26.12 76,24.463 76,22.625C76,20.177 76.352,18.051 76.868,16.983C79.228,7.814 88.073,1 98.625,1C110.982,1 121,10.346 121,21.875C121,22.457 120.975,23.034 120.924,23.604L120.904,24.475L120.631,26.423L120.438,27.863L119.959,29.391L119.466,31.159L118.903,32.637L118.385,33.907L117.648,35.596L116.876,37.361L116.613,37.846L115.743,39.638L114.894,41.109L113.923,42.896L112.437,45.457L110.687,48.149L109.125,50.456L108.173,51.899L106.421,54.371L105.159,56.135L103.644,58.095L102.654,59.342L100.69,61.896L100.482,62.118L98.5,65L96.716,62.405L95.682,61.098L93.963,58.878L91.68,55.838L89.422,52.715L86.201,47.872L84.464,45.086L82.691,42.059L80.691,38.375L79.197,35.182L78.425,33.389L77.88,32.145L77.65,31.411L77.185,29.928L76.869,28.846L76.612,27.882L76.516,27.283ZM98.25,33.5C104.463,33.5 109.5,28.463 109.5,22.25C109.5,16.037 104.463,11 98.25,11C92.037,11 87,16.037 87,22.25C87,28.463 92.037,33.5 98.25,33.5Z"
            style={{
              fill: orange[600],
              stroke: orange[800],
              strokeWidth: 0.5
            }}
          />
          <path
            d="M98.25,33.5C104.463,33.5 109.5,28.463 109.5,22.25C109.5,16.037 104.463,11 98.25,11C92.037,11 87,16.037 87,22.25C87,28.463 92.037,33.5 98.25,33.5Z"
            style={{fill: 'none', stroke: orange[900], strokeWidth: 0.5}}
          />
        </g>
      </g>
    </svg>
  )
}

export default PiMapMarker
