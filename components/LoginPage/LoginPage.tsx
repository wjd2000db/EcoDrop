import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ImageBackground, ActivityIndicator } from 'react-native';
import { auth } from '../../firebaseConfig'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types/navigationTypes";
import { StatusBar } from 'expo-status-bar';
import Button from '@/constants/Button'; // Button 컴포넌트 경로에 맞게 수정

type LoginPageNavigationProp = StackNavigationProp<
    RootStackParamList,
    "Signin"
>;

type LoginProps = {
    navigation: LoginPageNavigationProp;
};

const LoginPage: React.FC<LoginProps> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(true); // 이미지 로딩 상태

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            //console.log(auth.currentUser); 
            navigation.navigate("Home");
        } catch (error: any) {
            Alert.alert('Error', error.message);
        }
    };

    // 배경 이미지가 로드되면 호출되는 함수
    const handleImageLoad = () => {
        setIsLoading(false); // 이미지가 로드되면 로딩 상태를 false로 변경
    };

    return (
        <ImageBackground 
            source={require('../../assets/background.png')} 
            style={styles.background}
            onLoad={handleImageLoad} 
        >
            <StatusBar style='dark' />
            <View style={styles.container}>
                {isLoading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="green" />
                    </View>
                ) : (
                    <>
                        <View style={styles.circle} />
                        <Text style={styles.title}>EcoDrop</Text>
                        <View style={styles.formContainer}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                placeholder="Enter your email"
                                placeholderTextColor="#888"
                            />
                            <Text style={styles.label}>Password</Text>
                            <TextInput
                                style={styles.input}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                placeholder="Enter your password"
                                placeholderTextColor="#888"
                            />
                            <Button title="Sign In" onPress={handleLogin} />
                            <Text style={styles.signupPrompt}>
                                New to Eco Drop?{' '}
                                <Text 
                                    style={styles.signupLink} 
                                    onPress={() => navigation.navigate("Signup")}
                                >
                                    Join Now
                                </Text>
                            </Text>
                        </View>
                    </>
                )}
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent', // 로딩 화면 배경색을 투명으로 설정
    },
    background: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'flex-start', 
        alignItems: 'center',
    },
    circle: {
        position: 'absolute',
        top: -100, 
        left: -100, 
        width: 250, 
        height: 250,
        borderRadius: 150,
        backgroundColor: 'greenyellow',
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 40, 
        marginTop: '35%', 
        color: 'lightgoldenrodyellow', 
    },
    formContainer: {
        backgroundColor: 'white', 
        borderRadius: 10,
        padding: 20,
        width: '100%', 
        alignItems: 'center',
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.2, 
        shadowRadius: 4,
    },
    label: {
        fontSize: 18,
        fontWeight: 'semibold',
        alignSelf: 'flex-start',
        marginBottom: 5,
        width: '100%', 
        color: '#333', 
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        width: 250,
        padding: 10,
    },
    signupPrompt: {
        marginTop: 20,
        fontSize: 16,
        color: '#333',
    },
    signupLink: {
        color: 'green', 
        textDecorationLine: 'underline',
    },
});

export default LoginPage;
