import React from 'react';
import {Text,View,TextInput,StyleSheet} from 'react-native';
const Input = ({placeholder,key,pass,onChangeText,value}) => {
    console.log(placeholder);
       return (
        <View style={styles.backgroundStyle}>            
        <TextInput
            autoCapitalize="none"
            value={value}
            onChangeText={onChangeText}
            autoCorrect={false}
            style={styles.inputStyle} 
            placeholder={placeholder}
            keyboardType={key}
            secureTextEntry={pass}
            placeholderTextColor='#CCCCCC'
            />
        </View>
        
        );
        };
        const styles=StyleSheet.create({
        backgroundStyle:{
            marginTop:10,
            height:60,
            borderRadius:3,
            paddingLeft:5,
            marginBottom:10,
            borderWidth:1,
            borderColor:'#808080'
        },
        inputStyle:{
         flex:1,
         fontSize:20,
         fontWeight:'700',
         color:'black'        
        },        
        })
export default Input;