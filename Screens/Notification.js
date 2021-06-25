import React from 'react';
import {StyleSheet,SafeAreaView } from 'react-native';
import CustomerResultList from '../Components/CustomerResultList';
import {CustomerData} from '../data/CustomerData';

const NotificationScreen = ({route}) => {

    return (
        <SafeAreaView style={styles.Container}>
            <CustomerResultList results={CustomerData}/>
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