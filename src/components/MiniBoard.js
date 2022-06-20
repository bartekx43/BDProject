import React from 'react'
import MiniTask from "./MiniTask";
import axios from 'axios';

const MiniBoard = (props) => {

    const firstThreeTasks = props.board.notesIds.slice(0,3);
    const [x,SetX] = React.useState('');
    return (

    <div onClick={props.fun} style={{border: 'solid white 1px', borderRadius: '5px', width:'350px', height:'300px', float: 'left', marginLeft: '25px', marginTop: '25px'}}>
        <h2 style={{textAlign: 'center'}}>{props.board.name}</h2>
        { <div style={{display:'flex'}}>
        {(firstThreeTasks).map((task) => (
             <MiniTask key={task+Math.random().toString()} tytul={props.notes[props.notes.findIndex(obj => obj.id==task)].title} tresc={props.notes[props.notes.findIndex(obj => obj.id==task)].contents}/>
             //console.log(props.notes[props.notes.findIndex(obj => obj.id==task)].title)

        ))}</div>     }
    </div>  
)
}


export default MiniBoard