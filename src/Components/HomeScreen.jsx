import { View, Text } from "react-native";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';


export function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home! </Text>
      <AntDesign name={'arrowright'} size={45} color={"red"}/>
    </View>
  );
}