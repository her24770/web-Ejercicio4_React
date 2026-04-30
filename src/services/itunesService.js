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

export async function getArtistDetail(artistId) {
  const res = await fetch(`${BASE_URL}/lookup?id=${artistId}&entity=song&limit=10`)
  const data = await res.json()
  return data.results
}

export async function getTopArtists() {
  const res = await fetch(`${BASE_URL}/us/rss/topartists/limit=10/json`)
  const data = await res.json()
  return data.feed.entry
}

export async function getArtistAlbums(artistId) {
  const res = await fetch(`${BASE_URL}/lookup?id=${artistId}&entity=album&limit=10`)
  const data = await res.json()
  return data.results
}
