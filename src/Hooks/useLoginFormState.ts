import { StackNavigationProp } from "@react-navigation/stack";
import React,{ useState } from "react";



export const useLoginFormState = () => {
  
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [submit, setSubmit] = useState(false);
    
  
    let isUsernameValid = false;
    let isPasswordValid = false;
  
    if (username === "asd") {
      isUsernameValid = true;
    }
  
    if (password === "asd") {
      isPasswordValid = true;
    }

    
  
    return {
      username: {
        value: username,
        set: setUsername,
        valid: isUsernameValid,
      },
      password: {
        value: password,
        set: setPassword,
        valid: isPasswordValid,
      },
      submit,
      setSubmit,
      isUsernameValid,
      isPasswordValid
  }

}