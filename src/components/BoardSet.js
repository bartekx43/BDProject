import React from "react";
import MiniBoard from "./MiniBoard";
import MiniBoardList from "./MiniBoardList";

const BoardSet = (props) => {
  return (
    <div
      style={{
        border: "4px solid white",
        padding: "50px",
        marginLeft: "5%",
        marginTop: "5%",
        width: "800px",
        height: "500px",
        borderRadius: "12px",
        color: "lightgray",
        overflowY: "scroll",
      }}
    >
      {props.format === "tablica" &&
        props.boards.map((item) => (
          <MiniBoard
            fun={() => {
              props.changeBoard(item.id);
              console.log(item.id);
            }}
            board={item} 
            notes={props.notes}
          />
          
          
        ))}
      {props.format === "lista" &&
        props.boards.map((item) => (
          <MiniBoardList
            fun={() => {
              props.changeBoard(item.id);
              //props.changeState("board");
            }}
            board={item} 
            notes={props.notes}
          />
        ))}
    </div>
  );
};

export default BoardSet;
