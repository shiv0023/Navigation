import React from 'react'
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Tab from './src/Components/Tab';

const App = () => {
  return (

    <NavigationContainer>
      <View style={{ flex: 1 }} >
        <Tab />
      </View>
    </NavigationContainer>




  )
}

export default App