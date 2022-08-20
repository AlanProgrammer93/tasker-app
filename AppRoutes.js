import { Button, StyleSheet, Text, View } from 'react-native';
import Signup from './screens/Signup';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './screens/Home';
import { useContext } from 'react';
import { AuthContext } from './context/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Signin from './screens/Signin';
import ForgotPassword from './screens/ForgotPassword';
import Feather from 'react-native-vector-icons/Feather'
import Tasks from './screens/Tasks';
import Add from './screens/Add';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

export default function AppRoutes() {
    const [auth, setAuth] = useContext(AuthContext);
    const authenticated = auth?.token !== '' && auth?.user !== null;

    const logout = async () => {
        setAuth({ user: null, token: "" })
        await AsyncStorage.removeItem("@auth")
    }

    const Home = () => {
        return (
            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: { height: 100 },
                }}
            >
                <Tab.Screen 
                    name='Tasks'
                    component={Tasks}
                    options={{
                        tabBarLabel: ({ focused, color, size }) => (
                            <Text style={{ color: focused ? "#433362" : color }}>Tasks</Text>
                        ),
                        tabBarIcon: ({ focused, color, size }) => (
                            <Feather 
                                name={focused ? "database" : "minimize"}
                                size={size}
                                color={focused ? "#433362" : color}
                            />
                        )
                    }}
                />
                <Tab.Screen 
                    name='Add'
                    component={Add}
                    options={{
                        tabBarLabel: ({ focused, color, size }) => (
                            <Text style={{ color: focused ? "#433362" : color }}>Add</Text>
                        ),
                        tabBarIcon: ({ focused, color, size }) => (
                            <Feather 
                                name={focused ? "database" : "minimize"}
                                size={size}
                                color={focused ? "#433362" : color}
                            />
                        )
                    }}
                />
            </Tab.Navigator>
        )
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                {
                    authenticated ? (
                        <>
                            <Stack.Screen
                                name='Home'
                                component={Home}
                                options={{
                                    headerTitle: "Tasker",
                                    headerRight: () => (
                                        //<Button title='Logout' onPress={logout} color="#333" />
                                        <Feather name="log-out" onPress={logout} size={16} />
                                    )
                                }}
                            />
                        </>
                    ) : (
                        <>
                            <Stack.Screen
                                name='Signup'
                                component={Signup}
                                options={{
                                    headerShown: false
                                }}
                            />
                            <Stack.Screen
                                name='Signin'
                                component={Signin}
                                options={{
                                    headerShown: false
                                }}
                            />
                            <Stack.Screen
                                name='ForgotPassword'
                                component={ForgotPassword}
                                options={{
                                    headerShown: false
                                }}
                            />
                        </>
                    )
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}

