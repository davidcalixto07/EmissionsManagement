import React, { useContext, useEffect, useState } from "react";
import "./AssetSidebarStyles.css";
import logo from "./LogoBlanco.png";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import SidebarAsset from "./SidebarAsset";
import useApi from "../CustomHooks/useApi";
import { AssetSearch } from "./AssetSearch";
import { AppContext } from "../Context/AppContext";
import AddIcon from "./add_icon.png";
import DeleteIcon from "./trash-can-icon.png";
import DeleteAssetPopUp from "../Utlities/DeleteAssetPopUp";
import { useNavigate } from "react-router-dom";
import useSidebar from "./useSidebar";

const AssetSidebar = ({
  appId,
  appName,
  handleSelectedAsset,
  homeUrl,
  type = "",
  children,
  noOverview,
  height,
  getList,
}) => {
  const { tenant } = useContext(AppContext);
  const nav = useNavigate();
  const { data, error, loading, fetchData } = useApi(
    `/api/westapi-colwest2/v1/read_byID?application=${appId}&tenant=${tenant}`
  );
  const { SaveToAPI } = useSidebar(appId, tenant);

  const [assetList, setAssetList] = useState([]);
  const [tempassetList, setTempassetList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [show, setShow] = useState(false);
  const [showDeletePopUp, setShowDeletePopUp] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    if (data && !error) {
      setAssetList(data?.assets ?? []);

      if (getList) getList(data?.assets ?? []);
    } else if (!loading && !error) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  function AssetClicked(asset) {
    if (isRemoving) {
      RemoveAsset(asset.assetId);
      setShowDeletePopUp(true);
    } else {
      setSelected(asset);
      if (typeof handleSelectedAsset === "function") handleSelectedAsset(asset);
    }
  }

  function HandleClickedRemove() {
    setIsRemoving(true);
    setTempassetList(assetList);
  }

  function RemoveAsset(assetId) {
    const newList = [...assetList];
    const index = newList.findIndex((asset) => assetId === asset.assetId);
    newList.splice(index, 1);
    setAssetList(newList);
  }

  const HandleAssetSearchClosed = (newList) => {
    UpdateAssetList(newList);
    setShow(false);
  };

  function HandleCancel() {
    setIsRemoving(false);
    setAssetList(tempassetList);
  }

  function UpdateAssetList(list) {
    setAssetList(list);
    SaveToAPI(list);
    if (getList) getList(list);
  }
  function noDelete() {
    setShowDeletePopUp(false);
  }
  function confirmDelete() {
    setShowDeletePopUp(false);
  }

  return (
    <div className="Sidebar-Container">
      <div className="Sidebar-Top">
        <Link to={homeUrl}>
          <img src={logo} alt="logo"></img>
        </Link>
        <div className="Sidebar-Top-Title">{appName}</div>
      </div>
      <div
        className="Sidebar-List"
        style={{ height: `calc(${height ?? 60}% - 2rem)` }}
      >
        {!noOverview && (
          <>
            <div
              className="SidebarAsset"
              onClick={() => {
                AssetClicked(null);
              }}
            >
              <div className="IconContainer">
                <img src={logo} alt="" />
              </div>
              <div className="SidebarText">
                <h5>Overview</h5>
                <span>View data of all your assets</span>
              </div>
            </div>
            <hr></hr>
          </>
        )}
        {loading && (
          <Spinner animation="border" variant="secondary" className="Spinner" />
        )}
        {error && <h5>Error fetching assets</h5>}

        {!loading &&
          (assetList.length > 0
            ? assetList.map((asset) => (
                <SidebarAsset
                  key={asset.assetId}
                  asset={asset}
                  onClick={AssetClicked}
                  selected={selected}
                  deleting={isRemoving}
                />
              ))
            : "There is no assets to show, add one with the + button")}
      </div>

      <div className="ControlButtons">
        {isRemoving ? (
          <>
            <button
              onClick={() => HandleCancel()}
              className="SidebarAsset-DeleteIcon"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => HandleClickedRemove()}
              className="SidebarAsset-DeleteIcon"
            >
              <img src={DeleteIcon} alt="-" />
            </button>
            <button
              onClick={() => nav("/create")}
              className="SidebarAsset-DeleteIcon"
            >
              <img src={AddIcon} alt="-" />
            </button>
          </>
        )}
      </div>

      <div className="Sidebar-Description">{children}</div>
      <AssetSearch
        show={show}
        handleClose={HandleAssetSearchClosed}
        type={type}
        assetList={assetList}
      />
      <DeleteAssetPopUp
        show={showDeletePopUp}
        setShow={setShowDeletePopUp}
        confirmDelete={confirmDelete}
        noDelete={noDelete}
        asset={selected}
      />
    </div>
  );
};

export default AssetSidebar;
