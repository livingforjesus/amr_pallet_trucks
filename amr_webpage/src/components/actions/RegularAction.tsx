"use strict";

import { useCallback } from "react";
import ROSLIB from "roslib";

interface RegularActionProps {
  setTask: (task: number) => void;
  handleRequest: (request: ROSLIB.ServiceRequest) => void;
  name: string;
  requestData: Record<string, any>;
}

export default function RegularAction({
  setTask,
  handleRequest,
  name,
  requestData,
}: RegularActionProps) {
  const taskNumber = 1;

  const onStartClick = useCallback(() => {
    setTask(taskNumber);
    const request = new ROSLIB.ServiceRequest(requestData);
    handleRequest(request);
  }, []);

  return (
    <div className="control align-center">
      <button className="btn btn-info" onClick={onStartClick}>
        {name}
      </button>
    </div>
  );
}
