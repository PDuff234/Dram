import React, { Fragment, useEffect, useState } from "react";

const BartenderHome = () => {
<<<<<<< HEAD
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const response = await fetch("http://localhost:5000/orders");
      const jsonData = await response.json();

      setOrders(jsonData);
=======
  const [inv, setInv] = useState([]);

  const getInv = async () => {
    try {
      const response = await fetch("http://localhost:5000/inventory");
      const jsonData = await response.json();

      setInv(jsonData);
>>>>>>> 82215c05b844ceb709a5876371775eb5e34c66ca
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
<<<<<<< HEAD
    getOrders();
  }, []);

  console.log(orders);
=======
    getInv();
  }, []);

  console.log(inv);
>>>>>>> 82215c05b844ceb709a5876371775eb5e34c66ca

  return (
    <Fragment>
      {" "}
      <table class="table mt-5 text-center">
        <thead>
          <tr>
<<<<<<< HEAD
            <th>TransID</th>
            <th>Customer</th>
            <th>Cocktail</th>
            <th>Served?</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.transactionid}>
              <td>{order.transactionid}</td>
              <td>{order.customer}</td>
              <td>{order.cocktail}</td>
              <td>{order.hasbeenserved}</td>
=======
            <th>Name</th>
            <th>Quantity</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {inv.map(item => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.type}</td>
>>>>>>> 82215c05b844ceb709a5876371775eb5e34c66ca
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default BartenderHome;