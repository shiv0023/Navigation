import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Fedd from './Fedd';
import Article from './Article';
import { NavigationContainer } from '@react-navigation/native';


// const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <NavigationContainer>

      <Drawer.Navigator>
        <Drawer.Screen name="Feed" component={Fedd} />
        <Drawer.Screen name="Article" component={Article} />
      </Drawer.Navigator>
    </NavigationContainer>


  );
}

export default MyDrawer;