import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import VideojuegoScreen from '../screens/VideojuegoScreen';
import PuntuacionScreen from '../screens/PuntuacionScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
function MyTabs(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="Juego" component={VideojuegoScreen} options={{tabBarIcon:()=>(
            <MaterialIcons name="" size={24} color={'#0ecee1'}/>
        ),headerShown: false}}/>
            <Tab.Screen name="Puntuaciones" component={PuntuacionScreen} options={{tabBarIcon:()=>(
            <MaterialIcons name="star-border" size={24} color={'#0ecee1'}/>
        )}}/>
        </Tab.Navigator>
    )
}
const Stack=createStackNavigator();
function MyStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registrarse" component={RegisterScreen} />
            <Stack.Screen name="Tab" component={MyTabs} />
        </Stack.Navigator>
    )
}

export default function MainNavigator(){
    return(
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    )
}