import { FaUserPlus, FaSignOutAlt } from "react-icons/fa";
import React, { useState } from "react";
import { Image } from "react-native";
import Button from "./Button";
import GroupsJson from "../Groups.json";

const Groups = (props) => {
  const [option, setOption] = useState("lista");
  const [isPassword, setIsPassword] = useState(false);

  return (
    <div>
      <div style={{ display: "flex", width: "700px", marginLeft: "270px" }}>
        <Button
          marginesTop={"50px"}
          margines={"0 auto"}
          text={"Lista grup"}
          fun={() => {
            setOption("lista");
          }}
          color={"white"}
        />
        <Button
          marginesTop={"50px"}
          margines={"0 auto"}
          text={"Stwórz grupę"}
          fun={() => {
            setOption("create");
          }}
          color={"white"}
        />
        <Button
          marginesTop={"50px"}
          margines={"0 auto"}
          text={"Dołącz do grupy"}
          fun={() => {
            setOption("join");
          }}
          color={"white"}
        />
      </div>
      {option === "lista" && (
        <div
          style={{
            border: "1px solid white",
            padding: "50px",
            margin: "50px",
            height: "200px",
            width: "100%",
            borderRadius: "12px",
          }}
        >
          <table
            style={{
              color: "lightGray",
              fontSize: "20px",
              width: "100%",
              textAlign: "center",
            }}
          >
            <tr>
              <th>Nazwa</th>
              <th>Hasło</th>
              <th>Użytkownicy</th>
              <th style={{ textAlign: "left" }}>Akcje</th>
            </tr>
            {props.groups.map((item) => {
              return (
                <tr>
                  <td>{item.name}</td>
                  {item.hash!=null ? <td>TAK</td> : <td>NIE</td>}
                  <td>
                    <div style={{ display: "flex", marginLeft: "100px" }}>
                      {item.memberIds.map((user) => {
                        return (
                          <Image
                            source={require("../sample.jpg")}
                            style={{
                              width: 18,
                              height: 18,
                              borderRadius: 18 / 2,
                              marginLeft: "5px",
                            }}
                          />
                        );
                      })}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: "flex" }}>
                      <FaUserPlus onClick={() => alert()} />
                      <FaSignOutAlt onClick={() => alert()} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      )}
      {option === "create" && (
        <div
          style={{
            border: "1px solid white",
            padding: "50px",
            margin: "50px",
            width: "100%",
            borderRadius: "12px",
            color: "lightgray",
          }}
        >
          <div style={{ display: "flex", marginLeft: "350px" }}>
            <p style={{ fontSize: "20px", margin: "20px", marginTop: "25px" }}>
              Nazwa
            </p>
            <input
              style={{
                fontSize: "20px",
                height: "30px",
                marginLeft: "20px",
                marginTop: "20px",
                width: "150px",
                textAlign: "center",
              }}
              type="text"
              name="groupName"
            />
          </div>
          <div style={{ display: "flex", marginLeft: "384px" }}>
            <input
              id="passwordCheck"
              style={{
                fontSize: "20px",
                height: "30px",
                marginLeft: "5px",
                marginTop: "18px",
                width: "50px",
                textAlign: "center",
              }}
              type="checkbox"
              name="isPassword"
              onChange={() => {
                setIsPassword(!isPassword);
              }}
            />
            <p style={{ fontSize: "20px", margin: "20px" }}>Chroniona hasłem</p>
          </div>
          <div style={{ display: "flex", marginLeft: "362px" }}>
            <p style={{ fontSize: "20px", margin: "18px", marginTop: "25px" }}>
              Hasło
            </p>
            <input
              style={{
                fontSize: "20px",
                height: "30px",
                marginLeft: "20px",
                marginTop: "20px",
                width: "150px",
                textAlign: "center",
              }}
              id="password"
              type="password"
              disabled={!isPassword}
            />
          </div>
          <p style={{ fontSize: "20px", margin: "20px" }}>Użytkownicy</p>
          <div style={{ display: "flex" }}>
            {/* <Avatar size='50px' round={true} name={"H"}/>
            <Avatar size='50px' round={true} name={"P"}/>
            <Avatar size='50px' round={true} name={"O"}/> */}
          </div>
          {isPassword && (
            <div style={{ display: "flex" }}>
              <Button
                marginesTop={"20px"}
                margines={"0 auto"}
                text={"Dodaj użytkowników"}
                fun={() => {
                  alert("dodawanie");
                }}
                color={"white"}
              />
              <Button
                marginesTop={"20px"}
                margines={"0 auto"}
                text={"Stwórz grupę"}
                fun={() => {
                  alert("tworzenie");
                }}
                color={"white"}
              />
            </div>
          )}
          {!isPassword && (
            <div style={{ display: "flex" }}>
              <Button
                marginesTop={"80px"}
                margines={"0 auto"}
                text={"Dodaj użytkownika"}
                fun={() => {
                  alert("dodawanie");
                }}
                color={"white"}
              />
              <input
                style={{
                  fontSize: "20px",
                  height: "37px",
                  width: "150px",
                  textAlign: "center",
                  margin: "auto",
                  marginRight: "25%",
                  marginLeft: "22%",
                }}
                type="text"
                defaultValue="nick"
                name="nick"
              />
              <Button
                marginesTop={"77px"}
                margines={"0 auto"}
                text={"Stwórz grupę"}
                fun={() => {
                  alert("tworzenie");
                }}
                color={"white"}
              />
            </div>
          )}
        </div>
      )}
      {option === "join" && (
        <div
          style={{
            color: "lightgray",
            border: "1px solid white",
            padding: "50px",
            margin: "50px",
            width: "100%",
            borderRadius: "12px",
          }}
        >
          <div style={{ display: "flex", marginLeft: "350px" }}>
            <p style={{ fontSize: "20px", margin: "20px", marginTop: "25px" }}>
              Nazwa
            </p>
            <input
              style={{
                fontSize: "20px",
                height: "30px",
                marginLeft: "20px",
                marginTop: "20px",
                width: "150px",
                textAlign: "center",
              }}
              type="text"
              name="groupName"
            />
          </div>
          <div style={{ display: "flex", marginLeft: "240px" }}>
            <p style={{ fontSize: "20px", margin: "20px", marginTop: "25px" }}>
              Hasło (opcjonalnie)
            </p>
            <input
              style={{
                fontSize: "20px",
                height: "30px",
                marginLeft: "20px",
                marginTop: "20px",
                width: "150px",
                textAlign: "center",
              }}
              type="password"
              name="password"
            />
          </div>
          <div style={{ display: "flex" }}>
            <Button
              marginesTop={"20px"}
              margines={"0 auto"}
              text={"Dołącz do grupy"}
              fun={() => {
                alert("dołączanie");
              }}
              color={"white"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Groups;
