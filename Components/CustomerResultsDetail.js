import { FirebaseStorageTypes } from '@react-native-firebase/storage';
import React,{} from 'react';
import { Text, Image, View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import { useState } from 'react/cjs/react.development';
const CustomerResultsDetail = ({ result,deleteItemById,deleteItemById2 }) => {
    const [email,setEmail]= useState(result.barberEmail)


const cancelAppoinment=async()=>{
    const userEmail=result.email;
    const Msg="Appointment Rejected";
    firestore().collection('appointmentAnswer').doc().set({barberEmail:email,userEmail:userEmail,Msg:Msg});
     var x = firestore().collection('AppointmentReq').where('barberEmail','==',email);
     x.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          doc.ref.delete();
        });
      });
}

const acceptAppoinment=async()=>{
    const userEmail=result.email;
    const Msg="Appoinment Accepted";
    firestore().collection('appointmentAnswer').doc().set({barberEmail:email,userEmail:userEmail,Msg:Msg});
     var x = firestore().collection('AppointmentReq').where('barberEmail','==',email);
     x.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          doc.ref.delete();
        });
      });
}

    return (<View style={styles.conatiner}>
        <SafeAreaView>
            <View style={{ flex: 1, borderRadius: 4, backgroundColor: 'white', flexDirection: 'row' }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '80%', overflow: 'scroll' }}>
                    <Text style={{ fontSize: 18 }}>Email:{result.email}</Text>
                        <Text style={{ fontSize: 18 }}>Date & Time: {result.dateandtime}</Text>
                    </View>
                </View>
                <View>
                    <TouchableOpacity  onPress={()=>acceptAppoinment()} ><Icon name="checkmark-circle-outline" color={'green'} size={35} /></TouchableOpacity>
                    <TouchableOpacity onPress={()=>cancelAppoinment()}><Icon2 name="cancel" color={'red'} size={35} /></TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    </View>);
};
const styles = StyleSheet.create({
    image: {
        width: 80,
        height: 80,
        borderRadius: 4,
    },
    conatiner: {
        // marginLeft: 15,
        flex: 1,
    },
});
export default CustomerResultsDetail;