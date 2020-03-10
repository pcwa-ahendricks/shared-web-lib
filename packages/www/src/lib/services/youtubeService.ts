// cspell:ignore maxres
// import {stringify} from 'querystringify'
// import fetchOk from '@lib/fetch-ok'

export interface PlayListItems {
  eTag: string
  kind: string
  pageInfo: any
  items: PlayListItem[]
}

// snippet is the only property used
export interface PlayListItem {
  id: string
  eTag: string
  kind: string
  snippet: PlayListItemSnippet
}

interface YoutubeItemThumbnail {
  url: string
  width: number
  height: number
}

export interface PlayListItemSnippet {
  publishedAt: string
  channelId: string
  channelTitle: string
  playlistId: string
  position: number
  title: string
  description: string
  thumbnails: {
    default: YoutubeItemThumbnail
    medium: YoutubeItemThumbnail
    high: YoutubeItemThumbnail
    standard: YoutubeItemThumbnail
    maxres: YoutubeItemThumbnail
  }
  resourceId: {
    kind: string
    videoId: string
  }
}

// const API_KEY = process.env.NEXT_YOUTUBE_API_KEY || ''
// const youtubeApiUrl = 'https://www.googleapis.com/youtube/v3'

// const fetchPlaylistItemsSnippets = async (playlistId: string) => {
//   try {
//     const qs = stringify(
//       {part: 'snippet', playlistId: playlistId, key: API_KEY},
//       true
//     )
//     const url = `${youtubeApiUrl}/playlistItems${qs}`
//     return await fetchOk<PlayListItems>(url)
//   } catch (error) {
//     console.warn(error)
//     return {
//       items: [],
//       eTag: '',
//       kind: '',
//       pageInfo: ''
//     }
//   }
// }

// export {fetchPlaylistItemsSnippets}
