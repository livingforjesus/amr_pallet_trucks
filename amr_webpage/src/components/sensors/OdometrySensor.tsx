interface OdometrySensorProps {
  lastMessage: Record<string, any>;
}

export default function OdometrySensor({ lastMessage }: OdometrySensorProps) {
  return (
    <div className="control">
      <label>Robot position</label>
      <div>
        <span>
          X: <u>{lastMessage.pose.pose.position.x.toFixed(2)}</u>
        </span>
        <br />
        <span>
          Y: <u>{lastMessage.pose.pose.position.y.toFixed(2)}</u>
        </span>
      </div>
    </div>
  );
}
