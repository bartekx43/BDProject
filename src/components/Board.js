import React from "react";
import Task from "./Task";
import BigTask from "./BigTask";
import axios from 'axios';


const Board = (props, { funkcja }) => {
  const [showTasks, setShowTasks] = React.useState(true);
  const [aa, seta] = React.useState([]);
  const [tytul, setTytul] = React.useState("tytul");
  const [tresc, setTresc] = React.useState("tresc");
  const [data, setData] = React.useState("2022-05-01");
  const [priorytet, setPriorytet] = React.useState(1);
  const [tagi, setTagi] = React.useState(["abc"]);
  const [id, setId] = React.useState("");
  const [usersId, setUsersId] = React.useState([]);
  const [usersList, setUsersList] = React.useState([]);
  const [not, setNot] = React.useState(props.notatki);
  const [boardId, setBoardId] = React.useState(props.boardId);

  function findTask(idx)
  {
    axios.get('http://localhost:8080/notes/'+idx).then(res => {
     
      setTytul(res.data.title);
      setTresc(res.data.contents);
      setData(res.data.date);
      setPriorytet(res.data.priority);
      setTagi(res.data.tags);
      seta(res.data)
      setId(res.data.id);
      setUsersId(res.data.userIds);
      console.log(res.data.id);
      setShowTasks(false);
    });

    axios.get('http://localhost:8080/users/search/findAllByNoteAccess?id='+idx).then(res => {
     setUsersList(res.data);
     //console.log(res.data);
    });
  }

  function changeNot()
  {
    axios.get('http://localhost:8080/notes/search/findAllByBoardId?id='+boardId).then(res => {
      
      setNot(res.data);
    });
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {showTasks && (
        <div>
          <div>
            { not.map((item) => (
              <Task
               key={item.id}
                onIcon={() => {
                  findTask(item.id);                
                }}
                tytul={item.title}
                tresc={item.contents}
                {...props}
              />
            ))}

          </div>
        </div>
      )}
      {!showTasks && (
        <div style={{ height: "100%" }}>
          <BigTask
            onClose={() => {setShowTasks(true);changeNot()}}
            form={props.format}
            tytul={tytul}
            tresc={tresc}
            data={data}
            priorytet={priorytet}
            tagi={tagi}
            id={id}
            funkcja={() => funkcja}
            usersId={usersId}
            usersList={usersList}
          />
        </div>
      )}
    </div>
  );
};

export default Board;
