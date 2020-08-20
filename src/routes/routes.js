import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

const Stack = createStackNavigator();

import SplashScreen from '../pages/SplashScreen';
import SelectPartner from '../pages/SelectPartner';
import CpfForm from '../pages/CpfForm';
import CheckCard from '../pages/CheckCard';
import Home from '../pages/Home';
import Historic from '../pages/Historic';
import SelectBeer from '../pages/SelectBeer';
import TapBeer from '../pages/TapBeer';
import PhoneForm from '../pages/PhoneForm';
import CodeForm from '../pages/CodeForm';
import DataForm from '../pages/DataForm';
import ConfirmRegister from '../pages/ConfirmRegister';

const Routes = () => {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName={'SplashScreen'} headerMode="none">
        <Stack.Screen name="SplashScreen" component={SplashScreen}/>
        <Stack.Screen name="SelectPartner" component={SelectPartner}/>
        <Stack.Screen name="CpfForm" component={CpfForm}/>

        <Stack.Screen name="CheckCard" component={CheckCard}/>

        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Historic" component={Historic}/>
        <Stack.Screen name="SelectBeer" component={SelectBeer}/>
        <Stack.Screen name="TapBeer" component={TapBeer}/>
        <Stack.Screen name="PhoneForm" component={PhoneForm}/>
        <Stack.Screen name="CodeForm" component={CodeForm}/>
        <Stack.Screen name="DataForm" component={DataForm}/>
        <Stack.Screen name="ConfirmRegister" component={ConfirmRegister}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;