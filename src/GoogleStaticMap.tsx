import React from 'react';
import { Image } from 'react-native';
import queryString from 'query-string';

import type {
  Anchor,
  GoogleStaticMapProps,
  LatLng,
  Marker,
  Location,
  MapStyle,
  Path,
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
  visible,
  paths = [],
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

  const formatLocations = (locations: Location[]): string[] => {
    return locations.map((location) => {
      if (typeof location === 'string') {
        return location;
      }
      return `${location.latitude},${location.longitude}`;
    });
  };

  const formatMarkers = (mapMarkers: Marker[]): string[] => {
    return mapMarkers.map(
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
          ...formatLocations(markerLocations),
        ]
          .filter(Boolean)
          .join('|');
      }
    );
  };

  const formatPaths = (mapPaths: Path[]): string[] => {
    return mapPaths.map(
      ({ weight, color, fillcolor, geodesic, enc, points = [] }): string => {
        return [
          weight ? `weight:${weight}` : weight,
          color ? `color:${color}` : color,
          fillcolor ? `fillcolor:${fillcolor}` : fillcolor,
          geodesic ? `geodesic:${geodesic}` : geodesic,
          enc ? `enc:${enc}` : enc,
          ...formatLocations(points),
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

  const requireCenterAndZoom = !markers.length && !paths.length;

  if (requireCenterAndZoom) {
    if (center === undefined) {
      throw new Error(`"center" is required without markers or paths`);
    }
    if (zoom === undefined) {
      throw new Error(`"zoom" is required without markers or paths`);
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
    path: formatPaths(paths),
    visible: visible ? visible.join('|') : visible,
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
