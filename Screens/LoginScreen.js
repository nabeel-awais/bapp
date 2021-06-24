import React,{useState} from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import AppButton from '../Components/AppButton';
import MainButton from '../Components/MainButton'
import Input from '../Components/Input';
import auth from '@react-native-firebase/auth';



const LoginScreen = ({navigation}) => {

const [email,setemail]=useState("")
const [password,setpassword]=useState("")


const __doSingIn = async (email, password) => {
  try {
    let response = await auth().signInWithEmailAndPassword(email, password)
    if (response && response.user) {
      Alert.alert("Success ✅", "Authenticated successfully")
    }
  } catch (e) {
    Alert.alert(
      "Auth failed",
      "Enter correct email and password",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
  }
}
  return (
    <View style={styles.ContainerStyle}>
      <View style={styles.HeaderStyle}>
        <Text style={styles.FaceStyle}>FACEMODE</Text>
        <Text style={styles.TagStyle}>The Face of Future @2021</Text>
      </View>
      <View style={styles.InputContainer}>
        <Input placeholder='Enter Email' onChangeText={text=>{setemail(text)}}/>
        <Input placeholder='Enter Password' pass={true} onChangeText={text=>{setpassword(text)}}/>
      </View>
      <View style={styles.CheckStyle}>
        <AppButton title='Register now' onPress={() => navigation.navigate('SignUpScreen')}/>
        <AppButton title='Forgot Password?' />
      </View>
      <View style={styles.ButtonContainer}>
        <MainButton title='Log In'  onPress={() =>{if(email==""||password==""){Alert.alert(
      "Input Error",
      "Enter email and password",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );}else{__doSingIn(email,password);}}}/>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  HeaderStyle: {
    alignItems: 'center',
    marginTop: '15%'
  },
  ContainerStyle: {
    flex: 1,
    backgroundColor: 'white'
  },
  FaceStyle: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'notoserif'
  },
  TagStyle: {
    fontSize: 13,
    color: '#C0C0C0',
    marginTop: -5
  },
  InputContainer: {
    marginHorizontal: 15,
    paddingTop: 50,
  },
  CheckStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  ButtonContainer: {
    paddingTop: 30,
    marginHorizontal: 15,
  },
  LogStyle: {
    paddingTop: 55,
    flexDirection: 'row',
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center'

  },
  LineStyle: {
    width: 120,
    height: 1,
    backgroundColor: 'black',
    marginHorizontal: 20
  },
  LogTextStyle: {
    color: '#FDAE1D',
    fontSize: 18
  },
  WithContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagestyle: {
    height: 50,
    width: 50,
  },
})
export default LoginScreen;