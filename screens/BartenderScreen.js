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
            <th>Served?</th>
          </tr>
        </thead>
        <tbody>
<<<<<<< HEAD
          {orders.map((order) => (
=======
          {orders.map(order => (
>>>>>>> 82215c05b844ceb709a5876371775eb5e34c66ca
            <tr key={order.transactionid}>
              <td>{order.transactionid}</td>
              <td>{order.customer}</td>
              <td>{order.cocktail}</td>
<<<<<<< HEAD
              <td>{order.hasbeenserved}</td>
=======
              <td>{order.instructions}</td>
>>>>>>> 82215c05b844ceb709a5876371775eb5e34c66ca
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default BartenderHome;