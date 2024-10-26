import React from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigationTypes";
import { StatusBar } from 'expo-status-bar'

type BlogsProps = {
  navigation: StackNavigationProp<RootStackParamList>;
};

const Blogs: React.FC<BlogsProps> = ({ navigation }) => {
  const blogPosts = [
    { id: '1', title: 'The Dangers of E-Waste', route: 'Blog1', image: require('../../assets/electronics.jpg') },
    { id: '2', title: '3 Methods for E-Waste Disposal', route: 'Blog2', image: require('../../assets/truck.jpg') },
  ];

  const handleCardPress = (route: keyof RootStackParamList) => {
    navigation.navigate(route);
  };

  return (
    <View style={styles.container}> 
        <StatusBar style='dark' />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        {blogPosts.map((blog) => (
            <View key={blog.id}>
            <TouchableOpacity style={styles.card} onPress={() => handleCardPress(blog.route as keyof RootStackParamList)}>
                <Image source={blog.image} style={styles.image} />
                <Text style={styles.cardTitle}>{blog.title}</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            </View>
        ))}
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
container: {
flex: 1, 
    backgroundColor: '#e4ede7', 
},
scrollContainer: {
    padding: 20,
  },
card: {
    flexDirection: 'row', 
    alignItems: 'center',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '20%', 
    height: 60, 
    marginRight: 10, 
    resizeMode: 'cover',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    flex: 1, 
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
});

export default Blogs;
