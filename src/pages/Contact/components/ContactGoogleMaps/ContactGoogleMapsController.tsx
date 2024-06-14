import React, { useState } from 'react';

export default function ContactGoogleMapsController() {
  const position = { lat: -0.04537975764603188, lng: 109.33170594171672 };
  const [open, setOpen] = useState(false);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const mapId = import.meta.env.VITE_MAP_ID;

  return {
    position,
    open,
    setOpen,
    apiKey,
    mapId,
  };
}
