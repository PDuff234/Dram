import React, { Fragment, useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Table, TableWrapper, Row } from 'react-native-table-component'; 

const CustomerHome = () => {
  const [drinks, setDrinks] = useState([]);

  const getDrinks = async () => {
    try {
      const response = await fetch("http://localhost:5000/menu");
      const jsonData = await response.json();

      setDrinks(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getDrinks();
  }, []);

  console.log(drinks);

  return (
    <View style = {styles.container}>
        
    </View>
  );
};

const styles = StyleSheet.create({
    container: { 
      flex: 1, 
      padding: 16, 
      paddingTop: 30, 
      backgroundColor: '#ffffff' 
    },
    head: { 
      height: 50, 
      backgroundColor: '#6F7BD9' 
    },
    text: { 
      textAlign: 'center', 
      fontWeight: '200' 
    },
    dataWrapper: { 
      marginTop: -1 
    },
    row: { 
      height: 40, 
      backgroundColor: '#F7F8FA' 
    }
  });

export default CustomerHome;