import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from './HomeScreen';
import Reorder from './Fedd';
import Cart from './Cart';
import Account from './Account';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
       tabBarActiveTintColor:'red'
      }}>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({ size, focused }) => {
            return (
              <Image 
                style={{ width: 40, height: 30, tintColor: focused ? 'red' : 'black' }}
                source={require('./Images/home.png')}
              />
            );
          }
        }} 
      />
      <Tab.Screen
        name="Settings"
        component={Reorder}
        options={{
          headerShown: false,
          title: 'Settings',
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <Image
              style={{ width: 35, height: 30, tintColor: focused ? 'red' : 'black' }}
                source={require('./Images/Vector.png')}
              />
            );
          },
        }}
      />
      <Tab.Screen 
        name="Cart" 
        component={Cart} 
        options={{
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <Image
              style={{ width: 40, height: 30, tintColor: focused ? 'red' : 'grey' }}
                source={require('./Images/shopping_cart.png')}
              />
            );
          }
        }} 
      />
      <Tab.Screen 
        name="Account" 
        component={Account}
        options={{
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <Image 
              style={{ width: 35, height: 36, tintColor: focused ? 'red' : 'black' }}
                source={require('./Images/Vectors.png')}
              />
            );
          }
        }} 
      />
    </Tab.Navigator>
  );
}
