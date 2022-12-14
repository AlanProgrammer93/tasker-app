import { ImageBackground, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import Text from '@kaloraat/react-native-text';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Input from '../components/Input';
import Button from '../components/Button';
import axios from 'axios'
import { AuthContext } from '../context/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signup = ({ navigation }) => {
	const [auth, setAuth] = useContext(AuthContext);

	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [confirm, setConfirm] = useState("")
	const [loading, setLoading] = useState(false)

	const handleSubmit = async () => {
		try {
			if (password !== confirm) {
				alert("Passwords do not match")
				return
			}

			setLoading(true)
			const {data} = await axios.post('/signup', {
				name,
				email,
				password
			})
			if (data.error) {
				alert(data.error)
				setLoading(false)
			} else {
				setAuth(data)
				await AsyncStorage.setItem('@auth', JSON.stringify(data));
				alert("Registration successful")
				setLoading(false)
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
							Register
						</Text>

						<Input 
							name="Name" 
							value={name} 
							setValue={setName} 
							autoCapitalize="words"
						/>
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
						<Input 
							name="Confirm Password" 
							value={confirm} 
							setValue={setConfirm}
							secureTextEntry={true} 
						/>

						<Button title="Submit" loading={loading} handleSubmit={handleSubmit} />
					
						<Text small center style={{ color: "#fff", marginTop: 10 }}>
                            Already registered?{" "}
                            <Text 
                                onPress={() => navigation.navigate("Signin")} 
                                style={{ color: "#fff" }}
                            >
                                Login
                            </Text>
                        </Text>
					</View>
				</KeyboardAwareScrollView>
			</ImageBackground>	
	)
}

export default Signup