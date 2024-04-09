import AssetMap from "../AssetMap/AssetMap";
import CustomGrid from "../../Aplicaciones/Utils/CustomGrid";
import GridElement from "../../Aplicaciones/Utils/GridElement";
import React, { useContext, useEffect, useState } from 'react';
import MapMarkerArea from "../AssetMap/MapMarkerArea";
import TimeSerie from "../Charts/Timeseries";
import BarChart from "../Charts/BarChart";
import OverviewSidebar from "../OverviewSidebar/OverviewSidebar";
import useApi from '../CustomHooks/useApi';
import axios from "axios";


const AssetOverview2 = () => {
    const [center, setCenter] = useState([6, -73.0046402]);
    const [zoom, setZoom] = useState(6);
    const { data, error, loading, fetchData } = useApi(`/api/assetmanagement/v3/assets?size=1000&sort=parentId`);
    const [totalAssetList, setTotalAssetList] = useState([]);
    const [showAssetList, setShowAssetList] = useState([]);
    const [mapAssetList, setMapAssetlist] = useState([]);
    const [selectedAsset, setSelectedAsset] = useState({});

    useEffect(() => {
        if (!data && !loading) {
            fetchData();
            return;
        }

        const assets = data?._embedded?.assets ?? [];
        console.log("Data", assets);
        const list = OrderAssetList(assets);
        setTotalAssetList(list);
        filterAndCenter(list)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    function filterAndCenter(list) {
        const filteredAssets = list.filter(
            (dato) => (
                dato.typeId.toLowerCase().includes('core.basicarea')
                || dato.typeId.toLowerCase().includes('core.basicsite')
            ));
        setShowAssetList(filteredAssets);
        if (mapAssetList.length === 0)
            setMapAssetlist(filteredAssets);

        // const centerzoom = CalculateCentreZoom(list.map((asset) => {
        //     if (asset.location?.latitude && asset.location?.longitude)
        //         return [asset.location.latitude, asset.location.longitude]
        // }));
        setCenter(centerzoom.centre);
        setZoom(centerzoom.zoom);
        return filteredAssets;
    }

    function OrderAssetList(assetList) {
        if (!assetList)
            return [];

        function AssignHierarchy(list = []) {
            list.forEach(function (asset) {
                if (!asset.hasOwnProperty('nestDeep')) {
                    const parent = list.find(
                        (obj => obj.assetId === asset.parentId))

                    if (parent.hasOwnProperty('childrens'))
                        parent.childrens += 1;
                    else
                        parent.childrens = 1;

                    if (parent.hasOwnProperty('nestDeep')) {
                        asset.nestDeep = parent.nestDeep + 1;
                        const assetIndex = list.findIndex(obj => obj === asset);
                        const parentIndex = list.findIndex(obj => obj === parent)
                        const objectToMove = list.splice(assetIndex, 1)[0];
                        list.splice(parentIndex + 1, 0, objectToMove);
                    }
                }
            });
        }

        if (assetList.length === 0)
            return [];

        assetList[0].nestDeep = 0;
        var ready = false;

        var orderedList = assetList;
        while (!ready) {
            AssignHierarchy(orderedList);
            ready = !assetList.some(obj => !obj.hasOwnProperty('nestDeep'));
        }

        return orderedList;
    }

    function HandleSelectedAsset(asset) {
        const assetIndex = totalAssetList.findIndex(item => item.assetId === asset);


        const deepLevel = totalAssetList[assetIndex].nestDeep;
        const newList = []
        const totalList = []

        for (let index = assetIndex + 1; index < totalAssetList.length; index++) {
            const element = totalAssetList[index];
            if (element.nestDeep <= deepLevel)
                break;

            if (!showAssetList.find(item => item.assetId === element.assetId) && element.parentId === totalAssetList[assetIndex].assetId)
                newList.push(element);
            totalList.push(element);
        }

        var tempList = [...filterAndCenter(totalAssetList)];
        const showIndex = tempList.findIndex(item => item.assetId === asset);
        tempList.splice(showIndex + 1, 0, ...newList);
        setShowAssetList(tempList);
        setMapAssetlist(totalList);
        if (totalAssetList[assetIndex]?.location?.latitude) {
            setCenter([totalAssetList[assetIndex].location.latitude, totalAssetList[assetIndex].location.longitude]);
        }
        setZoom(13);
        console.log("TotalList", totalList);
        setSelectedAsset(totalAssetList[assetIndex]);
    }

    return (
        <div className="App-Container">
            <OverviewSidebar
                list={showAssetList}
                error={error}
                loading={loading}
                HandleSelectedAsset={HandleSelectedAsset}
                selectedAsset={selectedAsset}
            />
            <CustomGrid rows={5} cols={5} gap={10} height={'100%'}>
                <GridElement rows={5} cols={3}>
                    <AssetMap center={center} zoomLevel={zoom}>
                        {mapAssetList.map((obj) => {
                            const location = [obj.location?.latitude ?? 0, obj.location?.longitude ?? 0];
                            return (
                                <MapMarkerArea position={location} label={obj.name} key={obj.assetId}>
                                    <button>
                                        View
                                    </button>
                                </MapMarkerArea>
                            )
                        })}
                    </AssetMap>
                </GridElement>
            </CustomGrid>
        </div >

    );
};

export default AssetOverview2;
