import React from "react";

const Video = ({ myRef }) => {
  return <video playsInline ref={myRef} autoPlay className="video" />;
};
export default Video;
