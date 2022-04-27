import React, { Fragment, useEffect, useState } from "react";

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
          </tr>
        </thead>
        <tbody>
          {drinks.map(drink => (
            <tr key={drink.name}>
              <td>{drink.name}</td>
              <td>{drink.description}</td>
              <td>{drink.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListingData;