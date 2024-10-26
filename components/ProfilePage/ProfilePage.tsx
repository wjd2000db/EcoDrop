import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, ActivityIndicator, Image, Alert, TextInput, TouchableOpacity } from 'react-native';
import { auth } from '../../firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore'; 
import { db } from '../../firebaseConfig';  
import Button from '@/constants/Button';
import {
    useMediaLibraryPermissions,
    launchImageLibraryAsync,
    MediaTypeOptions,
} from 'expo-image-picker';
import { useUserProfile } from '@/hooks/useUserProfile';

const ProfilePage = () => {
    const { userProfile, loading: profileLoading } = useUserProfile(); 
    const [editing, setEditing] = useState(false);
    const [firstName, setFirstName] = useState(userProfile?.firstName || '');
    const [lastName, setLastName] = useState(userProfile?.lastName || '');
    const [email, setEmail] = useState(userProfile?.email || '');
    const [address, setAddress] = useState(userProfile?.address || '');
    const [phone, setPhone] = useState(userProfile?.phone || '');
    const [newImageUri, setNewImageUri] = useState('');
    const [albumPermissionInfomation, requestAlbumPermission] = useMediaLibraryPermissions();

    const handleEditToggle = () => {
        setEditing(!editing);
    };

    const albumVerifyPermissions = async () => {
        if (albumPermissionInfomation?.status === 'granted') {
            return true;
        }
        if (albumPermissionInfomation?.status === 'denied') {
            return false;
        }
        const permissionResponse = await requestAlbumPermission();
        return permissionResponse.granted;
    };

    const handleImagePick = async () => {
        const hasPermission = await albumVerifyPermissions();
        if (!hasPermission) {
            return;
        }

        const image = await launchImageLibraryAsync({
            mediaTypes: MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });

        if (!image.canceled) {
            setNewImageUri(image.assets[0].uri);
            await updateUserImage(image.assets[0].uri);
        }
    };

    const updateUserImage = async (uri: string) => {
        const user = auth.currentUser;
        if (user) {
            const docRef = doc(db, 'users', user.uid);
            try {
                await updateDoc(docRef, { imageUrl: uri });
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleSave = async () => {
        const user = auth.currentUser;
        if (user) {
            const docRef = doc(db, 'users', user.uid);
            try {
                await updateDoc(docRef, { 
                    firstName: firstName || userProfile?.firstName, 
                    lastName: lastName || userProfile?.lastName, 
                    email: email? email : userProfile?.email, 
                    address: address || userProfile?.address, 
                    phone: phone || userProfile?.phone, 
                    imageUrl: newImageUri || userProfile?.imageUri  
                });
                Alert.alert('Success', 'User information updated successfully!');
                setEditing(false);
            } catch (error) {
                Alert.alert('Error', 'Failed to update user information.');
                console.error(error);
            }
        }
    };

    const handleCancel = () => {
        setEditing(false);
        setFirstName(userProfile?.firstName || '');
        setLastName(userProfile?.lastName || '');
        setEmail(userProfile?.email || '');
        setAddress(userProfile?.address || '');
        setPhone(userProfile?.phone || '');
        setNewImageUri(''); 
    };

    const handleSignOut = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (userProfile) {
            setFirstName(userProfile.firstName);
            setLastName(userProfile.lastName);
            setEmail(userProfile.email);
            setAddress(userProfile.address);
            setPhone(userProfile.phone);
        }
    }, [userProfile]);

    if (profileLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Image
                source={newImageUri ? { uri: newImageUri } : userProfile?.imageUri ? { uri: userProfile?.imageUri } : require('../../assets/user.png')}
                style={styles.userImage}
            />
            {editing ? (
                <TouchableOpacity style={styles.editButton} onPress={handleImagePick}>
                    <Text style={styles.editText}>Change Profile Image</Text>
                </TouchableOpacity>
            ) : null}
            {editing ? (
                <>
                    <TextInput 
                        style={styles.input} 
                        placeholder="First Name"
                        placeholderTextColor="gray"
                        value={firstName} 
                        onChangeText={setFirstName} 
                    />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Last Name"
                        placeholderTextColor="gray"
                        value={lastName} 
                        onChangeText={setLastName} 
                    />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Email"
                        placeholderTextColor="gray"
                        value={email} 
                        onChangeText={setEmail} 
                    />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Address"
                        placeholderTextColor="gray"
                        value={address} 
                        onChangeText={setAddress} 
                    />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Phone Number"
                        placeholderTextColor="gray"
                        value={phone} 
                        onChangeText={setPhone} 
                        keyboardType="phone-pad"
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <Button title="Update Info" onPress={handleSave} />
                    </View>
                </>
            ) : (
                <>
                    <View style={styles.labelContainer}>
                        <Text style={styles.labelBold}>First Name:</Text>
                        <Text style={styles.labelSemiBold}>{userProfile?.firstName}</Text>
                    </View>
                    <View style={styles.labelContainer}>
                        <Text style={styles.labelBold}>Last Name:</Text>
                        <Text style={styles.labelSemiBold}>{userProfile?.lastName}</Text>
                    </View>
                    <View style={styles.labelContainer}>
                        <Text style={styles.labelBold}>Email:</Text>
                        <Text style={styles.labelSemiBold}>{userProfile?.email}</Text>
                    </View>
                    <View style={styles.labelContainer}>
                        <Text style={styles.labelBold}>Address:</Text>
                        <Text style={styles.labelSemiBold}>{userProfile?.address}</Text>
                    </View>
                    <View style={styles.labelContainer}>
                        <Text style={styles.labelBold}>Phone:</Text>
                        <Text style={styles.labelSemiBold}>{userProfile?.phone}</Text>
                    </View>
                    <Button title="Edit" onPress={handleEditToggle} />
                </>
            )}
    
            <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
                <Text style={styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
      scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#e4ede7',
    },
    userImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#4CAF50',
    },
    editButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 20,
        marginBottom: 20,
    },
    editText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#4CAF50',
        borderRadius: 5,
        padding: 10,
        marginVertical: 5,
        backgroundColor: 'white',
        width: '100%',
        fontSize: 16,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    labelContainer: {
        width: '80%',
        height: 40,
        padding: 10,
        borderWidth: 1,
        borderColor: '#4CAF50',
        borderRadius: 5,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        marginBottom: 15,
        flexDirection: 'row', 
        alignItems: 'center', 
    },
    labelBold: {
        fontSize: 18,
        fontWeight: 'bold', 
        color: '#555',
        width: '50%', 
    },
    labelSemiBold: {
        fontSize: 16,
        fontWeight: '600', 
        color: '#777',
        width: '50%', 
    },
    cancelButton: {
        backgroundColor: 'darkred',
        padding: 10,
        borderRadius: 30,
        marginRight: 40,
        width: 100,
        height: 40,
        borderWidth: 2, 
        borderColor: 'brown',
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    cancelText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
        textAlign: 'center', 
    },
    buttonContainer: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        width: '100%',
        marginTop: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signOutButton: {
        position: 'absolute', 
        top: 40, 
        right: 20, 
        padding: 10, 
    },
    
    signOutText: {
        fontSize: 20,
        fontWeight: '600', 
        textDecorationLine: 'underline', 
        color: '#4CAF50', 
    },
});

export default ProfilePage;
