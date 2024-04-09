import GaugeComponent from "react-gauge-component";


const GaugeWaterQ = ({ value, min = 0, max = 100, title = '' }) => {
  const divisions = [
    {
      length: 0.25,
      color: '#e5352c',
    },
    {
      length: 0.25,
      color: '#fbbf0a',
    },
    {
      length: 0.2,
      color: '#f4e500',
    },
    {
      length: 0.2,
      color: '#84b819',
    },
    {
      length: 0.1,
      color: '#34acde',
    }

  ]

  const arc = {
    width: 0.2,
    padding: 0.005,
    cornerRadius: 1,
    subArcs: divisions
  };

  const pointer = {
    color: '#345243',
    length: 0.80,
    width: 15,
    // elastic: true,
    animationDuration: 500
  };

  const labels =
  {
    valueLabel: {
      style: {
        fontSize: "28px",
        fill: "#D0D0FF",
        textShadow: "-1px -1px 2px #000"
      }
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'start' }}>
      <span style={{ marginBottom: -16, fontWeight: 550 }}>{title}</span>
      <GaugeComponent
        type="semicircle"
        arc={arc}
        pointer={pointer}
        value={value}
        minValue={min}
        maxValue={max}
        labels={labels}
        style={{ width: '85%' }}
      />
    </div>

  );
}

export default GaugeWaterQ;