import React from 'react'
import MiniTask from "./MiniTask";


const MiniBoardList = (props) => {

    const firstThreeTasks = props.board.notesIds.slice(0,3);

    return (
    <div onClick={props.fun} style={{border: 'solid white 1px', borderRadius: '5px', width:'700px', height:'160px', float: 'left', marginLeft: '25px', marginTop: '15px',overflowY: "auto"}}>
        <h2 style={{textAlign: 'center'}}>{props.board.name}</h2>
        <div >
        {(firstThreeTasks).map((task) => (
            <div style={{border:'1px solid black'}}>
            <p style={{textAlign: 'center', marginLeft: '10px'}}><strong>{props.notes[props.notes.findIndex(obj => obj.id==task)].title}</strong></p>
            <p style={{color: props.textColor, fontSize: "1 px", overflowY: "auto", height:'50px'}} dangerouslySetInnerHTML={{__html: props.notes[props.notes.findIndex(obj => obj.id==task)].contents}} />
            </div>
            ))}</div>    
            
    </div> 
)
}

export default MiniBoardList