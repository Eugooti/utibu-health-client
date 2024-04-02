import axios from 'axios';
import {removeItem, setLocalStorage} from "../../Utils/LocalStorage/localStorage.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const useLogin = async (emailAddress, password) => {

    const [message,setMessage]=useState()

    try {
        const response = await axios.post("http://localhost:5000/uhs/patient/login", { emailAddress, password });

        if (response.data?.message === "Login successful") {
            // Optionally, you can handle the token and user data here
            const authToken = await response.data.authToken;
            const user = await response.data.user;

            setMessage(response.data.message)

            setLocalStorage("User", user); // Log user information

            setLocalStorage('authToken', authToken)

        } else {
            setMessage(response.data.error)

        }
    } catch (error) {
        // Handle any errors that occur during login
        console.error("Login error:", error);
        setMessage(error.message)
        throw error; // Rethrow the error for the caller to handle
    }

    return message
};



// Logout function
const useLogout = async () => {
    try {

        // Make an HTTP GET request to the logout endpoint
        const response=await axios.get('http://localhost:5000/uhs/patient/logout');


        if (response.data.message==="Logout successful"){
            removeItem('authToken');
            removeItem("User")

            return true
        }

        // Clear the authentication token or session ID from browser storage or state management library


        // Redirect the user to the login page or any other desired route
    } catch (error) {
        // Handle logout error, display error message, etc.
        console.error('Logout failed:', error);
        return false
    }
};

export {useLogin,useLogout}