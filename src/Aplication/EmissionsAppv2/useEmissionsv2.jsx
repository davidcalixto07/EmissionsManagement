import { useEffect, useState } from "react";
import { TestData } from "./times";

function useEmissionsV2(dates) {
  const [imageSrc, setImageSrc] = useState(null);
  const [coordinates, setCoordinates] = useState({ start: "0,0", end: "0.0" });
  const [sidebarList, setSidebarList] = useState([]);
  const [teasList, setTeasList] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log("Use Emissions Dates", dates);


  useEffect(() => {
    setLoading(true);
    if (sidebarList.length === 0) {
      setLoading(false);
      return;
    }
    const url = `/api/assetmanagement/v3/assets?filter={"assetId": {"in": {"value": [${sidebarList.map(
      (flare) => `"${flare.assetId}"`
    )}]}}}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          setLoading(false);
          throw new Error("Failed to fetch teas");
        }
        return response.json();
      })
      .then((json) => {
        const assets = json._embedded.assets;
        setTeasList(assets);
        console.warn(assets);
        GetTeasTs(assets);
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      })
      .finally(() => { });
  }, [sidebarList, dates]);

  function GetTeasTs(teaslist) {
    if (!dates.startDate || sidebarList.length == 0)
      return;

    const isoStartDate = dates.startDate.toISOString();
    const isoEndDate = dates.endDate ? dates.endDate.toISOString() : new Date(2050, 1, 1).toISOString();


    const promises = teaslist.map(async (flare) => {
      const url = `/api/emissionsapi2-colwest2/v1/ProcessTimeserie?assetId=${flare.assetId}&from=${isoStartDate}&to=${isoEndDate}&model=both`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch data for assetId ${flare.assetId}`);
      }
      const json = await response.json();
      console.log("Api response from ", flare, json);
      flare.timeSerie = Array.isArray(json) ? json : [];
      var sum1 = 0, sum2 = 0;

      flare.timeSerie.forEach(point => {
        sum1 += point.emissions.anh.C02 ?? 0;
        sum2 += point.emissions.anh.CO2e ?? 0;
      });
      flare.avgEmissions = sum1 / flare.timeSerie.length;
      flare.avgEqEmissions = sum2 / flare.timeSerie.length;
      console.log("Flare", flare);
      setLoading(false);
      return flare;
    });

    Promise.all(promises)
      .then((updatedTeas) => {
        console.log("Teas with fetched data:", updatedTeas);
        setTeasList(updatedTeas);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  function fetchImage() {
    fetch("/api/emissionsapi2-colwest2/v1/getImage?tenant=colwest2")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }
        return response.blob();
      })
      .then((blob) => {
        const imageURL = URL.createObjectURL(blob);
        setImageSrc(imageURL);
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  }

  function fetchConfig() {
    fetch("/api/emissionsapi2-colwest2/v1/loadCoordinates?tenant=colwest2")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }
        return response.json();
      })
      .then((coords) => {
        console.log("Coordinates", coords);
        setCoordinates(coords);
      })
      .catch((error) => {
        console.error("Error fetching coordinates:", error);
      });
  }

  useEffect(() => {
    fetchImage();
    fetchConfig();
    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, []);

  return { teasList, setSidebarList, coordinates, imageSrc, loading };
}
export default useEmissionsV2;
