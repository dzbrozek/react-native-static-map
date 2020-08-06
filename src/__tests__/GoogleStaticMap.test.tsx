import React from 'react';
import { render } from '@testing-library/react-native';

import GoogleStaticMap, { MAP_ENDPOINT } from '../GoogleStaticMap';

describe('<GoogleStaticMap />', () => {
  let apiKey: string;

  beforeEach(() => {
    apiKey = 'TEST_KEY';
  });

  describe('fail to render', () => {
    it('should fail to render without zoom', () => {
      const renderComponent = () =>
        render(
          <GoogleStaticMap
            accessibilityRole="image"
            apiKey={apiKey}
            center={{
              latitude: 51.477222,
              longitude: 0,
            }}
            size={{
              width: 400,
              height: 300,
            }}
          />
        );
      expect(renderComponent).toThrowError(
        `"zoom" is required without markers`
      );
    });

    it('should fail to render without center', () => {
      const renderComponent = () =>
        render(
          <GoogleStaticMap
            accessibilityRole="image"
            apiKey={apiKey}
            zoom={14}
            size={{
              width: 400,
              height: 300,
            }}
          />
        );

      expect(renderComponent).toThrowError(
        `"center" is required without markers`
      );
    });
  });

  describe('should render map', () => {
    it('should use latitudes and longitudes as center', () => {
      const { getByRole } = render(
        <GoogleStaticMap
          accessibilityRole="image"
          apiKey={apiKey}
          zoom={14}
          center={{
            latitude: 51.477222,
            longitude: 0,
          }}
          size={{
            width: 400,
            height: 300,
          }}
        />
      );
      expect(getByRole('image').getProp('source')).toEqual({
        uri: `${MAP_ENDPOINT}?center=51.477222%2C0&key=${apiKey}&size=400x300&zoom=14`,
      });
    });

    it('should use address as center', () => {
      const { getByRole } = render(
        <GoogleStaticMap
          accessibilityRole="image"
          apiKey={apiKey}
          zoom={14}
          center="Berkeley,CA"
          size={{
            width: 400,
            height: 300,
          }}
        />
      );
      expect(getByRole('image').getProp('source')).toEqual({
        uri: `${MAP_ENDPOINT}?center=Berkeley%2CCA&key=${apiKey}&size=400x300&zoom=14`,
      });
    });

    it('should use custom scale', () => {
      const { getByRole } = render(
        <GoogleStaticMap
          accessibilityRole="image"
          apiKey={apiKey}
          scale={2}
          zoom={14}
          center="Berkeley,CA"
          size={{
            width: 100,
            height: 100,
          }}
        />
      );
      expect(getByRole('image').getProp('source')).toEqual({
        uri: `${MAP_ENDPOINT}?center=Berkeley%2CCA&key=${apiKey}&scale=2&size=100x100&zoom=14`,
      });
    });

    it('should use custom image format', () => {
      const { getByRole } = render(
        <GoogleStaticMap
          accessibilityRole="image"
          apiKey={apiKey}
          zoom={14}
          format="gif"
          center="Berkeley,CA"
          size={{
            width: 100,
            height: 100,
          }}
        />
      );
      expect(getByRole('image').getProp('source')).toEqual({
        uri: `${MAP_ENDPOINT}?center=Berkeley%2CCA&format=gif&key=${apiKey}&size=100x100&zoom=14`,
      });
    });

    it('should use custom map type', () => {
      const { getByRole } = render(
        <GoogleStaticMap
          accessibilityRole="image"
          apiKey={apiKey}
          zoom={14}
          mapType="hybrid"
          center="Berkeley,CA"
          size={{
            width: 400,
            height: 400,
          }}
        />
      );
      expect(getByRole('image').getProp('source')).toEqual({
        uri: `${MAP_ENDPOINT}?center=Berkeley%2CCA&key=${apiKey}&maptype=hybrid&size=400x400&zoom=14`,
      });
    });

    it('should use map type', () => {
      const { getByRole } = render(
        <GoogleStaticMap
          accessibilityRole="image"
          apiKey={apiKey}
          mapType="hybrid"
          center="Berkeley,CA"
          zoom={14}
          size={{
            width: 400,
            height: 400,
          }}
        />
      );
      expect(getByRole('image').getProp('source')).toEqual({
        uri: `${MAP_ENDPOINT}?center=Berkeley%2CCA&key=${apiKey}&maptype=hybrid&size=400x400&zoom=14`,
      });
    });

    it('should show multiple markers with the same style', () => {
      const { getByRole } = render(
        <GoogleStaticMap
          accessibilityRole="image"
          apiKey={apiKey}
          size={{
            width: 400,
            height: 400,
          }}
          markers={[
            {
              color: 'blue',
              label: 'S',
              locations: [
                {
                  latitude: 64.05,
                  longitude: -145.36,
                },
                'Delta Junction, AK',
              ],
            },
          ]}
        />
      );
      expect(getByRole('image').getProp('source')).toEqual({
        uri: `${MAP_ENDPOINT}?key=${apiKey}&markers=color%3Ablue%7Clabel%3AS%7C64.05%2C-145.36%7CDelta%20Junction%2C%20AK&size=400x400`,
      });
    });

    it('should show multiple markers with different style', () => {
      const { getByRole } = render(
        <GoogleStaticMap
          accessibilityRole="image"
          apiKey={apiKey}
          size={{
            width: 400,
            height: 400,
          }}
          markers={[
            {
              color: 'blue',
              label: 'B',
              size: 'small',
              locations: [
                {
                  latitude: 64.05,
                  longitude: -145.36,
                },
              ],
            },
            {
              color: 'red',
              label: 'R',
              size: 'mid',
              locations: ['Delta Junction, AK'],
            },
          ]}
        />
      );
      expect(getByRole('image').getProp('source')).toEqual({
        uri: `${MAP_ENDPOINT}?key=${apiKey}&markers=size%3Asmall%7Ccolor%3Ablue%7Clabel%3AB%7C64.05%2C-145.36&markers=size%3Amid%7Ccolor%3Ared%7Clabel%3AR%7CDelta%20Junction%2C%20AK&size=400x400`,
      });
    });

    it('should use custom markers', () => {
      const { getByRole } = render(
        <GoogleStaticMap
          accessibilityRole="image"
          apiKey={apiKey}
          size={{
            width: 400,
            height: 400,
          }}
          markers={[
            {
              anchor: [32, 10],
              icon: 'https://goo.gl/5y3S82',
              locations: ['Canberra ACT'],
            },
            {
              anchor: 'topleft',
              icon: 'http://tinyurl.com/jrhlvu6',
              locations: ['Melbourne VIC'],
            },
            {
              icon: 'https://goo.gl/1oTJ9Y',
              scale: 2,
              locations: [
                {
                  latitude: -33.865143,
                  longitude: 151.2099,
                },
              ],
            },
          ]}
        />
      );
      expect(getByRole('image').getProp('source')).toEqual({
        uri: `${MAP_ENDPOINT}?key=${apiKey}&markers=anchor%3A32%2C10%7Cicon%3Ahttps%3A%2F%2Fgoo.gl%2F5y3S82%7CCanberra%20ACT&markers=anchor%3Atopleft%7Cicon%3Ahttp%3A%2F%2Ftinyurl.com%2Fjrhlvu6%7CMelbourne%20VIC&markers=scale%3A2%7Cicon%3Ahttps%3A%2F%2Fgoo.gl%2F1oTJ9Y%7C-33.865143%2C151.2099&size=400x400`,
      });
    });

    it('should use custom styles', () => {
      const { getByRole } = render(
        <GoogleStaticMap
          accessibilityRole="image"
          apiKey={apiKey}
          zoom={15}
          center="Brooklyn"
          size={{
            width: 400,
            height: 300,
          }}
          mapStyles={[
            {
              feature: 'road.local',
              element: 'geometry',
              color: '0x00ff00',
            },
            {
              feature: 'landscape',
              element: 'geometry.fill',
              color: '0x000000',
            },
            {
              element: 'labels',
              invert_lightness: true,
            },
            {
              feature: 'road.arterial',
              element: 'labels',
              invert_lightness: false,
            },
          ]}
        />
      );
      expect(getByRole('image').getProp('source')).toEqual({
        uri: `${MAP_ENDPOINT}?center=Brooklyn&key=${apiKey}&size=400x300&style=feature%3Aroad.local%7Celement%3Ageometry%7Ccolor%3A0x00ff00&style=feature%3Alandscape%7Celement%3Ageometry.fill%7Ccolor%3A0x000000&style=element%3Alabels%7Cinvert_lightness%3Atrue&style=feature%3Aroad.arterial%7Celement%3Alabels%7Cinvert_lightness%3Afalse&zoom=15`,
      });
    });

    it('should specify locations that should be visible', () => {
      const { getByRole } = render(
        <GoogleStaticMap
          accessibilityRole="image"
          apiKey={apiKey}
          zoom={14}
          center={{
            latitude: 51.477222,
            longitude: 0,
          }}
          size={{
            width: 400,
            height: 300,
          }}
          visible={[
            '77 Massachusetts Ave, Cambridge, MA',
            'Harvard Square, Cambridge, MA',
          ]}
        />
      );
      expect(getByRole('image').getProp('source')).toEqual({
        uri: `${MAP_ENDPOINT}?center=51.477222%2C0&key=${apiKey}&size=400x300&visible=77%20Massachusetts%20Ave%2C%20Cambridge%2C%20MA%7CHarvard%20Square%2C%20Cambridge%2C%20MA&zoom=14`,
      });
    });

    it('should use paths', () => {
      const { getByRole } = render(
        <GoogleStaticMap
          accessibilityRole="image"
          apiKey={apiKey}
          size={{
            width: 400,
            height: 300,
          }}
          paths={[
            {
              color: '0x0000ff',
              weight: 5,
              points: [
                { latitude: 40.737102, longitude: -73.990318 },
                { latitude: 40.749825, longitude: -73.987963 },
                { latitude: 40.752946, longitude: -73.987384 },
                { latitude: 40.755823, longitude: -73.986397 },
              ],
            },
          ]}
        />
      );
      expect(getByRole('image').getProp('source')).toEqual({
        uri: `${MAP_ENDPOINT}?key=${apiKey}&path=weight%3A5%7Ccolor%3A0x0000ff%7C40.737102%2C-73.990318%7C40.749825%2C-73.987963%7C40.752946%2C-73.987384%7C40.755823%2C-73.986397&size=400x300`,
      });
    });
  });
});
