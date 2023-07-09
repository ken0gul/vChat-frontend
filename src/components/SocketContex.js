import SimplePeer from "simple-peer";
const { createContext, useEffect, useState, useRef } = require("react");
const { io } = require("socket.io-client");

const SocketContext = createContext();

const socket = io("https://vchat-api-production.up.railway.app");

const ContextProvider = ({ children }) => {
  const [stream, setStream] = useState(null);
  const [me, setMe] = useState("");
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  useEffect(() => {
    const constraints = {
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
        googEchoCancellation: true,
        googAutoGainControl: true,
        googNoiseSuppression: true,
        googHighpassFilter: true,
        googTypingNoiseDetection: true,
        googNoiseReduction: true,
        volume: 1.0,
      },
      video: {
        mandatory: {
          minWidth: 300,
          minHeight: 300,
          minFrameRate: 30,
        },
      },
    };
    navigator.mediaDevices.getUserMedia(constraints).then((currentStream) => {
      setStream(currentStream);
      if (myVideo && myVideo.current) {
        myVideo.current.srcObject = currentStream;
        myVideo.current.muted = true;
        myVideo.current.play();
      }
    });

    socket.on("me", (id) => setMe(id));
    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({
        isReceivingCall: true,
        from,
        name: callerName,
        signal,
        isCallingSomeone: true,
      });
    });
  }, []);
  const answerCall = () => {
    setCallAccepted(true);

    const peer = new SimplePeer({ initiator: false, trickle: false, stream });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });
    peer.on("stream", (currentStream) => {
      if (userVideo && userVideo.current) {
        userVideo.current.srcObject = currentStream;
      } else {
        setTimeout(() => {
          userVideo.current.srcObject = currentStream;
        }, 1500);
      }
    });
    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new SimplePeer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });
    peer.on("stream", (currentStream) => {
      if (userVideo && userVideo.current) {
        userVideo.current.srcObject = currentStream;
      } else {
        setTimeout(() => {
          userVideo.current.srcObject = currentStream;
        }, 1500);
      }
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
      connectionRef.current = peer;
    });
  };

  const endCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();

    window.location.reload();
  };
  const values = {
    call,
    callAccepted,
    myVideo: myVideo,
    userVideo,
    connectionRef,
    stream,
    name,
    setName,
    callEnded,
    me,
    callUser,
    endCall,
    answerCall,
  };
  return (
    <SocketContext.Provider value={values}>{children}</SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
