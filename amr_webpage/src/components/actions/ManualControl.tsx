import { useCallback, useRef } from "react";

interface ActionManualControlProps {
  setTask: (task: number) => void;
  publishCmdVel: (msg: any) => void;
  releaseTask: () => void;
}

export default function ActionManualControl({
  publishCmdVel,
  setTask,
  releaseTask,
}: ActionManualControlProps) {
  const taskInterval = useRef<number>();

  const taskName = "AMR Manual Control";
  const taskNumber = 2;

  const sendVelocityMessage = useCallback((linear: number, angular: number) => {
    taskInterval.current = setInterval(() => {
      let msg;

      msg = { linear: { x: linear }, angular: { z: angular } };

      publishCmdVel(msg);
    }, 50);
  }, []);
  const stopTask = useCallback(() => {
    releaseTask();

    const msg = {
      linear: { x: 0 },
      angular: { z: 0 },
    };
    publishCmdVel(msg);
    clearInterval(taskInterval.current);
  }, []);

  return (
    <div className="control align-center">
      <label>{taskName}</label>
      <button
        className="btn btn-success"
        onClick={() => {
          setTask(taskNumber);
          sendVelocityMessage(0.1, 0);
        }}
      >
        Forward
      </button>
      <br />
      <p> </p>
      <button
        className="btn btn-success"
        onClick={() => {
          setTask(taskNumber);
          sendVelocityMessage(-0.1, 0);
        }}
      >
        Backward
      </button>
      <br />
      <p> </p>
      <button
        className="btn btn-success"
        onClick={() => {
          setTask(taskNumber);
          sendVelocityMessage(0, -0.1);
        }}
      >
        Turn clockwise
      </button>
      <br />
      <p> </p>
      <button
        className="btn btn-success"
        onClick={() => {
          setTask(taskNumber);
          sendVelocityMessage(0, 0.1);
        }}
      >
        Turn counter-clockwise
      </button>
      <br />
      <p> </p>
      <button className="btn btn-danger" onClick={stopTask}>
        Stop
      </button>
    </div>
  );
}
