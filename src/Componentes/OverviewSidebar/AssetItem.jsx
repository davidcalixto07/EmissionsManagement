function AssetItem({ asset, onClick, selected }) {
  return (
    <label for={asset.assetId} onClick={() => onClick(asset.assetId)}>
      <div className="AssetItem"
        style={{
          marginLeft: (!asset.typeId || asset.typeId.startsWith('core.')) ? '0' : '2rem',
          borderWidth: selected ? "5px" : "1px"
        }}>
        <span className="AssetItem-name">
          {asset.name}
        </span>
        <span className="AssetItem-assetType">
          {asset.description}
        </span>
      </div>
    </label>
  );
}
export { AssetItem };