import React, {Component} from "react"
import { Text } from "react-native"
import {createDrawerNavigator} from "@react-navigation/drawer"
import CreatePost from "../Screens/Createpost"
import Feed from "../Screens/Feed"
import Profile from "../Screens/Profile"
import BottomTab from "./BottomTab"
import StackNavigator from "./Stack"
const Drawer= createDrawerNavigator()
export default class DrawerNavigator extends Component{
  render(){
    return(
     <Drawer.Navigator>
      <Drawer.Screen name="Stack" component={StackNavigator}></Drawer.Screen>
      <Drawer.Screen name= "Profile" component= {Profile}></Drawer.Screen>
     </Drawer.Navigator>
    )
  }
} 