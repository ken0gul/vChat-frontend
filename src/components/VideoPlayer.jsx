import React, { useContext } from "react";
import { SocketContext } from "./SocketContex";

const VideoPlayer = () => {
  const { userVideo, name, callAccepted, myVideo, callEnded, stream, call } =
    useContext(SocketContext);
  return (
    <>
      {stream && (
        <div>
          <h2>{name || "Name"}</h2>
          <video playsInline muted ref={myVideo} autoPlay className="video" />
        </div>
      )}
      {callAccepted && !callEnded && (
        <div>
          <h2>{call.name || "Name"}</h2>
          <video playsInline ref={userVideo} autoPlay className="video" />
        </div>
      )}
    </>
  );
};

export default VideoPlayer;
