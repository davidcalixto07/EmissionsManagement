import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import { useState } from "react";

function AddDatasource({ show, setShow, saveDatasource }) {
  const [ip, setIp] = useState("127.0.0.1");
  const [name, setName] = useState("PLC1");
  const [type, setType] = useState("logix");
  const [datapoints, setDatapoints] = useState(["PIT1201"]);

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
          Name:
          <input value={name} onChange={(e) => setName(e.target.value)}></input>
          IP:<input value={ip} onChange={(e) => setIp(e.target.value)}></input>
          type:
          <select
            id="dropdown"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="logix">Logix</option>
            <option value="opc_ua">OPC UA</option>
          </select>
          DataPoint:
          <input
            value={datapoints}
            onChange={(e) => setDatapoints(e.target.value)}
          ></input>
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
              datapoints: [datapoints],
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
