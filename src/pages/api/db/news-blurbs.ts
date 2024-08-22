import {VercelRequest, VercelResponse} from '@vercel/node'
import {sql} from '@vercel/postgres'
import {NewsBlurbResultRow, NewsReleaseResultRow} from 'src/@types/pg'

export type NewsReleaseRow = Omit<
  NewsReleaseResultRow,
  'modified_at' | 'created_at' | 'published_at' | 'hidden'
> & {published_at: string}

const mainHandler = async (_req: VercelRequest, res: VercelResponse) => {
  try {
    // retrieve data from pg db
    const {rows, rowCount} =
      await sql<NewsBlurbResultRow>`SELECT id, body, title, link_url, cta_caption, published_at::text as published_at
                                    FROM news_blurbs
                                    WHERE env_production = TRUE AND visible = TRUE`

    if (!(rowCount > 0)) {
      res.status(400).end()
    }

    res.status(200).json(rows)
    return
  } catch (error) {
    console.log(error)
    res.status(500).end()
  }
}

export default mainHandler
