import React, {Component} from "react"
import { Text } from "react-native"
import {createStackNavigator} from "@react-navigation/stack"
import CreatePost from "../Screens/Createpost"
import Feed from "../Screens/Feed"
import PostScreen from "../Screens/PostScreen"
import BottomTab from "./BottomTab"
const Stack= createStackNavigator()
export default class StackNavigator extends Component{
  render(){
    return(
     <Stack.Navigator>
      <Stack.Screen name="BottomTab" component={BottomTab}></Stack.Screen>
      <Stack.Screen name= "PostScreen" component= {PostScreen}></Stack.Screen>
     </Stack.Navigator>
    )
  }
} 