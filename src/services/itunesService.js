const BASE_URL = 'https://itunes.apple.com'

export async function getTopSongs() {
  const res = await fetch(`${BASE_URL}/us/rss/topsongs/limit=20/json`)
  const data = await res.json()
  return data.feed.entry
}

export async function searchMusic(query) {
  const res = await fetch(`${BASE_URL}/search?term=${encodeURIComponent(query)}&media=music&limit=25`)
  const data = await res.json()
  return data.results
}

export async function lookupById(id) {
  const res = await fetch(`${BASE_URL}/lookup?id=${id}`)
  const data = await res.json()
  return data.results[0]
}

export async function searchYouTubeVideo(nombre, artista) {
  const query = encodeURIComponent(`${nombre} ${artista} official`)
  const key = import.meta.env.VITE_YOUTUBE_API_KEY
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=1&key=${key}`
  )
  const data = await res.json()
  return data.items?.[0]?.id?.videoId || null
}

export async function getArtistTopSong(artistId) {
  const res = await fetch(`${BASE_URL}/lookup?id=${artistId}&entity=song&limit=2`)
  const data = await res.json()
  return data.results.find(r => r.wrapperType === 'track')
}
