import { useCallback, useRef, useState } from "react";
import ROSLIB from "roslib";
import { useSnackbar } from "notistack";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RosPanel from "./components/RosPanel";

const DEFAULT_ROSBRIDGE =
  "wss://i-00221d5d24e3c2c98.robotigniteacademy.com/5bb64df8-92fe-4dad-bc04-b076367e63f3/rosbridge/";

function App() {
  const [connected, setConnected] = useState(false);
  const [rosbridgeAddress, setRosbridgeAddress] = useState(DEFAULT_ROSBRIDGE);
  const ros = useRef<ROSLIB.Ros>();
  const { enqueueSnackbar } = useSnackbar();

  const onConnect = useCallback(() => {
    try {
      ros.current = new ROSLIB.Ros({
        url: rosbridgeAddress,
      });
    } catch (error) {
      return;
    }

    ros.current.on("connection", () => {
      enqueueSnackbar("Successfully connected to websocket server.");
      setConnected(true);
    });
    ros.current.on("error", () => {
      enqueueSnackbar("Error occurred connecting to websocket server: ", {
        variant: "error",
      });
    });
    ros.current.on("close", () => {
      enqueueSnackbar("Connection to websocket server closed.", {
        variant: "info",
      });
      setConnected(false);
    });
  }, [enqueueSnackbar, rosbridgeAddress]);

  return (
    <div id="container">
      <Header />

      <div id="content">
        {/* Menu */}
        <div id="menu" className="column-30">
          <div className="control">
            <label>Rosbridge address</label>
            <input
              type="text"
              disabled={connected}
              onChange={(e) => {
                setRosbridgeAddress(e.target.value);
              }}
              value={rosbridgeAddress}
              id="rosbridge_address"
            />
          </div>
          {!connected && (
            <div className="control align-right">
              <button
                className="btn btn-success"
                type="button"
                onClick={onConnect}
              >
                Connect
              </button>
            </div>
          )}
          {connected && (
            <div className="control align-right">
              <button
                className="btn btn-danger"
                type="button"
                onClick={ros.current?.close}
              >
                Disconnect
              </button>
            </div>
          )}
        </div>

        {connected && ros.current && <RosPanel ros={ros.current} />}

        {/* Clear */}
        <div className="clear"></div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
