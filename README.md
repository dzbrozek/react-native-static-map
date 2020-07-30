# react-native-static-map

React Native wrapper for Google Maps Static API

## Installation

```sh
npm install @dazik/react-native-static-map
```

```sh
yarn add @dazik/react-native-static-map
```

## Example

### Simple map

```js
import GoogleStaticMap from "@dazik/react-native-static-map";

const styles = StyleSheet.create({
  map: {
    width: 300,
    height: 200,
  },
});


<GoogleStaticMap
  center={{
    latitude: 13.061,
    longitude: 54.177
  }}
  style={styles.map}
  zoom={10}
  size={{
    width: 300,
    height: 200
  }}
  apiKey={'YOUR-API-KEY'}
/>
```

### Map with markers

```js
<GoogleStaticMap
  size={{
    height: 300,
    width: 200
  }}
  style={styles.map}
  apiKey="API_KEY"
  markers={[
    {
      scale: 2,
      locations: [
        {
          latitude: 51.5048,
          longitude: -0.0917
        }
      ],
      icon: 'https://goo.gl/5y3S82'
    }, {
      locations: ['London bridge'],
      label: 'B',
      color: 'orange'
    }
  ]}
/>
```

### Map with custom style

```js
<GoogleStaticMap
  size={{
    height: 300,
    width: 200
  }}
  style={styles.map}
  apiKey="API_KEY"
  zoom={15}
  center="Brooklyn"
  mapStyles={[
    {
      feature: 'road.local',
      element: 'geometry',
      color: '0x00ff00'
    },
    {
      feature: 'landscape',
      element: 'geometry.fill',
      color: '0x000000'
    },
    {
      element: 'labels',
      invert_lightness: true
    },
    {
      feature: 'road.arterial',
      element: 'labels',
      invert_lightness: false
    }
  ]}
/>
```

## Props

Accepts all props from [Image](http://reactnative.dev/docs/image.html#props) except for `source`.

| Prop                | Required                     | Description                |
|---------------------|------------------------------|----------------------------|
|**`apiKey`**         |`yes`                         | defines API key used to authenticate requests associated with your project. More details got to [get the API key](https://developers.google.com/maps/documentation/maps-static/get-api-key)|
|**`signature`**      |`no`                          | defines digital signature used to verify that any site generating requests using your API key is authorized to do so |
|**`center`**         |`yes`  if markers not present | defines the center of the map, equidistant from all edges of the map. This parameter takes a location as either a object `{latitude: number, longitude: number}`  or a string address (e.g. `city hall, new york, ny`) identifying a unique location on the face of the earth |
|**`zoom`**           |`yes`  if markers not present | defines the zoom level of the map, which determines the magnification level of the map. This parameter takes a numerical value corresponding to the zoom level of the region desired |
|**`size`**           |`yes`                         | defines the rectangular dimensions of the map image. This parameter takes `{width: number, height: number}` as argument. This parameter is affected by the scale parameter; the final output size is the product of the size and scale values. |
|**`scale`**          |`no`                          | affects the number of pixels that are returned. scale=2 returns twice as many pixels as scale=1 while retaining the same coverage area and level of detail (i.e. the contents of the map don't change). This is useful when developing for high-resolution displays. The default value is `1`. Accepted values are `1` and `2`.|
|**`format`**         |`no`                          | defines the format of the resulting image. By default, the Maps Static API creates PNG images. Accepted values are `png8`, `png`, `png32`, `gif`, `jpg` and `jpg-baseline`
|**`mapType`**        |`no`                          | defines the type of map to construct. Default `roadmap`.  Accepted values are `roadmap`, `satellite`, `terrain` and `hybrid` |
|**`language`**       |`no`                          | defines the language to use for display of labels on map tiles |
|**`region`**         |`no`                          | defines the appropriate borders to display, based on geo-political sensitivities |
|**`markers`**        |`no`                          | defines one or more markers to attach to the image at specified locations |
|**`mapStyles`**      |`no`                          | defines one or more styles customizing the presentation of the standard map. Each style may contain `feature`, `element` and set of style rules. Read more about available [options](https://developers.google.com/maps/documentation/maps-static/styling)
|**`ImageComponent`** |`no`                          | defines component used to display map. Default `Image`

To learn more about props visit [official documentation](https://developers.google.com/maps/documentation/maps-static/start).

### Marker

| Prop            | Required                     | Description                |
|-----------------|------------------------------|----------------------------|
|**`size`**       |`no`                          | specifies the size of marker from the set. Default: `mid`. Accepted values are `tiny`, `mid` and `small` |
|**`color`**      |`no`                          | specifies a 24-bit color (example: `0xFFFFCC`) or a predefined color from the set: `black`, `brown`, `green`, `purple`, `yellow`, `blue`, `gray`, `orange`, `red`, `white` |
|**`label`**      |`no`                          | specifies a single uppercase alphanumeric character from the set `{A-Z, 0-9}` |
|**`scale`**      |`no`                          | specifies value that will be multiplied with the marker image size to produce the actual output size of the marker in pixels. Default: `1`. Accepted values are `1`, `2` and `4` |
|**`locations`**  |`no`                          | defines one or more locations defining where to place the marker on the map. Location can be either a object `{latitude: number, longitude: number}`  or a string address (e.g. `city hall, new york, ny`) |
|**`icon`**       |`no`                          | custom icon URL |
|**`anchor`**     |`no`                          | anchor point for the custom icon. Can be array representing `[x, y]` point of the icon (such as `[10, 5]`), or as a predefined alignment: `top`, `bottom`, `left`, `right`, `center`, `topleft`, `topright`, `bottomleft` and `bottomright`


## Example
See the example in the `example` folder.

## License

MIT
