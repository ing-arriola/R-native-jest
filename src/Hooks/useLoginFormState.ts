import React,{ useState } from "react";
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from "../../App";
import { StackNavigationProp } from '@react-navigation/stack';

type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

export const useLoginFormState = () => {
  
  
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [submit, setSubmit] = useState(false);
    const navigation = useNavigation<homeScreenProp>()
  
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
      submit: {
        value: submit,
        set: () => {
          setSubmit(true);
  
          if (isUsernameValid && isPasswordValid) {
            fetch("https://jsonplaceholder.typicode.com/users", {
              method: "POST",
              body: JSON.stringify({
                username,
                password,
              }),
            })
              .then((response) => response.json())
              .then(() => navigation.navigate("Home"))
              .catch((error) => {
                console.log("error", error);
              });
          }
        },
      },
    };
  };