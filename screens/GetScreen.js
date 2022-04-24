import React, {useEffect, useState} from "react"; 

const listTest = () => {
    const [test, setTest] = useState([]); 
}

const getTest = async() => {
    try {
        const response = await fetch("http://localhost:5000/test"); 
        const jsonData = await response.json(); 

        setTest (jsonData); 
    }
}