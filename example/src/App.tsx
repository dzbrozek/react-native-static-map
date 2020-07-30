import * as React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import GoogleStaticMap from '@dazik/react-native-static-map';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  scrollContent: {
    marginHorizontal: 20,
  },
  box: {
    marginVertical: 10,
  },
  apiInput: {
    fontSize: 20,
    borderColor: 'red',
    marginHorizontal: 20,
  },
  label: {
    fontSize: 20,
    marginBottom: 4,
  },
  map: {
    width: '100%',
    height: 300,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 4,
  },
});

export default function App() {
  const [apiKey, setApiKey] = React.useState(
    'AIzaSyA3kg7YWugGl1lTXmAmaBGPNhDW9pEh5bo'
  );
  const mapStyles: Record<string, string | number | boolean>[] = [
    {
      element: 'labels',
      visibility: 'off',
      color: '0xf49f53',
    },
    {
      feature: 'landscape',
      color: '0xf9ddc5',
      lightness: -7,
    },
    {
      feature: 'road',
      color: '0x813033',
      lightness: 43,
    },
    {
      feature: 'poi.business',
      color: '0x645c20',
      lightness: 38,
    },
    {
      feature: 'water',
      color: '0x1994bf',
      saturation: -69,
      gamma: 0.99,
      lightness: 43,
    },
    {
      feature: 'road.local',
      element: 'geometry.fill',
      color: '0xf19f53',
      weight: 1.3,
      visibility: 'on',
      lightness: 16,
    },
    {
      feature: 'poi.business',
    },
    {
      feature: 'poi.park',
      color: '0x645c20',
      lightness: 39,
    },
    {
      feature: 'poi.school',
      color: '0xa95521',
      lightness: 35,
    },
    {
      feature: 'poi.medical',
      element: 'geometry.fill',
      color: '0x813033',
      lightness: 38,
      visibility: 'off',
    },
    {
      element: 'labels',
    },
    {
      feature: 'poi.sports_complex',
      color: '0x9e5916',
      lightness: 32,
    },
    {
      feature: 'poi.government',
      color: '0x9e5916',
      lightness: 46,
    },
    {
      feature: 'transit.station',
      visibility: 'off',
    },
    {
      feature: 'transit.line',
      color: '0x813033',
      lightness: 22,
    },
    {
      feature: 'transit',
      lightness: 38,
    },
    {
      feature: 'road.local',
      element: 'geometry.stroke',
      color: '0xf19f53',
      lightness: -10,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        value={apiKey}
        onChangeText={setApiKey}
        placeholder="Enter API Key"
        style={styles.apiInput}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.box}>
          <Text style={styles.label}>Simple Map</Text>
          <GoogleStaticMap
            apiKey={apiKey}
            style={styles.map}
            size={{
              height: 300,
              width: Dimensions.get('window').width,
            }}
            center={{
              latitude: 51.510033,
              longitude: -0.108169,
            }}
            zoom={10}
            scale={2}
          />
        </View>

        <View style={styles.box}>
          <Text style={styles.label}>Map with markers</Text>
          <GoogleStaticMap
            size={{
              height: 300,
              width: Dimensions.get('window').width,
            }}
            apiKey={apiKey}
            style={styles.map}
            scale={2}
            markers={[
              {
                scale: 2 as const,
                locations: [
                  {
                    latitude: 51.5048,
                    longitude: -0.0917,
                  },
                ],
                icon: 'https://goo.gl/5y3S82',
              },
              {
                locations: ['London bridge'],
                label: 'B',
                color: 'orange',
              },
            ]}
          />
        </View>

        <View style={styles.box}>
          <Text style={styles.label}>Map with custom style</Text>
          <GoogleStaticMap
            size={{
              height: 300,
              width: Dimensions.get('window').width,
            }}
            apiKey={apiKey}
            style={styles.map}
            zoom={13}
            scale={2}
            center="New York"
            mapStyles={mapStyles}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
