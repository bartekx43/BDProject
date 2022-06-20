import React from 'react'
import Button from './Button'
import axios from 'axios'
import { useState } from 'react';
export default function RegistrationForm() {
const [login, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [newUserID,setNewUserID] = useState('');
const [submitted, setSubmitted] = useState(false);
const handleName = (e) => {
setName(e.target.value);
setSubmitted(false);
};
const handleEmail = (e) => {
setEmail(e.target.value);
setSubmitted(false);
};
const handlePassword = (e) => {
setPassword(e.target.value);
setSubmitted(false);
};
var len;
const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/_login',{
          "username" : 'debug',
          "password" : 'pass'
          }

        );

    if (login === '' || email === '' || password === '') 
    {
        alert("Wypełnij wszystkie pola formularza");
        
    }
    else if (email!==password) 
    {
        alert("Wprowadzone hasła nie są takie same");
        setEmail('');
        setName('');
        setPassword('');
        setNewUserID(null);
    }
   
    else
    {  
         
       
        
        axios.post('http://localhost:8080/_register', {
            username: login,
            password: email
          })
          .then(function (response) {
            if (response.status == 400)
            {
              
              alert("Uzytkownik o takim loginie juz istnieje");
              setNewUserID(null);
              setEmail('');
              setName('');
              setPassword('');
            }
            else if (response.status == 200)
            { 
              
              alert("Zarejestrowano uzytkownika");
              setNewUserID(null);
              setEmail('');
              setName('');
              setPassword('');

            }

          })
          .catch(function (error) {
            console.log(error);
          });
        
        setEmail('');
        setName('');
        setPassword('');
        setNewUserID(null);
    
    }
    };
return (
    
<div className="form" style={{
        border: "1px solid white",
        padding: "50px",
        marginLeft: "25%",
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
<input onChange={handleEmail} className="input"
value={email} type="password" />
<label className="label"><p>Powtórz hasło:</p></label>
<input onChange={handlePassword} className="input"
value={password} type="password" />
<Button
          marginesTop={"2vh"}
          margines={"0 auto"}
          text={"Zarejstruj"}
          fun={handleSubmit}
          color={"white"}
        />
</form>
</div>
</div>
);
}
