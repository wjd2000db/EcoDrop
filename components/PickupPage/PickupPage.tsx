import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigationTypes";
import { db } from '../../firebaseConfig';  
import { collection, addDoc } from 'firebase/firestore';  
import Button from '@/constants/Button';

type PickupPageNavigationProp = StackNavigationProp<RootStackParamList, "Main">;

type PickupProps = {
  navigation: PickupPageNavigationProp;
};

const PickupPage: React.FC<PickupProps> = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [contact, setContact] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 

  const handleHistory = () => {
    navigation.navigate("Pickup History");
  };
  
  const handleSchedulePickup = async () => {
    const currentTimestamp = new Date();
    
    if (!firstName || !lastName || !address || !postalCode || !contact || !description) {
      setErrorMessage('Please enter all blanks');
      return;
    }
  
    try {
      const docRef = await addDoc(collection(db, 'pickup'), {
        date: date.toDateString(),
        time: time.toLocaleTimeString(),
        firstName,
        lastName,
        address,
        postalCode,
        contact,
        description,
        createdAt: currentTimestamp.toString(),
        status: false
      });
  
      Alert.alert('Success!', `Pickup scheduled with ID: ${docRef.id}`);
      setErrorMessage('');
  
      setFirstName('');
      setLastName('');
      setAddress('');
      setPostalCode('');
      setContact('');
      setDescription('');
      setDate(new Date());
      setTime(new Date());
  
    } catch (error: any) {
      Alert.alert('Error', 'Could not schedule pickup: ' + error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Button title="See Request History" onPress={handleHistory} />
        <View style={styles.divider} />

        <Text style={styles.label}>Pickup Date</Text>
        <View style={styles.pickerContainer}>
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => setDate(selectedDate || date)}
          />
        </View>

        <Text style={styles.label}>Pickup Time</Text>
        <View style={styles.pickerContainer}>
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={(event, selectedTime) => setTime(selectedTime || time)}
          />
        </View>

        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
        />

        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
        />

        <Text style={styles.label}>Postal Code</Text>
        <TextInput
          style={styles.input}
          value={postalCode}
          onChangeText={setPostalCode}
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={contact}
          onChangeText={setContact}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Description of Equipment</Text>
        <TextInput
          style={styles.inputBox}
          value={description}
          onChangeText={setDescription}
          multiline
        />

        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

        <Button title="Submit" onPress={handleSchedulePickup} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: '#e4ede7', 
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#495057',
  },
  input: {
    fontSize: 18,
    height: 50,
    borderColor: '#CED4DA', 
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'white', 
    shadowColor: '#000', 
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2, 
  },
  inputBox: {
    height: 100,
    borderColor: '#CED4DA',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  pickerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
  divider: {
    borderBottomWidth: 2,
    borderBottomColor: 'lightgray',
    marginVertical: 20,
  },
});

export default PickupPage;