import React, { Fragment, useEffect, useState } from "react";

const ManagerHome = () => {
  const [inv, setInv] = useState([]);

  const getInv = async () => {
    try {
      const response = await fetch("http://localhost:5000/inventory");
      const jsonData = await response.json();

      setInv(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getInv();
  }, []);

  console.log(inv);

  return (
    <Fragment>
      {" "}
      <table class="table mt-5 text-center">
        <thead>
          <tr>
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
              <input>
                
              </input>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ManagerHome;