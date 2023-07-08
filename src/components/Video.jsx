import React from "react";

const Video = ({ myRef }) => {
  return <video muted ref={myRef} autoPlay className="video" />;
};
export default Video;
