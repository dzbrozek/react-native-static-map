import React from 'react';
import { Image } from 'react-native';
import queryString from 'query-string';

import type {
  Anchor,
  GoogleStaticMapProps,
  LatLng,
  Marker,
  MarkerLocation,
  MapStyle,
} from './types';

export const MAP_ENDPOINT = 'https://maps.googleapis.com/maps/api/staticmap';

const GoogleStaticMap: React.FunctionComponent<GoogleStaticMapProps> = ({
  apiKey,
  signature,
  center,
  zoom,
  size,
  scale,
  format,
  mapType,
  language,
  region,
  markers = [],
  mapStyles = [],
  ImageComponent = Image,
  children,
  ...props
}) => {
  const formatCenter = (centerValue: string | LatLng): string => {
    if (typeof centerValue === 'string') {
      return centerValue;
    }
    return `${centerValue.latitude},${centerValue.longitude}`;
  };

  const formatMarkerAnchor = (anchor?: Anchor): string | undefined => {
    if (!anchor) {
      return anchor;
    }
    if (Array.isArray(anchor)) {
      return `anchor:${anchor[0]},${anchor[1]}`;
    }
    return `anchor:${anchor}`;
  };

  const formatMarkerLocations = (locations: MarkerLocation[]): string[] => {
    return locations.map((location) => {
      if (typeof location === 'string') {
        return location;
      }
      return `${location.latitude},${location.longitude}`;
    });
  };

  const formatMarkers = (marker: Marker[]): string[] => {
    return marker.map(
      ({
        size: markerSize,
        color: markerColor,
        label: markerLabel,
        scale: markerScale,
        locations: markerLocations = [],
        icon: markerIcon,
        anchor: markerAnchor,
      }): string => {
        return [
          markerSize ? `size:${markerSize}` : markerSize,
          markerColor ? `color:${markerColor}` : markerColor,
          markerLabel ? `label:${markerLabel}` : markerLabel,
          markerScale ? `scale:${markerScale}` : markerScale,
          formatMarkerAnchor(markerAnchor),
          markerIcon ? `icon:${markerIcon}` : markerIcon,
          ...formatMarkerLocations(markerLocations),
        ]
          .filter(Boolean)
          .join('|');
      }
    );
  };

  const formatMapStyles = (styles: MapStyle[]): string[] => {
    return styles.map(({ feature, element, ...rules }): string => {
      return [
        feature ? `feature:${feature}` : feature,
        element ? `element:${element}` : element,
        ...Object.entries(rules).map(([key, value]) => `${key}:${value}`),
      ]
        .filter(Boolean)
        .join('|');
    });
  };

  const hasMarkers = !!markers.length;

  if (!hasMarkers) {
    if (center === undefined) {
      throw new Error(`"center" is required without markers`);
    }
    if (zoom === undefined) {
      throw new Error(`"zoom" is required without markers`);
    }
  }

  const mapParams = {
    key: apiKey,
    signature,
    center: center ? formatCenter(center) : center,
    zoom: zoom !== undefined ? String(zoom) : zoom,
    size: `${Math.round(size.width)}x${Math.round(size.height)}`,
    scale: scale ? String(scale) : scale,
    format,
    maptype: mapType,
    language,
    region,
    markers: formatMarkers(markers),
    style: formatMapStyles(mapStyles),
  };

  const imageURL = queryString.stringifyUrl(
    {
      url: MAP_ENDPOINT,
      query: mapParams,
    },
    {
      arrayFormat: 'none',
    }
  );

  return (
    <ImageComponent
      {...props}
      source={{
        uri: imageURL,
      }}
    >
      {children}
    </ImageComponent>
  );
};

export default GoogleStaticMap;
