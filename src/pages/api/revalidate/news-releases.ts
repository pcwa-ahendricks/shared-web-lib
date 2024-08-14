// pages/api/revalidate.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({message: 'Only POST requests allowed'})
  }

  const secret = process.env.REVALIDATE_SSR_TOKEN

  if (!secret || req.query.secret !== secret) {
    return res.status(401).json({message: 'Invalid token'})
  }

  try {
    await res.revalidate('/newsroom/news-releases')
    return res.json({revalidated: true})
  } catch (err) {
    return res
      .status(500)
      .json({error: 'Failed to revalidate /newsroom/news-releases'})
  }
}
