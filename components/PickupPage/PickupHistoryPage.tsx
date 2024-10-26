import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigationTypes";
import { db } from '../../firebaseConfig';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

type PickupHistoryPageNavigationProp = StackNavigationProp<RootStackParamList, "Pickup History">;

type PickupHistoryProps = {
  navigation: PickupHistoryPageNavigationProp;
};

const PickupHistoryPage: React.FC<PickupHistoryProps> = ({ navigation }) => {
  const [pickupRequests, setPickupRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPickupRequests = async () => {
      const pickupCollectionRef = collection(db, 'pickup');
      const q = query(pickupCollectionRef, orderBy('createdAt', 'asc')); 
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const requests = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPickupRequests(requests);
        setLoading(false);
      }, (error) => {
        Alert.alert('Error', 'Could not fetch pickup history: ' + error.message);
        setLoading(false);
      });

      return () => unsubscribe(); 
    };

    fetchPickupRequests();
  }, []);

  const renderPickupRequest = ({ item }: { item: any }) => (
    <View style={styles.requestContainer}>
      <Text style={[styles.requestText, styles.boldText]}>ID </Text>
      <Text style={[styles.requestText, styles.semiBoldText]}>{item.id}</Text>
      <View style={styles.divider} />
      <Text style={[styles.requestText, styles.boldText]}>Requested Date / Time </Text>
      <Text style={[styles.requestText, styles.semiBoldText]}>{item.createdAt}</Text>
      <View style={styles.divider} />
      <View style={styles.statusContainer}>
        <View style={[styles.statusCircle, { backgroundColor: item.status ? 'green' : 'orange' }]} />
        <Text style={styles.statusText}>
          {item.status ? 'Picked Up' : 'Pending'}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <FlatList
          data={pickupRequests}
          renderItem={renderPickupRequest}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e4ede7',
  },
  requestContainer: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#CED4DA',
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5, 
  },
  requestText: {
    fontSize: 14,
    color: '#333',
  },
  boldText: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  semiBoldText: {
    fontWeight: '600', 
    color: 'gray'
  },
  divider: {
    height: 1, 
    backgroundColor: '#CED4DA',
    marginVertical: 10, 
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  statusCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#495057',
  },
});

export default PickupHistoryPage;
