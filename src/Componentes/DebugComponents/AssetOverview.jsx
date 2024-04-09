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
import TableChart from "../Charts/TableChart";
import { Button, Spinner } from "react-bootstrap";
import EventsTable from "../EventsTable/EventsTable";
import { useNavigate } from "react-router-dom";


const AssetOverview = () => {
    const { data, error, loading, fetchData } = useApi(`/api/assetmanagement/v3/assets?size=1000&sort=parentId`);

    const [totalAssetList, setTotalAssetList] = useState([]);
    const [showAssetList, setShowAssetList] = useState([]);
    const [mapAssetList, setMapAssetlist] = useState([]);
    const [events, setEvents] = useState([]);
    const [selectedAsset, setSelectedAsset] = useState({});
    const [bounds, setBounds] = useState(null);
    const [loadingEvents, setLoadingEvents] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!data && !loading) {
            fetchData();
            return;
        }

        const assets = data?._embedded?.assets ?? [];
        console.log("Total Assets", assets);
        setTotalAssetList(assets);
        const areaAssets = assets.filter((item) => item.typeId.startsWith("core.basicarea"));
        setShowAssetList(areaAssets);
        HandleSelectedAsset('Overview');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);


    useEffect(() => {
        const coords = mapAssetList.map((asset) => {
            if (asset.location?.latitude && asset.location?.longitude)
                return [asset.location.latitude, asset.location.longitude]
        })
        setBounds(coords);
    }, [mapAssetList]);



    useEffect(() => {
        const result = [];
        function traverseHierarchy(assetId) {
            const children = totalAssetList.filter((item) => item.parentId === assetId);
            for (const child of children) {
                if (!child.typeId.startsWith("core."))
                    result.push(child);
                traverseHierarchy(child.assetId);
            }
        }

        const areaAssets = totalAssetList.filter((item) => item.typeId.startsWith("core.basicarea"));

        if (selectedAsset.assetId) {
            traverseHierarchy(selectedAsset.assetId);
            setMapAssetlist(result);
            console.log("Result", result);
            fetchEvents(result);
            setShowAssetList(areaAssets)
            const index = areaAssets.findIndex((asset) => asset.assetId === selectedAsset.assetId);
            console.log("index", index);

            if (index >= 0) {
                const newArray = areaAssets.splice(index + 1, 0, ...result);
                console.log("Array ", areaAssets);
                setShowAssetList(areaAssets)
            }
        }
        else {
            setShowAssetList(areaAssets);
            setMapAssetlist(areaAssets);
            showAssetList.forEach((asset) => traverseHierarchy(asset.assetId));
            console.log("Result", result);
            fetchEvents(result);
        }

    }, [selectedAsset]);

    function HandleSelectedAsset(assetId) {
        console.log("SElected Asset Id", assetId);
        if (assetId === 'Overview' || assetId === selectedAsset.assetId)
            setSelectedAsset({});
        else {
            const myAsset = totalAssetList.find((assetObject) => assetId === assetObject.assetId)
            if (myAsset.typeId.startsWith("core.basicarea"))
                setSelectedAsset(myAsset);
            else
                switch (myAsset.typeId) {
                    case "colwest2.LufkinWellManagerType":
                        navigate('/RPS/' + myAsset.assetId);
                        break;
                    case "colwest2.TeaEmisionesFlowData":
                        navigate('/Emissions/' + myAsset.assetId);
                        break;
                    default:
                        console.log("Default");
                        break;
                }
        }
    }

    const fetchEvents = (list) => {
        setEvents([]);
        setLoadingEvents(true);
        const entityIds = list.map((asset) => asset.assetId);
        var filter = {
            entityId: {
                in: {
                    value: entityIds
                }
            }
        };
        var filterString = JSON.stringify(filter);
        const url = `/api/eventmanagement/v3/events?size=20&page=0&includeShared=true&filter=`
        axios.get(url + filterString)
            .then(response => {
                console.log("Events", response);
                setEvents(response?.data?._embedded?.events ?? []);
            })
            .catch(error => {
                console.log("Error Getting Events");
                setLoadingEvents(true);
            }).finally(() => setLoadingEvents(false));
    };

    return (
        <div className="App-Container">
            <OverviewSidebar
                homeUrl={'/'}
                list={showAssetList}
                error={error}
                loading={loading}
                HandleSelectedAsset={HandleSelectedAsset}
                selectedAsset={selectedAsset}
            />
            <CustomGrid rows={4} cols={5} gap={10} height={'100%'}>
                <GridElement rows={2} cols={3}>
                    <AssetMap coordinates={bounds}>
                        {mapAssetList.map((obj) => {
                            const location = [obj.location?.latitude ?? 0, obj.location?.longitude ?? 0];
                            return (
                                <MapMarkerArea position={location} label={obj.name} key={obj.assetId}>
                                    <Button onClick={() => HandleSelectedAsset(obj.assetId)}>
                                        Monitor
                                    </Button>
                                </MapMarkerArea>
                            )
                        })}
                    </AssetMap>
                </GridElement>

                <GridElement rows={1} cols={2}>
                    <h4>Asset Count</h4>
                    <h5>{mapAssetList.length} Assets </h5>
                </GridElement>

                <GridElement rows={1} cols={2}>
                    <h4>Event Count</h4>
                    <h5>{events.length} Events </h5>
                </GridElement>
                {/* 
                <GridElement rows={1} cols={2}>
                    <EventsTable />
                </GridElement> */}

                <GridElement rows={2} cols={5}>
                    <h5>
                        Events
                    </h5>
                    <EventsTable eventsList={events} totalAssetList={totalAssetList} />
                    {/* <TableChart
                        color="#343767"
                        headers={['Sev', 'Timestamp', 'Asset', 'Description']}
                        data={events.map((event) => [event.severity == 30 ? 'Error' : event.severity == 20 ? 'Warn' : 'Info', event.timestamp, totalAssetList.find((asset) => asset.assetId === event.entityId).name, event.description])}
                    /> */}
                    {loadingEvents && <Spinner />}
                    {!loadingEvents && events.length === 0 && <h3>No events to show</h3>}
                </GridElement>
            </CustomGrid>
        </div >
    );
};

export default AssetOverview;
