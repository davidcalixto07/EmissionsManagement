import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import { useState } from "react";

function AddDatasource({ show, setShow, saveDatasource }) {
  const [ip, setIp] = useState("127.0.0.1");
  const [name, setName] = useState("PLC1");
  const [type, setType] = useState("Logix");

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add a datasource</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="grid-container2">
          Name:
          <input value={name} onChange={(e) => setName(e.target.value)}></input>
          type:
          <select id="dropdown">
            <option value="Logix">Logix</option>
            <option value="OPC UA">OPC UA</option>
          </select>
          IP:<input value={ip} onChange={(e) => setIp(e.target.value)}></input>
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
              ip: ip,
              type: type,
              status: "Disconnected",
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
