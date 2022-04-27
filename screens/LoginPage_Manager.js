import React, { useEffect, useCallback, Component } from 'react';
import { View, TextInput, Text, StyleSheet, Image, TouchableOpacity, Touchable } from 'react-native';
import { useForm } from 'react-hook-form';
import { useNavigation } from "@react-navigation/native"; 

const EmpLoginScreen = () => {
  const navigation = useNavigation(); 
  const { register, handleSubmit, setValue } = useForm();


  const onSubmit = useCallback(formData => {
    console.log("data send: " + formData);
    
<<<<<<< HEAD
    fetch('http://localhost:5000/login/employee', {
=======
    fetch('http://localhost:5000/login/manager', {
>>>>>>> 82215c05b844ceb709a5876371775eb5e34c66ca
      method: 'POST', 
      headers: {
        Accept: 'application/json', 
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(formData)
    })
    .then(response => {
      console.log("response: " + response);
      if (response.status === 200) {
        console.log("Response is 200")
<<<<<<< HEAD
        navigation.navigate('Customer Screen'); 
=======
        navigation.navigate('Manager Screen');
>>>>>>> 82215c05b844ceb709a5876371775eb5e34c66ca
        return response.json(); 
      }
    })
  
  }, []);

  const onChangeField = useCallback(
    name => text => {
      setValue(name, text);
    },
    []
  );

  useEffect(() => {
    register('id');
    register('password');

  }, [register]);

  return (
    <View style = { styles.container }>

        <View style = {styles.inputView}>
          <TextInput 
              style = {styles.inputText}
              placeholder = "employee id"
              placeholderTextColor = "#003f5c"
              onChangeText = {onChangeField('id')}
          />
        </View>

        <View style = {styles.inputView}>
          <TextInput 
              style = {styles.inputText}
              placeholder = "Password"
              placeholderTextColor = "#003f5c"
              secureTextEntry = {true}
              onChangeText = {onChangeField('password')}
          />
        </View>

        <TouchableOpacity>
          <Text style = {styles.forgot_button} onPress = {() => navigation.navigate('Employee Sign Up')}> Not a user? Register Here! </Text>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.loginBtn} onPress = {handleSubmit(onSubmit)}>
            <Text style = {styles.loginText}> Login </Text>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.loginBtn} onPress = {() => navigation.navigate('Customer Screen')}>
            <Text style = {styles.loginText}> Customer Screen </Text>
        </TouchableOpacity>
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
      color: 'white', 
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

export default EmpLoginScreen;