import { findByTitle } from "@testing-library/react";
import React from "react";
import { Image } from "react-native";
import Button from "./Button";
import axios from 'axios';

const Account = (props) => {

  const [nick, SetNick] = React.useState(props.user.username);
  const [tempNick, SetTempNick] = React.useState(props.user.username);



  async function changeNick()
  {
    if(document.getElementById("nickInput").disabled==true)
    {
      const r1 = await axios.patch('http://localhost:8080/users/'+props.user.id, {
        username: tempNick
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
    });
    console.log(tempNick);
    }
    SetNick(tempNick);
  }

  return (
    <div
      style={{
        border: "1px solid white",
        padding: "50px",
        marginLeft: "20%",
        marginTop: "8%",
        height: "200px",
        borderRadius: "12px",
        color: "lightgray",
      }}
    >
      <div style={{ display: "flex" }}>
        <div style={{ display: "block", width: "50%" }}>
          <Image
            source={require("../sample.jpg")}
            style={{
              width: 150,
              height: 150,
              borderRadius: 150 / 2,
              marginLeft: 25,
            }}
          />
        </div>
        <div style={{ display: "block", marginLeft: "100px" }}>
          <h2>Login</h2>
          <input
            style={{
              fontSize: "20px",
              height: "37px",
              marginLeft: "1px",
              marginBottom: "10px",
              width: "150px",
              textAlign: "center",
            }}
            id="nickInput"
            type="text"
            defaultValue={nick}
            disabled={true}
            onChange={ (event) => SetTempNick(event.target.value) }
          ></input>
          <Button
            margines={"0 auto"}
            text={"Zmień nick"}
            fun={() => {
              document.getElementById("nickInput").disabled =
              document.getElementById("nickInput").disabled ? false : true;
              changeNick();
            }}
            color={"white"}
          />
        </div>
      </div>
      <div style={{ display: "flex", margin: "20px" }}>
        <div style={{ display: "block", margin: "5px", marginRight: "75px" }}>
          <Button
            margines={"0 auto"}
            text={"Zmień hasło"}
            fun={() => {
              props.changeBoardState("passwordChange");
            }}
            color={"white"}
          />
        </div>
        <div style={{ display: "block", margin: "5px" }}>
          <Button
            margines={"0 auto"}
            text={"Wyloguj"}
            fun={() => {
              props.changeBoardState('defaultState');
            }}
            color={"white"}
          />
        </div>
      </div>
    </div>
  );
};

export default Account;
