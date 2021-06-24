import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Screens/LoginScreen";
import SignUp from "../Screens/SignUpScreen";
import Profile from "../Screens/Profile";
import Notification from "../Screens/Notification";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="LoginScreen" component={Login} />
      <Stack.Screen name="SignUpScreen" component={SignUp} />
    </Stack.Navigator>
  );
}

const TabNav = () => {
    return (
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Profile" component={Profile}/>
        <Stack.Screen name="Notification" component={Notification}/>
      </Stack.Navigator>
    );
  }
  
  export { MainStackNavigator, TabNav };
