import React from "react";
import DrawerNavigator from "./Navegation/Drawer";
import { NavigationContainer } from "@react-navigation/native";
import { firebaseConfig } from "./config";
import firebase from "firebase";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
const Stack= createStackNavigator()
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}
else{
  firebase.app()
}


const StackNavi= ()=>{
  return(
    <Stack.Navigator>
      <Stack.Screen name="login" component={LoginScreen}></Stack.Screen>
      <Stack.Screen name="register" component={RegisterScreen}></Stack.Screen>
      <Stack.Screen name="dashboard" component={DrawerNavigator}></Stack.Screen>
    </Stack.Navigator>
  )
}
export default function App() {
  return (
    <NavigationContainer>
      <StackNavi></StackNavi>

    </NavigationContainer>
  );
}
