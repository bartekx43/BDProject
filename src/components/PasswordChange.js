import React from 'react'
import Button from './Button'
import axios from 'axios';


const PasswordChange = (props) => {

const [old, SetOld] = React.useState('');
const [new1, SetNew1] = React.useState('');
const [new2, SetNew2] = React.useState('');

async function ChangePass()
{
    // if(old == props.user.hash && new1==new2)
    // {
    //     const r1 = await axios.patch('http://localhost:8080/users/'+props.user.id, {
    //         hash: new1
    //     })
    //     .then(function (response) {
    //         console.log(response);
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
    //     alert("Zmieniono hasło!")
    // }
    // else if (old != props.user.hash)
    // {
    //     alert("Błędne stare hasło!")
    // }
    //else 
    if (new1!=new2)
    {
        alert("Podane hasła różnią się!")
    }
    else
    {
        console.log(props.user.username)
        axios.post('http://localhost:8080/_changePassword', 
        {
            "username": props.user.username,
            "oldpassword": old,
            "newpassword": new1
        })
    }
}

return(
    <div style={{border: "1px solid white", padding: "50px", marginLeft: "25%", marginTop: "8%",height: "300px",borderRadius: "12px",color: "lightgray"}}>
        <div style={{flexDirection: "column", width: "200px"}}>
        <form>
            <label>
                <p>Poprzednie hasło:</p>
                <input type="text" name="oldPassword" onChange={ (event) => SetOld(event.target.value)}/>
            </label>
            <label>
                <p>Nowe hasło:</p>
                <input type="password" name="newPassword" onChange={ (event) => SetNew1(event.target.value)}/>
            </label>
            <label>
                <p>Powtórz hasło:</p>
                <input type="password" name="repeatPassword" onChange={ (event) => SetNew2(event.target.value)}/>
            </label>
        </form>
        <Button 
        marginesTop={'2vh'}
        margines={'0 auto'}
        text={"Zmień hasło"} 
        fun={() => {ChangePass()}}
        color={"white"}/>
        </div>
    </div>
  );
}


export default PasswordChange