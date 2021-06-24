import React,{useState,useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";

import { MainStackNavigator } from "./Navigation/StackNavigator";

import BottomTabNavigator from "./Navigation/TabNavigator";
import auth from '@react-native-firebase/auth';

 const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  if (initializing) return null;
  if (!user) {
  return (
    <NavigationContainer>
      <MainStackNavigator /> 
    </NavigationContainer>
  );
}
return(

    <NavigationContainer>
      <BottomTabNavigator /> 
    </NavigationContainer>
);
}

export default App