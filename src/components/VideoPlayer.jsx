import React, { useContext } from "react";
import { SocketContext } from "./SocketContex";
import Video from "./Video";

const VideoPlayer = () => {
  const { userVideo, callAccepted, myVideo, callEnded, stream } =
    useContext(SocketContext);
  return (
    <>
      {stream && (
        <div>
          <div className="video-container">
            {myVideo ? <Video myRef={myVideo} isMuted={true} /> : "Loading"}
          </div>
        </div>
      )}
      {callAccepted && !callEnded && (
        <div className="video-container">
          {userVideo ? <Video isMuted={false} myRef={userVideo} /> : "loading"}
        </div>
      )}
    </>
  );
};

export default VideoPlayer;
