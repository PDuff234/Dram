import React, { Fragment, useEffect, useState } from "react";

const BartenderHome = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const response = await fetch("http://localhost:5000/orders");
      const jsonData = await response.json();

      setOrders(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  console.log(orders);

  return (
    <Fragment>
      {" "}
      <table class="table mt-5 text-center">
        <thead>
          <tr>
            <th>TransID</th>
            <th>Customer</th>
            <th>Cocktail</th>
            <th>Instructions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.transactionid}>
              <td>{order.transactionid}</td>
              <td>{order.customer}</td>
              <td>{order.cocktail}</td>
              <td>{order.instructions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default BartenderHome;