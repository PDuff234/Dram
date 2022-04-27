import React, { Fragment, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const BartenderHome = () => {
  const [orders, setOrders] = useState([]);
  const navigation = useNavigation(); 

  const getOrders = async () => {
    try {
      const response = await fetch("http://localhost:5000/orders");
      const jsonData = await response.json();

      setOrders(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const completeOrder = async e => {
    try {
      var payload = { transactionID: e, servedBy: sessionStorage.getItem("user") }
      console.log(JSON.stringify(payload)); 
      const response = await fetch("http://localhost:5000/order/id", {
        method: 'PUT', 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(payload)
      }
      ); 
    } catch (err) {
      console.log(err.message); 
    }
  }; 

  useEffect(() => {
    getOrders();
  }, []);

  console.log(orders);

  return (
    <View style = {styles.container}>
      <ScrollView vertical>
        <Fragment>
          {" "}
          <table className="table mt-5 text-center">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Cocktail</th>
                <th>Instructions</th>
                <th>Served?</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.transactionid}>
                  <td>{order.customer}</td>
                  <td>{order.cocktail}</td>
                  <td>{order.instructions}</td>
                  <td>
                    <button className="primary" onClick={() => completeOrder(order.transactionid)}>
                      Press to Complete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Fragment>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#006747',
    alignItems: 'center',
    justifyContent: 'center'
  },

  button: {
    flexDirection: "row", 
    justifyContent: "space-around", 
    backgroundColor: 'green', 
  }, 
})

export default BartenderHome;