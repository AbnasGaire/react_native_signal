import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button } from 'react-native-elements';
import { StyleSheet, Text, View ,SafeAreaView} from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from "./screens/Home";
import LoginScreen from "./screens/LoginScreen"
import Register from "./screens/Register";
import ChatScreen from './screens/ChatScreen';
import ChatsScreen from './screens/ChatsScreen';
export default function App() {
  const Stack=createStackNavigator();

  const globleScreenOptions={
    headerStyle:{backgroundColor:"#2C6BED"},
    headerTitleStyle:{color:"white"},
    headerTintColor:"white",
  }
  
  return (
    <NavigationContainer>
          <Stack.Navigator screenOptions={globleScreenOptions}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Chats" component={ChatsScreen} />
          </Stack.Navigator>
    </NavigationContainer>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
