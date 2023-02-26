import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View } from 'react-native';

import { styles } from './MapScreen.styled';

export const MapScreen = () => {
  return (
    <View style={styles.container}>
      <MapView
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        style={styles.map}
      >
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          title="I am here)"
          description="I see you)"
        />
      </MapView>
    </View>
  );
};
