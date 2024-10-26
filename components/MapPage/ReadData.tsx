import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

type Location = {
  id: string;
  Address: string;
  Latitude: number;
  Longitude: number;
  Name: string;
  Phone: string;
};

interface ReadDataProps {
  onDataFetched: (locations: Location[]) => void;
  onLocationSelect: (location: Location) => void;
}

export default function ReadData({ onDataFetched, onLocationSelect }: ReadDataProps) {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'drop_off_locations'));
        const locationsData: Location[] = [];
        querySnapshot.forEach((doc) => {
          locationsData.push({ id: doc.id, ...doc.data() } as Location);
        });
        setLocations(locationsData);
        onDataFetched(locationsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Loading data...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {locations.map((location, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => {
            onLocationSelect(location);
          }}
        >
          <Text style={styles.buttonTitle}>{location.Name}</Text>
          <Text style={styles.buttonText}>{location.Address}</Text>
          <Text style={styles.buttonText}>{location.Phone}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#28a745',
    borderRadius: 20, 
    width: '80%', 
    padding: 15, 
    marginVertical: 8,
    elevation: 5, 
    shadowColor: '#28a745', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonTitle: {
    color: 'darkslategrey',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonText: {
    color: 'gray',
    textAlign: 'center',
    fontSize: 15,
  },
});
