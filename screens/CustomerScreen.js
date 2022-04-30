import React, { Fragment, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const ListingData = () => {
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

<<<<<<< HEAD
=======


>>>>>>> adbef5569410023bf6cda1bce367ce492295f312
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
    <Fragment>
      {" "}
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
<<<<<<< HEAD
            <th>Order this Drink</th>
=======
            <th>Order this drink</th>
>>>>>>> adbef5569410023bf6cda1bce367ce492295f312
          </tr>
        </thead>
        <tbody>
          {drinks.map(drink => (
            <tr key={drink.name}>
              <td>{drink.name}</td>
              <td>{drink.description}</td>
              <td>{drink.price}</td>
              <td>
<<<<<<< HEAD
              <button className="orderButton" onClick={() => orderDrink(drink.name, drink.price)}>
                Order this Drink
              </button>
=======
                <button className="orderButton" onClick={() => orderDrink(drink.name, drink.price)}>
                  Order this drink
                </button>
>>>>>>> adbef5569410023bf6cda1bce367ce492295f312
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
  
};

<<<<<<< HEAD
export default CustomerHome;
=======





export default ListingData;
>>>>>>> adbef5569410023bf6cda1bce367ce492295f312
