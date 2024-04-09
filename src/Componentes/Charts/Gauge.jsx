import GaugeComponent from "react-gauge-component";

const Gauge = ({ value, min = 0, max = 110 }) => {
  const divisions = [
    {
      length: 0.4,
      color: "#ff5e62",
    },
    {
      length: 0.4,
      color: "#fafb6a",
    },
    {
      color: "#94f465",
    },
  ];

  const arc = {
    width: 0.2,
    padding: 0.005,
    cornerRadius: 1,
    subArcs: divisions,
  };

  const pointer = {
    color: "#345243",
    length: 0.8,
    width: 15,
    // elastic: true,
    animationDuration: 500,
  };

  const labels = {
    valueLabel: {
      style: {
        fontSize: "28px",
        fill: "#D0D0FF",
        textShadow: "-1px -1px 2px #000",
      },
    },
  };

  return (
    <GaugeComponent
      type="semicircle"
      arc={arc}
      pointer={pointer}
      value={value}
      minValue={min}
      maxValue={max}
      labels={labels}
    />
  );
};

export default Gauge;
