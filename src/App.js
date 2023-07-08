import VideoPlayer from "./components/VideoPlayer";
import Options from "./components/Options";
import Notif from "./components/Notif";

const App = () => {
  return (
    <div>
      <h1>Kebo's Video Chat Room</h1>
      <VideoPlayer />
      <Options>
        <Notif />
      </Options>
    </div>
  );
};

export default App;
