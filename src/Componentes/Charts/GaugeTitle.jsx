import Gauge from './Gauge';

const GaugeTitle = ({ title, value, min = 0, max = 110 }) => {
  const divisions = [
    {
      length: 0.5,
      color: '#ff5e62',
    },
    {
      length: 0.3,
      color: '#fafb6a',
    },
    {
      color: '#94f465',
    }
  ]

  const arc = {
    width: 0.2,
    padding: 0.005,
    cornerRadius: 1,
    subArcs: divisions
  };

  const pointer = {
    color: '#848293A0',
    baseColor: '#FF0000',
    length: 0.80,
    width: 15,
    animationDuration: 500
  };

  const labels =
  {
    valueLabel: {
      style: {
        fontSize: "28px",
        fontWeight: 400,
        fill: "#00000F",
      }
    }
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'start' }}>
      <span style={{ marginBottom: -8, fontWeight: 550 }}>{title}</span>
      <Gauge value={value} min={min} max={max} />
    </div>
  );
}

export default GaugeTitle;