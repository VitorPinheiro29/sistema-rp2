import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import  { createStackNavigator }from '@react-navigation/stack';

import Home from './pages/Home';
import Search from './pages/Search';

{/**Responsável pelo roteamento. Linha essencial, obrigatória */}
const AppStack = createStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator 
             screenOptions={{
                 headerShown: false
             }}>
                <AppStack.Screen name="Home" component={Home}/>
                <AppStack.Screen name="Search" component={Search}/>
            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;
