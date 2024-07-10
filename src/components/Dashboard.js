import React from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'
const Dashboard = () => {
  const navigate=useNavigate();
  return (
    <div className="mainContainer">
        <div>
            <h1 className="billboardText">!small{`<Code/>#Spaces`}</h1>
            <h1 className="headText">A simple online real-time programming platform.</h1>
            <br/><br/>
            <button className="createSpaceBtn" onClick={()=>{
              let seed = (Math.floor(Math.random()*1000000)+100).toString()+(Math.floor(Math.random()*1000000)+100).toString();
              navigate('/spaces/'+seed)
            }}>Create Space</button>
            
        </div>
    </div>
  )
}

export default Dashboard