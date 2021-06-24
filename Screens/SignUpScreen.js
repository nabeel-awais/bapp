import React,{useState} from 'react';
import { View, StyleSheet, Text,Alert} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import MainButton from '../Components/MainButton'
import Input from '../Components/Input';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const validate = (text) => {
  console.log(text);
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
  if(reg.test(text) === false)
  {
  return false;
    }
  else {
      return true;
  }
  }
const SignUpScreen = () => {
    const [isSelected, setSelection] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    
    const __doSignUp = () => {
      __doCreateUser(email, password)
    }

    const __doCreateUser = async (email, password) => {
      try {
        let response = await auth().createUserWithEmailAndPassword(
          email,
          password
        )
        if (response && response.user) {
          Alert.alert("Success ✅", "Account created successfully")
          getUserID();
        }
      } catch (e) {
        console.error(e.message)
      }
    }

  return (
    <View style={styles.ContainerStyle}>
      <View style={styles.HeaderStyle}>
        <Text style={styles.FaceStyle}>FACEMODE</Text>
        <Text style={styles.TagStyle}>make It Cool for @2021</Text>
      </View>
      <View style={styles.InputContainer}>
        <Input placeholder='Enter Email' onChangeText={text => {
          setEmail(text)
        }}/>
        <Input placeholder='Password (must be 6-15 charcters)' pass={true}
        onChangeText={text => {
          setPassword(text)
        }}/>
        <Input placeholder='Confirm Password' pass={true}
        onChangeText={text => {
          setPasswordCheck(text)
        }}/>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isSelected}
          onValueChange={(newValue) => setSelection(newValue)}
          style={styles.checkbox}
        />
        <Text style={{fontSize:16}}>I have read and agree to the</Text><Text style={{color:'#9acee2',fontSize:16}}> Terms Of Service</Text><Text style={{fontSize:16}}> &</Text>
      </View>
      <View style={{marginHorizontal:18}}>
      <Text style={{fontSize:16,color:'#9acee2',marginLeft:15,marginTop:-3}}>Privacy Policy</Text>
      </View>
      <View style={styles.ButtonContainer}>
        <MainButton title='Register' onPress={() => {if(!isSelected){Alert.alert(
      "Terms and Services",
      "Read and agree our terms and services",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
    }else if(!validate(email)){Alert.alert(
      "Invalid email",
      "Enter valid email",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
    }else if(password!=passwordCheck){Alert.alert(
      "Password Miss Match",
      "Enter Same Password",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );}else if(password==''||passwordCheck==''){Alert.alert(
      "Empty fields",
      "Please fill all fields",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );}else{
    __doSignUp();
    console.log("done");
    }}} />
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems:'center',
    marginHorizontal:15,
    //borderWidth:1,
  },
  checkbox: {
    alignSelf: "center",
    borderColor:'black',
    backgroundColor:'black',
  },
})
export default SignUpScreen;