import React from 'react'
import Link from 'next/link'
import {
  CardActionArea,
  CardContent,
  CardMedia,
  Card,
  Typography as Type
} from '@mui/material'

type Props = {
  district: number
  imageSrc: string
  name: string
  chair?: boolean
  viceChair?: boolean
}

const BoardMemberCard = ({
  district,
  name,
  imageSrc,
  chair = false,
  viceChair = false
}: Props) => {
  const style = {
    card: {
      width: 170
    },
    media: {
      height: 235,
      position: 'relative'
    }
  }
  return (
    <Link
      href="/board-of-directors/[district]"
      as={`/board-of-directors/district-${district}`}
      scroll={false}
    >
      <Card sx={{...style.card}}>
        <CardActionArea>
          {/* <Box position="absolute" bottom={5} right={5}>
            {chair ? <Chip size="small" label="Chair" color="primary" /> : null}
          </Box>
          <Box position="absolute" bottom={5} right={5}>
            {viceChair ? (
              <Chip size="small" label="Vice Chair" color="primary" />
            ) : null}
          </Box> */}
          <CardMedia
            sx={{...style.media}}
            image={imageSrc}
            // title={`District ${district}`}
          />
          <CardContent>
            <Type gutterBottom variant="h5" component="h2">
              {name}
            </Type>
            <Type variant="body2" color="textSecondary" component="p">
              District {district}
              {chair ? <em> - Chair</em> : null}
              {viceChair ? <em> - Vice Chair</em> : null}
            </Type>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  )
}

export default BoardMemberCard
