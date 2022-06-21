import React, { useState, useEffect, MouseEvent } from "react";
import Button from "./Button";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { FaUserPlus, FaUsers } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdAdd } from "react-icons/md";
import { BiDotsVerticalRounded } from "react-icons/bi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./task.css";
import { RiCloseFill } from "react-icons/ri";
import TextEditor from "./TextEditor.js";
import axios from 'axios';

const AddTask = (props) => {
  const content = ContentState.createFromText(props.tresc);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(content)
  );

  useEffect(() => {
    console.log(editorState);
  }, [editorState]);

  const [startDate, setStartDate] = React.useState(new Date(props.data));
  const [prior, setPriorytet] = React.useState(props.priorytet);
  const [tyt, setTytul] = React.useState(props.tytul);
  const [tr, setTresc] = React.useState(props.tresc);
  const [value, setValue] = React.useState("");
  const [tagi, setTagi] = React.useState(props.tagi);

  async function handleOnClick() {
    // var text = editorState.getCurrentContent().getBlocksAsArray();
    // console.log(text);
    const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
    const mappedBlocks = blocks.map(
      (block) => (!block.text.trim() && "\n") || block.text
    );

    let newText = "";
    for (let i = 0; i < mappedBlocks.length; i++) {
      const block = mappedBlocks[i];

      // handle last block
      if (i === mappedBlocks.length - 1) {
        newText += block;
      } else {
        // otherwise we join with \n, except if the block is already a \n
        if (block === "\n") newText += block;
        else newText += block + "\n";
      }

      var noteId
      var boardNotes = []

      setTresc(newText);
      await axios.post("http://localhost:8080/notes", {
        "title": tyt,
        "contents": tr,
        "userIds": [props.userId],
        "groupIds": ["2131asdafspiqfwikwp"],
        "priority": prior,
        "date": startDate,
        "tags": tagi
        });
      await props.funkcja('board');

      await axios.get("http://localhost:8080/notes").then((res)=>
      {
        noteId = res.data["_embedded"]["notes"].at(-1)["id"]
      })
      console.log("Board id:" + props.boardId);
      await axios.get("http://localhost:8080/boards/" + props.boardId).then((res)=>
      {
        boardNotes = res.data["notesIds"]
      })

      await axios.patch("http://localhost:8080/boards/" + props.boardId, 
        { "notesIds": [...boardNotes, noteId] }
      );

      await props.funkcja('board');
    }
  }

  return (
    <div
      style={{
        border: "1px solid black",
        width: "70%",
        margin: "auto",
        marginTop: "6vh",
        minHeight: "800px",
        borderRadius: "12px",
        backgroundColor: "#FFFFA7",
      }}
    >
      <div style={{ minHeight: "800px" }}>
        <div style={{ display: "flex" }}>
          <input
            style={{
              fontSize: "30px",
              width: "100%",
              margin: "20px",
              border: "1px solid black",
              borderRadius: "12px",
              textAlign: "center",
            }}
            defaultValue={props.tytul}
            onChange={(e) => setTytul(e.target.value)}
          />
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
          <input
            style={{
              fontSize: "20px",
              height: "30px",
              margin: "auto",
              marginRight: "50px",
              width: "50px",
              textAlign: "center",
              borderRadius: "12px",
              backgroundColor: "white",
            }}
            type="number"
            name="age"
            defaultValue={prior}
            min={1}
            max={10}
            onChange={(e) => setPriorytet(e.target.value)}
          />
        </div>
        <div
          style={{
            backgroundColor: "white",
            padding: "2px",
            width: "90%",
            margin: "auto",
          }}
        >
          {/* <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            toolbarClassName="toolbarClassName"
  wrapperClassName="wrapperClassName"
  editorClassName="editorClassName"
          />  */}
          <TextEditor setValue={setValue} tresc={props.tresc} fun={setTresc} />
        </div>
        <input
          style={{
            backgroundColor: "white",
            borderRadius: "6px",
            fontSize: "20px",
            width: "90%",
            marginTop: "10px",
          }}
          defaultValue={tagi}
          onChange={(e) => setTagi(((e.target.value+" ").replace(/\s/g, '')).split(","))}
        />
        <Button
          //fun={() => {setShowEditor(false)}}
          fun={handleOnClick}
          width_p={"15%"}
          marginesTop={"15px"}
          margines={"auto"}
          text={"Dodaj"}
        />
      </div>
    </div>
  );
};

export default AddTask;
