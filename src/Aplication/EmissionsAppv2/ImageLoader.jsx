import { useState } from "react";
import { Button } from "react-bootstrap";

const ImageLoader = ({ onChange }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [statusText, setStatusText] = useState("Not saved yet");
  const [imageSrc, setImageSrc] = useState(null);
  const [startCoord, setStartCoord] = useState("");
  const [endCoord, setEndCord] = useState("");
  const [maxEmissions, setMaxEmissions] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log("File ", event.target.files[0]);

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      setImageSrc(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  function SaveChanges() {
    if (imageSrc) handleUpload();

    handleSaveCoords();
  }

  const handleSaveCoords = () => {
    if (startCoord == "" || endCoord == "") {
      setStatusText("Empty Coordinates");
      return;
    }

    fetch(
      `/api/emissionsapi2-colwest2/v1/saveCoordinates?tenant=colwest2&end=${endCoord}&start=${startCoord}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to upload image");
      }
      setStatusText("Changes saved successfully");
      onChange(() => onChange());
    });
  };

  const handleUpload = () => {
    if (!selectedFile) {
      console.log("No file selected");
      setStatusText("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    fetch("/api/emissionsapi2-colwest2/v1/saveImage?tenant=colwest2", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to upload image");
        }
        setStatusText("Image uploaded successfully");
        onChange(() => onChange());
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        setStatusText("Error uploading image:", error);
      });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "space-between",
          height: "60%",
          marginLeft: "2em",
        }}
      >
        <div>
          <img
            src={imageSrc}
            alt="No Image"
            style={{
              display: "block",
              paddingLeft: "1rem",
              objectFit: "cover",
            }}
          />
          <div style={{ justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: "1rem" }}>
              <input type="file" onChange={handleFileChange} />
            </div>
          </div>
        </div>

        <div style={{ display: "grid", marginRight: "4em" }}>
          <Button onClick={SaveChanges} variant="success">
            Save Changes
          </Button>
          <span style={{ font: "small-caption" }}>{statusText}</span>
        </div>
      </div>
      <div
        style={{
          display: "inline-flex",
          flexWrap: "nowrap",
        }}
      >
        Start Coordinates:
        <input
          placeholder="Ej: 5.44246842,-72.4519091"
          value={startCoord}
          onChange={(e) => setStartCoord(e.target.value)}
          style={{ marginRight: "1rem", height: "min-content" }}
        ></input>
        End Coordinates:
        <input
          placeholder="Ej: 5.44246842,-72.4519091"
          value={endCoord}
          onChange={(e) => setEndCord(e.target.value)}
          style={{ marginRight: "1rem", height: "min-content" }}
        ></input>
        Max emissions:
        <input
          placeholder="Ej: 0"
          value={maxEmissions}
          onChange={(e) => setMaxEmissions(e.target.value)}
          style={{ marginRight: "1rem", height: "min-content" }}
        ></input>
      </div>
    </>
  );
};

export default ImageLoader;
