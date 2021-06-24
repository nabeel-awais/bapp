import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabNav } from "./StackNavigator";
import Icon from 'react-native-vector-icons/Ionicons';
import Notification from "../Screens/Notification";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Profile" 
    tabBarOptions={{
      activeTintColor: '#FDAE1D',
      inactiveTintColor: 'white',
      style:{
        backgroundColor:'black'
      }
    }}>
      <Tab.Screen name="Profile" component={TabNav} options={{
            tabBarLabel: 'Profile',
            tabBarColor: 'black',
            tabBarIcon: ({ color }) => (
              <Icon name="ios-person" color={color} size={26} />
            ),
          }}/>
      <Tab.Screen name="Notification" component={Notification} options={{
            tabBarLabel: 'Notification',
            tabBarColor: 'black',
            tabBarIcon: ({ color }) => (
              <Icon name="ios-notifications" color={color} size={26} />
            ),
          }}/>
    </Tab.Navigator>
  );
};
export default BottomTabNavigator;