import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapPage from '../MapPage/MapPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import PickupPage from '../PickupPage/PickupPage';
import Blogs from '../Blogs/Blogs';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
      <Tab.Navigator>
        <Tab.Screen 
          name="Drop Off" 
          component={MapPage} 
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="map" size={size} color={color} />
            ),
          }} 
        />
        <Tab.Screen 
          name="Pick Up" 
          component={PickupPage} 
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="description" size={size} color={color} />
            ),
          }} 
        />
        <Tab.Screen name="Blogs" component={Blogs} 
            options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="newspaper" size={size} color={color} />
            ),
            }} 
        />
        <Tab.Screen name="Profile" component={ProfilePage} 
            options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="person" size={size} color={color} />
            ),
            }} 
        />
    
      </Tab.Navigator>
    );
  }