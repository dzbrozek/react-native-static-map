import type * as React from 'react';
import type { ImageProps } from 'react-native';

export interface LatLng {
  latitude: number;
  longitude: number;
}

export interface Size {
  width: number;
  height: number;
}

export type Format = 'png8' | 'png' | 'png32' | 'gif' | 'jpg' | 'jpg-baseline';

export type MapType = 'roadmap' | 'satellite' | 'terrain' | 'hybrid';

export type Anchor =
  | [number, number]
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'center'
  | 'topleft'
  | 'topright'
  | 'bottomleft'
  | 'bottomright';

export type MarkerLocation = string | LatLng;

export interface Marker {
  size?: 'tiny' | 'mid' | 'small';
  color?: string;
  label?: string;
  scale?: 1 | 2 | 4;
  locations?: MarkerLocation[];
  icon?: string;
  anchor?: Anchor;
}

export type MapStyle = Record<string, string | number | boolean>;

export type GoogleStaticMapProps = Omit<ImageProps, 'source'> & {
  apiKey: string;
  signature?: string;
  center?: string | LatLng;
  zoom?: number;
  size: Size;
  scale?: 1 | 2;
  format?: Format;
  mapType?: MapType;
  language?: string;
  region?: string;
  markers?: Marker[];
  mapStyles?: MapStyle[];
  visible?: string[];
  ImageComponent?: React.ComponentType<ImageProps>;
};
