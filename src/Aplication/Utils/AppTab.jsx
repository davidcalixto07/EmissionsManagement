const AppTab = ({ label, link, selected, disabled, clicked }) => {
  const isSelected = selected === label;

  if (disabled)
    return (
      <div className="Tab disabled" to="">
        {label}
      </div>
    );
  else
    return (
      <div
        className={isSelected ? "Tab selected" : "Tab"}
        onClick={() => clicked(label)}
      >
        {label}
      </div>
    );
};
export default AppTab;
