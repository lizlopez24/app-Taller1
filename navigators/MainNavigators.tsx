import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import VideojuegoScreen from '../screens/VideojuegoScreen';
import PuntuacionScreen from '../screens/PuntuacionScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { MaterialIcons } from '@expo/vector-icons';
import PerfilScreen from '../screens/PerfilScreen';
import BienvenidaScreen from '../screens/BienvenidaScreen';


const Tab = createBottomTabNavigator();
function MyTabs(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="Juego" component={VideojuegoScreen} options={{tabBarIcon:()=>(
            <MaterialIcons name="pets" size={24} color={'#0ecee1'}/>
        )}}/>
            <Tab.Screen name="Puntuaciones" component={PuntuacionScreen} options={{tabBarIcon:()=>(
            <MaterialIcons name="star-border" size={24} color={'#0ecee1'}/>
        )}}/>
            <Tab.Screen name='Perfil' component={PerfilScreen} options={{tabBarIcon:()=>(
            <MaterialIcons name="account-circle" size={24} color={'#0ecee1'}/>
        )}}/>
        </Tab.Navigator>
    )
}
const Stack=createStackNavigator();
function MyStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Bienvenida" component={BienvenidaScreen} />
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