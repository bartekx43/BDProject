import React, {useState,useRef} from "react";

import JoditEditor from "jodit-react";

const TextEditor =({setValue,tresc,fun})=>{

  const [content, setContent] = useState(tresc);
  
  function f(e)
  {
    console.log(e);
    {fun(e)};
  }

  const editor =useRef(null);
  return <JoditEditor 
    ref={editor}
    value={content}
    tabIndex={1} 
    onChange={(newContent) => f(newContent)}
  />
}
export default TextEditor