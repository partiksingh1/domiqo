import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Define the props interface
interface PropertyMapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  height?: string;
  width?: string;
}

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const PropertyMap: React.FC<PropertyMapProps> = ({ 
  latitude, 
  longitude, 
  zoom = 13, 
  height = '400px', 
  width = '100%' 
}) => {
  useEffect(() => {
    // Create map
    const map = L.map('property-map').setView([latitude, longitude], zoom);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add marker
    L.marker([latitude, longitude]).addTo(map);

    // Cleanup map on unmount
    return () => {
      map.remove();
    };
  }, [latitude, longitude, zoom]);

  return (
    <div 
      id="property-map" 
      style={{ 
        height, 
        width, 
        borderRadius: '8px', 
        overflow: 'hidden' 
      }} 
    />
  );
};

export default PropertyMap;