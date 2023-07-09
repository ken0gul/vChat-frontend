import React, { useContext } from "react";
import { SocketContext } from "./SocketContex";

const Notif = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);
  return (
    <div className="notify-container">
      {call.isReceivingCall && !callAccepted && (
        <div>
          <h1>{call.name || "Some dude "} is calling:</h1>
          <button className="calling-btn" onClick={answerCall}>
            Answer
          </button>
        </div>
      )}
      {call.isCallingSomeone && !callAccepted && (
        <h1>Calling: {call.name || "Some dude "} </h1>
      )}
    </div>
  );
};

export default Notif;
