import React from 'react'
import { Text, View } from 'react-native'

const About = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'red', backgroundColor: 'black', padding: 10, borderRadius: 4 }} onPress={() => navigation.navigate('Home')} >About Screen</Text>
        </View>
    )
}

export default About