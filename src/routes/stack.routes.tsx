import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Schedulling } from '../screens/Schedulling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { SchedulingComplete } from '../screens/SchedulingComplete';
import { Mycars } from '../components/Mycars';

const { Navigator, Screen } = createNativeStackNavigator();

export function StackRoutes(){
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name='Home' component={Home} />
            <Screen name='CarDetails' component={CarDetails} />
            <Screen name='Schedulling' component={Schedulling} />
            <Screen name='SchedulingDetails' component={SchedulingDetails} />
            <Screen name='SchedulingComplete' component={SchedulingComplete} />
            <Screen name='MyCars' component={Mycars} />
        </Navigator>
    )
}