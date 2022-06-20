import React,{ useRef } from 'react'

const MiniTask = (props) => {

  const ChipStyles = useRef({
    backgroundColor:'#FFFFA7',
    marginTop: "2px",
    marginLeft: '5px',
    transform: 'translate(-50%, -50)',
    border:'1px solid black',
    borderRadius:'3px',
    width:'110px',
    height:'100%',
    overflowY: 'auto'
});

  return (
    <div style={{height:'100px'}}>
      <button style={ChipStyles.current}>
      <p style={{color: props.textColor, fontSize: "2 px"}}>{props.tytul}</p>
        <p style={{color: props.textColor, fontSize: "1 px"}} dangerouslySetInnerHTML={{__html: props.tresc}} />
      </button>
    </div>  
  )
}

export default MiniTask