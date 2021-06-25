import React,{} from 'react';
import { Text, Image, View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { useState } from 'react/cjs/react.development';
const CustomerResultsDetail = ({ result,deleteItemById,deleteItemById2 }) => {
    return (<View style={styles.conatiner}>
        <SafeAreaView>
            <View style={{ flex: 1, borderRadius: 4, backgroundColor: 'white', flexDirection: 'row' }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '80%', overflow: 'scroll' }}>
                        <Text style={{ fontSize: 18 }}>{result.title}</Text>
                        <Text style={{ fontSize: 18 }}>Date & Time: {result.disc}</Text>
                    </View>
                </View>
                <View>
                    <TouchableOpacity onPress={()=>deleteItemById(result.id)}><Icon name="checkmark-circle-outline" color={'green'} size={35} /></TouchableOpacity>
                    <TouchableOpacity onPress={()=>deleteItemById2(result.id)}><Icon2 name="cancel" color={'red'} size={35} /></TouchableOpacity>
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