import React, { useEffect } from "react";
import { AssetItem } from "./AssetItem";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import useApi from "../CustomHooks/useApi";

const AssetSearch = ({ show, handleClose, type, assetList }) => {
  const { data, error, loading, fetchData } = useApi(
    `/api/assetmanagement/v3/assets?size=1000&sort=parentId`
  );
  const [search, setSearch] = useState(type);

  const [totalAssetList, setTotalAssetList] = useState([]);
  const [selectedAssets, setSelectedAssets] = useState(assetList);

  useEffect(() => {
    setSelectedAssets(assetList);
  }, [assetList]);

  const filteredAssets = totalAssetList.filter(
    (dato) =>
      dato.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
      dato.typeId.toLowerCase().includes(search.toLocaleLowerCase())
  );

  useEffect(() => {
    if (!data && !loading) {
      fetchData();
      return;
    }

    const assets = data?._embedded?.assets ?? [];
    const list = OrderAssetList(assets);
    setTotalAssetList(list);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  function OrderAssetList(assetList) {
    if (!assetList) return [];

    function AssignHierarchy(list = []) {
      list.forEach(function (asset) {
        if (!asset.hasOwnProperty("nestDeep")) {
          const parent = list.find((obj) => obj.assetId === asset.parentId);
          if (parent?.hasOwnProperty("nestDeep")) {
            asset.nestDeep = parent.nestDeep + 1;
            const assetIndex = list.findIndex((obj) => obj === asset);
            const parentIndex = list.findIndex((obj) => obj === parent);
            const objectToMove = list.splice(assetIndex, 1)[0];
            list.splice(parentIndex + 1, 0, objectToMove);
          }
        }
      });
    }

    if (assetList.length === 0) return [];

    assetList[0].nestDeep = 0;
    var ready = false;

    var orderedList = assetList;
    while (!ready) {
      AssignHierarchy(orderedList);
      ready = !assetList.some((obj) => !obj.hasOwnProperty("nestDeep"));
    }

    return orderedList;
  }

  function handleAddRemove(newAsset, adding) {
    const newList = [...selectedAssets];
    if (adding)
      newList.push({ assetId: newAsset.assetId, name: newAsset.name });
    else {
      const index = newList.findIndex(
        (item) => item.assetId === newAsset.assetId
      );
      newList.splice(index, 1);
    }
    setSelectedAssets(newList);
  }

  return (
    <Offcanvas
      offcanvas-width="100px"
      style={{ marginTop: 40 }}
      show={show}
      onHide={() => handleClose(selectedAssets)}
      backdrop="true"
      scroll="True"
    >
      <Offcanvas.Header closeButton>
        <h2>Assets</h2>
        <Button style={{ boxShadow: "none" }} onClick={() => fetchData()}>
          Refresh
        </Button>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar"
          className="form-control"
        />
        <ul className="Sidebar-List" style={{ listStyle: "none", padding: 0 }}>
          {loading ? (
            <Spinner
              animation="border"
              variant="secondary"
              className="Spinner"
            />
          ) : filteredAssets.length > 0 ? (
            filteredAssets.map((asset) => (
              <AssetItem
                key={asset.assetId}
                asset={asset}
                addRemoveList={handleAddRemove}
                isChecked={
                  assetList.findIndex(
                    (item) => item.assetId === asset.assetId
                  ) >= 0
                }
              />
            ))
          ) : (
            <h5>No assets match the filter</h5>
          )}
          {error && <h5>Error fetching assets</h5>}
        </ul>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export { AssetSearch };
