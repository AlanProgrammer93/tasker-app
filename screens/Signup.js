import { ImageBackground, View } from 'react-native'
import React from 'react'
import Text from '@kaloraat/react-native-text';

const Signup = () => {
	return (
			<ImageBackground
				resizeMode='cover'
				source={require('../assets/fractal.jpeg')}
				style={{
					flex: 1,
					width: "100%",
				}}
			>
				<View style={{ flex: 1, justifyContent: "center" }}>
					<Text title heavy center color="#fff">
						Register
					</Text>
				</View>
			</ImageBackground>	
	)
}

export default Signup