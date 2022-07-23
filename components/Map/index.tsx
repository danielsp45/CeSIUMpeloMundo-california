import { MapContainer, TileLayer, LayersControl } from 'react-leaflet';
import Marker from '~/components/Marker';
import type { Pin } from '~/components/Marker';

type Tyle = {
  name: string;
  url: string;
  checked?: boolean;
};

const tiles: Tyle[] = [
  {
    name: 'Earth',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    checked: true
  },
  {
    name: 'Light',
    url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png'
  },
  {
    name: 'Dark',
    url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
  }
];

const TileController = ({ url, name, checked }: Tyle) => (
  <LayersControl.BaseLayer checked={checked} name={name}>
    <TileLayer
      url={url}
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    />
  </LayersControl.BaseLayer>
);

export default function Map({ pins }: { pins: Pin[] }) {
  return (
    <MapContainer
      center={[40, 0]}
      zoom={5}
      scrollWheelZoom={true}
      style={{ height: '100vh' }}
    >
      <LayersControl position="topright">
        {tiles.map((tile) => (
          <TileController key={tile.name} {...tile} />
        ))}
      </LayersControl>
      {pins.map((pin) => (
        <Marker key={`${pin.coordinates}-${pin.author}`} {...pin} />
      ))}
    </MapContainer>
  );
}
