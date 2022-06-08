import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";


import "./Chat.css";
import onlineIcon from '../../Icons/onlineIcon.png';
import closeIcon from '../../Icons/closeIcon.png';

function Chat({ socket, username, channel }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  
   //send message
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        channel: channel,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      localStorage.setItem('allMessages',JSON.stringify(messageData));
      
      setCurrentMessage("");
    }
  };

   

  useEffect(() => {
    const allmessage=localStorage.getItem('allMessages');
    
        if(allmessage){
            const all= JSON.parse(allmessage);
            setMessageList((list)=>[...list,all]);
            console.log(all);
            }
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
      
    });
  }, [socket]);


  //clear localstorage
  const handleLogout=()=>{
    localStorage.clear();
  };


  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      </div>
        <p>Live Chat</p>
        <div className="rightInnerContainer">
         <a href="/" ><img src={closeIcon} alt="close icon" onClick={handleLogout} /></a>
        </div>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent,i) => {
            return (
              <div key={i}
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat