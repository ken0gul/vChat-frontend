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
            <Video myRef={myVideo} />
          </div>
        </div>
      )}
      {callAccepted && !callEnded && (
        <div className="video-container">
          {userVideo ? <Video myRef={userVideo} /> : "loading"}
        </div>
      )}
    </>
  );
};

export default VideoPlayer;
