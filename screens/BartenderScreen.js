import React, { Fragment, useEffect, useState } from "react";
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
      var payload = { "hasbeenserved": "Y", "servedBy": "12456", "transactionid": e }
      console.log(JSON.stringify(payload)); 
      const response = await fetch("http://localhost:5000/order/:id", {
        method: 'PUT', 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(payload)
      }
      ); 
      //location.reload(); 
    } catch (err) {
      console.log(err.message); 
    }
  }; 

  useEffect(() => {
    getOrders();
  }, []);

  console.log(orders);

  return (
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
  );
};

export default BartenderHome;