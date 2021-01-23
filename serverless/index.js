const Router = require('./router')

const allowed = ['https://app.knot.test', 'https://app.knot.works']
/**
 * Example of how router can be used in an application
 *  */
addEventListener('fetch', (event) => {
  const { request } = event

  if (request.method === 'OPTIONS') {
    event.respondWith(handleOptions())
  } else {
    event.respondWith(handleRequest(request))
  }
})

function handleOptions() {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
  }
  return new Response(null, {
    headers: corsHeaders,
  })
}

const headers = new Headers({
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers':
    'Content-Type, X-Requested-With, Accept-Language',
  'Content-Type': 'application/json;charset=UTF-8',
})

async function fetchNearby(request) {
  const { lat, long, query = '' } = await request.json()
  let res
  if (query) {
    res = await fetch(
      `https://api.foursquare.com/v2/venues/search?ll=${lat},${long}&query=${query}&client_id=${FOURSQUARE_CLIENT_ID}&client_secret=${FOURSQUARE_CLIENT_SECRET}&v=20200829`
    )
  } else {
    res = await fetch(
      `https://api.foursquare.com/v2/venues/search?ll=${lat},${long}&client_id=${FOURSQUARE_CLIENT_ID}&client_secret=${FOURSQUARE_CLIENT_SECRET}&v=20200829`
    )
  }
  const data = await res.json()

  return new Response(JSON.stringify(data), { headers })
}

async function fetchCurrentLocation(request) {
  const { lat, long } = await request.json()
  const res = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=${OPENCAGE_API_KEY}`
  )
  const data = await res.json()

  return new Response(JSON.stringify(data), { headers })
}

async function fetchLinkPreview(request) {
  const { url } = await request.json()
  const res = await fetch(
    `https://api.linkpreview.net?key=${LINKPREVIEW_API_KEY}&q=${url}`
  )
  const data = await res.json()

  return new Response(JSON.stringify(data), { headers })
}

async function handleRequest(request) {
  if (allowed.includes(request.headers.get('origin'))) {
    const r = new Router()
    // Replace with the appropriate paths and handlers
    r.post('/current-location', (request) => fetchCurrentLocation(request))
    r.post('/nearby', (request) => fetchNearby(request))
    r.post('/link-preview', (request) => fetchLinkPreview(request))

    const resp = await r.route(request)
    return resp
  }
}
