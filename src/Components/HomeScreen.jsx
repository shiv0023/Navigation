import { View, Text, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import LinearGradient from "react-native-linear-gradient";


export function HomeScreen() {
  return (
    <LinearGradient colors={['#FDF0F3', '#FDF0F3', '#FFFBFC']} style={styles.container}>
    <Text style={styles.buttonText}>
      Sign in with Facebook
    </Text>
  </LinearGradient>
  );
}
const styles=StyleSheet.create({
  container:{
flex:1
  }
})