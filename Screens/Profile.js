import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    TextInput,
    StyleSheet,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import ImagePicker from 'react-native-image-crop-picker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';

const ProfileScreen = () => {
    const [shopName, setShopName] = useState("");
    const [adress, setAdress] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState('https://api.adorable.io/avatars/80/abott@adorable.png');
    const [url,setURL]=useState('');
    
    const reference = storage().ref(image);
    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            compressImageQuality: 0.7
        }).then(image => {
            console.log(image);
            setImage(image.path);
            bs.current.snapTo(1);
        });
    }

    const renderInner = () => (
        <View style={styles.panel}>
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.panelTitle}>Upload Photo</Text>
                <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
            </View>
            <TouchableOpacity style={styles.panelButton} onPress={choosePhotoFromLibrary}>
                <Text style={styles.panelButtonTitle}>Choose From Library</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.panelButton}
                onPress={() => bs.current.snapTo(1)}>
                <Text style={styles.panelButtonTitle}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );
    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle} />
            </View>
        </View>
    );
    const bs = React.useRef(null)
    const fall = new Animated.Value(1);

     const  fetchdata=async()=>{
        const uID=auth().currentUser.uid;
        const userdata =await firestore().collection('Users').doc(uID).get();
        if(userdata.data().description!=null&&userdata.data().adress!=null&&userdata.data().name!=null){
    setShopName(userdata.data().name)
    setAdress(userdata.data().adress)
    setDescription(userdata.data().description)
        }
      else{
        Alert.alert(
          "no data found",
          "no data found",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => console.log("OK Pressed")}])
      }
      }

        const savedata=async ()=>{
            const uID=auth().currentUser.uid;
            if(adress==''||description==''||shopName==''||image=='https://api.adorable.io/avatars/80/abott@adorable.png'||image==''){Alert.alert(
                "No data found",
                "please fill all fields",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );
            }else{
              const pathToFile = image;
            await reference.putFile(pathToFile);
            setURL(await storage().ref(image).getDownloadURL());
            firestore().collection('Users').doc(uID).set({name:shopName,adress:adress,description:description,url:url}).then(()=>{console.log('Data saved');Alert.alert('data saved')})
            
            }}

    return (

        <View style={styles.container}>
            <View>
                <BottomSheet
                    ref={bs}
                    snapPoints={[330, 0]}
                    renderContent={renderInner}
                    renderHeader={renderHeader}
                    initialSnap={1}
                    callbackNode={fall}
                    enabledGestureInteraction={true}
                />
                <Animated.View style={{
                    margin: 20,
                    opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
                }}>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
                            <View
                                style={{
                                    height: 100,
                                    width: 100,
                                    borderRadius: 15,
                                    marginBottom: 25,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <ImageBackground
                                    source={{
                                        uri: image,
                                    }}
                                    style={{ height: 100, width: 100, borderWidth: 1, borderRadius: 15 }}
                                    imageStyle={{ borderRadius: 15 }}>
                                    <View
                                        style={{
                                            flex: 1,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <Icon
                                            name="camera"
                                            size={35}
                                            color="black"
                                            style={{
                                                opacity: 0.7,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderWidth: 1,
                                                borderColor: '#fff',
                                                borderRadius: 10,
                                            }}
                                        />
                                    </View>
                                </ImageBackground>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TextInput
                            style={styles.input}
                            value={shopName}
                            onChangeText={text => {
                                setShopName(text)
                            }}
                            placeholder='Enter Shop name'
                            maxLength={40}
                            defaultValue={shopName}
                            placeholderTextColor='#CCCCCC'
                        />
                    </View>
                    <View>
                        <TextInput
                            style={styles.input}
                            value={adress}
                            onChangeText={text => {
                                setAdress(text)
                            }}
                            placeholder='Enter your address'
                            maxLength={50}
                            defaultValue={adress}
                            placeholderTextColor='#CCCCCC'
                        />
                    </View>
                    <View>
                        <TextInput
                            style={styles.inputdes}
                            value={description}
                            onChangeText={text => {
                                setDescription(text)
                            }}
                            placeholder='Enter description'
                            maxLength={50}
                            multiline={true}
                            numberOfLines={5}
                            defaultValue={description}
                            placeholderTextColor='#CCCCCC'
                        />
                    </View>
                    <View style={{alignItems:'center'}}>
                        <View style={styles.buttons}>
                            <TouchableOpacity onPress={() =>{ auth().signOut();}} style={styles.buttonsStyle}>
                                <Text style={{ fontSize: 22, color: '#ffcc00' }}>Logout</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() =>{fetchdata()}} style={styles.buttonsStyle}>
                                <Text style={{ fontSize: 22, color: '#ffcc00' }}>Fetch data</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() =>{savedata()}} style={styles.buttonsStyle}>
                                <Text style={{ fontSize: 22, color: '#ffcc00' }}>Save Data</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animated.View>
            </View>
        </View>
    );
}
export default ProfileScreen;


const styles = StyleSheet.create({
    ommandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginTop: 10,
    },
    panel: {
        height:1000,
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',

    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: 'black',
        alignItems: 'center',
        marginVertical: 7,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#FDAE1D',
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
    },

    container: {
      
        flex: 1,
        backgroundColor: 'white'
    },
    input: {
        height: 40,
        color: 'black',
        margin: 12,
        borderWidth: 2,
        borderRadius: 5,
    },
    inputdes: {
        textAlignVertical: 'top',
        margin: 12,
        color: 'black',
        borderWidth: 2,
        borderRadius: 5,
    },
    buttons: {
        flexDirection: 'row',
        alignItems:'center',
        paddingBottom:255,

    },
    buttonsStyle: {
        alignSelf:'center',
        paddingHorizontal:10,
        borderRadius: 3,
        backgroundColor: "black",
        marginHorizontal:5,
        marginBottom:30
    },
});