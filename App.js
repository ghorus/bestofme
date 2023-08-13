import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SetWrkOut from './screens/setWrkOut';
import Home from './screens/home';
import HowToUse from './screens/howToUse';
export default function App () {
    const Stack = createNativeStackNavigator()
    
    return (
        <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Workout" component={SetWrkOut}/>
        <Stack.Screen name="How to Use" component={HowToUse}/>
        </Stack.Navigator>
        </NavigationContainer>
    );
}