import React, { useContext, useState } from "react";
import { SocketContext } from "./SocketContex";
import CopyToClipboard from "react-copy-to-clipboard";

function Options({ children }) {
  const { me, callAccepted, name, setName, callEnded, endCall, callUser } =
    useContext(SocketContext);
  const [idToCall, setIdToCall] = useState("");

  const handleCall = (e) => {
    e.preventDefault();
    callUser(idToCall);
  };
  return (
    <div className="options-wrapper">
      <form action="">
        <div>
          <label htmlFor="Name">Name</label>
          <input
            type="text"
            value={name}
            id="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <CopyToClipboard text={me} className="clipboard">
            <button onClick={(e) => e.preventDefault()}>Copy Your ID</button>
          </CopyToClipboard>
        </div>

        <div>
          <label htmlFor="idToCall">Id To Call</label>
          <input
            type="text"
            value={idToCall}
            onChange={(e) => setIdToCall(e.target.value)}
          />
          {callAccepted && !callEnded ? (
            <button onClick={endCall}>End call</button>
          ) : (
            <button onClick={handleCall}>Call</button>
          )}
        </div>
      </form>
      {children}
    </div>
  );
}
export default Options;
