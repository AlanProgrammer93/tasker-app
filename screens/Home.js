import { View } from 'react-native'
import React, { useContext } from 'react'
import Text from '@kaloraat/react-native-text';
import { AuthContext } from '../context/auth';

const Home = () => {
    const [auth, setAuth] = useContext(AuthContext);

    return (
        <View>
            <Text>Home</Text>
        </View>
    )
}

export default Home