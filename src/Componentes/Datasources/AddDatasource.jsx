import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import { useState } from "react";

function AddDatasource({ show, setShow, saveDatasource }) {
  const [direction, setDirection] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("logix");
  const [slot, setSlot] = useState(0);
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      backdrop="static"
      keyboard={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add a datasource</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="grid-container2">
          type:
          <select
            id="dropdown"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="logix">Logix</option>
            <option value="opc_ua">OPC UA</option>
          </select>
          Name:
          <input value={name} onChange={(e) => setName(e.target.value)}></input>
          Direction:<input value={direction} onChange={(e) => setDirection(e.target.value)}></input>
          {
            type === 'logix' &&
            <>
              Slot:<input value={slot} onChange={(e) => setSlot(e.target.value)}></input>
            </>
          }
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() =>
            saveDatasource({
              name: name,
              direction: direction,
              type: type,
              slot: slot,
            })
          }
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddDatasource;
