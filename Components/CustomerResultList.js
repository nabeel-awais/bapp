import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity,Alert,Text } from 'react-native';
import CustomerResultsDetail from './CustomerResultsDetail';
import { useNavigation } from '@react-navigation/native';


const CustomerResultsList = ({ results }) => {
  const [data1, setData1] = useState(results);
  const deleteItemById = (id) => {
    setData1(prevTodos => {
      return prevTodos.filter(todo => todo.id != id)
      }
    );
    alert('Request is Accepted');
  }
  const deleteItemById2 = (id) => {
    setData1(prevTodos => {
      return prevTodos.filter(todo => todo.id != id)
      }
    );
    alert('Request is Rejected');
  }
  const navigation = useNavigation();
  return (
    <View style={styles.conatainer}>
      <FlatList
        showsVerticalScrollIndicator
        data={data1}
        keyExtractor={data1 => data1.id + 'key'}
        renderItem={({ item }) => {
          return (<TouchableOpacity style={styles.touchStyle}>          
              <CustomerResultsDetail result={item} deleteItemById={deleteItemById} deleteItemById2={deleteItemById2} />
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
