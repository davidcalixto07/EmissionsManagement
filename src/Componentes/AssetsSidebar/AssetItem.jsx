import { useState } from "react";

function AssetItem({ asset, addRemoveList, isChecked }) {
  const [selected, setSelected] = useState(isChecked);

  const handleCheckboxChange = () => {
    addRemoveList(asset, !selected);
    setSelected(!selected);
  };

  return (
    <li>
      <label for={asset.assetId}>
        <div className="AssetItem" style={{ marginLeft: 20 * asset.nestDeep }}>
          <span className="AssetItem-name">
            <input
              type="checkbox"
              disabled={isChecked}
              checked={selected}
              onChange={handleCheckboxChange}
              id={asset.assetId}
            />
            {asset.name}
          </span>
          <span className="AssetItem-assetType">{asset.typeId}</span>
        </div>
      </label>
    </li>
  );
}
export { AssetItem };

//props.loc
