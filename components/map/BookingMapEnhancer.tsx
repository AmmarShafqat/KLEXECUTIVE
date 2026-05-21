'use client'

import { useEffect, useState, type RefObject } from 'react'
import { createPortal } from 'react-dom'
import {
  APIProvider,
  Map,
  useMap,
  useMapsLibrary,
} from '@vis.gl/react-google-maps'

export type Place = {
  address: string
  location: { lat: number; lng: number }
}

export type RouteSummary = {
  miles: number
  minutes: number
}

type Props = {
  pickupRef: RefObject<HTMLInputElement | null>
  destRef: RefObject<HTMLInputElement | null>
  pickup: Place | null
  destination: Place | null
  onPickup: (p: Place | null) => void
  onDestination: (p: Place | null) => void
  onRoute?: (summary: RouteSummary | null) => void
  mapSlotId: string
}

const NYC_CENTER = { lat: 40.7128, lng: -74.006 }

/**
 * Great-circle distance in miles between two lat/lng points. Used as the
 * Directions API fallback when that API is disabled / blocked / out-of-quota.
 */
function haversineMiles(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const R_MILES = 3958.8
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const lat1 = toRad(a.lat)
  const lat2 = toRad(b.lat)
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
  return 2 * R_MILES * Math.asin(Math.sqrt(h))
}

export default function BookingMapEnhancer({
  pickupRef,
  destRef,
  pickup,
  destination,
  onPickup,
  onDestination,
  onRoute,
  mapSlotId,
}: Props) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_CLIENT_ID || undefined

  if (!apiKey) return null

  return (
    <APIProvider apiKey={apiKey} libraries={['places', 'routes']}>
      <AutocompleteAttacher inputRef={pickupRef} onSelect={onPickup} />
      <AutocompleteAttacher inputRef={destRef} onSelect={onDestination} />
      <MapPortal
        slotId={mapSlotId}
        pickup={pickup}
        destination={destination}
        mapId={mapId}
        onRoute={onRoute}
      />
    </APIProvider>
  )
}

function AutocompleteAttacher({
  inputRef,
  onSelect,
}: {
  inputRef: RefObject<HTMLInputElement | null>
  onSelect: (p: Place | null) => void
}) {
  const places = useMapsLibrary('places')

  useEffect(() => {
    if (!places || !inputRef.current) return
    const ac = new places.Autocomplete(inputRef.current, {
      fields: ['geometry.location', 'formatted_address', 'name'],
      componentRestrictions: { country: ['us'] },
    })
    const listener = ac.addListener('place_changed', () => {
      const place = ac.getPlace()
      const loc = place.geometry?.location
      if (!loc) return
      onSelect({
        address: place.formatted_address || place.name || '',
        location: { lat: loc.lat(), lng: loc.lng() },
      })
    })
    return () => {
      listener.remove()
    }
  }, [places, inputRef, onSelect])

  return null
}

function MapPortal({
  slotId,
  pickup,
  destination,
  mapId,
  onRoute,
}: {
  slotId: string
  pickup: Place | null
  destination: Place | null
  mapId?: string
  onRoute?: (summary: RouteSummary | null) => void
}) {
  const [el, setEl] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setEl(document.getElementById(slotId))
  }, [slotId])

  if (!el) return null

  const center = pickup?.location || NYC_CENTER

  return createPortal(
    <Map
      defaultCenter={center}
      defaultZoom={11}
      gestureHandling="cooperative"
      disableDefaultUI={false}
      mapTypeControl={false}
      streetViewControl={false}
      fullscreenControl={false}
      mapId={mapId}
      style={{ width: '100%', height: '100%' }}
    >
      <RouteRenderer
        pickup={pickup}
        destination={destination}
        onRoute={onRoute}
      />
    </Map>,
    el
  )
}

// Gate the legacy DirectionsService call. When false (default), we skip the
// call entirely — no polyline, no REQUEST_DENIED / "legacy API" console errors,
// and distance + duration come from a coordinate estimate. Flip to "true" in
// .env once the Directions API is enabled on your Google Cloud project.
const DIRECTIONS_ENABLED =
  process.env.NEXT_PUBLIC_GOOGLE_DIRECTIONS_ENABLED === 'true'

function estimateFromCoords(
  pickup: Place,
  destination: Place,
): RouteSummary {
  // Haversine straight-line × 1.3 (city driving factor), / 28 mph for time.
  const straight = haversineMiles(pickup.location, destination.location)
  const drivingMiles = straight * 1.3
  const minutes = Math.max(1, Math.round((drivingMiles / 28) * 60))
  return { miles: drivingMiles, minutes }
}

function RouteRenderer({
  pickup,
  destination,
  onRoute,
}: {
  pickup: Place | null
  destination: Place | null
  onRoute?: (summary: RouteSummary | null) => void
}) {
  const map = useMap()
  const routes = useMapsLibrary('routes')
  const [renderer, setRenderer] =
    useState<google.maps.DirectionsRenderer | null>(null)

  // Only spin up a DirectionsRenderer when we're actually going to use the
  // Directions API. Otherwise we still get a clean map with no polyline.
  useEffect(() => {
    if (!DIRECTIONS_ENABLED || !routes || !map) return
    const r = new routes.DirectionsRenderer({
      map,
      suppressMarkers: false,
      preserveViewport: false,
      polylineOptions: {
        strokeColor: '#a88a4f',
        strokeWeight: 4,
        strokeOpacity: 0.85,
      },
    })
    setRenderer(r)
    return () => {
      r.setMap(null)
    }
  }, [routes, map])

  useEffect(() => {
    // No origin/destination yet — clear any drawn route + clear the estimate.
    if (!pickup || !destination) {
      renderer?.set('directions', null)
      onRoute?.(null)
      return
    }

    // Flag off → never call DirectionsService. Emit the coordinate estimate
    // immediately so /quote receives miles + minutes.
    if (!DIRECTIONS_ENABLED) {
      onRoute?.(estimateFromCoords(pickup, destination))
      return
    }

    // Flag on → try Directions, fall back to coordinate estimate on any error.
    if (!routes || !renderer) return
    const service = new routes.DirectionsService()
    service.route(
      {
        origin: pickup.location,
        destination: destination.location,
        travelMode: routes.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === routes.DirectionsStatus.OK && result) {
          renderer.setDirections(result)
          const leg = result.routes?.[0]?.legs?.[0]
          if (leg?.distance && leg.duration) {
            onRoute?.({
              miles: leg.distance.value / 1609.344,
              minutes: Math.round(leg.duration.value / 60),
            })
          }
          return
        }
        if (process.env.NODE_ENV !== 'production') {
          console.info(
            `[BookingMap] Directions API call failed (${status}) — using coordinate estimate.`,
          )
        }
        renderer.set('directions', null)
        onRoute?.(estimateFromCoords(pickup, destination))
      },
    )
  }, [renderer, routes, pickup, destination, onRoute])

  useEffect(() => {
    if (!map) return
    if (pickup && !destination) {
      map.panTo(pickup.location)
      map.setZoom(13)
    }
  }, [map, pickup, destination])

  return null
}
