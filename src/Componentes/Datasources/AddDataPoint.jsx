import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import { useState } from "react";

function AddDatasource({ show, setShow, saveDataPoint, ds }) {
  const [Tag, setTag] = useState("Nuevo");

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      backdrop="static"
      keyboard={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add a datapoint</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <strong> Node/Tag: </strong>
        <input value={Tag} onChange={(e) => setTag(e.target.value)}></input>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => saveDataPoint(Tag, ds)}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddDatasource;
