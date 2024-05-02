import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import GridElement from "../../Aplication/Utils/GridElement";
import React, { useEffect } from "react";
import { useState } from "react";

function MapComponent({ show, setShow, saveMapping, data }) {
  const mapComponents = {
    C1: "",
    C2: "",
    C3: "",
    C4: "",
    C5: "",
  };
  const [mappedComponents, setMappedComponents] = useState(mapComponents);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const parsed_value = parseFloat(value);
    const newValue = isNaN(parsed_value) ? value : parsed_value;

    setMappedComponents((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      backdrop="static"
      keyboard={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Map your Components</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <GridElement rows={4} cols={4}>
            <GridElement rows={1} cols={4} ns>
              <h5>Map components</h5>
            </GridElement>
            <GridElement
              className="grid-cell-white justified"
              rows={1}
              cols={2}
              style={{ border: "none" }}
            >
              <span>C1:</span>
              <input
                type="text"
                name="C1"
                placeholder="Node/tag"
                onChange={handleChange}
              />
            </GridElement>
            <GridElement
              className="grid-cell-white justified"
              rows={1}
              cols={2}
              style={{ border: "none" }}
            >
              <span>C2:</span>
              <input
                type="text"
                name="C2"
                placeholder="Node/tag"
                onChange={handleChange}
              />
            </GridElement>
            <GridElement
              className="grid-cell-white justified"
              rows={1}
              cols={2}
              style={{ border: "none" }}
            >
              <span>C3:</span>
              <input
                name="C3"
                type="text"
                placeholder="Node/Tag"
                onChange={handleChange}
              />
            </GridElement>
            <GridElement
              className="grid-cell-white justified"
              rows={1}
              cols={2}
              style={{ border: "none" }}
            >
              <span>C4:</span>
              <input
                type="text"
                onChange={handleChange}
                name="C4"
                placeholder="Node/tag"
              />
            </GridElement>
            <GridElement
              className="grid-cell-white justified"
              rows={1}
              cols={2}
              style={{ border: "none" }}
            >
              <span>C5:</span>
              <input
                type="text"
                onChange={handleChange}
                name="C5"
                placeholder="Node/Tag"
              />
            </GridElement>
            <GridElement
              rows={1}
              cols={2}
              ns
              style={{ justifyContent: "center" }}
            ></GridElement>
          </GridElement>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() =>
            saveMapping(
              [
                {
                  Components: {
                    C1: mappedComponents.C1,
                    C2: mappedComponents.C2,
                    C3: mappedComponents.C3,
                    C4: mappedComponents.C4,
                    C5: mappedComponents.C5,
                  },
                },
              ],
              setShow(false)
            )
          }
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MapComponent;
