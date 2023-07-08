import React, { useContext } from "react";
import { SocketContext } from "./SocketContex";

const VideoPlayer = () => {
  const { userVideo, callAccepted, myVideo, callEnded, stream } =
    useContext(SocketContext);
  return (
    <>
      {stream && (
        <div className="video-container">
          <video playsInline muted ref={myVideo} autoPlay className="video" />
        </div>
      )}
      {callAccepted && !callEnded && (
        <div className="video-container">
          <video playsInline ref={userVideo} autoPlay className="video" />
        </div>
      )}
    </>
  );
};

export default VideoPlayer;
