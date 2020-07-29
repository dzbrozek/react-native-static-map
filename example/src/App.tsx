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
  const [apiKey, setApiKey] = React.useState('');

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
      </ScrollView>
    </SafeAreaView>
  );
}
