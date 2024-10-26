import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, Pressable } from 'react-native';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigationTypes";
import { auth } from '../../firebaseConfig'; 
import { useUserProfile } from '@/hooks/useUserProfile';

type MainPageNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Main"
>;

type MainProps = {
  navigation: MainPageNavigationProp;
};

const MainPage: React.FC<MainProps> = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false); 
  const { userProfile, loading } = useUserProfile();
  const [profileImage, setProfileImage] = useState<string | null>(null);


  useEffect(() => {
    if (userProfile) {
      setProfileImage(userProfile.imageUri);
    }
  }, [userProfile]); 


  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigation.navigate("Signin");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.profileIcon}
        onPress={() => setModalVisible(true)} // 메뉴 열기
      >
        <Image
          source={profileImage ? { uri: profileImage } : require('../../assets/user.png')} 
          style={styles.icon}
        />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Pressable onPress={() => { setModalVisible(false); navigation.navigate("Profile"); }}>
              <Text style={styles.modalItem}>My Profile</Text>
            </Pressable>
            <Pressable onPress={() => { setModalVisible(false); handleSignOut(); }}>
              <Text style={styles.modalItem}>Sign Out</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Text style={styles.title}>Welcome to Eco Drop</Text>
      <TouchableOpacity
        style={styles.button} 
        onPress={() => navigation.navigate("Book a Pick Up")}
      >
        <Text style={styles.buttonText}>Book a Pick Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Near drop-off Locations")}
      >
        <Text style={styles.buttonText}>Find Near Drop-off Location</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Pickup History")}
      >
        <Text style={styles.buttonText}>View Pickup Request History</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Blog1")}
      >
        <Text style={styles.buttonText}>What is E-Waste?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Blog2")}
      >
        <Text style={styles.buttonText}>3 Ways to Recycle E-Waste</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  profileIcon: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  icon: {
    width: 60, 
    height: 60,
    borderRadius: 30
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContent: {
    width: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalItem: {
    fontSize: 18,
    paddingVertical: 10,
    textAlign: 'center',
  },
});

export default MainPage;
