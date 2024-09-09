// components/Map.tsx
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { TOKEN} from "src/types/token-mapbox"
mapboxgl.accessToken = TOKEN;

interface MapProps {
  destinationLat: number;
  destinationLon: number;
}

const Map = ({ destinationLat, destinationLon }: MapProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [currentPosition, setCurrentPosition] = useState<{ lat: number; lon: number } | null>(null);

  useEffect(() => {
    // Lấy vị trí hiện tại của người dùng
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setCurrentPosition({ lat, lon });
      },
      (error) => {
        console.error('Lỗi khi lấy vị trí:', error);
      }
    );
  }, []);

  useEffect(() => {
    if (!currentPosition) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [currentPosition.lon, currentPosition.lat],
      zoom: 12,
    });

    map.on('load', async () => {
      // Gọi Directions API để tính toán đường đi từ vị trí hiện tại đến đích
      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${currentPosition.lon},${currentPosition.lat};${destinationLon},${destinationLat}?geometries=geojson&access_token=${mapboxgl.accessToken}`;
      const response = await fetch(url);
      const data = await response.json();

      const route = data.routes[0].geometry;

      // Vẽ tuyến đường trên bản đồ
      map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: route,
        },
      });

      map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#3887be',
          'line-width': 5,
        },
      });

      // Thêm điểm hiện tại và điểm đích
      new mapboxgl.Marker({ color: 'green' })
        .setLngLat([currentPosition.lon, currentPosition.lat])
        .addTo(map);

      new mapboxgl.Marker({ color: 'red' })
        .setLngLat([destinationLon, destinationLat])
        .addTo(map);
    });

    return () => map.remove();
  }, [currentPosition, destinationLat, destinationLon]);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '700px' }} />;
};

export default Map;
