import React, { useContext } from "react";
import { SocketContext } from "./SocketContex";

const Notif = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);
  console.log(call);
  return (
    <div>
      {call.isReceivingCall && !callAccepted && (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <h1>{call.callerName} is calling:</h1>
          <button onClick={answerCall}>Answer</button>
        </div>
      )}
    </div>
  );
};

export default Notif;