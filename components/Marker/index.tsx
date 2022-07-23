import Image from 'next/image';
import { Marker as MarkerContainer, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import {
  getFullDateString,
  getRelativeTimeString,
  getNameString
} from '~/lib/utils';

import styles from './style.module.css';

type PinType = 'sticker' | 'picture' | 'special';

export interface Pin {
  author: string;
  city: string;
  country: string;
  coordinates: number[];
  date: string;
  photo: string;
  type?: PinType;
}

const getIcon = (type: PinType): Icon => {
  switch (type) {
    case 'sticker':
    case 'picture':
    case 'special':
      return new Icon({
        iconUrl: `/images/markers/${type}.png`,
        iconSize: [40, 80]
      });
    default:
      throw new Error(`Unknown action: ${type}`);
  }
};

const Marker = ({
  type,
  coordinates,
  city,
  country,
  author,
  photo,
  date
}: Pin) => {
  const icon = getIcon(type);

  return (
    <MarkerContainer icon={icon} position={coordinates}>
      <Popup>
        <div>
          <div className={styles.text}>
            <h1>{country}</h1>
            <h2>{city}</h2>
            {date && (
              <i>
                {getFullDateString(date)} ({getRelativeTimeString(date)})
              </i>
            )}
            <br />
            <span>{getNameString(author)}</span>
          </div>
          <Image
            alt={`${getNameString(author)} at ${city}`}
            src={photo}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </Popup>
    </MarkerContainer>
  );
};

export default Marker;
