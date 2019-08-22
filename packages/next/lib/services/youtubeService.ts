// cspell:ignore maxres
import fetch from 'isomorphic-unfetch'
import {stringify} from 'querystringify'
import ErrorResponse from '@lib/ErrorResponse'

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

const API_KEY = process.env.NEXT_YOUTUBE_API_KEY || ''
const BASE_URL = 'https://www.googleapis.com/youtube/v3'

const fetchPlaylistItemsSnippets = async (
  playlistId: string
): Promise<PlayListItems> => {
  try {
    const qs = stringify(
      {part: 'snippet', playlistId: playlistId, key: API_KEY},
      true
    )
    const url = `${BASE_URL}/playlistItems${qs}`
    const response = await fetch(url)
    if (response.ok) {
      const data: PlayListItems = await response.json()
      return data
    } else {
      const text = await response.text()
      const error: ErrorResponse = new Error(text || response.statusText)
      error.response = response
      throw error
    }
  } catch (error) {
    console.warn(error)
    return {
      items: [],
      eTag: '',
      kind: '',
      pageInfo: ''
    }
  }
}

export {fetchPlaylistItemsSnippets}
