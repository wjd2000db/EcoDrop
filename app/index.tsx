import React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, LogBox } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from '@/components/LoginPage/LoginPage';
import PickupHistoryPage from '@/components/PickupPage/PickupHistoryPage';
import SignupPage from '@/components/LoginPage/SignupPage';
import Blog1 from '@/components/Blogs/Blog1';
import Blog2 from '@/components/Blogs/Blog2';
import { auth } from '@/firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
import TabNavigator from '@/components/Tabs/TabNavigator';


const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState<User | null>(null); 
  LogBox.ignoreAllLogs();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    
    return () => unsubscribe();
  }, []);

  return (
    <Stack.Navigator initialRouteName="Login">
      {user ? (
        <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="Signup" component={SignupPage} options={{ headerShown: false }} />
      )}
      <Stack.Screen name="Pickup History" component={PickupHistoryPage} />
      <Stack.Screen name="Signin" component={LoginPage}  options={{ headerShown: false }}/>
      <Stack.Screen name="Blog1" component={Blog1} />
      <Stack.Screen name="Blog2" component={Blog2} />
    </Stack.Navigator>
  );
}
