
import { useState } from "react";
import io from "socket.io-client";
import  "./Join.css";
const socket = io("http://localhost:5000");

function Join() {
    const [username,setUsername] = useState("");
    const [channel,setChannel] = useState("");

    const joinChannel = ()=>{
        if (username !== "" && channel !== ""){
          socket.emit("join_channel",channel);
        }
      };

  return (
    <div className="joinOuterContainer">
        <div className="joinInnerContainer">
        <h3>Join Channel</h3>
        <div>
          <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setUsername(event.target.value)} />
        </div>
        <div>
          <input placeholder="Channel" className="joinInput mt-20" type="text" onChange={(event) => setChannel(event.target.value)} />
        </div>
        <button className={'button mt-20'} type="submit" onClick={joinChannel}>Sign In</button>
    </div>
    </div>
  )
}

export default Join