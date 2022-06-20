import React,{ useRef } from 'react'
import Draggable from "react-draggable";
import {BsArrowsMove} from "react-icons/bs";

const Task = (props) => {

  const ChipStyles = useRef({
    backgroundColor:'#FFFFA7',
    position: 'absolute',
    marginTop: Math.floor(Math.random()*500),
    marginLeft: Math.floor(Math.random()*100),
    transform: 'translate(-50%, -50)',
    border:'1px solid black',
    borderRadius:'12px',
    width:'300px',
    height:'200px',
});

  if(props.isSample){
    ChipStyles.current.marginLeft = "20px";
    ChipStyles.current.marginTop = "100px";
  }

  return (
    <Draggable>
      <button style={ChipStyles.current}>
      <h2 style={{color: props.textColor, fontSize: props.titleSize+"px"}}>{props.tytul}</h2>
        <div style={{overflowY: 'auto'}} dangerouslySetInnerHTML={{__html: props.tresc}} />
        {<BsArrowsMove onClick={props.onIcon} style={{position: 'fixed' ,bottom: '5', right: '5',fontSize:'2.5vh'}}/>}
      </button>
    </Draggable>
    
  )
}

export default Task