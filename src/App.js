import './App.css';
import Nav from './components/Nav'
import Nav2 from './components/Nav2'
import Board from './components/Board'
import Settings from './components/Settings'
import {AiTwotoneSetting} from "react-icons/ai";
import React, { useState, useEffect } from 'react';

import Button from './components/Button';
import Task from './components/Task';
import BigTask from './components/BigTask';
import Account from './components/Account';
import PasswordChange from './components/PasswordChange';
import Groups from './components/Groups';
import AddTask from './components/AddTask';
import BoardSet from './components/BoardSet';
import BoardsJson from './Boards.json' 
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import axios from 'axios';

function App() {

  // axios.post('http://localhost:8080/_login',{
  //         "username" : 'debug',
  //         "password" : 'pass'
  //         }

  //       );

  //PSEUDO BAZA DANYCH NOTATEK
  const Boards = [];
  
  const [bgColor, setBgColor] = useState('#3F3939');
  const [textColor, setTextColor] = useState('#000000');
  const [textSize, setTextSize] = useState('15');
  const [titleSize, setTitleSize] = useState('25');
  const [format, setFormat] = useState("tablica");
  const [numTask, setNumTask] = useState(1);
  const [boardId, setBoardId] = useState(0);
  const [showNav, setShowNav] = useState(true);
  

  const [boardState, setBoardState] = useState('pies');
  const [ac, setAc] = useState([]);
  const [flag, setFlag] = React.useState(0);
  const [userId, SetUserId] = React.useState("62b103611231000f0050fb87");
  const [aa, seta] = React.useState([]);
  const [user, SetUser] = React.useState([]);
  
  const [tytul, setTytul] = React.useState("tytul");
  const [tresc, setTresc] = React.useState("tresc");
  const [data, setData] = React.useState("2022-05-01");
  const [priorytet, setPriorytet] = React.useState(1);
  const [tagi, setTagi] = React.useState(["abc"]);
  const [id, setId] = React.useState("");
  const [usersId, setUsersId] = React.useState([]);
  const [usersList, setUsersList] = React.useState([]);
  const [boards, setBoards] =  React.useState([]);
  const [boardsId, SetBoardsId] = React.useState('');
  const [notes, SetNotes] = React.useState([]);
  const [groups, SetGroups] = React.useState([]);


  function findTask(idx)
  {
    axios.get('http://localhost:8080/notes/'+idx).then(res => {
     
      setTytul(res.data.title);
      setTresc(res.data.contents);
      setData(res.data.date);
      setPriorytet(res.data.priority);
      setTagi(res.data.tags);
      //seta(res.data)
      setId(res.data.id);
      setUsersId(res.data.userIds);
      console.log(res.data.id);
      //setShowTasks(false);
    });

    axios.get('http://localhost:8080/users/search/findAllByNoteAccess?id='+idx).then(res => {
     setUsersList(res.data);
     console.log(res.data);
    });
  }

  async function changeBoard(i)
  {
    console.log("zmiaA");
    const r = await SetBoardsId(i);
    const x = await console.log(boardsId+ " to to");
    const r1 = await setGet('board');
  }

  async function setGet(stan, logged=1)
  {
    //alert("USER: " + user);
    //alert("USERID: " + userId);
    console.log(user);
    console.log("user_id:  " + userId);

    if(logged != 0){
      var x=[];
      const rz = await axios.get('http://localhost:8080/notes').then(res => {  
        SetNotes(res.data["_embedded"]["notes"]);
      });
      
      console.log("tmp: " + userId);
      const r = await axios.get('http://localhost:8080/boards/search/findAllByUserId?userId='+userId).then(res => {  
        setBoards(res.data["_embedded"]["boards"]);
        x = res.data["_embedded"]["boards"];
        console.log(boards);
      });

      if(boardsId=='')
      {
        setBoardId(x[0].id);
        const r2= await axios.get('http://localhost:8080/notes/search/findAllByBoardId?id='+x[0].id).then(res => {
          seta(res.data);
          console.log("if");
        });
      }else{
        const r2= await axios.get('http://localhost:8080/notes/search/findAllByBoardId?id='+boardsId).then(res => { 
        seta(res.data);
        console.log("else");
        });
      }

      const r3= await axios.get('http://localhost:8080/users/'+userId).then(res => { 
        SetUser(res.data);
        console.log("else");
      });

      const r4 = await axios.get('http://localhost:8080/groups/search/findAllByMemberId?memberId='+userId).then(res => { 
        SetGroups(res.data["_embedded"]["groups"]);
        console.log(res.data);
      });
    }
    console.log(boardsId);
    setBoardState(stan);
    
  }

  const f = (id) =>
  {
    setNumTask(id);
  }

  function proba (){
    // axios.get('http://localhost:8080/notes').then(res => {
    //   console.log(res.data["_embedded"]["notes"][0]["title"]);
    // });
    // console.log(abc[0]["title"]);
    // axios.get('http://localhost:8080/boards').then(res => {
    // console.log(res.data["_embedded"]["boards"]);
  }


  const boardStateComponent = () => {
    
    if(format==='lista')
      {
        return(
          <div className="App" style={{display:'flex', background: bgColor}}>
            {showNav && <Nav2 changeBoardState={setGet}
            notatki={aa}
            fun={(title) => {
              findTask(title);                
            }}/>}
           
          <BigTask
           tytul={tytul}
           tresc={tresc}
           data={data}
           priorytet={priorytet}
           tagi={tagi}
           id={id}
           funkcja={()=>{}}
           usersId={usersId}
           usersList={usersList}
          />
          <AiTwotoneSetting style={{fontSize:'5vh',margin:'5vh',color:'white',marginTop:'40px'}} onClick={() => {setGet('settings')}}/>
          </div>
  
        );
      }
      else{
        return (
          <div className="App" style={{background: bgColor}}>
            
            <Nav changeBoardState={setGet} tytul={"Tablica"}/>
            <Board 
                  textColor={textColor}
                  textSize={textSize}
                  titleSize={titleSize}
                  isSample={false}
                  format={format}
                  //notatki={['1','b']}
                 // notatki={abc[0]}
                  notatki={aa}
                  boardId={boards[0].id}
                  funkcja={setShowNav}
                 
              />
            <AiTwotoneSetting style={{fontSize:'5vh',margin:'5vh' , color:"white",marginTop:'25px'}} onClick={() => {setGet('settings')}}/>
          </div>
        );
      }
  }

  const settingsState = () => (
    <div className="App" style={{background: bgColor}}>
      <div className="buttons" style={{margin: "50px"}}>
      <Button 
      margines={'0 auto'}
      text={"Strona główna"} 
      fun={() => {setGet('board')}}
      color={"white"}/>
      <Task 
      onIcon={() => {}} 
      tytul={"Test"} 
      tresc={"test test"} 
      textColor={textColor}
      textSize={textSize}
      titleSize={titleSize}
      isSample={true}/>
      </div>
      <Settings 
      bgColor={bgColor} changeBgColor={setBgColor}
      textColor={textColor} changeTextColor={setTextColor}
      textSize={textSize} changeTextSize={setTextSize}
      titleSize={titleSize} changeTitleSize={setTitleSize}
      isSample={true}
      format={format} changeFormat={setFormat}/>
      <AiTwotoneSetting style={{fontSize:'5vh',margin:'5vh', color:"white", marginTop:'56px'}} onClick={() => {setGet('board'); proba()}}/>
    </div>
  );

  const groupsState = () => (
    <div className="App" style={{background: bgColor}}>
      <div className="buttons" style={{margin: "50px"}}>
      <Button 
      margines={'0 auto'}
      text={"Strona główna"} 
      fun={() => {setGet('board')}}
      color={"white"}/>
      </div>
      <Groups user = {userId} groups={groups}/>
    </div>
  )

  const accountState = () => (
    <div className="App" style={{background: bgColor}}>
      <div className="buttons" style={{margin: "50px"}}>
      <Button 
      margines={'0 auto'}
      text={"Strona główna"} 
      fun={() => {setGet('board')}}
      color={"white"}/>
      </div>
      <Account changeBoardState={setGet} user={user}/>
    </div>
  )

  const passwordChangeState = () => (<div className="App" style={{background: bgColor}}>
  <div className="buttons" style={{margin: "50px"}}>
  <Button 
  margines={'0 auto'}
  text={"Strona główna"} 
  fun={() => {setBoardState('board')}}
  color={"white"}/>
  <Button 
  marginesTop={'2vh'}
  margines={'0 auto'}
  text={"Konto"} 
  fun={() => {setBoardState('account')}}
  color={"white"}/>
  </div>
  <PasswordChange changeBoardState={setGet} user={user}/>
</div>)

const addTaskState = () => (
  <div className="App" style={{display: 'flex', background: bgColor}}>
  <div className="buttons" style={{margin: "50px"}}>
  <Button 
  margines={'0 auto'}
  text={"Strona główna"} 
  fun={() => {setGet('board')}}
  color={"white"}/>
  </div>
  <AddTask   
    form={format}
    tytul={tytul}
    tresc={tresc}
    data={data}
    priorytet={priorytet}
    tagi={tagi}
    id={id}
    userId={userId}
    boardId={boardsId}
    usersList={usersList}
    funkcja={setGet}/>
</div>
)
const boardSetState = () => (
  <div className="App" style={{display: 'flex', background: bgColor}}>
    <div className="buttons" style={{margin: "50px"}}>
    <Button 
    margines={'0 auto'}
    text={"Strona główna"} 
    fun={() => {setGet('board')}}
    color={"white"}/>
    </div>
    <BoardSet
    boards={boards}
    changeBoard={changeBoard}
    notes={notes}
    format={format}
    />
  </div>
)
const registerState = () => (
  <div className="App" style={{display:'flex', background: bgColor}}>
  <div className="buttons" style={{margin: "50px"}}>
   <Button 
   margines={'0 auto'}
   text={"Wróć do logowania"} 
   fun={() => {setGet('login', 0)}}
   color={"white"}/>
   </div>

  <RegistrationForm/>
  </div>
)

const defaultState = () => (
  <div className="App" style={{display:'flex', background: bgColor}}>
	<LoginForm changeBoardState={setGet} changeUserID={SetUserId} changeFlag={setFlag}/>
  </div>
)


const RenderStates = ({ val }) => {
  // console.log("xd")
  switch(val) {
    case 'board': 
      return boardStateComponent();
    case 'settings':
      return settingsState();
    case 'groups':
      return groupsState();
    case 'account':
      return accountState();
    case 'passwordChange': 
      return passwordChangeState();
    case 'addTask': 
      return addTaskState();
    case 'boardSet': 
      return boardSetState();
    case 'register': 
      return registerState();
    default: 
      return defaultState();
  }
}


  return (
   <>
    <RenderStates val={boardState} />
   </>
  )

 
}



export default App;
