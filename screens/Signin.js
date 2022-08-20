import { ImageBackground, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import Text from '@kaloraat/react-native-text';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Input from '../components/Input';
import Button from '../components/Button';
import axios from 'axios'
import { AuthContext } from '../context/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signin = ({ navigation }) => {
	const [auth, setAuth] = useContext(AuthContext);

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [loading, setLoading] = useState(false)

	const handleSubmit = async () => {
		try {
			setLoading(true)
			const {data} = await axios.post('/signin', {
				email,
				password
			})
			if (data.error) {
				alert(data.error)
				setLoading(false)
			} else {
				setAuth(data)
				await AsyncStorage.setItem('@auth', JSON.stringify(data));
				alert("Login successful")
				//setLoading(false)
				navigation.navigate("Home")
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
							Login
						</Text>
                        
						<Input 
							name="Email" 
							value={email} 
							setValue={setEmail} 
							keyboardType='email-address'
						/>
						<Input 
							name="Password" 
							value={password} 
							setValue={setPassword} 
							secureTextEntry={true} 
						/>

						<Button title="Submit" loading={loading} handleSubmit={handleSubmit} />

                        <Text small center style={{ color: "#fff", marginTop: 10 }}>
                            Don't have an account?{" "}
                            <Text 
                                onPress={() => navigation.navigate("Signup")} 
                                style={{ color: "#fff" }}
                            >
                                Register
                            </Text>
                        </Text>

                        <Text small center style={{ color: "#fff", marginTop: 10 }}>
                            <Text 
                                center
                                small
                                onPress={() => navigation.navigate("ForgotPassword")} 
                                style={{ color: "#fff", marginTop: 10 }}
                            >
                                Forgot Password
                            </Text>
                        </Text>
					</View>
				</KeyboardAwareScrollView>
			</ImageBackground>	
	)
}

export default Signin