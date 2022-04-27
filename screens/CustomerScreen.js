import React, { Fragment, useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Table, TableWrapper, Row } from 'react-native-table-component'; 
import { useNavigation } from "@react-navigation/native";

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

  const navigation = useNavigation(); 
  function orderDrink(drink, price){

    var order = {
      customer: sessionStorage.getItem("user"),
      cocktail: drink,
      total: price
    };

    console.log(order.cocktail);
    console.log(order.total);
    
    fetch('http://localhost:5000/makeOrder', {
      method: 'POST', 
      headers: {
        Accept: 'application/json', 
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(order)
    })
    .then(response => {
      console.log("response: " + response);
      if (response.status === 200) {
        console.log("Response is 200")
        console.log("Order has been made")
        navigation.push('Customer Screen')
      }
    })
  }

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