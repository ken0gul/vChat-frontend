import React from "react";

const Video = ({ myRef, isMuted }) => {
  return (
    <video playsInline muted={isMuted} ref={myRef} autoPlay className="video" />
  );
};
export default Video;
