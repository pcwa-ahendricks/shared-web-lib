import {VercelRequest, VercelResponse} from '@vercel/node'
import {sql} from '@vercel/postgres'
import {NewsReleaseResultRow} from 'src/@types/pg'

export type NewsReleaseRow = Omit<
  NewsReleaseResultRow,
  'modified_at' | 'created_at' | 'published_at' | 'hidden'
> & {published_at: string}

const mainHandler = async (_req: VercelRequest, res: VercelResponse) => {
  try {
    // const {query} = req
    // let {
    //   ...
    // } = query // using request query

    // retrieve data from pg db, and pdfs only (likely isn't necessary)
    const {rows} =
      await sql<NewsReleaseResultRow>`SELECT s3_key, title, published_at::text as published_at, id FROM news_releases WHERE s3_key ILIKE '%.pdf' AND hidden != True`

    // if (!validPrefixPath) {
    //   res.status(400).end()
    // }

    res.status(200).json(rows)
    return
  } catch (error) {
    console.log(error)
    res.status(500).end()
  }
}

export default mainHandler
