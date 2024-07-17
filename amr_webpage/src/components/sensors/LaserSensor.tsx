interface LaserSensorProps {
  forward: number;
  left: number;
  right: number;
}

export default function LaserSensor({
  forward,
  left,
  right,
}: LaserSensorProps) {
  return (
    <div className="control">
      <label>Obstacles</label>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td>
              Forward: <span>{forward.toFixed(2)}</span>
            </td>
            <td></td>
          </tr>
          <tr>
            <td colSpan={3}>&nbsp;</td>
          </tr>
          <tr>
            <td>
              Left: <span>{left.toFixed(2)}</span>
            </td>
            <td> TT </td>
            <td>
              Right: <span>{right.toFixed(2)}</span>
            </td>
          </tr>
          <tr>
            <td colSpan={3}>&nbsp;</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
