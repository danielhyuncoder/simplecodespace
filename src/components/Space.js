import React, { useEffect, useState } from 'react'
import '../App.css'
import { useParams } from 'react-router-dom'
import {io} from 'socket.io-client'
import {socketserveraddress} from '../variables'
const socket=io(socketserveraddress);
const Space = () => {
  const {id} = useParams();
  const[code, setCode] = useState("");
  const[output, setOutput] = useState("");
  const[lang, setLang]=useState("cpp")
  //const uid=(Math.floor(Math.random()*1000000)+100).toString()+(Math.floor(Math.random()*1000000)+100).toString()+(Math.floor(Math.random()*1000000)+100).toString()+(Math.floor(Math.random()*1000000)+100).toString()+(Math.floor(Math.random()*1000000)+100).toString()+(Math.floor(Math.random()*1000000)+100).toString()+(Math.floor(Math.random()*1000000)+100).toString()+(Math.floor(Math.random()*1000000)+100).toString()+(Math.floor(Math.random()*1000000)+100).toString()+(Math.floor(Math.random()*1000000)+100).toString()+(Math.floor(Math.random()*1000000)+100).toString()+(Math.floor(Math.random()*1000000)+100).toString()
  useEffect(() => {
      socket.on("code_change/"+id.toString(), (c)=>{
          setCode(c);
      })
      socket.on("code_run/"+id, (res)=>{
        //console.log(res)
         if (res.error.length>0){
            setOutput(res.error);
         } else if (res.stderr.length>0){
          setOutput(res.stderr);
         } else {
          setOutput(res.stdout);
         }
      })
  }, [socket])
  return (
    <div className='semiMainContainer'>
       <div className="headerContainer">
          <div>
             <h2 className="alter2">{"!small<Code/>#Spaces"}</h2>
             <h3 className="alter">Invite: {window.location.toString()}</h3>
          </div>
       </div>
       <textarea onChange={(e)=>{
        setCode(e.target.value)
        socket.emit("code_change", e.target.value, id.toString());
       }} type="text" value={code} className='codearea'></textarea>
       <div className="runCode">
          <div className="runLangContainer">
            <select onChange={(e)=>{
                setLang(e.target.value)
            }}>
              <option value={"cpp"}>C++</option>
              <option value="python">Python 3</option>
              <option value="java">Java</option>
              <option value="javascript">JavaScript</option>
              <option value="c">C</option>
              <option value="csharp">C#</option>
            </select>
            <button className="runBtn" onClick={()=>{
              socket.emit("code_run", code, id, lang);
            }}>Run</button>
            
          </div>
          <div className="outputBox"><div>{output}</div></div>
       </div>
    </div>
  )
}

export default Space