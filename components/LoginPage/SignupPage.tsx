import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { auth } from '../../firebaseConfig'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; 
import { db } from '../../firebaseConfig';  
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigationTypes";
import Checkbox from 'expo-checkbox'; 
import Button from '@/constants/Button';
import { StatusBar } from 'expo-status-bar';

type SignupPageNavigationProp = StackNavigationProp<
    RootStackParamList,
    "Signup"
>;
type SignupProps = {
    navigation: SignupPageNavigationProp;
};

const SignupPage: React.FC<SignupProps> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [isChecked, setChecked] = useState(false);

    const handleSignup = async () => {
        if (!email || !password || !firstName || !lastName || !address || !phone) {
            Alert.alert('Error', 'Please fill out all fields.');
            return;
        }

        if (!isChecked) {
            Alert.alert('Error', 'Please accept the terms and conditions.');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, 'users', user.uid), {
                firstName: firstName,
                lastName: lastName,
                address: address,
                email: email,
                phone: phone
            });

            Alert.alert('Success', 'User registered successfully!');
            navigation.navigate("Signin");
        } catch (error: any) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style='dark' />
            <Text style={styles.title}>Get Started</Text>

            <Text style={styles.label}>First Name</Text>
            <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="Enter First Name"
                placeholderTextColor={"gray"}
            />

            <Text style={styles.label}>Last Name</Text>
            <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Enter Last Name"
                placeholderTextColor={"gray"}
            />
            
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Enter Email"
                placeholderTextColor={"gray"}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder="Enter Password"
                placeholderTextColor={"gray"}
            />

            <View style={styles.checkboxContainer}>
                <Checkbox
                    value={isChecked}
                    onValueChange={setChecked}
                    style={styles.checkbox}
                />
                <Text style={styles.checkboxLabel}>
                    I accept all the <Text style={styles.termsText}>terms and conditions</Text>
                </Text>
            </View>

            <Button title="Sign Up" onPress={handleSignup} />

            <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
                <Text style={styles.signInText}>
                    already have an account? <Text style={styles.signInLink}>Sign In</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 30,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
        fontWeight: '600',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        padding: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkbox: {
        marginRight: 10,
    },
    checkboxLabel: {
        fontSize: 16,
        color: '#333',
    },
    termsText: {
        color: 'green', 
        textDecorationLine: 'underline', 
    },
    signInText: {
        marginTop: 20,
        fontSize: 16,
        textAlign: 'center',
    },
    signInLink: {
        color: 'green', 
        textDecorationLine: 'underline',
    },
});

export default SignupPage;
