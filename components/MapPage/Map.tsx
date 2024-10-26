import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';  // For handling location

interface MapPageProps {
  locations: {
    Latitude: number;
    Longitude: number;
    Name: string;
  }[];
  selectedLocation: {
    Latitude: number;
    Longitude: number;
    Name: string;
  } | null; 
}

const Map: React.FC<MapPageProps> = ({ locations, selectedLocation }) => {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    })();
  }, []);

  if (!userLocation) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="green" />
        {errorMsg && <Text>{errorMsg}</Text>}
        {!errorMsg && <Text>Loading map...</Text>}
      </View>
    );
  }

  const initialRegion = selectedLocation
    ? {
        latitude: selectedLocation.Latitude,
        longitude: selectedLocation.Longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      }
    : {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        region={selectedLocation ? initialRegion : undefined} 
        showsUserLocation={true}  
        followsUserLocation={true}  
      >
  
        {locations.map((location, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: location.Latitude,
              longitude: location.Longitude,
            }}
            title={location.Name} 
          />
        ))}
        {selectedLocation && (
          <Marker
            coordinate={{
              latitude: selectedLocation.Latitude,
              longitude: selectedLocation.Longitude,
            }}
            pinColor="red" 
            title={selectedLocation.Name}
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Map;
