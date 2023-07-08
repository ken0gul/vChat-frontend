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
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        if (myVideo && myVideo.current) {
          myVideo.current.srcObject = currentStream;
        }
      });

    socket.on("me", (id) => setMe(id));
    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);
  const answerCall = () => {
    setCallAccepted(true);

    const peer = new SimplePeer({ initiator: false, trickle: false, stream });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });
    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
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
      userVideo.current.srcObject = currentStream;
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
