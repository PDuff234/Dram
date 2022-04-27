import React, { Fragment, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native"

const ManagerHome = () => {
  const [inv, setInv] = useState([]);
  const [quantity, SetQuantity] = useState(0); 
  const navigation = useNavigation(); 

  const getInv = async () => {
    try {
      const response = await fetch("http://localhost:5000/inventory");
      const jsonData = await response.json();

      setInv(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const addInventory = async e => {
    try {
      var payload = { "name": e, "amount": quantity }
      console.log(JSON.stringify(payload)); 
      const response = await fetch("http://localhost:5000/inventory/add", {
        method: 'POST', 
        headers: { Accept: "application/json", "Content-Type": "application/json" }, 
        body: JSON.stringify(payload)
      }
      ); 

      navigation.push('Manager Screen'); 
    } catch (err) {
      console.log(err.message); 
    }
  }; 

  const subInventory = async e => {
    try {
      var payload = { "name": e, "amount": quantity }
      console.log(JSON.stringify(payload)); 
      const response = await fetch("http://localhost:5000/inventory/sub", {
        method: 'POST', 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(payload)
      }
      ); 

      navigation.push('Manager Screen'); 
    } catch (err) {
      console.log(err.message); 
    }
  }; 

  useEffect(() => {
    getInv();
  }, []);

  console.log(inv);

  return (
    <Fragment>
      {" "}
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Type</th>
            <th>Inventory</th>
            <th>Add</th>
            <th>Subtract</th>
          </tr>
        </thead>
        <tbody>
          {inv.map(item => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.type}</td>
              <td>
                <input type="number" value={quantity} onChange={(e) => SetQuantity(e.target.value)} />
              </td>
              <td>
                <button className="primary" onClick={() => addInventory(item.name)}>
                  Add
                </button>
              </td>
              <td>
                <button className="primary" onClick={() => subInventory(item.name)}>
                  Subtract
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ManagerHome;