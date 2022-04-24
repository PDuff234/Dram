import React, { Fragment, useEffect, useState } from "react";

const ListTest = () => {
  const [todos, setTest] = useState([]);
  
  const getTest = async () => {
    try {
      const response = await fetch("http://localhost:5000/test");
      const jsonData = await response.json();

      setTest(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTest();
  }, []);

  console.log(test);

  return (
    <View style = { styles.container }>

    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#006747",
      alignItems: "center",
      justifyContent: "center",
    },
   
    image: {
      marginBottom: 40,
    },
   
    inputView: {
      backgroundColor: "#3EB489",
      borderRadius: 30,
      width: "80%",
      height: 45,
      marginBottom: 20,
      alignItems: "center",
    },
   
    inputText: {
      height: 50,
      flex: 1,
      padding: 10,
      marginLeft: 25,
    },
   
    forgot_button: {
      height: 30,
      marginBottom: 30,
    },
   
    loginBtn: {
      width: "80%",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      backgroundColor: "#CFC493",
    },

    loginText: {
        color: "white", 
        fontSize: 16
    }
  });

export default ListTest;