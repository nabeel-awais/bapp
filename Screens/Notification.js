import React, { useState,useEffect } from 'react';
import {StyleSheet,SafeAreaView } from 'react-native';
import CustomerResultList from '../Components/CustomerResultList';
import {CustomerData} from '../data/CustomerData';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const NotificationScreen = ({route}) => {

    const [appointments, setAppointment] = useState([]);
    const email= auth().currentUser.email;

     useEffect(() => {
      const subscriber = firestore()
        .collection('AppointmentReq').where('barberEmail','==',email)
        .onSnapshot(querySnapshot => {
          const appointments = [];
    
          querySnapshot.forEach(documentSnapshot => {
            appointments.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          setAppointment(appointments);
        });
      
      return () => subscriber();
    }, []);




    return (
        <SafeAreaView style={styles.Container}>
            <CustomerResultList results={appointments}/>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'white'
    }
})

export default NotificationScreen;