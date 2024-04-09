import DeleteIcon from "./trash-can-icon.png";

const SidebarAsset = ({ asset, onClick, selected, deleting }) => {
  return (
    <div
      className={selected === asset ? `SidebarAsset selected` : "SidebarAsset"}
      onClick={() => onClick(asset)}
    >
      <div className="IconContainer">
        <img src={asset.img ?? ""} alt="" />
      </div>
      <div className="SidebarText">
        <h5>{asset.name}</h5>
        <span> {asset.assetDescription ?? " "}</span>
      </div>
      {deleting && (
        <div className="SidebarAsset-DeleteIcon-search">
          <img src={DeleteIcon} alt="-" />
        </div>
      )}
    </div>
  );
};

export default SidebarAsset;
