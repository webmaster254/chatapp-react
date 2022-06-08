
import { useEffect, useState } from "react";
import io from "socket.io-client";
import  "./Join.css";
import Chat from "../Chat/Chat"
const socket = io("https://zurichatapp-react.herokuapp.com/");

function Join() {
    const [username,setUsername] = useState("");
    const [channel,setChannel] = useState("");
    const [showChat,setShowChat] = useState(false);

    

    
    //join channel
    const joinChannel = ()=>{
        if (username !== "" && channel !== ""){
          socket.emit("join_channel",{username,channel});
          localStorage.setItem('user',username);
          localStorage.setItem('channel',channel);
          setShowChat(true);
        }
      };
       
      //save user and channel to localstorage
      useEffect(()=>{
        const loggedIn=localStorage.getItem('user');
        const channelIn=localStorage.getItem('channel');
        if(loggedIn && channelIn){
          const channelFound= channelIn;
          const foundUser= loggedIn;
          setUsername(foundUser);
          setChannel(channelFound);
          setShowChat(true);
        }
      },[]);

      const changeChannel=(newChannel)=>{
        setChannel(newChannel)
      }
      

  return (
    
    <div className="joinOuterContainer">
        {!showChat?(
        <div className="joinInnerContainer">
        <h3>Join Zuri Channel Live Chat</h3>
        <div>
          <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setUsername(event.target.value)} />
        </div>
        {/* <div>
          <input placeholder="Channel" className="joinInput mt-20" type="text" onChange={(event) => setChannel(event.target.value)} />
        </div> */}
        <div>
          <select className="channels"
          
          onChange={(event) => changeChannel(event.target.value)}
          value={channel}>
            <option value="frontend" >Frontend</option>
            <option value="backend" >Backend</option>
            <option value="product-design" >Product Design</option>
            <option value="fullstack" >Fullstack</option>

            </select>

        </div>
        <button className={'button mt-20'} type="submit" onClick={joinChannel}>Sign In</button>
    </div>
    ):(
        <Chat socket={socket} username={username} channel={channel}/>
      )}
    </div>
  )
}

export default Join