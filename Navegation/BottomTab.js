import React, {Component} from "react"
import { Text } from "react-native"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import CreatePost from "../Screens/Createpost"
import Feed from "../Screens/Feed"
const Tab= createBottomTabNavigator()
export default class BottomTab extends Component{
  render(){
    return(
     <Tab.Navigator>
      <Tab.Screen name="Feed" component={Feed}></Tab.Screen>
      <Tab.Screen name= "CreatePost" component= {CreatePost}></Tab.Screen>
     </Tab.Navigator>
    )
  }
} 