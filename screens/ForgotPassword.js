import { ImageBackground, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import Text from '@kaloraat/react-native-text';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Input from '../components/Input';
import Button from '../components/Button';
import axios from 'axios'
import { AuthContext } from '../context/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ForgotPassword = ({ navigation }) => {
    const [auth, setAuth] = useContext(AuthContext);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [resetCode, setResetCode] = useState("")
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        try {
            setLoading(true)
            const { data } = await axios.post('/forgot-password', {
                email,
            })
            if (data.error) {
                alert(data.error)
                setLoading(false)
            } else {
                alert("Enter the new password and reset code we send in your email")
                setVisible(true)
                setLoading(false)
            }
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    const handlePasswordReset = async () => {
        try {
            setLoading(true)
            const { data } = await axios.post('/reset-password', {
                email,
                password,
                resetCode
            })
            if (data.error) {
                alert(data.error)
                setLoading(false)
            } else {
                alert("Now you can login with your new password")
                setLoading(false)
                navigation.navigate("Signin");
            }
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    return (
        <ImageBackground
            resizeMode='cover'
            source={require('../assets/fractal.jpeg')}
            style={{
                flex: 1,
                width: "100%",
            }}
        >
            <KeyboardAwareScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: "center",
                    flexDirection: "column"
                }}
            >
                <View style={{ flex: 1, justifyContent: "center", margin: 20 }}>
                    <Text title heavy center color="#fff" style={{ marginBottom: 50 }}>
                        Forgot Password
                    </Text>

                    <Input
                        name="Email"
                        value={email}
                        setValue={setEmail}
                        keyboardType='email-address'
                    />
                    {
                        visible && (
                            <>
                                <Input
                                    name="Password"
                                    value={password}
                                    setValue={setPassword}
                                    secureTextEntry={true}
                                />

                                <Input
                                    name="Reset Code"
                                    value={resetCode}
                                    setValue={setResetCode}
                                />
                            </>
                        )
                    }

                    <Button 
                        title="Submit" 
                        loading={loading} 
                        handleSubmit={visible ? handlePasswordReset : handleSubmit} 
                    />

                    <Text
                        center
                        small
                        onPress={() => navigation.navigate("Signin")}
                        style={{ color: "#fff", marginTop: 10 }}
                    >
                        Login
                    </Text>
                </View>
            </KeyboardAwareScrollView>
        </ImageBackground>
    )
}

export default ForgotPassword