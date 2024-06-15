'use client';

import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import ContactGoogleMapsController from './ContactGoogleMapsController';
export default function ContactGoogleMaps() {
  const { position, open, setOpen, apiKey, mapId } = ContactGoogleMapsController();

  if (!apiKey) {
    console.error('Google Maps API key is missing.');
    return <p>Google Maps cannot be loaded as the API key is missing.</p>;
  }

  return (
    <APIProvider apiKey={apiKey}>
      <div style={{ height: '100%', width: '100%' }}>
        <Map defaultCenter={position} mapId={mapId} defaultZoom={18} gestureHandling={'greedy'}>
          <AdvancedMarker position={position} onClick={() => setOpen(true)}>
            <Pin background={'red'} borderColor={'maroon'} glyphColor={'purple'} />
          </AdvancedMarker>

          {/* {open && (
            <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
              <h2 className="semibold">Trijaya Store</h2>
            </InfoWindow>
          )} */}
        </Map>
      </div>
    </APIProvider>
  );
}
