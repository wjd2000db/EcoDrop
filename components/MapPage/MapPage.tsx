import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Map from '@/components/MapPage/Map';
import ReadData from '@/components/MapPage/ReadData';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigationTypes";

interface Location {
  Latitude: number;
  Longitude: number;
  Name: string;
}

type MapPageNavigationProp = StackNavigationProp<RootStackParamList, "Main">;

type MapProps = {
  navigation: MapPageNavigationProp;
};

const MapPage: React.FC<MapProps> = ({ navigation }) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Map locations={locations} selectedLocation={selectedLocation} />
      </View>

      <View style={styles.separator} />

      <View style={styles.dataContainer}>
        <ReadData onDataFetched={setLocations} onLocationSelect={handleLocationSelect} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4ede7',
    padding: 10,
  },
  mapContainer: {
    height: Dimensions.get('window').height / 2.5,
    backgroundColor: '#e0e0e0', 
    borderRadius: 15, 
    overflow: 'hidden', 
    marginBottom: 10,
    elevation: 4, 
  },
  separator: {
    height: 2,
    backgroundColor: '#b8b8b8', 
    marginVertical: 10,
  },
  dataContainer: {
    flex: 1,
    backgroundColor: '#f5fff8', 
    borderRadius: 15, 
    overflow: 'hidden', 
    elevation: 4, 
    padding: 10, 
  },
});

export default MapPage;
