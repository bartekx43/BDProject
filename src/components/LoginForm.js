import React from 'react'
import Button from './Button'
import axios from 'axios'

import { useState } from 'react';
const LoginForm = (props) => {


const [login, setName] = useState('');
const [password, setPassword] = useState('');


const [submitted, setSubmitted] = useState(false);

const handleName = (e) => {
setName(e.target.value);
setSubmitted(false);
};
const handlePassword = (e) => {
setPassword(e.target.value);
setSubmitted(false);
};


const handleSubmit = (e) => {

    e.preventDefault();
    console.log("XD");
    console.log(login);
    axios.post('http://localhost:8080/_login',{
      "username" : 'debug',
      "password" : 'pass'
      }

    ).catch(function (error) {
      console.log(error.response.status);
    }
    );


    if (login === '' || password === '') 
    {
        alert("Wypełnij wszystkie pola formularza");
       
    }
    else
    {  

        axios.post('http://localhost:8080/_login', {
            username: login,
            password: password
          }) .then(function (response) {

            if (response.status === 200)
            { 

              alert("Zalogowano");
              props.changeUserID(response.data);
              props.changeBoardState('board');


            }

          })
          .catch(function (error) {
            if (error.response.status === 400)
            {

              alert("Uzytkownik o takim loginie nie istnieje");
              setName('');
              setPassword('');
            }
          });

        setName('');
        setPassword('');

      }
      };
  return (
      
  <div className="form" style={{
          border: "1px solid white",
          padding: "50px",
          marginLeft: "41%",
          marginTop: "8%",
          height: "300px",
          borderRadius: "12px",
          color: "lightgray",
        }}>
  <div  style={{ flexDirection: "column", width: "200px" }}>
  <form>
  {/* Labels and inputs for form data */}
  <label className="label"><p>Login:</p></label>
  <input onChange={handleName} className="input"
  value={login} type="text" />
  <label className="label"><p>Hasło:</p></label>
  <input onChange={handlePassword} className="input"
  value={password} type="password" />
          <Button
            marginesTop={"2vh"}
            margines={"0 auto"}
            text={"Zaloguj"}
            fun={handleSubmit}
            color={"white"}
          />
          
  </form>
  <Button
            marginesTop={"2vh"}
            margines={"0 auto"}
            text={"Zarejstruj"}
            fun={() => props.changeBoardState('register')}
            color={"white"}
          />  
  </div>
  </div>
  );
  }
  export default LoginForm;