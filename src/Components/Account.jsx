import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Account = () => {
  return (
    <View style={styles.Mycontainer}>
      <Text>Account</Text>
    </View>
  )
}

export default Account

const styles = StyleSheet.create({
    Mycontainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})