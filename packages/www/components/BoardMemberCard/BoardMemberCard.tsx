import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Link from 'next/link'

type Props = {
  district: number
  imageSrc: string
  name: string
}

const useStyles = makeStyles({
  card: {
    width: 170
  },
  media: {
    height: 235
  }
})

const BoardMemberCard = ({district, name, imageSrc}: Props) => {
  const classes = useStyles()

  return (
    <Link
      href="/board-of-directors/[district]"
      as={`/board-of-directors/district-${district}`}
      passHref
      scroll={false}
    >
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={imageSrc}
            // title={`District ${district}`}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              District {district}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  )
}

export default BoardMemberCard
