import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity,Alert,Text } from 'react-native';
import CustomerResultsDetail from './CustomerResultsDetail';
import { useNavigation } from '@react-navigation/native';


const CustomerResultsList = ({ results }) => {
  console.log(results);

  const navigation = useNavigation();
  return (
    <View style={styles.conatainer}>
      <FlatList
        showsVerticalScrollIndicator
        data={results}
        keyExtractor={results => results.id + 'key'}
        renderItem={({ item }) => {
          return (<TouchableOpacity style={styles.touchStyle}>          
              <CustomerResultsDetail result={item} />
            </TouchableOpacity>  
          );
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 5,
    paddingTop: 5,
    color: 'white'

  },
  touchStyle: {
    backgroundColor: 'white',
    marginBottom: 5,
    elevation: 2,
    borderRadius: 4
  },
  conatainer: {
    paddingHorizontal: 10,
    paddingTop: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  conatiner2: {
    flexDirection: 'row',
  },
  CountStyle: {
    fontSize: 18,
    color: '#CCCCCC',
    paddingTop: 5
  },
  row: {
    flex: 1,
    justifyContent: "space-around"
  }
});
export default CustomerResultsList;
